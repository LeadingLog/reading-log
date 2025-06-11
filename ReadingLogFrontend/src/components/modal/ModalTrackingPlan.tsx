import React, { useEffect, useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import { motion } from "framer-motion";
import { usePageStore } from "../../store/pageStore.ts";
import { ModalTrackingPlanProps } from "../../types/modal.ts";
import { bookStatusChangeApi } from "../../api/bookStatusChangeApi.ts";
import { bookStatusChangeBody } from "../../types/bookStatusChange.ts";
import { useUserStore } from "../../store/userStore.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";


const ModalTrackingPlan: React.FC<ModalTrackingPlanProps> = ({
                                                               modalId,
                                                               cover,
                                                               bookId,
                                                               bookLink,
                                                               bookTitle,
                                                               author,
                                                               cancelText,
                                                               confirmText,
                                                               onlyClose,
                                                               bookStatus
                                                             }) => {
  const { closeModal, openModal } = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기
  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  const { userId } = useUserStore()
  const [isLoading, setIsLoading] = useState<boolean>( false );
  type TimeChoice = 15 | 30 | 60;

  const [timeChoice, setTimeChoice] = useState<TimeChoice | undefined>( undefined );

  const { triggerChange } = useGlobalChangeStore.getState();

  /* 타이머 시간 선택 시 UI */
  const getLeftPosition = (choice: TimeChoice | undefined) => {
    switch (choice) {
      case 15:
        return "left-2";
      case 30:
        return "left-1/2 -translate-x-1/2"; // 가운데 배치
      case 60:
        return "left-[69%]"; // 오른쪽 배치
      default:
        return "left-2"; // 기본 위치
    }
  };

  const readingStart = async () => {
    setIsLoading( true )
    const bookStatusChangeBodyValue: bookStatusChangeBody = {
      userId: userId,
      bookId: bookId,
      bookStatus: "IN_PROGRESS"
    }
    try {
      await bookStatusChangeApi( bookStatusChangeBodyValue )
      triggerChange( 'MyReadingList' )
      setRightContent( 'TimeTracking', {
          TimeTracking: {
            tab: isOn ? 'Timer' : 'StopWatch',
            bookData:
              {
                bookId,
                cover,
                bookTitle,
                author
              }
          }
        },
        {
          title: `독서 타임 트래킹 - ${isOn ? '타이머' : '스탑워치'}`,
          time:
          timeChoice,
        }
      );
      setIsOn( false );
      if (modalId) { // modalId가 있을 경우에만 closeModal 호출
        closeModal( modalId );
      }
    } catch (error) {
      console.error( '독서 목록 추가 실패', error )
      openModal( 'ModalNotice', {
        title: '요청 실패',
        subTitle: `${error}`,
        onlyClose: true,
        withMotion: true,
      } )
    } finally {
      setIsLoading( false )
    }
  }


  const [isOn, setIsOn] = useState( false ) // 타이머 토글 on/off
  const toggleSwitch = () => setIsOn( !isOn )

  useEffect( () => {
    if (!isOn) {
      setTimeChoice( 15 );
    }
  }, [isOn] );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex max-w-96 flex-col gap-3 bg-modal_Default_Bg p-5 rounded-lg">
        {/* 타이틀 */}
        <span
          className="bg-modal_Tracking_Title_Bg text-modal_Tracking_Title_Text rounded-lg p-2 text-center font-semibold">독서 타임 트래킹</span>
        {/* 책 표지 */}
        <a href={`${bookLink}`} target="_blank"
           className="flex justify-center items-center max-h-96 relative aspect-square overflow-hidden rounded-lg">
          <img src={cover} alt={bookTitle}
               className="relative drop-shadow-[2px_4px_6px_#00000080] z-10 h-[90%] object-contain"/>
          <img src={cover} alt={bookTitle} className="absolute inset-0 w-full h-full object-cover opacity-90 blur-sm"/>
        </a>
        <article className="flex flex-col gap-2 bg-modal_Content_Bg p-2.5 rounded-lg">
          <div className="flex flex-col gap-1 relative">
            <span className="flex items-center relative">
              <p className="absolute top-0 bottom-0 left-0 w-1 bg-title_Marker"></p>
              <span className="ml-2 text-modal_Tracking_Book_Title_Text">{bookTitle}</span>
            </span>
            <p className="text-sm text-modal_Tracking_Book_SubTitle_Text">{author}</p>
          </div>
          {/* 타이머 기능 관련 */}
          {/* 완독 도서가 아닌 경우만 표시 */}
          {bookStatus !== "COMPLETED" ? (
            <>
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
                  onClick={() => setTimeChoice( 15 )}
                >
                  <span
                    className={`${timeChoice === 15 ? 'text-modal_Tracking_Time_Choice_Text font-semibold' : 'text-modal_Tracking_Time_NoChoice_Text'} flex-1 absolute inset-0 z-[1]`}
                  >
                    15분
                  </span>
                </button>
                <button
                  className="relative flex flex-1 text-xl"
                  onClick={() => setTimeChoice( 30 )}
                >
                  <span
                    className={`${timeChoice === 30 ? 'text-modal_Tracking_Time_Choice_Text font-semibold' : 'text-modal_Tracking_Time_NoChoice_Text'} flex-1 absolute inset-0 z-[1]`}
                  >
                    30분
                  </span>
                </button>
                <button className="relative flex flex-1 text-xl"
                        onClick={() => setTimeChoice( 60 )}
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
                    ${getLeftPosition( timeChoice )}
                  `}
                ></div>
              </motion.div>
            </>
          ) : (
            <div className="text-center text-modal_Tracking_Complete_Text bg-modal_Tracking_Complete_Text_Bg rounded-md p-1">
              완독 도서
            </div>
          )}
          <section className="flex gap-4">
            <button
              onClick={() => {
                setIsOn( false );
                if (modalId) { // modalId가 있을 경우에만 closeModal 호출
                  closeModal( modalId );
                }
              }} // 클릭 시 모달 닫기
              className="flex-1 min-w-[120px] px-4 py-1 border-4 border-modal_Left_Btn_Border rounded-lg"
            >
              {cancelText || "다음에 읽기"}
            </button>
            {!onlyClose && (
              <button
                onClick={() => readingStart()}
                className="flex-1 gap-1 flex justify-center items-center min-w-[120px] px-4 py-1 bg-modal_Right_Btn_Bg rounded-lg"
              >

                {isLoading ? (
                  <>
                    <span>추가 중</span>
                    <span
                      className="w-5 h-5 border-4 border-modal_Tracking_loadingBg border-t-modal_Tracking_loadingSpinner rounded-full animate-spin"></span>
                  </>
                ) : (
                  <span>{confirmText || "독서 시작"}</span>
                )}
              </button>
            )}
          </section>
        </article>
      </section>
    </div>
  );
};

export default ModalTrackingPlan;