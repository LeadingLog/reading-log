// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StrictMode } from "react";

// 개발 환경에서만 Mocking을 활성화
async function enableMocking() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      quiet: true, // ✅ 목데이터 기본 콘솔 로그 출력 억제
    })
    // await worker.stop(); // ✅ mocking 중지
  }
}

enableMocking().then( () => {
  createRoot( document.getElementById( 'root' )! ).render(
    <>
    <StrictMode>
      <App/>
    </StrictMode>
    </>
  )
} )