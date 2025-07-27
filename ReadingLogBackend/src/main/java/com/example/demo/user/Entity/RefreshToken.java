package com.example.demo.user.Entity;

import com.example.demo.code.Provider;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Builder
@Entity
@Table(name = "refresh_token")
//@IdClass(RefreshTokenId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment 설정
    @Column(name = "num_seq")
    private Integer numSeq;

//    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private Provider provider;

    @Column(name = "token", nullable = false)
    private String token;

}