import { useEffect, useState } from "react";
import { fetchTodayReadingTime } from "../../api/todayReadingTimeApi.ts";
import { fetchTodayReadingTimeApiParams } from "../../types/todayReadingTime.ts";
import { usePageStore } from "../../store/pageStore.ts";
import { useDateStore } from "../../store/useDateStore.ts";

export default function TodayReadingTime() {

  const { params } = usePageStore()
  const { year, month, day } = useDateStore()

  const [todayReadingTimeHour, setTodayReadingTimeHour] = useState(0)
  const [todayReadingTimeMin, setTodayReadingTimeMin] = useState(0)

  const searchTodayReadingTime = async ({ userId } : fetchTodayReadingTimeApiParams) => {
    try {
      const response = await fetchTodayReadingTime(userId)

      const responseTime = response.data

      /* 오늘 독서 시간 */
      const hour = Math.floor(responseTime / 3600);
      const min = Math.floor((responseTime % 3600) / 60);

      setTodayReadingTimeHour(hour)
      setTodayReadingTimeMin(min)

    } catch (error) {
      console.error("오늘 독서 시간 못 가져옴", error)
    } finally {
      //
    }
  }

  useEffect(() => {
    searchTodayReadingTime({userId: 1})
  }, [params]);

  return (
    <span className="relative flex items-end pr-2 text-sm">
      <span className="absolute -top-2 right-2">오늘 날짜 : {year}-{String(month).padStart(2, '0')}-{day}</span>
      <span className="-mb-1">오늘 독서 시간 : {String(todayReadingTimeHour).padStart(2, '0')}시간 {String(todayReadingTimeMin).padStart(2, '0')}분<span></span></span>
    </span>
  )
}