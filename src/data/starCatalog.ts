/**
 * Cosmo – Star catalog for planetarium (RA/Dec, magnitude).
 * All stars used by constellation lineSegments. Positions in real astronomical coordinates.
 */

export type StarRecord = {
  id: string
  /** Right Ascension in hours (0–24) */
  ra: number
  /** Declination in degrees (-90 to 90) */
  dec: number
  /** Apparent magnitude (lower = brighter) */
  magnitude: number
}

/** Star catalog: bright stars for the 10 constellation overlays. Explicit IDs only. */
export const STAR_CATALOG: StarRecord[] = [
  // 1) Orion
  { id: 'betelgeuse', ra: 5.917, dec: 7.41, magnitude: 0.5 },
  { id: 'bellatrix', ra: 5.419, dec: 6.35, magnitude: 1.64 },
  { id: 'rigel', ra: 5.242, dec: -8.2, magnitude: 0.13 },
  { id: 'saiph', ra: 5.796, dec: -9.67, magnitude: 2.09 },
  { id: 'alnitak', ra: 5.679, dec: -1.94, magnitude: 1.77 },
  { id: 'alnilam', ra: 5.603, dec: -1.2, magnitude: 1.69 },
  { id: 'mintaka', ra: 5.533, dec: -0.3, magnitude: 2.25 },
  // 2) Ursa Major
  { id: 'dubhe', ra: 11.062, dec: 61.75, magnitude: 1.79 },
  { id: 'merak', ra: 11.062, dec: 56.38, magnitude: 2.37 },
  { id: 'phecida', ra: 11.897, dec: 53.69, magnitude: 2.44 },
  { id: 'megrez', ra: 12.257, dec: 57.03, magnitude: 3.31 },
  { id: 'alioth', ra: 12.9, dec: 55.96, magnitude: 1.76 },
  { id: 'mizar', ra: 13.398, dec: 54.93, magnitude: 2.23 },
  { id: 'alkaid', ra: 13.792, dec: 49.31, magnitude: 1.86 },
  // 3) Cassiopeia
  { id: 'caph', ra: 0.153, dec: 59.15, magnitude: 2.28 },
  { id: 'schedar', ra: 0.675, dec: 56.54, magnitude: 2.24 },
  { id: 'gamma-cas', ra: 0.945, dec: 60.72, magnitude: 2.15 },
  { id: 'ruchbah', ra: 1.43, dec: 60.24, magnitude: 2.66 },
  { id: 'segin', ra: 1.906, dec: 60.72, magnitude: 3.35 },
  // 4) Cygnus
  { id: 'deneb', ra: 20.69, dec: 45.28, magnitude: 1.25 },
  { id: 'sadr', ra: 20.371, dec: 40.39, magnitude: 2.23 },
  { id: 'albireo', ra: 19.512, dec: 27.96, magnitude: 3.05 },
  { id: 'gienah', ra: 20.77, dec: 33.97, magnitude: 2.46 },
  { id: 'delta-cygni', ra: 19.749, dec: 45.13, magnitude: 2.87 },
  // 5) Lyra
  { id: 'vega', ra: 18.616, dec: 38.78, magnitude: 0.03 },
  { id: 'sheliak', ra: 18.834, dec: 33.36, magnitude: 3.45 },
  { id: 'sulafat', ra: 18.982, dec: 32.69, magnitude: 3.25 },
  { id: 'delta-lyrae', ra: 18.9, dec: 36.98, magnitude: 4.22 },
  { id: 'zeta-lyrae', ra: 18.746, dec: 37.6, magnitude: 4.34 },
  // 6) Scorpius
  { id: 'dschubba', ra: 16.005, dec: -22.62, magnitude: 2.29 },
  { id: 'antares', ra: 16.49, dec: -26.43, magnitude: 1.06 },
  { id: 'sargas', ra: 17.621, dec: -42.99, magnitude: 1.87 },
  { id: 'shaula', ra: 17.56, dec: -37.3, magnitude: 1.62 },
  { id: 'lesath', ra: 17.31, dec: -37.3, magnitude: 2.7 },
  // 7) Leo
  { id: 'regulus', ra: 10.137, dec: 11.97, magnitude: 1.35 },
  { id: 'algieba', ra: 10.332, dec: 19.84, magnitude: 2.08 },
  { id: 'zosma', ra: 11.235, dec: 20.52, magnitude: 2.56 },
  { id: 'denebola', ra: 11.817, dec: 14.57, magnitude: 2.14 },
  { id: 'rasalas', ra: 9.173, dec: 26.01, magnitude: 3.43 },
  // 8) Taurus
  { id: 'aldebaran', ra: 4.599, dec: 16.51, magnitude: 0.85 },
  { id: 'elnath', ra: 5.438, dec: 28.61, magnitude: 1.65 },
  { id: 'zeta-tauri', ra: 5.627, dec: 21.14, magnitude: 3.0 },
  // 9) Gemini
  { id: 'castor', ra: 7.577, dec: 31.89, magnitude: 1.58 },
  { id: 'pollux', ra: 7.755, dec: 28.03, magnitude: 1.14 },
  { id: 'alhena', ra: 6.628, dec: 12.56, magnitude: 1.93 },
  { id: 'wasat', ra: 7.336, dec: 22.51, magnitude: 3.53 },
  // 10) Pegasus
  { id: 'markab', ra: 23.079, dec: 15.18, magnitude: 2.49 },
  { id: 'scheat', ra: 22.791, dec: 28.08, magnitude: 2.44 },
  { id: 'algenib', ra: 0.220, dec: 15.18, magnitude: 2.83 },
  { id: 'alpheratz', ra: 0.140, dec: 29.09, magnitude: 2.07 },
  // Andromeda
  { id: 'mirach', ra: 0.85, dec: 35.6, magnitude: 2.05 },
  { id: 'almach', ra: 2.07, dec: 42.33, magnitude: 2.1 },
  { id: 'delta-and', ra: 0.39, dec: 30.86, magnitude: 3.27 },
  { id: 'pi-and', ra: 0.36, dec: 33.72, magnitude: 4.34 },
  // Aquarius
  { id: 'sadalmelik', ra: 22.05, dec: -0.32, magnitude: 2.95 },
  { id: 'sadalsuud', ra: 21.53, dec: -5.57, magnitude: 2.87 },
  { id: 'skat', ra: 22.87, dec: -15.82, magnitude: 3.27 },
  { id: 'delta-aqr', ra: 22.95, dec: -15.82, magnitude: 3.27 },
  // Aries
  { id: 'hamal', ra: 2.12, dec: 23.46, magnitude: 2.0 },
  { id: 'sheratan', ra: 1.91, dec: 20.81, magnitude: 2.64 },
  { id: 'mesarthim', ra: 1.88, dec: 19.29, magnitude: 3.86 },
  // Auriga
  { id: 'capella', ra: 5.28, dec: 46.0, magnitude: 0.08 },
  { id: 'menkalinan', ra: 5.99, dec: 44.95, magnitude: 1.9 },
  { id: 'hassaleh', ra: 5.06, dec: 43.82, magnitude: 2.69 },
  { id: 'almaaz', ra: 5.04, dec: 43.82, magnitude: 2.99 },
  // Bootes
  { id: 'arcturus', ra: 14.26, dec: 19.18, magnitude: -0.05 },
  { id: 'izar', ra: 14.75, dec: 27.07, magnitude: 2.35 },
  { id: 'muphrid', ra: 13.91, dec: 18.40, magnitude: 2.68 },
  // Cancer
  { id: 'acubens', ra: 8.97, dec: 11.86, magnitude: 4.26 },
  { id: 'altarf', ra: 8.27, dec: 9.19, magnitude: 3.53 },
  { id: 'asellus-borealis', ra: 8.72, dec: 21.47, magnitude: 4.67 },
  { id: 'asellus-australis', ra: 8.72, dec: 17.65, magnitude: 3.94 },
  // Canis Major
  { id: 'sirius', ra: 6.75, dec: -16.72, magnitude: -1.46 },
  { id: 'mirzam', ra: 6.38, dec: -17.96, magnitude: 1.98 },
  { id: 'wezen', ra: 7.14, dec: -26.39, magnitude: 1.84 },
  { id: 'aludra', ra: 6.90, dec: -29.30, magnitude: 2.45 },
  // Canis Minor
  { id: 'procyon', ra: 7.66, dec: 5.22, magnitude: 0.34 },
  { id: 'gomeisa', ra: 7.45, dec: 8.29, magnitude: 2.89 },
  // Capricornus
  { id: 'deneb-algedi', ra: 21.78, dec: -16.13, magnitude: 2.85 },
  { id: 'dabih', ra: 20.35, dec: -14.78, magnitude: 3.05 },
  { id: 'nashira', ra: 21.67, dec: -16.66, magnitude: 3.65 },
  // Carina
  { id: 'canopus', ra: 6.40, dec: -52.70, magnitude: -0.74 },
  { id: 'miaplacidus', ra: 9.22, dec: -69.74, magnitude: 1.67 },
  { id: 'avior', ra: 9.08, dec: -59.51, magnitude: 1.86 },
  // Centaurus
  { id: 'rigil-kentaurus', ra: 14.66, dec: -60.83, magnitude: -0.27 },
  { id: 'hadar', ra: 14.06, dec: -60.37, magnitude: 0.61 },
  { id: 'menkent', ra: 14.53, dec: -36.37, magnitude: 2.06 },
  // Cepheus
  { id: 'alderamin', ra: 21.57, dec: 62.59, magnitude: 2.45 },
  { id: 'alfirk', ra: 22.29, dec: 70.56, magnitude: 3.23 },
  { id: 'errai', ra: 23.66, dec: 77.63, magnitude: 3.21 },
  // Cetus
  { id: 'menkar', ra: 3.02, dec: 4.09, magnitude: 2.54 },
  { id: 'diphda', ra: 0.73, dec: -17.99, magnitude: 2.04 },
  { id: 'mira', ra: 2.19, dec: -2.98, magnitude: 3.04 },
  // Corona Borealis
  { id: 'alphecca', ra: 15.58, dec: 26.71, magnitude: 2.22 },
  { id: 'nusakan', ra: 15.58, dec: 29.11, magnitude: 3.66 },
  // Crux
  { id: 'acrux', ra: 12.44, dec: -63.10, magnitude: 0.77 },
  { id: 'mimosa', ra: 12.79, dec: -59.69, magnitude: 1.25 },
  { id: 'gacrux', ra: 12.52, dec: -57.11, magnitude: 1.63 },
  { id: 'imai', ra: 12.15, dec: -58.75, magnitude: 2.79 },
  // Delphinus
  { id: 'sualocin', ra: 20.63, dec: 16.07, magnitude: 3.77 },
  { id: 'rotanev', ra: 20.63, dec: 14.60, magnitude: 3.64 },
  { id: 'gamma-del', ra: 20.77, dec: 16.12, magnitude: 4.27 },
  // Draco
  { id: 'thuban', ra: 14.05, dec: 64.38, magnitude: 3.67 },
  { id: 'rastaban', ra: 17.51, dec: 52.30, magnitude: 2.79 },
  { id: 'eltanin', ra: 17.51, dec: 51.49, magnitude: 2.24 },
  { id: 'grumium', ra: 17.95, dec: 56.87, magnitude: 3.73 },
  // Eridanus
  { id: 'achernar', ra: 1.63, dec: -57.24, magnitude: 0.46 },
  { id: 'cursa', ra: 5.13, dec: -5.09, magnitude: 2.79 },
  { id: 'zaurak', ra: 3.77, dec: -13.51, magnitude: 2.95 },
  // Hercules
  { id: 'rasalgethi', ra: 17.25, dec: 14.39, magnitude: 2.78 },
  { id: 'kornephoros', ra: 16.51, dec: 21.49, magnitude: 2.78 },
  { id: 'zeta-her', ra: 16.69, dec: 31.60, magnitude: 2.91 },
  // Hydra
  { id: 'alphard', ra: 9.46, dec: -8.66, magnitude: 1.99 },
  { id: 'gamma-hya', ra: 13.32, dec: -23.17, magnitude: 2.99 },
  { id: 'zeta-hya', ra: 8.92, dec: 5.95, magnitude: 3.11 },
  // Ophiuchus
  { id: 'rasalhague', ra: 17.58, dec: 12.56, magnitude: 2.08 },
  { id: 'sabik', ra: 17.17, dec: -15.72, magnitude: 2.43 },
  { id: 'yed-prior', ra: 16.24, dec: -3.69, magnitude: 2.73 },
  // Perseus
  { id: 'mirfak', ra: 3.41, dec: 49.86, magnitude: 1.79 },
  { id: 'algol', ra: 3.14, dec: 40.96, magnitude: 2.12 },
  { id: 'gamma-per', ra: 3.08, dec: 53.51, magnitude: 2.91 },
  // Pisces
  { id: 'alrescha', ra: 2.02, dec: 2.76, magnitude: 3.82 },
  { id: 'eta-psc', ra: 1.52, dec: 15.35, magnitude: 3.62 },
  { id: 'gamma-psc', ra: 0.03, dec: 3.19, magnitude: 3.70 },
  // Sagittarius
  { id: 'kaus-australis', ra: 18.40, dec: -34.38, magnitude: 1.85 },
  { id: 'nunki', ra: 18.92, dec: -26.30, magnitude: 2.05 },
  { id: 'ascella', ra: 19.10, dec: -29.88, magnitude: 2.60 },
  // Triangulum
  { id: 'mothallah', ra: 1.89, dec: 29.58, magnitude: 3.42 },
  { id: 'deltotum', ra: 2.22, dec: 33.85, magnitude: 4.00 },
  // Vela
  { id: 'regor', ra: 8.05, dec: -47.34, magnitude: 1.75 },
  { id: 'markeb', ra: 8.75, dec: -55.01, magnitude: 2.47 },
  { id: 'suhail', ra: 9.13, dec: -43.43, magnitude: 2.21 },
  // Vulpecula
  { id: 'anser', ra: 19.77, dec: 24.08, magnitude: 4.44 },
  { id: '13-vul', ra: 19.89, dec: 24.08, magnitude: 4.57 },
  // Lupus
  { id: 'alpha-lup', ra: 14.70, dec: -47.39, magnitude: 2.30 },
  { id: 'beta-lup', ra: 14.98, dec: -43.13, magnitude: 2.68 },
  // Phoenix
  { id: 'ankaa', ra: 0.44, dec: -42.31, magnitude: 2.40 },
  { id: 'beta-phe', ra: 1.06, dec: -46.72, magnitude: 3.32 },
  // Puppis
  { id: 'naos', ra: 7.40, dec: -28.40, magnitude: 2.25 },
  { id: 'pi-pup', ra: 7.28, dec: -37.10, magnitude: 2.71 },
]

const STAR_BY_ID = new Map(STAR_CATALOG.map((s) => [s.id, s]))

export function getStarById(id: string): StarRecord | undefined {
  return STAR_BY_ID.get(id)
}
