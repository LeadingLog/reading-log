import Logo from "../assets/LOGO.svg?react";
import KakaoLogo from "../assets/login/KaKao_Logo.svg?react";
import NaverLogo from "../assets/login/Naver_Logo.svg?react";

const handleSocialLogin = (provider: string) => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const state = Math.random().toString( 36 ).substring( 2 );
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=${state}`;

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${state}`;

  localStorage.setItem( "state", state );
  if (provider === "naver") {
    window.location.href = NAVER_AUTH_URL;
  } else if (provider === "kakao") {
    window.location.href = KAKAO_AUTH_URL;
  }
};

export default function Login() {
  return (
    <section
      className="absolute flex flex-col gap-6 p-8 border-l-[15px] border-Login_Left_Border justify-start items-center left-1/2 w-[450px] transform -translate-x-1/2 top-[20%] bottom-[20%] bg-Login_bg rounded-r-2xl">
      <div className="flex-1 w-full max-h-36 px-10 bg-Login_Logo_bg justify-center items-center rounded-xl">
        <Logo className="w-full h-full" />
      </div>
      <article className="flex flex-1 justify-center flex-col gap-6">
        <button
          type="button"
          onClick={() => handleSocialLogin( "kakao" )}
          className="hover:brightness-[96%] flex gap-4 items-center bg-Login_Kakao_bg p-4 rounded-xl">
          <span className="w-6">
            <KakaoLogo width="100%" height="100%"/>
          </span>
          <span className="text-nowrap">카카오 로그인</span>

        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin( "naver" )}
          className="hover:brightness-[96%] flex gap-4 items-center bg-Login_Naver_bg p-4 rounded-xl">
          <span className="w-6">
            <NaverLogo width="100%" height="100%"/>
          </span>
          <span className="text-nowrap text-white">네이버 로그인</span>
        </button>
      </article>
    </section>
  );
}