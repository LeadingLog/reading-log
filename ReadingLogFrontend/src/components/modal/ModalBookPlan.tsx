import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalBookPlan: React.FC = () => {
  const { activeModal, closeModal } = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  if (activeModal !== 'ModalBookPlan') return null; // activeModal이 ModalBookPlan가  아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="bg-white p-6 rounded-lg w-[400px]">
        <article className="bg-white p-6 rounded-lg">
          로고영역
        </article>
        <article>

        </article>
        <button
          onClick={closeModal} // 클릭 시 모달 닫기
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          닫기
        </button>
      </section>
    </div>
  );
};

export default ModalBookPlan;