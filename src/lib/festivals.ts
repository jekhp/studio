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
  location?: string; // Kept for simplicity with single-location festivals, but locations array is preferred
  province?: string; // Kept for simplicity
  coords?: [number, number]; // Kept for simplicity
  locations?: FestivalLocation[]; // New array for multiple locations
  image: string;
  rating: number;
  reviews: Review[];
  interest: number;
  isFree: boolean;
  categories: string[];
  traditionKeys?: string[];
  scheduleKeys?: { 
    dayKey: string; 
    eventKeys: { timeKey: string; descriptionKey: string }[] 
  }[];
};


const currentYear = new Date().getFullYear();

const festivalsData: Festival[] = [
    {
      id: 'inti-raymi',
      slug: 'inti-raymi',
      name: 'Inti Raymi',
      date: { start: new Date(currentYear, 5, 24), end: new Date(currentYear, 5, 24) },
      locations: [
        { name: 'Qorikancha, Cusco', province: 'Cusco', coords: [-13.520, -71.976] },
        { name: 'Plaza de Armas, Cusco', province: 'Cusco', coords: [-13.5165, -71.979] },
        { name: 'Sacsayhuamán, Cusco', province: 'Cusco', coords: [-13.507, -71.982] },
      ],
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
      date: { start: new Date(currentYear, 4, 30), end: new Date(currentYear, 5, 6) }, // Corpus is a movable feast, this is an approximation
      locations: [
        { name: 'Plaza de Armas, Cusco', province: 'Cusco', coords: [-13.5165, -71.979] },
        { name: 'Parroquia de San Pedro', province: 'Cusco', coords: [-13.519, -71.984] },
        { name: 'Parroquia de San Blas', province: 'Cusco', coords: [-13.514, -71.974] },
      ],
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
      id: 'qoyllur-riti',
      slug: 'qoyllur-riti',
      name: 'Qoyllur Rit\'i',
      date: { start: new Date(currentYear, 4, 29), end: new Date(currentYear, 5, 2) },
      locations: [{ name: 'Sinakara Valley, Ocongate', province: 'Quispicanchi', coords: [-13.63, -71.23] }],
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
    {
      id: 'paucartambo-virgen-del-carmen',
      slug: 'paucartambo-virgen-del-carmen',
      name: 'Paucartambo - Virgen del Carmen',
      date: { start: new Date(currentYear, 6, 15), end: new Date(currentYear, 6, 18) },
      locations: [{ name: 'Paucartambo', province: 'Paucartambo', coords: [-13.31, -71.59] }],
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
    {
      id: 'dia-de-compadres',
      slug: 'dia-de-compadres',
      name: 'Día de los Compadres',
      date: { start: new Date(currentYear, 1, 1), end: new Date(currentYear, 1, 1) }, // Example date, Thursday 2 weeks before Carnival
      locations: [
        { name: 'Mercado de San Pedro, Cusco', province: 'Cusco', coords: [-13.518, -71.983] },
        { name: 'Mercado de San Blas, Cusco', province: 'Cusco', coords: [-13.515, -71.973] },
        { name: 'Various towns', province: 'Cusco', coords: [-13.517, -71.978] },
      ],
      image: 'compadres',
      rating: 4.5,
      reviews: [],
      interest: 0.8,
      isFree: true,
      categories: ['carnaval', 'tradicional', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: 'dia-de-comadres',
      slug: 'dia-de-comadres',
      name: 'Día de las Comadres',
      date: { start: new Date(currentYear, 1, 8), end: new Date(currentYear, 1, 8) }, // Example date, Thursday 1 week before Carnival
      locations: [
        { name: 'Mercado de San Pedro, Cusco', province: 'Cusco', coords: [-13.518, -71.983] },
        { name: 'Mercado de San Blas, Cusco', province: 'Cusco', coords: [-13.515, -71.973] },
        { name: 'Various towns', province: 'Cusco', coords: [-13.517, -71.978] },
      ],
      image: 'comadres',
      rating: 4.5,
      reviews: [],
      interest: 0.8,
      isFree: true,
      categories: ['carnaval', 'tradicional', 'popular'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: 'semana-santa',
      slug: 'semana-santa',
      name: 'Semana Santa',
      date: { start: new Date(currentYear, 3, 24), end: new Date(currentYear, 3, 31) }, // Example date for Easter week
      locations: [
        { name: 'Cusco Cathedral', province: 'Cusco', coords: [-13.516, -71.978] },
        { name: 'Plaza de Armas, Cusco', province: 'Cusco', coords: [-13.5165, -71.979] },
        { name: 'Churches across the region', province: 'Cusco', coords: [-13.52, -71.98] },
      ],
      image: 'semana-santa',
      rating: 4.8,
      reviews: [],
      interest: 1.5,
      isFree: true,
      categories: ['religioso', 'procesion', 'tradicional', 'gastronomico'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3", "tradition_4"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }, { dayKey: 'day_2', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: 'navidad-cusquena',
      slug: 'navidad-cusquena',
      name: 'Navidad Cusqueña (Santurantikuy)',
      date: { start: new Date(currentYear, 11, 24), end: new Date(currentYear, 11, 24) },
      locations: [{ name: 'Plaza de Armas, Cusco', province: 'Cusco', coords: [-13.5165, -71.979] }],
      image: 'santurantikuy',
      rating: 4.9,
      reviews: [],
      interest: 1.9,
      isFree: true,
      categories: ['feria', 'artesania', 'religioso', 'tradicional'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }] }],
    },
    {
      id: 'ano-nuevo',
      slug: 'ano-nuevo',
      name: 'Año Nuevo en Cusco',
      date: { start: new Date(currentYear, 11, 31), end: new Date(currentYear, 11, 31) },
      locations: [
        { name: 'Plaza de Armas, Cusco', province: 'Cusco', coords: [-13.5165, -71.979] },
      ],
      image: 'ano-nuevo',
      rating: 4.7,
      reviews: [],
      interest: 1.7,
      isFree: true,
      categories: ['fiesta', 'popular', 'espectaculo'],
      traditionKeys: ["tradition_1", "tradition_2", "tradition_3"],
      scheduleKeys: [{ dayKey: 'day_1', eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }, { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' }] }],
    },
    {
      id: 'qeswachaka-bridge-festival',
      slug: 'qeswachaka-bridge-festival',
      name: 'Q\'eswachaka Bridge Festival',
      date: { start: new Date(currentYear, 5, 8), end: new Date(currentYear, 5, 11) },
      locations: [{ name: 'Quehue, Canas', province: 'Canas', coords: [-14.364, -71.503] }],
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


const festivalsByProvince: Record<string, Omit<Festival, 'province'>[]> = {
    // This structure can be deprecated or adapted if we move fully to the flat list with locations array
};

// This flattens the grouped data into a single array, which is what the components currently expect.
// The new `province` property is added to each festival object.
export const festivals: Festival[] = festivalsData.map(f => {
    // To ensure backward compatibility with old data structure if needed
    if (!f.locations && f.location && f.province && f.coords) {
        f.locations = [{ name: f.location, province: f.province, coords: f.coords }];
    }
    return f;
});
