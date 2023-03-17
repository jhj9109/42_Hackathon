package com.soomgo.in42.domain.user;

import com.soomgo.in42.domain.comment.Comment;
import com.soomgo.in42.domain.qustion.Question;
import com.soomgo.in42.domain.session.Session;
import com.soomgo.in42.domain.tag.Tag;
import com.soomgo.in42.global.type.RoleType;
import com.soomgo.in42.global.util.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
public class User extends BaseTimeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @NotNull
    @Setter
    @Column(name = "intra_id")
    private String intraId;

    @Setter
    @Column(name = "e_mail")
    private String email;

    @Setter
    @Column(name = "image_uri")
    private String imageUri;

    @Setter
//    @NotNull
    @Column(name = "role_type")
    private RoleType roleType;

    @Setter
    @Column(name = "total_exp")
    private Integer totalExp;

    @OneToMany(mappedBy = "mentoUser")
    private List<Session> sessions = new ArrayList<>();

    @OneToMany(mappedBy = "menteeUser")
    private List<Question> questions = new ArrayList<>();

    @Setter
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_tag",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    @Builder
    public User(String intraId, String email, String imageUri, RoleType roleType,Integer totalExp) {
        this.intraId = intraId;
        this.email = email;
        this.imageUri = imageUri;
        this.roleType = roleType;
        this.totalExp = totalExp;
    }
}
