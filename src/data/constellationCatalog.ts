/**
 * Cosmo – Constellation definitions for planetarium overlay.
 * Only explicit star-to-star lineSegments (star id pairs). No auto-connection.
 */

export type ConstellationLineSegment = [string, string]

export type ConstellationCatalogEntry = {
  id: string
  name: string
  /** Exact pairs of star ids from starCatalog. No auto-connect. */
  lineSegments: ConstellationLineSegment[]
  description: string
  mythology: string
  brightestStar: string
  distanceLy: number | null
}

export const CONSTELLATION_CATALOG: ConstellationCatalogEntry[] = [
  {
    id: 'orion',
    name: 'Orion',
    lineSegments: [
      ['alnitak', 'alnilam'],
      ['alnilam', 'mintaka'],
      ['betelgeuse', 'bellatrix'],
      ['betelgeuse', 'alnitak'],
      ['bellatrix', 'mintaka'],
      ['rigel', 'saiph'],
      ['alnitak', 'saiph'],
      ['mintaka', 'rigel'],
    ],
    description:
      'One of the most recognizable constellations, representing a hunter in Greek mythology. It is visible worldwide and contains many bright stars and the Orion Nebula.',
    mythology:
      'Orion was a giant huntsman in Greek myth. After his death, Zeus placed him among the stars. He is often depicted with a shield and raised club, facing Taurus the Bull.',
    brightestStar: 'Rigel (β Orionis)',
    distanceLy: 860,
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    lineSegments: [
      ['dubhe', 'merak'],
      ['merak', 'phecida'],
      ['phecida', 'megrez'],
      ['megrez', 'dubhe'],
      ['megrez', 'alioth'],
      ['alioth', 'mizar'],
      ['mizar', 'alkaid'],
    ],
    description:
      'The Great Bear is a large northern constellation containing the Big Dipper asterism. It is used for navigation and is visible year-round in the northern hemisphere.',
    mythology:
      'In Greek myth, Zeus placed the nymph Callisto (transformed into a bear) in the sky as Ursa Major, and her son Arcas as Ursa Minor, so they could remain together forever.',
    brightestStar: 'Alioth (ε Ursae Majoris)',
    distanceLy: 81,
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    lineSegments: [
      ['caph', 'schedar'],
      ['schedar', 'gamma-cas'],
      ['gamma-cas', 'ruchbah'],
      ['ruchbah', 'segin'],
    ],
    description:
      'A distinctive W-shaped constellation in the northern sky. It represents a vain queen and is visible year-round in northern latitudes.',
    mythology:
      'Cassiopeia was the queen of Ethiopia who boasted that she and her daughter Andromeda were more beautiful than the Nereids. As punishment, she was placed in the sky to hang upside down for part of the year.',
    brightestStar: 'Schedar (α Cassiopeiae)',
    distanceLy: 230,
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    lineSegments: [
      ['deneb', 'sadr'],
      ['sadr', 'albireo'],
      ['gienah', 'sadr'],
      ['sadr', 'delta-cygni'],
    ],
    description:
      'The Swan is a prominent summer constellation in the Milky Way. Its brightest stars form the Northern Cross.',
    mythology:
      'Cygnus is often identified with Zeus in disguise, or with Orpheus transformed into a swan and placed next to his lyre (Lyra).',
    brightestStar: 'Deneb (α Cygni)',
    distanceLy: 2600,
  },
  {
    id: 'lyra',
    name: 'Lyra',
    lineSegments: [
      ['sheliak', 'sulafat'],
      ['sulafat', 'delta-lyrae'],
      ['delta-lyrae', 'zeta-lyrae'],
      ['zeta-lyrae', 'sheliak'],
      ['vega', 'sheliak'],
    ],
    description:
      'A small but bright constellation representing the lyre of Orpheus. It contains Vega, one of the brightest stars in the sky.',
    mythology:
      'Lyra represents the lyre given to Orpheus by Apollo. After Orpheus died, Zeus placed the lyre in the sky.',
    brightestStar: 'Vega (α Lyrae)',
    distanceLy: 25,
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    lineSegments: [
      ['dschubba', 'antares'],
      ['antares', 'sargas'],
      ['sargas', 'shaula'],
      ['shaula', 'lesath'],
    ],
    description:
      'A large southern constellation resembling a scorpion. It lies in the Milky Way and contains the bright red supergiant Antares.',
    mythology:
      'Scorpius represents the scorpion sent by Gaia to kill Orion. Orion and the scorpion were placed on opposite sides of the sky so they would never meet again.',
    brightestStar: 'Antares (α Scorpii)',
    distanceLy: 550,
  },
  {
    id: 'leo',
    name: 'Leo',
    lineSegments: [
      ['regulus', 'algieba'],
      ['algieba', 'rasalas'],
      ['algieba', 'zosma'],
      ['zosma', 'denebola'],
    ],
    description:
      'Leo represents the Nemean lion slain by Hercules. It is one of the zodiac constellations and contains the bright star Regulus.',
    mythology:
      'In Greek myth, the lion was a fearsome beast that terrorized Nemea. Hercules defeated it as the first of his twelve labors, and Zeus placed it among the stars.',
    brightestStar: 'Regulus (α Leonis)',
    distanceLy: 79,
  },
  {
    id: 'taurus',
    name: 'Taurus',
    lineSegments: [
      ['aldebaran', 'elnath'],
      ['aldebaran', 'zeta-tauri'],
    ],
    description:
      'Taurus is a zodiac constellation representing the bull. It contains the bright red giant Aldebaran and the Pleiades star cluster.',
    mythology:
      'In Greek myth, Taurus is often identified with Zeus in the form of a white bull, who carried Europa across the sea to Crete.',
    brightestStar: 'Aldebaran (α Tauri)',
    distanceLy: 65,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    lineSegments: [
      ['castor', 'alhena'],
      ['pollux', 'wasat'],
      ['alhena', 'wasat'],
    ],
    description:
      'Gemini represents the twin brothers Castor and Pollux. It is a zodiac constellation visible in the northern winter sky.',
    mythology:
      'Castor and Pollux were twin brothers; Castor was mortal and Pollux immortal. When Castor died, Pollux asked Zeus to share his immortality with his brother, and they were placed in the sky together.',
    brightestStar: 'Pollux (β Geminorum)',
    distanceLy: 34,
  },
  {
    id: 'pegasus',
    name: 'Pegasus',
    lineSegments: [
      ['markab', 'scheat'],
      ['scheat', 'alpheratz'],
      ['alpheratz', 'algenib'],
      ['algenib', 'markab'],
    ],
    description:
      'Pegasus is a large constellation representing the winged horse. Its brightest stars form the Great Square of Pegasus.',
    mythology:
      'Pegasus sprang from the blood of Medusa when Perseus slew her. The horse was tamed by Bellerophon and later placed among the stars by Zeus.',
    brightestStar: 'Enif (ε Pegasi)',
    distanceLy: 140,
  },
  {
    id: 'andromeda',
    name: 'Andromeda',
    lineSegments: [
      ['alpheratz', 'mirach'],
      ['mirach', 'almach'],
      ['delta-and', 'mirach'],
      ['pi-and', 'delta-and'],
    ],
    description:
      'Long curved chain extending from the Great Square of Pegasus. Contains the Andromeda Galaxy.',
    mythology:
      'Andromeda was the daughter of Cepheus and Cassiopeia. She was chained to a rock as a sacrifice until Perseus rescued her.',
    brightestStar: 'Alpheratz (α Andromedae)',
    distanceLy: 97,
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    lineSegments: [
      ['sadalmelik', 'sadalsuud'],
      ['sadalsuud', 'skat'],
      ['skat', 'delta-aqr'],
    ],
    description:
      'Zigzag water flow pattern in the zodiac. Represents the water bearer.',
    mythology:
      'Aquarius is often identified with Ganymede, the youth carried to Olympus by Zeus to serve as cupbearer to the gods.',
    brightestStar: 'Sadalsuud (β Aquarii)',
    distanceLy: 610,
  },
  {
    id: 'aries',
    name: 'Aries',
    lineSegments: [
      ['hamal', 'sheratan'],
      ['sheratan', 'mesarthim'],
    ],
    description:
      'Small bent line of three main stars. First sign of the zodiac.',
    mythology:
      'Aries represents the golden ram whose fleece was sought by Jason and the Argonauts.',
    brightestStar: 'Hamal (α Arietis)',
    distanceLy: 66,
  },
  {
    id: 'auriga',
    name: 'Auriga',
    lineSegments: [
      ['capella', 'menkalinan'],
      ['menkalinan', 'hassaleh'],
      ['hassaleh', 'almaaz'],
      ['almaaz', 'capella'],
    ],
    description:
      'Pentagon shape. Contains the bright star Capella.',
    mythology:
      'Auriga represents the charioteer, often identified with Erichthonius or Myrtilus.',
    brightestStar: 'Capella (α Aurigae)',
    distanceLy: 43,
  },
  {
    id: 'bootes',
    name: 'Bootes',
    lineSegments: [
      ['arcturus', 'izar'],
      ['izar', 'muphrid'],
      ['muphrid', 'arcturus'],
    ],
    description:
      'Kite-shaped pattern. Contains Arcturus, one of the brightest stars.',
    mythology:
      'Bootes is the herdsman or plowman, sometimes identified with Arcas, son of Callisto.',
    brightestStar: 'Arcturus (α Bootis)',
    distanceLy: 37,
  },
  {
    id: 'cancer',
    name: 'Cancer',
    lineSegments: [
      ['acubens', 'altarf'],
      ['altarf', 'asellus-borealis'],
      ['asellus-borealis', 'asellus-australis'],
      ['asellus-australis', 'acubens'],
    ],
    description:
      'Faint Y-shape. Zodiac constellation containing the Beehive cluster.',
    mythology:
      'Cancer represents the crab sent by Hera to distract Hercules during his fight with the Hydra.',
    brightestStar: 'Altarf (β Cancri)',
    distanceLy: 290,
  },
  {
    id: 'canis-major',
    name: 'Canis Major',
    lineSegments: [
      ['sirius', 'mirzam'],
      ['mirzam', 'wezen'],
      ['wezen', 'aludra'],
    ],
    description:
      'Contains Sirius, the brightest star. Loose triangular shape.',
    mythology:
      'Canis Major represents one of Orion\'s hunting dogs, following him across the sky.',
    brightestStar: 'Sirius (α Canis Majoris)',
    distanceLy: 8.6,
  },
  {
    id: 'canis-minor',
    name: 'Canis Minor',
    lineSegments: [
      ['procyon', 'gomeisa'],
    ],
    description:
      'Small line with Procyon. Orion\'s other hunting dog.',
    mythology:
      'Canis Minor is the smaller of Orion\'s two dogs, accompanying Canis Major.',
    brightestStar: 'Procyon (α Canis Minoris)',
    distanceLy: 11.5,
  },
  {
    id: 'capricornus',
    name: 'Capricornus',
    lineSegments: [
      ['deneb-algedi', 'dabih'],
      ['dabih', 'nashira'],
      ['nashira', 'deneb-algedi'],
    ],
    description:
      'Wide V shape. Sea-goat of the zodiac.',
    mythology:
      'Capricornus is often linked to Pan, who transformed into a goat-fish to escape Typhon.',
    brightestStar: 'Deneb Algedi (δ Capricorni)',
    distanceLy: 39,
  },
  {
    id: 'carina',
    name: 'Carina',
    lineSegments: [
      ['canopus', 'miaplacidus'],
      ['miaplacidus', 'avior'],
      ['avior', 'canopus'],
    ],
    description:
      'Large ship keel pattern. Contains Canopus, second-brightest star.',
    mythology:
      'Carina is part of the ancient constellation Argo Navis, the ship of the Argonauts.',
    brightestStar: 'Canopus (α Carinae)',
    distanceLy: 310,
  },
  {
    id: 'centaurus',
    name: 'Centaurus',
    lineSegments: [
      ['rigil-kentaurus', 'hadar'],
      ['hadar', 'menkent'],
      ['menkent', 'rigil-kentaurus'],
    ],
    description:
      'Wide stretched shape. Contains Alpha Centauri, nearest star system.',
    mythology:
      'Centaurus represents the wise centaur Chiron, tutor to many Greek heroes.',
    brightestStar: 'Rigil Kentaurus (α Centauri)',
    distanceLy: 4.4,
  },
  {
    id: 'cepheus',
    name: 'Cepheus',
    lineSegments: [
      ['alderamin', 'alfirk'],
      ['alfirk', 'errai'],
      ['errai', 'alderamin'],
    ],
    description:
      'House-shaped pentagon. Northern constellation.',
    mythology:
      'Cepheus was the king of Ethiopia, husband of Cassiopeia and father of Andromeda.',
    brightestStar: 'Alderamin (α Cephei)',
    distanceLy: 49,
  },
  {
    id: 'cetus',
    name: 'Cetus',
    lineSegments: [
      ['menkar', 'diphda'],
      ['diphda', 'mira'],
      ['mira', 'menkar'],
    ],
    description:
      'Long irregular chain. The sea monster of myth.',
    mythology:
      'Cetus was the monster sent by Poseidon to devour Andromeda before Perseus slew it.',
    brightestStar: 'Diphda (β Ceti)',
    distanceLy: 96,
  },
  {
    id: 'corona-borealis',
    name: 'Corona Borealis',
    lineSegments: [
      ['alphecca', 'nusakan'],
    ],
    description:
      'Semicircle crown of stars. Northern crown.',
    mythology:
      'The crown was given by Dionysus to Ariadne after Theseus abandoned her on Naxos.',
    brightestStar: 'Alphecca (α Coronae Borealis)',
    distanceLy: 75,
  },
  {
    id: 'crux',
    name: 'Crux',
    lineSegments: [
      ['acrux', 'mimosa'],
      ['mimosa', 'gacrux'],
      ['gacrux', 'imai'],
      ['imai', 'acrux'],
    ],
    description:
      'Small cross. Southern Cross, used for navigation.',
    mythology:
      'Crux was identified by European navigators; it has significance in many southern cultures.',
    brightestStar: 'Acrux (α Crucis)',
    distanceLy: 320,
  },
  {
    id: 'delphinus',
    name: 'Delphinus',
    lineSegments: [
      ['sualocin', 'rotanev'],
      ['rotanev', 'gamma-del'],
      ['gamma-del', 'sualocin'],
    ],
    description:
      'Small diamond with tail. The dolphin.',
    mythology:
      'Delphinus represents the dolphin that helped Poseidon find Amphitrite, or the one that saved Arion.',
    brightestStar: 'Rotanev (β Delphini)',
    distanceLy: 97,
  },
  {
    id: 'draco',
    name: 'Draco',
    lineSegments: [
      ['thuban', 'rastaban'],
      ['rastaban', 'eltanin'],
      ['eltanin', 'grumium'],
    ],
    description:
      'Long winding serpent. Wraps around the north celestial pole.',
    mythology:
      'Draco represents the dragon Ladon, guardian of the golden apples of the Hesperides.',
    brightestStar: 'Eltanin (γ Draconis)',
    distanceLy: 154,
  },
  {
    id: 'eridanus',
    name: 'Eridanus',
    lineSegments: [
      ['achernar', 'cursa'],
      ['cursa', 'zaurak'],
      ['zaurak', 'achernar'],
    ],
    description:
      'Long river-like curve. One of the longest constellations.',
    mythology:
      'Eridanus is often identified with the river into which Phaethon fell after driving the Sun\'s chariot.',
    brightestStar: 'Achernar (α Eridani)',
    distanceLy: 139,
  },
  {
    id: 'hercules',
    name: 'Hercules',
    lineSegments: [
      ['rasalgethi', 'kornephoros'],
      ['kornephoros', 'zeta-her'],
      ['zeta-her', 'rasalgethi'],
    ],
    description:
      'Keystone quadrilateral. Hero kneeling.',
    mythology:
      'Hercules represents the Greek hero Heracles and his twelve labors.',
    brightestStar: 'Rasalgethi (α Herculis)',
    distanceLy: 360,
  },
  {
    id: 'hydra',
    name: 'Hydra',
    lineSegments: [
      ['alphard', 'gamma-hya'],
      ['gamma-hya', 'zeta-hya'],
    ],
    description:
      'Very long snake-like line. Largest constellation by area.',
    mythology:
      'Hydra was the multi-headed serpent slain by Hercules as one of his labors.',
    brightestStar: 'Alphard (α Hydrae)',
    distanceLy: 177,
  },
  {
    id: 'ophiuchus',
    name: 'Ophiuchus',
    lineSegments: [
      ['rasalhague', 'sabik'],
      ['sabik', 'yed-prior'],
      ['yed-prior', 'rasalhague'],
    ],
    description:
      'Large irregular loop. The serpent bearer.',
    mythology:
      'Ophiuchus represents Asclepius, the healer who could raise the dead, holding the serpent of medicine.',
    brightestStar: 'Rasalhague (α Ophiuchi)',
    distanceLy: 49,
  },
  {
    id: 'perseus',
    name: 'Perseus',
    lineSegments: [
      ['mirfak', 'algol'],
      ['algol', 'gamma-per'],
      ['gamma-per', 'mirfak'],
    ],
    description:
      'Forked branching pattern. Hero with Medusa\'s head.',
    mythology:
      'Perseus slew Medusa and used her head to rescue Andromeda from Cetus.',
    brightestStar: 'Mirfak (α Persei)',
    distanceLy: 592,
  },
  {
    id: 'pisces',
    name: 'Pisces',
    lineSegments: [
      ['alrescha', 'eta-psc'],
      ['eta-psc', 'gamma-psc'],
      ['gamma-psc', 'alrescha'],
    ],
    description:
      'Two loops connected by a line. The fishes.',
    mythology:
      'Pisces represents Aphrodite and Eros transformed into fish to escape Typhon, tied by a cord.',
    brightestStar: 'Alrescha (α Piscium)',
    distanceLy: 139,
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    lineSegments: [
      ['kaus-australis', 'nunki'],
      ['nunki', 'ascella'],
      ['ascella', 'kaus-australis'],
    ],
    description:
      'Teapot shape. The archer; center of the Milky Way.',
    mythology:
      'Sagittarius represents a centaur archer, often identified with Chiron, aiming toward Scorpius.',
    brightestStar: 'Kaus Australis (ε Sagittarii)',
    distanceLy: 143,
  },
  {
    id: 'triangulum',
    name: 'Triangulum',
    lineSegments: [
      ['mothallah', 'deltotum'],
      ['deltotum', 'mothallah'],
    ],
    description:
      'Small triangle. Contains the Triangulum Galaxy.',
    mythology:
      'Triangulum has been identified with various figures, including the island of Sicily.',
    brightestStar: 'Mothallah (β Trianguli)',
    distanceLy: 64,
  },
  {
    id: 'vela',
    name: 'Vela',
    lineSegments: [
      ['regor', 'markeb'],
      ['markeb', 'suhail'],
      ['suhail', 'regor'],
    ],
    description:
      'Irregular sail shape. Part of the ancient Argo Navis.',
    mythology:
      'Vela represents the sails of the Argo, the ship of Jason and the Argonauts.',
    brightestStar: 'Regor (γ Velorum)',
    distanceLy: 840,
  },
  {
    id: 'vulpecula',
    name: 'Vulpecula',
    lineSegments: [['anser', '13-vul']],
    description:
      'Small faint pattern. The little fox.',
    mythology:
      'Vulpecula was introduced by Hevelius in the 17th century; it contains the Dumbbell Nebula.',
    brightestStar: 'Anser (α Vulpeculae)',
    distanceLy: 297,
  },
  {
    id: 'lupus',
    name: 'Lupus',
    lineSegments: [
      ['alpha-lup', 'beta-lup'],
    ],
    description:
      'Irregular quadrilateral. The wolf.',
    mythology:
      'Lupus was often depicted as an animal impaled by Centaurus, the centaur.',
    brightestStar: 'Alpha Lupi',
    distanceLy: 548,
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    lineSegments: [
      ['ankaa', 'beta-phe'],
    ],
    description:
      'Compact angular pattern. The mythical fire bird.',
    mythology:
      'Phoenix represents the mythical bird that rises from its own ashes.',
    brightestStar: 'Ankaa (α Phoenicis)',
    distanceLy: 77,
  },
  {
    id: 'puppis',
    name: 'Puppis',
    lineSegments: [
      ['naos', 'pi-pup'],
    ],
    description:
      'Scattered ship stars. The stern of Argo Navis.',
    mythology:
      'Puppis is the poop deck of the Argo, the ship of the Argonauts.',
    brightestStar: 'Naos (ζ Puppis)',
    distanceLy: 1080,
  },
]
