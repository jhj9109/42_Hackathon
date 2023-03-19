package com.soomgo.in42.domain.user.controller;

import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.tag.dto.TagListDto;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.CreateUserSessionReqeustDto;
import com.soomgo.in42.domain.user.dto.UpdateUserTagRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserController {
    String firstApiTest(HttpServletRequest request);
    UserDto findUserDetail(HttpServletRequest request);
    UserDto findOtherUserDetail(HttpServletRequest request, @PathVariable("userId") Integer userId);
    List<TagDto> findOtherUserTag(HttpServletRequest request, @PathVariable("userId") Integer userId);
    ResponseEntity updateUserTag(HttpServletRequest request, @RequestBody UpdateUserTagRequestDto updateUserTagRequestDto);
    TagListDto findUserTag(HttpServletRequest request);
    ResponseEntity<ExceptionResponse> createUserQuestion(HttpServletRequest request, @RequestBody CreateUserQuestionRequestDto createQuestionDto);
    ResponseEntity<ExceptionResponse> createUserSession(HttpServletRequest request, @RequestBody CreateUserSessionReqeustDto createSessionDto);
    ResponseEntity<ExceptionResponse> createUserQuestionToSession(HttpServletRequest request, @RequestBody CreateUserQuestionRequestDto createQuestionDto, @PathVariable("sessionId") Integer sessionId);
    public String userLogin(HttpServletRequest request,@RequestParam(value = "intraId", required = true) String intraId);

}