import React, { useEffect, useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import { motion } from "framer-motion";
import { usePageStore } from "../../store/pageStore.ts";
import { ModalTrackingPlanProps } from "../../types/modal.ts";


const ModalTrackingPlan: React.FC<ModalTrackingPlanProps> = ({ modalId }) => {
  const { closeModal } = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기
  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  type TimeChoice = 3 | 30 | 60;

  const [timeChoice, setTimeChoice] = useState<TimeChoice | undefined>(undefined);

  /* 타이머 시간 선택 시 UI */
  const getLeftPosition = (choice: TimeChoice | undefined) => {
    switch (choice) {
      case 3:
        return "left-2";
      case 30:
        return "left-1/2 -translate-x-1/2"; // 가운데 배치
      case 60:
        return "left-[69%]"; // 오른쪽 배치
      default:
        return "left-2"; // 기본 위치
    }
  };


  const [isOn, setIsOn] = useState(false) // 타이머 토글 on/off
  const toggleSwitch = () => setIsOn(!isOn)

  useEffect(() => {
    if (!isOn) {
      setTimeChoice(3);
    }
  }, [isOn]);


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex flex-col gap-3 bg-modal_Default_Bg p-5 rounded-lg">
        {/* 타이틀 */}
        <span
          className="bg-modal_Tracking_Title_Bg text-modal_Tracking_Title_Text rounded-lg p-2 text-center font-semibold">독서 타임 트래킹</span>
        {/* 책 표지 */}
        <article className="relative h-20 bg-modal_BookImg_Bg rounded-lg">
          <div
            className="absolute w-8 h-8 left-2 top-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </article>
        {/* 타이머 기능 관련 */}
        <article className="flex flex-col gap-2 bg-modal_Content_Bg p-2.5 rounded-lg">
          <div className="relative">
            <span className="text-2xl relative">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-title_Marker"></p>
              <span className="m-2 text-modal_Tracking_Book_Title_Text">책 제목</span>
            </span>
            <p className="text-modal_Tracking_Book_SubTitle_Text">책 저자</p>
          </div>
          <section>
            <div className="flex justify-between items-center">
              <p className="text-modal_Tracking_Timer_Title_Text">타이머</p>
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
            <p className="text-xs text-modal_Tracking_Timer_Sub_Title_Text">미 선택 시 시작과 동시에</p>
            <p className="text-xs text-modal_Tracking_Timer_Sub_Title_Text">스톱워치가 시작 됩니다.</p>
          </section>
          <motion.div
            initial={{ maxHeight: 0 }}
            // style={{borderEndEndRadius: '20px', borderEndStartRadius: '20px'}}
            animate={{
              maxHeight: isOn ? 36 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-[36px] flex overflow-hidden p-1 bg-modal_Tracking_Time_Bg rounded-lg divide-x divide-modal_Tracking_Time_Divide_Color"
          >
            <button
              className="relative flex flex-1 text-xl"
              onClick={() => setTimeChoice(3)}
            >
              <span
                className={`${timeChoice === 3 ? 'text-modal_Tracking_Time_Choice_Text font-semibold' : 'text-modal_Tracking_Time_NoChoice_Text'} flex-1 absolute inset-0 z-[1]`}
              >
                15분
              </span>
            </button>
            <button
              className="relative flex flex-1 text-xl"
              onClick={() => setTimeChoice(30)}
            >
              <span
                className={`${timeChoice === 30 ? 'text-modal_Tracking_Time_Choice_Text font-semibold' : 'text-modal_Tracking_Time_NoChoice_Text'} flex-1 absolute inset-0 z-[1]`}
              >
                30분
              </span>
            </button>
            <button className="relative flex flex-1 text-xl"
                    onClick={() => setTimeChoice(60)}
            >
              <span
                className={`${timeChoice === 60 ? 'text-modal_Tracking_Time_Choice_Text font-semibold' : 'text-modal_Tracking_Time_NoChoice_Text'} flex-1 absolute inset-0 z-[1]`}
              >
                60분
              </span>
            </button>
            <div
              className={`
                absolute top-1 bottom-1 w-[calc(30%-6px)] drop-shadow-md border-none 
                bg-modal_Tracking_Time_Choice_Bg rounded-lg transition-all duration-300 
                ${isOn ? "block" : "hidden"} 
                ${getLeftPosition(timeChoice)}
              `}
            ></div>
          </motion.div>

          <section className="flex gap-4">
            <button
              onClick={() => {
                setIsOn(false);
                if (modalId) { // modalId가 있을 경우에만 closeModal 호출
                  closeModal(modalId);
                }
              }} // 클릭 시 모달 닫기
              className="flex-1 min-w-[120px] px-4 py-1 border-4 border-modal_Left_Btn_Border rounded-lg"
            >
              다음에 읽기
            </button>
            <button
              onClick={() => {
                setRightContent(
                  'TimeTracking',
                  { TimeTracking: { tab: isOn ? 'Timer' : 'StopWatch' } },
                  {
                    title: `독서 타임 트래킹 - ${isOn ? '타이머' : '스탑워치'}`,
                    time: timeChoice
                  }
                );
                setIsOn(false);
                if (modalId) { // modalId가 있을 경우에만 closeModal 호출
                  closeModal(modalId);
                }
              }}
              className="flex-1 min-w-[120px] px-4 py-1 bg-modal_Right_Btn_Bg rounded-lg"
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