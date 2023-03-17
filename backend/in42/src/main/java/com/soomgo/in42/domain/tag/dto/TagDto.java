package com.soomgo.in42.domain.tag.dto;

import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Builder
public class TagDto {
    private Integer id;
    private String name;

    public static TagDto from(Tag tag) {
        TagDto tagDto;
        if (tag == null) {
            tagDto = null;
        } else {
            tagDto = TagDto.builder()
                    .id(tag.getId())
                    .name(tag.getName())
                    .build();
        }
        return tagDto;
    }

    public static Set<Tag> convertTagDtoListToTagSet(List<TagDto> tagDtoList) {
        Set<Tag> tagSet = new HashSet<>();
        for (TagDto tagDto : tagDtoList) {
            tagSet.add(new Tag(tagDto.getName()));
        }
        return tagSet;
    }
}
