package com.soomgo.in42.domain.qustion.repository;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.global.type.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
//    List<Question> findByEndTimeAfterAndStatusTypeEquals(LocalDateTime endTime, StatusType statusType);
}
