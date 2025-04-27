package com.example.demo.response;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class ResponseService {
    public ResponseEntity<Map<String,Object>> responseData (boolean successChk, String msg) {
        if (successChk) {
            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", msg);
            return ResponseEntity.badRequest().body(response);
        }
    }

}
