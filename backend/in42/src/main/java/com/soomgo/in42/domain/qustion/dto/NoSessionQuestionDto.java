package com.soomgo.in42.domain.qustion.dto;

import com.soomgo.in42.domain.comment.dto.CommentDto;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
public class NoSessionQuestionDto {
    private Integer questionId;
    private UserDto menteeUser;
    private String title;
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private List<TagDto> tags;
    private List<CommentDto> comments;

    public static NoSessionQuestionDto from(Question question) {
        return NoSessionQuestionDto.builder()
                .questionId(question.getId())
                .menteeUser(UserDto.from(question.getMenteeUser()))
                .title(question.getTitle())
                .content(question.getContent())
                .startTime(question.getStartTime())
                .endTime(question.getEndTime())
                .status(question.getStatus().getDisplayName())
                .tags(TagDto.from(question.getTags()))
                .build();
    }

    public static List<NoSessionQuestionDto> from(List<Question> questions) {
        List<NoSessionQuestionDto> noSessionQuestionDtos = new ArrayList<>();
        for (Question question : questions) {
            NoSessionQuestionDto noSessionQuestionDto = NoSessionQuestionDto.from(question);
            noSessionQuestionDtos.add(noSessionQuestionDto);
        }
        return noSessionQuestionDtos;
    }
}
