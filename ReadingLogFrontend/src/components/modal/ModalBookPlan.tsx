import React from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import IconCalendar from "../../assets/Icon-calendar.svg?react"

const ModalBookPlan: React.FC = () => {
  const {activeModal, closeModal} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  if (activeModal !== 'ModalBookPlan') return null; // activeModal이 ModalBookPlan가  아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex gap-5 bg-modalBg p-5 rounded-lg">
        <article className="relative bg-modalBookBg p-6 rounded-lg">
          책 썸네일
          <div className="absolute w-8 h-8 left-2 top-2 text-FavoriteIcon bg-FavoriteIconBg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </article>
        <article className="flex flex-col gap-4 bg-modalContentBg p-2.5 rounded-lg">
          <div className="relative">
            <span className="text-2xl relative">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-titleMarker"></p>
              <span className="text-modalBookPlanBookTitleText m-2">책 제목</span>
            </span>
            <p className="text-modalBookPlanBookSubTitleText">책 저자</p>
          </div>
          <section className="flex gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-modalBookPlanStartEndMonthText">시작 달</p>
              <button className="flex justify-between py-1 px-2 bg-modalBookPlanCalendarBg rounded-lg">
                <span className="text-modalBookPlanCalendarText">2025.01</span>
                <span className="w-3 text-modalBookPlanCalendarIcon"><IconCalendar width="100%" height="100%"/></span>
              </button>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-modalBookPlanStartEndMonthText">시작 달</p>
              <button className="flex justify-between py-1 px-2 bg-modalBookPlanCalendarBg rounded-lg">
                <span className="text-modalBookPlanCalendarText">2025.01</span>
                <span className="w-3 text-modalBookPlanCalendarIcon"><IconCalendar width="100%" height="100%"/></span>
              </button>
            </div>
          </section>
          <section className="flex gap-4">
            <button
              onClick={closeModal} // 클릭 시 모달 닫기
              className="flex-1 min-w-[130px] px-4 py-1 border-4 border-modalLeftBtnBorder rounded-lg"
            >
              다음에 읽기
            </button>
            <button
              onClick={closeModal} // 클릭 시 모달 닫기
              className="flex-1 min-w-[130px] px-4 py-1 bg-modalRightBtnBg rounded-lg"
            >
              독서 계획 추가
            </button>
          </section>
        </article>
      </section>
    </div>
  );
};

export default ModalBookPlan;