/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" || process.env.VERCEL ? "/" : "/NewsExplorer/",
  plugins: [react()],
  server: { port: 3000 },
}));
