import KaKaoLoginBtn from "../assets/login/kakao_login_btn.png";
import NaverLoginBtn from "../assets/login/naver_login_btn.png";

const handleSocialLogin = (provider: string) => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const state = Math.random().toString(36).substring(2);
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=${state}`;

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${state}`;

  localStorage.setItem("state", state);
  if (provider === "naver") {
    window.location.href = NAVER_AUTH_URL;
  } else if (provider === "kakao") {
    window.location.href = KAKAO_AUTH_URL;
  }
};

export default function Login() {
  return (
    <section
      className="absolute flex flex-col gap-[85px] justify-center items-center w-[1325px] left-1/2 transform -translate-x-1/2 top-[10%] bottom-[10%] bg-bookBG rounded-lg">
      <p className="text-white text-[40px]">My Reading LOG</p>
      <div className="text-white text-[40px]">로고 자리</div>
      <article className="flex flex-col gap-[20px]">
        <button
          type="button"
          onClick={() => handleSocialLogin("kakao")}
          className="bg-socialBg text-[40px] w-[400px] h-[65px] rounded-xl">
          <img
            src={KaKaoLoginBtn}
            alt={"카카오 로그인"}
            className={"hover:brightness-90"}
          />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("naver")}
          className="bg-socialBg  text-[40px] w-[400px] h-[65px] rounded-lg">
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