import IconTriangle from "../../assets/Icon-triangle.svg?react";
import { useState } from "react";

export default function YearSlideBar() {

  /* 현재 날로 초기화 하기 용*/
  const today = new Date();
  const currentYear = today.getFullYear();

  const [year, setYear] = useState(currentYear)

  /* 이전 년도 */
  const prevYear = () => {
    setYear(prev => prev - 1)
  }
  /* 다음 년도 */
  const nextYear = () => {
    setYear(prev => prev + 1)
  }
  /* 현재 년도*/
  const nowYear = () => {
    setYear(today.getFullYear())
  }

  return (
    // 작년 이번년 내년 선택 슬라이드
    <article className="flex justify-center items-center gap-16 border-yearSlide_Border border-4 rounded-xl p-2">
      <div
        onClick={prevYear}
        className="flex flex-1 items-center cursor-pointer group h-full"
      >
        <span className="flex-1 text-right text-yearSlide_PrevNext_Text">{year - 1}</span>
        <button
          className="flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover rotate-180"><IconTriangle/></button>
      </div>
      <span
        onClick={nowYear}
        className="text-3xl items-center cursor-pointer h-full text-yearSlide_ThisYear_Text font-bold">{year}</span>
      <div
          onClick={nextYear}
          className="flex flex-1 items-center cursor-pointer group h-full"
      >
        <button
          className="flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover"><IconTriangle/></button>
        <span className="flex-1 text-left text-yearSlide_PrevNext_Text">{year + 1}</span>
      </div>
    </article>
  );
}