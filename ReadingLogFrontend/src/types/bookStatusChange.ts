/*
 사용처 :
 - 독서 계획 기간 변경 시 API 요청 바디 타임
 - 이번 달 독서 리스트 독서중, 완독 토글 버튼 API 요청 바디 타임

 */

export interface bookStatusChangeBody {
  userId: number | null;
  bookId: number | null;
  bookStatus: "INTERESTED" | "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
  readStartDt?: string;
  readEndDt?: string;
}