package com.soomgo.in42.domain.security.oauth.v2.info;

import com.soomgo.in42.domain.security.oauth.v2.domain.ProviderType;
import com.soomgo.in42.domain.security.oauth.v2.info.impl.FortyTwoOAuthUserInfo;

import java.util.Map;

public class OAuthUserInfoFactory {
    public static OAuthUserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case FORTYTWO: return new FortyTwoOAuthUserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}