import IconSearch from "../../assets/Icon-search.svg?react";
import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react"

export default function MyBookList() {

  return (
    <section className="flex flex-col flex-1 gap-4 overflow-hidden">
      <ul className="flex gap-5">
        <li
          className="flex-1 text-xl font-semibold text-myBookListActiveTabText px-2 py-1 text-center rounded-full bg-myBookListActiveTabBg">전체
        </li>
        <li
          className="flex-1 text-xl text-myBookListInActiveTabText px-2 py-1 text-center rounded-full bg-myBookListInActiveTabBg">독서중
        </li>
        <li
          className="flex-1 text-xl text-myBookListInActiveTabText px-2 py-1 text-center rounded-full bg-myBookListInActiveTabBg">완독
        </li>
        <li
          className="flex-1 text-xl text-myBookListInActiveTabText px-2 py-1 text-center rounded-full bg-myBookListInActiveTabBg">읽기전
        </li>
      </ul>
      <article
        className="flex relative justify-between items-center border-4 bg-searchBg border-borderColor_4 rounded-full">
        <span
          className="flex w-8 h-full p-1 justify-center items-center text-iconColor_5 ">
          <IconSearch width="full" height="full"/>
        </span>
        <input type="search" className="w-full h-full p-1 bg-searchBg rounded-e-full" placeholder="어떤 책을 찾으시나요?"/>
      </article>
      <article className="flex-1 overflow-y-scroll">
        <ul className="grid grid-cols-3 gap-6">
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemReadingBg">
              <span className="text-xs">독서중</span>
              <span className="flex justify-center items-center mt-[1px]">
                <IconReading className="text-bookImgIconColor"/>
              </span>

            </div>
            <div></div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemCompleteBg">
              <span className="text-xs">완독</span>
              <span className="flex justify-center items-center mt-[1px]">
                <IconReadComplete className="text-bookImgIconColor"/>
              </span>
            </div>
            <div></div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemNoReadBg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemNoReadBg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemNoReadBg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemNoReadBg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-bookImgItemNoReadBg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
        </ul>
      </article>
    </section>
  )
}