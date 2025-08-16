package com.example.demo.user.Entity;

import com.example.demo.code.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Collections;


@Builder
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(name = "ins_date", nullable = false)
    private Timestamp InsDate;

    @UpdateTimestamp
    @Column(name = "upd_date")
    private Timestamp updDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        if (this.role == null) {
            return Collections.emptyList();
        }
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        // 4. Spring Security에서 사용자의 '이름'(ID)으로 사용할 필드를 지정합니다.
        return this.userEmail;
    }

    // 5. 아래 메서드들은 계정의 상태를 나타냅니다. 특별한 로직이 없다면 true를 반환하도록 둡니다.
    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정이 만료되지 않았음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정이 잠기지 않았음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 비밀번호가 만료되지 않았음
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정이 활성화됨
    }
}