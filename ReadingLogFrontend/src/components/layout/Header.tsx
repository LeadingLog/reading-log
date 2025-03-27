import IconSearch from "../../assets/Icon-search.svg?react";
import IconLogOut from "../../assets/Icon-logout.svg?react";
import IconMyPage from "../../assets/Icon-Mypage.svg?react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-[1325px] h-[50px] flex justify-between">
      {/* 검색창 */}
      <section
        className="flex relative justify-between items-center border-8 bg-searchBg border-borderColor_4 rounded-full">
        <span className="flex justify-center items-center text-iconColor_1 bg-bookBG rounded-full w-[50px] h-[50px] ml-[-8px]">
          <IconSearch />
        </span>
        <input type="search" placeholder="Searching book" />
      </section>
      {/* 닉네임 & 마이페이지 & 로그아웃 */}
      <section className="flex gap-3.5 items-center border-8 bg-nickNameBg border-borderColor_4 rounded-full">
        <span className="pl-2">닉네임님 환영합니다</span>
        <article className="flex rounded-e-full overflow-hidden -m-2">
          <Link to="/login"><button className="relative text-iconColor_1 bg-bookBG p-3
          after:content-[''] after:absolute after:right-[-1px] after:top-[20%] after:bottom-[20%] after:w-0.5 after:rounded-full after:bg-iconColor_1"
          ><IconMyPage /></button></Link>
          <button className="text-iconColor_1 bg-bookBG p-3"><IconLogOut /></button>
        </article>
      </section>
    </header>
  );
}