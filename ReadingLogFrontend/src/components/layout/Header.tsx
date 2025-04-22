import Account from "../homeTop/Account.tsx"
import MainBookSearch from "../homeTop/MainBookSearch.tsx";

export default function Header() {

  return (
    <header className="w-[1325px] fixed top-[15px] flex justify-between gap-2 z-10">
      {/* 검색창 */}
      <MainBookSearch/>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <Account/>
    </header>
  );
}
