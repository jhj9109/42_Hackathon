package com.soomgo.in42.domain.security.oauth.v2.handler;

import com.soomgo.in42.domain.security.jwt.Token;
import com.soomgo.in42.domain.security.oauth.v2.config.properties.AppProperties;
import com.soomgo.in42.domain.security.oauth.v2.domain.ProviderType;
import com.soomgo.in42.domain.security.oauth.v2.info.OAuthUserInfo;
import com.soomgo.in42.domain.security.oauth.v2.info.OAuthUserInfoFactory;
import com.soomgo.in42.domain.security.oauth.v2.repository.OAuthAuthorizationRequestBasedOnCookieRepository;
import com.soomgo.in42.domain.security.oauth.v2.repository.UserRefreshTokenRepository;
import com.soomgo.in42.domain.security.oauth.v2.token.AuthToken;
import com.soomgo.in42.domain.security.oauth.v2.token.AuthTokenProvider;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.domain.user.repository.UserRepository;
import com.soomgo.in42.global.type.RoleType;
import com.soomgo.in42.global.util.ApplicationYmlRead;
import com.soomgo.in42.global.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Component
@RequiredArgsConstructor
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";

    private final String ACCESS_TOKEN = "access_token";
    private final String REFRESH_TOKEN = "refresh_token";
    private final AuthTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final AppProperties appProperties;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final OAuthAuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
    private final ApplicationYmlRead applicationYmlRead;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        String finalUrl = determineTargetUrl(request, response, authentication);

        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        System.out.println("OAUTH_TOKEN : " + authToken.getAuthorizedClientRegistrationId());
        ProviderType providerType = ProviderType.keyOf (authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuthUserInfo userInfo = OAuthUserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getKey()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userInfo.getIntraId(),
                roleType.getKey(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        User saveUser = userRepository.findByIntraId(userInfo.getIntraId()).orElseThrow();

        Token userRefreshToken = userRefreshTokenRepository.findByUser(saveUser);
        if (userRefreshToken != null) {
            userRefreshToken.setRefreshToken(refreshToken.getToken());
            userRefreshTokenRepository.save(userRefreshToken);
        } else {
            userRefreshToken = new Token(saveUser, refreshToken.getToken(), userInfo.getIntraId());//accessToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        }


        int cookieMaxAge = (int) refreshTokenExpiry / 60;

        CookieUtil.deleteCookie(request, response, ACCESS_TOKEN);
        CookieUtil.addCookie(response, ACCESS_TOKEN, userInfo.getIntraId(), cookieMaxAge + 60 * 60 * 24);
        ResponseCookie cookie = ResponseCookie.from(ACCESS_TOKEN, userInfo.getIntraId())
//                .domain("localhost")
                .domain("10.18.238.114")
//                .domain("10.18.201.217")
//                .domain("273f-121-135-181-61.jp.ngrok.io")
                .sameSite("None")
                .httpOnly(false)
                .secure(true)
                .path("/")
                .maxAge(cookieMaxAge + 60 * 60 * 24)
                .build();
//        response.setHeader("Set-Cookie", ACCESS_TOKEN+"="+userInfo.getIntraId()+"   Secure; SameSite=None; MaxAge=1000000;");
//        System.out.println(cookie.toString());
        response.setHeader("Set-Cookie", cookie.toString());
        response.addHeader("Authorization", "Bearer " + userInfo.getIntraId());

        String finalUrl = UriComponentsBuilder.fromUriString(applicationYmlRead.getFrontUrl())
//                .queryParam("token", userRefreshToken == null ? accessToken.getToken() : userRefreshToken.getAccessToken())
                .build().toUriString();

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + finalUrl);
            return;
        }
        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, finalUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.keyOf (authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuthUserInfo userInfo = OAuthUserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getKey()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userInfo.getIntraId(),
                roleType.getKey(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // refresh 토큰 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // DB 저장
        User saveUser = userRepository.findByIntraId(userInfo.getIntraId()).orElseThrow();

        Token userRefreshToken = userRefreshTokenRepository.findByUser(saveUser);
        if (userRefreshToken != null) {
            userRefreshToken.setRefreshToken(refreshToken.getToken());
            userRefreshTokenRepository.save(userRefreshToken);
        } else {
            userRefreshToken = new Token(saveUser, userInfo.getIntraId(), userInfo.getIntraId());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        }


        int cookieMaxAge = (int) refreshTokenExpiry / 60;

        CookieUtil.deleteCookie(request, response, ACCESS_TOKEN);
        CookieUtil.addCookie(response, ACCESS_TOKEN, userInfo.getIntraId(), cookieMaxAge + 60 * 60 * 24);

        return UriComponentsBuilder.fromUriString(applicationYmlRead.getFrontUrl())
                .queryParam("token", userRefreshToken == null ? accessToken.getToken() : userRefreshToken.getAccessToken())
                .build().toUriString();
    }

    private Map<String, String> getTokens(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);
        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.keyOf (authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuthUserInfo userInfo = OAuthUserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getKey()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userInfo.getIntraId(),
                roleType.getKey(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // refresh 토큰 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // DB 저장
        User saveUser = userRepository.findByIntraId(userInfo.getIntraId()).orElseThrow();

        Token userRefreshToken = userRefreshTokenRepository.findByUser(saveUser);
        if (userRefreshToken != null) {
            userRefreshToken.setRefreshToken(refreshToken.getToken());
            userRefreshTokenRepository.save(userRefreshToken);
        } else {
            userRefreshToken = new Token(saveUser, refreshToken.getToken(), accessToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        }


        int cookieMaxAge = (int) refreshTokenExpiry / 60;

        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken.getToken());
        tokens.put("refreshToken", refreshToken.getToken());
        return tokens;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        //authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
        if (authorities == null) {
            return false;
        }

        for (GrantedAuthority grantedAuthority : authorities) {
            if (authority.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}

