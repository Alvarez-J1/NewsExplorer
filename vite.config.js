/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/NewsExplorer/",
  plugins: [react()],
  server: { port: 3000 },
});
