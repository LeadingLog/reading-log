export interface ReadingRecord {
  bookId: number;
  userId: number | null;
  readDate: string;   // YYYY-MM-DD
  totalTime: number;  // 90 (minutes)
  startTime: string;  // HH:MM:SS
  endTime: string;    // HH:MM:SS
}