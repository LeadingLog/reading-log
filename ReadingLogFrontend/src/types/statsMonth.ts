// 월별 통계 요청 파라미터 타입
export interface fetchStatsMonthApiParams {
  userId: number | null;
  year?: number;
  month?: number;
}

// 월별 통게 요청 응답 타입
export interface StatsMonthList {
  bookId: number;
  title: string;
  bookStatus: string;
  bookTime: number;
}