import { create } from 'zustand';

// 오른쪽 페이지 콘텐츠 타입
type RightContentType =
  | 'TimeTracking'
  | 'StatsPage';

// StatsPage 내부 탭 타입
type StatsTabType =
  | 'StatsMonth'
  | 'StatsYear';

// TimeTracking 내부 탭 타입
type TimeTrackingType =
  | 'StopWatch'
  | 'Timer'
  | 'onlyMonthReadingList'
// 페이지별 파라미터 타입
type PageParams = {
  StatsPage?: {
    tab: StatsTabType;
  };
  TimeTracking?: {
    tab: TimeTrackingType;
    bookData?: BookData;
  }
};

// 페이지 데이터 타입
type PageData = {
  title?: string; // 타이틀 전달을 위한 필드
  time?: number;
  // 추가 데이터 필드 확장 가능
};

type BookData = {
  bookId?: number; // 책 정보
  cover?: string;
  bookTitle?: string;
  bookSubTitle?: string;
  // 추가 데이터 필드 확장 가능
}

// Zustand 상태 타입
type PageState = {
  rightContent: RightContentType;
  params: PageParams; // 페이지별 파라미터
  pageData: PageData; // 모든 페이지에서 공유할 데이터
  setRightContent: (
    content: RightContentType,
    params?: PageParams, // 페이지별 파라미터
    pageData?: PageData  // 공유 데이터 (타이틀 등)
  ) => void;
};

// Zustand 스토어 생성
export const usePageStore = create<PageState>( (set) => ({
  rightContent: 'TimeTracking',
  params: {},
  pageData: {},
  setRightContent: (content, params = {}, pageData = {}) =>
    set( {
      rightContent: content,
      params: params, // StatsPage 외에는 params 초기화
      pageData: pageData // 전달된 pageData로 업데이트
    } ),
}) );
