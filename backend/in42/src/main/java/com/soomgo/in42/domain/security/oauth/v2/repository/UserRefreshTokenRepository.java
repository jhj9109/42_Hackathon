package com.soomgo.in42.domain.security.oauth.v2.repository;

import com.soomgo.in42.domain.security.jwt.Token;
import com.soomgo.in42.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRefreshTokenRepository extends JpaRepository<Token, Long> {
    Token findByUser(User user);
    Token findByUserAndRefreshToken(User user, String refreshToken);
    Token findByRefreshToken(String token);
}