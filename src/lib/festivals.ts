
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

export type Festival = {
  id: string;
  slug: string;
  name: string;
  date: { start: Date; end: Date };
  location: string;
  province: string;
  coords: [number, number];
  image: string;
  rating: number;
  reviews: Review[];
  interest: number;
  isFree: boolean;
  categories: string[];
  isRegional?: boolean;
  traditionKeys?: string[];
  scheduleKeys?: { 
    dayKey: string; 
    eventKeys: { timeKey: string; descriptionKey: string }[] 
  }[];
};


const currentYear = new Date().getFullYear();

// ==============================================
// FESTIVALS BY PROVINCE
// ==============================================

// 1. Cusco
const cuscoFestivals: Festival[] = [
    {
      id: 'inti-raymi',
      slug: 'inti-raymi',
      name: 'Inti Raymi',
      date: { start: new Date(currentYear, 5, 24), end: new Date(currentYear, 5, 24) },
      location: 'Sacsayhuamán, Cusco',
      province: 'Cusco',
      coords: [-13.507, -71.982],
      image: 'inti-raymi',
      rating: 4.9,
      reviews: [
        { id: '1', user: 'TravelerJane', rating: 5, comment: 'Absolutely breathtaking! The scale and colors are something you have to see to believe.' },
        { id: '2', user: 'HistoryBuff_88', rating: 5, comment: 'A fantastic representation of Inca culture. Very well organized.' },
      ],
      interest: 2.1,
      isFree: false,
      categories: ['andino', 'historico', 'danza', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }, { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }],
    },
    {
      id: 'corpus-christi',
      slug: 'corpus-christi',
      name: 'Corpus Christi',
      date: { start: new Date(currentYear, 4, 30), end: new Date(currentYear, 5, 6) },
      location: 'Plaza de Armas, Cusco',
      province: 'Cusco',
      coords: [-13.5165, -71.979],
      image: 'corpus-christi',
      rating: 4.7,
      reviews: [
        { id: '1', user: 'CultureVulture', rating: 5, comment: 'The pageantry is incredible. Seeing all the saints together in the plaza is a powerful sight.' },
        { id: '2', user: 'FoodieGavin', rating: 4, comment: 'Came for the parade, stayed for the Chiriuchu. It\'s a wild combination of flavors but you have to try it!' },
      ],
      interest: 1.2,
      isFree: true,
      categories: ['religioso', 'gastronomico', 'tradicional', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: "feria-huancaro",
      slug: "feria-huancaro",
      name: "Feria de Huancaro",
      date: { start: new Date(currentYear, 5, 20), end: new Date(currentYear, 5, 30) },
      location: "Huancaro, Cusco",
      province: "Cusco",
      coords: [-13.530, -71.993],
      image: "huancaro-fair",
      rating: 4.4,
      reviews: [],
      interest: 1.1,
      isFree: false,
      categories: ["feria", "agricola", "gastronomico", "artesania", "conciertos"]
    },
    {
      id: "fiesta-de-san-sebastian",
      slug: "fiesta-de-san-sebastian",
      name: "Fiesta de San Sebastián",
      date: { start: new Date(currentYear, 0, 20), end: new Date(currentYear, 0, 20) },
      location: "San Sebastián",
      province: "Cusco",
      coords: [-13.535, -71.937],
      image: "san-sebastian-festival",
      rating: 4.5,
      reviews: [],
      interest: 0.8,
      isFree: true,
      categories: ["religioso", "procesion", "danza"]
    },
    {
      id: "navidad-cusquena-santurantikuy",
      slug: "navidad-cusquena-santurantikuy",
      name: "Navidad Cusqueña (Santurantikuy)",
      date: { start: new Date(currentYear, 11, 24), end: new Date(currentYear, 11, 25) },
      location: "Plaza de Armas, Cusco",
      province: "Cusco",
      coords: [-13.5165, -71.979],
      image: "santurantikuy-market",
      rating: 4.9,
      reviews: [],
      interest: 2.5,
      isFree: true,
      categories: ["feria", "artesania", "religioso", "tradicional"],
      isRegional: true,
    }
];

