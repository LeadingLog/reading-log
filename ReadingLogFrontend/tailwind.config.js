/** @type {import('tailwindcss').Config} */
export default {
  content   : ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme     : {
    extend: {
      colors: {

        /* 기본 색상 */
        color_1: "#FDFAF3", // 아이보리색
        color_2: "#E5CEC8", // 연한빨강색
        color_3: "#EEE6E3", // 연한갈색
        color_4: "#96B2C8", // 진한하늘색
        color_5: "#CAE1F3", // 연한하늘색

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

        /* 배경 관련 색 */

        modalBg    : "#96B2C8",       // 모달배경색
        searchBg   : "#FDFAF3",      // 검색창배경
        nickNameBg : "#FDFAF3",    // 닉네임표시배경색
        readingTime: "#E5CEC8",   // 총 독서 시간 표시 배경
        FavoritesBg: "#96B2C8",   // 즐겨찾기아이콘배경색


        // 즐겨찾기아이콘색
        FavoritesIcon: "#FDFAF3",

        /* SVG아이콘 색상 */
        iconColor_1: "#FDFAF3", // 아이보리색
        iconColor_2: "#E5CEC8", // 연한빨강색
        iconColor_3: "#EEE6E3", // 연한갈색
        iconColor_4: "#96B2C8", // 진한하늘색
        iconColor_5: "#CAE1F3", // 연한하늘색

        /* 이번 달 독서 리스트 관련 */
        titleMarker   : "#E5CEC8",    // 타이틀 왼쪽 마커색
        readingListBg : "#E5CEC8",  // 이번 달 독서 리스트 배경색
        toggleBg      : "#FDFAF3",       // 토글 배경
        toggleReading : "#E5CEC8",  // 토글이 독서중인 경우 토글버튼 색
        toggleComplete: "#96B2C8", // 토글이 완독인 경우 토글버튼 색
        noReadingBg   : "#D9D9D9",    // 읽기 전 배경

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
