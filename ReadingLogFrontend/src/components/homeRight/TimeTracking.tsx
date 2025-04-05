import BoxThisMonthReadingList from "./timeTrackingContainer/BoxThisMonthReadingList.tsx";
import BoxTimer from "./timeTrackingContainer/BoxTimer.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import BoxStopWatch from "./timeTrackingContainer/BoxStopWatch.tsx";

export default function TimeTracking() {

  const {params} = usePageStore();

  return (
    <section className="flex flex-1 flex-col justify-start overflow-hidden">
      {/* 스탑워치 표시 */}
      {params.TimeTracking?.tab === "StopWatch" && (
        <BoxStopWatch/>
      )}
      {/* 타이머 표시 */}
      {params.TimeTracking?.tab === "Timer" && (
        <BoxTimer/>
      )}
      <BoxThisMonthReadingList/>
    </section>


  )
}