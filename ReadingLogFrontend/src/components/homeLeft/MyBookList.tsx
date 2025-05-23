import IconSearch from "../../assets/Icon-search.svg?react";
import BookImgList from "../common/BookImgList.tsx";
import { useState } from "react";
import CustomScrollbar from "../common/CustomScrollbar.tsx";
import { tabLabels, TabType } from "../../types/myReadingList.ts";

export default function MyBookList() {

  const [isActive, setIsActive] = useState<TabType>(0)

  const tabNumber: TabType[] = [0, 1, 2, 3];

  const changeType = (type: TabType) => {
    setIsActive(type)
  }

  return (
    /* 내 독서 목록 */
    <section className="flex flex-col flex-1 gap-4 overflow-hidden">
      {/* 전체, 독서중, 완독, 읽기전 탭 리스트 */}
      <ul className="flex gap-5">
        {tabNumber.map((type) => (
          <li
            key={type}
            onClick={() => changeType(type)}
            className={`${isActive === type ? 'font-semibold text-myBookList_ActiveTab_Text bg-myBookList_ActiveTab_Bg' : 'text-myBookList_InActiveTab_Text bg-myBookList_InActiveTab_Bg'}
              flex-1 text-xl cursor-pointer px-2 py-1 text-center rounded-full`}
          >
            {tabLabels[type]}
          </li>
        ))}
      </ul>
      {/* 검색 바 */}
      <article
        className="flex relative justify-between items-center border-4 bg-myBook_SearchBar_Bg border-myBook_SearchBar_Border rounded-full">
        <span
          className="flex w-8 h-full p-1 justify-center items-center text-myBook_SearchBar_SearchIcon_Default_Color ">
          <IconSearch width="100%" height="100%"/>
        </span>
        <input type="search" className="w-full h-full p-1 bg-myBook_SearchBar_Bg rounded-e-full"
               placeholder="어떤 책을 찾으시나요?"/>
      </article>
      {/* 책 썸네일 아이콘 리스트 */}
      <CustomScrollbar
        containerClassName="grid grid-cols-3 gap-6 content-start flex-1"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
        // scrollbarWidth=""
      >
        <BookImgList isActive={isActive}/>
      </CustomScrollbar>
    </section>
  )
}