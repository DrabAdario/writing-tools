# Fantastical Bestiary

React + TypeScript + Vite + Tailwind. Beast portraits use **real animal photos** with an **elemental overlay** (gradient + typography). Each summon rolls **two independent rarity tiers** (mantle and beast), each using **Common ~46%**, **Uncommon ~28%**, **Rare ~18%**, **Epic ~8%**—then picks a mantle from [`elementCatalog.ts`](src/bestiary/elementCatalog.ts) and a beast from [`animalCatalog.ts`](src/bestiary/animalCatalog.ts).

### Photo sources

1. **Default:** [Wikimedia Commons](https://commons.wikimedia.org) (`Special:FilePath`) images from a small verified pool, mapped semantically per beast; re-rolls vary by seed. Mythic/epic names may share stylized pools until you add more Commons files.
2. **Optional:** set `VITE_UNSPLASH_ACCESS_KEY` in `.env.local` (see `.env.example`). The app runs an Unsplash **search** per beast (wildlife for real animals; fantasy-oriented queries for mythic names like Dragon or Sphinx) and picks a stable result with your seed—usually a better match than Commons alone.

## Local development

```bash
npm install
cp .env.example .env.local
# Optionally add VITE_UNSPLASH_ACCESS_KEY=your_client_id
npm run dev
```

## GitHub Pages (project site)

1. In the repository **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main`. The workflow in `.github/workflows/deploy-pages.yml` builds with `VITE_BASE=/<repository-name>/` so asset URLs resolve under `https://<user>.github.io/<repository-name>/`.
3. For a **user or organization site** (`username.github.io`), set `VITE_BASE=/` when building (for example in the workflow env or a manual `npm run build`).

Manual build for Pages:

```bash
VITE_BASE=/your-repo-name/ npm run build
```

The output is in `dist/`. You can also use `npm run deploy` (gh-pages) if you prefer publishing the `dist` branch instead of Actions.
