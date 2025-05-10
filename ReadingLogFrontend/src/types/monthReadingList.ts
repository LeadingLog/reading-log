export interface monthReadingListItem {
  title: string;
  author: string;
  isbn13: string;
  cover: string;
  link?: string;
  isFavorite?: boolean; // optional
  readStatus: 'reading' | 'complete' | 'noRead';
  createdAt?: number;
}