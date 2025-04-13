import React, {useState} from 'react';
import {useModalStore} from '../../store/modalStore';
import {ModalMyPageProps} from "../../types/modal.ts";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore.ts";
// import axios from "axios";

const ModalMyPage: React.FC<ModalMyPageProps> = ({modalId}) => {
  const {openModal, closeModal, closeAllModals} = useModalStore();
  const navigate = useNavigate();
  // const serverUrl = import.meta.env.VITE_SERVER_URL; // server URL
  const nickname = useUserStore((state) => state.nickname); // 닉네임 가져오기
  // const userId = useUserStore((state) => state.user_id); // ID 가져오기
  const email = useUserStore((state) => state.email); // email 가져오기

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [tempNickname, setTempNickname] = useState(nickname); // 수정 중 닉네임
  const [tempEmail, setTempEmail] = useState(email); // 수정 중 이메일

  // 수정 모드 리셋 및 내 정보 모달 닫기
  const resetEditState = () => {
    setIsEditing(false);
    setTempNickname(nickname);
    setTempEmail(email);
    if (modalId) { // modalId가 있을 경우에만 closeModal 호출
      closeModal(modalId);
    }
  };

  // 회원 정보 수정 요청
  /*
  const handleEditAccount = async () => {
    try {
      const response = await axios.post(`${serverUrl}/user/user_id/modified`, {
        user_id: userId,
        nickname: tempNickname,
        email: tempEmail,
      });
      if (response.data.success) {
        setIsEditing((prev) => !prev);

        useUserStore.getState().setUser({
          nickname: response.data.nickname,
          email: response.data.email
        });
      } else {
        console.warn("회원 정보 수정 실패 응답:", response.data);
        handleEditFail("회원 정보 수정에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      handleEditFail("서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
  */

  // 수정 버튼 or 완료 버튼 클릭
  const toggleEditMode = async () => {
    if (isEditing) { // 완료 버튼 클릭 시 회원 수정 진행
      // await handleEditAccount();
    }
    setIsEditing((prev) => !prev);
  }

  // 회원 탈퇴 처리
  const handleAccountDeletion = async () => {
    /*
    try {
      const response = await axios.post(`${serverUrl}/user/user_id/modified`, {
        userId,
        nickname,
        email,
      });
      const data = response.data;

      if (data.success) {
        openModal('ModalNotice', {
          title: '탈퇴가 완료되었습니다',
          confirmText: '닫기',
          onlyConfirm: true,
          onConfirm: () => {
            closeAllModals();
            navigate("/login");
          }
        });
      } else {
        console.warn("탈퇴 실패:", data);
        handleEditFail("탈퇴에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("탈퇴 실패:", err);
      handleEditFail("서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
    */
    openModal('ModalNotice', {
      title: '탈퇴가 완료되었습니다',
      confirmText: '닫기',
      onlyConfirm: true,
      onConfirm: () => {
        closeAllModals();
        navigate("/login");
      }
    });
  };

  // 회원 정보 수정 실패 시 공통 모달 표시
  /*
  const handleEditFail = (message?: string, title?: string) => {
    const editAccountFail = openModal("ModalNotice", {
      title: title || "회원 정보 수정 실패",
      subTitle: message || "회원 정보 수정에 실패하였습니다. 다시 시도해주세요.",
      onlyConfirm: true,
      onConfirm: () => {
        resetEditState();
        closeModal(editAccountFail);
        openModal("ModalMyPage");
      },
    });
  };
  */

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="flex-1 bg-modal_Logo_Bg rounded-lg">
          로고영역
        </article>
        <article className="flex flex-col gap-2 flex-1 p-4 bg-modal_Content_Bg rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h2>닉네임</h2>
              <span
                className="text-myPage_Update_Complete_Text hover:cursor-pointer hover:text-myPage_Update_Complete_Text_Hover"
                onClick={toggleEditMode}
              >
            {isEditing ? <>완료</> : <>수정</>}
          </span>
            </div>
            {isEditing ? (
              <input
                type="text"
                className="text-myPage_Update_Text bg-modal_Content_Bg border-0 border-b-2 border-myPage_Update_Line focus:outline-none focus:border-b-2 focus:border-myPage_Update_Line_Focus focus:text-myPage_Update_Text_Focus"
                value={tempNickname || "사용자"}
                onChange={(e) => setTempNickname(e.target.value)}
              />
            ) : (
              <span>{nickname || "사용자"}</span>
            )}
          </div>

          <div>
            <p>가입 이메일</p>
            {isEditing ? (
              <input
                type="text"
                className="text-myPage_Update_Text bg-modal_Content_Bg border-0 border-b-2 border-myPage_Update_Line focus:outline-none focus:border-b-2 focus:border-myPage_Update_Line_Focus focus:text-myPage_Update_Text_Focus"
                value={tempEmail || "example@gmail.com"}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            ) : (
              <span>{email || "example@gmail.com"}</span>
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="text-xs text-modal_Quit_Text px-1 py-0.5 rounded-lg bg-modal_Quit_Bg"
              onClick={() => {
                const openDeleteAccount = openModal('ModalNotice', {
                  title: '정말로 탈퇴하시겠어요??',
                  subTitle: '탈퇴 시 모든 정보가 삭제됩니다.',
                  cancelText: '아니요 조금 더 이용할래요!',
                  confirmText: '예',
                  reverseBtn: true,
                  onConfirm: () => {
                    closeModal(openDeleteAccount);
                    handleAccountDeletion();
                  }
                })
              }}
            >
              회원탈퇴
            </button>
            <button
              className="px-2 py-1 bg-modal_Right_Btn_Bg rounded-lg"
              onClick={() => {
                resetEditState();
              }}
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
