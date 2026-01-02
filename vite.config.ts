import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/credential': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      // ADICIONE ISSO AQUI:
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true, // Importante!
        changeOrigin: true, // Importante!
        rewrite: (path) => path.replace(/^\/ws/, '') // Remove o /ws antes de mandar pro back
      }
    }
  }
});