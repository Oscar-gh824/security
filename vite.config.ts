import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const root = import.meta.dirname

// 홈 외에 개인정보처리방침·사용방법 안내서를 별도 정적 페이지로 빌드 (검색엔진 크롤링용)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        privacy: resolve(root, 'privacy/index.html'),
        guide: resolve(root, 'guide/index.html'),
      },
    },
  },
})
