package com.example.demo.user.Repository;

import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    ArrayList<User> getIdByUserUUID (String userUUID);
//    Integer updateByUserId (@Param("userId") Integer userId)
    Optional<User> findByUserEmail(String userEmail);
}
