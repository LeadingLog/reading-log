// 독서 상태 타입을 정의
export type ReadStatus = 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED' | 'INTERESTED';

/* 이번 달 독서 리스트 독서중 & 완독 토글 로 넘기는 props 타입 */
export type itemReadStatusParams = {
  bookId: number;
  bookStatus: 'IN_PROGRESS' | 'NOT_STARTED' | 'COMPLETED' | 'INTERESTED';
  onStatusChange: () => void;  
}