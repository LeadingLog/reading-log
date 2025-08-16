package com.example.demo;

import com.example.demo.code.Provider;
import com.example.demo.user.Entity.RefreshToken;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.RefreshTokenRepository;
import com.example.demo.user.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

import static org.hamcrest.Matchers.isA;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class UserControllerTest {

    // --- Constants for better maintainability ---
    private static final String LOGIN_URL = "/user/login";
    // 경로 포맷을 상수로 정의합니다.
    private static final String PROTECTED_URL_FORMAT = "/user/%d";
    private static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";
    private static final String TEST_USER_EMAIL = "test@example.com";
    private static final String TEST_USER_PASSWORD = "1234";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private User testUser;

    @BeforeEach
    void setup() {
        User userToSave = User.builder()
                .userUUID(UUID.randomUUID().toString())
                .nickname("테스트유저")
                .userEmail(TEST_USER_EMAIL)
                .password(passwordEncoder.encode(TEST_USER_PASSWORD))
                .build();
        // save() 메서드 실행 후, userToSave 객체에는 DB에서 생성된 ID가 채워집니다.
        this.testUser = userRepository.save(userToSave);

        // 2. 해당 유저를 위한 RefreshToken 생성 및 저장
        //    (컨트롤러 로직이 RefreshToken을 필요로 하므로 반드시 추가해야 합니다)
        RefreshToken testToken = RefreshToken.builder()
                .userId(this.testUser.getUserId())
                .provider(Provider.LOCAL)
                .token("dummy-refresh-token-for-test")
                .build();
        refreshTokenRepository.save(testToken);
    }

    /**
     * Helper method to perform login and get the token.
     * This reduces code duplication.
     */
    private String getAuthToken() throws Exception {
        Map<String, String> loginRequest = Map.of(
                "userEmail", TEST_USER_EMAIL,
                "password", TEST_USER_PASSWORD
        );

        return mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
    }

    @Test
    @DisplayName("로그인 성공 및 토큰 발급")
    void loginSuccess() throws Exception {
        // given
        Map<String, String> loginRequest = Map.of(
                "userEmail", TEST_USER_EMAIL,
                "password", TEST_USER_PASSWORD
        );

        // when & then
        mockMvc.perform(post(LOGIN_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", isA(String.class))) // Check if the response is a string
                .andDo(print());
    }

    @Test
    @DisplayName("토큰 없이 보호된 API 접근 시 403 Forbidden 응답")
    void accessDeniedWithoutToken() throws Exception {
        // setup에서 생성된 사용자의 ID를 사용하여 유효한 숫자 경로로 테스트합니다.
        String protectedUrlWithId = String.format(PROTECTED_URL_FORMAT, testUser.getUserId());
        mockMvc.perform(get(protectedUrlWithId))
                .andExpect(status().isForbidden())
                .andDo(print());
    }

    @Test
    @DisplayName("유효한 토큰으로 보호된 API 접근 성공")
    void accessSuccessWithToken() throws Exception {
        // given: Get a token using the helper method
        String token = getAuthToken();
        System.out.println("발급된 토큰: " + token);

        // setup에서 생성된 사용자의 ID를 사용하여 유효한 숫자 경로를 만듭니다.
        String protectedUrlWithId = String.format(PROTECTED_URL_FORMAT, testUser.getUserId());

        // when & then: Call the protected API with the token and the correct URL
        mockMvc.perform(get(protectedUrlWithId) // 수정된 URL 사용
                        .header(AUTH_HEADER_NAME, token))
                .andExpect(status().isOk())
                .andDo(print());
    }
}