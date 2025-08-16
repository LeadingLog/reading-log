package com.example.demo.user.Service;

//import com.example.demo.user.Member;
//import com.example.demo.repository.MemberRepository;

import com.example.demo.code.Provider;
import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.*;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService {

    private final ApiKeyService apiKey;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;
    private final ResponseService responseService;

    private final KakaoService kakaoService;
    private final NaverService naverService;

    public UserService(UserRepository userRepository, RefreshTokenRepository tokenRepository, ApiKeyService apiKey, RefreshTokenService refreshTokenService, ResponseService responseService, KakaoService kakaoService, NaverService naverService) {
        this.userRepository = userRepository;
        this.apiKey = apiKey;
        this.refreshTokenService = refreshTokenService;
        this.responseService = responseService;
        this.kakaoService = kakaoService;
        this.naverService = naverService;
    }

    // 회원 가입
    @Transactional
    public Integer joinWithNaverProfile(NaverProfile naverProfile) {
        if (naverProfile == null) {
            throw new IllegalArgumentException("네이버 회원 정보가 없습니다.");
        }
        User joinedUser = userRepository.save(naverService.prepareUserFromProfile(naverProfile));
        return joinedUser.getUserId();

    }

    // 회원 가입
    @Transactional
    public Integer joinWithKakaoProfile(KakaoProfile kakaoProfile) {
        if (kakaoProfile == null) {
            throw new IllegalArgumentException("카카오 회원 정보가 없습니다.");
        }
        User joinedUser = userRepository.save(kakaoService.prepareUserFromProfile(kakaoProfile));
        return joinedUser.getUserId();
    }


    // 회원 조회 (userUUID)
    @Transactional
    public ArrayList<User> getUserByUUID(String userUUID) {
        ArrayList<User> uuid = userRepository.getIdByUserUUID(userUUID);
        return uuid;
    }

    // 회원 상세 조회 (userId)
    @Transactional
    public User findUserById(Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("findUserById id : " + user.getNickname());
            return user;
        } else {
            System.out.println("error " + userId);
            return null;
        }
    }

    // 회원 정보 수정 (userId) - 마이페이지 수정
    // TODO upd_date 도 업데이트
    @Transactional
    public User updateUser(User user) {
        User newuser = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("user not found"));
        // 이메일 수정
        if (user.getUserEmail() != null) {
            newuser.setUserEmail(user.getUserEmail());
        }

        // 닉네임 수정
        if (user.getNickname() != null) {
            newuser.setNickname(user.getNickname());
        }
        return userRepository.save(newuser);
    }


    // 회원 내부 로그인
    @Transactional
    public Integer loginUser(String userUUID, HttpServletRequest request) {
        HttpSession session = null;

        // 회원 여부 조회
        ArrayList<User> uuid = getUserByUUID(userUUID);
        Integer userId = uuid.get(0).getUserId();

        if (uuid.size() == 1) { // 회원일 경우
            extendSession(userId, request);

            session = request.getSession();
            session.setMaxInactiveInterval(604800); // 7일
            session.setAttribute("loginUserId", userId);
//            session.setAttribute("loginSessionValidTime", session.getMaxInactiveInterval());

            System.out.println("ㅣㅣ야루" + request.getSession().getAttribute("loginUserId"));
        } else {
            return 0;
        }

        return userId;
    }


    // 회원 로그아웃
    @Transactional
    public void logoutUser(HttpServletRequest request) {
        // 로그인 세션 삭제
        // todo 로그아웃 시 Redis 에서 Token 정보 지우기

    }


    @Transactional
    public void deleteUserWithUnlink(Integer userId) throws JsonProcessingException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("해당 사용자를 찾을 수 없습니다. ID: " + userId));

        RefreshToken refreshToken = refreshTokenService.findByUserId(userId);
        Provider provider = refreshToken.getProvider();

        if (provider == Provider.NAVER) {
            naverService.unlinkNaverUser(userId);
        } else if (provider == Provider.KAKAO) {
            kakaoService.unlinkKakaoUser(userId);
        }

        deleteInternalUser(userId);

    }


    @Transactional
    // 내부 회원 탈퇴
    public void deleteInternalUser(Integer userId) {

        try {

            // 회원 삭제
            userRepository.deleteById(userId);

            // 갱신토큰 삭제
            refreshTokenService.deleteToken(userId);

            // Todo 탈퇴 성공 시 로그아웃
            logoutUser(null);

            // 성공 응답 데이터 맵 생성
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("status", "success"); // 성공 상태 표시
            successResponse.put("message", "회원 탈퇴 성공");
            successResponse.put("userId", userId); // 탈퇴한 유저 ID 등 필요한 정보 추가

        } catch (EmptyResultDataAccessException e) {
            // 삭제할 유저가 없는 경우 처리
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "해당 유저를 찾을 수 없어 탈퇴 처리에 실패했습니다.");

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "내부 회원 삭제 중 오류 발생");
        }
    }

    // 회원 세션 남은 시간 조회
    @Transactional
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        HttpSession session = null;
        session = request.getSession();
        Map<String, Object> rtn = new HashMap<>();
        rtn.put("sessionLoginUserId", (Integer) session.getAttribute("loginUserId"));
        rtn.put("sessionLoginValidTime", (Integer) session.getAttribute("loginSessionValidTime"));

        return rtn;
    }


    //  로그인 세션 연장
    /*
     - 사용자가 요청을 할때마다 세션의 비활성 시간이 초기화되어 자동 연장됨.
     - 설정한 GETMAXintervaltime 으로 연장됨
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> extendSession(Integer userId, HttpServletRequest request) {
        try {
            HttpSession session = request.getSession();
            session.setMaxInactiveInterval(604800); // 7일
            session.setAttribute("loginUserId", userId);
            session.setAttribute("loginSessionValidTime", session.getMaxInactiveInterval());
            return responseService.responseData(true, null);
        } catch (Exception e) {
            return responseService.responseData(false, "extend session failed");
        }

    }

    // 이메일로 사용자를 찾는 서비스 메서드 추가
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    // httpOnly 설정을 위해 쿠키에 token을 저장
    public void addAccessTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("accessToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // 개발 환경에서는 false로 설정
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60); // 30분

        response.addCookie(cookie);
    }

}