import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// GitHub Pages (project site): set VITE_BASE=/repo-name/ in CI; "/" for local dev or a custom domain root.
const base = process.env.VITE_BASE ?? "/";

/** Copy index.html to 404.html so client routes (e.g. /bestiary) load the SPA on GitHub Pages. */
function ghPagesSpa404(): Plugin {
  return {
    name: "gh-pages-spa-404",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ghPagesSpa404()],
  base,
});
