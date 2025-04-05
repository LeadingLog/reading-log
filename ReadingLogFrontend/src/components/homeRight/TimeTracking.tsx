import BoxThisMonthReadingList from "./timeTrackingContainer/BoxThisMonthReadingList.tsx";
import BoxTimer from "./timeTrackingContainer/BoxTimer.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import { AnimatePresence, motion } from "framer-motion";
import BoxStopWatch from "./timeTrackingContainer/BoxStopWatch.tsx";

export default function TimeTracking() {

  const {params} = usePageStore();

  return (
    <section className="flex flex-1 flex-col justify-start overflow-hidden">
      {/* 스탑워치 표시 */}
      <AnimatePresence mode="wait">
        {params.TimeTracking?.tab === "StopWatch" && (
          <motion.section
            key="stopwatch"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col justify-end overflow-hidden"
          >
            <BoxStopWatch />
          </motion.section>
        )}
      </AnimatePresence>
      {/* 타이머 표시 */}
      <AnimatePresence mode="wait">
        {params.TimeTracking?.tab === "Timer" && (
          <motion.section
            key="timer"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col justify-end overflow-hidden"
          >
            <BoxTimer />
          </motion.section>
        )}
      </AnimatePresence>
      <BoxThisMonthReadingList/>
    </section>


  )
}