import type { CategoryMeta, CuratedCollection, Exhibit } from '../types/exhibit';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'paintings',
    label: 'Paintings & Visual Art',
    shortLabel: 'Paintings',
    description:
      'Iconic canvases of light, mystery and emotion—from the Mona Lisa to The Starry Night.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    featuredArtworkTitle: 'Mona Lisa · Leonardo da Vinci',
  },
  {
    id: 'sculptures',
    label: 'Sculptures & Statues',
    shortLabel: 'Sculptures',
    description:
      'Marble and limestone carved into living breath by Michelangelo, Thutmose and antiquity’s masters.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/%27David%27_by_Michelangelo_Fir_JBU005_denoised.jpg/960px-%27David%27_by_Michelangelo_Fir_JBU005_denoised.jpg',
    featuredArtworkTitle: 'David · Michelangelo',
  },
  {
    id: 'wonders',
    label: 'Historical Wonders',
    shortLabel: 'Wonders',
    description:
      'Colossal desert pyramids and rock-cut sanctuaries that defied time.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/960px-All_Gizah_Pyramids.jpg',
    featuredArtworkTitle: 'Great Pyramids of Giza',
  },
  {
    id: 'architecture',
    label: 'Architecture & Landmarks',
    shortLabel: 'Architecture',
    description:
      'Impossible domes, white marble mausoleums and classical temples.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/960px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
    featuredArtworkTitle: 'The Taj Mahal · Agra',
  },
  {
    id: 'artefacts',
    label: 'Royal Artefacts & Relics',
    shortLabel: 'Artefacts',
    description:
      'Solid-gold pharaonic masks and ancient keys that unlocked lost worlds.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/960px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg',
    featuredArtworkTitle: 'Mask of Tutankhamun',
  },
  {
    id: 'books',
    label: 'Books & Literature',
    shortLabel: 'Literature',
    description:
      'Foundational epics and novels that shaped human imagination.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/John_William_Waterhouse_-_Ulysses_and_the_Sirens_%281891%29.jpg/960px-John_William_Waterhouse_-_Ulysses_and_the_Sirens_%281891%29.jpg',
    featuredArtworkTitle: 'The Odyssey · Homer',
  },
];

export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    id: 'masterpieces-changed-art',
    title: 'Masterpieces That Changed Art',
    subtitle: 'Exhibition I · Permanent Wing',
    description:
      'Works that broke the rules of their century—transforming how humanity perceives light, motion and space.',
    curatorNote:
      'Every brushstroke in this room challenged convention, turning observation into revelation.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/960px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    exhibitIds: [
      'the-starry-night',
      'mona-lisa',
      'creation-of-adam',
      'girl-with-a-pearl-earring',
      'great-wave-kanagawa',
      'school-of-athens',
    ],
  },
  {
    id: 'wonders-ancient-world',
    title: 'Wonders of the Ancient World',
    subtitle: 'Exhibition II · Antiquity Wing',
    description:
      'Colossal tombs, rock-cut desert capitals and royal treasures raised by empires that refused to be forgotten.',
    curatorNote:
      'Built without modern machinery yet aligned with the stars, these sites stand between engineering and myth.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/960px-All_Gizah_Pyramids.jpg',
    exhibitIds: [
      'pyramids-of-giza',
      'mask-of-tutankhamun',
      'petra-al-khazneh',
      'the-parthenon',
      'the-rosetta-stone',
    ],
  },
  {
    id: 'greatest-sculptures',
    title: 'The Greatest Sculptures Ever Created',
    subtitle: 'Exhibition III · Statuary Hall',
    description:
      'Unforgiving stone transformed into wind-swept drapery, tense muscle and immortal royal poise.',
    curatorNote:
      'To carve marble is to remove everything that is not alive.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg/960px-Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg',
    exhibitIds: [
      'michelangelos-david',
      'winged-victory-of-samothrace',
      'bust-of-nefertiti',
      'mask-of-tutankhamun',
    ],
  },
  {
    id: 'architectural-marvels',
    title: 'Architectural Marvels',
    subtitle: 'Exhibition IV · Monumental Forms',
    description:
      'From Rome’s unreinforced concrete dome to Agra’s poem in white marble.',
    curatorNote:
      'Architecture is history you can stand inside.',
    coverImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/960px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
    exhibitIds: ['taj-mahal', 'the-pantheon-rome', 'the-parthenon', 'petra-al-khazneh'],
  },
];

