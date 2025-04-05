import IconSearch from "../../assets/Icon-search.svg?react";
import BookImgList from "../common/BookImgList.tsx";

export default function MyBookList() {

  return (
    /* 내 독서 목록 */
    <section className="flex flex-col flex-1 gap-4 overflow-hidden">
      {/* 전체, 독서중, 완독, 읽기전 탭 리스트 */}
      <ul className="flex gap-5">
        <li
          className="flex-1 text-xl font-semibold text-myBookList_ActiveTab_Text px-2 py-1 text-center rounded-full bg-myBookList_ActiveTab_Bg">전체
        </li>
        <li
          className="flex-1 text-xl text-myBookList_InActiveTab_Text px-2 py-1 text-center rounded-full bg-myBookList_InActiveTab_Bg">독서중
        </li>
        <li
          className="flex-1 text-xl text-myBookList_InActiveTab_Text px-2 py-1 text-center rounded-full bg-myBookList_InActiveTab_Bg">완독
        </li>
        <li
          className="flex-1 text-xl text-myBookList_InActiveTab_Text px-2 py-1 text-center rounded-full bg-myBookList_InActiveTab_Bg">읽기전
        </li>
      </ul>
      {/* 검색 바 */}
      <article
        className="flex relative justify-between items-center border-4 bg-myBook_SearchBar_Bg border-myBook_SearchBar_Border rounded-full">
        <span
          className="flex w-8 h-full p-1 justify-center items-center text-myBook_SearchBar_SearchIcon_Default_Color ">
          <IconSearch width="100%" height="100%"/>
        </span>
        <input type="search" className="w-full h-full p-1 bg-MyBook_SearchBar_Bg rounded-e-full" placeholder="어떤 책을 찾으시나요?"/>
      </article>
      {/* 책 썸네일 아이콘 리스트 */}
      <BookImgList/>
    </section>
  )
}