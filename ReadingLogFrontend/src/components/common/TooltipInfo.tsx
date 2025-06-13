import { useTooltipStore } from "../../store/useTooltipStore.ts";

const TooltipInfo = () => {
  const { hoverContent, pageData } = useTooltipStore();
  if (!hoverContent) return
  return (
    <div className="absolute p-4 border rounded bg-gray-100 text-sm">
      <h2 className="font-bold mb-2">Tooltip 상태 보기</h2>
      <div>hoverContent: <strong>{hoverContent || '없음'}</strong></div>

      {pageData ? (
        <ul className="mt-2 list-disc pl-5">
          <li>bookId: {pageData.bookId}</li>
          <li>bookTitle: {pageData.bookTitle}</li>
          <li>bookStatus: {pageData.bookStatus}</li>
          <li>bookTime: {pageData.bookTime}분</li>
        </ul>
      ) : (
        <div className="text-gray-500 mt-2">pageData 없음</div>
      )}
    </div>
  );
};

export default TooltipInfo;