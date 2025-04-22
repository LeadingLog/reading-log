import { usePageStore } from "../../store/pageStore.ts";
import YearSlideBar from "../common/YearSlideBar.tsx";
import StatsMonth from "./statsItems/StatsMonth.tsx";
import StatsYear from "./statsItems/StatsYear.tsx";

export default function StatsPage() {
  const { params } = usePageStore();  // StatsPage 파라미터 추출

  return (
    /* 통계 페이지 */
    <section className="flex flex-col gap-4 overflow-hidden">
      {/* 작년 이번년 내년 선택 슬라이드 */}
      <YearSlideBar />
      {/* 조건부 렌더링 */}
      {params.StatsPage?.tab === 'StatsYear' && <StatsYear />}
      {params.StatsPage?.tab === 'StatsMonth' && <StatsMonth />}
    </section>
  );
}
