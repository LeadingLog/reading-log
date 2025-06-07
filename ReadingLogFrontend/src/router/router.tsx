import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../view/Main.tsx";
import Error from "../view/Error.tsx";
import Login from "../view/Login.tsx";
import NaverCallback from "../view/social/NaverCallback.tsx";
import KakaoCallback from "../view/social/KakaoCallback.tsx";
import ProtectedRoute from "../routes/ProtectedRoute.tsx";
import { useUserStore } from "../store/userStore.ts";

export default function Router() {
  const { userId } = useUserStore();

  return (
    <Routes>
      <Route path="*" element={<Error/>}/>
      {/*<Route path="/" element={<Main/>}/>*/}
      {/*<Route path="/login" element={<Login/>}/>*/}
      <Route path="/oauth/naver/callback" element={<NaverCallback/>}/>
      <Route path="/oauth/kakao/callback" element={<KakaoCallback/>}/>

      {/*루트 경로 접근 시 로그인 여부 체크*/}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main/>
          </ProtectedRoute>
        }
      />


      {/*로그인 페이지는 로그인되어있으면 메인으로 리다이렉트*/}
      <Route
        path="/login"
        element={(userId !== 0) ? <Navigate to="/" replace/> : <Login/>}
      />

    </Routes>
  );
}