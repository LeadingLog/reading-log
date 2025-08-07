package com.example.demo.user.Controller;

//import com.example.demo.user.Member;
//import com.example.demo.service.MemberService;

import com.example.demo.code.Provider;
import com.example.demo.response.ResponseService;
import com.example.demo.user.Entity.*;
import com.example.demo.user.Security.JwtTokenProvider;
import com.example.demo.user.Service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.*;
import java.util.*;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final RefreshTokenService tokenService;
    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, ApiKeyService apiKey, RefreshTokenService tokenService, ResponseService responseService, KakaoService kakaoService, NaverService naverService, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.responseService = responseService;
        this.kakaoService = kakaoService;
        this.naverService = naverService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원 세션 시간 조회
    @GetMapping("/getUserSession")
    public Map<String, Object> getUserSession(HttpServletRequest request) {
        return userService.getUserSession(request);
    }


    // 회원 세션 유지용 컨트롤러
    @GetMapping("/extend_session")
    public ResponseEntity<Map<String,Object>> extendSession(HttpServletRequest request, Integer userId) {
        try {
            return userService.extendSession(userId, request);
        } catch (Exception e) {
            return responseService.responseData(false, "extend session failed");
        }
    }

    // 로그아웃
    @PostMapping("/logout")
    public void logoutUser(HttpServletRequest request) {
        userService.logoutUser(request);
    }

    // 회원 탈퇴
    @DeleteMapping("/{userId}/delete")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable("userId") Integer userId) throws JsonProcessingException {
        Map<String, Object> serviceResult = Map.of();
        Map<String, Object> finalResult = new HashMap<>();
        HttpStatus httpStatus;

        try {
            userService.deleteUserWithUnlink(userId);
//            serviceResult = userService.deleteUserWithUnlink(userId);

            if ("success".equals(serviceResult.get("status"))) {
                httpStatus = HttpStatus.OK;
                finalResult.put("success", true);
            } else {
                finalResult.put("success", false);
                finalResult.put("message", serviceResult.get("message"));
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        }catch (JsonProcessingException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            finalResult.put("success", false);
            finalResult.put("message", "회원 탈퇴 처리 중 데이터 형식 오류 발생");

            finalResult = errorResponse;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "회원 탈퇴 중 예상치 못한 오류가 발생했습니다.");

            finalResult = errorResponse;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(finalResult, httpStatus);
    }



    // 회원 상세 조회 (userId) - 마이페이지 조회
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> findUserById(@PathVariable("userId") Integer userId) {
        Map<String, Object> rtn = new HashMap<>();
        User user = userService.findUserById(userId);
        Provider socialInfo = tokenService.findProviderByUserId(userId);
        if (!user.getNickname().isEmpty()) {
            rtn.put("success", true);
            rtn.put("user", user);
            rtn.put("provider", socialInfo);
            return ResponseEntity.ok().body(rtn);
        } else {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

    }



    // 회원 정보 수정 (userId) - 마이페이지 수정
    @PostMapping("/{userId}/modified")
    public ResponseEntity<Map<String, Object>> updateUser (@PathVariable Integer userId, User user) {
        Map<String, Object> rtn = new HashMap<>();
        if (userId != user.getUserId()) {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

        User savedUser = userService.updateUser(user);

        if (savedUser == null) {
            rtn.put("success", false);
            return ResponseEntity.badRequest().body(rtn);
        }

        rtn.put("success", true);
        rtn.put("user", savedUser);

        return ResponseEntity.ok().body(rtn);
    }


    // 네이버 회원가입 및 로그인
    // callback 이후 접근 토큰 발급 요청
    @ResponseBody
    @PostMapping("/naverlogin")
    public ResponseEntity<?> naverLogin(String code, String state, HttpServletRequest request, HttpServletResponse response) throws IOException, URISyntaxException {
        User users = null;
        Map<String, Object> rtn = new HashMap<>();

        // 1. 접근 토큰 신규 발급
        NaverTokenResponse accessTokenResult = naverService.getNewNaverAccessToken(code, state);
        System.out.println("accessToken="+accessTokenResult);

        // 접근 토큰 에러 시 리턴
        if (accessTokenResult.getError() != null) {
            rtn.put("success", false);
            rtn.put("status", HttpStatus.NOT_ACCEPTABLE);
            rtn.put("error", accessTokenResult.getError());
            rtn.put("error_description", accessTokenResult.getErrorDescription());

            return ResponseEntity.badRequest().body(rtn);
        }

        // 2. 네이버 프로필 정보 조회
        String accessToken = accessTokenResult.getAccessToken();
        NaverProfile naverUserInfo = naverService.getNaverUserInfo(accessToken);

        // 3. 사이트 가입 여부 조회 (미가입 : 회원가입/ 가입 : 로그인)
        String naverId = naverUserInfo.getId();
        ArrayList<User> uuid = userService.getUserByUUID(naverId);

        if (uuid.isEmpty()) {   // 회원 가입
            // 회원 추가
            Integer userId = userService.joinWithNaverProfile(naverUserInfo);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, Provider.NAVER, accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            // 토큰 저장 불가 에러 발생 시 회원 삭제
            if (result == null) {
                userService.deleteUserWithUnlink(userId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }
            // 회원가입한 회원 조회
            users = userService.findUserById(userId);
            //return new ResponseEntity<>(users, HttpStatus.OK);

            // JWT를 HttpOnly 쿠키에 저장
            String jwt = jwtTokenProvider.createToken(users.getUserEmail());
            userService.addAccessTokenCookie(response, jwt);
            return ResponseEntity.ok().build();

        } else if (uuid.size() == 1) {  // 로그인
            // 로그인 처리
            users = uuid.get(0);
            String jwt = jwtTokenProvider.createToken(users.getUserEmail());

            // JWT를 HttpOnly 쿠키에 저장
            userService.addAccessTokenCookie(response, jwt);
            return ResponseEntity.ok().build();
//            Integer loginId = userService.loginUser(naverId, request);
//            users = userService.findUserById(loginId);
//
//            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @ResponseBody
    @PostMapping("/kakaologin")
    // 카카오 회원가입 및 로그인
    public ResponseEntity<?> kakaoLogin(String code, HttpServletResponse response) throws IOException, URISyntaxException {
        User users = null;
        Map<String, Object> rtn = new HashMap<>();

        // 1. 토큰 받기
        KakaoTokenResponse accessTokenResult = kakaoService.getNewKakaoAccessToken(code);

        // 토큰 유효성 검증
        
        
        // 카카오 프로필 정보 조회
        String accessToken = accessTokenResult.getAccessToken();
        KakaoProfile kakaoUserInfo = kakaoService.getKakaoUserInfo(accessToken);

        // 오류 체크
        if (kakaoUserInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보 연동 오류.");
        }

        // 사이트 가입 여부 조회
        String kakaoId = kakaoUserInfo.getId();
        ArrayList<User> uuid = userService.getUserByUUID(kakaoId);

        // 회원가입
        if (uuid.isEmpty()) {
            // 회원 추가
            Integer userId = userService.joinWithKakaoProfile(kakaoUserInfo);
            // 갱신 토큰 저장
            RefreshToken refreshToken = new RefreshToken(null, userId, Provider.KAKAO, accessTokenResult.getRefreshToken());
            RefreshToken result = tokenService.addToken(refreshToken);

            if (result == null) {
                userService.deleteUserWithUnlink(userId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 중 토큰 저장 에러 발생. 재가입 필요");
            }

            users = userService.findUserById(userId);
//            return new ResponseEntity<>(users, HttpStatus.OK);

            // JWT를 HttpOnly 쿠키에 저장
            String jwt = jwtTokenProvider.createToken(users.getUserEmail());
            userService.addAccessTokenCookie(response, jwt);
            return ResponseEntity.ok().build();

        } else if (uuid.size() == 1) {  // 로그인
            users = uuid.get(0);
            String jwt = jwtTokenProvider.createToken(users.getUserEmail());
            //return ResponseEntity.ok(jwt);
//            Integer loginId = userService.loginUser(kakaoId, request);
//            users = userService.findUserById(loginId);

//            return new ResponseEntity<>(users, HttpStatus.OK);
            userService.addAccessTokenCookie(response, jwt);
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Token으로 user 정보 조회가 가능한지 테스트하는 컨트롤러
    @GetMapping("/getTokenTest")
    public ResponseEntity<String> getTokenTest(@CookieValue(name = "accessToken", required = false) String accessToken) {
        // 로그인 후, 헤더에 있는 test 글자를 클릭하면 이 컨트롤러로 진입이 된다.
        // JWT를 HttpOnly 쿠키에 저장했기 때문에, 클라이언트는 별도로 토큰을 전달하지 않아도 됨.
        // 그러나 현재 요청 시 403 Forbidden 에러가 발생하고 있음.
        // 이 에러는 HttpOnly 설정 여부와 무관하게 계속 발생하고 있어, 인증/인가 로직 또는 CORS 설정 등 서버 측 처리 확인이 필요함.

        // 1. 쿠키에 accessToken이 없는 경우
        if (accessToken == null) {
            return ResponseEntity.status(401).body("토큰이 없습니다. 다시 로그인 해주세요.");
        }

        // 2. 토큰이 유효한지 검증
        if (!jwtTokenProvider.validateToken(accessToken)) {
            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다. 다시 로그인 해주세요.");
        }

        String email = jwtTokenProvider.getUserPk(accessToken);
        Optional<User> user = userService.findUserByEmail(email);
        System.out.println("token으로 검색한 userId :" + user.get().getUserId());

        // 4. 성공 응답 반환
        return ResponseEntity.ok("로그인된 사용자: " + user.get().getUserId());
    }




    // 테스트용 컨트롤러
    @PostMapping("/login")
    public ResponseEntity<?> loginTest(@RequestBody Map<String, String> loginRequest) throws IOException, URISyntaxException {
        String email = loginRequest.get("userEmail");
        String password = loginRequest.get("password");

        // UserService에 이메일로 사용자를 찾는 기능이 필요합니다. (2단계 참고)
        Optional<User> userOptional = userService.findUserByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 사용자입니다.");
        }

        User user = userOptional.get();

        // 비밀번호 일치 여부 확인
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 로그인 성공: JWT 토큰 생성
            String token = jwtTokenProvider.createToken(user.getUserEmail());
            return ResponseEntity.ok(token);
        } else {
            // 로그인 실패: 비밀번호 불일치
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 올바르지 않습니다.");
        }
    }









}