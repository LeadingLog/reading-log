// 관심도서 요청 파라미터 타입
export interface fetchMyFavoriteListParams {
  userId: number | null;
  page?: number;
  size?: number;
}
