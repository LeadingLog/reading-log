import { bookHandlers } from "./handlers/bookHandlers.ts";
import { readingRecordHandlers } from "./handlers/readingRecordHandlers.ts";
import { userHandlers } from "./handlers/userHandlers.ts";
import { readingListHandlers } from "./handlers/readingListHandlers.ts";

export const handlers = [
  ...bookHandlers,           // 도서 검색 관련 핸들러들
  ...readingListHandlers,    // 독서 목록 관련 핸들러들
  ...readingRecordHandlers,  // 독서 기록 관련 핸들러들
  ...userHandlers            // 사용자 관련 핸들러들
];