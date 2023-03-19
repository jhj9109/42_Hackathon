package com.soomgo.in42.domain.session.dto;

import com.soomgo.in42.domain.session.Session;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class FindOpenSessionResponseDto {
    List<SessionDto> sessions;

    public static FindOpenSessionResponseDto from(List<Session> sessions) {
        List<SessionDto> sessionDtos = new ArrayList<>();
        for (Session session : sessions) {
            sessionDtos.add(SessionDto.from(session));
        }
        return FindOpenSessionResponseDto.builder()
                .sessions(sessionDtos)
                .build();
    }
}
