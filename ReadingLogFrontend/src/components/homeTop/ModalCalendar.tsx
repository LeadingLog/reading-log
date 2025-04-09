import React, { useState } from 'react';

interface ModalCalendarProps {
  startOrEnd: React.Dispatch<React.SetStateAction<"start" | "end">>;
  pickMonth: React.Dispatch<React.SetStateAction<number>>;
  pickYear: React.Dispatch<React.SetStateAction<number>>;
}

const ModalCalendar: React.FC<ModalCalendarProps> = ({ startOrEnd, pickYear, pickMonth }) => {
  const [choiceYear, setChoiceYear] = useState<number>(2025); // ✅ number 타입 명시
  const monthList: number[] = Array.from({length: 12}, (_, i) => i + 1); // ✅ 1~12월 생성



  return (
    <div className="absolute left-full bg-modal_Pick_Calendar_Bg">
      <div>
        <button
          onClick={() => {
            setChoiceYear((prev: number) => prev - 1); // ✅ 함수형 업데이트 타입
          }}
        >
          &lt;
        </button>
        <span>{choiceYear}</span>
        <button
          onClick={() => {
            setChoiceYear((next: number) => next + 1); // 타입 생략해도 됨, 추론 가능
          }}
        >
          &gt;
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {monthList.map((month: number, i: number) => (
          <li
            key={i}
            className=""
            onClick={() => {
              pickYear(choiceYear)
              pickMonth(month)
            }}
          >
            {month}월
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalCalendar;