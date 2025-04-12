import {useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/userStore.ts";
import {useModalStore} from "../../store/modalStore.ts";
import IconLogOut from "../../assets/Icon-logout.svg?react";
import IconMyPage from "../../assets/Icon-mypage.svg?react";

export default function Account() {
  const navigate = useNavigate();
  const {openModal, closeModal} = useModalStore(); // Zustand의 openModal 가져오기

  //const userId = useUserStore((state) => state.user_id); // ID 가져오기
  //const token = useUserStore((state) => state.token); // token 가져오기
  const nickname = useUserStore((state) => state.nickname); // 닉네임 가져오기
  //const provider = useUserStore((state) => state.provider); // 닉네임 가져오기

  // 로그아웃 처리
  const handleLogout = async () => {
    /*
    const serverUrl = import.meta.env.VITE_SERVER_URL; // server URL

    try {
      // TODO: 백엔드 API 명세 확인 후 key 이름 수정하기

      const response = await axios.post(`${serverUrl}/user/logout`, {
        user_id: userId,
        token,
        provider
      });
      if (response.data.success) {
        openModal("ModalNotice", { // 로그아웃 성공 시 모달 표시
          title: "로그아웃 완료!",
          subTitle: "다음에 또 봐요!",
          confirmText: "확인",
          onlyConfirm: true,
          onConfirm: () => {
            navigate("/login");
            closeModal();
          },
        });
      } else {
        console.warn("로그아웃 실패 응답:", response.data);
        handleLogoutFail("로그아웃에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("로그아웃 실패:", err);
      handleLogoutFail("서버와의 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
     */

    openModal("ModalNotice", { // 로그아웃 성공 시 모달 표시 (임시)
      title: "로그아웃 완료!",
      subTitle: "다음에 또 봐요!",
      confirmText: "확인",
      onlyConfirm: true,
      onConfirm: () => {
        navigate("/login");
        closeModal();
      },
    });
  };

  // 로그아웃 실패 시 모달 표시
  /*
  const handleLogoutFail = (message?: string, title?: string) => {
    openModal("ModalNotice", {
      title: title || "로그아웃 실패",
      subTitle: message || "로그아웃에 실패하였습니다. 다시 시도해주세요.",
      onlyClose: true,
      cancelText: "확인",
    });
  };
  */

  return (
    <>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <section className="flex h-[50px] gap-3.5 items-center border-8 bg-header_Right_Bg border-header_Right_Border rounded-full">
        <span className="pl-2">{nickname || "사용자"}님 환영합니다</span>
        <article className="flex h-full py-1 overflow-hidden bg-myPage_LogOut_Bg divide-rou divide-x-2 divide-header_Right_Icon_Divide_Color">
          {/* MyPage 버튼 */}
          <button
            className="flex justify-center items-center text-myPage_Icon_Color px-3"
            onClick={() => openModal("ModalMyPage")} // 클릭 시 ModalMyPage 열기
          >
            <IconMyPage />
          </button>
          {/* 로그아웃 버튼 */}
          <button
            className="justify-center items-center text-LogOut_Icon_Color px-3"
            onClick={() =>
              openModal("ModalNotice", {
                title: "로그아웃 하시겠어요?",
                cancelText: "닫기",
                confirmText: "로그아웃",
                onConfirm: handleLogout, // 로그아웃 로직 전달
              })
            }
          >
            <IconLogOut />
          </button>
        </article>
      </section>
    </>
  );
}
