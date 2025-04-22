import IconTriangle from "../../assets/Icon-triangle.svg?react";

export default function YearSlideBar() {

  return (
    // 작년 이번년 내년 선택 슬라이드
    <article className="flex justify-center items-center gap-16 border-yearSlide_Border border-4 rounded-xl p-2">
      <span className="text-yearSlide_PrevNext_Text">2024</span>
      <button className="text-yearSlide_Icon hover:text-yearSlide_Icon_Hover rotate-180"><IconTriangle/></button>
      <span className="text-3xl text-yearSlide_ThisYear_Text font-bold">2025</span>
      <button className="text-yearSlide_Icon hover:text-yearSlide_Icon_Hover"><IconTriangle/></button>
      <span className="text-yearSlide_PrevNext_Text">2025</span>
    </article>
  );
}