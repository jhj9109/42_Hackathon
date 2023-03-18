package com.soomgo.in42.domain.user.dto;

import com.soomgo.in42.domain.tag.dto.TagDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class CreateUserSessionReqeustDto {

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime startTime;
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime endTime;

    private List<TagDto> tags;
}
