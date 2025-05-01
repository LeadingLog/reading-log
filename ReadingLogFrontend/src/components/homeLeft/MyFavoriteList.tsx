import BookImgList from "../common/BookImgList.tsx";
import CustomScrollbar from "../common/CustomScrollbar.tsx";

export default function MyFavoriteList() {
  return (
    // 책 썸네일 아이콘 리스트
    <CustomScrollbar
      containerClassName="grid grid-cols-3 gap-6 content-start flex-1"
      scrollbarClassName="bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color"
      // scrollbarWidth=""
    >
      <BookImgList/>
    </CustomScrollbar>
  )
}