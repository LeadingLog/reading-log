export interface ReadingListAddBody {
  userId: number;
  bookTitle?: string;
  author?: string;
  isbn13?: string;
  link?: string;
  coverImgUrl?: string;
  bookStatus?: string;
  readStartDt?: string;
  readEndDt?: string;
}