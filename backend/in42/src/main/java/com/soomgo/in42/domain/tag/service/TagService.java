package com.soomgo.in42.domain.tag.service;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.repository.QuestionRepository;
import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.dto.UpdateSessionTagDto;
import com.soomgo.in42.domain.session.repository.SessionRepository;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.tag.repository.TagRepository;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Service
public class TagService {

    private TagRepository tagRepository;
    private UserRepository userRepository;
    private QuestionRepository questionRepository;
    private SessionRepository sessionRepository;

    @Transactional
    public Set<Tag> updateUserTag(UserDto userDto, List<TagDto> tagDtoList) {
        User user = userRepository.findById(userDto.getId()).get();
        Set<Tag> tags = new HashSet<>();
        for (TagDto tagDto : tagDtoList) {
            Optional<Tag> tagOptional = tagRepository.findByName(tagDto.getName());
            if (tagOptional.isPresent()) {
                tags.add(tagOptional.get());
            } else {
                Tag newTag = new Tag();
                newTag.setName(tagDto.getName());
                tags.add(tagRepository.save(newTag));
            }
        }
        user.setTags(tags);
        return tags;
    }

    @Transactional
    public Set<Tag> updateQuestionTag(UpdateQuestionTagDto updateTagDto) {
        Question question = questionRepository.findById(updateTagDto.getId()).get();
        Set<Tag> tags = new HashSet<>();
        Optional<Tag> tagOptional = tagRepository.findByName(updateTagDto.getTag().getName());
        if (tagOptional.isPresent()) {
            tags.add(tagOptional.get());
        } else {
            Tag newTag = new Tag();
            newTag.setName(updateTagDto.getTag().getName());
            tags.add(tagRepository.save(newTag));
        }
        question.setTags(tags);
        return tags;
    }

    @Transactional
    public Set<Tag> updateSessionTag(UpdateSessionTagDto updateSessionTagDto) {
        Session session = sessionRepository.findById(updateSessionTagDto.getSessionId()).get();
        List<TagDto> tagDtos = updateSessionTagDto.getTagDtos();
        Set<Tag> tags = new HashSet<>();
        for (TagDto tagDto : tagDtos) {
            Optional<Tag> tagOptional = tagRepository.findByName(tagDto.getName());
            if (tagOptional.isPresent()) {
                tags.add(tagOptional.get());
            } else {
                Tag newTag = new Tag();
                newTag.setName(tagDto.getName());
                tags.add(tagRepository.save(newTag));
            }
        }
        session.setTags(tags);
        return tags;
    }
}