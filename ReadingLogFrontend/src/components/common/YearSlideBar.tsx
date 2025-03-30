import IconTriangle from "../../assets/Icon-triangle.svg?react";

export default function YearSlideBar() {

  return (
    // 작년 이번년 내년 선택 슬라이드
    <article className="flex justify-center items-center gap-16 border-yearSlideBorder border-4 rounded-xl p-2">
      <span className="text-yearSlidePrevNextText">2024</span>
      <button className="text-yearSlideIcon hover:text-yearSlideIconHover rotate-180"><IconTriangle/></button>
      <span className="text-3xl text-yearSlideThisYearText font-bold">2025</span>
      <button className="text-yearSlideIcon hover:text-yearSlideIconHover"><IconTriangle/></button>
      <span className="text-yearSlidePrevNextText">2025</span>
    </article>
  );
}