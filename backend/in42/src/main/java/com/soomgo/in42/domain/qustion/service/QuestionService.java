package com.soomgo.in42.domain.qustion.service;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.FindOpenQeustionResponseDto;
import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.repository.QuestionRepository;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import com.soomgo.in42.domain.user.service.UserService;
import com.soomgo.in42.global.type.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class QuestionService {

    private final UserRepository userRepository;

    private final QuestionRepository questionRepository;

    @Transactional
    public UpdateQuestionTagDto createQuestion(UserDto userDto, CreateUserQuestionRequestDto createQuestionDto) {
        User user = userRepository.findById(userDto.getId()).get();
        Question question = Question.builder()
                .menteeUser(user)
                .title(createQuestionDto.getTitle())
                .content(createQuestionDto.getContent())
                .startTime(createQuestionDto.getStartTime())
                .endTime(createQuestionDto.getEndTime())
                .status(StatusType.MATCHING)
                .build();
        Question savedQuestion = questionRepository.save(question);
        return UpdateQuestionTagDto.builder()
                .id(savedQuestion.getId())
                .title(savedQuestion.getTitle())
                .tag(createQuestionDto.getTag())
                .build();
    }

    @Transactional
    public FindOpenQeustionResponseDto findUserOpenQuestions(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).get();
        List<Question> questions = user.getQuestions().stream()
                .filter(question -> question.getEndTime().isAfter(LocalDateTime.now())
                        && question.getStatus() != StatusType.COMPLETED)
                .collect(Collectors.toList());

        return FindOpenQeustionResponseDto.from(questions);
    }
}
