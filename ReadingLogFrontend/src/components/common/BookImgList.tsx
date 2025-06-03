import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react";
import IconFavorite from "../../assets/Icon-favorite.svg?react";
import { useCallback, useEffect, useRef, useState } from "react";
import { readStatus, TabType } from "../../types/myReadingList.ts";
import { fetchMyReadingList } from "../../api/myReadingListApi.ts";
import { AladinApiItem } from "../../types/aladinApi.ts";
import { ReadStatus } from "../../types/readStatus.ts";
import { useModalStore } from "../../store/modalStore.ts";

export default function BookImgList({ isActive }: { isActive: TabType }) {
  const [page, setPage] = useState<number>(0);
  const [myReadingList, setMyReadingList] = useState<AladinApiItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModalStore();

  const openModalBookPlan = (item: AladinApiItem) => {
    openModal("ModalBookPlan", {
      cover: item.cover,
      bookTitle: item.title,
      bookSubTitle: item.author,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 추가",
      bookLink: item.link,
    });
  };

  // 탭이 바뀌면 목록 초기화
  useEffect(() => {
    setMyReadingList([]);
    setPage(0);
    setHasMore(true);
  }, [isActive]);

  // 페이지 또는 탭 변경 시 데이터 로딩
  useEffect(() => {
    if (!hasMore) return;

    const searchMyReadingList = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMyReadingList({
          userId: 1,
          tabType: isActive,
          page,
          size: 21,
        });

        setMyReadingList((prev) =>
          page === 0 ? data.readingList : [...prev, ...data.readingList]
        );

        const isLastPage = data.page.number + 1 >= data.page.totalPages;
        setHasMore(!isLastPage);
      } catch (error) {
        console.error("리스트 로딩 실패:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    searchMyReadingList();
  }, [page, isActive]);

  // Intersection Observer 설정
  const myReadingListObserver = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;

      if (myReadingListObserver.current) {
        myReadingListObserver.current.disconnect();
      }

      myReadingListObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) myReadingListObserver.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      {myReadingList.map((item, idx) => (
        <li
          key={idx}
          onClick={() => openModalBookPlan(item)}
          className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer"
        >
          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
          <div
            className={`absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg 
              ${item.readStatus === 'reading' ? 'bg-imgBook_Item_Reading_Bg' :
              item.readStatus === 'complete' ? 'bg-imgBook_Item_Complete_Bg' :
                'bg-imgBook_Item_NoRead_Bg'}`}
          >
            <span className="text-xs">{readStatus[item.readStatus as ReadStatus] || "오류"}</span>
            <span className="flex justify-center items-center text-imgBook_Icon_Color mt-[1px]">
              {item.readStatus === 'reading' && <IconReading className="text-imgBook_Icon_Color" />}
              {item.readStatus === 'complete' && <IconReadComplete className="text-imgBook_Icon_Color" />}
            </span>
          </div>
          <div className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%" />
          </div>
        </li>
      ))}
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
      {hasMore && (
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
