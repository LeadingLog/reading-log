import { ReadStatus } from "./readStatus.ts";

export interface AladinApiItem {
  title: string;
  author: string;
  isbn13: string;
  cover: string;
  isFavorite?: boolean; // optional
  link?: string;
  readStatus?: ReadStatus
}

export interface BookSearchResultProps {
  bookSearchResultList: AladinApiItem[];
  searchValue: string;
  isLoading?: boolean;
  totalResults : number
}

