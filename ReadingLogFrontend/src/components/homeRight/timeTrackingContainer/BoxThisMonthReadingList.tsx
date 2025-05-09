import ItemReadStatus from "./ItemReadStatus.tsx";
import { useModalStore } from "../../../store/modalStore.ts";
import { useEffect, useState } from "react";
import { monthReadingListItem } from "../../../types/monthReadingList.ts";
import { fetchThisMonthReadingList } from "../../../api/ThisMonthReadingListApi.ts";
import { useDateStore } from "../../../store/useDateStore.ts";

export default function BoxThisMonthReadingList() {

  const { openModal } = useModalStore();
  const { year, month } = useDateStore(); // Zustand에서 년도 정보 가져오기

  // const [page, setPage] = useState<number>(0);
  // const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  // const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [thisMonthReadingList, setThisMonthReadingList] = useState<monthReadingListItem[]>([])

  /* 독서 타임 트래킹 모달 오픈 */
  const openModaTrackingPlan = (item: monthReadingListItem) => {
    openModal('ModalTrackingPlan', {
      bookTitle: item.title,
      bookSubTitle: item.author,
      cover: item.cover,
      bookLink: item.link,
      cancelText: '닫기',
      confirmText: '로그아웃',
    })
  }

  const searchThisMonthReadingList = async (userId: number, yearMonth?: number, page?: number, size?: number) => {

    try {
      const data = await fetchThisMonthReadingList(userId, yearMonth, page, size);
      const items = data.monthlyReadingList.map((item: monthReadingListItem) => ({
        title: item.title,
        author: item.author,
        isbn13: item.isbn13,
        cover: item.cover,
        link: item.link,
        isFavorite: item.isFavorite,
        readStatus: item.readStatus,
        createdAt: item.createdAt
      }));
      setThisMonthReadingList(items)
      // const isLastPage = data.page.number + 1 >= data.page.totalPages;
      // setHasMore(!isLastPage);
    } catch (error) {
      console.error("쿼리 테스트 에러:", error);
      // setHasMore(false); // 더 이상 시도하지 않도록 설정
    } finally {
      // setIsLoading(false); // 검색 완료 후 로딩 상태 해제
    }
  };

  useEffect(() => {
    const yearMonth = parseInt(`${year}${String(month).padStart(2, '0')}`);
    searchThisMonthReadingList(1, yearMonth, 0, 20)
  }, []);

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
      ) : thisMonthReadingList.map((item, idx) => (
        <li
          key={idx}
          className="cursor-pointer gap-2 flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
          onClick={() => openModaTrackingPlan(item)}
        >
          <span className="flex-1 text-ellipsis overflow-hidden text-xl text-nowrap">{item.title}</span>
          <ItemReadStatus/>
        </li>
      ))}
    </>
  );
}