import React, { useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import { motion } from "framer-motion";
// import BookSearchResult from "../common/BookSearchResult.tsx";


const ModalTrackingPlan: React.FC = () => {
  const {activeModal, closeModal} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  const [isOn, setIsOn] = useState(false) // 타이머 토글 on/off
  const toggleSwitch = () => setIsOn(!isOn)
  console.log(isOn)

  if (activeModal !== 'ModalTrackingPlan') return null; // activeModal이 ModalTrackingPlan이  아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex flex-col gap-3 bg-modalBg p-5 rounded-lg">
        {/* 타이틀 */}
        <span className="bg-modalTrackingTitleBg rounded-lg p-2 text-center font-semibold">독서 타임 트래킹</span>
        {/* 책 표지 */}
        <article className="relative h-20 bg-modalBookBg rounded-lg">
          <div className="absolute w-8 h-8 left-2 top-2 text-FavoriteIcon bg-FavoriteIconBg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </article>
        {/* 타이머 기능 관련 */}
        <article className="flex flex-col gap-2 bg-modalContentBg p-2.5 rounded-lg">
          <div className="relative">
            <span className="text-2xl relative">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-titleMarker"></p>
              <span className="m-2">책 제목</span>
            </span>
            <p>책 저자</p>
          </div>
          <section>
            <div className="flex justify-between items-center">
              <p>타이머</p>
              <button
                className={`${isOn ? 'modalTrackingTimerToggleOnBg' : 'modalTrackingTimerToggleOffBg'}`}
                style={{
                  justifyContent: "flex-" + (isOn ? "end" : "start"),
                }}
                onClick={toggleSwitch}
              >
                <motion.div
                  className={`${isOn ? 'modalTrackingTimerToggleOnCircle' : 'modalTrackingTimerToggleOffCircle'}`}
                  layout
                  transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.3,
                  }}
                />
              </button>
            </div>
            <p className="text-xs text-modalTrackingTimerSubTitleText">미 선택 시 시작과 동시에</p>
            <p className="text-xs text-modalTrackingTimerSubTitleText">스톱워치가 시작 됩니다.</p>
          </section>
          <motion.div
            initial={{maxHeight: 0}}
            // style={{borderEndEndRadius: '20px', borderEndStartRadius: '20px'}}
            animate={{
              maxHeight: isOn ? 36 : 0,
            }}
            transition={{duration: 0.2, ease: "easeInOut"}}
            className="relative h-[36px] flex overflow-hidden p-1 bg-modalTrackingTimeBg rounded-lg divide-x divide-modalTrackingTimeDivideColor"
          >
            <button className="relative flex flex-1 text-xl"><span
              className="flex-1 absolute inset-0 z-[1]">15분</span></button>
            <button className="relative flex flex-1 text-xl"><span className="flex-1 absolute inset-0 z-[1]">30분</span></button>
            <button className="relative flex flex-1 text-xl"><span className="flex-1 absolute inset-0 z-[1]">60분</span></button>
            <div className="absolute top-1 bottom-1 left-0 w-1/3 p-1 bg-modalTrackingTimeChoiceBg rounded-lg"></div>
          </motion.div>

          <section className="flex gap-4">
            <button
              onClick={closeModal} // 클릭 시 모달 닫기
              className="flex-1 min-w-[120px] px-4 py-1 border-4 border-modalLeftBtnBorder rounded-lg"
            >
              다음에 읽기
            </button>
            <button
              onClick={() => {
                setIsOn(false);
                closeModal()
              }} // 클릭 시 모달 닫기
              className="flex-1 min-w-[120px] px-4 py-1 bg-modalRightBtnBg rounded-lg"
            >
              독서 시작
            </button>
          </section>
        </article>
      </section>
    </div>
  );
};

export default ModalTrackingPlan;