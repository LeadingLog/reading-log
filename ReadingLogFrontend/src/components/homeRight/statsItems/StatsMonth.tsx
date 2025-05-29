import IconReading from "../../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../../assets/Icon-readcomplete.svg?react"
import BookImgList from "../../common/BookImgList.tsx";
import { usePageStore } from "../../../store/pageStore.ts";
import CustomScrollbar from "../../common/CustomScrollbar.tsx";
import MonthSlideBar from "../../common/MonthSlideBar.tsx"

export default function StatsMonth() {

  const isActive = 0

  const { pageData } = usePageStore();

  return (
    /* 월별 통계  */
    <section className="flex flex-col gap-4 overflow-hidden">
      <MonthSlideBar/>
      <article className="flex flex-col text-center">
          <span className="text-2xl font-semibold text-stats_Info_Text">오늘 <span
            className="text-stats_Info_Text_Highlight">1시간 11분</span> 동안 책을 읽으셨어요</span>
        <span className="text-2xl font-semibold text-stats_Info_Text"><span>{(pageData.title ?? '').slice(17)}</span>에는 <span className="text-stats_Info_Text_Highlight">총 14시간 34분</span> 책을 읽었어요</span>
      </article>
      {/* 독서 현황 시각화 그래프 영역 */}
      <CustomScrollbar
        direction="horizontal"
        containerClassName="flex content-start flex-1 border-b-4 border-stats_Month_Graph_Bottom_Border"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color bottom-0.5"
        // scrollbarWidth=""
      >
        <li className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[30%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[20%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>

      </CustomScrollbar>
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