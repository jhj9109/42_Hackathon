package com.in.hackerton.in42;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class In42Application {

    public static void main(String[] args) {
        SpringApplication.run(In42Application.class, args);
    }

}
