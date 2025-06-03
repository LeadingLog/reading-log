import IconSearch from "../../assets/Icon-search.svg?react";
import BookSearchResult from "./BookSearchResult";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CustomScrollbar from "../common/CustomScrollbar.tsx";
import { fetchBooks } from "../../api/aladinApi.ts";
import { AladinApiItem } from "../../types/aladinApi.ts";
import { useUserStore } from "../../store/userStore.ts";

export default function MainBookSearch() {

  const [focusSearch, setFocusSearch] = useState( false ); // 검색바 포커스 상태
  const [searchValue, setSearchValue] = useState( "" ); // 검색어 값
  const searchIconVisible = focusSearch || searchValue.trim() !== "";
  const inputRef = useRef<HTMLInputElement>( null );
  const [isFetching, setIsFetching] = useState<boolean>( false );

  const { userId } = useUserStore();

  // 검색바를 클릭하면 실행
  const searchFocus = () => {
    setFocusSearch( true );
  };

  // 검색바의 포커싱이 사라지면 실행
  const outFocus = () => {
    if (searchValue.trim() === "") {
      setFocusSearch( false );
    }
  };

  // 검색 중일 때 실행 (onChange 이벤트)

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue( e.target.value );
  };
  /* 책 검색 결과 가져오기 */
  const [isLoading, setIsLoading] = useState( false ); // 로딩 상태 추가
  const [totalResults, setTotalResults] = useState<number>( 0 )
  const [bookSearchResultList, setBookSearchResultList] = useState( [] );

  const searchBooks = async (query: string) => {
    if (!query.trim()) return;
    if (isFetching) return;
    setIsFetching( true );
    try {
      const response = await fetchBooks( userId ?? 0, query, 1 );
      if (response.data && Array.isArray( response.data.item )) {
        const items = response.data.item.map( (item: AladinApiItem) => ({
          userId: userId ?? 0,
          bookTitle: item.title,
          author: item.author,
          isbn13: item.isbn13,
          link: item.link,
          coverImgUrl: item.cover,
          bookStatus: item.bookStatus,
        }) );
        setBookSearchResultList( items );
        setTotalResults( response.data.totalResults )
        setIsFetching( false );
      } else {
        setBookSearchResultList( [] );
        console.warn( 'No items in response:', response.data );
      }
    } catch (error) {
      console.error( '도서 검색 중 오류 발생:', error );
      setBookSearchResultList( [] );
    } finally {
      setIsLoading( false ); // 검색 완료 후 로딩 상태 해제
    }
  };
  // 디바운스 처리 (300ms 이후 searchValue 업데이트)
  useEffect( () => {
    setIsLoading( true )
    const timeout = setTimeout( () => {
      if (searchValue !== "") {
        (async () => {
          inputRef.current?.blur();
          inputRef.current?.focus();
          await searchBooks( searchValue );
        })();
      } else {
        setBookSearchResultList( [] );
      }
    }, 500 );

    return () => clearTimeout( timeout );
  }, [searchValue] );

  return (
    <>
      <section
        className={`
        ${focusSearch ? "flex-1 after:content-[''] after:absolute after:right-2 after:left-2 after:top-8 after:h-0.5 after:bg-main_SearchBar_Border" : ""} 
        relative flex flex-col w-80 bg-main_SearchBar_Back_Bg rounded-[25px] bg-main_SearchBar_Bg border-main_SearchBar_Border border-8 transition-all duration-200 ease-in-out`}
      >
        {/* 검색 아이콘 */}
        <span
          className={`
          absolute z-[1] -top-2 flex flex-1 w-[50px] aspect-square justify-center items-center
          transition-all duration-300 ease-in-out rounded-full
          ${searchIconVisible ? "searching_Icon" : "unSearching_Icon"}
        `}
        >
          <IconSearch/>
        </span>
        <input
          ref={inputRef}
          type="text"
          className={`
          ${searchValue ? "rounded-t-[20px] rounded-b-0" : "rounded-full"}
          ${searchIconVisible ? "pl-[40px]" : "pl-[50px]"}
          transition-[padding] duration-300 ease-in-out focus:outline-none focus:ring-0 h-[34px] bg-main_SearchBar_Bg`}
          placeholder="Searching book"
          value={searchValue}
          onFocus={searchFocus}
          onBlur={outFocus}
          onChange={changeSearchValue}
        />
        {searchValue && (
          <button
            onClick={() => {
              setBookSearchResultList( [] );
              setSearchValue( "" )
              inputRef.current?.focus(); // ✅ 클릭 시 input에 포커스!
            }}
            className="absolute flex justify-center items-center w-[20x] h-[20px] aspect-square right-3 top-1.5 bg-main_SearchBar_ClearText_Bg z-[1] text-xs font-black text-main_SearchBar_ClearText_Color hover:text-gray-600 rounded-full"
          >
            ✕
          </button>
        )}
        {focusSearch && (
          <>
            {/* 검색 결과 */}
            <motion.div
              initial={{ maxHeight: 0 }}
              style={{ borderEndEndRadius: '20px', borderEndStartRadius: '20px' }}
              animate={{
                maxHeight: focusSearch ? 700 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden flex"
            >
              <CustomScrollbar
                containerClassName="relative bg-main_SearchBar_Bg flex flex-1 justify-between h-15 gap-3 pl-4 pr-2 py-4 flex-wrap rounded-b-[20px]"
                scrollbarClassName="right-1.5 w-1.5 scale-y-90 bg-scrollbar_Main_SearchBar_Result_Color transition-[colors] group-hover/scroll:bg-scrollbar_Main_SearchBar_Result_Hover_Color"
                // scrollbarWidth=""
              >
                <BookSearchResult isLoading={isLoading} searchValue={searchValue}
                                  bookSearchResultList={bookSearchResultList} totalResults={totalResults}/>
              </CustomScrollbar>
            </motion.div>
          </>
        )}
      </section>
    </>
  );
}
