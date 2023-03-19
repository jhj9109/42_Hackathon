package com.soomgo.in42.domain.session.session;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.qustion.dto.NoSessionQuestionDto;
import com.soomgo.in42.domain.session.dto.FindOpenSessionResponseDto;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.session.repository.SessionRepository;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.dto.CreateUserSessionReqeustDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.repository.UserRepository;
import com.soomgo.in42.global.type.StatusType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SessionService {

    private UserRepository userRepository;
    private SessionRepository sessionRepository;

    @Transactional
    public Integer createSession(UserDto userDto, CreateUserSessionReqeustDto createSessionDto) {
        User user = userRepository.findById(userDto.getUserId()).get();

        Session session = Session.builder()
                .user(user)
                .startTime(createSessionDto.getStartTime())
                .endTime(createSessionDto.getEndTime())
                .build();
        checkSessionDup(user, session);
        return sessionRepository.save(session).getId();
    }

    @Transactional
    public List<SessionDto> findOpenSessions() {
        List<Session> sessions = sessionRepository.findAllByEndTimeAfter(LocalDateTime.now());
        List<SessionDto> sessionDtos = SessionDto.from(sessions);
        for (SessionDto sessionDto : sessionDtos)
        {
            List<NoSessionQuestionDto> filteredQeustions =  sessionDto.getNoSessionQuestionDtos().stream()
                    .filter(q -> q.getStatus() != StatusType.CANCELED.getDisplayName() || q.getStatus() != StatusType.COMPLETED.getDisplayName())
                    .collect(Collectors.toList());
            sessionDto.setNoSessionQuestionDtos(filteredQeustions);
        }
        return SessionDto.from(sessions);
    }

    @Transactional(readOnly = true)
    public List<SessionDto> findUserSessionLog(UserDto userDto) {
        User user = userRepository.findById(userDto.getUserId()).orElseThrow(() -> new RuntimeException("유저를 찾을수 없습니다!"));
        List<Session> sessions = user.getSessions();
        sessions.sort(Comparator.comparing(Session::getStartTime));
        List<SessionDto> sessionDtos = SessionDto.from(sessions);
        return sessionDtos;
    }
    @Transactional
    public List<SessionDto> findUserOpenSessions(UserDto userDto) {
        User user = userRepository.findById(userDto.getUserId()).get();
        List<Session> sessions = user.getSessions().stream()
                .filter(session -> session.getEndTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());

        return SessionDto.from(sessions);
    }

    public static void checkSessionDup(User user, Session newSession) {
        List<Session> sessions = user.getSessions().stream()
                .filter(session-> session.getEndTime().isAfter(LocalDateTime.now()))
                .collect(Collectors.toList());
        for (int i = 0; i < sessions.size(); i++) {
            if (isOverlap(sessions.get(i), newSession))
                throw new RuntimeException("이미 생성된 세션과 겹칩니다!");
        }
    }

    public static boolean isOverlap(Session session1, Session session2) {
        LocalDateTime start1 = session1.getStartTime();
        LocalDateTime end1 = session1.getEndTime();
        LocalDateTime start2 = session2.getStartTime();
        LocalDateTime end2 = session2.getEndTime();

        if (start1.isEqual(end1) || start2.isEqual(end2)) {
            return false;
        }
        // 첫 번째 기간이 두 번째 기간의 이전에 끝날 때
        if (end1.isBefore(start2)) {
            return false;
        }

        // 첫 번째 기간이 두 번째 기간의 이후에 시작할 때
        if (start1.isAfter(end2)) {
            return false;
        }

        // 나머지 경우에는 두 기간이 겹칩니다.
        return true;
    }
}
