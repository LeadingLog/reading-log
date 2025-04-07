import SocialLoginCallback from "./OAuthCallbackHandler.tsx";

export default function NaverCallback() {
  return (
    <SocialLoginCallback
      provider="naver"
      apiEndpoint="/user/naverlogin"
    />
  );
}