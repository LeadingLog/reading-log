import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookImgListProps, readStatus } from "../../types/myReadingList.ts";
import { fetchMyReadingList } from "../../api/myReadingListApi.ts";
import { ReadStatus } from "../../types/readStatus.ts";
import { useModalStore } from "../../store/modalStore.ts";
import { fetchMyReadingListSearch } from "../../api/myReadingListSearchQueryApi.ts";
import { useUserStore } from "../../store/userStore.ts";
import { BookListType } from "../../types/commonBookListType.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";

export default function BookImgList({ MyReadingListTabType, query = '', inputRef }: BookImgListProps) {
  const [page, setPage] = useState<number>( 0 );
  const [myReadingList, setMyReadingList] = useState<BookListType[]>( [] );
  const [hasMore, setHasMore] = useState( true );
  const [isLoading, setIsLoading] = useState( false );
  const { openModal } = useModalStore();
  const { userId } = useUserStore()
  const [isFetching, setIsFetching] = useState<boolean>( false );
  // 내 독서 목록 내부 검색 시 코드
  const [isSearching, setIsSearching] = useState( false );

  const myReadingListTrigger = useGlobalChangeStore((state) => state.triggers.MyReadingList);

  const searchBook = async (query: string) => {
    if (isFetching) return;
    setIsSearching( true );
    setIsFetching( true );
    try {

      const data = await fetchMyReadingListSearch( {
        userId: userId,
        MyReadingListTabType: MyReadingListTabType,
        query: query
      } );
      setMyReadingList( data.readingList );
      setIsFetching( false );
    } catch (error) {
      console.error( "리스트 로딩 실패:", error );
    } finally {
      setIsLoading( false );
    }
  };

  /* 내 독서 목록 탭을 처음 클릭 시 timeout 실행을 방지 하고자 둠 */
  const isFirstRender = useRef( true );

  useEffect( () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 첫 렌더링에서는 아무 것도 하지 않음
    }
    const timeout = setTimeout( async () => {
      if (query !== "" && inputRef) {
        // 검색어가 있을 때
        inputRef.current?.blur();
        inputRef.current?.focus();
        await searchBook( query );
      } else {
        // 검색어가 없을 때 (초기 상태로 되돌림)
        setIsSearching( false );
        setPage( 0 );
        setHasMore( true );
        setIsLoading( true );

        try {
          const data = await fetchMyReadingList( {
            userId: userId,
            MyReadingListTabType: MyReadingListTabType,
            page: 0, // query가 빈 값이 되면 항상 첫 페이지부터 로드
            size: 21,
          } );

          // 이전 목록을 완전히 대체 (검색 취소 시 처음부터 다시 로드)
          setMyReadingList( data.readingList );

          const isLastPage = data.page.number + 1 >= data.page.totalPages;
          setHasMore( !isLastPage );
        } catch (error) {
          console.error( "리스트 로딩 실패:", error );
          setHasMore( false );
        } finally {
          setIsLoading( false );
        }
      }
    }, 500 );

    // 타이머 정리
    return () => clearTimeout( timeout );
  }, [query] ); // query만 의존성으로 유지
  // 내 독서 목록 내부 검색 시 끝


  const openModalBookPlan = (item: BookListType) => {
    openModal( "ModalBookPlan", {
      bookId: item.bookId,
      cover: item.coverImgUrl,
      bookTitle: item.bookTitle,
      author: item.author,
      isbn13: item.isbn13,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 변경",
      bookLink: item.link,
      readStartDt: item.readStartDt,
      readEndDt: item.readEndDt
    } );
  };

  // 탭이 바뀌면 목록 초기화
  useEffect( () => {
    setMyReadingList( [] );
    setPage( 0 );
    setHasMore( true );

    skipObserver.current = true;
    const timer = setTimeout( () => {
      skipObserver.current = false;
    }, 100 ); // 짧게 차단 후 재허용

    return () => clearTimeout( timer );
  }, [MyReadingListTabType] );



  // 페이지 또는 탭 변경 시 데이터 로딩
  useEffect( () => {
    if (isSearching || (page > 0 && !hasMore)) return;

    const loadMyReadingList = async () => {
      setIsLoading( true );
      try {
        const data = await fetchMyReadingList( {
          userId: userId,
          MyReadingListTabType: MyReadingListTabType,
          page,
          size: 21,
        } );

        console.log( '페이지 또는 탭 변경시 데이터 로딩' )
        setMyReadingList( (prev) =>
          page === 0 ? data.readingList : [...prev, ...data.readingList]
        );

        const isLastPage = data.page.number + 1 >= data.page.totalPages;
        setHasMore( !isLastPage );
      } catch (error) {
        console.error( "리스트 로딩 실패:", error );
        setHasMore( false );
      } finally {
        setIsLoading( false );
      }
    };

    loadMyReadingList();
  }, [page, MyReadingListTabType, isSearching, myReadingListTrigger] );


  // Intersection Observer 설정 스크롤 시 마지막 부분을 확인용

  const skipObserver = useRef( false ); // 탭 변경시 옵져버 기능을 중지 하기 위한 것
  const myReadingListObserver = useRef<IntersectionObserver | null>( null );
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore || isSearching) return;

      if (myReadingListObserver.current) {
        myReadingListObserver.current.disconnect();
      }

      myReadingListObserver.current = new IntersectionObserver( (entries) => {
        if (entries[0].isIntersecting) {
          if (skipObserver.current) {
            // observer 동작 무시 (탭 변경 직후)
            skipObserver.current = false; // 다음부터는 다시 동작하게 함
            return;
          }

          setPage( (prev) => prev + 1 );
        }
      } );

      if (node) myReadingListObserver.current.observe( node );
    },
    [isLoading, hasMore,]
  );

  return (
    <>
      {myReadingList.map( (item, idx) => (
        <li
          key={idx}
          onClick={() => openModalBookPlan( item )}
          className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer"
        >
          <img src={item.coverImgUrl} alt={item.bookTitle} className="w-full h-full object-cover"/>
          <div
            className={`absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg 
              ${item.bookStatus === 'IN_PROGRESS' ? 'bg-imgBook_Item_Reading_Bg' :
              item.bookStatus === 'COMPLETED' ? 'bg-imgBook_Item_Complete_Bg' :
                'bg-imgBook_Item_NoRead_Bg'}`}
          >
            <span className="text-xs">{readStatus[item.bookStatus as ReadStatus] || "오류"}</span>
            <span className="flex justify-center items-center text-imgBook_Icon_Color mt-[1px]">
              {item.bookStatus === 'IN_PROGRESS' && <IconReading className="text-imgBook_Icon_Color"/>}
              {item.bookStatus === 'COMPLETED' && <IconReadComplete className="text-imgBook_Icon_Color"/>}
            </span>
          </div>
        </li>
      ) )}
      {isLoading && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_Text">
          <span>도서를 불러 오는 중입니다.</span>
          <span className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
        </li>
      )}
      {!isLoading && myReadingList.length === 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Empty_Text">
          <span className="text-2xl font-bold">읽고 싶은 도서를 추가해보세요!</span>
        </li>
      )}
      {hasMore && !isSearching && (
        <li
          ref={lastItemRef}
          className="invisible h-1 col-span-3"
        ></li>
      )}
      {!hasMore && myReadingList.length > 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_End_Text">
          <span>검색어와 관련된 모든 도서를 불러왔습니다.</span>
        </li>
      )}
    </>
  );
}
