import React, { useState } from 'react';
import { useModalStore } from "../../store/modalStore.ts";
import { ModalCalendarProps } from "../../types/modal.ts";
import { motion, AnimatePresence } from "framer-motion";
import IconTriangle from "../../assets/Icon-triangle.svg?react";

const ModalCalendar: React.FC<ModalCalendarProps> = ({
                                                       modalId,
                                                       startOrEnd,
                                                       pickYear,
                                                       pickMonth,
                                                       currentYear,
                                                     }) => {

  const { closeModal } = useModalStore()
  const [modalYear, setModalYear] = useState<number>( currentYear ?? new Date().getFullYear() );
  const [isVisible, setIsVisible] = useState( true );

  const monthList: number[] = Array.from( { length: 12 }, (_, i) => i + 1 );

  /* 월 클릭 시 독서 계획 모달 시작 달 or 종료달 날이 변경 됨*/
  const handleMonthClick = (monthItem: number) => {
    if (pickYear && pickMonth) {
      pickYear( modalYear )
      pickMonth( monthItem )
    }
  };

  /* 닫히는 모션까지 구현을 위해 닫기를 누른 뒤 시간차를 둠 */
  const handleClose = () => {
    setIsVisible( false ); // 애니메이션 시작
    setTimeout( () => {
      if (modalId) {
        closeModal( modalId ); // exit 끝난 후 진짜 제거
      }
    }, 250 ); // exit duration과 맞추기
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
          <div className="flex flex-col gap-4 p-3 bg-modal_Pick_Calendar_Content_Bg rounded-lg">
            <div className="flex justify-center items-center gap-5 ">
              <button
                className="active:translate-x-[-3%] duration-100 hover:text-modal_Pick_Calendar_Year_Handler_Text_hover text-center flex flex-1 justify-center items-center text-modal_Pick_Calendar_Year_Handler_Text rotate-180"
                onClick={() => {
                  if (modalYear !== undefined) {
                    setModalYear( (prev) => prev - 1 )
                  }
                }}
              >
                <IconTriangle/>
              </button>
              <span
                className="hover:brightness-95 flex-1 text-modal_Pick_Calendar_Year_Text text-3xl text-center cursor-pointer font-bold"
                onClick={() => setModalYear(new Date().getFullYear())}
              >
                {modalYear}
              </span>
              <button
                className="active:translate-x-[3%] duration-100 hover:text-modal_Pick_Calendar_Year_Handler_Text_hover text-center flex flex-1 justify-center items-center text-modal_Pick_Calendar_Year_Handler_Text"
                onClick={() => {
                  setModalYear( (prev) => prev + 1 )
                }}
              >
                <IconTriangle/>
              </button>
            </div>
            <ul
              className="grid grid-cols-[repeat(3,_minmax(70px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] gap-4 ">
              {monthList.map( (monthItem, i) => (
                <li
                  key={i}
                  className="flex cursor-pointer justify-center items-center bg-modal_Pick_Calendar_Month_Bg p-2 rounded-lg
                  hover:brightness-[97%]
                  active:brightness-[93%] active:scale-90 transition-[transform, background] duration-100 ease-in-out"
                  onClick={() => handleMonthClick( monthItem )}
                >
                  {monthItem}월
                </li>
              ) )}
            </ul>
          </div>
          <div
            className="hover:brightness-[98%] active:scale-95 duration-100 text-center font-semibold text-modal_Pick_Calendar_Cancel_Text cursor-pointer bg-modal_Pick_Calendar_Content_Bg p-2 rounded-lg"
            onClick={handleClose}
          >닫기
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCalendar;
