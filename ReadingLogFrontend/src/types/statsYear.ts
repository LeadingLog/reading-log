// 연별 통계 요청 파라미터 타입
export interface fetchStatsYearApiParams {
  userId?: number;
  year?: number;
}

// 연별 통게 요청 응답 타입
export interface StatsYearList {
  month: number;
  complete: number;
  height?: number
}