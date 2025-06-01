import React, { useEffect, useRef, useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import IconCalendar from "../../assets/Icon-calendar.svg?react"
import { ModalBookPlanProps } from "../../types/modal.ts";
import { readingListAddApi } from "../../api/readingListAddAPI.ts";
import { ReadingListAddBody } from "../../types/readingListAdd.ts";

const ModalBookPlan: React.FC<ModalBookPlanProps> = ({ title, bookTitle, bookSubTitle, isbn13, cover, bookLink }) => {
  const { closeModal, openModal, closeAllModals } = useModalStore();


  /* 시작 달 종료 달 표시용 */
  const [pickStartYear, setPickStartYear] = useState<number>(0);
  const [pickStartMonth, setPickStartMonth] = useState<number>(0);
  const [pickEndYear, setPickEndYear] = useState<number>(0);
  const [pickEndMonth, setPickEndMonth] = useState<number>(0);

  /* 현재 날로 초기화 하기 용*/
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  /* 종료 달 부분에 그 달의 마지막 날을 표시 하기 위한 것 */
  const getLastDateOfMonth = (currentYear: number, currentMonth: number): string => {
    const lastDate = new Date(currentYear, currentMonth, 0).getDate(); // month는 1-12로 받아서 그대로 사용
    return String(lastDate).padStart(2, '0');
  };

  /* 시작달 or 종료달 캘릭터 뛰우기 */
  const openCalendar = (startOrEnd: "시작 달" | "종료 달") => {
    const isStart = startOrEnd === "시작 달";
    const { modals } = useModalStore.getState();
    // 이미 같은 종류의 모달이 열려 있다면 아무것도 하지 않음
    const sameModal = modals.find(
      (modal) =>
        modal.type === "ModalCalendar" &&
        modal.data?.startOrEnd === startOrEnd
    );
    if (sameModal) return;

    // 다른 종류의 ModalCalendar가 열려 있으면 먼저 닫기
    const otherModal = modals.find(
      (modal) =>
        modal.type === "ModalCalendar" &&
        modal.data?.startOrEnd !== startOrEnd
    );
    if (otherModal) {
      closeModal(otherModal.modalId);
    }
    // 모달 열기
    openModal('ModalCalendar', {
      startOrEnd,
      year: isStart ? pickStartYear : pickEndYear,
      pickYear: isStart ? setPickStartYear : setPickEndYear,
      pickMonth: isStart ? setPickStartMonth : setPickEndMonth
    });
  };

  /* 닫을 때 실행될 함수 --------------- */
  const close = () => {

    setPickStartYear(currentYear)
    setPickStartMonth(currentMonth)
    setPickEndYear(currentYear)
    setPickEndMonth(currentMonth)

    closeAllModals()

  }
  /* 닫을 때 실행될 함수 END --------------- */

  const ReadingListAdd = async () => {
    const ReadingListAddBodyList: ReadingListAddBody = {
      userId: 7,
      bookTitle: bookTitle,
      author: bookSubTitle,
      isbn13: isbn13,
      link: bookLink,
      coverImgUrl: cover,
      bookStatus: 'NOT_STARTED',

      // 문자열 템플릿을 사용해 날짜 포맷 구성
      readStartDt: `${pickStartYear}-${String(pickStartMonth).padStart(2, '0')}-01`,
      readEndDt: `${pickEndYear}-${String(pickEndMonth).padStart(2, '0')}-${getLastDateOfMonth(pickEndYear, pickEndMonth)}`
    };
    await readingListAddApi(ReadingListAddBodyList)
  }

  /* 독서 계획 추가 버튼 클릭 시 함수 */
  const completeBookPlan = async () => {
    const alertModal = (alertMessage: string) => {
      openModal('ModalNotice', {
        title: alertMessage,
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      });
    }
    // 종료일이 시작일보다 앞선 경우
    const isEndBeforeStart =
      pickEndYear < pickStartYear ||
      (pickEndYear === pickStartYear && pickEndMonth < pickStartMonth);

    // 시작일이 오늘 이전인 경우
    const isStartBeforeToday =
      pickStartYear < currentYear ||
      (pickStartYear === currentYear && pickStartMonth < currentMonth);

    if (isEndBeforeStart) {
      alertModal("종료일이 시작일보다 빠를 수 없어요!"); // 경고 모달 또는 alert
      return;
    } else if (isStartBeforeToday) {
      alertModal("시작일이 오늘 보다 이전 일 순 없어요!"); // 경고 모달 또는 alert
      return;
    } else {

      await ReadingListAdd()

      openModal('ModalNotice', {
        title: "내 독서 목록에 추가 되었어요!",
        subTitle: "즐거운 독서시간!",
        confirmText: "닫기",
        onlyConfirm: true,
        onConfirm: async () => {


          setPickStartYear(currentYear)
          setPickStartMonth(currentMonth)
          setPickEndYear(currentYear)
          setPickEndMonth(currentMonth)

          closeAllModals()
        }
      })
    }

  };
  /* 독서 계획 추가 버튼 클릭 시 함수 END -----------------*/

  /* 모달 처음 실행할 때 현재 달로 시작 달 종료달 세팅 */
  useEffect(() => {
    setPickStartYear(currentYear)
    setPickStartMonth(currentMonth)
    setPickEndYear(currentYear)
    setPickEndMonth(currentMonth)

  }, []);
  /* 모달 처음 실행할 때 현재 달로 시작 달 종료달 세팅 END -----------------*/

  /* 유동적인 이미지 높이 값을 설정하기 위해 오른쪽 독서계획 영역의 높이 값을 추적함 수 ----------------*/
  const parentRef = useRef<HTMLAnchorElement | null>(null);
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    // ResizeObserver 인스턴스 생성
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        setImageHeight(newHeight);
      }
    });

    resizeObserver.observe(parent); // 감시 시작

    // 언마운트 시 관찰 중지
    return () => {
      resizeObserver.unobserve(parent);
      setImageHeight(0)
    };
  }, []);

  /* 유동적인 이미지 높이 값을 설정하기 위해 오른쪽 독서계획 영역의 높이 값을 추적함 수 END ----------------*/
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <a
          ref={parentRef}
          href={bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative min-w-fit bg-modal_BookImg_Bg"
        >
          <img
            src={cover}
            alt={title}
            className={`object-contain min-w-fit`}
            style={{ height: `${imageHeight}px` }}
          />
          <div
            className="absolute w-8 h-8 left-2 top-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </a>
        <article
          className="flex flex-1 justify-between flex-col gap-8 bg-modal_Content_Bg p-2.5 rounded-lg"
        >
          <div className="relative max-w-80">
            <span className="flex  relative">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-title_Marker"></p>
              <span className="text-lg font-semibold text-modal_BookPlan_Book_Title_Text ml-2">{bookTitle}</span>
            </span>
            <p className="text-modal_BookPlan_Book_Sub_Title_Text">{bookSubTitle}</p>
          </div>

          <section className="relative flex gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">시작 달</p>
              <button
                className="flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg"
                onClick={() => {
                  openCalendar("시작 달")
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
                  openCalendar("종료 달")
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
