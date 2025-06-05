import IconTriangle from "../../assets/Icon-triangle.svg?react";
import { useDateStore } from "../../store/useDateStore.ts";

export default function YearSlideBar() {
  const { year, setYear, decreaseYear, increaseYear } = useDateStore();

  /* 현재 년도 */
  const nowYear = () => {
    const currentYear = new Date().getFullYear();
    setYear( currentYear );
  };

  return (
    <article className="flex justify-center items-center gap-16 border-yearSlide_Border border-4 rounded-xl p-2">
      <div
        onClick={decreaseYear}
        className="flex flex-1 items-center cursor-pointer group h-full"
      >
        <span className="flex-1 text-right text-yearSlide_PrevNext_Text">
          {year - 1}
        </span>
        <button className="flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover rotate-180">
          <IconTriangle/>
        </button>
      </div>

      <span
        onClick={nowYear}
        className="text-3xl items-center cursor-pointer h-full text-yearSlide_ThisYear_Text font-bold"
      >
        {year}
      </span>

      <div
        onClick={increaseYear}
        className="flex flex-1 items-center cursor-pointer group h-full"
      >
        <button className="flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </button>
        <span className="flex-1 text-left text-yearSlide_PrevNext_Text">
          {year + 1}
        </span>
      </div>
    </article>
  );
}
