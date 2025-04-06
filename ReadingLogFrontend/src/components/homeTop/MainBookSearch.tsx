import IconSearch from "../../assets/Icon-search.svg?react";
import BookSearchResult from "./BookSearchResult.tsx";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomScrollbar from "../common/CustomScrollbar.tsx"; // Framer Motion import

export default function MainBookSearch() {

  const [focusSearch, setFocusSearch] = useState(false); // 검색바 포커스 상태
  const [searchValue, setSearchValue] = useState(""); // 검색어 값

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
    <>
      {/* 검색창 */}
      <section
        className={`${focusSearch ? "flex-1" : ""} 
        flex flex-col bg-main_SearchBar_Back_Bg rounded-[25px] border-main_SearchBar_Border border-[8px] transition-all duration-200 ease-in-out`}
      >
        <input
          type="search"
          className={`${
            searchValue ? "rounded-t-[20px] rounded-b-0" : "rounded-full"
          } pl-[50px] h-[34px] bg-main_SearchBar_Bg`}
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
          className="overflow-hidden"
        >
          <CustomScrollbar
            containerClassName="bg-main_SearchBar_Bg flex flex-wrap rounded-b-[20px]"
            scrollbarClassName=""
            // scrollbarWidth=""
          >
            <BookSearchResult />
          </CustomScrollbar>
        </motion.div>

        {/* 검색 아이콘 */}
        <span className="absolute left-0 top-0 flex flex-1 w-[50px] aspect-square justify-center items-center text-main_SearchBar_SearchIcon_Default_Color bg-main_SearchBar_Back_Bg rounded-full">
          <IconSearch />
        </span>
      </section>
    </>
  );
}
