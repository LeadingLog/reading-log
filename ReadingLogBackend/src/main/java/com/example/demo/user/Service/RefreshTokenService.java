package com.example.demo.user.Service;

import com.example.demo.user.Entity.NaverTokenResponse;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository tokenRepository;

    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }


    // 갱신 토큰 저장
    public RefreshToken addToken(RefreshToken refreshToken) {
        return tokenRepository.save(refreshToken);
    }

    // TODO 갱신 토큰으로 접근 토큰 재발급 요청
    public NaverTokenResponse getAccessTokenByRefreshToken() {

        return null;
    }


    // TODO 갱신 토큰 삭제
    public void deleteToken() {
        // https://developers.naver.com/docs/login/devguide/devguide.md#5-1-2-%EA%B0%B1%EC%8B%A0-%ED%86%A0%ED%81%B0%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC

    }


}
