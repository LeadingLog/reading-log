import IconReading from "../../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../../assets/Icon-readcomplete.svg?react"
import MonthBookImgList from "../../common/MonthBookImgList.tsx";
import CustomScrollbar from "../../common/CustomScrollbar.tsx";
import MonthSlideBar from "../../common/MonthSlideBar.tsx"
import { useEffect, useState } from "react";
import { fetchStatsMonthApi } from "../../../api/statsMonthApi.ts";
import { fetchStatsMonthApiParams, StatsMonthList } from "../../../types/statsMonth.ts";
import { useDateStore } from "../../../store/useDateStore.ts";
import { useUserStore } from "../../../store/userStore.ts";
import { useGlobalChangeStore } from "../../../store/useGlobalChangeStore.ts";

export default function StatsMonth() {

  const { year, month } = useDateStore();
  const { userId } = useUserStore()
  const [bookGraphList, setBookGraphList] = useState<StatsMonthList[]>( [] )

  const myReadingListTrigger = useGlobalChangeStore((state) => state.triggers.MyReadingList);

  const searchStatsMonthList = async ({ userId, year, month }: fetchStatsMonthApiParams) => {
    try {

      const response = await fetchStatsMonthApi( { userId, year, month } )
      const data = response.data

      /* 도서 그래프 */
      /* 그래프 높이 조절하기 위해 가장 긴 시간을 기준을 최대 높이로 정함 */
      const maxTime = Math.max( ...data.monthlyReadingList.map( (item: StatsMonthList) => item.bookTime ) );
      const updatedList = data.monthlyReadingList.map( (item: StatsMonthList) => ({
        ...item,
        bookTime: parseFloat( (item.bookTime / maxTime).toFixed( 2 ) )
      }) );
      setBookGraphList( updatedList )

      /* 이번 달 총 독서 시간  */
      const totalMonthlyBookTime = data.monthlyReadingList.reduce( (acc: number, cur: StatsMonthList) => acc + cur.bookTime, 0 );

      const [monthlyHour, monthlyMin, monthlySec] = changeTime( totalMonthlyBookTime )

      /* 이번 달 독서 시간 */
      setMonthlyTimeHour( monthlyHour )
      setMonthlyTimeMin( monthlyMin )
      setMonthlyTimeSec( monthlySec )

    } catch (error) {
      console.error( "독서 시간을 가져오지 못함", error )
    } finally {
      // setIsLoading(false);
    }
  }

  /* 현재 달 독서 시간 */
  const [monthlyTimeHour, setMonthlyTimeHour] = useState<number>( 0 )
  const [monthlyTimeMin, setMonthlyTimeMin] = useState<number>( 0 )
  const [monthlyTimeSec, setMonthlyTimeSec] = useState<number>( 0 )

  /* 초값 시간 정보로 변경 */
  const changeTime = (responseTime: number) => {
    const hour = Math.floor( responseTime / 3600 );
    const min = Math.floor( (responseTime % 3600) / 60 );
    const second = Math.floor( responseTime % 60 );

    return [hour, min, second]
  }

  useEffect( () => {
    searchStatsMonthList( { userId, year, month } )
  }, [year, month, myReadingListTrigger] );

  return (
    /* 월별 통계  */
    <section className="flex flex-1 flex-col gap-4 overflow-hidden">
      <MonthSlideBar/>
      <article className="flex flex-col text-center">
        <span className="text-2xl font-semibold text-stats_Info_Text">
          <span>{String( month ).padStart( 2, '0' )}월</span>에는
          <span
            className="text-stats_Info_Text_Highlight"> 총 {monthlyTimeHour}시간 {monthlyTimeMin}분 {monthlyTimeSec}초</span> 책을 읽었어요</span>
      </article>
      {/* 독서 현황 시각화 그래프 영역 */}
      <CustomScrollbar
        direction="horizontal"
        containerClassName="flex content-start flex-1 border-b-4 border-stats_Month_Graph_Bottom_Border"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color bottom-0.5"
        // scrollbarWidth=""
      >
        {bookGraphList.map( (item, idx) => (
            <li
              key={idx}
              className={`h-[40%] flex flex-col self-end gap-1 px-1 pt-1 border-t-2 border-x-2 -mr-0.5 border-stats_Month_Graph_Book_Border bg-stats_Month_Graph_Book_Bg`}
              style={{ height: `${item.bookTime * 100}%` }}
            >
              <span
                className={`
                ${item.bookStatus === "NOT_STARTED" && 'bg-stats_Month_Graph_NoRead_Icon_Bg'}
                ${item.bookStatus === "IN_PROGRESS" && 'bg-stats_Month_Graph_Reading_Icon_Bg'}
                ${item.bookStatus === "COMPLETED" && 'bg-stats_Month_Graph_Complete_Icon_Bg'}
                flex justify-center items-center w-6 p-[5px] text-stats_Month_Graph_Icon_Color self-center rounded-full aspect-square`}>
                {item.bookStatus === "IN_PROGRESS" && <IconReading width="100%" height="100%"/>}
                {item.bookStatus === "COMPLETED" && <IconReadComplete width="100%" height="100%"/>}
              </span>
              <span
                className="self-center text-nowrap overflow-hidden text-ellipsis break-all [writing-mode:vertical-rl]">{item.bookTitle}</span>
            </li>
          )
        )}
      </CustomScrollbar>
      {/* 책 썸네일 아이콘 리스트 */}
      <CustomScrollbar
        containerClassName="grid grid-cols-3 gap-6 flex-1"
        scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
        // scrollbarWidth=""
      >
        <MonthBookImgList/>
      </CustomScrollbar>
    </section>
  )
}