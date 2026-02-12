/**
 * Cosmo – Orbital mechanics. Position from angle; optional inclination.
 */
import { Vector3 } from 'three'

/**
 * Position on a circular orbit in the XZ plane (Y-up).
 * Angle = 0 is +X; counter-clockwise when viewed from +Y.
 */
export function getOrbitPosition(orbitRadius: number, angleRad: number): Vector3 {
  return new Vector3(
    orbitRadius * Math.cos(angleRad),
    0,
    orbitRadius * Math.sin(angleRad)
  )
}

/**
 * Position with inclination (degrees). Orbit plane tilted around X-axis.
 */
export function getOrbitPositionWithInclination(
  orbitRadius: number,
  angleRad: number,
  inclinationDeg: number
): Vector3 {
  const inc = (inclinationDeg * Math.PI) / 180
  const x = orbitRadius * Math.cos(angleRad)
  const z = orbitRadius * Math.sin(angleRad)
  const y = z * Math.sin(inc)
  const zOut = z * Math.cos(inc)
  return new Vector3(x, y, zOut)
}
