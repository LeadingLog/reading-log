import ItemReadStatus from "./ItemReadStatus.tsx";
import { useModalStore } from "../../../store/modalStore.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchThisMonthReadingListParams, monthReadingListItem, readOrder } from "../../../types/monthReadingList.ts";
import { fetchThisMonthReadingList } from "../../../api/ThisMonthReadingListApi.ts";

export default function BoxThisMonthReadingList() {

  const { openModal } = useModalStore();

  const [page, setPage] = useState<number>( 0 );
  const [hasMore, setHasMore] = useState( true ); // 더 불러올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState( false ); // 로딩 상태 추가
  const [thisMonthReadingList, setThisMonthReadingList] = useState<monthReadingListItem[]>( [] )

  /* 독서 타임 트래킹 모달 오픈 */
  const openModaTrackingPlan = (item: monthReadingListItem) => {
    openModal( 'ModalTrackingPlan', {
      bookId: item.bookId,
      bookTitle: item.bookTitle,
      bookSubTitle: item.author,
      cover: item.coverImgUrl,
      bookLink: item.link,
      cancelText: '닫기',
      confirmText: '독서 시작',
    } )
  }

  const searchThisMonthReadingList = async ({ userId, page, size }: fetchThisMonthReadingListParams) => {
    if (isLoading) return; // 이미 로딩 중이면 API 요청을 하지 않음
    try {
      setIsLoading( true );
      const data = await fetchThisMonthReadingList( { userId, page, size } );
      // 받아온 독서상태별로 데이터 순서 정렬
      const sortedList = data.monthlyReadingList.sort( (a: monthReadingListItem, b: monthReadingListItem) => {
        return readOrder[a.bookStatus] - readOrder[b.bookStatus];
      } );
      setThisMonthReadingList( (prev) => [...prev, ...sortedList] )
      const isLastPage = data.page.number + 1 >= data.page.totalPages;
      setHasMore( !isLastPage );
    } catch (error) {
      console.error( "이번달 독서 리스트 가져오기 실패", error );
      setHasMore( false ); // 더 이상 시도하지 않도록 설정
    } finally {
      setIsLoading( false ); // 검색 완료 후 로딩 상태 해제
    }
  };

  useEffect( () => {
    searchThisMonthReadingList( { userId: 1, page, size: 20 } );
  }, [page] );
  // Intersection Observer 설정
  const thisMonthReadingListObserver = useRef<IntersectionObserver | null>( null );
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return; // 로딩 중이거나 더 이상 불러올 데이터가 없으면 종료

      if (thisMonthReadingListObserver.current) thisMonthReadingListObserver.current.disconnect(); // 기존 옵저버를 종료

      // 새로운 IntersectionObserver 생성
      thisMonthReadingListObserver.current = new IntersectionObserver( (entries) => {
        if (entries[0].isIntersecting) {
          // 마지막 아이템이 화면에 보이면 페이지 번호 증가
          setPage( (prev) => prev + 1 );
        }
      } );

      // `node`가 있으면 해당 노드를 관찰하기 시작
      if (node) thisMonthReadingListObserver.current.observe( node );
    },
    [isLoading, hasMore] // 이 값들이 변경되면 `lastItemRef`가 새로 정의됨
  );

  return (
    /* 이번 달 독서 리스트 */
    <>
      {/* 책 리스트 */}
      {thisMonthReadingList.length === 0 ? (
        <li
          className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        >
          <span className="text-xl">리스트가 비었어요</span>
        </li>
      ) : thisMonthReadingList.map( (item, idx) => (
        <li
          key={idx}
          className="cursor-pointer gap-2 flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
          onClick={() => openModaTrackingPlan( item )}
        >
          <span className="flex-1 text-ellipsis overflow-hidden text-xl text-nowrap">{item.bookTitle}</span>
          <ItemReadStatus readStatus={item.bookStatus}/>
        </li>
      ) )}
      {isLoading && (
        <li className="py-2 justify-center flex gap-1 text-sm text-favoriteList_Searching_Text">
          <span>도서를 불러 오는 중입니다.</span>
          <span className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
        </li>
      )}
      {/* 이 요소가 화면에 보이면 다음 페이지를 불러옴 */}
      {hasMore && (
        <li
          ref={lastItemRef}
          className="invisible h-1 p-3" // 실제 표시되진 않지만 관찰용
        ></li>
      )}
      {!hasMore && thisMonthReadingList.length > 0 && (
        <li className="py-2 justify-center flex gap-1 text-sm text-favoriteList_Searching_End_Text">
          <span>이번 달 독서 리스트를 모두 불러왔습니다.</span>
        </li>
      )}
    </>
  );
}