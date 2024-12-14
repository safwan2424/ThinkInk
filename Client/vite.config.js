import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // Backend server URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix before forwarding
//       },
//     },
//   },
// });
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix before forwarding
      },
    },
  },
  build: {
    outDir: 'build', // Specify the output directory as "build"
  },
});
