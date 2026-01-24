
export type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
};

export type FestivalLocation = {
  name: string;
  province: string;
  coords: [number, number];
};

export type FestivalMedia = {
  type: 'image' | 'video';
  url?: string;
  embedCode?: string;
  thumbnail?: string;
  alt: string;
}

export type Festival = {
  id: string;
  slug: string;
  name: string;
  date: { start: Date; end: Date };
  location: string;
  province: string;
  coords: [number, number];
  image: string;
  isFree: boolean;
  categories: string[];
  isRegional?: boolean;
  traditionKeys?: string[];
  scheduleKeys?: { 
    dayKey: string; 
    eventKeys: { timeKey: string; descriptionKey: string }[] 
  }[];
  media?: FestivalMedia[];
};


const currentYear = new Date().getFullYear();
const now = new Date();

// Helper function to adjust dates for upcoming year
const getFestivalDate = (startMonth: number, startDay: number, endMonth: number, endDay: number) => {
  let festivalYear = currentYear;
  const festivalStartDate = new Date(festivalYear, startMonth, startDay);
  const festivalEndDate = new Date(festivalYear, endMonth, endDay);
  
  if (festivalEndDate < now && festivalStartDate.getMonth() !== startMonth) {
      festivalYear++;
  } else if (festivalEndDate < now) {
      const specificFestivalDate = new Date(currentYear, startMonth, startDay);
      if (specificFestivalDate < now) {
        festivalYear++;
      }
  }


  return {
    start: new Date(festivalYear, startMonth, startDay),
    end: new Date(festivalYear, endMonth, endDay),
  };
};

// ==============================================
// FESTIVALS BY PROVINCE
// ==============================================

// 1. Cusco
const cuscoFestivals: Festival[] = [
  {
    id: 'inti-raymi',
    slug: 'inti-raymi',
    name: 'Inti Raymi',
    date: getFestivalDate(5, 24, 5, 24),
    location: 'Sacsayhuamán, Cusco',
    province: 'Cusco',
    coords: [-13.507, -71.982],
    image: 'inti-raymi',
    isFree: false,
    categories: ['andino', 'historico', 'danza', 'espectaculo'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }, { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }],
    media: [
      { type: 'video', embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/5gP82hB1a9I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>', alt: 'Official broadcast of Inti Raymi 2023', thumbnail: 'https://i.ytimg.com/vi/5gP82hB1a9I/hqdefault.jpg' },
      { type: 'image', url: '/festivals/intiRaymi.jpg', alt: 'Actor representing the Sapa Inca during Inti Raymi' },
    ],
  },
  {
    id: 'corpus-christi',
    slug: 'corpus-christi',
    name: 'Corpus Christi Cusqueño',
    date: getFestivalDate(4, 30, 5, 6),
    location: 'Cusco',
    province: 'Cusco',
    coords: [-13.516, -71.979],
    image: 'corpus-christi',
    isFree: true,
    categories: ['religioso', 'procesion', 'gastronomico', 'tradicional'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'huancaro-fair',
    slug: 'feria-huancaro',
    name: 'Feria de Huancaro',
    date: getFestivalDate(5, 20, 5, 30),
    location: 'Huancaro, Cusco',
    province: 'Cusco',
    coords: [-13.535, -71.992],
    image: 'huancaro-fair',
    isFree: false,
    categories: ['feria', 'conciertos', 'artesania', 'gastronomico'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'wata-qallariy',
    slug: 'wata-qallariy',
    name: 'Wata Qallariy',
    date: getFestivalDate(7, 1, 7, 1),
    location: 'Comunidades Andinas',
    province: 'Cusco',
    coords: [-13.5, -72.0],
    image: 'wata-qallary',
    isFree: true,
    categories: ['andino', 'espiritual', 'tradicional'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'fiesta-de-san-sebastian',
    slug: 'fiesta-de-san-sebastian',
    name: 'Fiesta de San Sebastián',
    date: getFestivalDate(0, 18, 0, 20),
    location: 'San Sebastián, Cusco',
    province: 'Cusco',
    coords: [-13.533, -71.944],
    image: 'san-sebastian-festival',
    isFree: true,
    categories: ['religioso', 'procesion', 'danza', 'popular'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'navidad-cusquena-santurantikuy',
    slug: 'navidad-cusquena-santurantikuy',
    name: 'Navidad Cusqueña y Santurantikuy',
    date: getFestivalDate(11, 24, 11, 24),
    location: 'Plaza de Armas, Cusco',
    province: 'Cusco',
    coords: [-13.5167, -71.9788],
    image: 'santurantikuy-market',
    isFree: true,
    categories: ['artesania', 'feria', 'religioso', 'tradicional'],
    isRegional: true,
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'noche-vieja',
    slug: 'noche-vieja',
    name: 'Noche Vieja en Cusco',
    date: getFestivalDate(11, 31, 11, 31),
    location: 'Plaza de Armas, Cusco',
    province: 'Cusco',
    coords: [-13.5167, -71.9788],
    image: 'noche-vieja-cusco',
    isFree: true,
    categories: ['popular', 'espectaculo', 'tradicional'],
    isRegional: true,
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }]
  },
  {
    id: 'ano-nuevo',
    slug: 'ano-nuevo',
    name: 'Año Nuevo en Cusco',
    date: getFestivalDate(0, 1, 0, 1),
    location: 'Cusco',
    province: 'Cusco',
    coords: [-13.5167, -71.9788],
    image: 'ano-nuevo-cusco',
    isFree: true,
    categories: ['popular', 'tradicional', 'espiritual'],
    isRegional: true,
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }]
  },
  {
    id: 'festividad-santaCecilia',
    slug: 'festividad-santaCecilia',
    name: 'Festividad de Santa Cecilia (Patrona de los Músicos)',
    date: getFestivalDate(10, 22, 10, 22),
    location: 'Templo de la Almudena, Cusco',
    province: 'Cusco',
    coords: [-13.5235, -71.9840], 
    image: 'santa-cecilia-musicos',
    isFree: true,
    categories: ['religioso', 'tradicional'],
    isRegional: true,
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },{ dayKey: 'day_2', eventKeys: [{ timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },{ timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }]
  }
];

