package com.soomgo.in42.domain.qustion.controller;

import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;

public interface QuestionController {
    ResponseEntity<ExceptionResponse> CancelQuestion(HttpServletRequest request, @PathVariable("questionId") Integer questionId);
    ResponseEntity<ExceptionResponse>  AnswerQuestion(HttpServletRequest request, @PathVariable("questionId") Integer questionId);
    QuestionDto findQuestionDetial(HttpServletRequest request, @PathVariable("questionId") Integer questionId);
}
