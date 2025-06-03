import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react";
import IconFavorite from "../../assets/Icon-favorite.svg?react";
import { useCallback, useEffect, useRef, useState } from "react";
import { readStatus } from "../../types/myReadingList.ts";
import { ReadStatus } from "../../types/readStatus.ts";
import { useModalStore } from "../../store/modalStore.ts";
import { fetchMonthReadingListParams, monthReadingListItem, readOrder } from "../../types/monthReadingList.ts";
import { useDateStore } from "../../store/useDateStore.ts";
import { fetchMonthReadingList } from "../../api/monthReadingListApi.ts";

export default function BookImgList() {
  const [page, setPage] = useState<number>( 0 );
  const [hasMore, setHasMore] = useState( true );
  const [isLoading, setIsLoading] = useState( false );
  const { openModal } = useModalStore();

  const { year, month } = useDateStore();

  const [thisMonthReadingList, setThisMonthReadingList] = useState<monthReadingListItem[]>( [] )


  const searchThisMonthReadingList = async ({ userId, year, month, page, size }: fetchMonthReadingListParams) => {
    if (isLoading) return; // 이미 로딩 중이면 API 요청을 하지 않음
    try {
      setIsLoading( true );
      const data = await fetchMonthReadingList( { userId, year, month, page, size } );
      // 받아온 독서상태별로 데이터 순서 정렬
      const sortedList = data.monthlyReadingList.sort( (a: monthReadingListItem, b: monthReadingListItem) => {
        return readOrder[a.bookStatus] - readOrder[b.bookStatus];
      } );
      setThisMonthReadingList( (prev) => [...prev, ...sortedList] )
      const isLastPage = data.page.number + 1 >= data.page.totalPages;
      setHasMore( !isLastPage );
    } catch (error) {
      console.error( year, "년", month, "월 독서리스트 가져오기 실패:", error );
      setHasMore( false ); // 더 이상 시도하지 않도록 설정
    } finally {
      setIsLoading( false ); // 검색 완료 후 로딩 상태 해제
    }
  };

  // 년도 및 월이 변경되는 경우 해당 월 정보 가져옴
  useEffect( () => {
    setThisMonthReadingList( [] );
    setPage( 0 );
    setHasMore( true );
    searchThisMonthReadingList( { userId: 1, year, month, page: 0, size: 20 } );
  }, [month, year] );

  useEffect( () => {
    searchThisMonthReadingList( { userId: 1, year, month, page, size: 20 } );
  }, [page] );

  const openModalBookPlan = (item: monthReadingListItem) => {
    openModal( "ModalBookPlan", {
      cover: item.coverImgUrl,
      bookTitle: item.bookTitle,
      bookSubTitle: item.author,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 추가",
      bookLink: item.link,
    } );
  };

  // Intersection Observer 설정 스크롤 시 마지막 부분을 확인용
  const myReadingListObserver = useRef<IntersectionObserver | null>( null );
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;

      if (myReadingListObserver.current) {
        myReadingListObserver.current.disconnect();
      }

      myReadingListObserver.current = new IntersectionObserver( (entries) => {
        if (entries[0].isIntersecting) {
          setPage( (prev) => prev + 1 );
        }
      } );

      if (node) myReadingListObserver.current.observe( node );
    },
    [isLoading, hasMore]
  );

  return (
    <>
      {thisMonthReadingList.map( (item, idx) => (
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
          <div
            className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </li>
      ) )}
      {isLoading && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_Text">
          <span>도서를 불러 오는 중입니다.</span>
          <span className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
        </li>
      )}
      {!isLoading && thisMonthReadingList.length === 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Empty_Text">
          <span className="text-2xl font-bold">{month}월은 도서 정보가 없어요</span>
        </li>
      )}
      {hasMore && (
        <li
          ref={lastItemRef}
          className="invisible h-1 col-span-3"
        ></li>
      )}
      {!hasMore && thisMonthReadingList.length > 0 && (
        <li className="py-2 col-span-3 justify-center flex gap-1 text-sm text-favoriteList_Searching_End_Text">
          <span>{month}월달 도서를 모두 불러왔습니다.</span>
        </li>
      )}
    </>
  );
}
