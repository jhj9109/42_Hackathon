package com.soomgo.in42.domain.user.dto;

import com.soomgo.in42.domain.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class UpdateUserTagRequestDto {
    List<TagDto> tags;

    public UpdateUserTagRequestDto() {
    }
    public UpdateUserTagRequestDto(List<TagDto> tagDtos)
    {
        this.tags = tagDtos;
    }
}
