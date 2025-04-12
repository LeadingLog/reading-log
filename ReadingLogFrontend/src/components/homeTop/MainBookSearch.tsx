import IconSearch from "../../assets/Icon-search.svg?react";
import BookSearchResult from "./BookSearchResult";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomScrollbar from "../common/CustomScrollbar.tsx";
import axios from "axios";

export default function MainBookSearch() {

  const [focusSearch, setFocusSearch] = useState(false); // 검색바 포커스 상태
  const [searchValue, setSearchValue] = useState(""); // 검색어 값
  const [searchIcon, setSearchIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  // 검색바를 클릭하면 실행
  const searchFocus = () => {
    setFocusSearch(true);
    setSearchIcon(true);
  };

  // 검색바의 포커싱이 사라지면 실행
  const outFocus = () => {
    if (searchValue.trim() === "") {
      setFocusSearch(false);
      setSearchIcon(false);
    }
  };

  // 검색 중일 때 실행 (onChange 이벤트)
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value); // 입력값 업데이트
  };

  /* 책 검색 결과 가져오기 */
  const AladinApi = import.meta.env.VITE_ALADIN_API;
  const [bookSearchResultList, setBookSearchResultList] = useState([]);

  interface AladinApiItem {
    title: string;
    author: string;
    isbn: string;
    cover: string;
  }

  const searchBooks = async (query: string) => {
    if (!query.trim()) return; // 빈 문자열 방지

    try {
      const {data} = await axios.get('https://www.aladin.co.kr/ttb/api/ItemSearch.aspx', {
        params: {
          ttbkey: AladinApi,
          Query: query,
          MaxResults: 10,
          start: 1,
          Cover: 'Big',
          SearchTarget: 'Book',
          output: 'js',
          Version: '20131101',
        },
      });

      if (data && Array.isArray(data.item)) {
        const items = data.item.map((item: AladinApiItem) => ({
          title: item.title,
          author: item.author,
          isbn: item.isbn,
          cover: item.cover,
        }));

        setBookSearchResultList(items);
      } else {
        setBookSearchResultList([]);
        console.warn('No items in response:', data);
      }
    } catch (error) {
      console.error('도서 검색 중 오류 발생:', error);
      setBookSearchResultList([]);
    }
  };

  return (
    <>
      {/* 검색창 */}
      <button
        className="absolute top-[15px] left-[800px] z-20 bg-main_SearchBar_Border"
        onClick={() => searchBooks(searchValue)}
      >
        검색
      </button>
      <section
        className={`
        ${searchValue ? "after:content-[''] after:absolute after:right-2 after:left-2 after:top-8 after:h-0.5 after:bg-main_SearchBar_Border" : ""}
        ${focusSearch ? "flex-1" : ""} 
        relative flex flex-col w-80 bg-main_SearchBar_Back_Bg rounded-[25px] bg-main_SearchBar_Bg border-main_SearchBar_Border border-8 transition-all duration-200 ease-in-out`}
      >
        {/* 검색 아이콘 */}
        <span
          className={`
          absolute z-[1] -top-2 flex flex-1 w-[50px] aspect-square justify-center items-center
          transition-all duration-300 ease-in-out rounded-full
          ${searchIcon ? "searching_Icon" : "unSearching_Icon"}
        `}
        >
          <IconSearch/>
        </span>
        <input
          ref={inputRef}
          type="search"
          className={`
          ${searchValue ? "rounded-t-[20px] rounded-b-0" : "rounded-full"}
          ${searchIcon ? "pl-[40px]" : "pl-[50px]"}
          transition-[padding] duration-300 ease-in-out focus:outline-none focus:ring-0  h-[34px] bg-main_SearchBar_Bg`}
          placeholder="Searching book"
          value={searchValue}
          onFocus={searchFocus}
          onBlur={outFocus}
          onChange={searching}
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              inputRef.current?.focus(); // ✅ 클릭 시 input에 포커스!
            }}
            className="absolute flex justify-center items-center w-[20x] h-[20px] aspect-square right-3 top-1.5 bg-main_SearchBar_ClearText_Bg z-[1] text-xs font-black text-main_SearchBar_ClearText_Color hover:text-gray-600 rounded-full"
          >
            ✕
          </button>
        )}

        {/* 검색 결과 */}
        <motion.div
          initial={{maxHeight: 0}}
          style={{borderEndEndRadius: '20px', borderEndStartRadius: '20px'}}
          animate={{
            maxHeight: searchValue.trim() !== "" ? 700 : 0,
          }}
          transition={{duration: 0.2, ease: "easeInOut"}}
          className="overflow-hidden flex"
        >
          <CustomScrollbar
            containerClassName="bg-main_SearchBar_Bg flex flex-1 justify-between gap-3 pl-4 pr-2 py-4 flex-wrap rounded-b-[20px]"
            scrollbarClassName="right-1.5 w-1.5 scale-y-90 bg-scrollbar_Main_SearchBar_Result_Color transition-[colors] group-hover/scroll:bg-scrollbar_Main_SearchBar_Result_Hover_Color"
            // scrollbarWidth=""
          >
            <BookSearchResult bookSearchResultList={bookSearchResultList}/>
          </CustomScrollbar>
        </motion.div>
      </section>
    </>
  );
}
