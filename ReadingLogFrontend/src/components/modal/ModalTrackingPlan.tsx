import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalTrackingPlan: React.FC = () => {
  const { activeModal, closeModal } = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  if (activeModal !== 'ModalTrackingPlan') return null; // activeModal이 ModalTrackingPlan가 아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">마이페이지</h2>
        <p>여기에 마이페이지 내용을 작성하세요.</p>
        <button
          onClick={closeModal} // 클릭 시 모달 닫기
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ModalTrackingPlan;
