import React, { useEffect, useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import IconCalendar from "../../assets/Icon-calendar.svg?react"
import ModalCalendar from "../homeTop/ModalCalendar.tsx";

const ModalBookPlan: React.FC = () => {
  const {activeModal, closeModal, openModal, modalData} = useModalStore();
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [startOrEnd, setStartOrEnd] = useState<"start" | "end">("start"); // 어떤 버튼을 눌렀는지 구분

  const [pickStartYear, setPickStartYear] = useState<number>(0);
  const [pickStartMonth, setPickStartMonth] = useState<number>(0);
  const [pickEndYear, setPickEndYear] = useState<number>(0);
  const [pickEndMonth, setPickEndMonth] = useState<number>(0);

  const getLastDateOfMonth = (year: number, month: number): string => {
    const lastDate = new Date(year, month, 0).getDate(); // month는 1-12로 받아서 그대로 사용
    return String(lastDate).padStart(2, '0');
  };

  const close = () => {
    // 입력 값 초기화
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    setPickStartYear(year);
    setPickStartMonth(month);
    setPickEndYear(year);
    setPickEndMonth(month);
    setOpenCalendar(false)
    closeModal()

  }
  const completeBookPlan = () => {
    // 입력 값 초기화
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    // 종료 날짜가 시작 날짜보다 앞선 경우 모달 띄우기
    if (
      pickEndYear < pickStartYear ||
      (pickEndYear === pickStartYear && pickEndMonth < pickStartMonth)
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
      return; // 초기화 방지
    }

    setPickStartYear(year);
    setPickStartMonth(month);
    setPickEndYear(year);
    setPickEndMonth(month);
    setOpenCalendar(false)

  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    setPickStartYear(year);
    setPickStartMonth(month);
    setPickEndYear(year);
    setPickEndMonth(month);
  }, []);

  if (activeModal !== 'ModalBookPlan') return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="relative bg-modal_BookImg_Bg p-6 rounded-lg">
          책 썸네일
          <div
            className="absolute w-8 h-8 left-2 top-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
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

          <section className="relative flex gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">시작 달</p>
              <button
                className="flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg"
                onClick={() => {
                  setOpenCalendar(true);
                  setStartOrEnd("start");
                }}
              >
                <span className="text-modal_BookPlan_Calendar_Date_Text">
                  {pickStartYear}.{String(pickStartMonth).padStart(2, '0')}.01
                </span>
                <span className="w-3 text-modal_BookPlan_Calendar_Icon_Color">
                  <IconCalendar width="100%" height="100%"/>
                </span>
              </button>
            </div>

            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">종료 달</p>
              <button
                className="flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg"
                onClick={() => {
                  setOpenCalendar(true);
                  setStartOrEnd("end");
                }}
              >
                <span className="text-modal_BookPlan_Calendar_Date_Text">
                  {pickEndYear}.{String(pickEndMonth).padStart(2, '0')}.{getLastDateOfMonth(pickEndYear, pickEndMonth)}
                </span>
                <span className="w-3 text-modal_BookPlan_Calendar_Icon_Color">
                  <IconCalendar width="100%" height="100%"/>
                </span>
              </button>
            </div>

            {/* 어떤 버튼을 눌렀는지에 따라 해당 props 전달 */}
            {openCalendar && (
              <ModalCalendar
                openCalendar={setOpenCalendar}
                pickYear={startOrEnd === 'start' ? setPickStartYear : setPickEndYear}
                pickMonth={startOrEnd === 'start' ? setPickStartMonth : setPickEndMonth}
                mode={startOrEnd}
                startYear={pickStartYear}
                startMonth={pickStartMonth}
              />
            )}
          </section>

          <section className="flex gap-4">
            <button
              onClick={() => {
                close()
              }}
              className="flex-1 min-w-[130px] px-4 py-1 border-4 border-modal_Left_Btn_Border rounded-lg"
            >
              다음에 읽기
            </button>
            <button
              onClick={() => {
                modalData.onConfirm?.(); // 원래 넘겨준 confirm 동작 실행
                completeBookPlan();      // 현재 페이지 관련 초기화 작업
              }}
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
