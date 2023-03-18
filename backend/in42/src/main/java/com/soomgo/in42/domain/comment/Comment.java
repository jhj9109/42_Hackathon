package com.soomgo.in42.domain.comment;

import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @Builder
    public Comment(String content, Question question) {
        this.content = content;
        this.question = question;
    }
}
