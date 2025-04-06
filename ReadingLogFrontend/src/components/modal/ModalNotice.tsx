import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalNotice: React.FC = () => {
  const {activeModal, modalData, closeModal} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기
  if (activeModal !== 'ModalNotice') return null; // activeModal이 ModalNotice가 아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex gap-5 bg-modalBg p-5 rounded-lg">
        <article className="flex flex-col gap-4 flex-1 p-4 min-w-60 bg-modalContentBg rounded-lg">
          <div className={`${modalData.oneBtn ? 'text-center' : ''} flex flex-col`}>
            <span className="text-lg text-modalTitleText font-semibold">{modalData.title || "전달할 메세지를 작성 안했어요"}</span>
            {modalData.subTitle && (
              <span className="text-modalSubTitle text-sm">{modalData.subTitle}</span>
            )}
          </div>
          <div className={`${modalData.reverseBtn ? 'flex-row-reverse' : ""} flex justify-between gap-10`}>
            <button
              className={`${modalData.reverseBtn ? 'bg-modalRightBtnBg' : 'border-modalLeftBtnBorder border-4'} flex-1 min-w-fit px-2 py-1 rounded-lg`}
              onClick={() => closeModal()}
            >{modalData.cancelText || "닫기"}
            </button>
            {!modalData.oneBtn && (
              <button
                className={`${modalData.reverseBtn ? 'text-modalQuitText' : 'bg-modalRightBtnBg'} flex flex-1 justify-center items-center min-w-fit px-2 py-1  rounded-lg`}
                onClick={modalData.onConfirm} // onConfirm 실행
              >
                {modalData.confirmText || "실행"}
              </button>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalNotice;