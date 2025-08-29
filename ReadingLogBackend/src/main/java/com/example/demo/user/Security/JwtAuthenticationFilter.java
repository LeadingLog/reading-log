package com.example.demo.user.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            
            // 1. 토큰 추출
            String token = jwtTokenProvider.resolveToken(httpRequest);
            
            if (StringUtils.hasText(token)) {
                log.debug("JWT 토큰 추출됨: {}", token.substring(0, Math.min(token.length(), 20)) + "...");
                
                // 2. validateToken 으로 유효성 검사
                if (jwtTokenProvider.validateToken(token)) {
                    // 토큰이 유효할 경우 토큰에서 Authentication 객체 추출 > SecurityContext 에 저장
                    Authentication authentication = jwtTokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.debug("사용자 인증 성공: {}", authentication.getName());
                } else {
                    log.warn("유효하지 않은 JWT 토큰");
                }
            } else {
                log.debug("JWT 토큰이 요청에 포함되지 않음");
            }
        } catch (Exception e) {
            log.error("JWT 인증 처리 중 오류 발생", e);
        }
        
        chain.doFilter(request, response);
    }
}