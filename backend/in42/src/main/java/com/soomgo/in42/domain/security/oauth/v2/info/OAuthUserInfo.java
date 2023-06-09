package com.soomgo.in42.domain.security.oauth.v2.info;

import java.util.Map;

public abstract class OAuthUserInfo {
    protected Map<String, Object> attributes;

    public OAuthUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getIntraId();

    public abstract String getEmail();

    public abstract String getImageUrl();
}