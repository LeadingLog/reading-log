import IconTriangle from "../../assets/Icon-triangle.svg?react";

export default function TimeLine() {

  return (
    <section className="flex flex-col gap-4 rounded-xl">
      <article className="flex justify-center items-center text-2xl bg-readingTime rounded-xl p-3.5">
        총 독서 시간 : <span>00:00:00</span>
      </article>
      <article className="flex justify-center items-center gap-16 border-borderColor_2 border-4 rounded-xl p-2">
        <span>2024</span>
        <button className="text-color_2 rotate-180"><IconTriangle /></button>
        <span className="text-2xl font-bold">2025</span>
        <button className="text-color_2"><IconTriangle /></button>
        <span>2025</span>
      </article>
      <button className="flex gap-2 justify-end items-center group">
        <span>2025</span>
        년 리딩로그 보러가기
        <span className="text-color_2 group-hover:text-hover_2" ><IconTriangle /></span>
      </button>
      <article>
        <div></div>
        <div></div>
        <div></div>
      </article>
    </section>
  );
}