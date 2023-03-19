package com.soomgo.in42.domain.comment.controller;


import com.soomgo.in42.domain.comment.dto.CreateCommentRequestDto;
import com.soomgo.in42.domain.comment.service.CommentService;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/comment")
public class CommentControllerImpl implements CommentController{

    private final CommentService commentService;
    private final TokenService tokenService;

    @PostMapping(value = "/question/{questionId}")
    public ResponseEntity<ExceptionResponse> createQuestionComment(HttpServletRequest request, CreateCommentRequestDto createCommentRequestDtoDto, Integer questionId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        commentService.createCommentToQuestion(createCommentRequestDtoDto.getContent(), questionId);
        return ResponseEntity.ok().build();
    }
}
