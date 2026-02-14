/**
 * Cosmo – App view mode: Solar System vs Constellations.
 * Kept separate from simulation store so existing code is untouched.
 */
import { create } from 'zustand'

export type AppView = 'solar' | 'constellations'

type ViewState = {
  appView: AppView
}

type ViewActions = {
  setAppView: (view: AppView) => void
}

export const useViewStore = create<ViewState & ViewActions>((set) => ({
  appView: 'solar',
  setAppView: (view) => set({ appView: view }),
}))
