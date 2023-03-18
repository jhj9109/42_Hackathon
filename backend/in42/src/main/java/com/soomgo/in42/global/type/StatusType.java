package com.soomgo.in42.global.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum StatusType {

    CANCELED("STATUS_CANCELED", "취소됨", 4),
    COMPLETED("STATUS_COMPLETED", "처리 완료", 3),
    MATCHED("STATUS_MATCHED", "매칭 완료", 2),
    MATCHING("STATUS_MATCHING", "매칭 중", 1);

    private final String key;
    private final String displayName;
    private final Integer value;

    public static StatusType of(String key) {
        return Arrays.stream(StatusType.values())
                .filter(r -> r.getKey().equals(key))
                .findAny()
                .orElse(COMPLETED);
    }
}
