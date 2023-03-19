package com.soomgo.in42.global.exception.handler;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.soomgo.in42.global.exception.AccessException;
import java.net.URI;
import java.net.URISyntaxException;
import com.soomgo.in42.global.exception.entity.ExceptionResponse;
import com.soomgo.in42.global.util.ApplicationYmlRead;
@Slf4j
@RestControllerAdvice
@AllArgsConstructor
public class ControllerExceptionAdvice {
    ApplicationYmlRead applicationYmlRead;

    @ExceptionHandler(AccessException.class)
    protected ResponseEntity<ExceptionResponse> customAccessExceptionHandle(AccessException ex) throws URISyntaxException {
        URI redirectUri = new URI(applicationYmlRead.getFrontLoginUrl());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);
        System.out.println("이동함!! : " + redirectUri);
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }
}
