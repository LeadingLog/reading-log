import KaKaoLoginBtn from "../../public/image/login/kakao_login_btn.png";
import NaverLoginBtn from "../../public/image/login/naver_login_btn.png";

export default function Login() {
  return (
    <section
      className="absolute flex flex-col gap-[85px] justify-center items-center w-[1325px] left-1/2 transform -translate-x-1/2 top-[10%] bottom-[10%] bg-bookBG rounded-lg">
      <p className="text-white text-[40px]">My Reading LOG</p>
      <div className="text-white text-[40px]">로고 자리</div>
      <article className="flex flex-col gap-[20px]">
        <button className="bg-socialBg text-[40px] w-[400px] h-[65px] rounded-xl">
          <img
            src={KaKaoLoginBtn}
            alt={"카카오 로그인"}
            className={"hover:brightness-90"}
          />
        </button>
        <button className="bg-socialBg  text-[40px] w-[400px] h-[65px] rounded-lg">
          <img
            src={NaverLoginBtn}
            alt={"네이버 로그인"}
            className={"hover:brightness-90"}
          />
        </button>
      </article>
    </section>
  );
}
