import ItemTimer from "./ItemTimer.tsx";

export default function BoxTimer() {

  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <>
      <article className="flex flex-col gap-4 justify-between p-6 bg-timer_Box_Bg rounded-xl">
        <section className="flex flex-col text-center">
          <span className="text-2xl">책 체목제목</span>
          <span>책 저자</span>
        </section>
        <section className="flex flex-1 gap-6">
          <article className="flex-1 bg-trackingBook_Bg rounded-xl">
            책 사진
          </article>
          <ItemTimer/>
        </section>
      </article>
      <div className="bg-tracking_Box_Bottom_Divide_Bg my-4 h-1 rounded-full"></div>
    </>
  )

}

