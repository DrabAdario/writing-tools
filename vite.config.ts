import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages (project site): set VITE_BASE=/repo-name/ in CI; "/" for local dev or a custom domain root.
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
});
