package com.soomgo.in42.domain.qustion.dto;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagDto;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Builder
public class FindOpenQeustionResponseDto {
    List<QuestionDto> questions;

    public static FindOpenQeustionResponseDto from(List<Question> questions) {
        List<QuestionDto> questionsDtos = new ArrayList<>();
        for (Question question : questions) {
            questionsDtos.add(QuestionDto.from(question));
//            if (tagOptional.isPresent()) {
//                tags.add(tagOptional.get());
//            } else {
//                Tag newTag = new Tag();
//                newTag.setName(tagDto.getName());
//                tags.add(tagRepository.save(newTag));
//            }
        }
        return FindOpenQeustionResponseDto.builder()
                .questions(questionsDtos)
                .build();
    }
}
