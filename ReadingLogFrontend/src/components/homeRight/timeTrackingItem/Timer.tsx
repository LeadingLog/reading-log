import IconStop from "../../../assets/Icon-stop.svg?react"

export default function Timer() {
  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <article className="flex flex-col gap-4 justify-between p-6 bg-trackingBg rounded-xl">
      <section className="flex flex-col text-center">
        <span className="text-2xl">책 체목제목</span>
        <span>책 저자</span>
      </section>
      <section className="flex flex-1 gap-6">
        <article className="flex-1 bg-trackingBook rounded-xl">
          책 사진
        </article>
        <article
          className="flex flex-col justify-center flex-1 aspect-square text-center p-2 bg-stopWatchTimerBg  rounded-full">
          <span className="flex justify-center items-end flex-1 text-2xl">60분</span>
          <div className="flex gap-2 flex-1 justify-center">
            <p className="text-6xl align-bottom">00</p>
            <span className="text-5xl self-start">:</span>
            <p className="text-6xl self-start">00</p>
          </div>
          <div className="flex flex-1 mb-4 gap-5 justify-center items-center ">
            <button
              className=" hover:text-timeIconHover hover:border-timeIconHover flex justify-center items-center rounded-full w-16 h-16 p-3.5 text-stopIcon border-4 border-pauseIconBorder">
              <IconStop width="100%" height="100%"/>
            </button>
          </div>
        </article>
      </section>
    </article>
  )

}

