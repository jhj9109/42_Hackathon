package com.soomgo.in42.domain.user.service;

import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagListDto;
import com.soomgo.in42.domain.tag.repository.TagRepository;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

//    @Transactional
//    public void updateUserTag(UserDto userDto, List<TagDto> tagDtos) {
//        User user = userRepository.findById(userDto.getId()).get();
//        Set<Tag> tags = tagRepository.findByNameIn(tagDtos.stream().map(TagDto::getName).collect(Collectors.toSet()));
//        user.setTags(tags);
//    }

    @Transactional(readOnly = true)
    public UserDto findUserById(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        return UserDto.from(user);
    }
    @Transactional(readOnly = true)
    public TagListDto findUserTags(UserDto userDto) {
        User user = userRepository.findById(userDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + userDto.getUserId()));

        Set<Tag> tagSet = user.getTags();
        List<Tag> tagList = new ArrayList<>(tagSet);
        return TagListDto.from(tagList);
    }
}

