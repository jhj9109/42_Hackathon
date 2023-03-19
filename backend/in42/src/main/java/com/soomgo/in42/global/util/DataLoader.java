package com.soomgo.in42.global.util;

import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.tag.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.soomgo.in42.domain.tag.dto.TagListDto;

import java.util.*;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public void run(String... args) throws Exception {
        // 초기 사용자 데이터 입력
        List<TagDto> tagDtoList = new ArrayList<TagDto>();
        tagDtoList.add(TagDto.builder()
                .tagName("Makefile").build());
        tagDtoList.add(TagDto.builder()
                .tagName("Libft").build());
        tagDtoList.add(TagDto.builder()
                .tagName("ft_printf").build());
        tagDtoList.add(TagDto.builder()
                .tagName("Born2beroot").build());
        tagDtoList.add(TagDto.builder()
                .tagName("get_next_line").build());
        tagDtoList.add(TagDto.builder()
                .tagName("push_swap").build());
        tagDtoList.add(TagDto.builder()
                .tagName("pipex").build());
        tagDtoList.add(TagDto.builder()
                .tagName("minitalk").build());
        tagDtoList.add(TagDto.builder()
                .tagName("so_long").build());
        tagDtoList.add(TagDto.builder()
                .tagName("Fdf").build());
        tagDtoList.add(TagDto.builder()
                .tagName("fract-ol").build());
        tagDtoList.add(TagDto.builder()
                .tagName("Philosophers").build());
        tagDtoList.add(TagDto.builder()
                .tagName("minishell").build());
        tagDtoList.add(TagDto.builder()
                .tagName("minirt").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cub3d").build());
        tagDtoList.add(TagDto.builder()
                .tagName("NetPractice").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp00").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp01").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp02").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp03").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp04").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp05").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp06").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp07").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp08").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp08").build());
        tagDtoList.add(TagDto.builder()
                .tagName("cpp09").build());
        tagDtoList.add(TagDto.builder()
                .tagName("ft_container").build());
        tagDtoList.add(TagDto.builder()
                .tagName("Inception").build());
        tagDtoList.add(TagDto.builder()
                .tagName("webserv").build());
        tagDtoList.add(TagDto.builder()
                .tagName("ft_irc").build());
        tagDtoList.add(TagDto.builder()
                .tagName("ft_transcendence").build());

        for (TagDto tagDto : tagDtoList) {
            Optional<Tag> tagOptional = tagRepository.findByName(tagDto.getTagName());
            if (!tagOptional.isPresent()) {
                Tag newTag = new Tag();
                newTag.setName(tagDto.getTagName());
                tagRepository.save(newTag);
            }
        }
    }
}