package com.example.demo.user.Repository;

import com.example.demo.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface UserRepository extends JpaRepository<User, Integer> {
    ArrayList<User> getIdByUserUUID (String userUUID);
}
