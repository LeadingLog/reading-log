/** @type {import('tailwindcss').Config} */
export default {
  content   : ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme     : {
    extend: {
      colors: {
        
        /* 총 사용 색상 */
        color_1 : "#FDFAF3", // 아이보리색
        color_2 : "#C9A89F", // 진한빨강
        color_3 : "#E5CEC8", // 연한빨강색
        color_4 : "#EEE6E3", // 연한갈색
        color_5 : "#96B2C8", // 진한하늘색
        color_6 : "#CAE1F3", // 연한하늘색
        color_7 : "#A1A1A1", // 회색
        color_8 : "#D9D9D9", // 연한회색
        color_9 : "#000000", // 블랙
        color_10: "#ffffff", // 흰색
        /* 탭 관련 색 */
        leftPageActiveTabBorder  : "#E5CEC8", // 왼쪽 페이지 최상단 컴포넌트 이동 탭 활성화 시
        leftPageInActiveTabBorder: "#EEE6E3", // 왼쪽 페이지 최상단 컴포넌트 이동 탭 비활성화 시
        myBookListActiveTabBg    : "#E5CEC8", // 내 독서 목록 탭 중 활성화 배경
        myBookListInActiveTabBg  : "#EEE6E3", // 내 독서 목록 탭 중 비활성화 배경
        myBookListActiveTabText  : "#000000", // 내 독서 목록 탭 중 활성화 배경
        myBookListInActiveTabText: "#FDFAF3", // 내 독서 목록 탭 중 활성화 배경
        /* 타임라인 -> 총 독서 시간 관련 */
        allReadingTimeBg  : "#E5CEC8", // 총 독서 시간 표시 배경
        allReadingTimeText: "#000000", // 총 독서 시간 표시 폰트
        /* 년도 슬라이드 관련 */
        yearSlideBg          : "#E5CEC8", // 년도 슬라이드 배경
        yearSlideThisYearText: "#C9A89F", // 현재 년도 폰트색
        yearSlidePrevNextText: "#A1A1A1", // 작년 & 내년 폰트색
        yearSlideIcon        : "#E5CEC8", // 슬라이드 버튼
        yearSlideIconHover   : "#C9A89F", // 슬라이드 버튼 호버색
        
        // 중앙 컴포넌트 뒷배경
        bookBG: "#96B2C8",
        // Left, right 컴포넌트 배경
        pageBg: "#FDFAF3",
        /* 보더색 */
        borderColor_1: "#FDFAF3", // 아이보리색
        borderColor_2: "#E5CEC8", // 연한빨강색
        borderColor_3: "#EEE6E3", // 연한갈색
        borderColor_4: "#96B2C8", // 진한하늘색
        borderColor_5: "#CAE1F3", // 연한하늘색
        borderColor_6: "#D9D9D9", // 회색
        /* 책 아이콘 관련 */
        bookImgItemBg        : "#E5CEC8", // 내 독서 목록 & 관심 도서 책들 배경
        bookImgItemReadingBg : "#FDFAF3", // (독서중) 상태 표시 배경
        bookImgItemNoReadBg  : "#FDFAF3", // (읽기전) 상태 표시 배경
        bookImgItemCompleteBg: "#FDFAF3", // (완 독) 상태 표시 배경
        /* 배경 관련 색 */
        readingListBg: "#E5CEC8", // 이번 달 독서 리스트 배경색
        modalBg      : "#96B2C8", // 모달배경색
        /* 헤더 상단 오른쪽 닉네임 & 마이페이지 & (로그인 & 로그아웃) 관련 색 */
        nickNameBg: "#FDFAF3", // 닉네임표시배경색
        /* 검색 관련 색 */
        searchBg: "#FDFAF3", // 검색창배경
        /* 즐겨찾기 관련 색 */
        FavoritesIcon  : "#FDFAF3", // 즐겨찾기 아이콘 색
        FavoritesIconBg: "#96B2C8", // 즐겨찾기 아이콘 배경 색
        /* SVG아이콘 색상 */
        iconColor_1: "#FDFAF3", // 아이보리색
        iconColor_2: "#C9A89F", // 진한빨강
        iconColor_3: "#E5CEC8", // 연한빨강색
        iconColor_4: "#EEE6E3", // 연한갈색
        iconColor_5: "#96B2C8", // 진한하늘색
        iconColor_6: "#CAE1F3", // 연한하늘색
        iconColor_7: "#D9D9D9", // 연한회색
        
        /* 독서 상태 토글관련 색 */
        toggleReading     : "#E5CEC8",  // 토글이 독서중인 경우 토글버튼 색
        toggleComplete    : "#96B2C8",  // 토글이 완독인 경우 토글버튼 색
        toggleNoReadingBg : "#D9D9D9", // 읽기 전 배경
        toggleReadStatusBg: "#FDFAF3", // 토글 배경
        
        titleMarker: "#E5CEC8",  // 타이틀 왼쪽 마커색
        // 소셜 버튼 배경색
        socialBg: "#FDFAF3",
        
        // 호버색상
        hover_2: "#C9A89F", // 연한빨강호버시
        
      },
    },
  },
  fontFamily: {
    primary: "Noto Sans KR",
  },
  plugins   : [],
};
