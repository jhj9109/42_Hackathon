package com.soomgo.in42.domain.qustion.dto;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.global.type.StatusType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class QuestionDto {

    private Integer questionId;
    private SessionDto session;
    private String title;
    private String content;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private List<TagDto> tags;

    public static QuestionDto from(Question question) {
        return QuestionDto.builder()
                .questionId(question.getId())
                .session(SessionDto.from(question.getSession()))
                .title(question.getTitle())
                .content(question.getContent())
                .startTime(question.getStartTime())
                .endTime(question.getEndTime())
                .status(question.getStatus().getDisplayName())
                .tags(TagDto.from(question.getTags()))
                .build();
    }
    //    {
//[{
//        questionId : Integer
//        session : Session
//        title : String
//        content : String
//        startTime : Date
//        endTime : Date
//        status : String
//    } , { … }]
//    }
}
