import IconTriangle from "../../assets/Icon-triangle.svg?react";
import { useDateStore } from "../../store/useDateStore.ts";

export default function YearSlideBar() {
  const { year, decreaseYear, increaseYear, today } = useDateStore();

  return (
    <article className="flex justify-center items-center gap-16 border-yearSlide_Border border-4 rounded-xl p-2">
      <div
        onClick={decreaseYear}
        className="group flex flex-1 items-center cursor-pointer group h-full"
      >
        <span className="group-hover:text-black flex-1 text-right text-yearSlide_PrevNext_Text">
          {year - 1}
        </span>
        <button
          className="group-active:translate-x-[-3%] duration-100 flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover rotate-180">
          <IconTriangle/>
        </button>
      </div>

      <span
        onClick={today}
        className="hover:brightness-95 text-3xl items-center cursor-pointer h-full text-yearSlide_ThisYear_Text font-bold"
      >
        {year}
      </span>

      <div
        onClick={increaseYear}
        className="group flex flex-1 items-center cursor-pointer group h-full"
      >
        <button
          className="group-active:translate-x-[3%] duration-100 flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </button>
        <span className="group-hover:text-black flex-1 text-left text-yearSlide_PrevNext_Text">
          {year + 1}
        </span>
      </div>
    </article>
  );
}
