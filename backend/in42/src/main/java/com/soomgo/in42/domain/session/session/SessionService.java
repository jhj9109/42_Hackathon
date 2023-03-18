package com.soomgo.in42.domain.session.session;

import com.soomgo.in42.domain.session.dto.FindOpenSessionResponseDto;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.session.repository.SessionRepository;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.CreateUserSessionReqeustDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SessionService {

    private UserRepository userRepository;
    private SessionRepository sessionRepository;

    @Transactional
    public Integer createSession(UserDto userDto, CreateUserSessionReqeustDto createSessionDto) {
        User user = userRepository.findById(userDto.getId()).get();

        Session session = Session.builder()
                .user(user)
                .startTime(createSessionDto.getStartTime())
                .endTime(createSessionDto.getEndTime())
                .build();
        return sessionRepository.save(session).getId();
    }

    @Transactional
    public List<SessionDto> findOpenSessions() {
        List<Session> sessions = sessionRepository.findAllByEndTimeAfter(LocalDateTime.now());
        return SessionDto.from(sessions);
    }

    @Transactional
    public List<SessionDto> findUserOpenSessions(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).get();
        List<Session> sessions = user.getSessions().stream()
                .filter(session -> session.getEndTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());

        return SessionDto.from(sessions);
    }
}
