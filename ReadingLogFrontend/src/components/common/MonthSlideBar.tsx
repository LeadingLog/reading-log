import IconTriangle from "../../assets/Icon-triangle.svg?react";
import { useDateStore } from "../../store/useDateStore.ts";

export default function YearSlideBar() {
  const { month, year, setMonth, setYear, decreaseMonth, increaseMonth } = useDateStore();

  /* 현재 년도 */
  const nowYear = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    setYear( currentYear );
    setMonth( currentMonth )
  };

  /* 선택 월 이전 이후 월 표시용 */
  const getPrevMonthText = () => {
    let prevMonth = month - 1;
    let displayYear = year;
    if (prevMonth === 0) {
      prevMonth = 12;
      displayYear = year - 1;
    }
    return `${displayYear}.${String( prevMonth ).padStart( 2, "0" )}`;
  };

  const getNextMonthText = () => {
    let nextMonth = month + 1;
    let displayYear = year;
    if (nextMonth === 13) {
      nextMonth = 1;
      displayYear = year + 1;
    }
    return `${displayYear}.${String( nextMonth ).padStart( 2, "0" )}`;
  };

  return (
    <article className="flex justify-center items-center gap-14 border-yearSlide_Border border-4 rounded-xl p-2">
      <div
        onClick={decreaseMonth}
        className="flex flex-1 items-center cursor-pointer group h-full pl-8"
      >
        <span className="group-hover:text-black flex-1 text-right text-yearSlide_PrevNext_Text">
          {getPrevMonthText()}
        </span>
        <button className="group-active:translate-x-[-3%] duration-100 flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover rotate-180">
          <IconTriangle/>
        </button>
      </div>

      <span
        onClick={nowYear}
        className="hover:brightness-95 text-3xl items-center cursor-pointer h-full text-yearSlide_ThisYear_Text font-bold"
      >
        {year}.{String( month ).padStart( 2, '0' )}
      </span>

      <div
        onClick={increaseMonth}
        className="flex flex-1 items-center cursor-pointer group h-full pr-8"
      >
        <button className="group-active:translate-x-[3%] duration-100 flex-1 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </button>
        <span className="group-hover:text-black flex-1 text-left text-yearSlide_PrevNext_Text">
          {getNextMonthText()}
        </span>
      </div>
    </article>
  );
}
