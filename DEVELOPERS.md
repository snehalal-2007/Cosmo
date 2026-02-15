# Cosmo — Developer Guide

This document explains how Cosmo is structured, how key features work, and how to run and extend the project.

---

## Overview

Cosmo is a React SPA with two main views:

1. **Solar System** — A 3D scene with a central simulation clock. Planets orbit and rotate based on time; the user can click planets to focus the camera and open an info panel.
2. **Constellations** — A planetarium: camera at origin, celestial sphere (stars, lines, labels) rotates. The user can select constellations (list or click-in-sky), then zoom to stars and see details in the panel.

State is split between **view** (which mode, which planet/constellation/star selected) and **simulation** (time, scale mode). No OrbitControls in Constellations mode; custom pointer drag + quaternion rotation on the sky group.

---

## Tech stack

| Area | Technology |
|------|------------|
| Build | Vite, TypeScript |
| UI | React 19 |
| 3D | Three.js, React Three Fiber, @react-three/drei |
| State | Zustand (`store/view.ts`, `store/simulation.ts`) |
| Styling | Tailwind CSS |
| Animation | Framer Motion (UI only) |

---

## Directory structure

```
src/
├── App.tsx                 # Root: AppNav, Canvas per mode, layout
├── main.tsx
├── index.css
├── components/
│   ├── canvas/             # Solar System 3D
│   │   ├── Scene.tsx       # Sun, planets, Moon, orbits, SimulationClock
│   │   ├── Planet.tsx      # Planet mesh, click/hover, label
│   │   ├── Sun.tsx, Moon.tsx, OrbitPath.tsx, SaturnRings.tsx
│   │   ├── CameraFocus.tsx  # Smooth camera focus to selected planet
│   │   ├── SimulationClock.tsx
│   │   └── materials/      # PBR, clouds, atmosphere
│   ├── constellations/     # Constellations mode
│   │   ├── ConstellationsPage.tsx   # Canvas, list, toggles, panel wiring
│   │   ├── ConstellationDetailPanel.tsx  # Description, stars, star details
│   │   └── planetarium/
│   │       ├── PlanetariumScene.tsx # Sky group, stars, lines, labels, controllers
│   │       ├── StarRenderer.tsx     # Points + shader (highlight by selectedStarId)
│   │       ├── ConstellationOverlay.tsx  # Line segments (drei Line)
│   │       ├── SkyCameraController.tsx   # Drag, FOV, focus to constellation/star
│   │       ├── ConstellationSkyClick.tsx # Click-in-sky → select constellation
│   │       ├── CardinalDirections.tsx, CardinalRing.tsx
│   │       └── ...
│   └── ui/                 # HUD, InfoPanel, PlanetNav, TimeControlPanel, etc.
├── data/
│   ├── planets.ts, planets data
│   ├── constellationCatalog.ts  # Constellation definitions, lineSegments
│   └── starCatalog.ts      # STAR_CATALOG, getStarById
├── store/
│   ├── view.ts             # appView: 'solar' | 'constellations'
│   └── simulation.ts       # selectedPlanet, simulationTimeDays, scaleMode, etc.
├── utils/
│   ├── orbit.ts            # Orbital position helpers
│   ├── celestialSphere.ts  # raDecToCartesian (RA/Dec → unit vector)
│   └── ...
├── constants/
├── contexts/
└── hooks/
```

---

## How the Solar System works

- **Simulation clock:** `SimulationClock` advances `simulationTimeDays` in the Zustand store. Planets and Moon read this and compute position/rotation each frame in `useFrame`.
- **Selection:** Click on a planet (or its invisible hit sphere) calls `setSelectedPlanet(planetId)`. `CameraFocus` reads `selectedPlanet` and smoothly moves the camera (and optional controls target) toward that planet. `InfoPanel` shows content for `selectedPlanet`.
- **Raycasting:** Stars and orbit lines have raycast disabled so clicks pass through to planets. Planets use a visible mesh plus a larger invisible sphere for easier clicking.

---

## How the Constellations mode works

- **Camera:** Camera stays at `(0, 0, 0)`. The sky is a single `<group>` (ref `skyGroupRef`) whose quaternion is updated by `SkyCameraController` (drag and focus).
- **Focus:** When a constellation or star is selected, the controller computes a target quaternion that puts that direction in front of the camera (`setFromUnitVectors`). A time-based slerp (e.g. 1s) animates the sky group quaternion; FOV is lerped for a slight zoom. Drag clears the focus target so the user keeps control.
- **Stars:** `StarRenderer` uses `THREE.Points` and a shader. Positions come from `STAR_CATALOG` (RA/Dec → Cartesian on a sphere). `selectedStarId` is passed in; the shader uses a uniform `uSelectedIndex` and a vertex `index` attribute to highlight one star (size + brightness + glow).
- **Click-in-sky:** `ConstellationSkyClick` listens for pointer down/up on the canvas. It casts a ray from the camera through the pointer, gets a direction, and checks which constellation “region” (center + angular radius) contains that direction. If the pointer moved less than a few pixels (click, not drag), it calls `onSkyConstellationSelect(con)`; the page sets `selectedConstellation` and clears `selectedStar`, so the existing zoom and panel logic run.
- **Star selection:** In the detail panel, star bubbles toggle selection. Selecting a star sets `selectedStar`; deselecting (same bubble again) clears it and the camera animates back to the constellation focus. State lives in `ConstellationsPage`; `selectedStarId` is passed into the scene for both the star shader highlight and the camera focus.

---

## Data and state

- **Planets:** `data/planets.ts` (and related) define orbits, sizes, etc. Simulation time drives positions.
- **Constellations:** `data/constellationCatalog.ts` — each entry has `lineSegments` (pairs of star IDs). Lines are drawn by looking up star positions from `starCatalog`.
- **Stars:** `data/starCatalog.ts` — `STAR_CATALOG` (id, ra, dec, magnitude), `getStarById`. Used for star positions, constellation lines, and star list/detail in the panel.
- **View:** `store/view.ts` — `appView: 'solar' | 'constellations'`.
- **Simulation:** `store/simulation.ts` — `simulationTimeDays`, `selectedPlanet`, scale mode, etc. Used only in Solar System mode.

---

## Running and building

```bash
npm install
npm run dev      # Dev server (Vite)
npm run build    # tsc -b && vite build
npm run preview  # Serve dist/
npm run lint     # ESLint
```

---

## Conventions and tips

- **Do not** change Solar System behavior when working on Constellations (and vice versa) unless the task explicitly requires it.
- Constellation and star selection are UI + camera only; no scene teardown or full re-renders.
- New 3D objects in the planetarium should live inside the sky `<group>` so they rotate with the sky.
- RA/Dec are in hours and degrees; `utils/celestialSphere.ts` converts to unit vectors. Sphere radius for rendering is a constant (e.g. 500) in the planetarium components.

---

## Adding features

- **New planet or body:** Add data, then a component in `components/canvas/` that reads simulation time and the store; add to `Scene.tsx`.
- **New constellation or star:** Extend `constellationCatalog.ts` and/or `starCatalog.ts`; ensure line segment IDs exist in the star catalog.
- **New UI panel:** Add component under `components/ui/` (or constellations), wire state from the appropriate page or store.

For deeper questions, follow the data flow from `App.tsx` → mode → scene → store and data files.
