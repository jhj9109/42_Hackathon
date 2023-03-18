package com.soomgo.in42.domain.user.controller;

import com.soomgo.in42.domain.qustion.dto.QuestionDto;
import com.soomgo.in42.domain.qustion.dto.UpdateQuestionTagDto;
import com.soomgo.in42.domain.qustion.service.QuestionService;
import com.soomgo.in42.domain.security.jwt.TokenService;
import com.soomgo.in42.domain.session.dto.SessionDto;
import com.soomgo.in42.domain.session.dto.UpdateSessionTagDto;
import com.soomgo.in42.domain.session.session.SessionService;
import com.soomgo.in42.domain.tag.dto.TagDto;
import com.soomgo.in42.domain.tag.dto.TagListDto;
import com.soomgo.in42.domain.tag.service.TagService;
import com.soomgo.in42.domain.user.dto.CreateUserQuestionRequestDto;
import com.soomgo.in42.domain.user.dto.CreateUserSessionReqeustDto;
import com.soomgo.in42.domain.user.dto.UpdateUserTagRequestDto;
import com.soomgo.in42.domain.user.dto.UserDto;
import com.soomgo.in42.domain.user.service.UserService;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import com.soomgo.in42.global.util.CookieUtil;
import com.soomgo.in42.global.util.HeaderUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/user")
public class UserControllerImpl implements UserController {

    private final UserService userService;
    private final QuestionService questionService;
    private final SessionService sessionService;
    private final TagService tagService;
    private final TokenService tokenService;

    @GetMapping(value = "/test")
    public String firstApiTest(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return "Done!";
    }

    @GetMapping(value = "/detail")
    public UserDto findUserDetail(HttpServletRequest request) {
        return tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
    }

    @GetMapping(value = "/tag")
    public TagListDto findUserTag(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return userService.findUserTags(user);
    }

    @PostMapping(value = "/tag")
    public ResponseEntity<ExceptionResponse> updateUserTag(HttpServletRequest request, UpdateUserTagRequestDto updateUserTagRequestDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        tagService.updateUserTag(user, updateUserTagRequestDto.getTags());
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/question")
    public List<QuestionDto> findUserQuestions(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));

        return questionService.findUserOpenQuestions(user);
    }

    @PostMapping(value = "/question")
    public ResponseEntity<ExceptionResponse> createUserQuestion(HttpServletRequest request, CreateUserQuestionRequestDto createQuestionDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        System.out.println("Controller : " + createQuestionDto);
        UpdateQuestionTagDto updateQuestionTagDto = questionService.createQuestion(user, createQuestionDto, null);
        tagService.updateQuestionTag(updateQuestionTagDto);
        return ResponseEntity.ok().build();
    }
    @PostMapping(value = "/question/{sessionId}")
    public ResponseEntity<ExceptionResponse> createUserQuestionToSession(HttpServletRequest request, CreateUserQuestionRequestDto createQuestionDto, Integer sessionId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        System.out.println("Controller : " + createQuestionDto);
        questionService.createQuestion(user, createQuestionDto, sessionId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/session")
    public List<SessionDto> findUserSession(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return sessionService.findUserOpenSessions(user);
    }

    @PostMapping(value = "/session")
    public ResponseEntity<ExceptionResponse> createUserSession(HttpServletRequest request, CreateUserSessionReqeustDto createSessionDto) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        Integer savedSessionId = sessionService.createSession(user, createSessionDto);
        UpdateSessionTagDto updateSessionTagDto = UpdateSessionTagDto.builder()
                .sessionId(savedSessionId)
                .tagDtos(createSessionDto.getTags())
                .build();
        tagService.updateSessionTag(updateSessionTagDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/question/matched")
    public List<QuestionDto> findUserMatchs(HttpServletRequest request) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        return questionService.findUserMatchedQuestionDtos(user);
    }

    @GetMapping(value = "/{userId}/detail")
    public UserDto findOtherUserDetail(HttpServletRequest request, Integer userId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        UserDto foundUser = userService.findUserById(userId);
        return foundUser;
    }

    @GetMapping(value = "/{userId}/tag")
    public List<TagDto> findOtherUserTag(HttpServletRequest request, Integer userId) {
        UserDto user = tokenService.findUserByAccessToken(CookieUtil.getAccessToken(request), HeaderUtil.getAccessToken(request));
        UserDto foundUser = userService.findUserById(userId);
        TagListDto tagListDto = userService.findUserTags(foundUser);
        return tagListDto.getTags();
    }
}

