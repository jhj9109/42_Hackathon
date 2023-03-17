package com.soomgo.in42.domain.qustion.repository;

import com.soomgo.in42.domain.qustion.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
