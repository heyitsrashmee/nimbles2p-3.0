import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@gifs": path.resolve(__dirname, "gifs"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
