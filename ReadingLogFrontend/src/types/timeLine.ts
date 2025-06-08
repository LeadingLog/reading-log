// 타입라인 도서 갯수 요청 파라미터 타입
export interface fetchTimeLineReadingListParams {
  userId: number | null;
  year: number
}

export interface fetchAllReadingTimeParams {
  userId: number | null;
}

// 받아온 해당 년도 월별 정보 타입
export interface TimelineEntry {
  name: string;
  month: number;
  col: number;
  row: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}