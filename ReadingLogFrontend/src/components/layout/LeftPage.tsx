import TimeLine from "../homeLeft/TimeLine.tsx";

export default function LeftPage() {
  return (
    <section className="flex flex-col flex-1 gap-4 h-full bg-pageBg rounded-xl p-7">
      {/* 탭 영역 */}
      <ul className="flex text-base pb-2 border-b-2 border-borderColor_3">
        <li className="flex justify-center flex-1">타임라인</li>
        <li className="flex justify-center flex-1">내 독서 목록</li>
        <li className="flex justify-center flex-1">관심 도서</li>
      </ul>
      <TimeLine />
    </section>
  );
}
