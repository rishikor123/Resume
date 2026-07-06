# RK.SPACE

Rishita Korapati's portfolio — a cinematic scroll site across finance, analytics, and AI.
Built with Vite + React. All visuals (data spiral, constellation field, glass cards,
count-up metrics, sticky Signal Path, modal Open details) are self-contained in
`src/App.jsx`; no external animation libraries are required.

## Project structure

```
rk-space/
├── index.html            # Vite entry HTML
├── package.json          # scripts + dependencies
├── vite.config.js        # Vite + @vitejs/plugin-react
├── .gitignore
├── README.md
└── src/
    ├── main.jsx          # React root, mounts <App/>
    ├── App.jsx           # the full RK.SPACE website
    └── index.css         # minimal global reset (design lives in App.jsx)
```

## Run locally

You need Node.js 18+ (check with `node -v`).

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
```

Build and preview the production bundle:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built site locally
```

## Push to GitHub

Create an empty repo on github.com first (no README/gitignore — this folder has them),
then from inside `rk-space/`:

```bash
git init
git add .
git commit -m "Initial commit: RK.SPACE"
git branch -M main
git remote add origin https://github.com/rishikor123/rk-space.git
git push -u origin main
```

If the remote already has commits, pull first:
`git pull origin main --allow-unrelated-histories`

## Deploy on Vercel

1. Go to vercel.com → **Add New… → Project** → import the `rk-space` repo.
2. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Click **Deploy**. Every push to `main` redeploys automatically.

## Notes

- The stylesheet is injected inside `App.jsx` via `<style>{CSS}</style>`, so
  `src/index.css` intentionally holds only a reset. Keep design changes in `App.jsx`.
- Fonts (Instrument Serif, Space Grotesk, JetBrains Mono) load from Google Fonts
  via an `@import` at the top of the injected CSS.
- Respects `prefers-reduced-motion` and includes keyboard-accessible navigation.
