package com.soomgo.in42.domain.qustion;

import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
public class Question extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "mento_user_id")
    private Integer mentoUserId;

    @Column(name = "mentee_user_id")
    private Integer menteeUserId;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();
}
