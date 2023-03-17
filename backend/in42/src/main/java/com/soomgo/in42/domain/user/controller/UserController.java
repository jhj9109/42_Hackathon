package com.soomgo.in42.domain.user.controller;

import com.soomgo.in42.domain.tag.dto.TagListDto;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.UpdateUserTagRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

public interface UserController {
    String firstApiTest(HttpServletRequest request);
    public UserDto findUserDetail(HttpServletRequest request);
    ResponseEntity updateUserTag(HttpServletRequest request, @RequestBody UpdateUserTagRequestDto updateUserTagRequestDto);
    TagListDto findUserTag(HttpServletRequest request);
    ResponseEntity<ExceptionResponse> createUserQuestion(HttpServletRequest request, @RequestBody CreateUserQuestionRequestDto createQuestionDto);

}