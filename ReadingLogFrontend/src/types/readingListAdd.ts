export interface ReadingListAddBody {
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