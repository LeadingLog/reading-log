import React from 'react';
import { useModalStore } from '../../store/modalStore';
import { ModalNoticeProps } from "../../types/modal.ts";

const ModalNotice: React.FC<ModalNoticeProps> = ({
                                                   modalId,
                                                   title,
                                                   subTitle,
                                                   cancelText,
                                                   confirmText,
                                                   onlyClose,
                                                   onlyConfirm,
                                                   reverseBtn,
                                                   onConfirm,
                                                 }) => {
  const { closeModal } = useModalStore(); // 모달 닫기 함수

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="flex flex-col gap-2 flex-1 p-4 min-w-60 bg-modal_Content_Bg rounded-lg">
          <div className={`${onlyConfirm || onlyClose ? 'text-center' : ''} flex flex-col`}>
            <span className="text-lg text-modal_Title_Text font-semibold">
              {title || "전달할 메세지를 작성 안했어요"}
            </span>
            {subTitle && (
              <span className="text-modal_Sub_Title text-sm">{subTitle}</span>
            )}
          </div>

          <div className={`${reverseBtn ? 'flex-row-reverse' : ''} flex justify-between gap-10`}>
            {!onlyConfirm && (
              <button
                className={`${reverseBtn ? 'bg-modal_Right_Btn_Bg' : 'border-modal_Left_Btn_Border border-4'} flex-1 min-w-fit px-2 py-1 rounded-lg`}
                onClick={() => {
                  if (modalId) { // modalId가 있을 경우에만 closeModal 호출
                    closeModal(modalId);
                  }
                }}
              >
                {cancelText || "닫기"}
              </button>
            )}
            {!onlyClose && (
              <button
                className={`${reverseBtn ? 'text-modal_Quit_Text' : 'bg-modal_Right_Btn_Bg'} flex flex-1 justify-center items-center min-w-fit px-2 py-1 rounded-lg`}
                onClick={onConfirm}
              >
                {confirmText || "실행"}
              </button>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalNotice;
