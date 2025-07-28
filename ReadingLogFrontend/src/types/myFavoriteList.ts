// 관심도서 요청 파라미터 타입

export interface fetchMyFavoriteListParams {
  userId: number | null;
  tabType: 4;
  page?: number;
  size?: number;
}
