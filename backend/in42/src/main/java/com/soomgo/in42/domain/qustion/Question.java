package com.soomgo.in42.domain.qustion;

import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.global.type.StatusType;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    /* 멘토정보는 세션에 들어있음 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentee_user_id", updatable = false)
    private User menteeUser;
    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Setter
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "question")
    private List<Comment> comments = new ArrayList<>();

    @NotNull
    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "status")
    private StatusType status;

    @Builder
    public Question(Session session, User menteeUser, String title, String content, Set<Tag> tags, List<Comment> comments, StatusType status, LocalDateTime startTime, LocalDateTime endTime) {
        this.session = session;
        this.menteeUser = menteeUser;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.comments = comments;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
