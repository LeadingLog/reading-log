/* 도서 정보 관련  */
export interface BookListType {
  bookId?: number
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