export const EXHIBITS: Exhibit[] = [
  {
    id: 'the-starry-night',
    title: 'The Starry Night',
    subtitle: 'De sterrennacht',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Vincent van Gogh',
    creatorRole: 'Post-Impressionist Painter',
    date: '1889',
    period: 'Post-Impressionism',
    location: 'MoMA, New York',
    mediumOrMaterial: 'Oil on canvas',
    dimensions: '73.7 cm × 92.1 cm',
    featured: true,
    hallNumber: 'Gallery I · 01',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'A turbulent nocturnal sky painted from an asylum window, where grief and cosmic wonder dissolve into swirling light.',
    introduction:
      'Painted in June 1889 from the east window of his room at the Saint-Paul-de-Mausole asylum in southern France, The Starry Night is an emotional cosmos where memory, astronomy and spiritual longing collide.',
    quote: {
      text: 'Looking at the stars always makes me dream.',
      attribution: 'Vincent van Gogh (1888)',
    },
    story: {
      heading: 'Painted from Behind Iron Bars',
      paragraphs: [
        'Forbidden to paint inside his upstairs bedroom at night by candle or lamp light, Van Gogh reconstructed this nocturnal vision in his ground-floor studio by daylight, merging direct observation of the pre-dawn Provençal sky with memories of his Dutch homeland.',
        'While the rolling hills and the morning star (Venus) were visible from his window, the village below was invented from childhood memories of the Netherlands.',
      ],
    },
    lookCloser: [
      {
        id: 'cypress-tree',
        title: 'The Flame-Like Cypress Tree',
        tag: 'Symbolism',
        description:
          'Rising like dark fire in the foreground, cypress trees were traditionally associated with eternity, acting as an obelisk linking earth to the churning sky above.',
        x: 19,
        y: 52,
      },
      {
        id: 'turbulent-eddies',
        title: 'Fluid Turbulence in the Sky',
        tag: 'Technique',
        description:
          'Physicists studying Van Gogh’s thick impasto brushstrokes discovered that his swirling eddies closely match the mathematical laws of fluid turbulence.',
        x: 52,
        y: 28,
      },
      {
        id: 'morning-star',
        title: 'Venus, the Morning Star',
        tag: 'Astronomy',
        description:
          'The brilliant white-and-gold orb just right of the cypress is the planet Venus, which shone at maximum brightness over Provence in May and June 1889.',
        x: 32,
        y: 42,
      },
    ],
    meaning: {
      heading: 'Why It Changed Modern Art Forever',
      paragraphs: [
        'Before Van Gogh, Western landscape painting sought to mirror nature’s physical appearance. The Starry Night shattered that boundary by making color and rhythm direct vehicles of inner emotion.',
      ],
      keyTakeaway:
        'A painting does not need to depict what the eye sees—it can reveal what the human spirit feels before the infinite.',
    },
    didYouKnow: [
      'Van Gogh removed the iron bars from his asylum window in the composition so nothing would stand between the viewer and the night sky.',
      'In 2004, NASA’s Hubble Space Telescope captured swirls of interstellar dust around star V838 Monocerotis that uncannily mirrored the painting.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/960px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Nocturnal Cobalt & Starlight',
      bgPrimary: '#080B12',
      bgSecondary: '#0E1422',
      accent: '#E2B857',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(39, 71, 138, 0.32) 0%, rgba(226, 184, 87, 0.10) 40%, rgba(8, 11, 18, 0.98) 78%)',
      borderSubtle: 'rgba(226, 184, 87, 0.16)',
    },
    source: {
      provider: 'Museum of Modern Art (MoMA)',
      url: 'https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      license: 'Public Domain',
      accessionNumber: 'MoMA 472.1941',
      attribution: 'Vincent van Gogh (1889), Lillie P. Bliss Bequest.',
    },
    relatedExhibitIds: ['mona-lisa', 'girl-with-a-pearl-earring', 'great-wave-kanagawa'],
  },
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    subtitle: 'La Gioconda',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Leonardo da Vinci',
    creatorRole: 'High Renaissance Polymath',
    date: 'c. 1503–1519',
    period: 'Italian High Renaissance',
    location: 'Musée du Louvre, Paris',
    mediumOrMaterial: 'Oil on Lombardy poplar panel',
    dimensions: '77 cm × 53 cm',
    featured: true,
    hallNumber: 'Gallery I · 02',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'An enigmatic smile painted with thirty translucent layers of oil glaze thinner than a human hair.',
    introduction:
      'Believed to depict Florentine noblewoman Lisa Gherardini, Leonardo da Vinci never delivered this portrait to the client who commissioned it—carrying it with him across Italy and France for sixteen years until the day he died.',
    quote: {
      text: 'The smile was so pleasing that it seemed divine rather than human.',
      attribution: 'Giorgio Vasari (1550)',
    },
    story: {
      heading: 'The Smile That Moves When You Look Away',
      paragraphs: [
        'Leonardo pioneered sfumato ("vanishing like smoke")—blending micro-thin layers of translucent oil glaze with his fingertips so that not a single hard outline or visible brushstroke exists around her eyes or mouth.',
        'Neuroscientists studying the portrait discovered why her smile seems to flicker: when you look directly at her lips, your sharp central vision reads low-contrast shadows as neutral; when you look into her eyes, your peripheral vision detects the soft cheek shadows as an unmistakable smile.',
      ],
    },
    lookCloser: [
      {
        id: 'sfumato-smile',
        title: 'The Peripheral-Vision Smile',
        tag: 'Optical Science',
        description:
          'Look into her eyes and she smiles warmly; look straight at the corners of her mouth and the smile slips away into shadow.',
        x: 47,
        y: 35,
      },
      {
        id: 'asymmetrical-horizons',
        title: 'Two Mismatched Horizons',
        tag: 'Illusion',
        description:
          'Notice the primordial landscape behind her: the horizon on the left sits noticeably lower than the horizon on the right, subtly shifting her posture as your eyes scan across the panel.',
        x: 78,
        y: 34,
      },
      {
        id: 'crossed-hands',
        title: 'Relaxed Hands Without Rings',
        tag: 'Composition',
        description:
          'Breaking stiff fifteenth-century portrait rules, Leonardo seated her in a three-quarter turn with her hands resting gently on a chair arm, wearing no jewelry to distract from her gaze.',
        x: 46,
        y: 78,
      },
    ],
    meaning: {
      heading: 'A Synthesis of Art, Anatomy and Optics',
      paragraphs: [
        'Having dissected human facial muscles at night to trace every nerve controlling the lips, Leonardo infused a wooden panel with psychological breath.',
      ],
      keyTakeaway:
        'The world’s most famous painting earned its crown by turning human perception itself into part of the artwork.',
    },
    didYouKnow: [
      'When the Mona Lisa was stolen from the Louvre in 1911 by handyman Vincenzo Peruggia, thousands of visitors queued simply to stare at the empty hooks on the wall.',
      'High-resolution scans in 2007 proved Leonardo originally painted delicate eyelashes and eyebrows that faded over centuries of early cleaning.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Florentine Sfumato & Warm Umber',
      bgPrimary: '#0E0B08',
      bgSecondary: '#18130E',
      accent: '#D8A95B',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(168, 122, 64, 0.28) 0%, rgba(82, 96, 70, 0.12) 45%, rgba(14, 11, 8, 0.98) 78%)',
      borderSubtle: 'rgba(216, 169, 91, 0.18)',
    },
    source: {
      provider: 'Musée du Louvre / C2RMF',
      url: 'https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg',
      license: 'Public Domain',
      accessionNumber: 'INV 779',
      attribution: 'Acquired by King Francis I of France (1519).',
    },
    relatedExhibitIds: ['girl-with-a-pearl-earring', 'creation-of-adam', 'school-of-athens'],
  },
  {
    id: 'creation-of-adam',
    title: 'The Creation of Adam',
    subtitle: 'Creazione di Adamo · Sistine Chapel Ceiling',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Michelangelo Buonarroti',
    creatorRole: 'High Renaissance Master',
    date: 'c. 1512',
    period: 'Italian High Renaissance',
    location: 'Sistine Chapel, Vatican City',
    mediumOrMaterial: 'Buon fresco on ceiling vault plaster',
    dimensions: '280 cm × 570 cm',
    featured: true,
    hallNumber: 'Gallery I · 03',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'One millimeter of empty air between two outstretched index fingers—charged with the spark of consciousness.',
    introduction:
      'Painted sixty-eight feet above the floor of the Sistine Chapel while Michelangelo stood on high wooden scaffolding with wet lime plaster dripping onto his face, The Creation of Adam distilled the mystery of life into a single electric gap between two hands.',
    quote: {
      text: 'I am no painter—yet I have poured my soul into this vault.',
      attribution: 'Michelangelo Buonarroti (1510)',
    },
    story: {
      heading: 'The Spark Across One Millimeter of Space',
      paragraphs: [
        'For centuries before Michelangelo, artists depicted Creation with God standing safely on earth molding Adam from clay. Michelangelo invented a breathtaking visual drama: God hurtles through the heavens wrapped in a billowing crimson cloak while Adam reclines languidly on a barren cliff.',
        'Their index fingers do not touch. By leaving a tiny sliver of empty plaster between them, Michelangelo makes the viewer’s own mind complete the circuit of life.',
      ],
    },
    lookCloser: [
      {
        id: 'almost-touching-hands',
        title: 'The Gap Between the Two Fingers',
        tag: 'Visual Tension',
        description:
          'Adam’s wrist is heavy and limp, waiting for the spark of vitality radiating from the outstretched right index finger of the Creator.',
        x: 48,
        y: 38,
      },
      {
        id: 'anatomical-cloak',
        title: 'The Hidden Human Brain Silhouette',
        tag: 'Hidden Anatomy',
        description:
          'In 1990, physician Frank Meshberger noticed that the billowing red drapery surrounding God and the angels traces the exact anatomical cross-section of a human brain—including the frontal lobe, brainstem and pituitary gland.',
        x: 75,
        y: 38,
      },
    ],
    meaning: {
      heading: 'The Gift of Human Intellect',
      paragraphs: [
        'By concealing the silhouette of the human brain within the divine cloak, Michelangelo suggested that what separates humanity is not mere physical breath, but consciousness, imagination and free will.',
      ],
      keyTakeaway:
        'The most famous gesture in art history is not a touch—it is the split-second before contact.',
    },
    didYouKnow: [
      'Contrary to popular myth, Michelangelo did not paint the Sistine ceiling lying on his back; he painted standing upright with his head tilted sharply backward.',
      'The entire massive figure of Adam was painted in just four days (four plaster "giornate" sessions) without a single correction.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/960px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Sistine Fresco & Terracotta Gold',
      bgPrimary: '#110D0A',
      bgSecondary: '#1B1510',
      accent: '#E0B26B',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(212, 162, 102, 0.28) 0%, rgba(142, 82, 58, 0.12) 45%, rgba(17, 13, 10, 0.98) 78%)',
      borderSubtle: 'rgba(224, 178, 107, 0.18)',
    },
    source: {
      provider: 'Vatican Museums',
      url: 'https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg',
      license: 'Public Domain',
      accessionNumber: 'Sistine Vault IV',
      attribution: 'Sistine Chapel, Apostolic Palace, Vatican City.',
    },
    relatedExhibitIds: ['michelangelos-david', 'school-of-athens', 'mona-lisa'],
  },
  {
    id: 'girl-with-a-pearl-earring',
    title: 'Girl with a Pearl Earring',
    subtitle: 'Meisje met de parel',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Johannes Vermeer',
    creatorRole: 'Dutch Golden Age Master',
    date: 'c. 1665',
    period: 'Dutch Golden Age',
    location: 'Mauritshuis, The Hague',
    mediumOrMaterial: 'Oil on canvas',
    dimensions: '44.5 cm × 39 cm',
    featured: true,
    hallNumber: 'Gallery I · 04',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'An intimate half-second glance across three centuries of darkness, illuminated by two strokes of white paint.',
    introduction:
      'Neither a commissioned portrait of a noblewoman nor a historical narrative, Vermeer’s Girl with a Pearl Earring is a "tronie"—a study of an evocative expression. She turns toward us as if someone has just called her name.',
    quote: {
      text: 'The most famous pearl in art history is only two floating touches of white light.',
      attribution: 'Mauritshuis Conservation Study',
    },
    story: {
      heading: 'Rescued for Two Guilders at an 1881 Auction',
      paragraphs: [
        'For nearly two hundred years after Vermeer died in debt in Delft, his quiet paintings slipped into obscurity. In 1881, collector Arnoldus des Tombe spotted this grimy canvas at an auction in The Hague and bought it for just two guilders and thirty cents—roughly thirty dollars today.',
      ],
    },
    lookCloser: [
      {
        id: 'floating-pearl',
        title: 'The Illusion of the Pearl',
        tag: 'Optical Mastery',
        description:
          'Zoom in and there is no metal hook connecting the pearl to her ear. Vermeer created the entire jewel with just two brushstrokes: a bright highlight on top and a soft reflection of her white collar below.',
        x: 54,
        y: 61,
      },
      {
        id: 'lapis-turban',
        title: 'Afghan Lapis Lazuli Ultramarine',
        tag: 'Rare Pigment',
        description:
          'Vermeer painted her blue turban with natural ultramarine ground from lapis lazuli mined in Afghanistan—a pigment then more expensive by weight than pure gold.',
        x: 52,
        y: 25,
      },
    ],
    meaning: {
      heading: 'The Poetry of Fleeting Presence',
      paragraphs: [
        'By stripping away every background distraction, Vermeer leaves nothing except the silent encounter between her eyes and yours.',
      ],
      keyTakeaway:
        'Mastery is not always monumental scale; sometimes it is two touches of white paint suspended in shadow.',
    },
    didYouKnow: [
      'Because natural pearls of that colossal teardrop size rarely existed in the 1660s, the earring was likely polished Venetian glass or varnished silver.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Delft Chiaroscuro & Lapis Gold',
      bgPrimary: '#08090C',
      bgSecondary: '#11131A',
      accent: '#D4B06A',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(38, 63, 110, 0.28) 0%, rgba(212, 176, 106, 0.12) 42%, rgba(8, 9, 12, 0.99) 76%)',
      borderSubtle: 'rgba(212, 176, 106, 0.16)',
    },
    source: {
      provider: 'Mauritshuis, The Hague',
      url: 'https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/',
      license: 'Public Domain (CC0)',
      accessionNumber: 'Mauritshuis 670',
      attribution: 'Bequest of Arnoldus Andries des Tombe, 1903.',
    },
    relatedExhibitIds: ['mona-lisa', 'the-starry-night', 'school-of-athens'],
  },
  {
    id: 'michelangelos-david',
    title: 'David',
    subtitle: 'The Florentine Colossus',
    category: 'sculptures',
    categoryLabel: 'Sculptures & Statues',
    creator: 'Michelangelo Buonarroti',
    creatorRole: 'High Renaissance Sculptor',
    date: '1501–1504',
    period: 'Italian High Renaissance',
    location: 'Galleria dell’Accademia, Florence',
    mediumOrMaterial: 'Carrara white marble',
    dimensions: 'Height: 517 cm (17 ft)',
    featured: true,
    hallNumber: 'Gallery II · 05',
    curatedCollectionIds: ['greatest-sculptures'],
    tagline:
      'Carved from a discarded slab of marble that lay abandoned in a Florence cathedral yard for thirty-five years.',
    introduction:
      'At age twenty-six, Michelangelo took on a five-meter block of Carrara marble that two earlier sculptors had abandoned as flawed. Three years later, he unveiled a statue depicting David not after victory, but in the tense silence before battle.',
    quote: {
      text: 'In every block of marble I see a statue as plain as though it stood before me.',
      attribution: 'Michelangelo Buonarroti',
    },
    story: {
      heading: 'Rescuing the Abandoned Giant',
      paragraphs: [
        'Working behind a locked wooden enclosure, Michelangelo slept in his boots and carved day and night. When revealed in 1504, a committee including Leonardo da Vinci and Botticelli placed it at the entrance of Florence’s Palazzo Vecchio.',
      ],
    },
    lookCloser: [
      {
        id: 'furrowed-brow',
        title: 'The Furrowed Brow of Decision',
        tag: 'Psychology',
        description:
          'Earlier sculptors always showed David standing over Goliath’s severed head. Michelangelo captured the psychological moment of resolve before the sling is cast.',
        x: 47,
        y: 17,
      },
      {
        id: 'right-hand-veins',
        title: 'Swelling Veins of the Right Hand',
        tag: 'Anatomy',
        description:
          'David’s right hand holding the stone is deliberately carved slightly larger—a nod to his nickname "manu fortis" (strong of hand)—with veins swelling under adrenaline.',
        x: 34,
        y: 54,
      },
    ],
    meaning: {
      heading: 'Mind and Courage Over Brute Force',
      paragraphs: [
        'For the young Republic of Florence, David embodied the conviction that human intellect and moral courage can stand firm against overwhelming odds.',
      ],
      keyTakeaway:
        'A stone rejected by two generations of craftsmen became the universal standard for the human form.',
    },
    didYouKnow: [
      'A close inspection of David’s eyes reveals his left and right pupils point at slightly different angles so his gaze looks piercing from multiple viewpoints.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/%27David%27_by_Michelangelo_Fir_JBU005_denoised.jpg/960px-%27David%27_by_Michelangelo_Fir_JBU005_denoised.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Carrara Alabaster & Florentine Hall',
      bgPrimary: '#0C0C0E',
      bgSecondary: '#16161A',
      accent: '#CBB99B',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(203, 185, 155, 0.24) 0%, rgba(120, 114, 104, 0.08) 42%, rgba(12, 12, 14, 0.98) 78%)',
      borderSubtle: 'rgba(203, 185, 155, 0.16)',
    },
    source: {
      provider: 'Galleria dell’Accademia, Florence',
      url: 'https://commons.wikimedia.org/wiki/File:%27David%27_by_Michelangelo_Fir_JBU005_denoised.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'Inv. 1076',
      attribution: 'Galleria dell’Accademia di Firenze.',
    },
    relatedExhibitIds: ['creation-of-adam', 'winged-victory-of-samothrace', 'bust-of-nefertiti'],
  },
  {
    id: 'pyramids-of-giza',
    title: 'Great Pyramids of Giza',
    subtitle: 'Necropolis of Khufu, Khafre and Menkaure',
    category: 'wonders',
    categoryLabel: 'Historical Wonders',
    creator: 'Old Kingdom of Egypt (Hemiunu)',
    creatorRole: 'Fourth Dynasty Master Builders',
    date: 'c. 2580–2510 BC',
    period: 'Old Kingdom Egypt',
    location: 'Giza Plateau, Cairo, Egypt',
    mediumOrMaterial: 'Limestone & Aswan pink granite',
    dimensions: 'Height: 146.6 m (481 ft)',
    featured: true,
    hallNumber: 'Gallery III · 06',
    curatedCollectionIds: ['wonders-ancient-world'],
    tagline:
      'Last surviving wonder of the ancient world—mountains of stone aligned within fractions of a degree to true north.',
    introduction:
      'Rising from the western bank of the Nile, the three great pyramids have watched over forty-five centuries of human history. Even when Cleopatra walked the earth, the Pyramids were already more ancient to her than she is to us today.',
    quote: {
      text: 'Man fears Time, yet Time fears the Pyramids.',
      attribution: 'Classical Arabic Proverb',
    },
    story: {
      heading: 'How a Bronze Age Civilization Raised a Mountain',
      paragraphs: [
        'Around 2580 BC, Pharaoh Khufu commissioned his royal architect Hemiunu to raise a horizon monument of 2.3 million stone blocks built by 20,000 skilled Egyptian masons and engineers.',
      ],
    },
    lookCloser: [
      {
        id: 'khafre-casing',
        title: 'Surviving White Limestone Cap',
        tag: 'Engineering',
        description:
          'At the summit of the middle pyramid (Khafre), remnants of the original polished white Tura limestone casing still gleam.',
        x: 49,
        y: 31,
      },
      {
        id: 'cardinal-alignment',
        title: 'Astronomical Cardinal Precision',
        tag: 'Astronomy',
        description:
          'Without compasses, Old Kingdom surveyors aligned the Great Pyramid’s four sides to true north within one-fifteenth of a degree.',
        x: 24,
        y: 42,
      },
    ],
    meaning: {
      heading: 'Stairways to the Imperishable Stars',
      paragraphs: [
        'For over 3,800 years, the Great Pyramid of Khufu remained the tallest human-made structure on Earth.',
      ],
      keyTakeaway:
        'A testament to what collective human organization and geometry achieved at the dawn of history.',
    },
    didYouKnow: [
      'Despite scorching desert heat outside, the interior temperature of the Great Pyramid remains a constant 20°C (68°F) year-round.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/960px-All_Gizah_Pyramids.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Saharan Sandstone & Desert Gold',
      bgPrimary: '#110D09',
      bgSecondary: '#1B150E',
      accent: '#D9A760',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(217, 167, 96, 0.28) 0%, rgba(145, 97, 42, 0.10) 45%, rgba(17, 13, 9, 0.98) 78%)',
      borderSubtle: 'rgba(217, 167, 96, 0.18)',
    },
    source: {
      provider: 'UNESCO World Heritage',
      url: 'https://commons.wikimedia.org/wiki/File:All_Gizah_Pyramids.jpg',
      license: 'CC BY-SA 2.0',
      accessionNumber: 'UNESCO Ref. 86',
      attribution: 'Photograph by Ricardo Liberato, Giza Necropolis.',
    },
    relatedExhibitIds: ['mask-of-tutankhamun', 'bust-of-nefertiti', 'petra-al-khazneh'],
  },
  {
    id: 'taj-mahal',
    title: 'The Taj Mahal',
    subtitle: 'Crown of the Palace',
    category: 'architecture',
    categoryLabel: 'Architecture & Landmarks',
    creator: 'Ustad Ahmad Lahori (Shah Jahan)',
    creatorRole: 'Imperial Mughal Chief Architect',
    date: '1632–1653',
    period: 'Mughal Empire',
    location: 'Agra, India',
    mediumOrMaterial: 'Makrana translucent white marble & gemstone inlay',
    dimensions: 'Dome height: 73 m (240 ft)',
    featured: true,
    hallNumber: 'Gallery IV · 07',
    curatedCollectionIds: ['architectural-marvels'],
    tagline:
      'An imperial mausoleum of translucent white marble that shifts from rose pink at dawn to pearl gold under the moon.',
    introduction:
      'Born from Emperor Shah Jahan’s grief upon the death of his consort Mumtaz Mahal in 1631, the Taj Mahal fuses Persian symmetry, Islamic calligraphy and Indian stonecraft into a vision of paradise on earth.',
    quote: {
      text: 'A teardrop on the cheek of time.',
      attribution: 'Rabindranath Tagore',
    },
    story: {
      heading: 'Twenty Thousand Artisans and One Thousand Elephants',
      paragraphs: [
        'Luminous white marble was quarried in Makrana over 200 miles away, while twenty-eight varieties of semi-precious gemstones were inlaid directly into marble floral arabesques.',
      ],
    },
    lookCloser: [
      {
        id: 'double-dome',
        title: 'The Onion Dome & Lotus Finial',
        tag: 'Geometry',
        description:
          'Crowned by a gilded finial blending a Persian crescent moon with an inverted lotus blossom, the outer dome conceals a smaller inner vault.',
        x: 50,
        y: 23,
      },
      {
        id: 'leaning-minarets',
        title: 'Outward-Tilting Minarets',
        tag: 'Engineering',
        description:
          'Each corner minaret was engineered with a subtle outward tilt so that in an earthquake they would fall away from the central tomb.',
        x: 23,
        y: 42,
      },
    ],
    meaning: {
      heading: 'An Earthly Mirror of Paradise',
      paragraphs: [
        'Because Makrana marble is slightly translucent, the building acts as a prism for atmospheric light throughout the day.',
      ],
      keyTakeaway:
        'Where most imperial monuments celebrate conquest, the world’s most celebrated building is a monument to love.',
    },
    didYouKnow: [
      'A single one-inch marble flower on the interior cenotaph screen contains over sixty inlaid slivers of semi-precious gemstone.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/960px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Makrana Pearl & Yamuna Dawn',
      bgPrimary: '#0E0C10',
      bgSecondary: '#17141A',
      accent: '#E0C39E',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(224, 195, 158, 0.25) 0%, rgba(168, 128, 114, 0.10) 42%, rgba(14, 12, 16, 0.98) 78%)',
      borderSubtle: 'rgba(224, 195, 158, 0.17)',
    },
    source: {
      provider: 'UNESCO World Heritage',
      url: 'https://commons.wikimedia.org/wiki/File:Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'UNESCO Ref. 252',
      attribution: 'Photograph by Kristian Bertel.',
    },
    relatedExhibitIds: ['the-pantheon-rome', 'petra-al-khazneh', 'the-parthenon'],
  },
  {
    id: 'mask-of-tutankhamun',
    title: 'Mask of Tutankhamun',
    subtitle: 'Golden Portrait of the Boy Pharaoh (KV62)',
    category: 'artefacts',
    categoryLabel: 'Royal Artefacts & Relics',
    creator: 'Royal Goldsmiths of the 18th Dynasty',
    creatorRole: 'Ancient Egyptian Master Artisans',
    date: 'c. 1323 BC',
    period: 'New Kingdom Egypt',
    location: 'Egyptian Museum, Cairo',
    mediumOrMaterial: '10.23 kg of solid 23-karat gold, lapis lazuli & obsidian',
    dimensions: 'Height: 54 cm (21 in)',
    featured: true,
    hallNumber: 'Gallery V · 08',
    curatedCollectionIds: ['wonders-ancient-world', 'greatest-sculptures'],
    tagline:
      'Hammered from two alloys of solid gold and buried in darkness for three millennia until Howard Carter held up a candle.',
    introduction:
      'Resting directly over the mummified nineteen-year-old pharaoh in the Valley of the Kings, the funerary mask of Tutankhamun transformed a mortal youth into the eternal image of the sun god Ra.',
    quote: {
      text: 'Everywhere the glint of gold.',
      attribution: 'Howard Carter (November 1922)',
    },
    story: {
      heading: 'A Forgotten Tomb Hidden Beneath Workmen’s Huts',
      paragraphs: [
        'Workmen digging the later tomb of Ramesses VI dumped tons of limestone rubble directly over the entrance staircase to Tutankhamun’s modest tomb—accidentally shielding 5,398 royal treasures from grave robbers for 3,245 years.',
      ],
    },
    lookCloser: [
      {
        id: 'vulture-cobra',
        title: 'The Vulture and Cobra of the Two Lands',
        tag: 'Royal Insignia',
        description:
          'Rising from the pharaoh’s brow are Nekhbet (the vulture of Upper Egypt) and Wadjet (the cobra of Lower Egypt), signifying unified divine rule.',
        x: 50,
        y: 19,
      },
      {
        id: 'quartz-obsidian-eyes',
        title: 'Quartz and Obsidian Eyes',
        tag: 'Craftsmanship',
        description:
          'The whites of his eyes are milky quartz with pupils of volcanic obsidian framed in lapis lazuli eyeliner.',
        x: 50,
        y: 38,
      },
    ],
    meaning: {
      heading: 'The Flesh of the Gods',
      paragraphs: [
        'Because gold never tarnishes, ancient Egyptians revered it as the literal flesh of the sun god Ra.',
      ],
      keyTakeaway:
        'A minor boy-king forgotten by his successors became the eternal face of ancient Egypt.',
    },
    didYouKnow: [
      'X-ray studies revealed the mask uses two distinct gold alloys: 18.4-karat silver-gold for the face and 22.5-karat reddish gold for the headdress.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/960px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Royal 23-Karat Gold & Lapis Chamber',
      bgPrimary: '#0E0A06',
      bgSecondary: '#19130B',
      accent: '#E5B85B',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(229, 184, 91, 0.28) 0%, rgba(36, 71, 130, 0.12) 45%, rgba(14, 10, 6, 0.99) 78%)',
      borderSubtle: 'rgba(229, 184, 91, 0.20)',
    },
    source: {
      provider: 'Egyptian Museum, Cairo',
      url: 'https://commons.wikimedia.org/wiki/File:CairoEgMuseumTaaMaskMostlyPhotographed.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'JE 60672',
      attribution: 'Egyptian Museum, Cairo.',
    },
    relatedExhibitIds: ['pyramids-of-giza', 'bust-of-nefertiti', 'the-rosetta-stone'],
  },
  {
    id: 'great-wave-kanagawa',
    title: 'The Great Wave off Kanagawa',
    subtitle: 'Kanagawa-oki Nami Ura',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Katsushika Hokusai',
    creatorRole: 'Ukiyo-e Master Printmaker',
    date: 'c. 1831',
    period: 'Edo Period (Ukiyo-e)',
    location: 'The Met, New York',
    mediumOrMaterial: 'Polychrome woodblock print',
    dimensions: '25.7 cm × 37.9 cm',
    featured: false,
    hallNumber: 'Gallery I · 09',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'A towering wall of Prussian blue water freezes in mid-air above three fragile fishing boats and sacred Mount Fuji.',
    introduction:
      'Created when Hokusai was over seventy years old, The Great Wave off Kanagawa is the first print in Thirty-Six Views of Mount Fuji—a meditation on stillness amid violent change.',
    story: {
      heading: 'A European Pigment Meets Japanese Woodblock Mastery',
      paragraphs: [
        'Through Dutch traders in Nagasaki, synthetic Prussian blue pigment reached Edo workshops, allowing Hokusai to give his wave unprecedented tonal power.',
      ],
    },
    lookCloser: [
      {
        id: 'claw-foam',
        title: 'The Claw-Like Sea Spray',
        tag: 'Composition',
        description:
          'Each tendril of white foam curls into taloned claws poised above the oarsmen below.',
        x: 34,
        y: 22,
      },
      {
        id: 'mount-fuji-frame',
        title: 'Mount Fuji Framed by the Swell',
        tag: 'Perspective',
        description:
          'Dwarfed on the horizon, snow-capped Mount Fuji sits serenely inside the curve of the giant wave.',
        x: 52,
        y: 66,
      },
    ],
    meaning: {
      heading: 'Impermanence vs. Eternal Stillness',
      paragraphs: [
        'When Japan opened its ports in the 1850s, impressions of The Great Wave flooded Paris—inspiring Monet, Van Gogh and Debussy.',
      ],
      keyTakeaway:
        'A print originally sold in Edo for the price of a bowl of noodles became the most recognizable image of Japanese art.',
    },
    didYouKnow: [
      'The falling droplets of sea spray double as snowflakes drifting down onto Mount Fuji.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/960px-Tsunami_by_hokusai_19th_century.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Prussian Indigo & Washi Parchment',
      bgPrimary: '#090D14',
      bgSecondary: '#111824',
      accent: '#C8B08A',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(44, 78, 122, 0.28) 0%, rgba(200, 176, 138, 0.10) 42%, rgba(9, 13, 20, 0.98) 78%)',
      borderSubtle: 'rgba(200, 176, 138, 0.16)',
    },
    source: {
      provider: 'The Metropolitan Museum of Art',
      url: 'https://www.metmuseum.org/art/collection/search/45434',
      license: 'Public Domain (CC0)',
      accessionNumber: 'JP1847',
      attribution: 'H. O. Havemeyer Collection, 1929.',
    },
    relatedExhibitIds: ['the-starry-night', 'wanderer-above-sea-of-fog'],
  },
  {
    id: 'winged-victory-of-samothrace',
    title: 'Winged Victory of Samothrace',
    subtitle: 'Nike of Samothrace',
    category: 'sculptures',
    categoryLabel: 'Sculptures & Statues',
    creator: 'Hellenistic Sculptor of Rhodes',
    creatorRole: 'Hellenistic Greek Master',
    date: 'c. 190 BC',
    period: 'Hellenistic Greece',
    location: 'Musée du Louvre, Paris',
    mediumOrMaterial: 'Parian white marble',
    dimensions: 'Height: 244 cm (8 ft)',
    featured: false,
    hallNumber: 'Gallery II · 10',
    curatedCollectionIds: ['greatest-sculptures'],
    tagline:
      'Goddess Nike alights onto the prow of a warship into a howling sea wind, her marble drapery clinging like wet silk.',
    introduction:
      'Discovered in 1863 on the Aegean island of Samothrace, the Winged Victory is the supreme masterpiece of Hellenistic sculpture.',
    story: {
      heading: 'A Monument to Naval Victory',
      paragraphs: [
        'Carved to commemorate a sea triumph in the Aegean, the statue was staged above a reflection pool so pilgrims climbed toward her wind-whipped profile.',
      ],
    },
    lookCloser: [
      {
        id: 'wet-drapery',
        title: 'Wind-Whipped Marble Chiton',
        tag: 'Technique',
        description:
          'Where the sea wind presses against her torso, solid marble looks as sheer as wet linen.',
        x: 49,
        y: 54,
      },
    ],
    meaning: {
      heading: 'Motion Frozen in Two Tons of Stone',
      paragraphs: [
        'Even without her head or arms, her entire body radiates the exhilaration of flight.',
      ],
      keyTakeaway:
        'Perhaps no other work in history turns solid stone into the sensation of wind.',
    },
    didYouKnow: [
      'In 1950, archaeologists unearthed her open right hand—showing she was raising her palm in a gesture of greeting.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg/960px-Victoire_de_Samothrace_-_Musee_du_Louvre_-_20190812.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Parian Marble & Louvre Travertine',
      bgPrimary: '#0E0D0C',
      bgSecondary: '#181614',
      accent: '#D5C2A5',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(213, 194, 165, 0.22) 0%, rgba(120, 102, 78, 0.08) 45%, rgba(14, 13, 12, 0.98) 78%)',
      borderSubtle: 'rgba(213, 194, 165, 0.16)',
    },
    source: {
      provider: 'Musée du Louvre',
      url: 'https://collections.louvre.fr/en/ark:/53355/cl010252531',
      license: 'CC BY-SA 4.0',
      accessionNumber: 'Ma 2369',
      attribution: 'Musée du Louvre, Paris.',
    },
    relatedExhibitIds: ['michelangelos-david', 'bust-of-nefertiti'],
  },
  {
    id: 'bust-of-nefertiti',
    title: 'Bust of Nefertiti',
    subtitle: 'Great Royal Wife of Akhenaten',
    category: 'sculptures',
    categoryLabel: 'Sculptures & Statues',
    creator: 'Thutmose',
    creatorRole: 'Royal Sculptor of Amarna',
    date: 'c. 1345 BC',
    period: 'Amarna Period Egypt',
    location: 'Neues Museum, Berlin',
    mediumOrMaterial: 'Painted limestone & stucco',
    dimensions: 'Height: 48 cm (19 in)',
    featured: false,
    hallNumber: 'Gallery II · 11',
    curatedCollectionIds: ['greatest-sculptures'],
    tagline:
      'Found face-down in a royal sculptor’s workshop after 3,250 years, her original mineral pigments still glowing intact.',
    introduction:
      'Her name translates as "The Beautiful One Has Come." Carved by court sculptor Thutmose, this bust was the master reference model in the royal workshop of Amarna.',
    story: {
      heading: 'Uncovered Intact in the Sculptor’s Pantry',
      paragraphs: [
        'On 6 December 1912, excavators clearing the ruined house of sculptor Thutmose brushed away the Nile sand with their bare hands and lifted out the queen’s bust with its 3,250-year-old pigments intact.',
      ],
    },
    lookCloser: [
      {
        id: 'missing-left-eye',
        title: 'The Teaching Model’s Unfinished Eye',
        tag: 'Secret',
        description:
          'Her right eye contains a rock-crystal iris over black beeswax, while the left socket was left bare so apprentices could study how the inlay was seated.',
        x: 56,
        y: 44,
      },
    ],
    meaning: {
      heading: 'A Revolution in Royal Naturalism',
      paragraphs: [
        'Breaking two millennia of rigid geometric convention, Thutmose captured individual bone structure and royal poise.',
      ],
      keyTakeaway:
        'A workshop reference model left on a shelf became an eternal icon of royal grace.',
    },
    didYouKnow: [
      'CT scans revealed a second, subtly different face carved into the inner limestone core beneath the outer stucco layer.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Nofretete_Neues_Museum.jpg/960px-Nofretete_Neues_Museum.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Amarna Terracotta & Egyptian Blue',
      bgPrimary: '#100C0A',
      bgSecondary: '#1B1410',
      accent: '#D9A571',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(217, 165, 113, 0.25) 0%, rgba(50, 96, 138, 0.10) 45%, rgba(16, 12, 10, 0.99) 78%)',
      borderSubtle: 'rgba(217, 165, 113, 0.17)',
    },
    source: {
      provider: 'Neues Museum, Berlin',
      url: 'https://commons.wikimedia.org/wiki/File:Nofretete_Neues_Museum.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'ÄM 21300',
      attribution: 'Staatliche Museen zu Berlin.',
    },
    relatedExhibitIds: ['mask-of-tutankhamun', 'pyramids-of-giza'],
  },
  {
    id: 'petra-al-khazneh',
    title: 'Petra: The Treasury',
    subtitle: 'Al-Khazneh · Nabataean Kingdom',
    category: 'wonders',
    categoryLabel: 'Historical Wonders',
    creator: 'Nabataean Architects of King Aretas IV',
    creatorRole: 'Master Rock-Carvers',
    date: '1st Century AD',
    period: 'Nabataean Kingdom',
    location: 'Wadi Musa, Jordan',
    mediumOrMaterial: 'Carved directly into rose-red sandstone cliff',
    dimensions: 'Height: 39.1 m (128 ft)',
    featured: false,
    hallNumber: 'Gallery III · 12',
    curatedCollectionIds: ['wonders-ancient-world', 'architectural-marvels'],
    tagline:
      'Revealed at the end of a narrow desert chasm—a twelve-story temple sculpted top-down out of living rose sandstone.',
    introduction:
      'Emerging through the narrow canyon of the Siq, Al-Khazneh is not a building assembled from blocks—it is a negative sculpture carved backward into the solid cliff face.',
    story: {
      heading: 'Carved From the Top Down Without Scaffolding',
      paragraphs: [
        'With no timber forests in the desert canyon, Nabataean stonemasons suspended themselves from ropes and carved stepped ledges directly into the cliff from the summit downward.',
      ],
    },
    lookCloser: [
      {
        id: 'stone-urn-bullet-marks',
        title: 'The Stone Urn & Bedouin Rifle Marks',
        tag: 'Folklore',
        description:
          'The urn crowning the central pavilion is pockmarked with nineteenth-century bullet holes from travellers hoping a pharaoh’s gold was hidden inside.',
        x: 50,
        y: 23,
      },
    ],
    meaning: {
      heading: 'Where East and West Met in Rose Stone',
      paragraphs: [
        'Al-Khazneh blends Hellenistic Corinthian columns with Nabataean and Egyptian royal motifs.',
      ],
      keyTakeaway:
        'Architecture is usually the art of adding stone to space; at Petra, it became the art of carving space out of the earth.',
    },
    didYouKnow: [
      'Only 15% of the ancient city of Petra has been excavated; 85% still lies untouched beneath the desert floor.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Al_Khazneh_Petra_edit_2.jpg/960px-Al_Khazneh_Petra_edit_2.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Nabataean Rose Sandstone',
      bgPrimary: '#120B0A',
      bgSecondary: '#1E1311',
      accent: '#DE8F6E',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(222, 143, 110, 0.26) 0%, rgba(138, 68, 48, 0.10) 45%, rgba(18, 11, 10, 0.99) 78%)',
      borderSubtle: 'rgba(222, 143, 110, 0.18)',
    },
    source: {
      provider: 'UNESCO World Heritage',
      url: 'https://commons.wikimedia.org/wiki/File:Al_Khazneh_Petra_edit_2.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'UNESCO Ref. 326',
      attribution: 'Photograph by Bernard Gagnon.',
    },
    relatedExhibitIds: ['pyramids-of-giza', 'taj-mahal'],
  },
  {
    id: 'the-pantheon-rome',
    title: 'The Pantheon',
    subtitle: 'Temple of All the Gods',
    category: 'architecture',
    categoryLabel: 'Architecture & Landmarks',
    creator: 'Emperor Hadrian & Apollodorus',
    creatorRole: 'Roman Imperial Architects',
    date: 'c. 126 AD',
    period: 'High Roman Empire',
    location: 'Rome, Italy',
    mediumOrMaterial: 'Unreinforced Roman concrete & Egyptian granite',
    dimensions: 'Dome diameter: 43.3 m (142 ft)',
    featured: false,
    hallNumber: 'Gallery IV · 13',
    curatedCollectionIds: ['architectural-marvels'],
    tagline:
      'For nineteen centuries, the world’s largest unreinforced concrete dome—pierced at its zenith by a single open eye to the sky.',
    introduction:
      'Step through the bronze doors of the Pantheon and you enter a perfect sphere: the height to the open oculus is identical to the interior diameter of the rotunda (43.3 meters).',
    story: {
      heading: 'How Roman Concrete Defied Gravity',
      paragraphs: [
        'Roman engineers graded the concrete aggregate from dense travertine at the base to featherweight volcanic pumice around the open oculus, allowing the dome to stand for 1,900 years without steel reinforcement.',
      ],
    },
    lookCloser: [
      {
        id: 'oculus-eye',
        title: 'The 9-Meter Open Oculus',
        tag: 'Light & Structure',
        description:
          'The central open eye removes weight from the dome’s crown while turning a beam of sunlight into a giant moving sundial.',
        x: 50,
        y: 25,
      },
      {
        id: 'egyptian-columns',
        title: 'Monolithic Egyptian Granite Columns',
        tag: 'Logistics',
        description:
          'Each portico column is a single 60-ton shaft of granite quarried in Egypt and barged across the Mediterranean to Rome.',
        x: 48,
        y: 62,
      },
    ],
    meaning: {
      heading: 'The Dome That Inspired the Renaissance',
      paragraphs: [
        'Preserved because it was consecrated as a church in 609 AD, the Pantheon became the resting place of painter Raphael.',
      ],
      keyTakeaway:
        'A timeless lesson where structure, geometry and daylight become a single instrument.',
    },
    didYouKnow: [
      'When rain falls through the open oculus, twenty-two tiny holes in the subtly sloped marble floor drain it away immediately.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Pantheon_Rom_1_cropped.jpg/960px-Pantheon_Rom_1_cropped.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Roman Pozzolana & Bronze',
      bgPrimary: '#0E0C0B',
      bgSecondary: '#181412',
      accent: '#C9A477',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(201, 164, 119, 0.24) 0%, rgba(138, 92, 62, 0.08) 45%, rgba(14, 12, 11, 0.99) 78%)',
      borderSubtle: 'rgba(201, 164, 119, 0.16)',
    },
    source: {
      provider: 'UNESCO Historic Centre of Rome',
      url: 'https://commons.wikimedia.org/wiki/File:Pantheon_Rom_1_cropped.jpg',
      license: 'CC BY-SA 3.0',
      accessionNumber: 'UNESCO Ref. 91',
      attribution: 'Piazza della Rotonda, Rome.',
    },
    relatedExhibitIds: ['the-parthenon', 'taj-mahal'],
  },
  {
    id: 'the-parthenon',
    title: 'The Parthenon',
    subtitle: 'Acropolis of Athens',
    category: 'architecture',
    categoryLabel: 'Architecture & Landmarks',
    creator: 'Ictinus, Callicrates & Phidias',
    creatorRole: 'Classical Athenian Architects',
    date: '447–432 BC',
    period: 'Classical Golden Age of Athens',
    location: 'Athens, Greece',
    mediumOrMaterial: 'Pentelic white marble',
    dimensions: '69.5 m × 30.9 m',
    featured: false,
    hallNumber: 'Gallery IV · 14',
    curatedCollectionIds: ['wonders-ancient-world', 'architectural-marvels'],
    tagline:
      'A marble temple that appears mathematically straight to the human eye only because not a single line in it is truly straight.',
    introduction:
      'Crowning the sacred rock of the Acropolis above Athens, the Parthenon conceals one of history’s greatest optical illusions.',
    story: {
      heading: 'Built Without a Single Straight Line',
      paragraphs: [
        'To counteract human optical distortion, the architects carved every block with subtle curvature: the floor arches upward 11 cm toward the center and every column leans slightly inward.',
      ],
    },
    lookCloser: [
      {
        id: 'curved-stylobate',
        title: 'The Curved Marble Foundation',
        tag: 'Optical Illusion',
        description:
          'The marble base arches gently upward so that from a distance, the brain perceives the steps as perfectly horizontal.',
        x: 50,
        y: 78,
      },
    ],
    meaning: {
      heading: 'The Architectural Symbol of Classical Measure',
      paragraphs: [
        'Not a single drop of mortar was used; its 13,400 marble blocks are locked together by precision-ground surfaces.',
      ],
      keyTakeaway:
        'Perfection in architecture is bending geometry to serve human perception.',
    },
    didYouKnow: [
      'If you extended the axes of the Parthenon’s columns upward into the sky, they would meet at a single point 2.4 kilometers above Athens.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/960px-The_Parthenon_in_Athens.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Pentelic Honey Marble',
      bgPrimary: '#0E0D0A',
      bgSecondary: '#181612',
      accent: '#DAB87A',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(218, 184, 122, 0.24) 0%, rgba(89, 118, 148, 0.08) 45%, rgba(14, 13, 10, 0.99) 78%)',
      borderSubtle: 'rgba(218, 184, 122, 0.16)',
    },
    source: {
      provider: 'UNESCO Acropolis, Athens',
      url: 'https://commons.wikimedia.org/wiki/File:The_Parthenon_in_Athens.jpg',
      license: 'CC BY 2.0',
      accessionNumber: 'UNESCO Ref. 404',
      attribution: 'Photograph by Steve Swayne.',
    },
    relatedExhibitIds: ['the-pantheon-rome', 'winged-victory-of-samothrace'],
  },
  {
    id: 'the-rosetta-stone',
    title: 'The Rosetta Stone',
    subtitle: 'Decree of Memphis (196 BC)',
    category: 'artefacts',
    categoryLabel: 'Royal Artefacts & Relics',
    creator: 'Priests of Memphis (Ptolemy V)',
    creatorRole: 'Ptolemaic Royal Scribes',
    date: '196 BC',
    period: 'Ptolemaic Egypt',
    location: 'The British Museum, London',
    mediumOrMaterial: 'Dark granodiorite stele',
    dimensions: '112.3 cm × 75.7 cm',
    featured: false,
    hallNumber: 'Gallery V · 15',
    curatedCollectionIds: ['wonders-ancient-world'],
    tagline:
      'One royal decree carved in three scripts that shattered fourteen hundred years of silence and unlocked ancient Egypt.',
    introduction:
      'Pulled from a fortress wall near Rosetta in July 1799, this broken black stone carried the same royal decree in three scripts—allowing Jean-François Champollion to crack the code of Egyptian hieroglyphs in 1822.',
    story: {
      heading: 'One Message in Three Scripts',
      paragraphs: [
        'The decree was carved in Sacred Hieroglyphs at the top, everyday Egyptian Demotic in the middle, and Ancient Greek at the bottom—giving scholars the phonetic key to three millennia of lost history.',
      ],
    },
    lookCloser: [
      {
        id: 'hieroglyphic-register',
        title: 'Sacred Hieroglyphs & Royal Cartouches',
        tag: 'Decipherment',
        description:
          'Inside the oval rings (cartouches) of the top register, Champollion identified the phonetic spelling of "Ptolemaios."',
        x: 50,
        y: 25,
      },
    ],
    meaning: {
      heading: 'Restoring the Memory of a Civilization',
      paragraphs: [
        'By cracking the Rosetta Stone, humanity recovered three thousand years of Egyptian literature, science and history.',
      ],
      keyTakeaway:
        'A routine tax stone pulled from rubble restored the voice of an entire civilization.',
    },
    didYouKnow: [
      'The Rosetta Stone is not basalt, but dark granodiorite threaded with a diagonal vein of pink granite.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/960px-Rosetta_Stone.JPG',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'Granodiorite Slate & Brass',
      bgPrimary: '#0A0B0D',
      bgSecondary: '#13161B',
      accent: '#C4B59B',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(154, 165, 180, 0.22) 0%, rgba(196, 181, 155, 0.08) 45%, rgba(10, 11, 13, 0.99) 78%)',
      borderSubtle: 'rgba(196, 181, 155, 0.16)',
    },
    source: {
      provider: 'The British Museum',
      url: 'https://www.britishmuseum.org/collection/object/Y_EA24',
      license: 'CC BY-SA 4.0',
      accessionNumber: 'EA 24',
      attribution: 'British Museum; photograph by Hans Hillewaert.',
    },
    relatedExhibitIds: ['mask-of-tutankhamun', 'pyramids-of-giza'],
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    subtitle: 'Homer’s Epic of the Long Journey Home',
    category: 'books',
    categoryLabel: 'Books & Literature',
    creator: 'Homer',
    creatorRole: 'Ancient Greek Epic Poet',
    date: 'c. 8th Century BC',
    period: 'Archaic Greece',
    location: 'Mediterranean Oral & Manuscript Tradition',
    mediumOrMaterial: '24 Books in Dactylic Hexameter',
    dimensions: '12,109 Lines of Verse',
    featured: false,
    hallNumber: 'Gallery VI · 16',
    curatedCollectionIds: ['wonders-ancient-world'],
    tagline:
      'Ten years of war followed by ten years at sea—the foundational poem that turned "odyssey" into the word for every great journey.',
    introduction:
      'Following Odysseus as he battles storms, monsters and immortality itself simply to return home to Ithaca, Homer’s Odyssey established the architecture of Western storytelling.',
    story: {
      heading: 'Sung From Memory Around Mediterranean Hearths',
      paragraphs: [
        'Unlike The Iliad, which celebrates glory on the battlefield, The Odyssey invented a hero who survives through wit, curiosity and longing for home.',
      ],
    },
    lookCloser: [
      {
        id: 'sirens-song',
        title: 'Odysseus Tied to the Mast Before the Sirens',
        tag: 'Myth & Curiosity',
        description:
          'Burning to hear the Sirens’ omniscient song without perishing, Odysseus plugged his crew’s ears with beeswax and had himself lashed to the ship’s mast.',
        x: 48,
        y: 44,
      },
    ],
    meaning: {
      heading: 'Why Every Journey Is Measured Against Ithaca',
      paragraphs: [
        'On Calypso’s island, Odysseus refuses eternal youth and godhood, choosing human love and mortality over an unaging paradise.',
      ],
      keyTakeaway:
        'To be human is not to escape mortality, but to find one’s way home through the storm.',
    },
    didYouKnow: [
      'Our everyday words "mentor," "siren" and "odyssey" all come directly from this single poem.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/John_William_Waterhouse_-_Ulysses_and_the_Sirens_%281891%29.jpg/960px-John_William_Waterhouse_-_Ulysses_and_the_Sirens_%281891%29.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Wine-Dark Aegean & Vellum Gold',
      bgPrimary: '#0C0B0E',
      bgSecondary: '#17151C',
      accent: '#D4AF72',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(168, 128, 76, 0.24) 0%, rgba(58, 72, 110, 0.10) 45%, rgba(12, 11, 14, 0.99) 78%)',
      borderSubtle: 'rgba(212, 175, 114, 0.17)',
    },
    source: {
      provider: 'National Gallery of Victoria',
      url: 'https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Ulysses_and_the_Sirens_(1891).jpg',
      license: 'Public Domain',
      accessionNumber: 'NGV p.396.3-1',
      attribution: 'John William Waterhouse, Ulysses and the Sirens (1891).',
    },
    relatedExhibitIds: ['don-quixote', 'the-parthenon'],
  },
  {
    id: 'don-quixote',
    title: 'Don Quixote',
    subtitle: 'El ingenioso hidalgo don Quijote de la Mancha',
    category: 'books',
    categoryLabel: 'Books & Literature',
    creator: 'Miguel de Cervantes',
    creatorRole: 'Spanish Golden Age Novelist',
    date: '1605 · 1615',
    period: 'Spanish Golden Age',
    location: 'Madrid, Spain',
    mediumOrMaterial: 'First Modern Novel (Two Volumes)',
    dimensions: '126 Chapters',
    featured: false,
    hallNumber: 'Gallery VI · 17',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'Conceived inside a Seville debtors’ prison, the tale of an aging dreamer who mistook windmills for giants and invented the modern novel.',
    introduction:
      'Following country gentleman Alonso Quixano and his pragmatic squire Sancho Panza across the plains of La Mancha, Cervantes quietly reinvented human fiction.',
    story: {
      heading: 'Idealism and Realism Riding Side by Side',
      paragraphs: [
        'In Part II (1615), Cervantes pulled off a masterstroke three centuries ahead of its time: Don Quixote and Sancho meet readers who have already read Part I of their adventures.',
      ],
    },
    lookCloser: [
      {
        id: 'quixote-sancho-duality',
        title: 'The Knight and the Squire',
        tag: 'Character',
        description:
          'In gaunt Don Quixote and grounded Sancho Panza, Cervantes split the human spirit into poetic idealism and earthly common sense.',
        x: 49,
        y: 48,
      },
    ],
    meaning: {
      heading: 'Voted the Greatest Work of Fiction in History',
      paragraphs: [
        'In 2002, the Norwegian Nobel Institute polled 100 leading authors from 54 countries; Don Quixote was voted the greatest book ever written.',
      ],
      keyTakeaway:
        'We begin the novel laughing at Don Quixote’s madness, and close it mourning the moment he regains his sanity.',
    },
    didYouKnow: [
      'The English word "quixotic" and the phrase "tilting at windmills" entered languages worldwide from Chapter VIII.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Don_Quichotte_Honor%C3%A9_Daumier.jpg/960px-Don_Quichotte_Honor%C3%A9_Daumier.jpg',
      aspectRatio: 'portrait',
    },
    atmosphere: {
      name: 'La Mancha Ochre & Antique Paper',
      bgPrimary: '#110D0A',
      bgSecondary: '#1C1611',
      accent: '#D6A868',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(214, 168, 104, 0.25) 0%, rgba(133, 88, 46, 0.10) 45%, rgba(17, 13, 10, 0.99) 78%)',
      borderSubtle: 'rgba(214, 168, 104, 0.17)',
    },
    source: {
      provider: 'Neue Pinakothek, Munich',
      url: 'https://commons.wikimedia.org/wiki/File:Don_Quichotte_Honor%C3%A9_Daumier.jpg',
      license: 'Public Domain',
      accessionNumber: 'WAF 195',
      attribution: 'Honoré Daumier, Don Quixote and Sancho Panza (c. 1868).',
    },
    relatedExhibitIds: ['the-odyssey', 'school-of-athens'],
  },
  {
    id: 'school-of-athens',
    title: 'The School of Athens',
    subtitle: 'Scuola di Atene',
    category: 'paintings',
    categoryLabel: 'Paintings & Visual Art',
    creator: 'Raphael',
    creatorRole: 'High Renaissance Painter',
    date: '1509–1511',
    period: 'Italian High Renaissance',
    location: 'Apostolic Palace, Vatican City',
    mediumOrMaterial: 'Buon fresco',
    dimensions: '500 cm × 770 cm',
    featured: false,
    hallNumber: 'Gallery I · 18',
    curatedCollectionIds: ['masterpieces-changed-art'],
    tagline:
      'Every great philosopher, mathematician and scientist of classical antiquity gathered beneath one Renaissance vault.',
    introduction:
      'Painted in Pope Julius II’s library when Raphael was just twenty-six, The School of Athens unites Plato, Aristotle, Socrates, Euclid and Pythagoras in a single sun-drenched basilica of reason.',
    story: {
      heading: 'Renaissance Masters Disguised as Ancient Philosophers',
      paragraphs: [
        'Raphael gave the ancient philosophers the faces of his contemporaries: Plato has the likeness of Leonardo da Vinci, while brooding Heraclitus on the front steps is a portrait of Michelangelo.',
      ],
    },
    lookCloser: [
      {
        id: 'plato-aristotle',
        title: 'Plato & Aristotle at the Vanishing Point',
        tag: 'Philosophy',
        description:
          'Plato points upward to eternal Ideas while Aristotle gestures horizontally toward empirical observation of the earth.',
        x: 50,
        y: 48,
      },
    ],
    meaning: {
      heading: 'The Visual Manifesto of Humanism',
      paragraphs: [
        'A visual symphony where art, science and philosophy converse as equals across time.',
      ],
      keyTakeaway:
        'Rational inquiry and artistic beauty are twin paths to human truth.',
    },
    didYouKnow: [
      'Tucked into the far right edge looking directly out at the viewer is Raphael’s own self-portrait in a dark beret.',
    ],
    images: {
      main: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/960px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      aspectRatio: 'landscape',
    },
    atmosphere: {
      name: 'Vatican Fresco & Travertine Gold',
      bgPrimary: '#110E0B',
      bgSecondary: '#1B1612',
      accent: '#D8B377',
      ambientGradient:
        'radial-gradient(circle at 50% 35%, rgba(216, 179, 119, 0.25) 0%, rgba(158, 108, 72, 0.10) 45%, rgba(17, 14, 11, 0.99) 78%)',
      borderSubtle: 'rgba(216, 179, 119, 0.17)',
    },
    source: {
      provider: 'Musei Vaticani',
      url: 'https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      license: 'Public Domain',
      accessionNumber: 'Stanza della Segnatura',
      attribution: 'Apostolic Palace, Vatican City.',
    },
    relatedExhibitIds: ['creation-of-adam', 'mona-lisa'],
  },
];

export function getExhibitById(id: string): Exhibit | undefined {
  return EXHIBITS.find((e) => e.id === id);
}

export function getFeaturedExhibit(): Exhibit {
  return EXHIBITS.find((e) => e.featured) || EXHIBITS[0];
}

export function getTopIconicExhibits(limit = 8): Exhibit[] {
  const featured = EXHIBITS.filter((e) => e.featured);
  return featured.slice(0, limit);
}

export function getRelatedExhibits(exhibit: Exhibit): Exhibit[] {
  return exhibit.relatedExhibitIds
    .map((id) => getExhibitById(id))
    .filter((item): item is Exhibit => Boolean(item));
}
