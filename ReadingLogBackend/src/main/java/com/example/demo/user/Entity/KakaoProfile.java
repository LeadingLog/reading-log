package com.example.demo.user.Entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.json.JSONParser;
import org.hibernate.tuple.UpdateTimestampGeneration;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoProfile {
    private String id;
    private Boolean has_signed_up;
    private LocalDateTime connected_at;
    private LocalDateTime synched_at;
    private String nickname;
    private String email;
//    private KakaoPartner for_partner;

    public KakaoProfile(String body) { 
    }
}
