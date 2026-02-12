/**
 * Cosmo – Solar system: starfield, Sun, all 8 planets, Moon, Saturn rings, orbit trails.
 * Stars raycast disabled so clicks pass through to planets (fixes inner-planet focus).
 */
import { useRef, useEffect, useLayoutEffect } from 'react'
import { Color } from 'three'
import type { Points } from 'three'
import { useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Sun } from './Sun'
import { Planet, PlanetEarthDirectLoaderTest } from './Planet'
import { Moon } from './Moon'
import { SaturnRings } from './SaturnRings'
import { OrbitPath } from './OrbitPath'
import { CameraFocus } from './CameraFocus'
import { SimulationClock } from './SimulationClock'
import { TexturePreloadProvider } from '../../contexts/TexturePreloadContext'
import { useSimulationStore } from '../../store'
import {
  PLANETS_DATA,
  PLANET_IDS,
  getMoonData,
  getVisualOrbitRadius,
  getVisualSize,
  getRealOrbitRadius,
  getRealSize,
  MOON_ORBIT_RADIUS_VISUAL,
  MOON_ORBIT_RADIUS_REAL,
  getMoonSizeVisual,
  getMoonSizeReal,
} from '../../data/planets'
export function Scene() {
  const { scene } = useThree()
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const sunBrightness = useSimulationStore((s) => s.sunBrightness)
  const controlsRef = useRef<import('three-stdlib').OrbitControls>(null)
  const moonData = getMoonData()

  useEffect(() => {
    scene.background = new Color(0x000000)
  }, [scene])

  const isVisual = scaleMode === 'visual'
  const getOrbitRadius = isVisual ? getVisualOrbitRadius : getRealOrbitRadius
  const getSize = isVisual ? getVisualSize : getRealSize
  const maxDist = isVisual ? 80 : 200

  const earthData = PLANETS_DATA.earth
  const saturnData = PLANETS_DATA.saturn

  const starsRef = useRef<Points>(null)

  useLayoutEffect(() => {
    const points = starsRef.current
    if (points) (points as unknown as { raycast: () => void }).raycast = () => {}
  }, [])

  return (
    <TexturePreloadProvider>
      <SimulationClock />

      <Stars ref={starsRef} radius={120} depth={80} count={4000} factor={4} saturation={0.6} fade speed={0.2} />

      <ambientLight intensity={0.28} />
      <pointLight
        position={[0, 0, 0]}
        intensity={3.2 * sunBrightness}
        distance={maxDist}
        decay={2.2}
        color="#fff5e0"
      />
      <Sun />

      {isVisual &&
        PLANET_IDS.map((id) => {
          const data = PLANETS_DATA[id]
          return (
            <OrbitPath
              key={`path-${id}`}
              orbitRadius={getOrbitRadius(data.distanceAU)}
              inclinationDeg={data.inclinationDeg}
            />
          )
        })}

      {PLANET_IDS.map((id) => {
        const data = PLANETS_DATA[id]
        const planetProps = {
          planetId: id,
          planetName: data.name,
          orbitRadius: getOrbitRadius(data.distanceAU),
          size: getSize(data.sizeRelative),
          orbitalPeriodDays: data.orbitalPeriodDays,
          rotationPeriodDays: data.rotationPeriodDays,
          inclinationDeg: data.inclinationDeg,
        }
        return id === 'earth' ? (
          <PlanetEarthDirectLoaderTest key={id} {...planetProps} />
        ) : (
          <Planet key={id} {...planetProps} />
        )
      })}

      <Moon
        earthOrbitRadius={getOrbitRadius(earthData.distanceAU)}
        earthOrbitalPeriodDays={earthData.orbitalPeriodDays}
        earthInclinationDeg={earthData.inclinationDeg}
        moonOrbitRadius={isVisual ? MOON_ORBIT_RADIUS_VISUAL : MOON_ORBIT_RADIUS_REAL}
        moonOrbitalPeriodDays={moonData.orbitalPeriodDays}
        moonRotationPeriodDays={moonData.rotationPeriodDays}
        moonSize={isVisual ? getMoonSizeVisual() : getMoonSizeReal()}
      />

      <SaturnRings
        orbitRadius={getOrbitRadius(saturnData.distanceAU)}
        orbitalPeriodDays={saturnData.orbitalPeriodDays}
        inclinationDeg={saturnData.inclinationDeg}
        innerRadius={getSize(saturnData.sizeRelative) * 1.2}
        outerRadius={getSize(saturnData.sizeRelative) * 2.2}
      />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={3}
        maxDistance={maxDist}
        maxPolarAngle={Math.PI * 0.98}
      />
      <CameraFocus controlsRef={controlsRef} />

      <EffectComposer>
        <Bloom
          intensity={2.8 * sunBrightness}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette offset={0.35} darkness={0.6} eskil={false} />
      </EffectComposer>
    </TexturePreloadProvider>
  )
}
