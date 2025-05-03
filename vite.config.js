import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd())
  return { 
    plugins: [react()],
    css: {
      devSourcemap: env.VITE_GENERATE_SOURCEMAP, // 👈 esto activa los .map en desarrollo
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['classnames'], // 👈 Evita que Vite lo optimice
    },
  }
})
