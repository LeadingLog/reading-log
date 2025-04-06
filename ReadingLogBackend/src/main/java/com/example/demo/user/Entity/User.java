package com.example.demo.user.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto Increment 설정
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_uuid", nullable = false)
    private String userUUID;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @CreationTimestamp
    @Column(name = "ins_date", nullable = false)
    private Timestamp InsDate;

    @UpdateTimestamp
    @Column(name = "upd_date")
    private Timestamp updDate;
}