/**
 * Cosmo – All 8 planets + Moon. Orbital/rotation periods, scale, and info panel data.
 * Real mode = true scale; Visual mode = compressed distances, visible orbits.
 */

export type PlanetId =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'

export type CelestialId = PlanetId | 'moon'

export type PlanetData = {
  id: PlanetId
  name: string
  /** Orbital period in Earth days */
  orbitalPeriodDays: number
  /** Rotation period in Earth days (axial) */
  rotationPeriodDays: number
  /** Orbital eccentricity (0–1) */
  eccentricity: number
  /** Orbital inclination to ecliptic in degrees */
  inclinationDeg: number
  /** Semi-major axis in AU */
  distanceAU: number
  /** Equatorial radius relative to Earth = 1 */
  sizeRelative: number
  massKg: string
  gravityMS2: number
  /** Surface temp (average) for display */
  surfaceTempK: number
  composition: string
  fact: string
  /** Optional NASA/image URL for info panel */
  imageUrl?: string
}

/** Moon (orbits Earth) */
export type MoonData = {
  id: 'moon'
  name: string
  orbitalPeriodDays: number
  rotationPeriodDays: number
  distanceFromEarthAU: number
  sizeRelativeToEarth: number
  fact: string
}

const MOON_DATA: MoonData = {
  id: 'moon',
  name: 'Moon',
  orbitalPeriodDays: 27.322,
  rotationPeriodDays: 27.322,
  distanceFromEarthAU: 0.00257,
  sizeRelativeToEarth: 0.272,
  fact: 'The Moon is tidally locked; the same side always faces Earth.',
}

export const PLANETS_DATA: Record<PlanetId, PlanetData> = {
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    orbitalPeriodDays: 87.97,
    rotationPeriodDays: 58.65,
    eccentricity: 0.206,
    inclinationDeg: 7.0,
    distanceAU: 0.387,
    sizeRelative: 0.383,
    massKg: '3.285 × 10²³',
    gravityMS2: 3.7,
    surfaceTempK: 440,
    composition: 'Rock, metal',
    fact: 'Mercury has no atmosphere to retain heat; surface temps range from -173°C to 427°C.',
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    orbitalPeriodDays: 224.7,
    rotationPeriodDays: -243.02,
    eccentricity: 0.007,
    inclinationDeg: 3.39,
    distanceAU: 0.723,
    sizeRelative: 0.949,
    massKg: '4.867 × 10²⁴',
    gravityMS2: 8.87,
    surfaceTempK: 737,
    composition: 'Rock, thick CO₂ atmosphere',
    fact: 'Venus rotates backwards and has a day longer than its year.',
  },
  earth: {
    id: 'earth',
    name: 'Earth',
    orbitalPeriodDays: 365.25,
    rotationPeriodDays: 0.9973,
    eccentricity: 0.017,
    inclinationDeg: 0,
    distanceAU: 1,
    sizeRelative: 1,
    massKg: '5.972 × 10²⁴',
    gravityMS2: 9.81,
    surfaceTempK: 288,
    composition: 'Rock, oceans, N₂/O₂ atmosphere',
    fact: 'Earth is the only known world with liquid water and life.',
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    orbitalPeriodDays: 686.98,
    rotationPeriodDays: 1.026,
    eccentricity: 0.093,
    inclinationDeg: 1.85,
    distanceAU: 1.524,
    sizeRelative: 0.532,
    massKg: '6.417 × 10²³',
    gravityMS2: 3.72,
    surfaceTempK: 210,
    composition: 'Rock, thin CO₂ atmosphere',
    fact: 'Mars has the largest volcano in the solar system, Olympus Mons.',
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    orbitalPeriodDays: 4332.59,
    rotationPeriodDays: 0.4135,
    eccentricity: 0.048,
    inclinationDeg: 1.3,
    distanceAU: 5.203,
    sizeRelative: 11.21,
    massKg: '1.898 × 10²⁷',
    gravityMS2: 24.79,
    surfaceTempK: 165,
    composition: 'Gas (H₂, He), no solid surface',
    fact: 'Jupiter’s Great Red Spot is a storm that has lasted at least 400 years.',
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    orbitalPeriodDays: 10759.22,
    rotationPeriodDays: 0.443,
    eccentricity: 0.056,
    inclinationDeg: 2.49,
    distanceAU: 9.537,
    sizeRelative: 9.45,
    massKg: '5.683 × 10²⁶',
    gravityMS2: 10.44,
    surfaceTempK: 134,
    composition: 'Gas (H₂, He), ice/rock core',
    fact: 'Saturn’s rings are mostly ice and rock; they span ~282,000 km.',
  },
  uranus: {
    id: 'uranus',
    name: 'Uranus',
    orbitalPeriodDays: 30688.5,
    rotationPeriodDays: -0.718,
    eccentricity: 0.046,
    inclinationDeg: 0.77,
    distanceAU: 19.19,
    sizeRelative: 4.01,
    massKg: '8.681 × 10²⁵',
    gravityMS2: 8.69,
    surfaceTempK: 76,
    composition: 'Ice, gas (H₂, He, CH₄)',
    fact: 'Uranus rotates on its side with an axial tilt of about 98°.',
  },
  neptune: {
    id: 'neptune',
    name: 'Neptune',
    orbitalPeriodDays: 60182,
    rotationPeriodDays: 0.671,
    eccentricity: 0.009,
    inclinationDeg: 1.77,
    distanceAU: 30.07,
    sizeRelative: 3.88,
    massKg: '1.024 × 10²⁶',
    gravityMS2: 11.15,
    surfaceTempK: 72,
    composition: 'Ice, gas (H₂, He, CH₄)',
    fact: 'Neptune was the first planet found by mathematical prediction.',
  },
}

