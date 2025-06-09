import CustomScrollbar from "../common/CustomScrollbar.tsx";
import { useModalStore } from "../../store/modalStore.ts";
import { useEffect, useRef, useState, useCallback } from "react";
import { fetchMyFavoriteListParams } from "../../types/myFavoriteList.ts";
import { fetchMyFavoriteList } from "../../api/myFavoriteListApi.ts";
import { useUserStore } from "../../store/userStore.ts";
import { BookListType } from "../../types/commonBookListType.ts"
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";

export default function MyFavoriteList() {
  const [page, setPage] = useState<number>( 0 );
  const [favoriteList, setFavoriteList] = useState<BookListType[]>( [] );
  const [hasMore, setHasMore] = useState( true ); // 더 불러올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState( false );

  const { openModal } = useModalStore();
  const { userId } = useUserStore()

  const myReadingListTrigger = useGlobalChangeStore((state) => state.triggers.MyReadingList);

  const openModalBookPlan = ((item: BookListType) => {
    openModal( "ModalBookPlan", {
      bookId: item.bookId,
      cover: item.coverImgUrl,
      bookTitle: item.bookTitle,
      bookStatus: item.bookStatus,
      author: item.author,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 추가",
      bookLink: item.link,
    } );
  });

  const searchMyFavoriteList = async ({ userId, tabType, page, size }: fetchMyFavoriteListParams) => {
    if (isLoading) return; // 이미 로딩 중이면 API 요청을 하지 않음
    try {
      setIsLoading( true );
      const data = await fetchMyFavoriteList( { userId, tabType, page, size } );

      setFavoriteList( (prev) =>
        page === 0 ? data.readingList : [...prev, ...data.readingList]
      );

      const isLastPage = data.page.number + 1 >= data.page.totalPages;
      setHasMore( !isLastPage );
    } catch (error) {
      console.error( "쿼리 테스트 에러:", error );
      setHasMore( false ); // 더 이상 시도하지 않도록 설정
    } finally {
      setIsLoading( false );
    }
  };

  useEffect( () => {
    searchMyFavoriteList( { userId, tabType: 4, page, size: 21 } );
  }, [page, myReadingListTrigger] );

  // Intersection Observer 설정
  const myFavoriteListObserver = useRef<IntersectionObserver | null>( null );
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return; // 로딩 중이거나 더 이상 불러올 데이터가 없으면 종료

      if (myFavoriteListObserver.current) myFavoriteListObserver.current.disconnect(); // 기존 옵저버를 종료

      // 새로운 IntersectionObserver 생성
      myFavoriteListObserver.current = new IntersectionObserver( (entries) => {
        if (entries[0].isIntersecting) {
          // 마지막 아이템이 화면에 보이면 페이지 번호 증가
          setPage( (prev) => prev + 1 );
        }
      } );

      // `node`가 있으면 해당 노드를 관찰하기 시작
      if (node) myFavoriteListObserver.current.observe( node );
    },
    [isLoading, hasMore] // 이 값들이 변경되면 `lastItemRef`가 새로 정의됨
  );

  return (
    <CustomScrollbar
      containerClassName="grid grid-cols-3 gap-6 content-start flex-1"
      scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
    >
      {favoriteList.map( (item: BookListType, idx) => (
        <li
          key={idx}
          onClick={() => openModalBookPlan( item )}
          className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer"
        >
          <img src={item.coverImgUrl} alt={item.bookTitle} className="w-full h-full object-cover"/>
        </li>
      ) )}

      {isLoading && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_Text">
          <span>도서를 불러 오는 중입니다.</span>
          <span className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
        </li>
      )}

      {!isLoading && favoriteList.length === 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Empty_Text">
          <span className="text-2xl font-bold">관심도서를 추가해보세요!</span>
        </li>
      )}

      {/* 이 요소가 화면에 보이면 다음 페이지를 불러옴 */}
      {hasMore && (
        <li
          ref={lastItemRef}
          className="invisible h-1 col-span-3" // 실제 표시되진 않지만 관찰용
        ></li>
      )}

      {!hasMore && favoriteList.length > 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_End_Text">
          <span>검색어와 관련된 모든 도서를 불러왔습니다.</span>
        </li>
      )}
    </CustomScrollbar>
  );
}
