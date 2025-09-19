import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-index-to-404",
      writeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  build: {
    copyPublicDir: true,
  },
});
