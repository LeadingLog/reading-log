// import StatsMonth from "./StatsMonth.tsx";
export default function StatsYear() {
  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <article className="flex flex-col text-center">
        <span className="text-2xl font-semibold text-stats_Info_Text">
          이번년도에
          <span className="text-stats_Info_Text_Highlight">총 32권</span>
          의 책을 읽었어요
        </span>
        <span className="text-2xl font-semibold text-stats_Info_Text">
          월 평균
          <span className="text-stats_Info_Text_Highlight">5권</span>
          의 책을 읽었어요
        </span>
        <span className="text-2xl font-semibold text-stats_Info_Text">
          이번 년도는
          <span className="text-stats_Info_Text_Highlight">72시간 15분</span>
          이나 책을 읽으셨어요!
        </span>
      </article>
    </section>
  )
}