package com.example.demo.user.Repository;

import com.example.demo.code.Provider;
import com.example.demo.user.Entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    ArrayList<RefreshToken> findByUserIdAndProvider(Integer userId, Provider provider);
//    RefreshToken findByUserIdAndProvider(Integer userId, String provider);
    void deleteByUserId(Integer userId);
    RefreshToken findByUserId(Integer userId);



}
