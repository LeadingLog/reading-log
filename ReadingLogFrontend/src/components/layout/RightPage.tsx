import TimeTracking from "../homeRight/TimeTracking.tsx";
import StatsPage from "../homeRight/StatsPage.tsx";
import { usePageStore } from "../../store/pageStore.ts";


export default function RightPage() {

  const { rightContent, pageData } = usePageStore();

  return (
    /* 오른쪽 페이지 */
    <section className="flex flex-col flex-1 overflow-hidden gap-4 h-full bg-pageBg rounded-xl p-7">
      {/* 현재 페이지 타이틀 */}
      <span className="flex relative text-xl font-bold">
        <p className="absolute top-0 bottom-0 left-0 w-1.5 h-full bg-titleMarker"></p>
        <span className="pl-2.5">
          {pageData.title || '이번 달 독서 리스트'}
        </span>
      </span>
      {/* 조건부 렌더링 */}
      {rightContent === 'TimeTracking' && <TimeTracking />}
      {rightContent === 'StatsPage' && <StatsPage />}
    </section>
  );
}