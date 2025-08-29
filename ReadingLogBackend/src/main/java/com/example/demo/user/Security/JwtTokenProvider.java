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

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
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
    
    // 로그아웃된 토큰을 저장하는 블랙리스트 (실제로는 Redis 사용 권장)
    private final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet();

    @PostConstruct
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyString);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰을 블랙리스트에 추가 (로그아웃 시 사용)
    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }
    
    // 토큰이 블랙리스트에 있는지 확인
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
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
        // 표준 Authorization 헤더 사용 (Bearer 토큰)
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        // 기존 커스텀 헤더도 지원 (하위 호환성)
        String customToken = request.getHeader("X-AUTH-TOKEN");
        if (StringUtils.hasText(customToken)) {
            return customToken;
        }
        
        return null;
    }

    // 토큰 정보 검증 (개선된 버전)
    public boolean validateToken(String jwtToken) {
        try {
            // 블랙리스트 확인
            if (isTokenBlacklisted(jwtToken)) {
                return false;
            }
            
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(jwtToken)
                    .getPayload();
            
            // 만료 시간 확인
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}