import IconReading from "../../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../../assets/Icon-readcomplete.svg?react"
import MonthBookImgList from "../../common/MonthBookImgList.tsx";
import CustomScrollbar from "../../common/CustomScrollbar.tsx";
import MonthSlideBar from "../../common/MonthSlideBar.tsx"
import { useEffect, useState } from "react";
import { fetchStatsMonthApi } from "../../../api/statsMonthApi.ts";
import { fetchStatsMonthApiParams, StatsMonthList } from "../../../types/statsMonth.ts";
import { useDateStore } from "../../../store/useDateStore.ts";

export default function StatsMonth() {

  const { year, month } = useDateStore();

  const searchStatsMonthList = async ({ userId, year, month }: fetchStatsMonthApiParams) => {
    try {

      const response = await fetchStatsMonthApi({ userId, year, month })
      const data = response.data

      const todaySeconds = data.todayReadingTime;
      const monthlyBookTime = data.monthlyReadingList.reduce((acc: number, cur: StatsMonthList) => acc + cur.bookTime, 0);

      const [todayHour, todayMin] = chageTime(todaySeconds)
      const [monthlyHour, monthlyMin] = chageTime(monthlyBookTime)

      /* 오늘 독서 시간*/
      setTodayReadingTimeHour(todayHour)
      setTodayReadingTimeMin(todayMin)

      /* 이번 달 독서 시간 */
      setMonthlyTimeHour(monthlyHour)
      setMonthlyTimeMin(monthlyMin)

    } catch (error) {
      setTodayReadingTimeHour(99)
      setTodayReadingTimeMin(99)
      console.error("독서 시간을 가져오지 못함", error)
    } finally {
      // setIsLoading(false);
    }
  }

  /* 오늘 독서 시간 */
  const [todayReadingTimeHour, setTodayReadingTimeHour] = useState(0)
  const [todayReadingTimeMin, setTodayReadingTimeMin] = useState(0)

  /* 현재 달 독서 시간 */
  const [monthlyTimeHour, setMonthlyTimeHour] = useState<number>(0)
  const [monthlyTimeMin, setMonthlyTimeMin] = useState<number>(0)

  /* 초값 시간 정보로 변경 */
  const chageTime = (responseTime : number) => {
    const hour = Math.floor(responseTime / 3600);
    const min = Math.floor((responseTime % 3600) / 60);

    return [hour, min]
  }

  useEffect(() => {
    searchStatsMonthList({ userId: 1, year, month })
  }, [year, month]);

  return (
    /* 월별 통계  */
    <section className="flex flex-col gap-4 overflow-hidden">
      <MonthSlideBar/>
      <article className="flex flex-col text-center">
          <span className="text-2xl font-semibold text-stats_Info_Text">
            오늘
            <span className="text-stats_Info_Text_Highlight"> {todayReadingTimeHour}시간 {todayReadingTimeMin}분</span> 동안 책을 읽으셨어요</span>
        <span className="text-2xl font-semibold text-stats_Info_Text">
          <span>{String(month).padStart(2, '0')}월</span>에는
          <span className="text-stats_Info_Text_Highlight"> 총 {monthlyTimeHour}시간 {monthlyTimeMin}분</span> 책을 읽었어요</span>
      </article>
      {/* 독서 현황 시각화 그래프 영역 */}
      <CustomScrollbar
        direction="horizontal"
        containerClassName="flex content-start flex-1 border-b-4 border-stats_Month_Graph_Bottom_Border"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color bottom-0.5"
        // scrollbarWidth=""
      >
        <li
          className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Reading_Icon_Bg rounded-full aspect-square"><IconReading
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[80%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[30%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[20%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>
        <li
          className="h-[50%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg">
          <span
            className="flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center bg-stats_Month_Graph_Complete_Icon_Bg rounded-full aspect-square"><IconReadComplete
            width="100%" height="100%"/></span>
          <span className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">책이름 이름이름 이름이름 이름</span>
        </li>

      </CustomScrollbar>
      {/* 책 썸네일 아이콘 리스트 */}
      <CustomScrollbar
        containerClassName="grid grid-cols-3 gap-6 content-start flex-1"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
        // scrollbarWidth=""
      >
        <MonthBookImgList/>
      </CustomScrollbar>
    </section>
  )
}