/** Visual mode: compressed orbit radius and planet size */
const VISUAL_ORBIT_BASE = 6
const VISUAL_SIZE_BASE = 0.35

export function getVisualOrbitRadius(distanceAU: number): number {
  return VISUAL_ORBIT_BASE * Math.sqrt(distanceAU)
}

export function getVisualSize(sizeRelative: number): number {
  return VISUAL_SIZE_BASE * Math.min(sizeRelative, 3)
}

/** Real mode: true scale (scaled down for viewport) */
const REAL_ORBIT_FACTOR = 12
const REAL_SIZE_FACTOR = 0.06

export function getRealOrbitRadius(distanceAU: number): number {
  return REAL_ORBIT_FACTOR * distanceAU
}

export function getRealSize(sizeRelative: number): number {
  return REAL_SIZE_FACTOR * Math.min(sizeRelative, 4)
}

export function getMoonData(): MoonData {
  return MOON_DATA
}

/** Orbital angle in radians from simulation time (days) and period (days) */
export function orbitAngleRad(simulationTimeDays: number, orbitalPeriodDays: number): number {
  return (simulationTimeDays / orbitalPeriodDays) * 2 * Math.PI
}

/** Axial rotation angle in radians */
export function rotationAngleRad(simulationTimeDays: number, rotationPeriodDays: number): number {
  const period = Math.abs(rotationPeriodDays)
  const sign = rotationPeriodDays < 0 ? -1 : 1
  return sign * (simulationTimeDays / period) * 2 * Math.PI
}

export const PLANET_COLORS: Record<PlanetId, string> = {
  mercury: '#8c8c8c',
  venus: '#e6c229',
  earth: '#4a7ba7',
  mars: '#c1440e',
  jupiter: '#c88b3a',
  saturn: '#e9d5a0',
  uranus: '#7ec8c4',
  neptune: '#4166a8',
}

export const PLANET_IDS: PlanetId[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
]

/** Moon orbit radius in scene units (Visual mode – must be > Earth radius so Moon is outside Earth) */
export const MOON_ORBIT_RADIUS_VISUAL = 0.52
/** Moon orbit radius in Real mode (scaled) */
export const MOON_ORBIT_RADIUS_REAL = 0.5
/** Moon size in scene units */
export function getMoonSizeVisual(): number {
  return VISUAL_SIZE_BASE * MOON_DATA.sizeRelativeToEarth
}
export function getMoonSizeReal(): number {
  return REAL_SIZE_FACTOR * MOON_DATA.sizeRelativeToEarth
}
