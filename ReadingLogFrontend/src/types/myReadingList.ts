// 내 독서 목록 탭 타입
import { ReadStatus } from "./readStatus.ts";
import React from "react";

export type MyReadingListTabType = 0 | 1 | 2 | 3 ;

// 내 독서 목록 탭 유형
export const MyReadingListTabLabels: Record<MyReadingListTabType, string> = {
  0: "전체",
  1: "독서중",
  2: "읽기전",
  3: "완독",
};

// readStatus 객체를 Record 타입으로 정의
export const readStatus: Record<ReadStatus, string> = {
  IN_PROGRESS: "독서중",
  NOT_STARTED: "읽기전",
  COMPLETED: "완독",
  INTERESTED: "관심도서",
};

// 내 독서 목록 요청 파라미터 타입
export interface fetchMyReadingListParams {
  userId: number | null;
  MyReadingListTabType: MyReadingListTabType;
  size?: number;
  page?: number;
  query?: string;
}

// 내 독서 목록 내부 이미지 리스트로 넘기는 props 타입
export interface BookImgListProps {
  MyReadingListTabType: MyReadingListTabType;
  query?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}
