package com.in.hackerton.in42.domain.user.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/in42")
public class UserControllerImpl implements UserController {

    @GetMapping(value = "/test")
    public String firstApiTest() {
        return "Done!";
    }
}
