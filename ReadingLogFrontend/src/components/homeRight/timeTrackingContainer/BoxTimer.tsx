import ItemTimer from "./ItemTimer.tsx";

export default function BoxTimer() {

  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <>
      <article className="
      relative flex flex-col gap-4 p-6 mb-6 bg-timer_Box_Bg rounded-xl
      after:content-[''] after:absolute after:h-1 after:-bottom-3.5 after:left-0 after:right-0 after:rounded-full after:bg-tracking_Box_Bottom_Divide_Bg"
      >
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
    </>
  )

}

