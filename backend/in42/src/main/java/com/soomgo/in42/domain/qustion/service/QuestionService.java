package com.soomgo.in42.domain.qustion.service;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.repository.QuestionRepository;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.repository.SessionRepository;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import com.soomgo.in42.global.type.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class QuestionService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final SessionRepository sessionRepository;

    @Transactional
    public UpdateQuestionTagDto createQuestion(UserDto userDto, CreateUserQuestionRequestDto createQuestionDto, Integer sessionId) {
        User user = userRepository.findById(userDto.getUserId()).get();
        LocalDateTime now = LocalDateTime.now();
        Question question = Question.builder()
                .menteeUser(user)
                .title(createQuestionDto.getTitle())
                .content(createQuestionDto.getContent())
                .startTime(createQuestionDto.getStartTime())
                .endTime(createQuestionDto.getEndTime())
                .status(StatusType.MATCHING)
                .build();
        if (sessionId != null) {
            Session session = sessionRepository.findById(sessionId).get();
            question.setSession(session);
            question.setStatus(StatusType.MATCHED);
            question.setEndTime(createQuestionDto.getStartTime().plusMinutes(30));
            if (checkTimeOverlap(session.getStartTime(), session.getEndTime(), question.getStartTime(), question.getEndTime())) {
                throw new RuntimeException("셔션에 시간이 포함되지 않습니다!");
            }
            // 기존에 존재하던 question 존재하면 닫아야함???
        }
        checkQuestionTimeDup(user, question);
        List<TagDto> tagDtos = new ArrayList<TagDto>();
        if (createQuestionDto.getTags() != null && !createQuestionDto.getTags().isEmpty())
            tagDtos.add(createQuestionDto.getTags().get(0));

        if (question.getStartTime().isBefore(now)) {
            throw new RuntimeException("현재시간 이전으로는 질문을 등록할 수 없습니다!");
        }
        Question savedQuestion = questionRepository.save(question);
        return UpdateQuestionTagDto.builder()
                .id(savedQuestion.getId())
                .title(savedQuestion.getTitle())
                .tags(tagDtos)
                .build();
    }

    @Transactional
    public List<QuestionDto> findQuestionsByStatus(UserDto userDto, StatusType status) {
        User user = userRepository.findById(userDto.getUserId()).orElseThrow(() -> new RuntimeException("유저를 찾을수 없습니다"));
        List<Question> questions = questionRepository.findByStatusAndMenteeUserNotAndEndTimeAfter(StatusType.MATCHING, user, LocalDateTime.now());
        return QuestionDto.from(questions);
    }

    @Transactional
    public QuestionDto findQuestionById(Integer questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException());
        return QuestionDto.from(question);
    }

    @Transactional
    public List<QuestionDto> findUserOpenQuestions(UserDto userDto) {
        User user = userRepository.findById(userDto.getUserId()).get();
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(LocalDateTime.now())
                        && (question.getStatus() == StatusType.MATCHING || question.getStatus() == StatusType.MATCHED))
                .collect(Collectors.toList());

        return QuestionDto.from(questions);
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> findUserMatchedQuestionDtos(UserDto userDto) {
        LocalDateTime now = LocalDateTime.now(); // 현재 시간
        User user = userRepository.findById(userDto.getUserId()).get();
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(now)
                        && question.getStatus() == StatusType.MATCHED)
                .collect(Collectors.toList());

        // 가지고있는 세션에 포함된 모든 매치된 questions가져오기
        for (Session session : user.getSessions()) {
            if (session.getEndTime().isAfter(now)) { // endTime이 현재 시간 이후인 경우
                for (Question question : session.getQuestions()) {
                    if (question.getEndTime().isAfter(now) && question.getStatus() == StatusType.MATCHED
                        && !checkQuestionDup(questions, question)) {
                        questions.add(question);
                    }
                }
            }
        }
        Collections.sort(questions, Comparator.comparing(Question::getStartTime));
        List<QuestionDto> questionDtos = QuestionDto.from(questions);
        return questionDtos;
    }

    @Transactional
    public void CancelQuestion(Integer questionId){
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException());
        if (question.getStatus() == StatusType.MATCHING) {
            question.getTags().clear();
            questionRepository.deleteById(question.getId());
        }
        else {
            question.setStatus(StatusType.CANCELED);
        }
    }

    @Transactional
    public void AnswerQuestion(Integer sessionId, QuestionDto questionDto) {
        Question question = questionRepository.findById(questionDto.getQuestionId()).orElseThrow(() -> new RuntimeException());
        Session session = sessionRepository.findById(sessionId).orElseThrow(() -> new RuntimeException());
        question.setSession(session);
        question.setStatus(StatusType.MATCHED);
    }

    public static boolean checkQuestionDup(List<Question> questions, Question ckquestion) {
        for (Question question : questions) {
            if (question.getId() == ckquestion.getId()) {
                return true;
            }
        }
        return false;
    }
    public static void checkQuestionTimeDup(User user, Question newQuestion) {
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(LocalDateTime.now())
                        && (question.getStatus() == StatusType.MATCHING || question.getStatus() == StatusType.MATCHED))
                .collect(Collectors.toList());
        for (int i = 0; i < questions.size(); i++) {
            if (isOverlap(questions.get(i), newQuestion)) {
                System.out.println(questions.get(i).getStartTime() + " ~ " + questions.get(i).getEndTime() + " " + questions.get(i).getId());
                System.out.println(newQuestion.getStartTime() + " ~ " + newQuestion.getEndTime() + " " + newQuestion.getId());
                throw new RuntimeException("이미 생성된 질문과 겹칩니다!");
            }
        }
    }

    public static boolean isOverlap(Question question1, Question question2) {
        LocalDateTime start1 = question1.getStartTime();
        LocalDateTime end1 = question1.getEndTime();
        LocalDateTime start2 = question2.getStartTime();
        LocalDateTime end2 = question2.getEndTime();

        return checkTimeOverlap(start1, end1, start2, end2);
    }

    public static boolean checkTimeOverlap(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
//        if (start1.isEqual(end1) || start2.isEqual(end2)) {
//            return false;
//        }
        // 첫 번째 기간이 두 번째 기간의 이전에 끝날 때
        if (end1.isBefore(start2)) {
            return false;
        }

        // 첫 번째 기간이 두 번째 기간의 이후에 시작할 때
        if (start1.isAfter(end2)) {
            return false;
        }

        // 나머지 경우에는 두 기간이 겹칩니다.
        return true;
    }
}
