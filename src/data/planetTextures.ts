/**
 * Cosmo – Planet texture paths and PBR config.
 * Place textures under public/textures/{planet}/diffuse.jpg (IDs lowercase, exact match).
 * See /public/textures/README.md for expected filenames and sources.
 */
import type { PlanetId } from './planets'
import { PLANET_COLORS } from './planets'

/** Base URL for assets; no trailing slash. Empty string means site root. */
const _base =
  (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL != null
    ? import.meta.env.BASE_URL
    : '/'
  ).replace(/\/$/, '') ?? ''

/** Resolved base for asset URLs. Never use "//" so paths stay origin-relative (e.g. /textures/...). */
export const BASE_URL = _base || '/'

/** Path prefix for textures: /textures when at root, or /subpath/textures when base is set. */
const TEXTURE_BASE = _base ? `${_base}/textures` : '/textures'

/** Single source of truth: diffuse.jpg path per body. Keys must match planet IDs, "moon", and "sun" (lowercase). */
export const DIFFUSE_TEXTURE_URLS: Record<PlanetId | 'moon' | 'sun', string> = {
  mercury: `${TEXTURE_BASE}/mercury/diffuse.jpg`,
  venus: `${TEXTURE_BASE}/venus/diffuse.jpg`,
  earth: `${TEXTURE_BASE}/earth/diffuse.jpg`,
  mars: `${TEXTURE_BASE}/mars/diffuse.jpg`,
  jupiter: `${TEXTURE_BASE}/jupiter/diffuse.jpg`,
  saturn: `${TEXTURE_BASE}/saturn/diffuse.jpg`,
  uranus: `${TEXTURE_BASE}/uranus/diffuse.jpg`,
  neptune: `${TEXTURE_BASE}/neptune/diffuse.jpg`,
  moon: `${TEXTURE_BASE}/moon/diffuse.jpg`,
  sun: `${TEXTURE_BASE}/sun/diffuse.jpg`,
}

export type PlanetTextureSet = {
  diffuse?: string
  normal?: string
  roughness?: string
  specular?: string
}

/** Texture paths per planet (diffuse from DIFFUSE_TEXTURE_URLS for consistency). */
export const PLANET_TEXTURE_PATHS: Record<PlanetId, PlanetTextureSet> = {
  mercury: {
    diffuse: DIFFUSE_TEXTURE_URLS.mercury,
    normal: `${TEXTURE_BASE}/mercury/normal.jpg`,
    roughness: `${TEXTURE_BASE}/mercury/roughness.jpg`,
  },
  venus: {
    diffuse: DIFFUSE_TEXTURE_URLS.venus,
    normal: `${TEXTURE_BASE}/venus/normal.jpg`,
    roughness: `${TEXTURE_BASE}/venus/roughness.jpg`,
  },
  earth: {
    diffuse: DIFFUSE_TEXTURE_URLS.earth,
    normal: `${TEXTURE_BASE}/earth/normal.jpg`,
    roughness: `${TEXTURE_BASE}/earth/roughness.jpg`,
    specular: `${TEXTURE_BASE}/earth/specular.jpg`,
  },
  mars: {
    diffuse: DIFFUSE_TEXTURE_URLS.mars,
    normal: `${TEXTURE_BASE}/mars/normal.jpg`,
    roughness: `${TEXTURE_BASE}/mars/roughness.jpg`,
  },
  jupiter: {
    diffuse: DIFFUSE_TEXTURE_URLS.jupiter,
    normal: `${TEXTURE_BASE}/jupiter/normal.jpg`,
    roughness: `${TEXTURE_BASE}/jupiter/roughness.jpg`,
  },
  saturn: {
    diffuse: DIFFUSE_TEXTURE_URLS.saturn,
    normal: `${TEXTURE_BASE}/saturn/normal.jpg`,
    roughness: `${TEXTURE_BASE}/saturn/roughness.jpg`,
  },
  uranus: {
    diffuse: DIFFUSE_TEXTURE_URLS.uranus,
    normal: `${TEXTURE_BASE}/uranus/normal.jpg`,
    roughness: `${TEXTURE_BASE}/uranus/roughness.jpg`,
  },
  neptune: {
    diffuse: DIFFUSE_TEXTURE_URLS.neptune,
    normal: `${TEXTURE_BASE}/neptune/normal.jpg`,
    roughness: `${TEXTURE_BASE}/neptune/roughness.jpg`,
  },
}

export const MOON_TEXTURE_PATHS: PlanetTextureSet = {
  diffuse: DIFFUSE_TEXTURE_URLS.moon,
  normal: `${TEXTURE_BASE}/moon/normal.jpg`,
  roughness: `${TEXTURE_BASE}/moon/roughness.jpg`,
}

/** Earth cloud layer texture (transparent PNG/JPG with cloud alpha). Try .png first, then .jpg. */
export const EARTH_CLOUD_PATHS = [
  `${TEXTURE_BASE}/earth/clouds.png`,
  `${TEXTURE_BASE}/earth/clouds.jpg`,
] as const
export const EARTH_CLOUD_PATH = EARTH_CLOUD_PATHS[0]

/** Saturn rings: alpha/detail texture for inner/outer variation. */
export const SATURN_RINGS_ALPHA_PATH = `${TEXTURE_BASE}/saturn/rings_alpha.png`

/** Per-planet PBR overrides and special flags (used when textures are missing or as defaults). */
export type PlanetMaterialConfig = {
  color: string
  roughness: number
  metalness: number
  /** Slight emissive for gas giants / Venus haze */
  emissive?: string
  emissiveIntensity?: number
  /** Normal scale for bump detail when no normal map */
  normalScale?: number
  /** Cloud layer (Earth only in component) */
  hasClouds?: boolean
  /** Atmospheric rim (Earth, Neptune) */
  hasAtmosphere?: boolean
}

export const PLANET_MATERIAL_CONFIG: Record<PlanetId, PlanetMaterialConfig> = {
  mercury: {
    color: PLANET_COLORS.mercury,
    roughness: 0.92,
    metalness: 0.08,
    normalScale: 0.5,
  },
  venus: {
    color: '#e6c229',
    roughness: 0.85,
    metalness: 0.02,
    emissive: '#442200',
    emissiveIntensity: 0.12,
  },
  earth: {
    color: PLANET_COLORS.earth,
    roughness: 0.7,
    metalness: 0.05,
    hasClouds: true,
    hasAtmosphere: true,
  },
  mars: {
    color: '#c1440e',
    roughness: 0.88,
    metalness: 0.06,
    normalScale: 0.4,
  },
  jupiter: {
    color: '#c88b3a',
    roughness: 0.75,
    metalness: 0.02,
    emissive: '#332208',
    emissiveIntensity: 0.08,
  },
  saturn: {
    color: '#e9d5a0',
    roughness: 0.78,
    metalness: 0.03,
  },
  uranus: {
    color: '#7ec8c4',
    roughness: 0.82,
    metalness: 0.02,
    emissive: '#0a2020',
    emissiveIntensity: 0.04,
  },
  neptune: {
    color: '#4166a8',
    roughness: 0.8,
    metalness: 0.02,
    emissive: '#0a1525',
    emissiveIntensity: 0.06,
    hasAtmosphere: true,
  },
}

export const MOON_MATERIAL_CONFIG: PlanetMaterialConfig = {
  color: '#a0a0a0',
  roughness: 0.95,
  metalness: 0.04,
  normalScale: 0.6,
}
