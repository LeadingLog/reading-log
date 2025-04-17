package com.example.demo.user.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NaverProfile {
    @JsonProperty("id")
    private String id;
    @JsonProperty("nickname")
    private String nickname;
    private String name;
    @JsonProperty("email")
    private String email;
    private String gender;
    private String age;
    private String birthyear;
    private String mobile;


    public NaverProfile(String body) {
    }
}
