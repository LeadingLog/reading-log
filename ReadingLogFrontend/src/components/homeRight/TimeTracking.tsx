import ThisMonthReadingList from "./timeTrackingItem/ThisMonthReadingList.tsx";
import Timer from "./timeTrackingItem/Timer.tsx";
import StopWatch from "./timeTrackingItem/StopWatch.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import { AnimatePresence, motion } from "framer-motion";

export default function TimeTracking() {

  const {params} = usePageStore();

  return (
    <section className="flex flex-col justify-start overflow-hidden">
      {/* 스탑워치 표시 */}
      <AnimatePresence mode="wait">
        {params.TimeTracking?.tab === "StopWatch" && (
          <motion.div
            key="stopWatch"
            initial={{ y: "-100%" }} // 위에서 시작
            animate={{ y: 0 }} // 제자리로 내려옴
            transition={{
              y: { duration: 0.5, ease: "easeOut" },
            }}
            className="flex flex-col"
          >
            <StopWatch />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 타이머 표시 */}
      <AnimatePresence mode="wait">
        {params.TimeTracking?.tab === "Timer" && (
          <motion.div
            key="timer"
            initial={{ y: "-100%" }} // 위에서 시작
            animate={{ y: 0 }} // 제자리로 내려옴
            transition={{
              y: { duration: 0.5, ease: "easeOut" },
            }}
            className="flex flex-col"
          >
            <Timer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 아래 요소도 부드럽게 위치 변경 */}
      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ThisMonthReadingList />
      </motion.div>
    </section>


  )
}