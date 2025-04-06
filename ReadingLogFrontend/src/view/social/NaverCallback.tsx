import {useEffect, useCallback} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import axios from 'axios';
import {useModalStore} from "../../store/modalStore.ts";
import ModalManager from "../../components/modal/ModalManager.tsx";

const NaverCallback = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const {openModal} = useModalStore(); // Zustand의 openModal 가져오기
  const navigate = useNavigate();

  const [searchParams] = useSearchParams(); // 네이버 로그인 URL 쿼리 파라미터 가져오기
  const code = searchParams.get("code"); // 인증 코드
  const state = searchParams.get("state"); // 요청 검증용 상태 값
  const error = searchParams.get("error"); // 인증 실패 시 에러 코드
  const errorDescription = searchParams.get("error_description"); // 인증 실패 메시지

  const stateFromStorage = localStorage.getItem("state");  // 로컬스토리지에 저장한 state

  /**
   * 로그인 실패 시 모달 표시
   * @param message
   */
  const handleLoginFail = useCallback((message?: string, title?:string) => {
    localStorage.removeItem("state");

    openModal("ModalAlert", {
      title: title || "로그인 실패",
      subTitle: message || "로그인에 실패하였습니다. 다시 시도해주세요.",
      confirmText: "확인",
      onConfirm: () => {
        navigate("/login");
      }
    });
  }, [navigate, openModal]);

  /**
   * 로그인
   */
  const requestLogin = useCallback(async () => {
    try {
      const response = await axios.post(`${serverUrl}/user/naverlogin`, { code });
      const data = response.data;

      if (data.success) {
        // TODO. 로그인 정보 저장
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("provider", "naver");
        localStorage.removeItem("state");
        navigate("/");
      } else {
        console.warn("로그인 실패 응답:", data);
        handleLoginFail("유효하지 않은 로그인 정보입니다.");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      handleLoginFail("서버 요청 중 오류가 발생했습니다.");
    }
  }, [code, serverUrl, navigate, handleLoginFail]);

  useEffect(() => {
    if (error) {  // 네이버 로그인 인증 실패 시
      console.warn("네이버 로그인 에러:", error, errorDescription );
      const message =
        error === "access_denied"
          ? "로그인이 취소되었습니다."
          : "로그인에 실패하였습니다. 다시 시도해주세요.";
      handleLoginFail(message);
      return;
    }

    if (state !== stateFromStorage) { // state 위조 여부 검증(CSRF 방지)
      console.warn("state 불일치:", state, stateFromStorage);
      handleLoginFail("유효하지 않은 요청입니다. 다시 시도해주세요.");
      return;
    }

    (async () => {
      await requestLogin(); // 로그인 진행
    })();
  }, [code, state, error, errorDescription, stateFromStorage, requestLogin, handleLoginFail]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        {/* 로딩 */}
        <div className="w-10 h-10 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></div>
      </div>
      <ModalManager/>
    </div>
  );
};

export default NaverCallback;