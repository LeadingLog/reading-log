import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // server: {
  //   proxy: {
  //     '/api/aladin': {
  //       target: 'https://www.aladin.co.kr',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api\/aladin/, ''),
  //     },
  //   },
  // },
  build: {
    outDir: 'dist', // 빌드 결과물이 dist 폴더에 생성됨
  },
});
