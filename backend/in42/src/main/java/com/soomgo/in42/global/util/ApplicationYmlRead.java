package com.soomgo.in42.global.util;

import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@Setter
@ConfigurationProperties(prefix = "info")
public class ApplicationYmlRead {
    private Map<String,String> web;

    public String getFrontUrl() {
        return web.get("frontUrl");
    }
    public String getFrontLoginUrl() {
        return web.get("frontUrl") + "/login";
    }
}