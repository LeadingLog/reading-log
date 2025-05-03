import {useEffect, useCallback} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {useModalStore} from "../../store/modalStore";
import {useUserStore} from "../../store/userStore";

interface CallbackTemplateProps {
  provider: "naver" | "kakao";
  apiEndpoint: string;
  requireState?: boolean; // 기본: true
}

export default function OAuthCallbackHandler({
                                           provider,
                                           apiEndpoint,
                                           requireState = true,
                                         }: CallbackTemplateProps) {
  const {openModal, closeAllModals} = useModalStore(); // Zustand의 openModal 가져오기
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 네이버 로그인 URL 쿼리 파라미터 가져오기

  const code = searchParams.get("code"); // 인증 코드
  const state = searchParams.get("state"); // 요청 검증용 상태 값
  const error = searchParams.get("error"); // 인증 실패 시 에러 코드
  const errorDescription = searchParams.get("error_description"); // 인증 실패 메시지

  // 로그인 실패 시 모달 표시
  const handleLoginFail = useCallback(
    (message?: string, title?: string) => {
      localStorage.removeItem("state");

      openModal("ModalNotice", {
        title: title || "로그인 실패",
        subTitle: message || "로그인에 실패하였습니다. 다시 시도해주세요.",
        onlyConfirm: true,
        confirmText: "확인",
        onConfirm: () => {
          closeAllModals();
          navigate("/login");
        },
      });
    },
    [navigate, openModal, closeAllModals]
  );

  // 로그인 요청
  const requestLogin = useCallback(async (): Promise<void> => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      const loginData = new URLSearchParams({
        code: code || "",
        state: state || ""
      });

      const response = await axios.post(`${serverUrl}${apiEndpoint}`, loginData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const data = response.data;
      // TODO. API에 맞게 수정하기

      if (response.status === 200) {
        useUserStore.getState().setUser({ // 사용자 정보 저장
          token: 'temporary-token',
          expiresAt: 0,
          user_id: data.users.userId,
          nickname: data.users.nickname,
          email: data.users.email,
          provider,
        });

        navigate("/");
      } else {
        console.warn("로그인 실패 응답:", data);
        handleLoginFail("유효하지 않은 로그인 정보입니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      handleLoginFail("서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }, [code, state, navigate, handleLoginFail, apiEndpoint, provider]);

  useEffect(() => {
    const stateFromStorage = localStorage.getItem("state"); // localstorage에 저장한 state

    if (error) {
      console.warn("로그인 에러:", error, errorDescription);
      const message =
        error === "access_denied"
          ? "로그인이 취소되었습니다."
          : "로그인에 실패하였습니다. 다시 시도해주세요.";
      handleLoginFail(message, "로그인 취소");
      return;
    }

    if (requireState && state !== stateFromStorage) { // state 위조 여부 검증(CSRF 방지)
      console.warn("state 불일치:", state, stateFromStorage);
      handleLoginFail("유효하지 않은 요청입니다. 다시 시도해주세요.");
      return;
    }

    void requestLogin(); // 로그인 진행
  }, [error, errorDescription, state, requestLogin, handleLoginFail, requireState]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        {/* 로딩 */}
        <div className="w-10 h-10 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></div>
      </div>
    </>
  );
};