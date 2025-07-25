import ItemTimer from "./ItemTimer.tsx";
import { usePageStore } from "../../../store/pageStore.ts";

export default function BoxTimer() {
  const { params } = usePageStore();
  const bookData = params.TimeTracking?.bookData;

  return (
    // 독서 타임 트랙킹 - 타이머 인 경우
    <>
      <article className="
      relative flex flex-col gap-4 p-6 mb-6 bg-timer_Box_Bg rounded-xl
      after:content-[''] after:absolute after:h-1 after:-bottom-3.5 after:left-0 after:right-0 after:rounded-full after:bg-tracking_Box_Bottom_Divide_Bg"
      >
        <section className="flex flex-col text-center">
          <span className="text-2xl">{bookData?.bookTitle}</span>
          <span>{bookData?.author}</span>
        </section>
        <section className="flex flex-1 gap-6">
          <article className="flex justify-center aspect-square items-center flex-1 bg-trackingBook_Bg rounded-xl overflow-hidden">
            {bookData?.cover ? (
              <img src={bookData?.cover} alt={bookData?.bookTitle} className="w-full h-full object-cover"/>
            ) : (
              <div className="flex w-full justify-center px-2 h-full items-center">
                <span className="text-3xl font-bold text-imgBook_Item_No_Img_Text">No Image</span>
              </div>
            )}
          </article>
          <ItemTimer/>
        </section>
      </article>
    </>
  )

}

