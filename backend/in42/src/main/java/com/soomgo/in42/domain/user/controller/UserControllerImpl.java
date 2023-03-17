package com.soomgo.in42.domain.user.controller;

import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagListDto;
import com.soomgo.in42.domain.tag.service.TagService;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.UpdateUserTagRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.service.UserService;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.sql.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/user")
public class UserControllerImpl implements UserController {

    private final UserService userService;
    private final QuestionService questionService;
    private final TagService tagService;
    private final TokenService tokenService;

    @GetMapping(value = "/test")
    public String firstApiTest(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user.toString();
    }

    @GetMapping(value = "/detail")
    public UserDto findUserDetail(HttpServletRequest request) {
        return tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
    }

    @GetMapping(value = "/tag")
    public TagListDto findUserTag(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return userService.findUserTags(user);
    }

    @PostMapping(value = "/tag")
    public ResponseEntity<ExceptionResponse> updateUserTag(HttpServletRequest request, UpdateUserTagRequestDto updateUserTagRequestDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        tagService.updateUserTag(user, updateUserTagRequestDto.getTags());
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/questions")
    public UserDto findUserQuestions(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }

    @PostMapping(value = "/question")
    public ResponseEntity<ExceptionResponse> createUserQuestion(HttpServletRequest request, CreateUserQuestionRequestDto createQuestionDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        UpdateQuestionTagDto updateQuestionTagDto = questionService.createQuestion(user, createQuestionDto);
        tagService.updateQuestionTag(updateQuestionTagDto);
        return ResponseEntity.ok().build();
    }
    @PostMapping(value = "/question/{seasonId}")
    public ResponseEntity<ExceptionResponse> createUserQuestionToSession(HttpServletRequest request, CreateUserQuestionRequestDto createQuestionDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/sessions")
    public UserDto findUserSession(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }

    @PostMapping(value = "/session")
    public ResponseEntity<ExceptionResponse> createUserSession(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/matchs")
    public UserDto findUserMatchs(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }

    @GetMapping(value = "/{userId}/detail")
    public UserDto findOtherUserDetail(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }
}

