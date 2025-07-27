import IconStop from "../../../assets/Icon-stop.svg?react"
import { usePageStore } from "../../../store/pageStore.ts";
import { useModalStore } from "../../../store/modalStore.ts";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "../../../store/userStore.ts";
import { createReadingRecord } from "../../../utils/createReadingRecord.ts";
import { saveReadingRecordApi } from "../../../api/readingRecord.ts";
import { useReadingBookStore } from "../../../store/useReadingInfoStore.ts";
import { WarningScreen } from "../../common/WarningScreen.tsx";
import { useGlobalChangeStore } from "../../../store/useGlobalChangeStore.ts";

export default function ItemTimer() {
  const { openModal, closeModal, closeAllModals } = useModalStore();
  const { pageData, setRightContent, params } = usePageStore();
  const { userId } = useUserStore();

  const bookData = params.TimeTracking?.bookData;
  const [startTimestamp, setStartTimestamp] = useState<Date | null>( null ); // 스탑워치 시작 시간
  const [timeLeft, setTimeLeft] = useState( pageData.time || 0 );
  const [isRunning, setIsRunning] = useState( true ); // 타이머 실행 여부
  const hasSavedRef = useRef( false ); // 중복 저장 방지용 ref

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const setModalIsLoading = useModalStore( state => state.setModalIsLoading );

  const { triggerChange } = useGlobalChangeStore.getState();

  const { endReadingBook } = useReadingBookStore();

  // 프로그래스 계산 (시간 비율에 따라 원 그래프 감소)
  const progress =
    pageData.time && pageData.time > 0
      ? circumference * (timeLeft / (pageData.time * 60))
      : 0;

  // 독서 종료 모달
  const stopTimer = () => {
    setIsRunning( false );
    openModal( "ModalNotice", {
      title: "독서를 종료하시나요?",
      subTitle: "종료 시 시간이 저장돼요",
      cancelText: "아니요 더 읽을래요!",
      confirmText: "네 종료할게요!",
      reverseBtn: true,
      loadingMessage: "저장중",
      onConfirm: async () => {
        setModalIsLoading( true )
        await saveReadingRecord();
        setTimeLeft( 0 );
      },
      onCancel: () => {
        setIsRunning( true ); // 취소 선택시 타이머 재개
      }
    } )
  }

  // 독서 기록 실패 시 공통 모달 표시
  const handleReadingRecordFail = (message?: string, title?: string) => {
    const readingRecordFailModal = openModal( "ModalNotice", {
      title: title || "독서 시간 저장 실패",
      subTitle: message || "독서 시간 저장에 실패하였습니다. 다시 시도해주세요.",
      onlyConfirm: true,
      confirmText: "닫기",
      onConfirm: () => {
        closeModal( readingRecordFailModal );
      },
    } );
  };

  /* 독서 시간 기록 */
  const saveReadingRecord = async () => {
    if (hasSavedRef.current) return; // 이미 저장했으면 종료
    hasSavedRef.current = true;

    if (startTimestamp === null) {
      handleReadingRecordFail( "독서 시간 기록에 실패하였습니다. 다시 시도해주세요." );
      return;
    }

    if (userId === null) {
      console.warn( "User ID가 없습니다." );
      return;
    }

    const readTime = getReadTime( timeLeft, pageData.time! );
    const readingRecord = createReadingRecord( {
      bookId: bookData?.bookId ?? 0,
      userId,
      startTimestamp,
      time: readTime
    } );

    try {
      const data = await saveReadingRecordApi( readingRecord );
      if (data.success) {
        triggerChange( "TimeSave" )
        endReadingBook()
        openModal( "ModalNotice", {
          title: "독서시간 저장 완료",
          subTitle: "수고하셨어요",
          onlyConfirm: true,
          confirmText: "닫기",
          onConfirm: () => {
            closeAllModals();
            setRightContent(
              'TimeTracking',
              { TimeTracking: { tab: 'onlyMonthReadingList' } },
            )
          }
        } );
      } else {
        handleReadingRecordFail( "독서 시간 기록에 실패하였습니다. 다시 시도해주세요." );
      }
    } catch (err) {
      console.warn( "독서 시간 기록 실패:", err );
      handleReadingRecordFail( "서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." );
    } finally {
      setModalIsLoading( false )
    }
  }

  // 시간 계산 함수
  const getReadTime = (timeLeft: number, totalTimeInMinutes: number) => {
    const totalSeconds = totalTimeInMinutes * 60;
    const readSeconds = totalSeconds - timeLeft;
    const hour = Math.floor( readSeconds / 3600 );
    const minute = Math.floor( (readSeconds % 3600) / 60 );
    const second = readSeconds % 60;
    return { hour, minute, second };
  };

  // 페이지 시간 초기화 또는 변경시 타이머 초기화
  useEffect( () => {
    setStartTimestamp( new Date() ); // 타이머 시작 시간 기록
    setTimeLeft( (pageData.time || 0) * 60 ); // 분 -> 초 변환
    setIsRunning( true );
  }, [pageData.time] );

  // 타이머 감소 처리 (1초마다)
  useEffect( () => {
    if (!isRunning) return;

    const interval = setInterval( () => {
      setTimeLeft( prev => Math.max( prev - 1, 0 ) );
    }, 1000 );

    return () => clearInterval( interval );
  }, [timeLeft, openModal, isRunning] );

  // timeLeft가 0이 되면 기록 저장 함수 호출
  useEffect( () => {
    if (timeLeft === 0 && isRunning) {
      const handleTimerEnd = async () => {
        await saveReadingRecord();
        setIsRunning( false );
      };
      handleTimerEnd();
    }
  }, [timeLeft, isRunning] );

  WarningScreen()

  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <>
      <article
        className="relative flex flex-col justify-center flex-1 aspect-square text-center bg-stopWatchTimer_Item_Bg rounded-full">
        {/* SVG 애니메이션 */}
        <svg className="absolute inset-0" viewBox="0 0 126 126">
          <circle cx="63" cy="63" r={radius} className="stroke-timeLeft_Color" fill="none" strokeWidth="6"/>
          <motion.circle
            cx="63" cy="63" r={radius}
            fill="none" strokeWidth="6"
            strokeDasharray={circumference} // 원의 총 길이
            strokeDashoffset={progress} // 시간이 지남에 따라 점점 사라짐
            strokeLinecap="square"
            animate={{ strokeDashoffset: circumference * (timeLeft / ((pageData.time ?? 0) * 60)) }}
            transition={{ duration: 1, ease: "linear" }} // 부드러운 감소 효과
            className="stroke-timeLeft_Bg"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} // 시작 위치를 상단으로 변경
          />
        </svg>
        {/* 시간 표시 */}
        <span className="flex justify-center items-end flex-1 text-2xl">{pageData.time || '시간 값 오류'}분</span>
        <div className="flex gap-2 flex-1 justify-center">
          <p className="text-6xl align-bottom">{String( Math.floor( timeLeft / 60 ) ).padStart( 2, '0' )}</p>
          <span className="text-5xl self-start">:</span>
          <p className="text-6xl self-start">{String( timeLeft % 60 ).padStart( 2, '0' )}</p>
        </div>
        {/* 정지 버튼 */}
        <div className="flex flex-1 mb-4 gap-5 justify-center items-center ">
          <button
            className="active:scale-95 duration-100 hover:text-icon_TimeIcon_Hover hover:border-icon_TimeIcon_Hover z-[1] flex justify-center items-center rounded-full w-16 h-16 p-3.5 text-icon_stop border-4 border-stopIconBorder"
            onClick={() => {
              stopTimer()
            }}
          >
            <IconStop width="100%" height="100%"/>
          </button>
        </div>
      </article>
    </>
  )
}