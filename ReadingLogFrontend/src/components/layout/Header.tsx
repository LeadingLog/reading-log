import IconSearch from "../../assets/Icon-search.svg?react";
import IconLogOut from "../../assets/Icon-logout.svg?react";
import IconMyPage from "../../assets/Icon-mypage.svg?react";
import { useModalStore } from "../../store/modalStore.ts";

export default function Header() {
  const {openModal} = useModalStore(); // Zustand의 openModal 가져오기

  const handleLogout = () => {
    console.log('로그아웃 처리'); // 로그아웃 로직 추가
    // 예를 들어, 토큰 삭제 및 페이지 이동
    openModal('ModalNotice', {
      title: "로그아웃 완료!",
      subTitle: "다음에 또 봐요!",
      confirmText: "닫기",
      oneBtn: true,
    })
  };

  return (
    <header className="w-[1325px] h-[50px] flex justify-between">
      {/* 검색창 */}
      <section
        className="flex justify-between items-center border-8 bg-searchBg border-borderColor_4 rounded-full">
        <span
          className="flex justify-center items-center text-iconColor_1 bg-bookBG rounded-full w-[50px] h-[50px] ml-[-8px]">
          <IconSearch/>
        </span>
        <input type="search" placeholder="Searching book"/>
      </section>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <section className="flex gap-3.5 items-center border-8 bg-nickNameBg border-borderColor_4 rounded-full">
        <span className="pl-2">닉네임님 환영합니다</span>
        <article
          className="flex h-full py-1 overflow-hidden bg-myPageLogOutBg divide-rou divide-x-2 divide-iconDivideColor">
          {/* MyPage 버튼 */}
          <button
            className="flex justify-center items-center text-myPageIconColor px-3"
            onClick={() => openModal('ModalMyPage')} // 클릭 시 ModalMyPage 열기
          >
            <IconMyPage/>
          </button>
          {/* 로그아웃 버튼 */}
          <button
            className="justify-center items-center text-LogOutIconColor px-3"
            onClick={() =>
              openModal('ModalNotice', {
                title: '로그아웃 하시겠어요?',
                cancelText: '닫기',
                confirmText: '로그아웃',
                onConfirm: handleLogout, // 로그아웃 로직 전달
              })
            }
          >
            <IconLogOut/>
          </button>
        </article>
      </section>
    </header>
  );
}
