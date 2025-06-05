
/* 등록할 적 없는 도서 & 같은 도서 중복 추가 인 경우 일때만 사용 => 독서 게획 추가 & 관심 도서로 추가 요청 시 요청 바디 타입 */

export interface ReadingListAddApiRequestBody {
  userId: number | null;
  bookTitle: string;
  author: string;
  isbn13?: string;
  link?: string;
  coverImgUrl?: string;
  bookStatus?: string;
  readStartDt?: string;
  readEndDt?: string;
}