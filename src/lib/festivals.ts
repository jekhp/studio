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
  province: string;
  coords: [number, number];
  history: string;
  traditions: string[];
  schedule: { day: string; events: { time: string; description: string }[] }[];
  image: string;
  rating: number;
  reviews: Review[];
  interest: number;
  isFree: boolean;
  categories: string[];
};

const festivalsByProvince: Record<string, Omit<Festival, 'province'>[]> = {
  Cusco: [
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
      interest: 2.1,
      isFree: false,
      categories: ['andino', 'histórico', 'danza', 'espectáculo'],
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
      interest: 1.2,
      isFree: true,
      categories: ['religioso', 'gastronómico', 'tradicional', 'espectáculo'],
    },
    {
      id: '6',
      slug: 'feria-de-huancaro',
      name: 'Feria de Huancaro',
      description: 'The largest agricultural, livestock, and artisanal fair in the Cusco region.',
      longDescription:
        'Held throughout the month of June, the Feria de Huancaro is a grand exposition that coincides with the jubilee celebrations of Cusco. It brings together producers, artisans, and artists from all over the region. Visitors can enjoy exhibitions of the best livestock, taste a huge variety of typical foods, purchase high-quality crafts, and enjoy live music concerts. It\'s a vibrant showcase of the economic and cultural richness of Cusco.',
      date: { start: new Date(new Date().getFullYear(), 5, 1), end: new Date(new Date().getFullYear(), 5, 30) },
      location: 'Huancaro, Cusco',
      coords: [-13.535, -71.964],
      history:
        'The fair has grown over the decades to become the most important commercial and cultural event of its kind in the southern Peruvian Andes. It serves as a vital platform for rural producers and a major attraction for both locals and tourists during Cusco\'s busiest month.',
      traditions: ['Livestock competitions (cattle, sheep, alpacas)', 'Gastronomic festivals with traditional dishes', 'Exhibition and sale of regional handicrafts', 'Daily concerts with famous Peruvian artists'],
      schedule: [
        {
          day: 'Weekends in June',
          events: [
            { time: 'All Day', description: 'Main fair days with peak attendance, special exhibitions, and major concerts.' },
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
      id: '17',
      slug: 'san-sebastian-patron-feast',
      name: 'Fiesta Patronal de San Sebastián',
      description: 'A major patron saint festival in the district of San Sebastián, just outside Cusco city.',
      longDescription:
        'The festival in honor of Saint Sebastian is one of the most important in the immediate vicinity of Cusco. For several days, the district is filled with processions, dances, and music. The image of the saint is carried through the streets, accompanied by various dance troupes and thousands of faithful. The festival showcases the deep-rooted faith and vibrant culture of the district.',
      date: { start: new Date(new Date().getFullYear(), 0, 18), end: new Date(new Date().getFullYear(), 0, 22) },
      location: 'San Sebastián, Cusco',
      coords: [-13.535, -71.937],
      history:
        'The devotion to Saint Sebastian dates back to the early colonial period. The festival is a rich expression of religious syncretism, where Catholic traditions are interwoven with Andean cultural practices.',
      traditions: ['Processions of the patron saint', 'Performances by numerous folkloric dance groups', 'Gastronomic fairs with typical dishes', 'Fireworks and musical bands'],
      schedule: [
        {
          day: 'January 20 (Main Day)',
          events: [
            { time: '11:00 AM', description: 'Central Mass in the main church.' },
            { time: '2:00 PM', description: 'Grand procession of Saint Sebastian through the main streets.' },
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
      id: '5',
      slug: 'senor-de-choquekillka',
      name: 'Señor de Choquekillka',
      description: 'A patron saint festival in Ollantaytambo with deep roots in local history and tradition.',
      longDescription:
        'The festival of the Señor de Choquekillka is the most important religious celebration in Ollantaytambo, a town famous for its impressive Inca fortress. The festival is held during Pentecost and lasts for several days, featuring vibrant processions, folkloric dances, bullfights, and a palpable sense of community devotion. The image of the Señor de Choquekillka, a crucified Christ, is paraded through the ancient streets, accompanied by various dance troupes and musical bands.',
      date: { start: new Date(new Date().getFullYear(), 5, 6), end: new Date(new Date().getFullYear(), 5, 9) },
      location: 'Ollantaytambo, Urubamba',
      coords: [-13.259, -72.264],
      history:
        'The origin of this devotion is linked to the discovery of a cross in the 18th century, which became the patron of the town. The festival integrates pre-Hispanic agricultural rites with Catholic celebrations, making it a powerful example of Andean syncretism. It reinforces social ties and cultural identity among the people of Ollantaytambo.',
      traditions: ['Processions with the patron saint\'s image', 'Diverse folkloric dances like the "Sargento", "Coyacha", and "Negrillos"', 'Traditional bullfights and cockfights', 'Masses and religious services in Quechua and Spanish'],
      schedule: [
        {
          day: 'Main Day',
          events: [
            { time: '10:00 AM', description: 'Main mass at the Santiago Apóstol Church.' },
            { time: '2:00 PM', description: 'Central procession of the Señor de Choquekillka through the Plaza de Armas.' },
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
      id: '2',
      slug: 'qoyllur-riti',
      name: 'Qoyllur Rit\'i',
      description: 'A spiritual pilgrimage to the Sinakara Valley, blending Catholic and Andean beliefs.',
      longDescription:
        'Qoyllur Rit\'i, or the "Snow Star Festival," is a centuries-old religious pilgrimage that takes place in the remote Sinakara Valley at the foot of Mount Ausangate. Tens of thousands of pilgrims from surrounding villages travel for days, bringing large crosses to the sanctuary. The festival is a unique syncretism of Catholic and Andean beliefs, celebrating the stars, the mountain spirits (Apus), and the Lord of Qoyllur Rit\'i.',
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
      interest: 1.8,
      isFree: true,
      categories: ['andino', 'religioso', 'peregrinación', 'aventura'],
    },
  ],
  Paucartambo: [
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
      interest: 1.5,
      isFree: true,
      categories: ['religioso', 'danza', 'tradicional', 'espectáculo'],
    },
  ],
  Canchis: [
    {
      id: '7',
      slug: 'fiesta-de-la-virgen-rosario-de-combapata',
      name: 'Virgen del Rosario de Combapata',
      description: 'A colorful patron saint festival in Canchis, known for its guerrilla warfare reenactments.',
      longDescription:
        'Celebrated in the town of Combapata, this festival honors the Virgen del Rosario. The event is famous for its folkloric richness, especially the traditional dances and the dramatic reenactment of a historic battle, or "guerrilla," between different communities, symbolizing ancient rivalries and alliances. The entire town participates in the processions, music, and feasting.',
      date: { start: new Date(new Date().getFullYear(), 9, 7), end: new Date(new Date().getFullYear(), 9, 10) },
      location: 'Combapata, Canchis',
      coords: [-14.110, -71.493],
      history:
        'The devotion to the Virgen del Rosario was introduced during the colonial period. The festival\'s unique character comes from the blending of this Catholic faith with local history, particularly the memory of conflicts and heroism, which are performed in the mock battles.',
      traditions: ['"Guerrilla" or mock battle reenactments', 'Processions led by dance troupes like the "Tupay"', 'Traditional dishes and feasting', 'Fireworks and musical performances'],
      schedule: [
        {
          day: 'October 8 (Main Day)',
          events: [
            { time: '12:00 PM', description: 'Central Mass and procession of the Virgin.' },
            { time: '3:00 PM', description: 'Staging of the grand guerrilla warfare reenactment in the main plaza.' },
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
      id: '16',
      slug: 'carnaval-tkapuy',
      name: 'Carnaval T\'ikapallana de Tinta',
      description: 'A vibrant carnival in Canchis celebrating youth and the harvest with flowers.',
      longDescription:
        'The T\'ikapallana Carnival in Tinta (Canchis) is a festival full of youthful energy, focused on collecting the first flowers of the season (T\'ikas). Young men and women engage in playful ritual games and dances, celebrating fertility and the abundance of the land. It is a colorful and musical event that highlights the strong community bonds and connection to nature.',
      date: { start: new Date(new Date().getFullYear(), 1, 22), end: new Date(new Date().getFullYear(), 1, 24) },
      location: 'Tinta, Canchis',
      coords: [-14.144, -71.408],
      history:
        'This carnival maintains strong pre-Hispanic roots tied to agricultural cycles and rites of passage for young people. It is a celebration of life and the transition from adolescence to adulthood within the community.',
      traditions: ['Ritual collection of flowers ("T\'ikapallana")', 'Playful duels and games between young men and women', 'Traditional carnival music with charangos', 'Abundant food and chicha shared among the community'],
      schedule: [
        {
          day: 'Carnival Sunday',
          events: [
            { time: 'All Day', description: 'Main celebration in the Plaza de Tinta with music, dance, and games.' },
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
      id: '8',
      slug: 'semana-turistica-de-anta',
      name: 'Semana Turística de Anta',
      description: 'A week-long celebration showcasing the cultural and natural attractions of the Anta province.',
      longDescription:
        'The "Tourist Week of Anta" is a modern festival designed to promote the rich heritage of the Anta province. The week is packed with activities including gastronomic fairs, agricultural expos, folkloric dance competitions, adventure sports like canoeing on the Huarocondo lagoon, and tours of important archaeological sites like Killarumiyoq. It\'s a comprehensive display of Anta\'s identity.',
      date: { start: new Date(new Date().getFullYear(), 8, 20), end: new Date(new Date().getFullYear(), 8, 27) },
      location: 'Izcuchaca, Anta',
      coords: [-13.483, -72.183],
      history:
        'Established in recent decades to boost local tourism and pride, the festival has quickly become a major event in the regional calendar, successfully highlighting the often-overlooked attractions of the pampa de Anta.',
      traditions: ['Gastronomic fairs featuring local products like tarwi and quinoa', 'Folkloric dance parades', 'Adventure sports competitions', 'Artisanal markets'],
      schedule: [
        {
          day: 'Main Weekend',
          events: [
            { time: 'All Day', description: 'Main dance competitions and the central gastronomic fair in the Plaza de Armas of Anta.' },
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
      id: '9',
      slug: 'festival-del-cafe-quillabamba',
      name: 'Festival del Café de Quillabamba',
      description: 'A festival celebrating the high-quality coffee produced in La Convención province.',
      longDescription:
        'Quillabamba, the capital of La Convención, is the heart of Cusco\'s coffee and cocoa region. This festival, held during the city\'s anniversary, celebrates its most famous product. It features coffee tasting competitions, barista championships, tours of coffee plantations, and cultural events. It\'s a perfect event for coffee lovers to taste some of Peru\'s best beans directly from the source.',
      date: { start: new Date(new Date().getFullYear(), 6, 25), end: new Date(new Date().getFullYear(), 6, 29) },
      location: 'Quillabamba, La Convención',
      coords: [-12.865, -72.693],
      history:
        'The festival was created to promote the local coffee industry and has become a key event for producers to showcase their quality and for visitors to learn about the coffee production process, from bean to cup.',
      traditions: ['Public coffee tastings (cupping)', 'Barista and latte art competitions', 'Exposition and sale of local coffee brands', 'Election of the "Queen of Coffee"'],
      schedule: [
        {
          day: 'July 28',
          events: [
            { time: '10:00 AM', description: 'Coffee tasting competition finals.' },
            { time: '8:00 PM', description: 'Main concert and celebration for the anniversary of Quillabamba.' },
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
      id: '20',
      slug: 'aniversario-de-la-convencion',
      name: 'Aniversario de La Convención',
      description: 'The anniversary celebration of the tropical province of La Convención.',
      longDescription:
        'The anniversary of the province of La Convención, with its capital in Quillabamba, is a week-long celebration of the region\'s identity, also known as the "eyebrow of the jungle." The festival features parades, beauty pageants (election of the "Miss Coffee"), agricultural fairs showcasing coffee, cocoa, and tropical fruits, and lively concerts with jungle music (cumbia amazónica). It is a festive time that highlights the unique culture of Cusco\'s tropical region.',
      date: { start: new Date(new Date().getFullYear(), 6, 20), end: new Date(new Date().getFullYear(), 6, 25) },
      location: 'Quillabamba, La Convención',
      coords: [-12.865, -72.693],
      history: 'This celebration marks the political creation of the province and has become a major event to promote its economic potential and distinct cultural identity, different from the Andean highlands.',
      traditions: ['Civic and school parades', 'Agricultural and artisanal fairs', 'Election of beauty queens representing local products', 'Live music concerts and parties'],
      schedule: [
        {
          day: 'July 25 (Main Day)',
          events: [
            { time: '10:00 AM', description: 'Grand civic-military parade in the main square.' },
            { time: '8:00 PM', description: 'Serenata and main concert with national artists.' },
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
      id: '10',
      slug: 'wayllati-carnaval',
      name: 'Carnaval de Wayllati',
      description: 'A traditional carnival in the heights of Acomayo, known for its music and dance.',
      longDescription:
        'The Carnival of Wayllati is a vibrant and authentic celebration in the Acomayo province. It is characterized by the "Tupay," a ritual battle between young men and women who sing and dance, often engaging in playful confrontations. The music, featuring charangos and quenas, is unique to the region. It is a festivity full of joy, color, and youthful energy, celebrating fertility and the harvest season.',
      date: { start: new Date(new Date().getFullYear(), 1, 20), end: new Date(new Date().getFullYear(), 1, 25) },
      location: 'Sangarará, Acomayo',
      coords: [-13.963, -71.603],
      history:
        'This carnival has deep pre-Hispanic roots related to agricultural cycles and community rituals. It has maintained much of its original character, making it a valuable expression of living Andean culture, less influenced by modern commercialism.',
      traditions: ['"Tupay" ritual confrontations between genders', 'Unique carnival music played with traditional instruments', 'Colorful traditional costumes', 'Community feasts and sharing of chicha'],
      schedule: [
        {
          day: 'Carnival Sunday',
          events: [
            { time: 'All Day', description: 'Main day of "Tupay" with groups of dancers and musicians taking over the town square.' },
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
      id: '11',
      slug: 'qeswachaka-bridge-festival',
      name: 'Q\'eswachaka Bridge Festival',
      description: 'The annual reconstruction of the last remaining Inca rope bridge.',
      longDescription:
        'Every year, for three days, four communities near the Apurímac canyon come together to rebuild the Q\'eswachaka bridge using traditional Inca techniques. This ancestral ritual involves twisting grass (q\'oya) into strong cables. The men are responsible for braiding and pulling the new bridge across the canyon, while the women braid the smaller ropes. The festival culminates with the inauguration of the new bridge, followed by a celebration with native music and dance. It is a UNESCO Intangible Cultural Heritage of Humanity.',
      date: { start: new Date(new Date().getFullYear(), 5, 8), end: new Date(new Date().getFullYear(), 5, 11) },
      location: 'Quehue, Canas',
      coords: [-14.364, -71.503],
      history:
        'This tradition has been passed down for over 500 years, since the time of the Incas, who built these types of bridges as part of their vast road network (Qhapaq Ñan). The annual reconstruction is a testament to the community\'s respect for their ancestors and the Pacha Mama (Mother Earth).',
      traditions: ['Twisting of q\'oya grass into ropes', 'Ritual offerings to the Apus (mountain spirits)', 'Communal work (Minka)', 'Inaugural crossing of the new bridge', 'Traditional dances and community feast'],
      schedule: [
        {
          day: 'Second Sunday of June',
          events: [
            { time: '10:00 AM', description: 'The old bridge is cut and falls into the river.' },
            { time: '11:00 AM', description: 'The new bridge is installed and inaugurated.' },
            { time: '2:00 PM', description: 'Celebration with music and dancing.' },
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
      id: '12',
      slug: 'wata-qallariy',
      name: 'Wata Qallariy',
      description: 'An Andean New Year ritual in Chumbivilcas with horse races and music.',
      longDescription:
        'In the province of Chumbivilcas, the Wata Qallariy (Start of the Year) is celebrated with unique traditions. While it coincides with the Catholic All Saints\' Day, it has its own character, focused on honoring the ancestors and the land. The festival is known for its "Takanakuy" (ritual combat) and daring horse races. It is a celebration of the strength and resilience of the Chumbivilcas people.',
      date: { start: new Date(new Date().getFullYear(), 10, 1), end: new Date(new Date().getFullYear(), 10, 2) },
      location: 'Santo Tomás, Chumbivilcas',
      coords: [-14.444, -72.083],
      history:
        'Wata Qallariy blends ancestral veneration of the dead with a celebration of life and strength. The horse, introduced by the Spanish, was integrated into the local culture, becoming a symbol of power and skill, which is displayed in the thrilling races.',
      traditions: ['Horse races and equestrian skill demonstrations', 'Ritual offerings to ancestors at cemeteries', 'Traditional music and the "Huaylía" dance', 'Community fairs and feasting'],
      schedule: [
        {
          day: 'November 1',
          events: [
            { time: 'All Day', description: 'Visits to the cemetery and offerings to ancestors.' },
            { time: 'Afternoon', description: 'Horse races and community celebrations.' },
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
      id: '18',
      slug: 'takanakuy-chumbivilcas',
      name: 'Takanakuy',
      description: 'A unique Christmas celebration in Chumbivilcas featuring ritual fighting to settle scores.',
      longDescription:
        'Takanakuy, which means "to hit each other" in Quechua, is a unique and controversial festival held on Christmas Day in several communities in Chumbivilcas. Participants, often wearing elaborate masks, settle personal disputes from the past year through public, bare-knuckle fighting. The fights are supervised and serve as a social catharsis, ensuring the new year begins with a clean slate. The day also includes music, dancing, and drinking.',
      date: { start: new Date(new Date().getFullYear(), 11, 25), end: new Date(new Date().getFullYear(), 11, 25) },
      location: 'Santo Tomás, Chumbivilcas',
      coords: [-14.444, -72.083],
      history:
        'The origins of Takanakuy are debated, but it is seen as a pre-Hispanic tradition of ritual combat adapted to the Catholic calendar. It functions as a community-level justice system and a way to display courage and resolve conflicts before the start of a new agricultural cycle.',
      traditions: ['Ritual combat between individuals', 'Use of elaborate masks representing different characters', 'The "Huayliya" music and dance that accompanies the event', 'Community-wide celebration after the fights'],
      schedule: [
        {
          day: 'December 25',
          events: [
            { time: 'Morning', description: 'Processions and preparations.' },
            { time: 'Afternoon', description: 'The Takanakuy fights take place in the local bullring or plaza.' },
            { time: 'Evening', description: 'Celebrations continue with music and dance.' },
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
      id: '19',
      slug: 'carnaval-de-mollomarka',
      name: 'Carnaval de Mollomarka',
      description: 'An authentic high-altitude carnival in the province of Chumbivilcas.',
      longDescription:
        'In the remote district of Mollomarka, this carnival is one of the most traditional and less-visited in the Cusco region. It is a celebration of the harvest and fertility, with deep roots in Andean cosmology. The festival features unique music, energetic dancing, and ritual offerings to the Pacha Mama and the Apus. The "Yunza" or "Cortamonte," a tree laden with gifts that is danced around and eventually cut down, is a central element.',
      date: { start: new Date(new Date().getFullYear(), 1, 25), end: new Date(new Date().getFullYear(), 1, 27) },
      location: 'Mollomarka, Chumbivilcas',
      coords: [-14.331, -71.933],
      history: 'This carnival preserves ancient rituals that have been passed down through generations, offering a glimpse into the heart of Andean culture, away from major tourist circuits. The music and dance styles are specific to this micro-region.',
      traditions: ['Cortamonte/Yunza (tree cutting ceremony)', 'Traditional carnival music with charangos and bandurrias', 'Community feasting and sharing of chicha', 'Horseback riding displays by local cowboys (qorilazos)'],
      schedule: [
        {
          day: 'Carnival Sunday',
          events: [
            { time: 'All Day', description: 'Main celebration with music, dancing, and the Cortamonte ceremony in the evening.' },
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
      id: '13',
      slug: 'k-ana-raymi',
      name: 'K\'ana Raymi',
      description: 'An agricultural festival in Espinar celebrating the potato and local identity.',
      longDescription:
        'K\'ana Raymi is a festival that celebrates the harvest, particularly the potato, which is central to Andean life. Held in the K\'ana culture\'s heartland in Espinar, the event showcases the region\'s agricultural biodiversity. It includes ritual offerings to the Pacha Mama, competitions for the largest and most diverse potatoes, gastronomic fairs, and powerful traditional dances like the "Sipaschay."',
      date: { start: new Date(new Date().getFullYear(), 5, 19), end: new Date(new Date().getFullYear(), 5, 21) },
      location: 'Yauri, Espinar',
      coords: [-14.791, -71.414],
      history:
        'The festival was established to revalue the ancestral culture of the K\'ana nation, which predates the Incas. It seeks to strengthen cultural identity and promote the region\'s unique agricultural heritage in the face of modern challenges.',
      traditions: ['Ritual honoring the potato harvest', 'Exhibition of hundreds of native potato varieties', 'Gastronomic contests featuring potato-based dishes', 'Powerful and energetic local dances'],
      schedule: [
        {
          day: 'Main Day',
          events: [
            { time: 'Morning', description: 'Ritual payment to the earth (Pachamama) at an ancient ceremonial site.' },
            { time: 'Afternoon', description: 'Main dance and music festival in the Yauri stadium.' },
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
      id: '14',
      slug: 'fiesta-de-san-juan-de-paruro',
      name: 'Fiesta de San Juan de Paruro',
      description: 'A patron saint festival in Paruro marked by religious devotion and bullfights.',
      longDescription:
        'The Feast of Saint John the Baptist in Paruro is a traditional patron saint festival that combines Catholic fervor with Andean customs. The central events are the processions of the saint, masses, and the always popular bullfights, which draw crowds from all surrounding communities. The town comes alive with music, dancing, and a large fair.',
      date: { start: new Date(new Date().getFullYear(), 5, 23), end: new Date(new Date().getFullYear(), 5, 25) },
      location: 'Paruro',
      coords: [-13.762, -71.854],
      history:
        'Like many patron saint festivals, this one was established during the colonial era to evangelize the local population. Over time, it incorporated local elements, becoming a key event for the social and cultural life of the Paruro province.',
      traditions: ['Procession of Saint John the Baptist', 'Traditional bullfights with local horsemen (qorilazos)', 'Fairs selling local products and food', 'Folkloric dance presentations'],
      schedule: [
        {
          day: 'June 24 (Main Day)',
          events: [
            { time: '11:00 AM', description: 'Main mass and procession.' },
            { time: '3:00 PM', description: 'Start of the bullfighting afternoon.' },
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
      id: '15',
      slug: 'senor-de-huanca',
      name: 'Señor de Huanca',
      description: 'One of the most important religious pilgrimages in the Cusco region.',
      longDescription:
        'Thousands of devotees from Peru and Bolivia flock to the Sanctuary of the Señor de Huanca, located in the Calca province. They come seeking miracles and healing from the image of the martyred Christ, which is painted on a rock. The pilgrimage involves a long walk, night vigils, and ceremonies. The main day is September 14, but people visit throughout the month. The area is filled with an atmosphere of intense faith and devotion.',
      date: { start: new Date(new Date().getFullYear(), 8, 14), end: new Date(new Date().getFullYear(), 8, 14) },
      location: 'San Salvador, Calca',
      coords: [-13.491, -71.748],
      history:
        'The story dates back to 1775 when, according to tradition, Jesus Christ appeared to a humble Andean miner. A painter later depicted the image on the rock where it appeared, and the site became a center of miracles and pilgrimage. The sanctuary was built around this sacred rock.',
      traditions: ['Night-time pilgrimage walk to the sanctuary', 'Blessing of objects and vehicles', 'Masses and confessions', 'Symbolic purchase of miniature objects representing wishes (alasitas)'],
      schedule: [
        {
          day: 'September 14 (Main Day)',
          events: [
            { time: 'All Day', description: 'Continuous masses, processions, and blessings at the sanctuary.' },
            { time: 'Night', description: 'Main night vigil with candles and prayers.' },
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
