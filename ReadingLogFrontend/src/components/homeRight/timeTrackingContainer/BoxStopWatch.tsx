import ItemStopWatch from "./ItemStopWatch.tsx";
import { usePageStore } from "../../../store/pageStore.ts";

export default function BoxStopWatch() {
  const { params } = usePageStore();
  const bookData = params.TimeTracking?.bookData;

  return (
    // 독서 타임 트랙킹 - 스탑워치 인 경우
    <>
      <article className="relative flex flex-col gap-4 p-6 mb-6 bg-stopWatch_Box_Bg rounded-xl
      after:content-[''] after:absolute after:h-1 after:-bottom-3.5 after:left-0 after:right-0 after:rounded-full after:bg-tracking_Box_Bottom_Divide_Bg">
        <section className="flex flex-col text-center">
          <span className="text-2xl">
            {bookData?.bookTitle}
          </span>
          <span onClick={stop}>{bookData?.author}</span>
        </section>
        <section className="flex flex-1 gap-6">
          <article className="flex-1 bg-trackingBook_Bg rounded-xl">
            <img src={bookData?.cover} alt={bookData?.bookTitle}/>
          </article>
          <ItemStopWatch/>
        </section>
      </article>
    </>
  )
}