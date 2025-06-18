import ItemReadStatus from "./ItemReadStatus.tsx";
import { useModalStore } from "../../../store/modalStore.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchThisMonthReadingListParams, monthReadingListItem } from "../../../types/monthReadingList.ts";
import { fetchThisMonthReadingList } from "../../../api/ThisMonthReadingListApi.ts";
import { useUserStore } from "../../../store/userStore.ts";
import { useGlobalChangeStore } from "../../../store/useGlobalChangeStore.ts";
import { usePageStore } from "../../../store/pageStore.ts";
import { useReadingBookStore } from "../../../store/useReadingInfoStore.ts";

/* 이번 달 독서 리스트 */
export default function BoxThisMonthReadingList() {

  const { openModal } = useModalStore();
  const { userId } = useUserStore()
  const { params, setRightContent } = usePageStore()

  const now = new Date();
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  /* 도서상태 토글 클릭 시 도서 리스트 클릭 효과 제어 */
  const [noneListClick, setNoneListClick] = useState<boolean>( false )

  const [page, setPage] = useState<number>( 0 );
  const [hasMore, setHasMore] = useState( true ); // 더 불러올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState( false ); // 로딩 상태 추가
  const [thisMonthReadingList, setThisMonthReadingList] = useState<monthReadingListItem[]>( [] )

  const myReadingListTrigger = useGlobalChangeStore( (state) => state.triggers.MyReadingList );

  const { readingBookId } = useReadingBookStore()

  /* 독서 타임 트래킹 모달 오픈 */
  const openModalTrackingPlan = (item: monthReadingListItem) => {
    if (item.bookId === readingBookId) {
      openModal( 'ModalNotice', {
        title: "현재 독서중인 도서입니다",
        subTitle: "독서종료 후 확인 가능합니다",
        withMotion: true,
        onlyClose: true
      } )
      return;
    } else if (params.TimeTracking?.tab !== "onlyMonthReadingList") {
      openModal( 'ModalNotice', {
        title: "독서중인 도서가 있습니다",
        subTitle: "독서종료 후 확인 가능합니다",
        withMotion: true,
        onlyClose: true
      } )
      return;
    }
    if (item.bookStatus === "COMPLETED") {
      openModal( 'ModalTrackingPlan', {
        bookId: item.bookId,
        bookTitle: item.bookTitle,
        author: item.author,
        cover: item.coverImgUrl,
        bookLink: item.link,
        onlyClose: true,
        cancelText: '닫기',
        bookStatus: item.bookStatus
      } )
    } else {
      openModal( 'ModalTrackingPlan', {
        bookId: item.bookId,
        bookTitle: item.bookTitle,
        author: item.author,
        cover: item.coverImgUrl,
        bookLink: item.link,
        cancelText: '닫기',
        confirmText: '독서 시작',
        bookStatus: item.bookStatus
      } )
    }
  }

  const searchThisMonthReadingList = async ({ userId, year, month, page, size }: fetchThisMonthReadingListParams) => {
    if (isLoading) return; // 이미 로딩 중이면 API 요청을 하지 않음

    try {
      setIsLoading( true );
      const data = await fetchThisMonthReadingList( { userId, year, month, page, size } );
      setThisMonthReadingList( (prev) =>
        page === 0 ? data.monthlyReadingList : [...prev, ...data.monthlyReadingList]
      )
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
    setRightContent(
      'TimeTracking',
      {
        TimeTracking:
          { tab: "onlyMonthReadingList" }
      },
    )
  }, [] );
  // 📌 1. 스크롤에 따른 페이지 증가
  useEffect( () => {
    if (page === 0) return;
    searchThisMonthReadingList( { userId, year, month, page, size: 21 } );
  }, [page] );

  // 📌 2. 외부 트리거 발생 시 page: 0으로 새로 요청
  useEffect( () => {
    setPage( 0 );
    // 페이지 초기화 후 새로 요청
    searchThisMonthReadingList( { userId, year, month, page: 0, size: 21 } );
  }, [myReadingListTrigger] );

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
          <span className="text-xl"

          >리스트가 비었어요</span>
        </li>
      ) : thisMonthReadingList.map( (item) => (
        <li
          key={item.bookId}
          className={`${!noneListClick ? "active:scale-[99%]" : ""} cursor-pointer gap-2 flex justify-between hover:bg-readingList_Hover transition-[background, scale] duration-100 p-3 rounded-xl bg-readingList_Bg group
          ${readingBookId === item.bookId ? "border-4 border-readingList_Bg bg-readingList_Hover" : ""}`}
          onClick={() => openModalTrackingPlan( item )}
        >
          <span className={`flex-1 text-ellipsis overflow-hidden text-xl text-nowrap
          ${readingBookId === item.bookId ? "text-white" : "text-black"}`}>
            {item.bookTitle}
          </span>
          <ItemReadStatus bookId={item.bookId} bookStatus={item.bookStatus} noneListClick={setNoneListClick}/>
        </li>
      ) )}
      {isLoading && (
        <li className="py-2 justify-center flex gap-1 text-sm text-favoriteList_Searching_Text">
          <span>도서를 불러 오는 중입니다.</span>
          <span className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
        </li>
      )}
      {/* 이 요소가 화면에 보이면 다음 페이지를 불러옴 */}
      {hasMore && !isLoading && (
        <li
          ref={lastItemRef}
          className="invisible h-1 p-3" // 실제 표시되진 않지만 관찰용
        ></li>
      )}
      {!hasMore && thisMonthReadingList.length > 0 && (
        <li className="py-2 justify-center flex gap-1 text-sm text-favoriteList_Searching_End_Text">
          <span onClick={() => {
            console.log( myReadingListTrigger )
          }}>이번 달 독서 리스트를 모두 불러왔습니다.</span>
        </li>
      )}
    </>
  );
}