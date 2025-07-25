import React, { useEffect, useRef, useState } from 'react';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import { useModalStore } from "../../store/modalStore.ts";
import { AladinApiItem, BookSearchResultProps } from "../../types/aladinApi";
import { fetchBooks } from "../../api/aladinApi.ts";
import { ReadingListAddApiRequestBody } from "../../types/readingListAdd.ts";
import { readingListAddApi } from "../../api/readingListAddAPI.ts";
import { useUserStore } from "../../store/userStore.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";

const BookSearchResult: React.FC<BookSearchResultProps> = ({
                                                             totalResults,
                                                             bookSearchResultList,
                                                             searchValue,
                                                             isLoading
                                                           }) => {

  const { openModal, closeAllModals } = useModalStore();
  const { userId } = useUserStore();

  const { triggerChange } = useGlobalChangeStore.getState();

  /* 관심도서 클릭 시 도서 리스트 클릭 효과 제어 */
  const [noneListClick, setNoneListClick] = useState<boolean>( false )

  /* 관심도서 버튼을 클릭하면 뜨는 모달 관련 ------------- */
  const [favorite, setFavorite] = useState<string[]>( [] );
  const setModalIsLoading = useModalStore( state => state.setModalIsLoading );
  const modalIsLoading = useModalStore( (state) => state.modalIsLoading );
  /* 무한 스크롤 관련 */
  const [moreTotalResults, setMoreTotalResults] = useState<number>( totalResults )
  const containerRef = useRef<HTMLLIElement>( null );
  const [searchPage, setSearchPage] = useState<number>( 2 )
  const [moreBookList, setMoreBookList] = useState<ReadingListAddApiRequestBody[]>( [] );
  const [isFetching, setIsFetching] = useState<boolean>( false );
  const searchBooks = async (query: string, page: number) => {
    if (!query.trim()) return;
    if (isFetching) return;

    setIsFetching( true );
    if (totalResults === moreBookList.length) return;
    try {
      const response = await fetchBooks( userId, query, page ); // 페이지 번호로 요청
      if (response.data && Array.isArray( response.data.item )) {
        const items = response.data.item.map( (item: AladinApiItem) => ({
          userId: userId,
          bookTitle: item.title,
          author: item.author,
          isbn13: item.isbn13,
          link: item.link,
          coverImgUrl: item.cover,
          bookStatus: item.bookStatus,
        }) );
        setMoreBookList( prev =>
          page === 0 ? prev : [...prev, ...items]
        );
        setSearchPage( prev => prev + 1 ); // 페이지 증가!!
        setIsFetching( false );
      }
    } catch (error) {
      console.error( '도서 검색 중 오류 발생:', error );
    }
  };

  /* 첫 검색 결과 가져오기 */
  useEffect( () => {
    setMoreBookList( bookSearchResultList )
    setMoreTotalResults( totalResults )
    setSearchPage( 2 ); // ✅ 검색어 바뀔 때 page도 초기화
  }, [bookSearchResultList, searchValue, modalIsLoading] );

  // ✅ IntersectionObserver 적용
  useEffect( () => {
    if (isLoading) return;
    if (moreTotalResults === moreBookList.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach( entry => {
          if (entry.isIntersecting) {
            searchBooks( searchValue, searchPage );
          }
        } );
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const target = containerRef.current;
    if (target) {
      observer.observe( target );
    }

    return () => {
      if (target) observer.unobserve( target );
      observer.disconnect();
    };
  }, [searchPage, searchValue, moreBookList.length, isLoading] );

  /* 관심도서로 추가 api */
  const addInterested = async (item: ReadingListAddApiRequestBody) => {

    const ReadingListAddApiRequestBody: ReadingListAddApiRequestBody = {
      userId: userId,
      bookTitle: item.bookTitle,
      author: item.author,
      isbn13: item.isbn13,
      link: item.link,
      coverImgUrl: item.coverImgUrl,
      bookStatus: 'INTERESTED',
    };
    const addInterestedModal = () => {
      openModal( "ModalNotice", {
        title: "관심도서로 추가하시겠어요?",
        subTitle: "관심도서에 추가됩니다.",
        cancelText: "아니요",
        confirmText: "추가하기",
        withMotion: true,
        loadingMessage: "추가중",
        onConfirm: async () => {
          try {
            setModalIsLoading( true )
            const response = await readingListAddApi( ReadingListAddApiRequestBody )
            if (response) {
              triggerChange( "INTERESTED" )
              openModal( "ModalNotice", {
                title: "관심도서에 추가되었어요!",
                subTitle: "이 책이 마음에 드셨군요!",
                onlyClose: true,
                withMotion: true,
                onCancel: () => {
                  setFavorite( (prev: string[]) => [...prev, item.isbn13] );
                  closeAllModals()
                }
              } );
            }
          } catch (error) {
            console.error( '관심 도서 추가 실패', error )
            openModal( "ModalNotice", {
              title: '요청 실패',
              subTitle: `${error}`,
              onlyClose: true,
              withMotion: true,
            } );
          } finally {
            setModalIsLoading( false )
          }
        },
      } );
    }
    if (item.bookStatus !== "INTERESTED" && !favorite.includes( item.isbn13 )) {
      addInterestedModal()
    }
  }
  /* 관심도서 버튼을 클릭하면 뜨는 모달 관련 END ------------- */

  /* 책 리스트를 클릭하면 책 계획 모달이 뜨는 경우 ------------- */
  const openModalBookPlan = (item: ReadingListAddApiRequestBody) => {
    openModal( "ModalBookPlan", {
      cover: item.coverImgUrl, // 여기 추가
      bookTitle: item.bookTitle,
      author: item.author,
      isbn13: item.isbn13,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 추가",
      bookLink: item.link
    } )
  }
  /* 책 리스트를 클릭하면 책 계획 모달이 뜨는 경우 END ------------- */

  return (
    <>
      {searchValue === "" ? (
        <li className="text-xl text-main_SearchBar_NotYetFindBook_Text mx-auto">읽고 싶은 책을 검색하세요</li>
      ) : !isLoading && moreBookList.length === 0 ? (
        <li className="text-xl text-main_SearchBar_NotFindBook_Text mx-auto">검색 결과가 없어요</li>
      ) : (
        <>
          {isLoading &&
            <li
              className={`${moreBookList.length === 0 ? "static p-1" : "absolute top-1 right-1"} flex gap-1 text-sm text-main_SearchBar_searchingBook_Text mx-auto`}>
              <span>도서 검색 중</span>
              <span
                className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
            </li>
          }
          {moreBookList.map( (item) => (
            <li
              key={item.isbn13}
              className={`${!noneListClick ? "active:scale-[99%]" : ""} duration-100 cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border, scale] p-1 border-2 border-transparent items-center hover:border-main_SearchBar_Border rounded-lg`}
              onClick={() => openModalBookPlan( item )}
            >
              <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl overflow-hidden">
                {item.coverImgUrl ? (
                    <img src={item.coverImgUrl} alt={item.bookTitle} className="w-full h-full object-cover"/>
                  ) :
                  <div className="flex w-full justify-center relative px-2 h-full items-center bg-imgBook_Item_Bg">
                    <span className="text-xl font-bold text-imgBook_Item_No_Img_Text">No Image</span>
                  </div>
                }
              </div>
              <div className="flex flex-col flex-1 self-start">
                <p
                  className="text-lg overflow-hidden text-main_SearchBar_SearchResult_Book_Title_Text"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.bookTitle}
                </p>
                <p className="text-base overflow-hidden text-main_SearchBar_SearchResult_Book_SubTitle_Text"
                   style={{
                     display: '-webkit-box',
                     WebkitLineClamp: 2,
                     WebkitBoxOrient: 'vertical',
                   }}
                >
                  {item.author}
                </p>
              </div>
              <div className="group w-12 aspect-square relative">
                <div
                  onMouseDown={() => setNoneListClick( true )}
                  onMouseUp={() => setNoneListClick( false )}
                  onMouseLeave={() => setNoneListClick( false )}
                  className={`${
                    item.bookStatus === "INTERESTED" || favorite.includes( item.isbn13 ) ? 'bg-favorite_Icon_Bg' : 'bg-unFavorite_Icon_Bg group-hover:bg-unFavorite_Icon_Hover_Bg duration-100 group-active:active:scale-95'
                  } absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addInterested( item );
                  }}
                >
                  <IconFavorite className="text-favorite_Icon_Color" width="100%" height="100%"/>
                </div>
              </div>
            </li>
          ) )}
          {!isLoading && moreTotalResults - moreBookList.length !== 0 ? (
            <li
              ref={containerRef}
              className="py-2 basis-full justify-center flex gap-1 text-sm text-main_SearchBar_searchingBook_Text">
              <span>도서를 불러 오는 중입니다.</span>
              <span
                className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
            </li>
          ) : !isLoading && moreTotalResults - moreBookList.length === 0 &&
            <li
              className="py-2 basis-full justify-center flex gap-1 text-sm text-main_SearchBar_searchingBook_Text">
              <span>관련 도서를 모두 불러왔습니다.</span>
            </li>
          }
        </>
      )}
    </>
  );
};

export default BookSearchResult;