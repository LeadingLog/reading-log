import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useModalStore } from "../../../store/modalStore.ts";
import { usePageStore } from "../../../store/pageStore.ts";
import IconPlay from "../../../assets/Icon-play.svg?react"
import IconPause from "../../../assets/Icon-pause.svg?react"
import IconStop from "../../../assets/Icon-stop.svg?react"
import { useUserStore } from "../../../store/userStore.ts";
import { createReadingRecord } from "../../../utils/createReadingRecord.ts";
import { saveReadingRecordApi } from "../../../api/readingRecord.ts";
import { useReadingBookStore } from "../../../store/useReadingInfoStore.ts";
import { useGlobalChangeStore } from "../../../store/useGlobalChangeStore.ts";
import { WarningScreen } from "../../common/WarningScreen.tsx";


export default function ItemStopWatch() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const { params } = usePageStore();
  const bookData = params.TimeTracking?.bookData;
  const { userId } = useUserStore();
  const { openModal, closeModal, closeAllModals } = useModalStore();
  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>( undefined );  // 1️⃣ interval ID 저장용
  const [time, setTime] = useState( { hour: 0, minute: 0, second: 0 } ); // 타이머 시간 저장
  const [play, setPlay] = useState<boolean>( true ); // 시작 & 일시정지 버튼 토글
  const [startTimestamp, setStartTimestamp] = useState<Date | null>( null ); // 스탑워치 시작 시간

  const setModalIsLoading = useModalStore( state => state.setModalIsLoading );
  const { triggerChange } = useGlobalChangeStore.getState();
  const { endReadingBook } = useReadingBookStore();

  // 스탑워치 1초마다 시간 증가
  const plusSecond = () => {
    setTime( ({ hour, minute, second }) => {
      let newSecond = second + 1;
      let newMinute = minute;
      let newHour = hour;

      if (newSecond >= 60) {
        newSecond = 0;
        newMinute++;
      }

      if (newMinute >= 60) {
        newMinute = 0;
        newHour++;
      }
      // console.log(`${newHour}, ${newMinute}, ${newSecond}`);
      return { hour: newHour, minute: newMinute, second: newSecond };
    } )
  }

  /* 스탑워치 시작 & 일시정지 */
  const playOrPause = () => {
    if (intervalRef.current === undefined) {  // 이미 실행 중이 아니라면
      setPlay( true );
      intervalRef.current = setInterval( plusSecond, 1000 ); // 2️⃣ interval ID 저장
    } else {
      setPlay( false );
      clearInterval( intervalRef.current ); // 3️⃣ 일시정지
      intervalRef.current = undefined; // 정지 후 ID 초기화
    }
  }

  /* 정지 버튼 클릭 시  */
  const stopTimer = () => {
    setPlay( false );
    clearInterval( intervalRef.current ); // 3️⃣ 일시정지

    openModal( "ModalNotice", {
      title: "독서를 종료하시나요?",
      subTitle: "종료 시 시간이 저장돼요",
      cancelText: "아니요 더 읽을래요!",
      confirmText: "네 종료할게요!",
      reverseBtn: true,
      loadingMessage: "저장중",
      onConfirm: async () => {
        setModalIsLoading( true )
        await saveReadingRecord(); // 저장 요청 보내기
      },
      onCancel: () => {
        setPlay( true );
        intervalRef.current = setInterval( plusSecond, 1000 ); // 2️⃣ interval ID 저장
      }
    } );
  }

  /* 독서 시간 기록 */
  const saveReadingRecord = async () => {
    if (startTimestamp === null) {
      handleReadingRecordFail( "독서 시간 기록에 실패하였습니다. 다시 시도해주세요.===" );
      return;
    }
    if (userId === null) {
      console.warn( "User ID가 없습니다." );
      return;
    }

    const readingRecord = createReadingRecord( {
      bookId: bookData?.bookId ?? 0,
      userId,
      startTimestamp,
      time: {
        hour: time.hour,
        minute: time.minute,
        second: time.second
      }
    } );

    try {
      const data = await saveReadingRecordApi( readingRecord );
      if (data.success) {
        endReadingBook()
        triggerChange( 'MyReadingList' )
        openModal( "ModalNotice", {
          title: "독서시간 저장 완료",
          subTitle: "수고하셨어요",
          onlyConfirm: true,
          confirmText: "닫기",
          onConfirm: () => {
            closeAllModals();
            setRightContent( 'TimeTracking', { // 우측 콘텐츠 변경
              TimeTracking: { tab: 'onlyMonthReadingList' },
            } );
            // 초기화
            setTime( { hour: 0, minute: 0, second: 0 } );
            setPlay( false );
            clearInterval( intervalRef.current );
            intervalRef.current = undefined;
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

  const startTime = () => {
    if (!intervalRef.current) { // 이미 실행 중이 아니라면
      intervalRef.current = setInterval( plusSecond, 1000 ); // 2️⃣ interval ID 저장
    }
    const now = new Date();
    setStartTimestamp( now );
    console.log( "스탑워치 시작 시간:", now );
  };

  WarningScreen()
  // 모달이 열리면서 독서 시작
  useEffect( () => {
    startTime();
    console.log( '독서 시작' );
  }, [] );

  // 시간 경과 시 세션 연장 요청
  useEffect( () => {
    if (time.hour > 0) {
      console.log( `스톱워치 :${time.hour}시간으로 바뀜 → 세션 연장 요청` );

      const extendSession = async () => {
        try {
          const response = await axios.get( `${serverUrl}/user/extend_session` );
          if (response.data.success) {
            console.log( `${response.data.success}, 세션 연장 성공` );
          } else {
            console.log( `${response.data.success}, 세션 연장 실패` );
          }
        } catch (err) {
          console.error( '세션 연장 실패:', err );
        }
      };

      extendSession().catch( (e) =>
        console.error( 'extendSession 실행 중 에러 발생:', e )
      );
    }
  }, [time.hour] );

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

  return (
    // 독서 타임 트랙킹 - 스탑워치 인 경우
    <>
      <article className="flex flex-col gap-4 flex-[2] p-4 bg-stopWatchTimer_Item_Bg rounded-xl">
        <div className="flex gap-2 justify-center items-center">
          <p className="relative mt-2 text-6xl
                   before:content-['HOUR'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String( time.hour ).padStart( 2, "0" )}
          </p>
          <span className="text-5xl">:</span>
          <p className="relative mt-2 text-6xl
                   before:content-['MINUTE'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String( time.minute ).padStart( 2, "0" )}
          </p>
          <span className="text-5xl">:</span>
          <p className="relative mt-2 text-6xl
                   before:content-['SECOND'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String( time.second ).padStart( 2, '0' )}
          </p>
        </div>
        <div className="flex gap-5 flex-1 justify-center items-center">
          <button
            className="hover:text-icon_TimeIcon_Hover hover:border-icon_TimeIcon_Hover p-3.5 flex justify-center items-center rounded-full w-16 h-16 text-icon_Play border-4 border-icon_pause_Border"
            onClick={() => {
              playOrPause()
            }}
          >
            {play ? <IconPause width="100%" height="100%"/> : <IconPlay width="100%" height="100%"/>}
          </button>
          <button
            className="hover:text-icon_TimeIcon_Hover hover:border-icon_TimeIcon_Hover p-3.5 flex justify-center items-center rounded-full w-16 h-16 text-icon_stop border-4 border-icon_pause"
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