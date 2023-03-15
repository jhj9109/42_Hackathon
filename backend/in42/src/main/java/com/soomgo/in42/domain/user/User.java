package com.soomgo.in42.domain.user;

import com.soomgo.in42.global.util.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class User extends BaseTimeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Setter
    @Column(name = "intra_id")
    private String intraId;

    @Setter
    @Column(name = "e_mail")
    private String eMail;

    @Setter
    @Column(name = "image_uri")
    private String imageUri;

    @Setter
    @Column(name = "total_exp")
    private Integer totalExp;

    @Builder
    public User(String intraId, String eMail, String imageUri, Integer totalExp) {
        this.intraId = intraId;
        this.eMail = eMail;
        this.imageUri = imageUri;
        this.totalExp = totalExp;
    }
}
