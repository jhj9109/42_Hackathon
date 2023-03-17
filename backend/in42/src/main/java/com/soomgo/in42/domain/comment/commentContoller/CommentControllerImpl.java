package com.soomgo.in42.domain.comment.commentContoller;


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
public class CommentControllerImpl {

    private final TokenService tokenService;

    @PostMapping(value = "/{questionId}")
    public ResponseEntity<ExceptionResponse> createQuestionComment(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return ResponseEntity.ok().build();
    }
}
