export interface AladinApiItem {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  isFavorite?: boolean; // optional
  link?: string;
}

export interface BookSearchResultProps {
  bookSearchResultList: AladinApiItem[];
  searchValue: string;
  isLoading?: boolean;
}
