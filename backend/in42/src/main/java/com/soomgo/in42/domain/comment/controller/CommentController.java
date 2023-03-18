package com.soomgo.in42.domain.comment.controller;

import com.soomgo.in42.domain.comment.dto.CreateCommentRequestDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

public interface CommentController {
    ResponseEntity<ExceptionResponse> createQuestionComment(HttpServletRequest request, @RequestBody CreateCommentRequestDto createCommentRequestDtoDto, @PathVariable("questionId") Integer questionId);
}
