/**
 * Cosmo – Full celestial sphere planetarium scene (WebGL).
 * Same starfield and background as Solar System; constellation content rotates around camera at origin.
 */
import { useRef, useEffect } from 'react'
import { Color } from 'three'
import { useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { StarRenderer } from './StarRenderer'
import { ConstellationOverlay } from './ConstellationOverlay'
import { ConstellationNamesOverlay } from './ConstellationNamesOverlay'
import { SelectedConstellationStarLabels } from './SelectedConstellationStarLabels'
import { CardinalDirections } from './CardinalDirections'
import { CardinalRing } from './CardinalRing'
import { SkyCameraController } from './SkyCameraController'
import type { Group } from 'three'
import type { ConstellationCatalogEntry } from '../../../data/constellationCatalog'

export type PlanetariumSceneProps = {
  showConstellationLines: boolean
  showConstellationNames: boolean
  selectedConstellation: ConstellationCatalogEntry | null
}

export function PlanetariumScene({
  showConstellationLines,
  showConstellationNames,
  selectedConstellation,
}: PlanetariumSceneProps) {
  const skyGroupRef = useRef<Group>(null)
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new Color(0x000000)
  }, [scene])

  return (
    <>
      <group ref={skyGroupRef}>
        <Stars radius={120} depth={80} count={4000} factor={4} saturation={0.6} fade speed={0.2} />
        <StarRenderer />
        {showConstellationLines && <ConstellationOverlay />}
        {showConstellationNames && <ConstellationNamesOverlay />}
        {selectedConstellation && (
          <SelectedConstellationStarLabels constellation={selectedConstellation} />
        )}
        <CardinalDirections />
        <CardinalRing />
      </group>
      <SkyCameraController
        skyGroupRef={skyGroupRef}
        selectedConstellation={selectedConstellation}
      />
    </>
  )
}
