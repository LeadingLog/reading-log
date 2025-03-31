import IconSearch from "../../assets/Icon-search.svg?react";
import IconLogOut from "../../assets/Icon-logout.svg?react";
import IconMyPage from "../../assets/Icon-mypage.svg?react";
import { useModalStore } from "../../store/modalStore.ts";
import BookSearchResult from "../common/BookSearchResult.tsx";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion import

export default function Header() {
  const { openModal } = useModalStore(); // Zustand의 openModal 가져오기

  const [focusSearch, setFocusSearch] = useState(false); // 검색바 포커스 상태
  const [searchValue, setSearchValue] = useState(""); // 검색어 값

  const handleLogout = () => {
    console.log("로그아웃 처리"); // 로그아웃 로직 추가
    openModal("ModalNotice", {
      title: "로그아웃 완료!",
      subTitle: "다음에 또 봐요!",
      confirmText: "닫기",
      oneBtn: true,
    });
  };

  // 검색바를 클릭하면 실행
  const searchFocus = () => {
    setFocusSearch(true);
  };

  // 검색바의 포커싱이 사라지면 실행
  const outFocus = () => {
    if (searchValue.trim() === "") {
      // input 값이 비어있으면 focusSearch를 false로 설정
      setFocusSearch(false);
    }
  };

  // 검색 중일 때 실행 (onChange 이벤트)
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value); // 입력값 업데이트
  };

  return (
    <header className="w-[1325px] fixed top-[15px] flex justify-between gap-2 z-10">
      {/* 검색창 */}
      <section
        className={`${focusSearch ? "flex-1" : ""} 
        flex flex-col bg-searchBackBg rounded-[25px] border-searchBorder border-[8px] transition-all duration-200 ease-in-out`}
      >
        <input
          type="search"
          className={`${
            searchValue ? "rounded-t-[20px] rounded-b-0" : "rounded-full"
          } pl-[50px] h-[34px] bg-searchBg`}
          placeholder="Searching book"
          value={searchValue}
          onFocus={searchFocus}
          onBlur={outFocus}
          onChange={searching}
        />

        {/* 검색 결과 */}
        <motion.div
          initial={{ maxHeight: 0}}
          style={{borderEndEndRadius: '20px', borderEndStartRadius: '20px'}}
          animate={{
            maxHeight: searchValue.trim() !== "" ? 500 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-y-scroll"
        >
          {searchValue.trim() !== "" && <BookSearchResult />}
        </motion.div>

        {/* 검색 아이콘 */}
        <span className="absolute left-0 top-0 flex flex-1 w-[50px] aspect-square justify-center items-center text-searchIconDefault bg-searchBackBg rounded-full">
          <IconSearch />
        </span>
      </section>

      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <section className="flex h-[50px] gap-3.5 items-center border-8 bg-nickNameBg border-borderColor_4 rounded-full">
        <span className="pl-2">닉네임님 환영합니다</span>
        <article className="flex h-full py-1 overflow-hidden bg-myPageLogOutBg divide-rou divide-x-2 divide-iconDivideColor">
          {/* MyPage 버튼 */}
          <button
            className="flex justify-center items-center text-myPageIconColor px-3"
            onClick={() => openModal("ModalMyPage")} // 클릭 시 ModalMyPage 열기
          >
            <IconMyPage />
          </button>
          {/* 로그아웃 버튼 */}
          <button
            className="justify-center items-center text-LogOutIconColor px-3"
            onClick={() =>
              openModal("ModalNotice", {
                title: "로그아웃 하시겠어요?",
                cancelText: "닫기",
                confirmText: "로그아웃",
                onConfirm: handleLogout, // 로그아웃 로직 전달
              })
            }
          >
            <IconLogOut />
          </button>
        </article>
      </section>
    </header>
  );
}
