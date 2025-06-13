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
        ivory      : "#FDFAF3", // 아이보리색
        dark_Red   : "#C9A89F", // 진한빨강
        light_Red  : "#E5CEC8", // 연한빨강색
        light_Brown: "#EEE6E3", // 연한갈색
        dark_Sky   : "#96B2C8", // 진한하늘색
        light_Sky  : "#CAE1F3", // 연한하늘색
        gray       : "#A1A1A1", // 회색
        light_Gray : "#D9D9D9", // 연한회색
        black      : "#000000", // 블랙
        white      : "#ffffff", // 흰색

        // 호버색상
        light_Red_hover: "#C9A89F", // 연한빨강호버시
        dark_Sky_hover : "#7A9BB7", // 진한 하늘 호버시

        /* 탭 관련 색 */
        leftPage_ActiveTab_Border  : "#C9A89F", // 탭 - 왼쪽 페이지 최상단 컴포넌트 이동 탭 활성화 시
        leftPage_InActiveTab_Border: "#EEE6E3", // 탭 - 왼쪽 페이지 최상단 컴포넌트 이동 탭 비활성화 시
        myBookList_ActiveTab_Bg    : "#E5CEC8", // 탭 - 내 독서 목록 탭 중 활성화 배경
        myBookList_InActiveTab_Bg  : "#EEE6E3", // 탭 - 내 독서 목록 탭 중 비활성화 배경
        myBookList_ActiveTab_Text  : "#000000", // 탭 - 내 독서 목록 탭 중 활성화 배경
        myBookList_InActiveTab_Text: "#FDFAF3", // 탭 - 내 독서 목록 탭 중 활성화 배경
        /* 타임라인 -> 총 독서 시간 관련 */
        allReadingTime_Bg  : "#E5CEC8", // 총 독서 시간 표시 배경
        allReadingTime_Text: "#000000", // 총 독서 시간 표시 폰트

        /* 타임라인 화면 */
        timeLineBorder          : "#96B2C8", // 타임라인 경로 색
        timeLineMonthCircle     : "#C9A89F", // 월 표시 원
        timeLineMonthHoverCircle: "#E5CEC8", // 월 표시 호버서 시 색
        timeLineMonthText       : "#FFFFFF", // 월 표시 텍스트 색
        timeLineNoReadText      : "#FFFFFF", // 읽기전 텍스트 색
        timeLineNoReadBg        : "#D9D9D9", // 읽기전 배경 색
        timeLineReadingText     : "#FFFFFF", // 독서중 텍스트 색
        timeLineReadingBg       : "#C9A89F", // 독서중 배경 색
        timeLineCompleteText    : "#FFFFFF", // 완독 텍스트 색
        timeLineCompleteBg      : "#96B2C8", // 완독 배경 색

        /* 년도 슬라이드 관련 */
        yearSlide_Bg           : "#E5CEC8", // 년도 슬라이드 - 배경
        yearSlide_Border       : "#E5CEC8", // 년도 슬라이드 - 보더
        yearSlide_ThisYear_Text: "#C9A89F", // 년도 슬라이드 - 현재 년도 폰트색
        yearSlide_PrevNext_Text: "#A1A1A1", // 년도 슬라이드 - 작년 & 내년 폰트색
        yearSlide_Icon         : "#E5CEC8", // 년도 슬라이드 - 년도 이동 아이콘 버튼
        yearSlide_Icon_Hover   : "#C9A89F", // 년도 슬라이드 - 년도 이동 아이콘 버튼 호버색

        /* 독서 타이머 & 스탑워치 관련 */
        timer_Box_Bg                 : "#E5CEC8", // 독서 타이머 박스 배경 색
        stopWatch_Box_Bg             : "#E5CEC8", // 독서 스탑워치 박스 배경 색
        timeLeft_Color               : "#C9A89F", // 독서 타이머 시간 흐름 표시 색
        timeLeft_Bg                  : "#D9D9D9", // 독서 타이머 시간 흐름 표시 배경 색
        trackingBook_Bg              : "#FDFAF3", // 독서 타이머 & 스탑워치 - 독서 타이머 & 스탑워치 선택한 책 썸네일 기본 배경
        stopWatchTimer_Item_Bg       : "#FDFAF3", // 독서 타이머 & 스탑워치 - 각 컴포넌트 아이템 배경
        icon_Play                    : "#E5CEC8", // 독서 타이머 & 스탑워치 - 재생 버튼 아이콘 색
        icon_stop                    : "#E5CEC8", // 독서 타이머 & 스탑워치 - 정지 버튼 아이콘 색
        icon_pause                   : "#E5CEC8", // 독서 타이머 & 스탑워치 - 일시정지 버튼 아이콘 색
        icon_play_Border             : "#E5CEC8", // 독서 타이머 & 스탑워치 - 재생 버튼 아이콘 보더색
        icon_stop_Border             : "#E5CEC8", // 독서 타이머 & 스탑워치 - 정지 버튼 아이콘 보더색
        icon_pause_Border            : "#E5CEC8", // 독서 타이머 & 스탑워치 - 일시정지 버튼 아이콘 보더색
        icon_TimeIcon_Hover          : "#C9A89F", // 독서 타이머 & 스탑워치 - 아이콘 호버시 색
        tracking_Box_Bottom_Divide_Bg: "#E5CEC8", // 독서 타이머 & 스탑워치 - 바닥 경계선 색

        /* 오른쪽 페이지 독서 리스트 색 */
        readingList_Bg   : "#E5CEC8", // 이번 달 독서 리스트 배경색
        readingList_Hover: "#C9A89F", // 이번 달 독서 리스트 배경색

        /* 월별 & 년별 통계 그래프 관련 */
        stats_Info_Text                         : "#96B2C8",   // 월별 & 년별 통계 - 통계 설명 텍스트
        stats_Info_Text_Highlight               : "#C9A89F",   // 월별 & 년별 통계 - 통계 설명 강조 텍스트
        stats_Info_Text_Notice                  : "#A1A1A1",   // 월별 & 년별 통계 - 통계 보조 설명 텍스트
        stats_Month_Graph_Bottom_Border         : "#C9A89F",   // 월별 & 년별 통계 - 그래프 바닥 보더 색
        stats_Month_Graph_Book_Bg               : "#E5CEC850", // 월별 통계 - 책 배경 색
        stats_Month_Graph_Book_Border           : "#C9A89F",   // 월별 통계 - 책 보더 색
        stats_Month_Graph_Reading_Icon_Bg       : "#C9A89F",   // 월별 통계 - 독서 중 아이콘 배경
        stats_Month_Graph_Complete_Icon_Bg      : "#96B2C8",   // 월별 통계 - 완독 책 아이콘 배경
        stats_Month_Graph_NoRead_Icon_Bg        : "#D9D9D9",   // 월별 통계 - 읽기 전 아이콘 배경
        stats_Month_Graph_Icon_Color            : "#FDFAF3",   // 월별 통계 - 독서 중 & 완독 & 읽기 전 아이콘 색
        stats_Year_Graph_Count_Text             : "#C9A89F",   // 년별 통계 - 도서 수 텍스트 색
        stats_Year_Graph_MonthItem_Circle       : "#E5CEC8",   // 년별 통계 - 각 월 표시 원 색
        stats_Year_Graph_MonthItem_Circle_Border: "#96B2C8",   // 년별 통계 - 각 월 표시 원 보더 색
        stats_Year_Graph_Month_Text             : "#C9A89F",   // 년별 통계 - 월 표시 텍스트 색
        stats_Year_Graph_Bottom_Border          : "#C9A89F",   // 년별 통계 - 그래프 바닥 보더 색

        // 중앙 컴포넌트 뒷배경
        book_Bg: "#96B2C8", // LeftPage, rightPage 컨텐츠 뒤에 감싸는 배경
        // Left, right 컴포넌트 배경
        page_Bg: "#FDFAF3", // page 배경
        /* 이미지로 표시하는 책 리스트 내부 아이콘 관련 */
        imgBook_Item_Bg         : "#E5CEC850", // 이미지로 표시하는 책 리스트 내부 아이콘 - 책 썸네일 없을 때 배경
        imgBook_Item_Reading_Bg : "#C9A89F",   // 이미지로 표시하는 책 리스트 내부 아이콘 - (독서중) 상태 표시 배경
        imgBook_Item_NoRead_Bg  : "#D9D9D9",   // 이미지로 표시하는 책 리스트 내부 아이콘 - (읽기전) 상태 표시 배경
        imgBook_Item_Complete_Bg: "#96B2C8",   // 이미지로 표시하는 책 리스트 내부 아이콘 - (완 독) 상태 표시 배경
        imgBook_Icon_Color      : "#FDFAF3",   // 이미지로 표시하는 책 리스트 내부 아이콘 - 상태 표시 아이콘 색

        /* 모달 관련 */
        modal_Container_bg   : "#00000050", // 공통 - 모달 오픈 시 불투명 검은 색 뒷 배경
        modal_Default_Bg     : "#96B2C8",   // 공통 - 모달배경색
        modal_Logo_Bg        : "#E5CEC8",   // 공통 - 모달 로고 표시 영역 기본 배경 색
        modal_BookImg_Bg     : "#E5CEC8",   // 공통 - 모달 책 표지 표시 배경 색
        modal_Content_Bg     : "#FDFAF3",   // 공통 - 모달 컨텐츠 배경 색
        modal_Title_Text     : "#000000",   // 공통 - 공통 모달 메인 텍스트 색
        modal_Sub_Title      : "#A1A1A1",   // 공통 - 공통 모달 서브 텍스트 색
        modal_Right_Btn_Bg   : "#E5CEC8",   // 공통 - 모달에서 오른쪽 아래 있는 버튼 배경
        modal_Left_Btn_Border: "#E5CEC8",   // 공통 - 모달에서 왼쪽 아래 있는 버튼 보더

        modal_Quit_Bg  : "#D9D9D950", // 마이페이지 - 회원탈퇴 버튼 배경
        modal_Quit_Text: "#A1A1A1",   // 마이페이지 - 회원탈퇴 버튼 텍스트

        modal_Tracking_Title_Bg                   : "#FDFAF3",   // 독서 타임 트래킹 - 타이틀 배경
        modal_Tracking_Title_Text                 : "#000000",   // 독서 타임 트래킹 - 타이틀 텍스트 색
        modal_Tracking_Book_Title_Text            : "#000000",   // 독서 타임 트래킹 - 책 제목 텍스트
        modal_Tracking_Book_SubTitle_Text         : "#A1A1A1",   // 독서 타임 트래킹 - 저자 텍스트
        modal_Tracking_Timer_Title_Text           : "#000000",   // 독서 타임 트래킹 - 타이머 텍스트
        modal_Tracking_Timer_Sub_Title_Text       : "#A1A1A1",   // 독서 타임 트래킹 - 타이머 설명 텍스트
        modal_Tracking_Timer_Toggle_Active_Color  : "#C9A89F",   // 독서 타임 트래킹 - 타이머 토글 활성화 시 색
        modal_Tracking_Timer_Toggle_InActive_Color: "#E5CEC8",   // 독서 타임 트래킹 - 타이머 토글 비활성화 시 색
        modal_Tracking_Timer_Toggle_Active_Bg     : "#E5CEC8",   // 독서 타임 트래킹 - 타이머 활성화 시 배경 색
        modal_Tracking_Timer_Toggle_InActive_Bg   : "#EEE6E3",   // 독서 타임 트래킹 - 타이머 비활성화 시 배경 색
        modal_Tracking_Time_Bg                    : "#EEE6E3",   // 독서 타임 트래킹 - 타이머 시간 선택 요소 배경
        modal_Tracking_Time_Choice_Bg             : "#FDFAF3",   // 독서 타임 트래킹 - 타이머 시간 선택 시 배경
        modal_Tracking_Time_Divide_Color          : "#000000",   // 독서 타임 트래킹 - 타이머 시간 경계선 색
        modal_Tracking_Time_Choice_Text           : "#000000",   // 독서 타임 트래킹 - 타이머 시간 선택 시 텍스트 색
        modal_Tracking_Time_NoChoice_Text         : "#000000",   // 독서 타임 트래킹 - 타이머 시간 미 선택 시 텍스트 색
        modal_Tracking_loadingBg                  : "#FDFAF3",   // 독서 타임 트래킹 - 로딩 중일 때 배경 색
        modal_Tracking_loadingSpinner             : "#96B2C8",   // 독서 타임 트래킹 - 로딩 스피너 색
        modal_Tracking_Complete_Text              : "#ffffff",   // 독서 타임 트래킹 - 완독 도서인 경우 알림 텍스트 색
        modal_Tracking_Complete_Text_Bg           : "#C9A89F",   // 독서 타임 트래킹 - 완독 도서인 경우 알림 텍스트 배경색

        modal_BookPlan_Book_Title_Text       : "#000000",   // 독서 계획 - 책 제목 텍스트 색
        modal_BookPlan_Book_Sub_Title_Text   : "#A1A1A1",   // 독서 계획 - 책 저자 텍스트 색
        modal_BookPlan_Book_DeleteBook_Text  : "#A1A1A1",   // 독서 계획 - 책 저자 텍스트 색
        modal_BookPlan_Book_DeleteBook_Border: "#E5CEC8",   // 독서 계획 - 책 저자 텍스트 색
        modal_BookPlan_StartEnd_Month_Text   : "#000000",   // 독서 계획 - 시작 & 종료 타이틀 텍스트 색
        modal_BookPlan_Calendar_Date_Text    : "#000000",   // 독서 계획 - 달력 표시 날짜 텍스트 색 색
        modal_BookPlan_Calendar_Bg           : "#EEE6E3",   // 독서 계획 - 달력 표시 배경
        modal_BookPlan_Calendar_Icon_Color   : "#000000",   // 독서 계획 - 달력 아이콘 색
        modal_BookPlan_loadingBg             : "#FDFAF3",   // 독서 계획 - 로딩 중일 때 배경 색
        modal_BookPlan_loadingSpinner        : "#96B2C8",   // 독서 계획 - 로딩 스피너 색

        /* 연도 및 월 선택 모달 */
        modal_Pick_Calendar_Back_Bg          : "#96B2C8",   // 연도 선택 모달 - 배경 색
        modal_Pick_Calendar_Content_Bg       : "#FDFAF3",   // 연도 선택 모달 - 컨텐츠 배경 색
        modal_Pick_Calendar_Title_Text       : "#000000",   // 연도 선택 모달 - 시작 달 인지 종료달 인지 표시 타이틀 텍스트 색
        modal_Pick_Calendar_Year_Text        : "#000000",   // 연도 선택 모달 - 년 표시 텍스트 색
        modal_Pick_Calendar_Year_Handler_Text: "#000000",   // 연도 선택 모달 - 년도 변경 요소 색
        modal_Pick_Calendar_Month_Bg         : "#E5CEC8",   // 연도 선택 모달 - 월 선택 리스트 배경 색
        modal_Pick_Calendar_Month_Text       : "#000000",   // 연도 선택 모달 - 월 선택 리스트 텍스트 색
        modal_Pick_Calendar_Month_Hover      : "#E5CEC890",   // 연도 선택 모달 - 월 선택 리스트 텍스트 색
        modal_Pick_Calendar_Month_active     : "#EEE6E3",   // 연도 선택 모달 - 월 선택 리스트 텍스트 색
        modal_Pick_Calendar_Cancel_Text      : "#000000",  // 연도 선택 모달 - 닫기 텍스트 색

        /* 독서 상태 토글 관련 색 */
        toggle_ReadingStart_Text_Color: "#ffffff", // 독서 상태 토글 - 토글이 완독인 경우 텍스트 색
        toggle_Complete_Text_Color    : "#000000", // 독서 상태 토글 - 토글이 완독인 경우 텍스트 색
        toggle_ReadingText_Color      : "#000000", // 독서 상태 토글 - 독서중인 경우 토글 텍스트 색
        toggle_Reading_Circle_Color   : "#E5CEC8", // 독서 상태 토글 - 독서중인 경우 토글 버튼 색
        toggle_Reading_Circle_Hover   : "#C9A89F", // 독서 상태 토글 - 책 리스트 호버시 토글버튼 색
        toggle_Complete_Circle_Color  : "#96B2C8", // 독서 상태 토글 - 토글이 완독인 경우 토글버튼 색
        toggle_Complete_Circle_Hover  : "#7A9BB7", // 독서 상태 토글 - 책 리스트 호버시 토글버튼 색
        toggle_NoReading_Bg           : "#D9D9D9", // 독서 상태 토글 - 읽기 전 토글 배경
        toggle_Read_Status_Bg         : "#FDFAF3", // 독서 상태 토글 - 배경

        /* 헤더 상단 오른쪽 닉네임 & 마이페이지 & (로그인 & 로그아웃) 관련 색 */
        header_Right_Bg                  : "#FDFAF3", // 닉네임표시배경색
        header_Right_Border              : "#96B2C8", // 닉네임표시배경색
        myPage_LogOut_Bg                 : "#96B2C8", // 마이페이지 & 로그아웃 아이콘 배경
        myPage_Icon_Color                : "#FDFAF3", // 마이페이지 아이콘 색
        myPage_Update_Complete_Text      : "#000000", // 마이페이지 수정 및 완료 버튼 색
        myPage_Update_Complete_Text_Hover: "#7A7A7A", // 마이페이지 수정 및 완료 버튼 hover 색
        myPage_Update_Text               : "#7A7A7A", // 마이페이지 수정시 input 글자색
        myPage_Update_Text_Focus         : "#000000", // 마이페이지 수정 input 글자 focus 색
        myPage_Update_Line_Focus         : "#C9A89F", // 마이페이지 수정시 input 밑줄 focus 색
        myPage_Update_Line               : "#E5CEC8", // 마이페이지 수정시 input 밑줄 색
        LogOut_Icon_Color                : "#FDFAF3", // 로그아웃 아이콘 색
        header_Right_Icon_Divide_Color   : "#FDFAF3", // 마이페이지 & 로그아웃 경계선 색

        /* 상단 검색 관련 색 */
        main_SearchBar_Bg                             : "#FDFAF3", // 상단 검색 바 - 검색창배경
        main_SearchBar_Border                         : "#96B2C8", // 상단 검색 바 - 검색창 보더
        main_SearchBar_SearchResult_Book_Title_Text   : "#000000", // 상단 검색 바 - 책 타이틀 텍스트 색
        main_SearchBar_SearchResult_Book_SubTitle_Text: "#A1A1A1", // 상단 검색 바 - 책 저자 텍스트 색
        main_SearchBar_SearchIcon_Default_Color       : "#FDFAF3", // 상단 검색 바 - 검색 아이콘 검색안할 때 색
        main_SearchBar_Searching_SearchIcon_Color     : "#96B2C8", // 상단 검색 바 - 검색 시 아이콘 색
        main_SearchBar_Back_Default_Bg                : "#96B2C8", // 상단 검색 바 - 검색안할 때 아이콘 배경 색
        main_SearchBar_Searching_Back_Bg              : "transparent", // 상단 검색 바 - 검색 시 아이콘 배경 색
        main_SearchBar_ClearText_Color                : "#FDFAF3", // 상단 검색 바 - 검색 텍스트 삭제 버튼 색
        main_SearchBar_ClearText_Bg                   : "#96B2C8", // 상단 검색 바 - 검색 텍스트 삭제 버튼 배경 색
        main_SearchBar_BookList_Hover_border          : "#96B2C8", // 상단 검색 바 -
        main_SearchBar_NotFindBook_Text               : "#A1A1A1", // 상단 검색 바 - 검색 결과 없는 경우 표시 텍스트 색
        main_SearchBar_searchingBook_Text             : "#000000", // 상단 검색 바 - 검색 중 표시 텍스트 색
        main_SearchBar_NotYetFindBook_Text            : "#A1A1A1", // 상단 검색 바 - 검색 전 표시 텍스트 색

        /* 내 독서 목록 검색 바 관련 색*/
        myBook_SearchBar_Bg                      : "#FDFAF3", // 내 독서 목록 검색 바 - 내 독서 목록 검색창 배경
        myBook_SearchBar_Border                  : "#C9A89F", // 내 독서 목록 검색 바 - 검색창 보더
        myBook_SearchBar_SearchIcon_Default_Color: "#C9A89F", // 내 독서 목록 검색 바 - 검색 아이콘 검색안할 때 색
        myBook_SearchBar_ClearText_Bg            : "#C9A89F", // 내 독서 목록 검색 바 - 검색 텍스트 삭제 버튼 배경 색
        myBook_SearchBar_ClearText_Color         : "#FDFAF3", // 내 독서 목록 검색 바 - 검색 텍스트 삭제 버튼 색


        /* 관심도서 아이콘 관련 색 */
        favorite_Icon_Color: "#FDFAF3", // 관심도서 아이콘 색
        favorite_Icon_Bg   : "#96B2C8", // 관심도서 아이콘 배경 색
        unFavorite_Icon_Bg : "#D9D9D9", // 관심도서 아닐 때 아이콘 배경 색
        /* 관심도서 리스트 설명 텍스트 관련 색 */
        favoriteList_Searching_Text    : "#000000", // 관심 도서 요청시 표시 텍스트 색
        favoriteList_Empty_Text        : "#96B2C8", // 관심 도서 요청시 표시 텍스트 색
        favoriteList_Searching_End_Text: "#000000", // 관심 도서 요청시 표시 텍스트 색

        /* 로딩 관련 색 */
        loadingBg     : "#D9D9D9", // 로딩 중일 때 배경 색
        loadingSpinner: "#96B2C8", // 로딩 스피너 색

        /* 스크롤바 관련 */
        scrollbar_bg                               : "#FDFAF3", // 스크롤바 전체 라인 배경색
        scrollbar_Color                            : "#E5CEC8", // 스크롤 되는 바 색상
        scrollbar_Main_SearchBar_Result_Color      : "#CAE1F3", // 스크롤 되는 바 색상
        scrollbar_Hover_Color                      : "#C9A89F", // 책 리스트 영역 호버 시 스크롤 되는 바 색상
        scrollbar_Main_SearchBar_Result_Hover_Color: "#96B2C8", // 책 리스트 영역 호버 시 스크롤 되는 바 색상

        /* 타이틀 왼족 표시 마커 */
        title_Marker: "#E5CEC8",  // 타이틀 왼쪽 마커색

        /* 소셜 버튼 배경색 */
        social_Bg: "#FDFAF3",

      },
    },
  },
  fontFamily: {
    primary: "Noto Sans KR",
  },
  plugins   : [require("tailwind-scrollbar-hide")],
};
