import ItemReadStatus from "./ItemReadStatus.tsx";
import { useModalStore } from "../../../store/modalStore.ts";
// import CustomScrollbar from "../../common/CustomScrollbar.tsx";

export default function BoxThisMonthReadingList() {

  const {openModal} = useModalStore();

  /* 독서 타임 트래킹 모달 오픈 */
  const openModaTrackingPlan = () => {
    openModal('ModalTrackingPlan', {
      title: '로그아웃 하시겠어요?',
      cancelText: '닫기',
      confirmText: '로그아웃',
    })
  }


  return (
    /* 이번 달 독서 리스트 */
    <>
      {/* 책 리스트 */}
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      </li>
      <li
        className="cursor-pointer flex justify-between hover:bg-readingList_Hover transition-[background] duration-100 p-3 rounded-xl bg-readingList_Bg group"
        onClick={() => openModaTrackingPlan()}
      >
        <span className="text-xl">책이름</span>
        <ItemReadStatus/>
      </li>
    </>
  );
}