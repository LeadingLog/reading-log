export interface monthReadingListItem {
  title: string;
  author: string;
  isbn13: string;
  cover: string;
  link?: string;
  isFavorite?: boolean; // optional
  readStatus?: string;
  createdAt?: number;
}