// 관심도서 요청 파라미터 타입
import { TabType } from "./myReadingList.ts";

export interface fetchMyFavoriteListParams {
  userId: number | null;
  tabType: TabType;
  page?: number;
  size?: number;
}
