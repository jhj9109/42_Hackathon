package com.soomgo.in42.domain.session;

import com.mysql.cj.conf.PropertyDefinitions;
import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.domain.user.User;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class Session extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Setter
    @Column(name = "mento_user_id")
    private Integer mentoUserId;

    @Setter
    @Column(name = "start_time")
    private Date startTime;

    @Setter
    @Column(name = "end_time")
    private Date endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mento_user_id", insertable = false, updatable = false)
    private User mentoUser;

    @OneToMany(mappedBy = "session")
    private List<Question> questions = new ArrayList<>();


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "session_tag",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();
}
