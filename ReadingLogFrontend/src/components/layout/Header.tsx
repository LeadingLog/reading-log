import Account from "../homeTop/Account.tsx"
import MainBookSearch from "../homeTop/MainBookSearch.tsx";
import Logo from "../../assets/LOGO.svg?react";

export default function Header() {

  return (
    <header className="w-[1325px] fixed top-[15px] flex justify-between gap-2 z-10">
      {/* 검색창 */}
      <MainBookSearch/>
      <span className="h-[50px] -z-10 absolute top-0 left-1/2 -translate-x-1/2">
        <Logo height="100%"/>
      </span>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <Account/>
    </header>
  );
}
