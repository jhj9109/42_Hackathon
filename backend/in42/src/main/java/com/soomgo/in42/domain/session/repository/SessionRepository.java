package com.soomgo.in42.domain.session.repository;

import com.soomgo.in42.domain.session.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    List<Session> findAllByEndTimeAfter(LocalDateTime time);
}
