
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

export const festivals: Festival[] = [
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
    }
];
