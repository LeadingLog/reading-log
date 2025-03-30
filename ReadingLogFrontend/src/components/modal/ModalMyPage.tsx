import React from 'react';
import { useModalStore } from '../../store/modalStore';

const ModalMyPage: React.FC = () => {
  const {activeModal, closeModal} = useModalStore(); // Zustand 상태 및 닫기 함수 가져오기
  const { openModal } = useModalStore();

  const handleAccountDeletion = () => {
    console.log('탈퇴 로직 실행'); // 실제 탈퇴 로직 추가
    // 예를 들어, API 요청으로 사용자 계정을 삭제:
    // await api.delete('/user');
    openModal('ModalNotice', {
      title: '탈퇴가 완료되었습니다',
      confirmText: '닫기',
      oneBtn: true,
      onConfirm: () => {closeModal()}
    });
  };

  if (activeModal !== 'ModalMyPage') return null; // activeModal이 ModalMyPage가 아니면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <section className="flex gap-5 bg-modalBg p-5 rounded-lg">
        <article className="flex-1 bg-modalLogoBg rounded-lg">
          로고영역
        </article>
        <article className="flex flex-col gap-2 flex-1 p-4 bg-modalContentBg rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2>닉네임</h2>
              <span>수정</span>
            </div>
            <span>현재 닉네임임</span>
          </div>
          
          <div>
            <p>가입 이메일</p>
            <p>thervv@kakao.com</p>
          </div>
          <div className="flex justify-between">
            <button
              className="text-xs text-modalQuitText px-1 py-0.5 rounded-lg bg-modalQuitBg"
              onClick={() =>
                openModal('ModalNotice', {
                  title: '정말로 탈퇴하시겠어요??',
                  subTitle: '탈퇴 시 모든 정보가 삭제됩니다.',
                  cancelText: '아니요 조금 더 이용할래요!',
                  confirmText: '예',
                  reverseBtn: true,
                  onConfirm: handleAccountDeletion, // 탈퇴 로직 전달
                })
              }
            >
              회원탈퇴
            </button>
            <button
              onClick={closeModal} // 클릭 시 모달 닫기
              className="px-2 py-1 bg-modalRightBtnBg rounded-lg"
            >
              닫기
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ModalMyPage;
