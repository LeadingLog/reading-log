import IconReading from "../../assets/Icon-reading.svg?react";
import IconReadComplete from "../../assets/Icon-readcomplete.svg?react"
import IconFavorite from "../../assets/Icon-favorite.svg?react"
export default function BookImgList() {

  return (
    <section className="flex flex-col flex-1 gap-4 overflow-hidden">
      {/* 책 썸네일 아이콘 리스트 */}
      <article className="flex-1 overflow-y-scroll">
        <ul className="grid grid-cols-3 gap-6">
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_Reading_Bg">
              <span className="text-xs">독서중</span>
              <span className="flex justify-center items-center text-imgBook_Icon_Color mt-[1px]">
                <IconReading className="text-imgBook_"/>
              </span>
            </div>
            <div className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
              <IconFavorite width="100%" height="100%"/>
            </div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_Complete_Bg">
              <span className="text-xs">완독</span>
              <span className="flex justify-center items-center text-imgBook_Icon_Color mt-[1px]">
                <IconReadComplete className="text-imgBook_"/>
              </span>
            </div>
            <div></div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_NoRead_Bg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_NoRead_Bg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_NoRead_Bg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_NoRead_Bg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
          <li className="relative aspect-square bg-imgBook_Item_Bg">
            <div
              className="absolute left-2 top-2 gap-1 flex justify-center items-center px-2 py-1 rounded-lg bg-imgBook_Item_NoRead_Bg">
              <span className="text-xs">읽기전</span>
            </div>
          </li>
        </ul>
      </article>
    </section>
  )
}