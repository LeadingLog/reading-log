import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 개발 환경에서만 Mocking을 활성화
async function enableMocking() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start()
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