package com.soomgo.in42.domain.session.dto;


import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class SessionDto {

    private Integer sessionId;

    private UserDto mentoUser;

    private Date startTime;

    private Date endTime;

    private List<TagDto> tags;
    public static SessionDto from(Session session) {
        return SessionDto.builder()
                .sessionId(session.getId())
                .mentoUser(UserDto.from(session.getMentoUser()))
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .tags(TagDto.from(session.getTags()))
                .build();
    }
}
