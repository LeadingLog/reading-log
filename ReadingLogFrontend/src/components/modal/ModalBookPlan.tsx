import React from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import IconCalendar from "../../assets/Icon-calendar.svg?react"

const ModalBookPlan: React.FC = () => {
  const {activeModal, closeModal, modalData} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  if (activeModal !== 'ModalBookPlan') return null; // activeModal이 ModalBookPlan가  아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="relative bg-modal_BookImg_Bg p-6 rounded-lg">
          책 썸네일
          <div className="absolute w-8 h-8 left-2 top-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </article>
        <article className="flex flex-col gap-4 bg-modal_Content_Bg p-2.5 rounded-lg">
          <div className="relative">
            <span className="text-2xl relative">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-title_Marker"></p>
              <span className="text-modal_BookPlan_Book_Title_Text m-2">{modalData.bookTitle}</span>
            </span>
            <p className="text-modal_BookPlan_Book_Sub_Title_Text">{modalData.bookSubTitle}</p>
          </div>
          <section className="flex gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">시작 달</p>
              <button className="flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg">
                <span className="text-modal_BookPlan_Calendar_Date_Text">2025.01</span>
                <span className="w-3 text-modal_BookPlan_Calendar_Icon_Color"><IconCalendar width="100%" height="100%"/></span>
              </button>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">시작 달</p>
              <button className="flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg">
                <span className="text-modal_BookPlan_Calendar_Date_Text">2025.01</span>
                <span className="w-3 text-modal_BookPlan_Calendar_Icon_Color"><IconCalendar width="100%" height="100%"/></span>
              </button>
            </div>
          </section>
          <section className="flex gap-4">
            <button
              onClick={closeModal} // 클릭 시 모달 닫기
              className="flex-1 min-w-[130px] px-4 py-1 border-4 border-modal_Left_Btn_Border rounded-lg"
            >
              다음에 읽기
            </button>
            <button
              onClick={modalData.onConfirm} // 클릭 시 모달 닫기
              className="flex-1 min-w-[130px] px-4 py-1 bg-modal_Right_Btn_Bg rounded-lg"
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