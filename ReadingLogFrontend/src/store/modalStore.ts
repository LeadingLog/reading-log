// store/modalStore.ts
import { create } from 'zustand';
import type { ModalState } from "../types/modal.ts";

// Zustand 스토어 생성
export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (type, data = {}) => {
    const modalId = crypto.randomUUID(); // 고유 ID 생성 (브라우저 지원됨)
    set((state) => ({
      modals: [...state.modals, { modalId, type, data }],
    }));
  },
  closeModal: (modalId) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.modalId !== modalId),
    }));
  },
  closeAllModals: () => {
    set({ modals: [] });
  },
}));