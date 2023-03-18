package com.soomgo.in42.domain.qustion.service;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.repository.QuestionRepository;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.repository.SessionRepository;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import com.soomgo.in42.global.type.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
        User user = userRepository.findById(userDto.getId()).get();
        System.out.println(createQuestionDto.toString());
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
            question.setEndTime(LocalDateTime.of(9999, 12, 31, 23, 59, 59));
            // 기존에 존재하던 question 존재하면 닫아야함
        }
        Question savedQuestion = questionRepository.save(question);
        return UpdateQuestionTagDto.builder()
                .id(savedQuestion.getId())
                .title(savedQuestion.getTitle())
                .tag(createQuestionDto.getTag())
                .build();
    }

    @Transactional
    public List<QuestionDto> findQuestionsByStatus(StatusType status) {
        List<Question> questions = questionRepository.findAllByEndTimeAfterAndStatus(LocalDateTime.now(), status);
        return QuestionDto.from(questions);
    }

    @Transactional
    public QuestionDto findQuestionById(Integer questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException());
        return QuestionDto.from(question);
    }

    @Transactional
    public List<QuestionDto> findUserOpenQuestions(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).get();
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(LocalDateTime.now())
                        && (question.getStatus() != StatusType.COMPLETED || question.getStatus() != StatusType.CANCELED))
                .collect(Collectors.toList());

        return QuestionDto.from(questions);
    }

    @Transactional(readOnly = true)
    public List<QuestionDto> findUserMatchedQuestionDtos(UserDto userDto) {
        LocalDateTime now = LocalDateTime.now(); // 현재 시간
        User user = userRepository.findById(userDto.getId()).get();
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(now)
                        && question.getStatus() == StatusType.MATCHED)
                .collect(Collectors.toList());

        // 가지고있는 세션에 포함된 모든 매치된 questions가져오기
        for (Session session : user.getSessions()) {
            if (session.getEndTime().isAfter(now)) { // endTime이 현재 시간 이후인 경우
                for (Question question : session.getQuestions()) {
                    if (question.getEndTime().isAfter(now) && question.getStatus() == StatusType.MATCHED) {
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
}
