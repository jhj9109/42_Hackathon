package com.soomgo.in42.domain.comment.dto;

import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
public class CommentDto {
    Integer commentId;
    String content;

    public static CommentDto from(Comment comment) {
        if (comment == null)
            return null;
        return CommentDto.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .build();
    }

    public static List<CommentDto> from(List<Comment> comments) {
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.from(comment);
            commentDtos.add(commentDto);
        }
        return commentDtos;
    }
}
