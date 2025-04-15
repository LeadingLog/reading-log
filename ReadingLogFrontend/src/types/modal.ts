// Modal 타입 정의
import React from "react";

export type ModalType =
  | 'none'
  | 'ModalBookPlan'
  | 'ModalMyPage'
  | 'ModalNotice'
  | 'ModalTrackingPlan'
  | 'ModalCalendar'

// 공통 모달 데이터 구조
export type ModalData = {
  title?: string; // 모달 제목
  subTitle?: string; // 모달 부제목
  cancelText?: string; // 취소 버튼 텍스트
  confirmText?: string; // 확인 버튼 텍스트
  onlyClose?: boolean; // 닫기 버튼만 사용할지 여부
  onlyConfirm?: boolean; // 확인 버튼만 사용할지 여부
  reverseBtn?: boolean; // 버튼 순서 반대로 설정할지 여부

  /* 책 정보 관련 */
  cover?: string // 책 표지
  bookTitle?: string; // 책 제목
  bookSubTitle?: string; // 책 저자
  bookLink?: string // 알라딘 책 정보 페이지로 가기

  /* 캘린더 관련 */
  pickYear?: React.Dispatch<React.SetStateAction<number>>;
  pickMonth?: React.Dispatch<React.SetStateAction<number>>;
  month?: number;
  year?: number;
  startOrEnd?: '시작 달' | '종료 달';
  startYear?: number;
  startMonth?: number;

  /* 입력 관련 */
  showInput?: boolean; // 회원 정보 탈퇴 시 이메일 입력 창 사용할 지 여부

  onConfirm?: (value?: string) => void; // 확인 버튼 클릭 시 실행할 함수
};

// 모달별 Props 타입 (추후 개별 확장도 가능)

export interface ModalBookPlanProps extends ModalData {
  // ModalBookPlan에 필요한 속성 추가 가능
  modalId?: string;
}

export interface ModalMyPageProps extends ModalData {
  // ModalMyPage에 필요한 속성 추가 가능
  modalId?: string;
}

export interface ModalNoticeProps extends ModalData {
  // ModalNotice는 필수적인 id를 가지므로, id를 필수로
  modalId: string;
}

export interface ModalTrackingPlanProps extends ModalData {
  // ModalTrackingPlan에 필요한 속성 추가 가능
  modalId?: string;
}

export interface ModalAlertProps extends ModalData {
  // ModalAlert에 필요한 속성 추가 가능
  modalId?: string;
}
export interface ModalCalendarProps extends ModalData {
  // ModalCalendarProps에 필요한 속성 추가 가능
  modalId?: string;

}

export interface ModalInstance {
  modalId: string;          // 각 모달을 유일하게 식별하기 위한 고유 ID
  type: ModalType;     // 어떤 모달인지 구분 (e.g., ModalNotice)
  data: ModalData;     // 그 모달이 사용하는 데이터 (제목, 서브타이틀, onConfirm 등)
}

// Zustand 스토어 타입
export interface ModalState {
  modals: ModalInstance[];
  openModal: (type: ModalType, data?: ModalData) => string;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
}