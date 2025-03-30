import IconPlay from "../../../assets/Icon-play.svg?react"
import IconPause from "../../../assets/Icon-pause.svg?react"
import IconStop from "../../../assets/Icon-stop.svg?react"

export default function StopWatch() {
  return (
    // 독서 타임 트랙킹 - 스탑워치 인 경우
    <article className="flex flex-col flex-1 gap-4 justify-between p-6 bg-trackingBg rounded-xl">
      <section className="flex flex-col text-center">
        <span className="text-2xl">책 체목제목</span>
        <span>책 저자</span>
      </section>
      <section className="flex flex-1 gap-6">
        <article className="flex-1 bg-trackingBook rounded-xl">
          책 사진
        </article>
        <article className="flex flex-col gap-4 flex-[2] p-4 bg-stopWatchTimerBg rounded-xl">
          <div className="flex gap-2 justify-center items-center">
            <p className="relative mt-2 text-6xl
                   before:content-['HOUR'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>
            <span className="text-5xl">:</span>
            <p className="relative mt-2 text-6xl
                   before:content-['MINUTE'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>
            <span className="text-5xl">:</span>
            <p className="relative mt-2 text-6xl
                   before:content-['SECOND'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>
          </div>
          <div className="flex gap-5 flex-1 justify-center items-center">
            <button
              className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-playIcon border-4 border-playIconBorder">
              <IconPlay width="100%" height="100%"/>
            </button>
            <button
              className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-pauseIcon border-4 border-stopIconBorder">
              <IconPause width="100%" height="100%"/>
            </button>
            <button
              className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-stopIcon border-4 border-pauseIconBorder">
              <IconStop width="100%" height="100%"/>
            </button>
          </div>
        </article>
      </section>
    </article>
  )
}