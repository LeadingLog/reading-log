import { useTooltipStore } from "../../store/useTooltipStore.ts";
import { useState, useEffect } from "react";

const TooltipInfo = () => {
  const { hoverContent, pageData, mouseX, mouseY } = useTooltipStore();

  const [monthlyTimeHour, setMonthlyTimeHour] = useState<number>(0);
  const [monthlyTimeMin, setMonthlyTimeMin] = useState<number>(0);
  const [monthlyTimeSec, setMonthlyTimeSec] = useState<number>(0);

  // ✅ 렌더링 이후에 bookTime이 변할 때만 상태 업데이트
  useEffect(() => {
    if (pageData?.bookTime) {
      setMonthlyTimeHour(Math.floor(pageData.bookTime / 3600));
      setMonthlyTimeMin(Math.floor((pageData.bookTime % 3600) / 60));
      setMonthlyTimeSec(Math.floor(pageData.bookTime % 60));
    }
  }, [pageData?.bookTime]); // ✅ 의존성 배열

  if (!hoverContent) return null;

  return (
    <>
      {hoverContent === "StatsMonthBookTimeGraph" ? (
        <div
          className={`
          ${pageData?.bookStatus === "IN_PROGRESS" && "border-tooltip_border_Reading"}
          ${pageData?.bookStatus === "COMPLETED" && "border-tooltip_border_Complete"}
          ${pageData?.bookStatus === "NOT_STARTED" && "border-tooltip_border_No_Reading"}
          fixed z-10 p-3 border-4 border-tooltip_border rounded-lg bg-gray-100 text-sm bg-tooltip_bg`}
          style={{ top: mouseY, left: mouseX ,transform: 'translateX(-100%)', pointerEvents: 'none',}}
        >
          {pageData ? (
            <ul className="max-w-64 min-w-[150px]">
              <li>{pageData.bookTitle}</li>
              <li>
                독서상태: {pageData.bookStatus === "IN_PROGRESS" ? "독서중" : pageData.bookStatus === "COMPLETED" ? "완독" : "읽기전"}
              </li>
              <li>독서시간: {String( monthlyTimeHour ).padStart( 2, '0' )}:{String( monthlyTimeMin ).padStart( 2, '0' )}:{String( monthlyTimeSec ).padStart( 2, '0' )}</li>
            </ul>
          ) : (
            <div className="text-gray-500 mt-2">pageData 없음</div>
          )}
        </div>
      ) : (
        <div>아직 없음</div>
      )}
    </>
  );
};

export default TooltipInfo;
