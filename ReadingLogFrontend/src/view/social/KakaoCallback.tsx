import SocialLoginCallback from "./OAuthCallbackHandler.tsx";

export default function KakaoCallback() {
  return (
    <SocialLoginCallback
      provider="kakao"
      apiEndpoint="/user/kakaologin"
    />
  );
}