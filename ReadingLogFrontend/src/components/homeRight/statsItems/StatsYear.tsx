import { useEffect, useRef, useState } from "react";
import YearSlideBar from "../../common/YearSlideBar.tsx";
import { fetchStatsYearApiParams, StatsYearList } from "../../../types/statsYear.ts";
import { fetchStatsYearApi } from "../../../api/statsYearApi.ts";
import { useDateStore } from "../../../store/useDateStore.ts";
import { useUserStore } from "../../../store/userStore.ts";

export default function StatsYear() {

  const { year } = useDateStore();
  const { userId } = useUserStore();


  /* 통계 정보 */

  const [totalCompleteBookCount, setTotalCompleteBookCount] = useState<number>( 0 )
  const [totalReadingTimeHour, setTotalReadingTimeHour] = useState<number>( 0 )
  const [totalReadingTimeMin, setTotalReadingTimeMin] = useState<number>( 0 )
  const [totalReadingTimeSec, setTotalReadingTimeSec] = useState<number>( 0 )

  const [isLoading, setIsLoading] = useState( false );

  /* 그래프 정보 */
  const monthList: number[] = Array.from( { length: 12 }, (_, i) => i + 1 );
  const [bookGraphList, setBookGraphList] = useState<StatsYearList[]>( [] )

  const searchStatsYear = async ({ userId, year }: fetchStatsYearApiParams) => {
    setIsLoading( true )
    try {
      const response = await fetchStatsYearApi( { userId, year } )

      const data = response.data.data

      if (data) {
        /* 독서 시간 */
        const totalReadingTime = data.totalReadingTime

        const ReadingTimeHour = Math.floor( totalReadingTime / 3600 )
        const ReadingTimeMin = Math.floor( (totalReadingTime % 3600) / 60 );
        const ReadingTimeSec = Math.floor( totalReadingTime % 60 );
        setTotalReadingTimeHour( ReadingTimeHour )
        setTotalReadingTimeMin( ReadingTimeMin )
        setTotalReadingTimeSec( ReadingTimeSec )
        /* 총 완독 권수 */
        const completeCount = data.monthlyReadingList.reduce( (arr: number, cur: StatsYearList) => arr + cur.complete, 0 )
        setTotalCompleteBookCount( completeCount )

        const maxCompleteCount = Math.max( ...data.monthlyReadingList.map( (data: StatsYearList) => data.complete ) )
        const updatedList = data.monthlyReadingList.map( (item: StatsYearList) => ({
          ...item,
          height: parseFloat( (item.complete / maxCompleteCount).toFixed( 2 ) )
        }) );
        setBookGraphList( updatedList )
      } else {
        console.error( "연별 통계 데이터 가져오기 성공 하지만 데이터가 없음", response )
      }
    } catch (error) {
      console.error( "연별 통계 데이터 가져오기 실패", error )
    } finally {
      setIsLoading( false )
    }
  }

  useEffect( () => {
    searchStatsYear( { userId, year } )
  }, [year] );


  /* 그래프 선 위치 계산*/

  const containerRef = useRef<HTMLUListElement>( null );

  const [points, setPoints] = useState<{ x: number; y: number }[]>( [] );

  useEffect( () => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const getNewPoints = () => {
      const circles = container.querySelectorAll( '.month-circle' );
      const newPoints: { x: number; y: number }[] = [];

      const containerRect = container.getBoundingClientRect();
      circles.forEach( (circle) => {
        const rect = circle.getBoundingClientRect();
        newPoints.push( {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        } );
      } );

      setPoints( (prev) => {
        const isSame =
          prev.length === newPoints.length &&
          prev.every( (p, i) => p.x === newPoints[i].x && p.y === newPoints[i].y );
        return isSame ? prev : newPoints;
      } );
    };

    getNewPoints(); // 초기 위치 계산

    // 관찰자 등록
    const resizeObserver = new ResizeObserver( getNewPoints );
    const mutationObserver = new MutationObserver( getNewPoints );

    const circles = container.querySelectorAll( '.month-circle' );
    circles.forEach( (circle) => resizeObserver.observe( circle ) );
    resizeObserver.observe( container );

    mutationObserver.observe( container, {
      attributes: true,
      childList: true,
      subtree: true,
    } );

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener( 'scroll', getNewPoints, true );
    };
  }, [bookGraphList, year] );

  return (
    <section className="flex flex-1 flex-col gap-4 overflow-hidden">
      <YearSlideBar/>
      <article className="flex flex-col text-center">
        <span className="text-2xl font-semibold text-stats_Info_Text">
          {year}년에
          <span className="text-stats_Info_Text_Highlight"> 총 {totalCompleteBookCount}권 </span>
          의 책을 읽었어요
        </span>
        <span className="text-2xl font-semibold text-stats_Info_Text">
          월 평균
          <span className="text-stats_Info_Text_Highlight"> {Math.floor( totalCompleteBookCount / 12 )}권 </span>
          의 책을 읽었어요
        </span>
        <span className="text-2xl font-semibold text-stats_Info_Text">
          {year}년도는
          <span
            className="text-stats_Info_Text_Highlight"> {totalReadingTimeHour}시간 {totalReadingTimeMin}분 {totalReadingTimeSec}초 </span>
          이나 책을 읽으셨어요!
        </span>
      </article>
      <article className="flex gap-1 items-center justify-end text-sm pr-2 text-stats_Info_Text_Notice">
        <span
          className="month-circle w-5 aspect-square bg-stats_Year_Graph_MonthItem_Circle border-[5px] border-stats_Year_Graph_MonthItem_Circle_Border rounded-full"></span>
        <span> : 완독 도서 수 (권)</span>
      </article>
      <article className="relative flex flex-col flex-1 gap-2">
        {/* 월별 그래프 연결 선 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {points.map( (point, i) =>
            i < points.length - 1 ? (
              <line
                key={i}
                x1={point.x}
                y1={point.y}
                x2={points[i + 1].x}
                y2={points[i + 1].y}
                stroke="#E5CEC8"
                strokeWidth="6"
              />
            ) : null
          )}
        </svg>
        {/* 월별 도서 수 표시  */}
        <ul
          ref={containerRef}
          className="flex flex-1 items-end justify-between"
        >
          {isLoading ? (
            <li
              className={`relative h-[90%] font-bold flex flex-col flex-1 justify-center items-center gap-4 text-xl text-stats_Info_Text`}>
              <span
                className="w-10 h-10 border-8 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
              <span>연별 통계 그래프 정보를 가져 오는 중입니다.</span>
            </li>
          ) : (
            bookGraphList.map( (item) =>
              <li
                key={item.month}
                className={`relative h-[90%] flex flex-1 justify-center`}
              >
                <span
                  className="absolute transition-[bottom] bottom-0 month-circle w-5 aspect-square bg-stats_Year_Graph_MonthItem_Circle border-[5px] border-stats_Year_Graph_MonthItem_Circle_Border rounded-full"
                  style={{ bottom: `${item.height * 100}%` }}
                >
                  <span
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-[150%] text-stats_Year_Graph_Month_Text text-xl font-semibold bg-stats_Month_Graph_Icon_Color px-1 rounded-full"
                  >
                    {item.complete}
                  </span>

                </span>
              </li>
            ))
          }
        </ul>

        {/* 그래프 월 표시 */}
        <ul

          className="after:content-[''] after:h-1.5 after:top-0 after:w-[92%] after:left-1/2 after:transform after:-translate-x-1/2 after:absolute after:bg-stats_Year_Graph_Bottom_Border
          relative flex justify-between pt-4"
        >
          {monthList.map( (month, i) =>
            <li
              key={i}
              className="relative flex flex-1 justify-center"
            >
              <span
                className="absolute w-1.5 h-4 -top-4 left-1/2 transform -translate-x-1/2 bg-stats_Year_Graph_Bottom_Border"></span>
              <span
                className="text-stats_Year_Graph_Month_Text text-xl font-semibold">{String( month ).padStart( 2, '0' )}</span>
            </li>
          )}
        </ul>
      </article>
    </section>
  )
}