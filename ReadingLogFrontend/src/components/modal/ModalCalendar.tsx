import React, { useState } from 'react';
import { useModalStore } from "../../store/modalStore.ts";
import { ModalCalendarProps } from "../../types/modal.ts";
import { motion, AnimatePresence } from "framer-motion";

const ModalCalendar: React.FC<ModalCalendarProps> = ({
                                                       modalId,
                                                       startOrEnd,
                                                       // openCalendar,
                                                       // pickYear,
                                                       // pickMonth,
                                                       startYear,
                                                       startMonth,
                                                     }) => {
  const { openModal, closeModal } = useModalStore()

  const [isVisible, setIsVisible] = useState(true);

  const [choiceYear, setChoiceYear] = useState<number>(new Date().getFullYear());
  const monthList: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const handleMonthClick = (month: number) => {
    if (startOrEnd === '시작 달') {
      if (
        choiceYear < currentYear ||
        (choiceYear === currentYear && month < currentMonth)
      ) {
        openModal('ModalNotice', {
          title: "선택한 연/월이 오늘보다 이전이에요!",
          cancelText: "다시 선택하기",
          onlyClose: true,
        });
        return;
      }
    }

    if (startOrEnd === '시작 달') {
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
        });
        return;
      }
    }
    // pickYear(choiceYear);
    // pickMonth(month);
    // openCalendar(false);
  };

  const handleClose = () => {
    setIsVisible(false); // 애니메이션 시작
    setTimeout(() => {
      if (modalId) {
        closeModal(modalId); // exit 끝난 후 진짜 제거
      }
    }, 250); // exit duration과 맞추기
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ top: -400 }}
          animate={{ top: 0, }}
          exit={{ top: -400 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed left-1/2 transform -translate-x-1/2 flex flex-col gap-3 p-3 bg-modal_Pick_Calendar_Back_Bg rounded-xl z-50 "
        >
          {/* 시작 달 인 종료 달 인지 */}
          <div
            className="text-center text-lg font-semibold text-modal_Pick_Calendar_Title_Text bg-modal_Pick_Calendar_Content_Bg rounded-lg p-2">
            {startOrEnd}
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
            <ul
              className="grid grid-cols-[repeat(3,_minmax(70px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] gap-4 ">
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
            onClick={handleClose}
          >닫기
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCalendar;
