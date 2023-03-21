import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { version } from './package.json';

export default defineConfig({
  base: './',
  build: {
    assetsDir: './',
  },
  define: { 
    __APP_VERSION__: JSON.stringify(version),
   },
  server: {
    proxy: {
      '/api': { target: 'https://git-report.com/', secure: false },
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          version,
        },
      },
    }),
  ],
});
