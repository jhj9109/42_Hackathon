package com.soomgo.in42.domain.session.controller;


import com.soomgo.in42.domain.security.jwt.Token;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/sessions")
public class SessionControllerImpl {

    private final TokenService tokenService;
    @GetMapping(value = "")
    public UserDto findOpenSessions(HttpServletRequest request){
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }

    @GetMapping(value = "/{mentoId}")
    public UserDto findMentoSession(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return user;
    }
}
