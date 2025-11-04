export type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
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
  traditionKeys: string[];
  scheduleKeys: { 
    dayKey: string; 
    eventKeys: { timeKey: string; descriptionKey: string }[] 
  }[];
};

const festivalsByProvince: Record<string, Omit<Festival, 'province'>[]> = {
  Cusco: [
    {
      id: 'inti-raymi',
      slug: 'inti-raymi',
      name: 'Inti Raymi',
      date: { start: new Date(new Date().getFullYear(), 5, 24), end: new Date(new Date().getFullYear(), 5, 24) },
      location: 'Sacsayhuamán, Cusco',
      coords: [-13.507, -71.982],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
            { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' },
          ],
        },
      ],
      image: 'inti-raymi',
      rating: 4.9,
      reviews: [
        { id: 1, user: 'TravelerJane', rating: 5, comment: 'Absolutely breathtaking! The scale and colors are something you have to see to believe.' },
        { id: 2, user: 'HistoryBuff_88', rating: 5, comment: 'A fantastic representation of Inca culture. Very well organized.' },
      ],
      interest: 2.1,
      isFree: false,
      categories: ['andino', 'histórico', 'danza', 'espectáculo'],
    },
    {
      id: 'corpus-christi',
      slug: 'corpus-christi',
      name: 'Corpus Christi',
      date: { start: new Date(new Date().getFullYear(), 4, 30), end: new Date(new Date().getFullYear(), 4, 30) },
      location: 'Plaza de Armas, Cusco',
      coords: [-13.5165, -71.979],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
        {
            dayKey: 'day_2',
            eventKeys: [
              { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            ],
          },
      ],
      image: 'corpus-christi',
      rating: 4.7,
      reviews: [
        { id: 1, user: 'CultureVulture', rating: 5, comment: 'The pageantry is incredible. Seeing all the saints together in the plaza is a powerful sight.' },
        { id: 2, user: 'FoodieGavin', rating: 4, comment: 'Came for the parade, stayed for the Chiriuchu. It\'s a wild combination of flavors but you have to try it!' },
      ],
      interest: 1.2,
      isFree: true,
      categories: ['religioso', 'gastronómico', 'tradicional', 'espectáculo'],
    },
    {
      id: 'feria-de-huancaro',
      slug: 'feria-de-huancaro',
      name: 'Feria de Huancaro',
      date: { start: new Date(new Date().getFullYear(), 5, 1), end: new Date(new Date().getFullYear(), 5, 30) },
      location: 'Huancaro, Cusco',
      coords: [-13.535, -71.964],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
          ],
        },
      ],
      image: 'huancaro-fair',
      rating: 4.5,
      reviews: [
        { id: 1, user: 'FoodCritic', rating: 5, comment: 'The food variety is insane! A must-visit for anyone who wants to taste authentic Andean cuisine.' },
      ],
      interest: 1.1,
      isFree: false,
      categories: ['feria', 'gastronómico', 'conciertos', 'artesanía'],
    },
    {
      id: 'san-sebastian-patron-feast',
      slug: 'san-sebastian-patron-feast',
      name: 'Fiesta Patronal de San Sebastián',
      date: { start: new Date(new Date().getFullYear(), 0, 18), end: new Date(new Date().getFullYear(), 0, 22) },
      location: 'San Sebastián, Cusco',
      coords: [-13.535, -71.937],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'san-sebastian-festival',
      rating: 4.6,
      reviews: [
        { id: 1, user: 'CuscoLocal', rating: 5, comment: 'As a local, this is one of my favorite festivals. The dancing is non-stop and the atmosphere is electric.' },
      ],
      interest: 1.3,
      isFree: true,
      categories: ['religioso', 'danza', 'tradicional', 'gastronómico'],
    },
  ],
  Urubamba: [
    {
      id: 'senor-de-choquekillka',
      slug: 'senor-de-choquekillka',
      name: 'Señor de Choquekillka',
      date: { start: new Date(new Date().getFullYear(), 5, 6), end: new Date(new Date().getFullYear(), 5, 9) },
      location: 'Ollantaytambo, Urubamba',
      coords: [-13.259, -72.264],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'ollantaytambo-festival',
      rating: 4.6,
      reviews: [
        { id: 1, user: 'HistoryLover', rating: 5, comment: 'Seeing the procession against the backdrop of the Inca ruins is unforgettable.' },
      ],
      interest: 0.9,
      isFree: true,
      categories: ['religioso', 'tradicional', 'danza'],
    },
  ],
  Quispicanchi: [
    {
      id: 'qoyllur-riti',
      slug: 'qoyllur-riti',
      name: 'Qoyllur Rit\'i',
      date: { start: new Date(new Date().getFullYear(), 4, 29), end: new Date(new Date().getFullYear(), 5, 2) },
      location: 'Sinakara Valley, Ocongate',
      coords: [-13.63, -71.23],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }],
        },
        {
          dayKey: 'day_2',
          eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }],
        },
        {
          dayKey: 'day_3',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'qoyllur-riti',
      rating: 4.8,
      reviews: [
        { id: 1, user: 'AdventurousSoul', rating: 5, comment: 'A truly profound and spiritual experience. The energy is incredible, but be prepared for the cold and altitude.' },
        { id: 2, user: 'CulturalExplorer', rating: 4, comment: 'Fascinating to see the blend of beliefs. It\'s not for the faint of heart, but it\'s very authentic.' },
      ],
      interest: 1.8,
      isFree: true,
      categories: ['andino', 'religioso', 'peregrinación', 'aventura'],
    },
  ],
  Paucartambo: [
    {
      id: 'paucartambo-virgen-del-carmen',
      slug: 'paucartambo-virgen-del-carmen',
      name: 'Paucartambo - Virgen del Carmen',
      date: { start: new Date(new Date().getFullYear(), 6, 15), end: new Date(new Date().getFullYear(), 6, 18) },
      location: 'Paucartambo',
      coords: [-13.31, -71.59],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
        {
          dayKey: 'day_2',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
        {
          dayKey: 'day_3',
          eventKeys: [{ timeKey: 'event_1_time', descriptionKey: 'event_1_desc' }],
        },
      ],
      image: 'paucartambo',
      rating: 4.9,
      reviews: [
        { id: 1, user: 'FiestaFinder', rating: 5, comment: 'Incredible party! The costumes of the Saqra dancers are amazing and a little terrifying. Loved every minute.' },
        { id: 2, user: 'PhotoNomad', rating: 5, comment: 'A photographer\'s dream. So much color and action. The town has a magical atmosphere during the festival.' },
      ],
      interest: 1.5,
      isFree: true,
      categories: ['religioso', 'danza', 'tradicional', 'espectáculo'],
    },
  ],
  Canchis: [
    {
      id: 'fiesta-de-la-virgen-rosario-de-combapata',
      slug: 'fiesta-de-la-virgen-rosario-de-combapata',
      name: 'Virgen del Rosario de Combapata',
      date: { start: new Date(new Date().getFullYear(), 9, 7), end: new Date(new Date().getFullYear(), 9, 10) },
      location: 'Combapata, Canchis',
      coords: [-14.110, -71.493],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'combapata-festival',
      rating: 4.4,
      reviews: [
        { id: 1, user: 'AdventureSeeker', rating: 4, comment: 'The battle reenactment is wild and chaotic! Very impressive.' },
      ],
      interest: 0.5,
      isFree: true,
      categories: ['religioso', 'tradicional', 'histórico', 'danza'],
    },
    {
      id: 'carnaval-tkapuy',
      slug: 'carnaval-tkapuy',
      name: 'Carnaval T\'ikapallana de Tinta',
      date: { start: new Date(new Date().getFullYear(), 1, 22), end: new Date(new Date().getFullYear(), 1, 24) },
      location: 'Tinta, Canchis',
      coords: [-14.144, -71.408],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
          ],
        },
      ],
      image: 'tinta-carnival',
      rating: 4.5,
      reviews: [
        { id: 1, user: 'AnthroStudent', rating: 5, comment: 'A beautiful and very authentic ritual. The flower symbolism is fascinating.' },
      ],
      interest: 0.8,
      isFree: true,
      categories: ['carnaval', 'andino', 'tradicional', 'danza'],
    },
  ],
  Anta: [
    {
      id: 'semana-turistica-de-anta',
      slug: 'semana-turistica-de-anta',
      name: 'Semana Turística de Anta',
      date: { start: new Date(new Date().getFullYear(), 8, 20), end: new Date(new Date().getFullYear(), 8, 27) },
      location: 'Izcuchaca, Anta',
      coords: [-13.483, -72.183],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
          ],
        },
      ],
      image: 'anta-festival',
      rating: 4.3,
      reviews: [
        { id: 1, user: 'LocalExplorer', rating: 4, comment: 'A great way to discover what Anta has to offer. Very well organized and friendly atmosphere.' },
      ],
      interest: 0.4,
      isFree: true,
      categories: ['feria', 'gastronómico', 'danza', 'aventura'],
    },
  ],
  'La Convención': [
    {
      id: 'festival-del-cafe-quillabamba',
      slug: 'festival-del-cafe-quillabamba',
      name: 'Festival del Café de Quillabamba',
      date: { start: new Date(new Date().getFullYear(), 6, 25), end: new Date(new Date().getFullYear(), 6, 29) },
      location: 'Quillabamba, La Convención',
      coords: [-12.865, -72.693],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'quillabamba-coffee',
      rating: 4.7,
      reviews: [
        { id: 1, user: 'CoffeeLover', rating: 5, comment: 'Heaven for a coffee addict like me! The quality is outstanding.' },
      ],
      interest: 0.8,
      isFree: false,
      categories: ['feria', 'gastronómico', 'conciertos'],
    },
    {
      id: 'aniversario-de-la-convencion',
      slug: 'aniversario-de-la-convencion',
      name: 'Aniversario de La Convención',
      date: { start: new Date(new Date().getFullYear(), 6, 20), end: new Date(new Date().getFullYear(), 6, 25) },
      location: 'Quillabamba, La Convención',
      coords: [-12.865, -72.693],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'quillabamba-anniversary',
      rating: 4.5,
      reviews: [
        { id: 1, user: 'TropicalVibes', rating: 4, comment: 'A fun party with a very different feel from the rest of Cusco. Lots of dancing!' },
      ],
      interest: 0.7,
      isFree: false,
      categories: ['feria', 'conciertos', 'moderno'],
    },
  ],
  Acomayo: [
    {
      id: 'wayllati-carnaval',
      slug: 'wayllati-carnaval',
      name: 'Carnaval de Wayllati',
      date: { start: new Date(new Date().getFullYear(), 1, 20), end: new Date(new Date().getFullYear(), 1, 25) },
      location: 'Sangarará, Acomayo',
      coords: [-13.963, -71.603],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
          ],
        },
      ],
      image: 'acomayo-carnival',
      rating: 4.5,
      reviews: [
        { id: 1, user: 'CultureSeeker', rating: 5, comment: 'So authentic and full of life. It felt like stepping back in time.' },
      ],
      interest: 0.6,
      isFree: true,
      categories: ['carnaval', 'andino', 'danza', 'tradicional'],
    },
  ],
  Canas: [
    {
      id: 'qeswachaka-bridge-festival',
      slug: 'qeswachaka-bridge-festival',
      name: 'Q\'eswachaka Bridge Festival',
      date: { start: new Date(new Date().getFullYear(), 5, 8), end: new Date(new Date().getFullYear(), 5, 11) },
      location: 'Quehue, Canas',
      coords: [-14.364, -71.503],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4",
        "tradition_5"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
            { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' },
          ],
        },
      ],
      image: 'qeswachaka-bridge',
      rating: 4.9,
      reviews: [
        { id: 1, user: 'Engineer_Mike', rating: 5, comment: 'An incredible feat of engineering and community spirit. Truly one of a kind.' },
      ],
      interest: 1.9,
      isFree: false,
      categories: ['andino', 'tradicional', 'histórico', 'espectáculo'],
    },
  ],
  Chumbivilcas: [
    {
      id: 'wata-qallariy',
      slug: 'wata-qallariy',
      name: 'Wata Qallariy',
      date: { start: new Date(new Date().getFullYear(), 10, 1), end: new Date(new Date().getFullYear(), 10, 2) },
      location: 'Santo Tomás, Chumbivilcas',
      coords: [-14.444, -72.083],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'chumbivilcas-horses',
      rating: 4.6,
      reviews: [
        { id: 1, user: 'Cowboy_Fan', rating: 5, comment: 'The horsemanship is absolutely stunning. Very raw and exciting festival.' },
      ],
      interest: 0.7,
      isFree: true,
      categories: ['andino', 'tradicional', 'carreras'],
    },
    {
      id: 'takanakuy-chumbivilcas',
      slug: 'takanakuy-chumbivilcas',
      name: 'Takanakuy',
      date: { start: new Date(new Date().getFullYear(), 11, 25), end: new Date(new Date().getFullYear(), 11, 25) },
      location: 'Santo Tomás, Chumbivilcas',
      coords: [-14.444, -72.083],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
            { timeKey: 'event_3_time', descriptionKey: 'event_3_desc' },
          ],
        },
      ],
      image: 'takanakuy-fight',
      rating: 4.7,
      reviews: [
        { id: 1, user: 'ExtremeTravel', rating: 5, comment: 'Like nothing I have ever seen. Intense, raw, and absolutely fascinating. A true cultural immersion.' },
      ],
      interest: 1.6,
      isFree: true,
      categories: ['andino', 'tradicional', 'combate ritual'],
    },
    {
      id: 'carnaval-de-mollomarka',
      slug: 'carnaval-de-mollomarka',
      name: 'Carnaval de Mollomarka',
      date: { start: new Date(new Date().getFullYear(), 1, 25), end: new Date(new Date().getFullYear(), 1, 27) },
      location: 'Mollomarka, Chumbivilcas',
      coords: [-14.331, -71.933],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
          ],
        },
      ],
      image: 'mollomarka-carnival',
      rating: 4.6,
      reviews: [
        { id: 1, user: 'OffTheBeatenPath', rating: 5, comment: 'A truly authentic experience. No tourists, just pure local culture. The scenery is also spectacular.' },
      ],
      interest: 0.4,
      isFree: true,
      categories: ['carnaval', 'andino', 'tradicional', 'danza'],
    },
  ],
  Espinar: [
    {
      id: 'k-ana-raymi',
      slug: 'k-ana-raymi',
      name: 'K\'ana Raymi',
      date: { start: new Date(new Date().getFullYear(), 5, 19), end: new Date(new Date().getFullYear(), 5, 21) },
      location: 'Yauri, Espinar',
      coords: [-14.791, -71.414],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'espinar-harvest',
      rating: 4.4,
      reviews: [
        { id: 1, user: 'EcoTraveler', rating: 4, comment: 'Fascinating to see so many types of potatoes! A great celebration of biodiversity.' },
      ],
      interest: 0.3,
      isFree: true,
      categories: ['andino', 'agrícola', 'gastronómico', 'danza'],
    },
  ],
  Paruro: [
    {
      id: 'fiesta-de-san-juan-de-paruro',
      slug: 'fiesta-de-san-juan-de-paruro',
      name: 'Fiesta de San Juan de Paruro',
      date: { start: new Date(new Date().getFullYear(), 5, 23), end: new Date(new Date().getFullYear(), 5, 25) },
      location: 'Paruro',
      coords: [-13.762, -71.854],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'paruro-bullfight',
      rating: 4.2,
      reviews: [
        { id: 1, user: 'TraditionLover', rating: 4, comment: 'A very classic and lively Andean festival. The bullfights are the main event.' },
      ],
      interest: 0.2,
      isFree: true,
      categories: ['religioso', 'tradicional', 'taurino'],
    },
  ],
  Calca: [
    {
      id: 'senor-de-huanca',
      slug: 'senor-de-huanca',
      name: 'Señor de Huanca',
      date: { start: new Date(new Date().getFullYear(), 8, 14), end: new Date(new Date().getFullYear(), 8, 14) },
      location: 'San Salvador, Calca',
      coords: [-13.491, -71.748],
      traditionKeys: [
        "tradition_1",
        "tradition_2",
        "tradition_3",
        "tradition_4"
      ],
      scheduleKeys: [
        {
          dayKey: 'day_1',
          eventKeys: [
            { timeKey: 'event_1_time', descriptionKey: 'event_1_desc' },
            { timeKey: 'event_2_time', descriptionKey: 'event_2_desc' },
          ],
        },
      ],
      image: 'senor-de-huanca',
      rating: 4.8,
      reviews: [
        { id: 1, user: 'FaithfulPilgrim', rating: 5, comment: 'The amount of faith you can feel here is overwhelming. A deeply moving experience.' },
      ],
      interest: 1.7,
      isFree: true,
      categories: ['religioso', 'peregrinación', 'tradicional'],
    },
  ],
};

// This flattens the grouped data into a single array, which is what the components currently expect.
// The new `province` property is added to each festival object.
export const festivals: Festival[] = Object.entries(festivalsByProvince)
  .flatMap(([province, provinceFestivals]) =>
    provinceFestivals.map(festival => ({
      ...festival,
      province,
    }))
  );
