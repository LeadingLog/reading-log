## 전역 상태 관리

- zustand 를 사용해 모달과 페이지 컴포넌트를 편하게 가져올 수 있도록 설계 

## 컬러 스타일 정의

- 색상 변경 시 한 곳에서 변경이 가능하도록 tailwind.config.js 파일에 사용 색상 정의

## 디렉토리 구조

```
ReadingLogFrontend/
├── public
├── src
│   ├── api                              └─ # api 요청 컴포넌트 폴더
│   ├── assert                           └─ # 컴포넌트 내부 이미지
│       └── login                           └─ # 로그인 관련 이미지
│   └── components                       └─ # all components
│       ├── common                          └─ # 양쪽 페이지 모두 재사용 하는 폴더
│       ├── homeLeft                        └─ # 왼쪽 페이지에 들어갈 컴포넌트 폴더
│       ├── homeRight                       └─ # 오른쪽 페이지에 들어갈 컴포넌트 폴더
│       ├── homeTop                         └─ # 홈 상단 컴포넌트 폴더(책검색, 계정)
│           ├── statsItems                      └─ # 연별, 월별 통계 컴토넌트 요소 
│           └── timeTrackingContainer           └─ # 타임 트래킹 컴토넌트 요소 
│       ├── layout                          └─ # 기본 화면 구성 컴포넌트 폴더
│       └── modal                           └─ # 모달 컴포넌트 폴더
│   ├── mocks                            └─ # 목데이터 관리 폴더
│       ├── dummyData                       └─ # 임시 데이터 목록 폴더
│           ├── favoriteListData               └─ # 관심도서 요청시 목데이터 
│           ├── myReadingListData              └─ # 내 독서모록 요청시 목데이터
│           ├── statsMonthListData             └─ # 월별 통계 요청시 목데이터
│           ├── statsYearListData              └─ # 연별 통계 요청시 목데이터
│           ├── thisMonthReadingListData       └─ # 이번 달 독서 리스트 요청시 목데이터
│           └── timeLineReadingListData        └─ # 타임라인 관련 요청 목데이터 
│       └── handlers                        └─ # 목데이터 api 요청 목록
│   ├── router                           └─ # 라우터 파일 폴더
│   ├── routes                           └─ # 사용자 정보 관련 라우터
│   ├── store                            └─ # 전역 상태 관리 폴더
│   ├── types                            └─ # 타입스크립트 타입 정의 폴더
│   ├── utils                            └─ # 재사용 컴포넌트 폴더
│   ├── view                             └─ # 보여질 화면 관련 폴더
│   ├── App.css                        
│   ├── App.tsx
│   ├── index.css
│   ├── main.jsx
│   └── vite-env.d.ts
├── .env                                 # 환경 변수 파일
├── .gitignore                           # Ignore Git commit
├── .prettierrc                          # 
├── .prettierrc.json                     # 코드 스타일 통일용 (수정 필요)
├── build.sh                             # 빌드 관련
├── eslint.config.js                    
├── index.html         
├── package.json                         # Package information
├── package-lock.json                   
├── postcss.config.js                   
├── README.md        
├── tailwind.config.js                   # tailwind 커스텀 설정     
├── tsconfig.app.json     
├── tsconfig.json     
├── tsconfig.node.json    
├── vercel.json
└── vite.config.ts
```

### 배포 주소

- https://reading-log-zeta.vercel.app/