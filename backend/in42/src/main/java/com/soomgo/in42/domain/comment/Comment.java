package com.soomgo.in42.domain.comment;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "mento_user_id")
    private Integer mentoUserId;

    @Column(name = "mentee_user_id")
    private Integer menteUserId;

    @Column(name = "content")
    private String content;
}
