import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteImagemin from "vite-plugin-imagemin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss(),
      viteImagemin({
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.7, 0.8],
      },
      webp: {
        quality: 80,
      },
    }),
  ],
})
