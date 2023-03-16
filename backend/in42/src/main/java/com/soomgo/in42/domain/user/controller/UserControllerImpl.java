package com.soomgo.in42.domain.user.controller;

import com.soomgo.in42.domain.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
//@RequestMapping(value = "/in42")
public class UserControllerImpl implements UserController {

    private final UserService service;

    @GetMapping(value = "/test")
    public String firstApiTest() {
        return "Done!";
    }
}

