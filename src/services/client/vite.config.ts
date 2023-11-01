import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { resolve } from 'path';

const CLIENT_PORT = 80;
const REACT_APP_URL_API = 'http://server:3035';

export const aliases = {
  styles: `/src/styles`,
};

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    server: {
      // open: 'http://localhost:80',
      port: CLIENT_PORT,
      proxy: {
        '/api': {
          target: REACT_APP_URL_API,
          changeOrigin: true,
          secure: false,
        },
      },
      host: true
    },
  }
})
