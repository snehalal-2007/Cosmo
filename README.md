# 🌌Cosmo

**Cosmo** is a high-fidelity space visualization app built with React and Three.js. It offers two main modes: an interactive **Solar System** and a **Constellations** planetarium, with a clean, modern interface and smooth camera controls.

---

## What is Cosmo?

- **Solar System mode** — Navigate the Sun and planets in 3D. Click any body to focus the camera and open an info panel with facts, mythology, and a daily fact. Control simulation time (play, pause, speed), toggle scale realism, and use the minimap for orientation.
- **Constellations mode** — A full celestial sphere planetarium. View catalog stars and constellation lines, rotate the sky by dragging, zoom with scroll, and use the searchable constellation list. Click a constellation (in the list or in the sky) to zoom to it and open its description; click star bubbles to zoom to individual stars and see details.

All motion is driven by a central simulation clock where applicable; there are no hardcoded looping animations.

---

## ✨ Features

- **Solar System** — Sun and planets (including Earth’s Moon), PBR materials, orbital paths, time controls, planet nav, info panel, minimap.
- **Constellations** — RA/Dec star catalog, constellation line overlays, cardinal directions and ring, click-in-sky to select constellation, star bubbles with details, smooth zoom to constellation or star, toggle back on second click.
- **Shared:** Full-screen WebGL canvas, responsive UI, mode switcher (AppNav).

---

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use the top nav to switch between **Solar System** and **Constellations**.

```bash
npm run build   # Production build
npm run preview # Preview production build
```

---

## 🛠️ Tech stack

- **React 19** + **TypeScript**
- **Vite** — build and dev server
- **Three.js** — 3D rendering
- **React Three Fiber** — React renderer for Three
- **@react-three/drei** — helpers (Line, Html, Stars, etc.)
- **Zustand** — app and simulation state
- **Framer Motion** — UI animations
- **Tailwind CSS** — styling

---

## 📁 Project structure (high level)

- `src/App.tsx` — Root app, mode switch, Canvas and UI layout.
- `src/components/canvas/` — Solar System scene (Sun, planets, Moon, orbits, materials).
- `src/components/constellations/` — Constellations page and planetarium (sky, stars, lines, click handling).
- `src/components/ui/` — HUD, panels, nav, controls.
- `src/data/` — Planet data, constellation catalog, star catalog.
- `src/store/` — View mode and simulation state.
- `src/utils/` — Orbital math, celestial sphere (RA/Dec), helpers.

For architecture, data flow, and how to work on the codebase, see **[DEVELOPERS.md](./DEVELOPERS.md)**.
