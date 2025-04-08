// store/modalStore.ts
import { create } from 'zustand';

// 모달 타입 정의
type ModalType =
  | 'none'
  | 'ModalBookPlan'         // 독서 계획 모달
  | 'ModalMyPage'           // 마이페이지 모달
  | 'ModalNotice'           // 공통 모달
  | 'ModalTrackingPlan'     // 독서 타임 트래킹 모달
  | 'ModalAlert'            // 공통 모달 (확인 버튼만 있는 모달)

// 확장된 ModalData 타입 정의
type ModalData = {
  title?: string; // 모달 타이틀 텍스트
  subTitle?: string; // 모달 부가 설명 텍스트
  confirmText?: string; // 오른쪽 버튼 텍스트
  cancelText?: string; // 왼쪽 버튼 텍스트
  reverseBtn?: boolean; // 버튼 위치 반대로 변경 할 지 선택
  onlyClose?: boolean; // 닫는 버튼 한개만 사용 할 지?
  onlyConfirm?: boolean; // 클릭 시 함수 실행할 버튼 하나만 사용할 지?

  /* 책 정보 관련 */
  bookTitle?: string; // 책 제목
  bookSubTitle?: string; // 책 저자

  onConfirm?: () => void; // 확인 버튼 클릭 시 실행할 함수
};

// Zustand 상태 타입 정의
type ModalState = {
  activeModal: ModalType;
  modalData: ModalData; // 확장된 데이터 타입
  openModal: (type: ModalType, data?: ModalData) => void; // 데이터 전달 가능
  closeModal: () => void;
};

// Zustand 스토어 생성
export const useModalStore = create<ModalState>((set) => ({
  activeModal: 'none',
  modalData: {},
  openModal: (type, data = {}) => set({
    activeModal: type,
    modalData: data
  }),
  closeModal: () => set({
    activeModal: 'none',
    modalData: {}
  }),
}));
