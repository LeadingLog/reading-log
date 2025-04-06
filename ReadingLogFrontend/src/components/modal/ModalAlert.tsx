import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalAlert: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModalStore();
  console.log(activeModal);
  if (activeModal !== 'ModalAlert') return null;

  const handleConfirm = () => {
    if (modalData.onConfirm) {
      modalData.onConfirm(); // 함수 실행
    }
    closeModal(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex gap-5 bg-modalBg p-5 rounded-lg">
        <article className="flex flex-col gap-4 flex-1 p-4 min-w-60 bg-modalContentBg rounded-lg">
          <div className="text-center flex flex-col">
            <span className="text-lg text-modalTitleText font-semibold">
              {modalData.title || "전달할 메세지를 작성 안했어요"}
            </span>
            {modalData.subTitle && (
              <span className="text-modalSubTitle text-sm">{modalData.subTitle}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-modalRightBtnBg text-white px-4 py-2 rounded-lg"
              onClick={handleConfirm}
            >
              {modalData.confirmText || "확인"}
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalAlert;
