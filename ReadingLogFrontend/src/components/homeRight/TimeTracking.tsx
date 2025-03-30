import ThisMonthReadingList from "./ThisMonthReadingList.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import Timer from "./timeTrackingType/Timer.tsx";
import StopWatch from "./timeTrackingType/StopWatch.tsx";

export default function TimeTracking() {

  const { params } = usePageStore();

  return (
    /* 독서 타임 트랙킹 */
    <section className="flex flex-col gap-4 overflow-hidden">
      {/* 조건부 렌더링 */}
      {params.TimeTracking?.tab === 'StopWatch' && <StopWatch />}
      {params.TimeTracking?.tab === 'Timer' && <Timer />}
      <ThisMonthReadingList/>
    </section>
  )
}