import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalNotice: React.FC = () => {
  const {activeModal, modalData, closeModal} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기

  if (activeModal !== 'ModalNotice') return null; // activeModal이 ModalNotice가 아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="flex flex-col gap-4 flex-1 p-4 min-w-60 bg-modal_Content_Bg rounded-lg">
          <div className={`${modalData.onlyConfirm || modalData.onlyClose ? 'text-center' : ''} flex flex-col`}>
            <span className="text-lg text-modal_Title_Text font-semibold">{modalData.title || "전달할 메세지를 작성 안했어요"}</span>
            {modalData.subTitle && (
              <span className="text-modal_Sub_Title text-sm">{modalData.subTitle}</span>
            )}
          </div>
          <div className={`${modalData.reverseBtn ? 'flex-row-reverse' : ""} flex justify-between gap-10`}>
            {/* 기본 닫기 관련 버튼 */}
            {!modalData.onlyConfirm && (
              <button
                className={`${modalData.reverseBtn ? 'bg-modal_Right_Btn_Bg' : 'border-modal_Left_Btn_Border border-4'} flex-1 min-w-fit px-2 py-1 rounded-lg`}
                onClick={() => closeModal()}
              >{modalData.cancelText || "닫기"}
              </button>
            )}
            {/* 실행 버튼 */}
            {!modalData.onlyClose && (
              <button
                className={`${modalData.reverseBtn ? 'text-modal_Quit_Text' : 'bg-modal_Right_Btn_Bg'} flex flex-1 justify-center items-center min-w-fit px-2 py-1  rounded-lg`}
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