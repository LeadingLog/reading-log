import IconSearch from "../../assets/Icon-search.svg?react";

export default function Header() {
  return (
    <header className="w-[1325px] h-[50px] flex justify-between">
      <section className="flex relative justify-between items-center border-8 bg-pageBg border-borderColor rounded-full">
        <span className="flex justify-center items-center bg-bookBG rounded-full w-[50px] h-[50px] ml-[-8px]">
          <IconSearch />
        </span>
        <input type="search" placeholder="Searching book" />
      </section>
      <section className="flex items-center border-8 bg-pageBg border-borderColor rounded-full">
        <span>닉네임님 환영합니다</span>
        <span>마이페이지</span>
        <span>로그아웃</span>
      </section>
    </header>
  );
}