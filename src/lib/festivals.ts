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
  description: string;
  longDescription: string;
  date: { start: Date; end: Date };
  location: string;
  coords: [number, number];
  history: string;
  traditions: string[];
  schedule: { day: string; events: { time: string; description: string }[] }[];
  image: string;
  rating: number;
  reviews: Review[];
};

export const festivals: Festival[] = [
  {
    id: '1',
    slug: 'inti-raymi',
    name: 'Inti Raymi',
    description: 'The ancient Inca festival of the sun, a spectacular theatrical reenactment.',
    longDescription:
      'Inti Raymi, the "Festival of the Sun," was the most important religious ceremony of the Inca Empire in honor of the god Inti. Today, it is a massive theatrical representation held every year on June 24 in Cusco. It involves hundreds of actors in vibrant costumes, with historical rituals, dances, and processions that take place at Qorikancha, the Plaza de Armas, and the fortress of Sacsayhuamán.',
    date: { start: new Date(new Date().getFullYear(), 5, 24), end: new Date(new Date().getFullYear(), 5, 24) },
    location: 'Sacsayhuamán, Cusco',
    coords: [-13.507, -71.982],
    history:
      'Originally established by the Inca Pachacuti in the 15th century, the festival marked the winter solstice and the start of the new year. It was banned by the Spanish in the 16th century but was revived in the 20th century as a theatrical event to honor Cusco\'s heritage.',
    traditions: ['Processions with traditional music', 'Symbolic sacrifice of a llama', 'Ritual offerings of chicha (corn beer)', 'Folkloric dances from the four suyus (regions) of the Inca Empire'],
    schedule: [
      {
        day: 'June 24',
        events: [
          { time: '9:00 AM', description: 'Ceremony begins at Qorikancha (Temple of the Sun).' },
          { time: '11:00 AM', description: 'Procession moves to the Plaza de Armas for the "Encounter of the Times".' },
          { time: '1:30 PM', description: 'Main ceremony at the esplanade of Sacsayhuamán.' },
        ],
      },
    ],
    image: 'inti-raymi',
    rating: 4.9,
    reviews: [
      { id: 1, user: 'TravelerJane', rating: 5, comment: 'Absolutely breathtaking! The scale and colors are something you have to see to believe.' },
      { id: 2, user: 'HistoryBuff_88', rating: 5, comment: 'A fantastic representation of Inca culture. Very well organized.' },
    ],
  },
  {
    id: '2',
    slug: 'qoyllur-riti',
    name: 'Qoyllur Rit\'i',
    description: 'A spiritual pilgrimage to the Sinakara Valley, blending Catholic and Andean beliefs.',
    longDescription:
      'Qoyllur Rit\'i, or the "Snow Star Festival," is a centuries-old religious pilgrimage that takes place in the remote Sinakara Valley at the foot of Mount Ausangate. Tens of thousands of pilgrims from surrounding villages travel for days, bringing large crosses to the sanctuary. The festival is a unique syncretism of Catholic and Andean pre-Columbian beliefs, celebrating the stars, the mountain spirits (Apus), and the Lord of Qoyllur Rit\'i.',
    date: { start: new Date(new Date().getFullYear(), 4, 29), end: new Date(new Date().getFullYear(), 5, 2) },
    location: 'Sinakara Valley, Ocongate',
    coords: [-13.63, -71.23],
    history:
      'The festival\'s origins are a blend of an 18th-century Catholic miracle story and ancient Andean mountain worship. It centers on the appearance of the Christ child to a young shepherd boy. It has been recognized by UNESCO as part of the Intangible Cultural Heritage of Humanity.',
    traditions: ['Night-long vigils with music and dance', 'Processions of "Ukukus" (bear-men dancers) to the glacier', 'Elaborate dance performances by different "nations" representing their communities', 'A final 24-hour procession for the Corpus Christi festival in Cusco'],
    schedule: [
      {
        day: 'Day 1',
        events: [{ time: 'All Day', description: 'Pilgrims arrive at Mahuayani, beginning the 8km walk to the sanctuary.' }],
      },
      {
        day: 'Day 2',
        events: [{ time: 'All Day', description: 'Main day of celebration with continuous music, dancing, and religious services.' }],
      },
      {
        day: 'Day 3',
        events: [
          { time: '4:00 AM', description: '"Serenata" concert for the Christ of Qoyllur Rit\'i.' },
          { time: '12:00 PM', description: 'Processions and farewell dances as pilgrims begin their journey home.' },
        ],
      },
    ],
    image: 'qoyllur-riti',
    rating: 4.8,
    reviews: [
      { id: 1, user: 'AdventurousSoul', rating: 5, comment: 'A truly profound and spiritual experience. The energy is incredible, but be prepared for the cold and altitude.' },
      { id: 2, user: 'CulturalExplorer', rating: 4, comment: 'Fascinating to see the blend of beliefs. It\'s not for the faint of heart, but it\'s very authentic.' },
    ],
  },
  {
    id: '3',
    slug: 'paucartambo-virgen-del-carmen',
    name: 'Paucartambo - Virgen del Carmen',
    description: 'A vibrant and chaotic festival in the colonial town of Paucartambo with masked dancers.',
    longDescription:
      'The festival in honor of the Virgen del Carmen is one of Peru\'s most celebrated and wild parties. For several days, the quiet colonial town of Paucartambo erupts in a riot of color, music, and dance. troupes of masked dancers in spectacular costumes take over the streets, each representing different characters and stories from Peruvian history and folklore. The festival culminates in a procession where the statue of the Virgin blesses the town and battles costumed demons on the rooftops.',
    date: { start: new Date(new Date().getFullYear(), 6, 15), end: new Date(new Date().getFullYear(), 6, 18) },
    location: 'Paucartambo',
    coords: [-13.31, -71.59],
    history:
      'The devotion to the Virgen del Carmen (also known as Mamacha Carmen) dates back to the colonial era. Legend says her face miraculously appeared on a rock, and the festival grew around this veneration. The dances themselves are a syncretic mix of Catholic, Andean, and even Amazonian influences.',
    traditions: ['Parades of costumed dance troupes like Saqra (devils), Qhapaq Negro, and Maqta', 'Musical battles between different groups', 'Acrobatic displays and mock battles', 'The "burning" of the demons on the final day'],
    schedule: [
      {
        day: 'July 15',
        events: [
          { time: 'Morning', description: 'Fireworks and music mark the beginning of the festival.' },
          { time: 'Afternoon', description: 'First appearance of the dance troupes in the main square.' },
        ],
      },
      {
        day: 'July 16 (Main Day)',
        events: [
          { time: '10:00 AM', description: 'Main mass in honor of the Virgen del Carmen.' },
          { time: '3:00 PM', description: 'Grand procession through the town streets with the statue of the Virgin.' },
        ],
      },
      {
        day: 'July 17',
        events: [{ time: 'All Day', description: 'The battle between the angels and demons takes place, with demons performing acrobatics on the rooftops.' }],
      },
    ],
    image: 'paucartambo',
    rating: 4.9,
    reviews: [
      { id: 1, user: 'FiestaFinder', rating: 5, comment: 'Incredible party! The costumes of the Saqra dancers are amazing and a little terrifying. Loved every minute.' },
      { id: 2, user: 'PhotoNomad', rating: 5, comment: 'A photographer\'s dream. So much color and action. The town has a magical atmosphere during the festival.' },
    ],
  },
  {
    id: '4',
    slug: 'corpus-christi',
    name: 'Corpus Christi',
    description: 'A massive religious procession with saints parading through Cusco\'s streets.',
    longDescription:
      'Corpus Christi is one of the most important dates in Cusco\'s Catholic religious calendar. The festival is a vibrant display of syncretism, where fifteen saints and virgins from various parishes are carried on ornate litters in a grand procession to the Cathedral of Cusco. They "visit" the body of Christ, which is held in a magnificent gold monstrance. The streets are filled with music, dancers, and traditional foods, most notably "Chiriuchu," a cold dish featuring a variety of meats and other ingredients.',
    date: { start: new Date(new Date().getFullYear(), 4, 30), end: new Date(new Date().getFullYear(), 4, 30) },
    location: 'Plaza de Armas, Cusco',
    coords: [-13.5165, -71.979],
    history:
      'Introduced by the Spanish in the 16th century, Corpus Christi was meant to replace the Inca tradition of parading the mummies of their rulers. The Andean people adapted the festival, associating their own deities and traditions with the Catholic saints, creating the unique blend seen today.',
    traditions: ['Procession of 15 saints and virgins', 'Traditional "Chiriuchu" meal', 'Folkloric dances accompanying the processions', 'Eight-day celebration with various events following the main procession.'],
    schedule: [
      {
        day: 'Main Day (Thursday)',
        events: [
          { time: '11:00 AM', description: 'Main procession begins, with saints entering the Cathedral.' },
          { time: 'All Day', description: 'Food stalls and celebrations in the Plaza de Armas.' },
        ],
      },
      {
        day: 'Octave (Following Thursday)',
        events: [
          { time: '2:00 PM', description: 'The saints leave the Cathedral and begin their procession back to their home parishes.' },
        ],
      },
    ],
    image: 'corpus-christi',
    rating: 4.7,
    reviews: [
      { id: 1, user: 'CultureVulture', rating: 5, comment: 'The pageantry is incredible. Seeing all the saints together in the plaza is a powerful sight.' },
      { id: 2, user: 'FoodieGavin', rating: 4, comment: 'Came for the parade, stayed for the Chiriuchu. It\'s a wild combination of flavors but you have to try it!' },
    ],
  },
];
