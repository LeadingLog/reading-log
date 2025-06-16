package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("GET", "POST", "PUT", "DELETE")
//                .maxAge(3000);
//
////		addMapping - CORS를 적용할 url의 패턴을 정의 (/** 로 모든 패턴을 가능하게 함)
////		allowedOrigins - 허용할 origin을 정의 (* 로 모든 origin을 허용, 여러개도 지정가능)
////		allowedMethods - HTTP Method를 지정 (* 로 모든 Method를 허용)
////		maxAge - 원하는 시간만큼 request를 cashing함
//    }
//}

@Configuration
public class WebConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
                                        .allowedOrigins("https://reading-log-zeta.vercel.app") 
                                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                                        .allowCredentials(true)
                                        .allowedHeaders("*")
                                        .maxAge(3600);

			}
		};
	}
}
