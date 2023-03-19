package com.soomgo.in42.domain.comment.repository;

import com.soomgo.in42.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
