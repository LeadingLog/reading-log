import IconPlay from "../../../assets/Icon-play.svg?react"
import IconPause from "../../../assets/Icon-pause.svg?react"
import IconStop from "../../../assets/Icon-stop.svg?react"
import { useModalStore } from "../../../store/modalStore.ts";
import { useEffect, useRef, useState } from "react";

export default function ItemStopWatch() {

  const {openModal} = useModalStore();

  /* 시작 & 일시정지 버튼 토글 관련 */
  const [play, setPlay] = useState<boolean>(true)

  const playOrPause = () => {
    if (intervalRef.current === undefined) {  // 이미 실행 중이 아니라면
      setPlay(true)
      intervalRef.current = setInterval(plusSecond, 1000); // 2️⃣ interval ID 저장
    } else {
      setPlay(false)
      clearInterval(intervalRef.current); // 3️⃣ 일시정지
      intervalRef.current = undefined; // 정지 후 ID 초기화
    }
  }

  /* 정지 버튼 클릭 시  */
  const stopTimer = () => {
    openModal("ModalNotice", {
      title: "독서를 종료하시나요?",
      subTitle: "종료 시 시간이 저장돼요",
      cancelText: "아니요 더 읽을래요!",
      confirmText: "네 종료할게요!",
      reverseBtn: true,
      onConfirm: () => {
        openModal("ModalNotice", {
          title: "독서시간 저장 완료!",
          onlyClose: true,
        })
        setSeconds(0) // 초 초기화
        setMinute(0)  // 분 초기화
        setHour(0)    // 시간 초기화
        setPlay(false) // 정지 버튼으로 변경
        clearInterval(intervalRef.current); // 시간 정지
        intervalRef.current = undefined; // 정지 후 ID 초기화
      }
    })
  }
  /* 스탑워치 시간 관련 */
  const [seconds, setSeconds] = useState(0); // 초
  const [minute, setMinute] = useState(0); // 분
  const [hour, setHour] = useState(0); // 시간
  const intervalRef = useRef<number | undefined>(undefined);  // 1️⃣ interval ID 저장용

  if (seconds === 5) { // 60초가 되면 분 요소 1 올리기
    setSeconds(0)
    setMinute(minute + 1)
  }
  if (minute === 2) { // 60분이 되면 1시간 올리기
    setMinute(0)
    setHour(hour + 1)
  }
  const plusSecond = () => { // 1초씩 올림
    setSeconds(prev => prev + 1)
  }
  const startTime = () => {
    if (!intervalRef.current) { // 이미 실행 중이 아니라면
      intervalRef.current = setInterval(plusSecond, 1000); // 2️⃣ interval ID 저장
    }
  };
  useEffect(() => {
    startTime()
    console.log('독서 시작!');
  }, []);

  return (
    // 독서 타임 트랙킹 - 스탑워치 인 경우
    <>
      <article className="flex flex-col gap-4 flex-[2] p-4 bg-stopWatchTimer_Item_Bg rounded-xl">
        <div className="flex gap-2 justify-center items-center">
          <p className="relative mt-2 text-6xl
                   before:content-['HOUR'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String(hour).padStart(2, "0")}
          </p>
          <span className="text-5xl">:</span>
          <p className="relative mt-2 text-6xl
                   before:content-['MINUTE'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String(minute).padStart(2, "0")}
          </p>
          <span className="text-5xl">:</span>
          <p className="relative mt-2 text-6xl
                   before:content-['SECOND'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2"
          >
            {String(seconds).padStart(2, '0')}
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