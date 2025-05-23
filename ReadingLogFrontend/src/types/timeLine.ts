// 타입라인 도서 갯수 요청 파라미터 타입
export interface fetchTimeLineReadingListParams {
  userId: number,
  year: number
}

// 받아온 해당 년도 월별 정보 타입
export interface TimelineEntry {
  month: number;
  noRead: number;
  reading: number;
  complete: number;
}