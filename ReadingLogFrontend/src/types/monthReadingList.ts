// 독서 상태
import { ReadStatus } from "./readStatus.ts";

// 월별 독서 리스트 타입

export interface monthReadingListItem {
  bookId: number;
  userId: number;
  bookTitle: string;
  author: string;
  isbn13?: string;
  link?: string;
  coverImgUrl?: string;
  bookStatus: ReadStatus;
  readStartDt?: string;
  readEndDt?: string;
}

// 독서 리스트 요청 파라미터 타입
export interface fetchMonthReadingListParams {
  userId: number,
  year: number,
  month: number,
  page?: number,
  size?: number
}

// 독서 리스트 요청 파라미터 타입
export interface fetchThisMonthReadingListParams {
  userId: number,
  page?: number,
  size?: number
}

// 정렬 우선순위 객체
export const readOrder: Record<ReadStatus, number> = {
  IN_PROGRESS: 0, // 독서 중
  NOT_STARTED: 1, // 읽기 전
  COMPLETED: 2 // 완독
};