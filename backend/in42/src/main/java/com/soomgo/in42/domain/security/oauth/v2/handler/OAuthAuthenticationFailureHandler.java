package com.soomgo.in42.domain.security.oauth.v2.handler;

import com.soomgo.in42.domain.security.oauth.v2.repository.OAuthAuthorizationRequestBasedOnCookieRepository;
import com.soomgo.in42.global.util.ApplicationYmlRead;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuthAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    private static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    private final OAuthAuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
    private final ApplicationYmlRead applicationYmlRead;
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String targetUrl = applicationYmlRead.getFrontUrl();

        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
