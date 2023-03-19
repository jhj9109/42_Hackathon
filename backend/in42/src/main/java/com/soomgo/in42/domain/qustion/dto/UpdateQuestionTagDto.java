package com.soomgo.in42.domain.qustion.dto;

import com.soomgo.in42.domain.tag.dto.TagDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UpdateQuestionTagDto {

    private Integer id;
    private String title;
    private String content;
    private List<TagDto> tags;
}
