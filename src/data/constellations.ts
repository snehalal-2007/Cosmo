/**
 * Cosmo – Constellation data for Constellations Mode.
 * Star positions are normalized (-1 to 1) for 2D sky projection.
 * Add more constellations by appending to CONSTELLATIONS array.
 */

export type ConstellationStar = {
  id: string
  /** Normalized x (-1 left, 1 right) */
  x: number
  /** Normalized y (-1 bottom, 1 top) */
  y: number
  /** Apparent magnitude (lower = brighter); affects size/glow */
  magnitude: number
}

/** Line segment between two stars by star id */
export type ConstellationLine = [string, string]

export type ConstellationData = {
  id: string
  name: string
  description: string
  mythology: string
  brightestStar: string
  /** Distance from Earth in light-years; null if N/A */
  distanceLy: number | null
  stars: ConstellationStar[]
  lines: ConstellationLine[]
}

/** Lookup star by id within a constellation */
export function getStarById(
  constellation: ConstellationData,
  starId: string
): ConstellationStar | undefined {
  return constellation.stars.find((s) => s.id === starId)
}

export const CONSTELLATIONS: ConstellationData[] = [
  {
    id: 'orion',
    name: 'Orion',
    description:
      'One of the most recognizable constellations, representing a hunter in Greek mythology. It is visible worldwide and contains many bright stars and the Orion Nebula.',
    mythology:
      'Orion was a giant huntsman in Greek myth. After his death, Zeus placed him among the stars. He is often depicted with a shield and raised club, facing Taurus the Bull.',
    brightestStar: 'Rigel (β Orionis)',
    distanceLy: 860,
    stars: [
      { id: 'betelgeuse', x: 0.32, y: 0.48, magnitude: 0.5 },
      { id: 'bellatrix', x: 0.22, y: 0.38, magnitude: 1.6 },
      { id: 'alnitak', x: -0.08, y: 0.02, magnitude: 1.8 },
      { id: 'alnilam', x: -0.02, y: 0.06, magnitude: 1.7 },
      { id: 'mintaka', x: 0.04, y: 0.10, magnitude: 2.2 },
      { id: 'rigel', x: -0.18, y: -0.42, magnitude: 0.1 },
      { id: 'saiph', x: -0.12, y: -0.28, magnitude: 2.1 },
      { id: 'meissa', x: 0.28, y: 0.52, magnitude: 3.5 },
    ],
    lines: [
      ['betelgeuse', 'bellatrix'],
      ['bellatrix', 'alnitak'],
      ['alnitak', 'alnilam'],
      ['alnilam', 'mintaka'],
      ['alnitak', 'rigel'],
      ['mintaka', 'rigel'],
      ['rigel', 'saiph'],
      ['saiph', 'alnitak'],
      ['betelgeuse', 'meissa'],
    ],
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    description:
      'The Great Bear is a large northern constellation containing the Big Dipper asterism. It is used for navigation and is visible year-round in the northern hemisphere.',
    mythology:
      'In Greek myth, Zeus placed the nymph Callisto (transformed into a bear) in the sky as Ursa Major, and her son Arcas as Ursa Minor, so they could remain together forever.',
    brightestStar: 'Alioth (ε Ursae Majoris)',
    distanceLy: 81,
    stars: [
      { id: 'dubhe', x: 0.50, y: 0.52, magnitude: 1.8 },
      { id: 'merak', x: 0.38, y: 0.42, magnitude: 2.4 },
      { id: 'phecida', x: 0.28, y: 0.36, magnitude: 2.4 },
      { id: 'megrez', x: 0.20, y: 0.28, magnitude: 3.3 },
      { id: 'alioth', x: 0.12, y: 0.20, magnitude: 1.8 },
      { id: 'mizar', x: 0.04, y: 0.12, magnitude: 2.2 },
      { id: 'alkaid', x: -0.06, y: 0.02, magnitude: 1.9 },
    ],
    lines: [
      ['dubhe', 'merak'],
      ['merak', 'phecida'],
      ['phecida', 'megrez'],
      ['megrez', 'alioth'],
      ['alioth', 'mizar'],
      ['mizar', 'alkaid'],
      ['dubhe', 'phecida'],
      ['merak', 'megrez'],
    ],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    description:
      'A distinctive W-shaped constellation in the northern sky. It represents a vain queen and is visible year-round in northern latitudes.',
    mythology:
      'Cassiopeia was the queen of Ethiopia who boasted that she and her daughter Andromeda were more beautiful than the Nereids. As punishment, she was placed in the sky to hang upside down for part of the year.',
    brightestStar: 'Schedar (α Cassiopeiae)',
    distanceLy: 230,
    stars: [
      { id: 'schedar', x: -0.35, y: 0.38, magnitude: 2.2 },
      { id: 'caph', x: -0.42, y: 0.48, magnitude: 2.3 },
      { id: 'gamma-cas', x: -0.28, y: 0.28, magnitude: 2.2 },
      { id: 'rukh', x: -0.18, y: 0.12, magnitude: 2.7 },
      { id: 'segih', x: -0.22, y: -0.08, magnitude: 3.4 },
    ],
    lines: [
      ['caph', 'schedar'],
      ['schedar', 'gamma-cas'],
      ['gamma-cas', 'rukh'],
      ['rukh', 'segih'],
    ],
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    description:
      'The Swan is a prominent summer constellation in the Milky Way. Its brightest stars form the Northern Cross. It contains the Cygnus X-1 black hole and many deep-sky objects.',
    mythology:
      'Cygnus is often identified with Zeus in disguise, or with Orpheus transformed into a swan and placed next to his lyre (Lyra). In one myth, it is the youth Cycnus who was turned into a swan.',
    brightestStar: 'Deneb (α Cygni)',
    distanceLy: 2600,
    stars: [
      { id: 'deneb', x: 0.38, y: 0.45, magnitude: 1.3 },
      { id: 'albireo', x: -0.32, y: -0.22, magnitude: 3.1 },
      { id: 'sadr', x: 0.08, y: 0.12, magnitude: 2.2 },
      { id: 'gamma-cyg', x: 0.02, y: 0.02, magnitude: 2.2 },
      { id: 'epsilon-cyg', x: -0.12, y: -0.08, magnitude: 2.5 },
      { id: 'delta-cyg', x: 0.18, y: 0.22, magnitude: 2.9 },
    ],
    lines: [
      ['deneb', 'sadr'],
      ['sadr', 'gamma-cyg'],
      ['gamma-cyg', 'albireo'],
      ['deneb', 'delta-cyg'],
      ['delta-cyg', 'sadr'],
      ['sadr', 'epsilon-cyg'],
      ['epsilon-cyg', 'albireo'],
    ],
  },
  {
    id: 'lyra',
    name: 'Lyra',
    description:
      'A small but bright constellation representing the lyre of Orpheus. It contains Vega, one of the brightest stars in the sky and the former northern pole star.',
    mythology:
      'Lyra represents the lyre given to Orpheus by Apollo. After Orpheus died, Zeus placed the lyre in the sky. Vega is often depicted as the handle of the instrument.',
    brightestStar: 'Vega (α Lyrae)',
    distanceLy: 25,
    stars: [
      { id: 'vega', x: 0.02, y: 0.55, magnitude: 0.0 },
      { id: 'sulafat', x: -0.22, y: 0.08, magnitude: 3.2 },
      { id: 'sheliak', x: -0.18, y: -0.02, magnitude: 3.5 },
      { id: 'delta-lyr', x: -0.08, y: 0.18, magnitude: 4.2 },
      { id: 'zeta-lyr', x: 0.08, y: 0.28, magnitude: 4.3 },
    ],
    lines: [
      ['vega', 'zeta-lyr'],
      ['zeta-lyr', 'delta-lyr'],
      ['delta-lyr', 'sulafat'],
      ['sulafat', 'sheliak'],
      ['sheliak', 'zeta-lyr'],
      ['vega', 'delta-lyr'],
    ],
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    description:
      'A large southern constellation resembling a scorpion. It lies in the Milky Way and contains the bright red supergiant Antares and many star clusters.',
    mythology:
      'Scorpius represents the scorpion sent by Gaia to kill Orion. Orion and the scorpion were placed on opposite sides of the sky so they would never meet again.',
    brightestStar: 'Antares (α Scorpii)',
    distanceLy: 550,
    stars: [
      { id: 'antares', x: 0.28, y: 0.12, magnitude: 1.0 },
      { id: 'sigma-sco', x: 0.18, y: -0.02, magnitude: 2.9 },
      { id: 'tau-sco', x: 0.08, y: -0.12, magnitude: 2.8 },
      { id: 'epsilon-sco', x: -0.02, y: -0.22, magnitude: 2.3 },
      { id: 'lambda-sco', x: -0.12, y: -0.32, magnitude: 1.6 },
      { id: 'kappa-sco', x: 0.12, y: 0.02, magnitude: 2.4 },
      { id: 'delta-sco', x: 0.22, y: 0.22, magnitude: 2.3 },
    ],
    lines: [
      ['delta-sco', 'antares'],
      ['antares', 'kappa-sco'],
      ['kappa-sco', 'sigma-sco'],
      ['sigma-sco', 'tau-sco'],
      ['tau-sco', 'epsilon-sco'],
      ['epsilon-sco', 'lambda-sco'],
      ['antares', 'sigma-sco'],
    ],
  },
]
