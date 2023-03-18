package com.soomgo.in42.domain.session.controller;


import com.mysql.cj.Session;
import com.soomgo.in42.domain.security.jwt.Token;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.session.session.SessionService;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.service.UserService;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.xml.stream.events.StartDocument;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/session")
public class SessionControllerImpl implements SessionController {
    private final TokenService tokenService;
    private final UserService userService;
    private final SessionService sessionService;

    @GetMapping(value = "")
    public List<SessionDto> findOpenSessions(HttpServletRequest request){
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return sessionService.findOpenSessions();
    }

    @GetMapping(value = "/{mentoId}")
    public List<SessionDto> findMentoSession(HttpServletRequest request, Integer mentoId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        UserDto targetUser = userService.findUserById(mentoId);
        return sessionService.findUserOpenSessions(targetUser);
    }
}
