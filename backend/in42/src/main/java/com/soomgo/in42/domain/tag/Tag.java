package com.soomgo.in42.domain.tag;


import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tag_name")
    private String name;

    @ManyToMany(mappedBy = "tags")
    private Set<User> users = new HashSet<>();

    @ManyToMany(mappedBy = "tags")
    private List<Question> questions = new ArrayList<>();

    @ManyToMany(mappedBy = "tags")
    private List<Question> sessions = new ArrayList<>();

    // 생성자, getter, setter, toString 등의 메소드
}