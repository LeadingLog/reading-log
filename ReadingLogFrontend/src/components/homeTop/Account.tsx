import IconLogOut from "../../assets/Icon-logout.svg?react";
import IconMyPage from "../../assets/Icon-mypage.svg?react";
import { useModalStore } from "../../store/modalStore.ts";

export default function Account() {
  const { openModal } = useModalStore(); // Zustand의 openModal 가져오기

  const handleLogout = () => {
    openModal("ModalNotice", {
      title: "로그아웃 완료!",
      subTitle: "다음에 또 봐요!",
      confirmText: "닫기",
      onlyClose: true,
    });
  };

  return (
    <>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <section className="flex h-[50px] gap-3.5 items-center border-8 bg-header_Right_Bg border-header_Right_Border rounded-full">
        <span className="pl-2">닉네임님 환영합니다</span>
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
