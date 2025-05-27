import { useEffect, useRef, useState } from "react";

export default function StatsYear() {

  const monthList: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  const containerRef = useRef<HTMLUListElement>(null);

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const getNewPoints = () => {
      const circles = container.querySelectorAll('.month-circle');
      const newPoints: { x: number; y: number }[] = [];

      const containerRect = container.getBoundingClientRect();
      circles.forEach((circle) => {
        const rect = circle.getBoundingClientRect();
        newPoints.push({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      });

      setPoints((prev) => {
        const isSame =
          prev.length === newPoints.length &&
          prev.every((p, i) => p.x === newPoints[i].x && p.y === newPoints[i].y);
        return isSame ? prev : newPoints;
      });
    };

    getNewPoints(); // 초기 위치 계산

    // 관찰자 등록
    const resizeObserver = new ResizeObserver(getNewPoints);
    const mutationObserver = new MutationObserver(getNewPoints);

    const circles = container.querySelectorAll('.month-circle');
    circles.forEach((circle) => resizeObserver.observe(circle));
    resizeObserver.observe(container);

    mutationObserver.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', getNewPoints, true);
    };
  }, [monthList]);

  console.log(points)

  return (
    <section className="flex flex-1 flex-col gap-4 overflow-hidden">
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
      <article className="relative flex flex-col flex-1 gap-2">
        {/* 월별 그래프 연결 선 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {points.map((point, i) =>
            i < points.length - 1 ? (
              <line
                key={i}
                x1={point.x}
                y1={point.y}
                x2={points[i + 1].x}
                y2={points[i + 1].y}
                stroke="#E5CEC8"
                strokeWidth="6"
              />
            ) : null
          )}
        </svg>
        {/* 월별 도서 수 표시  */}
        <ul
          ref={containerRef}
          className="flex flex-1 items-end justify-between"
        >
          {monthList.map((_, i) =>
            <li
              key={i}
              className={`${i===2 ? "pb-24" : ''} relative flex flex-1 justify-center`}
            >
              <span className="month-circle w-5 aspect-square bg-stats_Year_Graph_MonthItem_Circle border-[5px] border-stats_Year_Graph_MonthItem_Circle_Border rounded-full"></span>
              <span className="absolute bottom-full text-stats_Year_Graph_Month_Text text-xl font-semibold">0</span>
            </li>
          )}
        </ul>

        {/* 그래프 월 표시 */}
        <ul

          className="after:content-[''] after:h-1.5 after:top-0 after:w-[92%] after:left-1/2 after:transform after:-translate-x-1/2 after:absolute after:bg-stats_Year_Graph_Bottom_Border
          relative flex justify-between pt-4"
        >
          {monthList.map((month, i) =>
            <li
              key={i}
              className="relative flex flex-1 justify-center"
            >
              <span className="absolute w-1.5 h-4 -top-4 left-1/2 transform -translate-x-1/2 bg-stats_Year_Graph_Bottom_Border"></span>
              <span className="text-stats_Year_Graph_Month_Text text-xl font-semibold">{String(month).padStart(2, '0')}</span>
            </li>
          )}
        </ul>
      </article>
    </section>
  )
}