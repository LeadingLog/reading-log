import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 개발 환경에서만 Mocking을 활성화
async function enableMocking() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      quiet: true, // 목데이터 기본 콘솔 로그 출력 억제
      onUnhandledRequest: 'bypass' // 핸들러 구현하지 않는 요청은 바로 서버로 보냄
    })
    // await worker.stop(); // mocking 중지
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