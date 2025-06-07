import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore.ts";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { resetUser } = useUserStore();

  const [authorized, setAuthorized] = useState<boolean | null>( null );

  useEffect( () => {
    (async () => {
      try {
        await axios.get( `${serverUrl}/user/getUserSession`, {
          withCredentials: true,
        } );
        setAuthorized( true );
      } catch (error: unknown) {
        if (axios.isAxiosError( error ) && error.response?.status === 401) {
          resetUser();
          localStorage.clear();
        }
        setAuthorized( false );
      }
    })();
  }, [] );

  if (authorized === null) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          {/* 로딩 */}
          <div className="w-10 h-10 border-4 border-loadingBg border-t-loadingSpinner rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace/>;
  }

  return <>{children}</>;
}
