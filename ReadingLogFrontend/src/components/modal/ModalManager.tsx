import React from "react";
import ModalBookPlan from './ModalBookPlan';
import ModalMyPage from './ModalMyPage';
import ModalNotice from './ModalNotice';
import ModalTrackingPlan from './ModalTrackingPlan';
import ModalCalendar from './ModalCalendar';

import { useModalStore } from '../../store/modalStore';
import { ModalData, ModalType, ModalInstance } from '../../types/modal';

// 모달 타입과 컴포넌트 매핑
const MODAL_COMPONENTS: Record<ModalType, React.FC<ModalData & { modalId: string }>> = {
  ModalBookPlan,     // ModalBookPlan 컴포넌트
  ModalMyPage,       // ModalMyPage 컴포넌트
  ModalNotice,       // ModalNotice 컴포넌트
  ModalTrackingPlan, // ModalTrackingPlan 컴포넌트
  ModalCalendar,     // ModalCalendar 컴포넌트
  none: () => null,  // 모달이 없는 경우 (null 반환)
};

const ModalManager = () => {
  const { modals } = useModalStore();

  return (
    <>
      {modals.map(({ modalId, type, data }: ModalInstance) => {
        const ModalComponent = MODAL_COMPONENTS[type];
        if (!ModalComponent) return null;
        return <ModalComponent key={modalId} modalId={modalId} {...data} />;
      })}
    </>
  );
};

export default ModalManager;
