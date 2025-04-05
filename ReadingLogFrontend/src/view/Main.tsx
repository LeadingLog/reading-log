import Header from "../components/layout/Header.tsx";
import LeftPage from "../components/layout/LeftPage.tsx";
import RightPage from "../components/layout/RightPage.tsx";
import ModalManager from "../components/modal/ModalManager.tsx";

export default function Main() {

  return (
    <section className="flex flex-col gap-[25px] pt-[80px] pb-[2%] h-full justify-center items-center">
      <Header />
      <article className="flex flex-1 overflow-hidden p-[20px] gap-[20px] justify-center items-center w-[1325px] bg-book_Bg rounded-xl">
        <LeftPage />
        <RightPage/>
      </article>
      <ModalManager />
    </section>
  );
}
