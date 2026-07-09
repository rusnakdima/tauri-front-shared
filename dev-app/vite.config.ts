import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@tauri-front/shared": resolve(__dirname, "../projects/shared/dist"),
    },
  },
  optimizeDeps: {
    include: [
      "zone.js",
      "@angular/platform-browser",
      "@angular/common",
      "@angular/core",
      "@angular/forms",
      "@angular/router",
      "@angular/material/icon",
    ],
  },
  ssr: {
    noExternal: ["@tauri-front/shared"],
    external: [
      "@angular/platform-browser",
      "@angular/common",
      "@angular/core",
      "@angular/forms",
      "@angular/router",
      "@angular/material",
    ],
  },
  build: {
    target: "esnext",
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
