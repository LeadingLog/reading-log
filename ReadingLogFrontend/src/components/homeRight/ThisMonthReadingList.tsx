import { useModalStore } from "../../store/modalStore.ts";
// import { usePageStore } from "../../store/pageStore.ts";

export default function ThisMonthReadingList() {
  const {openModal} = useModalStore(); // Zustand의 openModal 가져오기
  // const { rightContent, pageData } = usePageStore();

  return (
    /* 이번 달 독서 리스트 */
    <section className="flex flex-col gap-4 overflow-hidden">

      {/* 책 리스트 */}
      <article className="flex-1 overflow-y-scroll">
        <ul className="flex flex-col gap-3">
          <li
            className="flex justify-between p-3.5 rounded-xl bg-readingListBg"
            onClick={() =>
              openModal('ModalTrackingPlan', {
                title: '로그아웃 하시겠어요?',
                cancelText: '닫기',
                confirmText: '로그아웃',
              })
            }
          >
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-end items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 left-1 w-5 bg-toggleReading rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font">독서중</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex justify-end items-center bg-toggleNoReadingBg py-0.5 px-2 rounded-full">
              <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
}