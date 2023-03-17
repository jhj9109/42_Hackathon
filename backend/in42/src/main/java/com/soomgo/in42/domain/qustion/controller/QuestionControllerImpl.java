package com.soomgo.in42.domain.qustion.controller;


import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/question")
public class QuestionControllerImpl {

    private final QuestionService questionService;
    private final TokenService tokenService;
    @GetMapping(value = "")
    public UserDto findOpenQuestion(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));

        return user;
    }

    @PutMapping(value = "/{questionId}")
    public UserDto CancelQuestion(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }

    @PutMapping(value = "/{questionId}/answer")
    public UserDto AnswerQuestion(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }
}
