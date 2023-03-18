package com.soomgo.in42.domain.session;

import com.mysql.cj.conf.PropertyDefinitions;
import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class Session extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mento_user_id", updatable = false)
    private User mentoUser;

    @Setter
    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Setter
    @Column(name = "end_time")
    private LocalDateTime endTime;

    @OneToMany(mappedBy = "session")
    private List<Question> questions = new ArrayList<>();

    @Setter
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "session_tag",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    @Builder
    public Session(User user, LocalDateTime startTime, LocalDateTime endTime, List<Question> questions, Set<Tag> tags) {
        this.mentoUser = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.questions = questions;
        this.tags = tags;
    }
}
