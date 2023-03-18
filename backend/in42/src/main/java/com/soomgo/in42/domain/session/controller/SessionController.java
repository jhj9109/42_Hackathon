package com.soomgo.in42.domain.session.controller;

import com.soomgo.in42.domain.session.dto.SessionDto;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface SessionController {
    List<SessionDto> findMentoSession(HttpServletRequest request, @PathVariable("mentoId") Integer mentoId);
}
