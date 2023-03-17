package com.soomgo.in42.domain.security.jwt;

import com.soomgo.in42.domain.user.User;
//import io.pp.arcade.v1.domain.user.dto.UserDto;
//import io.pp.arcade.v1.global.exception.AccessException;
//import io.pp.arcade.v1.global.exception.BusinessException;
//import io.pp.arcade.v1.global.type.RoleType;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.global.exception.AccessException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenService {
    private final TokenRepository repository;
    public UserDto findUserByAccessToken(String cookieAccessToken, String headerAccessToken) {
        User user = findUser(cookieAccessToken)
                .orElse(findUser(headerAccessToken)
                        .orElseThrow(() -> new AccessException("{front.url}"))
                );
        return UserDto.from(user);
    }

    private Optional<User> findUser(String accessToken) {
        return repository.findByAccessToken(accessToken)
                .map(Token::getUser);
    }

//    public UserDto findUserByAccessToken(String cookieAccessToken, String headerAccessToken){
//        User user = repository.findByAccessToken(cookieAccessToken)
//                .orElse(null)
//                .getUser();
//        if (user == null)
//        {
//            user = repository.findByAccessToken(headerAccessToken)
//                .orElseThrow(() -> new AccessException("{front.url}"))
//                .getUser();
//        }
//        return UserDto.from(user);
//    }
//
//    public UserDto findAdminByAccessToken(String accessToken){
//        User user = repository.findByAccessToken(accessToken)
//                .orElseThrow(() -> new AccessException("{front.url}"))
//                .getUser();
//        if (user.getRoleType() != RoleType.ADMIN)
//            throw new AccessException("{front.url}");
//        return UserDto.from(user);
//    }
//
//    public Token findByAccessToken(String accessToken){
//        return repository.findByAccessToken(accessToken)
//                .orElseThrow(() -> new BusinessException("{token.notfound}"));
//    }
//
//    public UserDto findAdminByRefreshToken(String refreshToken) {
//        User user = repository.findByRefreshToken(refreshToken)
//                .orElseThrow(() -> new AccessException("{front.url}"))
//                .getUser();
//        if (user.getRoleType() != RoleType.ADMIN)
//            throw new AccessException("{front.url}");
//        return UserDto.from(user);
//    }
}
