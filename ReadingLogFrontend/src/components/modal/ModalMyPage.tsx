import React, { useState } from "react";
import { useModalStore } from "../../store/modalStore";
import { ModalMyPageProps } from "../../types/modal.ts";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore.ts";
import axios from "axios";

const ModalMyPage: React.FC<ModalMyPageProps> = ({ modalId }) => {
  const { openModal, closeModal, closeAllModals } = useModalStore();
  const { nickname, userId, email, resetUser } = useUserStore();
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER_URL; // server URL

  const [isEditing, setIsEditing] = useState( false ); // 수정 모드 여부 (true: 수정 중, false: 완료)
  const [tempNickname, setTempNickname] = useState( nickname ); // 수정 중 닉네임
  const [tempEmail, setTempEmail] = useState( email ); // 수정 중 이메일
  const [isLoading, setIsLoading] = useState<boolean>( false ); // 닉네임 수정 요청 시 로딩
  const setModalIsLoading = useModalStore( state => state.setModalIsLoading ); // 알림 모달 로딩 표시 용

  // 수정 모드 리셋 및 내 정보 모달 닫기
  const resetEditState = () => {
    setIsEditing( false );
    setTempNickname( nickname );
    setTempEmail( email );
    if (modalId) { // modalId가 있을 경우에만 closeModal 호출
      closeModal( modalId );
    }
  };

  // 닉네임 이메일 유효값 검사 모달 창 표시
  const showValidationFailModal = (message: string) => {
    const alertId = openModal( "ModalNotice", {
      title: message,
      confirmText: "닫기",
      onlyConfirm: true,
      onConfirm: () => closeModal( alertId ),
    } );
  };

  // 닉네임 이메일 유효값 검사
  const validateForm = (email: string, nickname: string) => {
    const emailTrimmed = email.trim();
    const nicknameTrimmed = nickname.trim();

    if (!nicknameTrimmed) return { valid: false, message: "닉네임을 입력해주세요." };
    if (nicknameTrimmed.length > 20) return { valid: false, message: "닉네임은 20자 이내로 입력해주세요." };

    if (!emailTrimmed) return { valid: false, message: "이메일을 입력해주세요." };
    if (emailTrimmed.length > 20) return { valid: false, message: "이메일은 20자 이내로 입력해주세요." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( emailTrimmed )) {
      return { valid: false, message: "이메일 형식을 지켜주세요." };
    }

    return { valid: true };
  };

  // 회원 정보 수정 요청
  const handleEditAccount = async (): Promise<boolean> => {

    const { valid, message } = validateForm( tempEmail ?? "", tempNickname ?? "" );
    if (!valid) {
      showValidationFailModal( message! );
      return false;
    }

    const formData = new FormData();
    formData.append( "userId", userId !== null ? String( userId ) : "0" );
    formData.append( "userEmail", tempEmail ? tempEmail.trim() : "" );
    formData.append( "nickname", tempNickname ? tempNickname.trim() : "" );

    try {
      setIsLoading( true )
      const response = await axios.post( `${serverUrl}/user/${userId}/modified`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } );

      if (response.data.success) {
        setIsEditing( (prev) => !prev );

        useUserStore.getState().setUser( {
          nickname: response.data.user.nickname,
          email: response.data.user.userEmail
        } );
        setTempNickname( response.data.user.nickname );
        setTempEmail( response.data.user.userEmail );
        return true;
      } else {
        console.warn( "회원 정보 수정 실패 응답:", response.data );
        handleEditFail( "회원 정보 수정에 실패하였습니다. 다시 시도해주세요." );
        return false;
      }
    } catch (err) {
      console.error( "회원 정보 수정 실패:", err );
      handleEditFail( "서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." );
      return false;
    } finally {
      setIsLoading( false )
    }
  }

  // 수정 버튼 or 완료 버튼 클릭
  const toggleEditMode = async () => {
    if (!isEditing) {
      // 수정 모드로 진입
      setIsEditing( true );
      return;
    }

    // 완료 버튼 클릭 시
    const success = await handleEditAccount();
    if (success) {
      setIsEditing( false ); // 수정 완료 후 보기 모드로 전환
    }
  }

  // 회원 정보 수정 실패 시 공통 모달 표시
  const handleEditFail = (message?: string, title?: string) => {
    const editFailModal = openModal( "ModalNotice", {
      title: title || "회원 정보 수정 실패",
      subTitle: message || "회원 정보 수정에 실패하였습니다. 다시 시도해주세요.",
      onlyConfirm: true,
      confirmText: "닫기",
      onConfirm: () => {
        resetEditState();
        closeModal( editFailModal );
        openModal( "ModalMyPage" );
      },
    } );
  };

  // 회원 탈퇴 처리
  const handleAccountDeletion = async () => {
    try {
      setModalIsLoading( true )
      const response = await axios.delete( `${serverUrl}/user/${userId}/delete`, {
        data: { userId }
      } );

      if (response.data.success) {
        openModal( "ModalNotice", {
          title: "회원 탈퇴가 완료되었습니다",
          confirmText: "닫기",
          onlyConfirm: true,
          onConfirm: () => {
            resetUser(); // localStorage 초기화
            closeAllModals();
            navigate( "/login" );
          }
        } );
      } else {
        console.warn( "회원 탈퇴 실패:", response.data );
        handleDeleteFail( "회원 탈퇴에 실패하였습니다. 다시 시도해주세요." );
      }
    } catch (err) {
      console.error( "회원 탈퇴 실패:", err );
      handleDeleteFail( "서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." );
    } finally {
      setModalIsLoading( false )
    }
  };

  // 회원 탈퇴 클릭
  const handleDeleteConfirmModal = () => {
    openModal( "ModalNotice", {
      title: "탈퇴 시 모든 정보가 삭제됩니다.",
      subTitle: "본인 확인을 위해 이메일을 입력해주세요.",
      cancelText: "아니요 조금 더 이용할래요!",
      confirmText: "예",
      reverseBtn: true,
      showInput: true,
      loadingMessage: "탈퇴중",
      onConfirm: async (inputValue?: string) => {
        console.log( "사용자 입력값:", inputValue, " email:", email );
        if (email !== inputValue) {
          handleDeleteFail( "이메일이 일치하지 않습니다." );
        } else {
          await handleAccountDeletion();
        }
      }
    } )
  }

  // 회원 탈퇴 실패 시 공통 모달 표시
  const handleDeleteFail = (message?: string, title?: string) => {

    const deleteFailModal = openModal( "ModalNotice", {
      title: title || "회원 탈퇴 실패",
      subTitle: message || "회원 탈퇴에 실패하였습니다. 다시 시도해주세요.",
      onlyConfirm: true,
      confirmText: "닫기",
      onConfirm: () => {
        closeModal( deleteFailModal );
      },
    } );
  };

  // 테스트
  const getSession = async () => {
    try {
      const response = await axios.get( `${serverUrl}/user/getUserSession`, {
        withCredentials: true
      } );

      console.log( response.data );



    } catch (error: unknown) {
      if (axios.isAxiosError( error ) && error.response?.status === 401) {
        resetUser();
        localStorage.clear();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <article className="flex-1 bg-modal_Logo_Bg rounded-lg">
          로고영역<br/>
          <button onClick={() => getSession()}>세션 테스트</button>
        </article>
        <article className="flex flex-col gap-2 flex-1 p-4 bg-modal_Content_Bg rounded-lg">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h2>닉네임</h2>
              <span
                className="hover:backdrop-brightness-95 rounded-lg px-1 py-0.5 flex items-center gap-1 text-myPage_Update_Complete_Text hover:cursor-pointer hover:text-myPage_Update_Complete_Text_Hover"
                onClick={toggleEditMode}
              >
            {isEditing ?
              <>
                {!isLoading ? (
                  <span>완료</span>
                ) : (
                  <span
                    className="w-5 h-5 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></span>
                )}
              </>
              : <>수정</>}

          </span>
            </div>
            {isEditing ? (
              <input
                type="text"
                className="text-myPage_Update_Text bg-modal_Content_Bg border-0 border-b-2 border-myPage_Update_Line focus:outline-none focus:border-b-2 focus:border-myPage_Update_Line_Focus focus:text-myPage_Update_Text_Focus"
                value={tempNickname ?? ""}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
                onChange={(e) => setTempNickname( e.target.value )}
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
                value={tempEmail || ""}
                placeholder="이메일을 입력하세요"
                maxLength={20}
                onChange={(e) => setTempEmail( e.target.value )}
              />
            ) : (
              <span>{email || "example@gmail.com"}</span>
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="hover:brightness-90 active:scale-95 text-xs text-modal_Quit_Text px-2 py-0.5 rounded-lg bg-modal_Quit_Bg"
              onClick={handleDeleteConfirmModal}
            >
              회원탈퇴
            </button>
            <button
              className="hover:invert-[3%] active:scale-95 px-2 py-1 bg-modal_Right_Btn_Bg rounded-lg"
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
