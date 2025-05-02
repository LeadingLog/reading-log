# 1. 베이스 이미지 (Java 17 기준, 프로젝트에 맞게 조절 가능)
FROM eclipse-temurin:17-jdk-alpine

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. 로컬의 jar 파일을 이미지로 복사
COPY build/libs/ReadingLogBackend-0.0.1-SNAPSHOT.jar app.jar

# 4. 외부 포트 열기 (Spring Boot 설정에서 server.port=9091 기준)
EXPOSE 9091

# 5. 실행 명령
ENTRYPOINT ["java", "-jar", "app.jar"]




