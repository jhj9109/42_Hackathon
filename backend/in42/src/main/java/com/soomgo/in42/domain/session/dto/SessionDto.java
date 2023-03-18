package com.soomgo.in42.domain.session.dto;


import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class SessionDto {

    private Integer sessionId;

    private UserDto mentoUser;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private List<TagDto> tags;

    public static SessionDto from(Session session) {
        if (session == null)
            return null;
        return SessionDto.builder()
                .sessionId(session.getId())
                .mentoUser(UserDto.from(session.getMentoUser()))
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .tags(TagDto.from(session.getTags()))
                .build();
    }

    public static List<SessionDto> from(List<Session> sessions) {
        List<SessionDto> sessionDtos = new ArrayList<>();
        for (Session session : sessions) {
            sessionDtos.add(SessionDto.from(session));
        }
        return sessionDtos;
    }
}
