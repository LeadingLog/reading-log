import React from 'react';
import { useModalStore } from '../../store/modalStore';
import { ModalAlertProps } from "../../types/modal.ts";

const ModalAlert: React.FC<ModalAlertProps> = ({ modalId, title, subTitle, confirmText, onConfirm }) => {
  const { closeModal } = useModalStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // 함수 실행
    }
    if (modalId) { // modalId가 있을 경우에만 closeModal 호출
      closeModal(modalId);
    } // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="flex flex-col gap-4 flex-1 p-4 min-w-60 bg-modal_Content_Bg rounded-lg">
          <div className="text-center flex flex-col">
            <span className="text-lg text-modal_Title_Text font-semibold">
              {title || "전달할 메세지를 작성 안했어요"}
            </span>
            {subTitle && (
              <span className="text-modal_Sub_Title text-sm">{subTitle}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-modal_Right_Btn_Bg text-white px-4 py-2 rounded-lg"
              onClick={handleConfirm}
            >
              {confirmText || "확인"}
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalAlert;
