package com.soomgo.in42.domain.qustion.controller;


import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.session.dto.UpdateSessionTagDto;
import com.soomgo.in42.domain.session.session.SessionService;
import com.soomgo.in42.domain.tag.service.TagService;
import com.soomgo.in42.domain.user.dto.CreateUserSessionReqeustDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import com.soomgo.in42.global.type.StatusType;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/question")
public class QuestionControllerImpl implements QuestionController{

    private final SessionService sessionService;
    private final QuestionService questionService;
    private final TagService tagService;
    private final TokenService tokenService;
    @GetMapping(value = "")
    public List<QuestionDto> findOpenQuestion(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return questionService.findQuestionsByStatus(user, StatusType.MATCHING);
    }

    @PutMapping(value = "/{questionId}/cancel")
    public ResponseEntity<ExceptionResponse> CancelQuestion(HttpServletRequest request, Integer questionId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        questionService.CancelQuestion(questionId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/{questionId}/answer")
    public ResponseEntity<ExceptionResponse>  AnswerQuestion(HttpServletRequest request, Integer questionId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        QuestionDto questionDto = questionService.findQuestionById(questionId);
//        if (questionDto.getStatus() != StatusType.MATCHING.getKey())
//            throw new RuntimeException("매칭중인 질문만 등록이 가능합니다!"); ///매칭중???

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startTime;
        if (questionDto.getStartTime().minusMinutes(15).isAfter(now) && questionDto.getEndTime().isBefore(now)) {
            startTime = now.plusMinutes(15);
        }
        else if (questionDto.getStartTime().isAfter(now)) {
            startTime = questionDto.getStartTime();
        }
        else {
            throw new RuntimeException();
        }
        CreateUserSessionReqeustDto createSessionDto = CreateUserSessionReqeustDto.builder()
                .startTime(startTime)
                .endTime(startTime.plusMinutes(15))
                .tags(questionDto.getTags())
                .build();
        Integer sessionId = sessionService.createSession(user, createSessionDto);
        tagService.updateSessionTag(UpdateSessionTagDto.builder()
                .sessionId(sessionId)
                .tagDtos(questionDto.getTags())
                .build());
        questionService.AnswerQuestion(sessionId, questionDto);
        return ResponseEntity.ok().build();
    }
}
