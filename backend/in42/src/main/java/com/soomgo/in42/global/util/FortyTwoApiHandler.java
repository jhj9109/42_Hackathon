package com.soomgo.in42.global.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Component
public class FortyTwoApiHandler {

    public static String getSeoulLocations() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.intra.42.fr/v2/campus/{campus_id}/locations?filter[host]=e1r5p12&range[begin_at]=2022-03-01,2022-03-19&user_id=1";
        String token = "Bearer <access_token>";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class, 29);

        return response.getBody();
    }
}
