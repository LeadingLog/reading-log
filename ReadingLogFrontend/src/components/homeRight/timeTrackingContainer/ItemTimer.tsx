import IconStop from "../../../assets/Icon-stop.svg?react"
import { usePageStore } from "../../../store/pageStore.ts";
import { useModalStore } from "../../../store/modalStore.ts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ItemTimer() {

  const {pageData} = usePageStore();
  const {openModal} = useModalStore();

  // 독서 종료 모달
  const stopTimer = () => {
    openModal("ModalNotice", {
      title: "독서를 종료하시나요?",
      subTitle: "종료 시 시간이 저장돼요",
      cancelText: "아니요 더 읽을래요!",
      confirmText: "네 종료할게요!",
      reverseBtn: true,
      onConfirm: () => {
        setTimeLeft(0)
        openModal("ModalNotice", {
          title: "독서시간 저장 완료!",
          onlyClose: true,
        })
      }
    })
  }

  // 타이머 시간 표시

  const [timeLeft, setTimeLeft] = useState(pageData.time || 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress =
    pageData.time && pageData.time > 0
      ? circumference * (timeLeft / pageData.time)
      : 0;
  // pageData.time이 바뀔 경우 초기화
  useEffect(() => {
    setTimeLeft(pageData.time || 0);
  }, [pageData.time]);

  useEffect(() => {
    // if (timeLeft <= 0) {
    //   setTimeLeft(0);
    //   openModal("ModalNotice", {
    //     title: "타이머가 종료되었습니다",
    //     subTitle: "시간이 저장되었습니다.",
    //     cancelText: "닫기",
    //     onlyClose: true,
    //   })
    //   return;
    // }

    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, openModal]);

  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <>
      <article
        className="relative flex flex-col justify-center flex-1 aspect-square text-center  bg-stopWatchTimer_Item_Bg  rounded-full">
        {/* SVG 애니메이션 */}
        <svg className="absolute inset-0" viewBox="0 0 126 126">
          <circle cx="63" cy="63" r={radius} className="stroke-timeLeft_Color" fill="none" strokeWidth="6" />
          <motion.circle
            cx="63" cy="63" r={radius}
            fill="none" strokeWidth="6"
            strokeDasharray={circumference} // 원의 총 길이
            strokeDashoffset={progress} // 시간이 지남에 따라 점점 사라짐
            strokeLinecap="square"
            animate={{ strokeDashoffset: circumference * (timeLeft / (pageData.time ?? 0)) }}
            transition={{ duration: 1, ease: "linear" }} // 부드러운 감소 효과
            className="stroke-timeLeft_Bg"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} // 시작 위치를 상단으로 변경
          />
        </svg>
        {/* 시간 표시 */}
        <span className="flex justify-center items-end flex-1 text-2xl">{pageData.time || '시간 값 오류'}분</span>
        <div className="flex gap-2 flex-1 justify-center">
          <p className="text-6xl align-bottom">{String(Math.floor(timeLeft / 60)).padStart(2, '0')}</p>
          <span className="text-5xl self-start">:</span>
          <p className="text-6xl self-start">{String(timeLeft % 60).padStart(2, '0')}</p>
        </div>
        {/* 정지 버튼 */}
        <div className="flex flex-1 mb-4 gap-5 justify-center items-center ">
          <button
            className=" hover:text-timeIconHover z-[1] hover:border-timeIconHover flex justify-center items-center rounded-full w-16 h-16 p-3.5 text-icon_stop border-4 border-stopIconBorder"
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

