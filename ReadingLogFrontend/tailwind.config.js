/** @type {import('tailwindcss').Config} */
export default {
  content   : ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme     : {
    extend: {
      colors: {
        
        /* 폰트 이름 찾을 때 포함된 명칭 참고 */
        // 텍스트 > Text
        // 배경색 > Bg
        // 보더   > border
        // 호버   > hover
        // 아이콘 > icon
        // 토글   > toggle
        // 모달   > modal
        // 버튼   > btn
        
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
        leftPageActiveTabBorder  : "#C9A89F", // 왼쪽 페이지 최상단 컴포넌트 이동 탭 활성화 시
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
        yearSlideBorder      : "#E5CEC8", // 년도 슬라이드 배경
        yearSlideThisYearText: "#C9A89F", // 현재 년도 폰트색
        yearSlidePrevNextText: "#A1A1A1", // 작년 & 내년 폰트색
        yearSlideIcon        : "#E5CEC8", // 슬라이드 버튼
        yearSlideIconHover   : "#C9A89F", // 슬라이드 버튼 호버색
        
        /* 독서 타이머 & 스탑워치 관련 */
        trackingBg            : "#E5CEC8", // 독서 타이머 & 스탑워치 선택한 책 뒷배경
        trackingBook          : "#FDFAF3", // 독서 타이머 & 스탑워치 선택한 책 썸네일 기본 배경
        stopWatchTimerBg      : "#FDFAF3", // 스탑워치 & 타이머   영역 배경
        playIcon              : "#E5CEC8", // 재생 버튼 아이콘 색
        stopIcon              : "#E5CEC8", // 정지 버튼 아이콘 색
        pauseIcon             : "#E5CEC8", // 일시정지 버튼 아이콘 색
        playIconBorder        : "#E5CEC8", // 재생 버튼 아이콘 보더색
        stopIconBorder        : "#E5CEC8", // 정지 버튼 아이콘 보더색
        pauseIconBorder       : "#E5CEC8", // 일시정지 버튼 아이콘 보더색
        timeIconHover         : "#C9A89F", // 아이콘 호버시 색
        timerFlow             : "#C9A89F", // 남은 시간을 표시하는 색
        TrackingBottomDivideBg: "#E5CEC8", // 바닥 경계선 색
        
        /* 월별 통계 그래프 관련 */
        statsText               : "#96B2C8", // 통계 설명 텍스트
        statsTextHighlight      : "#C9A89F", // 통계 설명 강조 텍스트
        statsBottomBorder       : "#C9A89F", // 통계 그래프 바닥 보더 색
        statsMonthBookBg        : "#E5CEC850", // 월별 통계 책 배경 색
        statsMonthBookBorder    : "#C9A89F", // 월별 통계 책 보더 색
        statsMonthReadingIconBg : "#C9A89F", // 독서 중 아이콘 배경
        statsMonthCompleteIconBg: "#96B2C8", // 완독 책 아이콘 배경
        statsMonthIconColor     : "#FDFAF3", // 아이콘 색
        
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
        /* 책 썸네일 아이콘 관련 */
        bookImgItemBg        : "#E5CEC850", // 책 썸네일 없을 때 배경
        bookImgItemReadingBg : "#C9A89F", // (독서중) 상태 표시 배경
        bookImgItemNoReadBg  : "#D9D9D9", // (읽기전) 상태 표시 배경
        bookImgItemCompleteBg: "#96B2C8", // (완 독) 상태 표시 배경
        bookImgIconColor     : "#FDFAF3", // 상태 표시 아이콘
        
        /* 배경 관련 색 */
        readingListBg: "#E5CEC8", // 이번 달 독서 리스트 배경색
        /* 모달 관련 */
        modalBg                           : "#96B2C8",   // 모달배경색
        modalLogoBg                       : "#E5CEC8",   // 모달 로고 표시 영역 기본 배경 색
        modalBookBg                       : "#E5CEC8",   // 모달 책 표지 표시 배경 색
        modalContentBg                    : "#FDFAF3",   // 모달 컨텐츠 배경 색
        modalTitleText                    : "#000000",   // 공통 모달 메인 텍스트 색
        modalSubTitle                     : "#A1A1A1",   // 공통 모달 서브 텍스트 색
        modalQuitBg                       : "#D9D9D950", // 마이페이지 회원탈퇴 버튼 배경
        modalQuitText                     : "#A1A1A1",   // 마이페이지 회원탈퇴 버튼 텍스트
        modalRightBtnBg                   : "#E5CEC8",   // 모달에서 오른쪽 아래 있는 버튼 배경
        modalLeftBtnBorder                : "#E5CEC8",   // 모달에서 왼쪽 아래 있는 버튼 보더
        modalTrackingTitleBg              : "#FDFAF3",   // 독서 타임 트래킹 배경
        modalTrackingTitleText            : "#000000",   // 독서 타임 트래킹 텍스트 색
        modalTrackingBookTitleText        : "#000000",   // 독서 타임 트래킹 책 제목 텍스트
        modalTrackingBookSubTitleText     : "#000000",   // 독서 타임 트래킹 저자 텍스트
        modalTrackingTimerTitleText       : "#000000",   // 독서 타임 트래킹 타이머 텍스트
        modalTrackingTimerSubTitleText    : "#A1A1A1",   // 독서 타임 트래킹 타이머 설명 텍스트
        modalTrackingTimerToggleActive    : "#C9A89F",   // 독서 타임 트래킹 타이머 토글 활성화 시 색
        modalTrackingTimerToggleInActive  : "#E5CEC8",   // 독서 타임 트래킹 타이머 토글 비활성화 시 색
        modalTrackingTimerToggleActiveBg  : "#E5CEC8",   // 독서 타임 트래킹 타이머 활성화 시 배경 색
        modalTrackingTimerToggleInActiveBg: "#EEE6E3",   // 독서 타임 트래킹 타이머 비활성화 시 배경 색
        modalTrackingTimeBg               : "#EEE6E3",   // 독서 타임 트래킹 타이머 시간 선택 요소 배경
        modalTrackingTimeChoiceBg         : "#FDFAF3",   // 독서 타임 트래킹 타이머 시간 선택 시 배경
        modalTrackingTimeDivideColor      : "#000000",   // 독서 타임 트래킹 타이머 시간 경계선 색
        modalTrackingTimeChoiceText       : "#000000",   // 독서 타임 트래킹 타이머 시간 선택 시 텍스트 색
        modalTrackingTimeNoChoiceText     : "#000000",   // 독서 타임 트래킹 타이머 시간 미 선택 시 텍스트 색
        modalBookPlanBookTitleText        : "#000000",   // 독서 계획 책 제목 텍스트 색
        modalBookPlanBookSubTitleText     : "#A1A1A1",   // 독서 계획 책 저자 텍스트 색
        modalBookPlanStartEndMonthText    : "#000000",   // 독서 계획 시작 & 종료 타이틀 텍스트 색
        modalBookPlanCalendarText         : "#000000",   // 독서 계획 달력 표시 날짜 텍스트 색 색
        modalBookPlanCalendarBg           : "#EEE6E3",   // 독서 계획 달력 표시 배경
        modalBookPlanCalendarIcon         : "#000000",   // 독서 계획 달력 아이콘 색
        
        /* 헤더 상단 오른쪽 닉네임 & 마이페이지 & (로그인 & 로그아웃) 관련 색 */
        nickNameBg     : "#FDFAF3", // 닉네임표시배경색
        myPageLogOutBg : "#96B2C8", // 마이페이지 & 로그아웃 아이콘 배경
        myPageIconColor: "#FDFAF3", // 마이페이지 아이콘 색
        LogOutIconColor: "#FDFAF3", // 로그아웃 아이콘 색
        iconDivideColor: "#FDFAF3", // 마이페이지 & 로그아웃 경계선 색
        /* 검색 관련 색 */
        searchBackBg     : "#96B2C8", // 검색창뒷배경
        searchBg         : "#FDFAF3", // 검색창배경
        searchBorder     : "#96B2C8", // 검색창 보더
        searchIconDefault: "#FDFAF3", // 검색 아이콘 검색안할 때 색
        searchIconActive : "#FDFAF3", // 검색 시 색
        /* 관심도서 아이콘 관련 색 */
        FavoriteIcon    : "#FDFAF3", // 관심도서 아이콘 색
        FavoriteIconBg  : "#96B2C8", // 관심도서 아이콘 배경 색
        noFavoriteIconBg: "#D9D9D9", // 관심도서 아닐 때 아이콘 배경 색
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
