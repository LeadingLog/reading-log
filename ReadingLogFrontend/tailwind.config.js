/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 중앙 컴포넌트 뒷배경
        bookBG: "#96B2C8",

        // Left, right 컴포넌트 배경
        pageBg: "#FDFAF3",

        // 아이보리색
        ivory: "#FDFAF3",

        // 진한하늘색
        darkSky: "#96B2C8",
        // 보더색
        borderColor: "#96B2C8",

        // 모달배경색
        modalBg: "#96B2C8",

        // 즐겨찾기아이콘배경색
        FavoritesBg: "#96B2C8",
        // 즐겨찾기아이콘색
        FavoritesIcon: "#FDFAF3",

        // 연한빨강색
        lightRed: "#E5CEC8",

        // 연한하늘색
        lightSky: "#CAE1F3",

        // 연한갈색
        lightBrown: "#EEE6E3",

        // 소셜 버튼 배경색
        socialBg: "#FDFAF3",
      },
    },
  },
  fontFamily: {
    primary: "Noto Sans KR",
  },
  plugins: [],
};
