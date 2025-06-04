// 내 독서 목록 탭 타입
import { ReadStatus } from "./readStatus.ts";

export type TabType = 0 | 1 | 2 | 3 | 4;

// 탭 라벨 매핑
export const tabLabels: Record<TabType, string> = {
  0: "전체",
  1: "독서중",
  2: "읽기전",
  3: "완독",
  4: "관심도서"
};

// readStatus 객체를 Record 타입으로 정의
export const readStatus: Record<ReadStatus, string> = {
  IN_PROGRESS: "독서중",
  NOT_STARTED: "읽기전",
  COMPLETED: "완독",
  INTERESTED: "관심도서",
};

// 내 독서 목록 요청 파라미터 타입
export interface fetchMyReadingListParams {
  userId: number | null;
  tabType: TabType;
  size?: number;
  page?: number;
  query?: string;
}