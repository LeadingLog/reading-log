import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react"

export default function BookImgList() {

  return (
    <section className="flex flex-col flex-1 gap-4 overflow-hidden">
      {/* 책 썸네일 아이콘 리스트 */}
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