/**
 * Cosmo – Compute world position of Sun, any planet, or Moon from simulation time.
 * Used for dynamic camera focus (OrbitControls target).
 */
import { Vector3 } from 'three'
import type { CelestialId, PlanetId } from '../data/planets'
import {
  PLANETS_DATA,
  orbitAngleRad,
  getMoonData,
  getVisualOrbitRadius,
  getRealOrbitRadius,
  MOON_ORBIT_RADIUS_VISUAL,
  MOON_ORBIT_RADIUS_REAL,
} from '../data/planets'
import { getOrbitPosition, getOrbitPositionWithInclination } from './orbit'

function getEarthPositionVisual(simulationTimeDays: number): Vector3 {
  const earth = PLANETS_DATA.earth
  const r = getVisualOrbitRadius(earth.distanceAU)
  const angle = orbitAngleRad(simulationTimeDays, earth.orbitalPeriodDays)
  return getOrbitPositionWithInclination(r, angle, earth.inclinationDeg)
}

function getEarthPositionReal(simulationTimeDays: number): Vector3 {
  const earth = PLANETS_DATA.earth
  const r = getRealOrbitRadius(earth.distanceAU)
  const angle = orbitAngleRad(simulationTimeDays, earth.orbitalPeriodDays)
  return getOrbitPositionWithInclination(r, angle, earth.inclinationDeg)
}

/**
 * Returns world position of the given celestial body at the given simulation time.
 * Sun = (0,0,0). Scale mode determines orbit radii (visual vs real).
 */
export function getCelestialWorldPosition(
  bodyId: CelestialId | null,
  simulationTimeDays: number,
  scaleMode: 'visual' | 'real'
): Vector3 {
  if (!bodyId) return new Vector3(0, 0, 0)

  const isVisual = scaleMode === 'visual'
  const getOrbitRadius = isVisual ? getVisualOrbitRadius : getRealOrbitRadius

  if (bodyId === 'moon') {
    const moonData = getMoonData()
    const earthPos =
      isVisual ? getEarthPositionVisual(simulationTimeDays) : getEarthPositionReal(simulationTimeDays)
    const moonRadius = isVisual ? MOON_ORBIT_RADIUS_VISUAL : MOON_ORBIT_RADIUS_REAL
    const moonAngle = orbitAngleRad(simulationTimeDays, moonData.orbitalPeriodDays)
    const offset = getOrbitPosition(moonRadius, moonAngle)
    return new Vector3(earthPos.x + offset.x, earthPos.y + offset.y, earthPos.z + offset.z)
  }

  const data = PLANETS_DATA[bodyId as PlanetId]
  const r = getOrbitRadius(data.distanceAU)
  const angle = orbitAngleRad(simulationTimeDays, data.orbitalPeriodDays)
  return getOrbitPositionWithInclination(r, angle, data.inclinationDeg)
}
