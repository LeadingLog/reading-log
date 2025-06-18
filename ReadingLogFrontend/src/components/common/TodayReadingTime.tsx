import { useEffect, useState } from "react";
import { fetchTodayReadingTime } from "../../api/todayReadingTimeApi.ts";
import { fetchTodayReadingTimeApiParams } from "../../types/todayReadingTime.ts";
// import { usePageStore } from "../../store/pageStore.ts";
import { useUserStore } from "../../store/userStore.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";

export default function TodayReadingTime() {

  const { userId } = useUserStore()
  const today = new Date();

  const [todayReadingTimeHour, setTodayReadingTimeHour] = useState( 0 )
  const [todayReadingTimeMin, setTodayReadingTimeMin] = useState( 0 )
  const [todayReadingTimeSecond, setTodayReadingTimeSecond] = useState( 0 )

  const { triggers } = useGlobalChangeStore.getState();



  const searchTodayReadingTime = async (userId: fetchTodayReadingTimeApiParams) => {
    try {
      const response = await fetchTodayReadingTime( userId )
      const responseTime = response.data.todayTime

      /* 오늘 독서 시간 */
      const hour = Math.floor( responseTime / 3600 );
      const min = Math.floor( (responseTime % 3600) / 60 );
      const second = Math.floor( responseTime % 60 );

      setTodayReadingTimeHour( hour )
      setTodayReadingTimeMin( min )
      setTodayReadingTimeSecond( second )

    } catch (error) {
      console.error( "오늘 독서 시간 못 가져옴", error )
    } finally {
      //
    }
  }

  useEffect( () => {
    searchTodayReadingTime( { userId } )
  }, [triggers.TimeSave] );

  return (
    <span className="relative flex items-end pr-2 text-sm">
      <span className="absolute -top-2 right-2">오늘 날짜 : {today.toISOString().split( "T" )[0]}</span>
      <span
        className="-mb-1">오늘 독서 시간 : {String( todayReadingTimeHour ).padStart( 2, '0' )}시간 {String( todayReadingTimeMin ).padStart( 2, '0' )}분 {String( todayReadingTimeSecond ).padStart( 2, '0' )}초
      </span>
    </span>
  )
}