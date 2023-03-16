package com.soomgo.in42.domain.security.oauth.v2.service;

import com.soomgo.in42.domain.security.oauth.v2.domain.UserPrincipal;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByIntraId(username)
                .orElseThrow(() -> new UsernameNotFoundException("Can not find userId"));
        return UserPrincipal.create(user);
    }
}