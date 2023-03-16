package com.soomgo.in42.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RankUpdateException extends RuntimeException {
    private String code;
    private String message;

    public RankUpdateException(String message) {
        super(message);
        this.message = message;
    }
}