// 2. Acomayo
const acomayoFestivals: Festival[] = [
    {
      id: "carnaval-de-mollomarka",
      slug: "carnaval-de-mollomarka",
      name: "Carnaval de Mollomarka",
      date: { start: new Date(currentYear, 1, 25), end: new Date(currentYear, 1, 25) },
      location: "Mollomarka, Acomayo",
      province: "Acomayo",
      coords: [-13.91, -71.68],
      image: "mollomarka-carnival",
      rating: 4.7,
      reviews: [],
      interest: 0.5,
      isFree: true,
      categories: ["carnaval", "andino", "danza"]
    },
];

// 3. Calca
const calcaFestivals: Festival[] = [
    {
      id: "senor-de-huanca",
      slug: "senor-de-huanca",
      name: "Señor de Huanca",
      date: { start: new Date(currentYear, 8, 14), end: new Date(currentYear, 8, 14) },
      location: "Santuario de Huanca, San Salvador",
      province: "Calca",
      coords: [-13.504, -71.745],
      image: "senor-de-huanca",
      rating: 4.9,
      reviews: [],
      interest: 1.4,
      isFree: true,
      categories: ["religioso", "peregrinacion", "andino"]
    },
];

// 4. Canas
const canasFestivals: Festival[] = [
    {
      id: 'qeswachaka-bridge-festival',
      slug: 'qeswachaka-bridge-festival',
      name: 'Q\'eswachaka Bridge Festival',
      date: { start: new Date(currentYear, 5, 8), end: new Date(currentYear, 5, 11) },
      location: 'Quehue, Canas',
      province: 'Canas',
      coords: [-14.364, -71.503],
      image: 'qeswachaka-bridge',
      rating: 4.9,
      reviews: [
        { id: '1', user: 'Engineer_Mike', rating: 5, comment: 'An incredible feat of engineering and community spirit. Truly one of a kind.' },
      ],
      interest: 1.9,
      isFree: false,
      categories: ['andino', 'tradicional', 'historico', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4", "tradition_5"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }, { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' }] }],
    },
];

// 5. Canchis
const canchisFestivals: Festival[] = [
    {
      id: "carnaval-de-tinta",
      slug: "carnaval-de-tinta",
      name: "Carnaval de Tinta",
      date: { start: new Date(currentYear, 1, 10), end: new Date(currentYear, 1, 14) },
      location: "Tinta",
      province: "Canchis",
      coords: [-14.148, -71.408],
      image: "tinta-carnival",
      rating: 4.5,
      reviews: [],
      interest: 0.6,
      isFree: true,
      categories: ["carnaval", "danza", "tradicional"]
    },
];

// 6. Chumbivilcas
const chumbivilcasFestivals: Festival[] = [
    {
      id: "takanakuy-chumbivilcas",
      slug: "takanakuy-chumbivilcas",
      name: "Takanakuy en Chumbivilcas",
      date: { start: new Date(currentYear, 11, 25), end: new Date(currentYear, 11, 25) },
      location: "Santo Tomás",
      province: "Chumbivilcas",
      coords: [-14.45, -72.08],
      image: "takanakuy-fight",
      rating: 4.6,
      reviews: [],
      interest: 1.0,
      isFree: true,
      categories: ["combate-ritual", "tradicional", "danza"]
    },
];

// 7. Espinar
const espinarFestivals: Festival[] = [
    {
      id: "uywa-chaka-y-chinu",
      slug: "uywa-chaka-y-chinu",
      name: "Uywa Ch'aka y Ch'inu",
      date: { start: new Date(currentYear, 7, 24), end: new Date(currentYear, 7, 24) },
      location: "Comunidades de Espinar",
      province: "Espinar",
      coords: [-14.79, -71.41],
      image: "espinar-harvest",
      rating: 4.5,
      reviews: [],
      interest: 0.4,
      isFree: true,
      categories: ["andino", "agricola", "tradicional"]
    },
];

// 8. La Convención
const laConvencionFestivals: Festival[] = [
    {
      id: "aniversario-de-quillabamba",
      slug: "aniversario-de-quillabamba",
      name: "Aniversario de Quillabamba",
      date: { start: new Date(currentYear, 6, 25), end: new Date(currentYear, 6, 29) },
      location: "Quillabamba",
      province: "La Convención",
      coords: [-12.864, -72.693],
      image: "quillabamba-anniversary",
      rating: 4.6,
      reviews: [],
      interest: 0.9,
      isFree: true,
      categories: ["feria", "conciertos", "popular"]
    },
];

// 9. Paucartambo
const paucartamboFestivals: Festival[] = [
    {
      id: 'paucartambo-virgen-del-carmen',
      slug: 'paucartambo-virgen-del-carmen',
      name: 'Paucartambo - Virgen del Carmen',
      date: { start: new Date(currentYear, 6, 15), end: new Date(currentYear, 6, 18) },
      location: 'Paucartambo',
      province: 'Paucartambo',
      coords: [-13.31, -71.59],
      image: 'paucartambo',
      rating: 4.9,
      reviews: [
        { id: '1', user: 'FiestaFinder', rating: 5, comment: 'Incredible party! The costumes of the Saqra dancers are amazing and a little terrifying. Loved every minute.' },
        { id: '2', user: 'PhotoNomad', rating: 5, comment: 'A photographer\'s dream. So much color and action. The town has a magical atmosphere during the festival.' },
      ],
      interest: 1.5,
      isFree: true,
      categories: ['religioso', 'danza', 'tradicional', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }, { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
];

// 10. Quispicanchi
const quispicanchiFestivals: Festival[] = [
    {
      id: 'qoyllur-riti',
      slug: 'qoyllur-riti',
      name: 'Qoyllur Rit\'i',
      date: { start: new Date(currentYear, 4, 29), end: new Date(currentYear, 5, 2) },
      location: 'Sinakara Valley, Ocongate',
      province: 'Quispicanchi',
      coords: [-13.63, -71.23],
      image: 'qoyllur-riti',
      rating: 4.8,
      reviews: [
        { id: '1', user: 'AdventurousSoul', rating: 5, comment: 'A truly profound and spiritual experience. The energy is incredible, but be prepared for the cold and altitude.' },
        { id: '2', user: 'CulturalExplorer', rating: 4, comment: 'Fascinating to see the blend of beliefs. It\'s not for the faint of heart, but it\'s very authentic.' },
      ],
      interest: 1.8,
      isFree: true,
      categories: ['andino', 'religioso', 'peregrinacion', 'aventura'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }, { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }, { dayKey: 'day_3', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }],
    },
];

// 11. Urubamba
const urubambaFestivals: Festival[] = [
    {
      id: "linderaje-chinchero",
      slug: "linderaje-chinchero",
      name: "Linderaje en Chinchero",
      date: { start: new Date(currentYear, 0, 1), end: new Date(currentYear, 0, 1) },
      location: "Chinchero",
      province: "Urubamba",
      coords: [-13.391, -72.046],
      image: "linderaje-chinchero",
      rating: 4.6,
      reviews: [],
      interest: 0.7,
      isFree: true,
      categories: ["combate-ritual", "tradicional", "andino"],
    },
    {
      id: "ollantaytambo-reyes",
      slug: "ollantaytambo-reyes",
      name: "Bajada de Reyes en Ollantaytambo",
      date: { start: new Date(currentYear, 0, 6), end: new Date(currentYear, 0, 6) },
      location: "Ollantaytambo",
      province: "Urubamba",
      coords: [-13.257, -72.263],
      image: "ollantaytambo-bajadaReyes",
      rating: 4.7,
      reviews: [],
      interest: 0.9,
      isFree: true,
      categories: ["religioso", "procesion", "danza"]
    },
];

// 12. Multi-province / Regional
const regionalFestivals: Festival[] = [
    {
      id: "wata-qallariy",
      slug: "wata-qallariy",
      name: "Wata Qallariy",
      date: { start: new Date(currentYear, 7, 1), end: new Date(currentYear, 7, 1) },
      location: "Comunidades Andinas",
      province: "Varias",
      coords: [-13.5, -72.0],
      image: "wata-qallary",
      rating: 4.8,
      reviews: [],
      interest: 1.3,
      isFree: true,
      categories: ["andino", "tradicional", "espiritual"]
    },
];


// ==============================================
// MAIN EXPORTED ARRAY
// ==============================================
export const festivals: Festival[] = [
    ...cuscoFestivals,
    ...acomayoFestivals,
    ...calcaFestivals,
    ...canasFestivals,
    ...canchisFestivals,
    ...chumbivilcasFestivals,
    ...espinarFestivals,
    ...laConvencionFestivals,
    ...paucartamboFestivals,
    ...quispicanchiFestivals,
    ...urubambaFestivals,
    ...regionalFestivals,
];
