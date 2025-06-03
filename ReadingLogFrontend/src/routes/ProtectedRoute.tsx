import {Navigate} from "react-router-dom";
import {useUserStore} from "../store/userStore.ts";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
  const userId = useUserStore((state) => state.userId);

  if (userId === 0) { // 로그인이 안 되어 있으면 /login 으로 이동
    return <Navigate to="/login" replace/>;
  }

  return children;
};