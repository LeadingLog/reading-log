package com.example.demo.user.Security;

import com.example.demo.user.Entity.JwtToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey; // ✨ import 변경: java.security.Key -> javax.crypto.SecretKey
import java.util.Date;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKeyString;

    private SecretKey key;

    private final long tokenValidTime = 30 * 60 * 1000L;
    private final long accessTokenValidTime = 30 * 60 * 1000L; // 30분
    private final long refreshTokenValidTime = 14 * 24 * 60 * 60 * 1000L; // 14일

    private final UserDetailsService userDetailsService;

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyString);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }



    // Jwt 토큰 생성
    public JwtToken createToken(Authentication authentication) {

//        return Jwts.builder()
//                .subject(userPk)
//                .issuedAt(now)
//                .expiration(new Date(now.getTime() + tokenValidTime))
//                .signWith(key, Jwts.SIG.HS256)
//                .compact();

        // 1. 권한 정보 가져오기 (e.g., "ROLE_USER,ROLE_ADMIN")
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Date now = new Date();

        // 2. Access Token 생성
        Date accessTokenExpiresIn = new Date(now.getTime() + tokenValidTime);
        String accessToken = Jwts.builder()
                .subject(authentication.getName()) // userPk 또는 username
                .claim("auth", authorities) // 권한 정보 추가
                .issuedAt(now)
                .expiration(accessTokenExpiresIn)
                .signWith(key, Jwts.SIG.HS256)
                .compact();

        // 3. Refresh Token 생성 (별도의 claim 없이 만료 시간만 길게 설정)
        String refreshToken = Jwts.builder()
                .expiration(new Date(now.getTime() + tokenValidTime))
                .signWith(key, Jwts.SIG.HS256)
                .compact();

        // 4. JwtToken DTO에 담아 반환
        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

    }

    // Jwt 토큰 복호화
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUserPk(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");

//        String bearerToken = request.getHeader("Authorization");
//        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
//            return bearerToken.substring(7);
//        }
//        return null;
    }

    // 토큰 정보 검증
    public boolean validateToken(String jwtToken) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(jwtToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}