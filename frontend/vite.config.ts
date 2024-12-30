import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server : {
    host : true,
    port : 5173},
  preview : {
    host : true,
    port : 5173},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
