import { usePageStore } from "../../store/pageStore.ts";
import StatsMonth from "./statsItems/StatsMonth.tsx";
import StatsYear from "./statsItems/StatsYear.tsx";

export default function StatsPage() {
  const { params } = usePageStore();  // StatsPage 파라미터 추출

  return (
    /* 통계 페이지 */
    <section className="flex flex-1 flex-col gap-4 overflow-hidden">
      {/* 조건부 렌더링 */}
      {params.StatsPage?.tab === 'StatsYear' && <StatsYear/>}
      {params.StatsPage?.tab === 'StatsMonth' && <StatsMonth/>}
    </section>
  );
}
