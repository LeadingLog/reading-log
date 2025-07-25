package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ReadingLogBackendApplication {
    @RequestMapping("/")
    String home() {
        return "배포테트스트";
    }

    public static void main(String[] args) {
        SpringApplication.run(ReadingLogBackendApplication.class, args);
    }
}
