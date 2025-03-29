/** @type {import('tailwindcss').Config} */
export default {
  content   : ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme     : {
    extend: {
      colors: {
        
        /* 폰트 이름 찾을 때 포함된 명칭 참고 */
        // 텍스트 > Text
        // 배경색 > Bg
        // 보더 > border
        // 호버 > hover
        // 아이콘 > icon
        // 토글 > toggle
        
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
        
        /* 독서 타이머 & 스탑워치 관련 */
        trackingBg      : "#E5CEC8", // 독서 타이머 & 스탑워치 선택한 책 뒷배경
        trackingBook    : "#FDFAF3", // 현재 타이머 & 스타워치 선택한 책 썸네일 기본 배경
        stopWatchTimerBg: "#FDFAF3", // 스탑워치 & 타이머   영역 배경
        playIcon        : "#E5CEC8", // 재생 버튼 아이콘 색
        stopIcon        : "#E5CEC8", // 정지 버튼 아이콘 색
        pauseIcon       : "#E5CEC8", // 일시정지 버튼 아이콘 색
        playIconBorder  : "#E5CEC8", // 재생 버튼 아이콘 색
        stopIconBorder  : "#E5CEC8", // 정지 버튼 아이콘 색
        pauseIconBorder : "#E5CEC8", // 일시정지 버튼 아이콘 색
        timeIconHover   : "#C9A89F", // 아이콘 호버시 색
        timerFlow       : "#C9A89F", // 남은 시간을 표시하는 색
        
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
        /* 독서 목록 & 관심 도서 책 썸네일 아이콘 관련 */
        bookImgItemBg        : "#E5CEC8", // 내 독서 목록 & 관심 도서 책 썸네일 없을 때 배경
        bookImgItemReadingBg : "#C9A89F", // (독서중) 상태 표시 배경
        bookImgItemNoReadBg  : "#D9D9D9", // (읽기전) 상태 표시 배경
        bookImgItemCompleteBg: "#96B2C8", // (완 독) 상태 표시 배경
        bookImgIconColor     : "#FDFAF3", // 상태 표시 아이콘
        
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
        toggleReading     : "#E5CEC8", // 토글이 독서중인 경우 토글버튼 색
        toggleComplete    : "#96B2C8", // 토글이 완독인 경우 토글버튼 색
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
