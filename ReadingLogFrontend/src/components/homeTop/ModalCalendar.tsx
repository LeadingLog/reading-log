import React, { useState } from 'react';
import { useModalStore } from "../../store/modalStore.ts";

interface ModalCalendarProps {
  pickMonth: React.Dispatch<React.SetStateAction<number>>;
  pickYear: React.Dispatch<React.SetStateAction<number>>;
  openCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'start' | 'end';
  startYear?: number;
  startMonth?: number;
}

const ModalCalendar: React.FC<ModalCalendarProps> = ({
                                                       openCalendar,
                                                       pickYear,
                                                       pickMonth,
                                                       mode,
                                                       startYear,
                                                       startMonth,
                                                     }) => {
  const {openModal} = useModalStore()

  const [choiceYear, setChoiceYear] = useState<number>(new Date().getFullYear());
  const monthList: number[] = Array.from({length: 12}, (_, i) => i + 1);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const handleMonthClick = (month: number) => {
    if (mode === 'start') {
      if (
        choiceYear < currentYear ||
        (choiceYear === currentYear && month < currentMonth)
      ) {
        openModal('ModalNotice', {
          title: "선택한 연/월이 오늘보다 이전이에요!",
          confirmText: "다시 선택하기",
          onlyConfirm: true,
          onConfirm: () => {
            openModal("ModalBookPlan", {
              bookTitle: "책 제목",
              bookSubTitle: "책 저자",
              cancelText: "다음에 읽기",
              confirmText: "독서 계획 추가",
              onConfirm: () => {
                openModal("ModalNotice", {
                  title: "내 독서 목록에 추가 되었어요!",
                  subTitle: "즐거운 독서시간!",
                  onlyClose: true,
                })
              }
            })
          }
        });
        return;
      }
    }

    if (mode === 'end') {
      if (
        startYear !== undefined &&
        startMonth !== undefined &&
        (choiceYear < startYear ||
          (choiceYear === startYear && month < startMonth))
      ) {
        openModal('ModalNotice', {
          title: "종료 날짜는 시작 날짜보다 빠를 수 없어요!",
          confirmText: "다시 선택하기",
          onlyConfirm: true,
          onConfirm: () => {
            openModal("ModalBookPlan", {
              bookTitle: "책 제목",
              bookSubTitle: "책 저자",
              cancelText: "다음에 읽기",
              confirmText: "독서 계획 추가",
              onConfirm: () => {
                openModal("ModalNotice", {
                  title: "내 독서 목록에 추가 되었어요!",
                  subTitle: "즐거운 독서시간!",
                  onlyClose: true,
                })
              }
            })
          }
        });
        return;
      }
    }
    pickYear(choiceYear);
    pickMonth(month);
    openCalendar(false);
  };

  return (
    <div
      className="absolute flex flex-col gap-3 left-full -top-full p-3 bg-modal_Pick_Calendar_Back_Bg rounded-xl">
      {/* 시작 달 인 종료 달 인지 */}
      <div className="text-center text-lg font-semibold text-modal_Pick_Calendar_Title_Text bg-modal_Pick_Calendar_Content_Bg rounded-lg p-2">
        {mode === "start" ? "시작 달 선택" : "종료 달 선택"}
      </div>
      {/* 년도 및 월 선택 */}
      <div className="flex flex-col gap-2 p-3 bg-modal_Pick_Calendar_Content_Bg rounded-lg">
        <div className="flex justify-center items-center gap-5 ">
          <button
            className="flex-1 text-modal_Pick_Calendar_Year_Handler_Text"
            onClick={() => setChoiceYear((prev) => prev - 1)}
          >
            &lt;
          </button>
          <span
            className="flex-1 text-modal_Pick_Calendar_Year_Text text-xl text-center">
            {choiceYear}
          </span>
          <button
            className="flex-1 text-modal_Pick_Calendar_Year_Handler_Text"
            onClick={() => setChoiceYear((next) => next + 1)}
          >
            &gt;
          </button>
        </div>
        <ul className="grid grid-cols-[repeat(3,_minmax(70px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] gap-4 ">
          {monthList.map((month, i) => (
            <li
              key={i}
              className="flex cursor-pointer justify-center items-center bg-modal_Pick_Calendar_Month_Bg p-2 rounded-lg"
              onClick={() => handleMonthClick(month)}
            >
              {month}월
            </li>
          ))}
        </ul>
      </div>
      <div
        className="text-center font-semibold text-modal_Pick_Calendar_Cancel_Text cursor-pointer bg-modal_Pick_Calendar_Content_Bg p-2 rounded-lg"
        onClick={() => {openCalendar(false)}}
      >닫기</div>
    </div>
  );
};

export default ModalCalendar;
