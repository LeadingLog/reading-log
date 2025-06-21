import { ReadingListAddApiRequestBody } from "./readingListAdd.ts";

export interface AladinApiItem {
  userId: number | null;
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
  bookSearchResultList: ReadingListAddApiRequestBody[];
  searchValue: string;
  isLoading?: boolean;
  totalResults: number
}

