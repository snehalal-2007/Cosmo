/**
 * Cosmo – High-Fidelity Space Visualization Engine
 * Full-screen Canvas + HUD (time, scale) + Info panel (on planet click).
 */
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/canvas'
import { HUD, TimeControlPanel, InfoPanel, MiniMap, PlanetNav } from './components/ui'
import { useSimulationStore } from './store'

function App() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 55, near: 0.1, far: 2000 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        onPointerMissed={(e: MouseEvent) => {
          // Only clear selection when the click was on the 3D canvas (empty space).
          // Clicks on UI (e.g. Sun brightness slider) must not clear selection.
          if ((e.target as HTMLElement)?.tagName === 'CANVAS') {
            useSimulationStore.getState().setSelectedPlanet(null)
          }
        }}
      >
        <Scene />
      </Canvas>
      <div className="absolute left-4 top-4 bottom-4 z-10 flex w-56 min-w-[12rem] flex-col gap-4">
        <HUD />
        <div className="min-h-4 flex-1" />
        <TimeControlPanel />
        <MiniMap />
      </div>
      <PlanetNav />
      <InfoPanel />
    </div>
  )
}

export default App
