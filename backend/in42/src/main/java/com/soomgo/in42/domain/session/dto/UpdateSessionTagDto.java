package com.soomgo.in42.domain.session.dto;


import com.soomgo.in42.domain.tag.dto.TagDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UpdateSessionTagDto {
    private Integer sessionId;
    private List<TagDto> tagDtos;
}
