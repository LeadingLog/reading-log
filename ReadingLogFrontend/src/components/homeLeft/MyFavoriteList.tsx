import CustomScrollbar from "../common/CustomScrollbar.tsx";
// import { AladinApiItem } from "../../types/aladinApi.ts";
import { useModalStore } from "../../store/modalStore.ts";

export default function MyFavoriteList() {

  const { openModal } = useModalStore();

  /* 책 리스트를 클릭하면 책 계획 모달이 뜨는 경우 ------------- */
  const openModalBookPlan = (/*item: AladinApiItem*/) => {
    openModal("ModalBookPlan", {
      // cover: item.cover, // 여기 추가
      // bookTitle: item.title,
      // bookSubTitle: item.author,
      // cancelText: "다음에 읽기",
      // confirmText: "독서 계획 추가",
      // bookLink: item.link
    })
  }
  /* 책 리스트를 클릭하면 책 계획 모달이 뜨는 경우 END ------------- */

  return (
    // 책 썸네일 아이콘 리스트
    <CustomScrollbar
      containerClassName="grid grid-cols-3 gap-6 content-start flex-1"
      scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
      // scrollbarWidth=""
    >
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
      <li
        onClick={() => openModalBookPlan(/*item*/)}
        className="relative aspect-square bg-imgBook_Item_Bg cursor-pointer">
        관심도서
      </li>
    </CustomScrollbar>
  )
}