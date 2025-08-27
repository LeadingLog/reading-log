package com.example.demo.user.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment 설정
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "password")
    private String password;

    @Column(name = "user_uuid", nullable = false)
    private String userUUID;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "user_email", nullable = true)
    private String userEmail;

    private String role;

    @CreationTimestamp
    @Column(name = "ins_date", nullable = false)
    private Timestamp InsDate;

    @UpdateTimestamp
    @Column(name = "upd_date")
    private Timestamp updDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

//    @Override
    private Collection<? extends GrantedAuthority> getAuthorities(){
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

    }
}