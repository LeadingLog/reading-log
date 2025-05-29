// 독서 상태
import { ReadStatus } from "./readStatus.ts";

// 월별 독서 리스트 타입

export interface monthReadingListItem {
  bookId: number;
  title: string;
  author: string;
  isbn13: string;
  cover: string;
  link?: string;
  isFavorite?: boolean; // optional
  readStatus: ReadStatus;
  createdAt?: number;
}

// 독서 리스트 요청 파라미터 타입
export interface fetchThisMonthReadingListParams {
  userId: number,
  year?: number,
  month?: number,
  page?: number,
  size?: number
}

// 정렬 우선순위 객체
export const readOrder: Record<ReadStatus, number> = {
  reading: 0, // 독서 중
  noRead: 1, // 읽기 전
  complete: 2 // 완독
};