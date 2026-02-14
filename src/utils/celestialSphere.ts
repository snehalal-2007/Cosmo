/**
 * Cosmo – Celestial sphere: RA/Dec to 3D Cartesian on unit sphere.
 * Standard convention: x = cos(dec)*cos(ra), y = cos(dec)*sin(ra), z = sin(dec).
 * RA in hours (0–24), Dec in degrees (-90 to 90). Result is unit vector.
 */
import { Vector3 } from 'three'

/** Convert RA (hours) and Dec (degrees) to unit vector (x, y, z). */
export function raDecToCartesian(
  raHours: number,
  decDeg: number,
  out?: Vector3
): Vector3 {
  const ra = (raHours / 24) * Math.PI * 2
  const dec = (decDeg * Math.PI) / 180
  const cosDec = Math.cos(dec)
  const x = cosDec * Math.cos(ra)
  const y = cosDec * Math.sin(ra)
  const z = Math.sin(dec)
  if (out) {
    out.set(x, y, z)
    return out
  }
  return new Vector3(x, y, z)
}
