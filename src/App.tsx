/**
 * Cosmo – High-Fidelity Space Visualization Engine
 * Full-screen Canvas + HUD (time, scale) + Info panel (on planet click).
 */
import './index.css'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/canvas'
import { HUD, TimeControlPanel, InfoPanel, MiniMap } from './components/ui'
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
      <HUD />
      <TimeControlPanel />
      <InfoPanel />
      <MiniMap />
    </div>
  )
}

export default App
