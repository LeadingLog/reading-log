import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// setupWorker를 사용하여 Mock 서버를 설정하고, 핸들러들을 worker로 전달
export const worker = setupWorker( ...handlers )