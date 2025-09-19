import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import { defineConfig } from "vite";

/**
 * Vite configuration for Event Booking System Frontend
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Copy index.html to 404.html for SPA routing support
    {
      name: "copy-index-to-404",
      writeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  build: {
    copyPublicDir: true,
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["react-hot-toast"],
        },
      },
    },
  },
  // Development server configuration
  server: {
    port: 5173,
    open: true,
  },
});
