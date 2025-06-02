import { ReadingListAddBody } from "./readingListAdd.ts";

export interface AladinApiItem {
  userId: number;
  title?: string;
  author?: string;
  isbn13?: string;
  link?: string;
  cover?: string;
  bookStatus?: string;
  readStartDt?: string;
  readEndDt?: string;
}

export interface BookSearchResultProps {
  bookSearchResultList: ReadingListAddBody[];
  searchValue: string;
  isLoading?: boolean;
  totalResults : number
}

