package com.soomgo.in42.domain.tag.repository;

import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.tag.dto.TagDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Set<Tag> findByNameIn(Set<String> tagNames);

    Optional<Tag> findByName(String name);
}
