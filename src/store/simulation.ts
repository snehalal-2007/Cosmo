/**
 * Cosmo – Central simulation state: time, scale mode, sun brightness, focus.
 * All orbital and rotation motion derives from simulationTimeDays.
 */
import { create } from 'zustand'
import type { CelestialId } from '../data/planets'

export type ScaleMode = 'real' | 'visual'

/** Global focus point for OrbitControls (Sun = origin when no selection). */
export type FocusTargetVec3 = { x: number; y: number; z: number }

type SimulationState = {
  /** Central simulation time in Earth days (drives all orbits/rotations) */
  simulationTimeDays: number
  /** 0 = paused, 1 = 1 real sec = 1 sim day, 10000 = fast, negative = reverse */
  timeMultiplier: number
  isPaused: boolean
  scaleMode: ScaleMode
  /** 0 = dim, 1 = default cinematic (affects Sun mesh, point light, bloom) */
  sunBrightness: number
  /** Currently hovered body (for labels); does not affect selection. */
  hoveredPlanet: CelestialId | null
  /** Selected body (info panel + camera focus). null = focus Sun. */
  selectedPlanet: CelestialId | null
  /** Current OrbitControls target in world space; updated each frame from selected body. */
  focusTarget: FocusTargetVec3
}

type SimulationActions = {
  setTimeMultiplier: (v: number) => void
  setPaused: (paused: boolean) => void
  setScaleMode: (mode: ScaleMode) => void
  setSunBrightness: (v: number) => void
  setHoveredPlanet: (id: CelestialId | null) => void
  setSelectedPlanet: (id: CelestialId | null) => void
  setFocusTarget: (pos: FocusTargetVec3) => void
  /** Advance central clock (called from useFrame in one place) */
  advanceSimulationTime: (deltaSeconds: number) => void
  setSimulationTimeDays: (days: number) => void
}

export const useSimulationStore = create<SimulationState & SimulationActions>((set, get) => ({
  simulationTimeDays: 0,
  timeMultiplier: 1,
  isPaused: false,
  scaleMode: 'visual',
  sunBrightness: 0.85,
  hoveredPlanet: null,
  selectedPlanet: null,
  focusTarget: { x: 0, y: 0, z: 0 },

  setTimeMultiplier: (v) => set({ timeMultiplier: v }),
  setPaused: (paused) => set({ isPaused: paused }),
  setScaleMode: (mode) => set({ scaleMode: mode }),
  setSunBrightness: (v) => set({ sunBrightness: Math.max(0, Math.min(1, v)) }),
  setHoveredPlanet: (id) => set({ hoveredPlanet: id }),
  setSelectedPlanet: (id) => set({ selectedPlanet: id }),
  setFocusTarget: (pos) => set({ focusTarget: pos }),
  advanceSimulationTime: (deltaSeconds) => {
    const { isPaused, timeMultiplier } = get()
    if (isPaused) return
    set((s) => ({
      simulationTimeDays: s.simulationTimeDays + deltaSeconds * timeMultiplier,
    }))
  },
  setSimulationTimeDays: (days) => set({ simulationTimeDays: days }),
}))
