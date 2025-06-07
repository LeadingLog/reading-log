import axios from 'axios';
import { useUserStore } from "../store/userStore.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create( {
  baseURL: serverUrl,
} );

api.interceptors.response.use(
  response => response,
  error => {
    // Backend 세션이 종료되었을 때
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // 1. 사용자 상태 초기화
      useUserStore.getState().resetUser();

      // 2. 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }

    return Promise.reject( error );
  }
);

export default api;