// 2. Acomayo
const acomayoFestivals: Festival[] = [
];

// 3. Anta
const antaFestivals: Festival[] = [
];

// 4. Calca
const calcaFestivals: Festival[] = [
    {
      id: 'senor-de-huanca',
      slug: 'senor-de-huanca',
      name: 'Señor de Huanca',
      date: getFestivalDate(8, 14, 8, 14),
      location: 'Santuario de Huanca, Calca',
      province: 'Calca',
      coords: [-13.41, -71.85],
      image: 'senor-de-huanca',
      isFree: true,
      categories: ['religioso', 'peregrinacion', 'espiritual'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    }
];

// 5. Canas
const canasFestivals: Festival[] = [
    {
      id: 'qeswachaka-bridge-festival',
      slug: 'qeswachaka-bridge-festival',
      name: 'Festival del Puente Q\'eswachaka',
      date: getFestivalDate(5, 9, 5, 12),
      location: 'Quehue, Canas',
      province: 'Canas',
      coords: [-14.37, -71.49],
      image: 'qeswachaka-bridge',
      isFree: true,
      categories: ['andino', 'tradicional', 'artesania'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4", "tradition_5"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }, { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }],
    }
];

// 6. Canchis
const canchisFestivals: Festival[] = [
    {
      id: 'carnaval-de-tinta',
      slug: 'carnaval-de-tinta',
      name: 'Carnaval de Tinta',
      date: getFestivalDate(1, 11, 1, 11),
      location: 'Tinta, Canchis',
      province: 'Canchis',
      coords: [-14.148, -71.408],
      image: 'tinta-carnival',
      isFree: true,
      categories: ['carnaval', 'danza', 'tradicional'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    }
];

// 7. Chumbivilcas
const chumbivilcasFestivals: Festival[] = [
    {
      id: 'takanakuy-chumbivilcas',
      slug: 'takanakuy-chumbivilcas',
      name: 'Takanakuy',
      date: getFestivalDate(11, 25, 11, 25),
      location: 'Santo Tomás, Chumbivilcas',
      province: 'Chumbivilcas',
      coords: [-14.45, -72.08],
      image: 'takanakuy-fight',
      isFree: true,
      categories: ['combate-ritual', 'tradicional', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
      media: [
        { type: 'video', embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zbArfBw2Pa8?si=duOBlSXun6_BMS5J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', alt: 'Takanakuy fighting festival in Chumbivilcas', thumbnail: 'https://i.ytimg.com/vi/zbArfBw2Pa8/hqdefault.jpg' },
      ],
    },
    {
      id: 'chumbivilcas-horses',
      slug: 'chumbivilcas-horses',
      name: 'Carreras de Caballos de Chumbivilcas',
      date: getFestivalDate(5, 10, 5, 11),
      location: 'Santo Tomás, Chumbivilcas',
      province: 'Chumbivilcas',
      coords: [-14.452, -72.082],
      image: 'chumbivilcas-horses',
      isFree: true,
      categories: ['carreras', 'tradicional'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },{ dayKey: 'day_2', eventKeys: [{ timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }],
    }
];

// 8. Espinar
const espinarFestivals: Festival[] = [
    {
      id: 'uywa-chaka-y-chinu',
      slug: 'uywa-chaka-y-chinu',
      name: 'Uywa Ch\'aka y Ch\'inu',
      date: getFestivalDate(7, 24, 7, 24),
      location: 'Comunidades de Espinar',
      province: 'Espinar',
      coords: [-14.78, -71.41],
      image: 'espinar-harvest',
      isFree: true,
      categories: ['agricola', 'andino', 'tradicional'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: 'carnaval-pichigua',
      slug: 'carnaval-pichigua',
      name: "Festival Carnavalesco de Pichigua",
      date: getFestivalDate(1, 4, 1, 4),
      location: 'Pichigua, Espinar',
      province: 'Espinar',
      coords: [-14.65, -71.55],
      image: 'pichigua-carnival',
      isFree: true,
      categories: ['carnaval', 'danza', 'tradicional', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    }
];

// 9. La Convención
const laConvencionFestivals: Festival[] = [
    {
      id: 'quillabamba-anniversary',
      slug: 'aniversario-de-quillabamba',
      name: 'Aniversario de Quillabamba',
      date: getFestivalDate(6, 25, 6, 29),
      location: 'Quillabamba, La Convención',
      province: 'La Convención',
      coords: [-12.86, -72.69],
      image: 'quillabamba-anniversary',
      isFree: true,
      categories: ['conciertos', 'feria', 'popular', 'moderno'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    }
];

// 10. Paruro
const paruroFestivals: Festival[] = [
    {
      id: 'Virgen-Natividad-Paruro',
      slug: 'Virgen-Natividad-Paruro',
      name: 'Virgen de Natividad en Paruro',
      date: getFestivalDate(8, 7, 8, 9),
      location: 'Paruro',
      province: 'Paruro',
      coords: [-13.76, -71.85],
      image: 'Virgen-Natividad-Paruro-img',
      isFree: true,
      categories: ['taurino', 'religioso', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },{ dayKey: 'day_2', eventKeys: [{ timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }],
    }
];

// 11. Paucartambo
const paucartamboFestivals: Festival[] = [
    {
      id: 'paucartambo-virgen-del-carmen',
      slug: 'paucartambo-virgen-del-carmen',
      name: 'Fiesta de la Virgen del Carmen de Paucartambo',
      date: getFestivalDate(6, 15, 6, 19),
      location: 'Paucartambo',
      province: 'Paucartambo',
      coords: [-13.31, -71.59],
      image: 'paucartambo',
      isFree: true,
      categories: ['religioso', 'danza', 'tradicional', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [
        { dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, 
        { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] },
        { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }
      ],
      media: [
        { type: 'video', embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/0tlv3hjVB9Q?si=GTa-eMn5ZKhrh33A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', alt: 'Virgen del Carmen festival in Paucartambo', thumbnail: 'https://i.ytimg.com/vi/0tlv3hjVB9Q/hqdefault.jpg' },
        { type: 'image', url: '/festivals/virgendelcarmenpaucartambo.jpg', alt: 'Dancers in colorful masks at Paucartambo' },
      ],
    },
    {
      id: 'carnaval-colquepata',
      slug: 'carnaval-colquepata',
      name: 'Carnaval de Colquepata (Tinkuy Muruwiqsa)',
      date: getFestivalDate(1, 5, 1, 18),
      location: 'Colquepata',
      province: 'Paucartambo',
      coords: [-13.25, -71.53],
      image: 'colquepata-carnival',
      isFree: true,
      categories: ['carnaval', 'danza', 'combate-ritual', 'tradicional', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [
        { dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },
        { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },
        { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },
        { dayKey: 'day_4', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },
        { dayKey: 'day_5', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }
      ],
    }
];

// 12. Quispicanchi
const quispicanchiFestivals: Festival[] = [
    {
      id: 'qoyllur-riti',
      slug: 'qoyllur-riti',
      name: 'Qoyllur Rit\'i',
      date: getFestivalDate(4, 26, 4, 30),
      location: 'Santuario de Sinakara, Ocongate',
      province: 'Quispicanchi',
      coords: [-13.62, -71.4],
      image: 'qoyllur-riti',
      isFree: true,
      categories: ['peregrinacion', 'andino', 'danza', 'espiritual'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [
        { dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }, 
        { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] },
        { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }
      ],
    }
];

// 13. Urubamba
const urubambaFestivals: Festival[] = [
  {
    id: 'juramentacion-varayoc-chinchero',
    slug: 'juramentacion-varayoc-chinchero',
    name: 'Juramentación de los Varayoc en Chinchero',
    date: getFestivalDate(0, 1, 0, 1),
    location: 'Chinchero',
    province: 'Urubamba',
    coords: [-13.391, -72.049],
    image: 'varayoc_chinchero',
    isFree: true,
    categories: ['andino', 'tradicional', 'popular'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }],
  },
  {
    id: 'ollantaytambo-reyes',
    slug: 'ollantaytambo-reyes',
    name: 'Bajada de Reyes en Ollantaytambo',
    date: getFestivalDate(0, 6, 0, 6),
    location: 'Ollantaytambo',
    province: 'Urubamba',
    coords: [-13.26, -72.26],
    image: 'ollantaytambo-bajadaReyes',
    isFree: true,
    categories: ['religioso', 'procesion', 'tradicional'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  },
  {
    id: 'linderaje-chinchero',
    slug: 'linderaje-chinchero',
    name: 'Linderaje en Chinchero',
    date: getFestivalDate(1, 14, 1, 14),
    location: 'Chinchero',
    province: 'Urubamba',
    coords: [-13.39, -72.05],
    image: 'linderaje-chinchero',
    isFree: true,
    categories: ['combate-ritual', 'tradicional', 'popular'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    media: [
      { type: 'video', embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/hnubCYi37kw?si=VkTb3DI0TNnYRX8N" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', alt: 'Linderaje ritual fight in Chinchero', thumbnail: 'https://i.ytimg.com/vi/hnubCYi37kw/hqdefault.jpg' },
      { type: 'image', url: '/festivals/linderaje-chinchero.jpg', alt: 'Community members facing off during Linderaje' }
    ]
  },
  {
    id: 'corpus-chinchero',
    slug: 'corpus-chinchero',
    name: 'Corpus Christi de Chinchero',
    date: getFestivalDate(4, 30, 4, 30),
    location: 'Chinchero',
    province: 'Urubamba',
    coords: [-13.391, -72.049],
    image: 'corpus-chinchero',
    isFree: true,
    categories: ['religioso', 'procesion', 'popular'],
    traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
    scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
  }
];

export const festivals: Festival[] = [
  ...cuscoFestivals,
  ...acomayoFestivals,
  ...antaFestivals,
  ...calcaFestivals,
  ...canasFestivals,
  ...canchisFestivals,
  ...chumbivilcasFestivals,
  ...espinarFestivals,
  ...laConvencionFestivals,
  ...paruroFestivals,
  ...paucartamboFestivals,
  ...quispicanchiFestivals,
  ...urubambaFestivals,
];



