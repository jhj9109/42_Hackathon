package com.soomgo.in42.domain.user.dto;

import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.global.type.RoleType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDto {
    private Integer userId;
    private String intraId;
    private String email;
    private String imageUri;
    private RoleType roleType;
    private Integer totalExp;

    public static UserDto from(User user) {
        UserDto userDto;
        if (user == null) {
            userDto = null;
        } else {
            userDto = UserDto.builder()
                    .userId(user.getId())
                    .intraId(user.getIntraId())
                    .email(user.getEmail())
                    .imageUri(user.getImageUri())
                    .roleType(user.getRoleType())
                    .totalExp(user.getTotalExp())
                    .build();
        }
        return userDto;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId=" + userId +
                ", intraId='" + intraId + '\'' +
                ", email='" + email + '\'' +
                ", imageUri='" + imageUri + '\'' +
                ", roleType=" + roleType +
                ", totalExp=" + totalExp +
                '}';
    }
}