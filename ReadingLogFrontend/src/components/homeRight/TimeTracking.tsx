import IconPlay from "../../assets/Icon-play.svg?react"
import IconPause from "../../assets/Icon-pause.svg?react"
import IconStop from "../../assets/Icon-stop.svg?react"

export default function TimeTracking() {
  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <span className="flex relative text-xl font-bold">
        <p className="absolute top-0 bottom-0 left-0 w-1.5 h-full bg-titleMarker"></p>
        <span className="pl-2.5">
          독서 타임 트랙킹 - <span>스탑워치</span>
        </span>
      </span>
      <article className="flex flex-col gap-4 justify-between p-6 bg-trackingBg rounded-xl">
        <section className="flex flex-col text-center">
          <span className="text-2xl">책 체목제목</span>
          <span>책 저자</span>
        </section>
        <section className="flex flex-1 gap-6">
          <article className="flex-1 bg-trackingBook rounded-xl">
            책 사진
          </article>
          <article className="flex flex-col justify-center flex-1 aspect-square text-center p-2 bg-stopWatchTimerBg  rounded-full">
            <span className="flex justify-center items-end flex-1 text-2xl">60분</span>
            <div className="flex gap-2 flex-1 justify-center">
              <p className="text-6xl align-bottom">00</p>
              <span className="text-5xl self-start">:</span>
              <p className="text-6xl self-start">00</p>
            </div>
            <div className="flex flex-1 mb-4 gap-5 justify-center items-center ">
              <button className=" hover:text-timeIconHover hover:border-timeIconHover flex justify-center items-center rounded-full w-16 h-16 p-3.5 text-stopIcon border-4 border-pauseIconBorder">
                <IconStop width="full" height="full"/>
              </button>
            </div>
          </article>
        </section>
      </article>
      {/*<article className="flex flex-col flex-1 gap-4 justify-between p-6 bg-trackingBg rounded-xl">*/}
      {/*  <section className="flex flex-col text-center">*/}
      {/*    <span className="text-2xl">책 체목제목</span>*/}
      {/*    <span>책 저자</span>*/}
      {/*  </section>*/}
      {/*  <section className="flex flex-1 gap-6">*/}
      {/*    <article className="flex-1 bg-trackingBook rounded-xl">*/}
      {/*      책 사진*/}
      {/*    </article>*/}
      {/*    <article className="flex flex-col gap-4 flex-[2] p-4 bg-stopWatchTimerBg rounded-xl">*/}
      {/*      <div className="flex gap-2 justify-center items-center">*/}
      {/*        <p className="relative mt-2 text-6xl*/}
      {/*         before:content-['HOUR'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>*/}
      {/*        <span className="text-5xl">:</span>*/}
      {/*        <p className="relative mt-2 text-6xl*/}
      {/*         before:content-['MINUTE'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>*/}
      {/*        <span className="text-5xl">:</span>*/}
      {/*        <p className="relative mt-2 text-6xl*/}
      {/*         before:content-['SECOND'] before:text-[10px] before:absolute before:-top-1.5 before:left-1/2 before:transform before:-translate-x-1/2">00</p>*/}
      {/*      </div>*/}
      {/*      <div className="flex gap-5 flex-1 justify-center items-center">*/}
      {/*        <button className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-playIcon border-4 border-playIconBorder">*/}
      {/*          <IconPlay width="full" height="full"/>*/}
      {/*        </button>*/}
      {/*        <button className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-pauseIcon border-4 border-stopIconBorder">*/}
      {/*          <IconPause width="full" height="full"/>*/}
      {/*        </button>*/}
      {/*        <button className="hover:text-timeIconHover hover:border-timeIconHover p-4 flex justify-center items-center rounded-full w-20 h-20 text-stopIcon border-4 border-pauseIconBorder">*/}
      {/*          <IconStop width="full" height="full"/>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </article>*/}
      {/*  </section>*/}
      {/*</article>*/}
      <article className="flex-1 overflow-y-scroll">
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-end items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 left-1 w-5 bg-toggleReading rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font">독서중</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex justify-end items-center bg-toggleNoReadingBg py-0.5 px-2 rounded-full">
              <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
          <li className="flex justify-between p-3.5 rounded-xl bg-readingListBg">
            <span className="text-xl">책이름</span>
            <div className="relative flex w-[70px] justify-start items-center bg-toggleReadStatusBg rounded-full">
              <span className="absolute top-1 bottom-1 right-1 w-5 bg-toggleComplete rounded-full"></span>
              <span className="w-[calc(100%-20px)] text-center text-[13px] font-semibold">완독</span>
            </div>
          </li>
        </ul>
      </article>
    </section>
  )
}