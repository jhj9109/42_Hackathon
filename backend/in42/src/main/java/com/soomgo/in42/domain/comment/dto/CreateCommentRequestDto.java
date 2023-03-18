package com.soomgo.in42.domain.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateCommentRequestDto {
    String content;

    public CreateCommentRequestDto() {
    }

    public CreateCommentRequestDto(String content) {
        this.content = content;
    }
}
