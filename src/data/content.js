export const CONTENT = {
  brand: {
    name: 'B&B Catherina',
    tagline: 'Relax in the heart of Tuscany',
    address: 'Via R. Sanzio, 64, Ponsacco, 56038 Pisa, Tuscany, Italy',
    email: 'info@bbcatherina.it',
    phone: '+39 XXX XXX XXXX',
  },
  hero: {
    preTitle: 'Welcome to',
    title: 'B&B Catherina',
    subtitle:
      'A cozy retreat in the heart of Tuscany — just 18 miles from Pisa',
    cta: 'Discover More',
    ctaSecondary: 'View Rooms',
  },
  about: {
    label: 'Our Story',
    title: 'A Cozy Retreat\nin Ponsacco',
    body: `Nestled in the charming town of Ponsacco in the province of Pisa,
           Bed and Breakfast Catherina offers a warm and intimate escape in
           the heart of Tuscany. Enjoy the tranquility of two private gardens,
           spacious apartment-style rooms, and the warmth of a home-cooked
           sweet and savory breakfast served daily.`,
    cta: 'Learn More',
    stats: [
      { value: '2', label: 'Private Gardens', suffix: '' },
      { value: '18', label: 'From Pisa', suffix: 'mi' },
      { value: '25', label: 'To Coast', suffix: 'min' },
    ],
  },
  rooms: [
    {
      id: 'superior',
      name: 'Superior Room',
      description:
        'Spacious and bright, the Superior Room features garden views, a fully equipped kitchenette, private bathroom, flat-screen TV, and free Wi-Fi.',
      features: [
        'Garden View',
        'Kitchenette',
        'Private Bathroom',
        'Free Wi-Fi',
      ],
      cta: 'View Room',
    },
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description:
        'The Deluxe Room offers a refined and elegant space with premium furnishings, garden views, and all the comforts of home in a luxurious setting.',
      features: [
        'Garden View',
        'Premium Furnishings',
        'Private Bathroom',
        'Smart TV',
      ],
      cta: 'View Room',
    },
  ],
  amenities: [
    {
      icon: 'UtensilsCrossed',
      label: 'Delicious Breakfast',
      desc: 'Sweet & savory served daily',
    },
    { icon: 'Wifi', label: 'Free Wi-Fi', desc: 'High-speed throughout' },
    {
      icon: 'MapPin',
      label: 'City Center Location',
      desc: 'Heart of Ponsacco',
    },
    { icon: 'Car', label: 'Free Parking', desc: 'Private on-site parking' },
    {
      icon: 'TreePine',
      label: 'Two Gardens',
      desc: 'Lush private green spaces',
    },
    {
      icon: 'KeyRound',
      label: 'Private Entrance',
      desc: 'Your own entrance key',
    },
  ],
  location: {
    label: 'Getting Here',
    title: 'Perfectly Located\nin Tuscany',
    description: `Situated in Ponsacco, Tuscany, B&B Catherina is your
                  ideal base for exploring the region. Only 7 km from
                  Pontedera Train Station, 18 miles from Pisa Cathedral,
                  and 30 minutes from the Mediterranean Coast.`,
    distances: [
      { icon: 'Train', label: 'Pontedera Train Station', value: '7 km' },
      { icon: 'Landmark', label: 'Pisa Cathedral', value: '~30 km' },
      { icon: 'Waves', label: 'Mediterranean Coast', value: '~25 min' },
      { icon: 'Ship', label: 'Livorno Port', value: '~30 min' },
      { icon: 'Route', label: 'Florence-Pisa Motorway', value: '~5 km' },
    ],
    // Replace with the real Google Maps embed URL for Via R. Sanzio, 64, Ponsacco
    mapEmbedUrl:
      'https://www.google.com/maps?q=Via+R.+Sanzio,+64,+56038+Ponsacco+PI,+Italy&output=embed',
  },
  testimonials: [
    {
      name: 'Maria R.',
      country: 'Germany',
      flag: '🇩🇪',
      rating: 5,
      text: `A truly peaceful retreat. The garden views from our room were
             stunning and the breakfast was absolutely delicious. We will
             definitely return!`,
    },
    {
      name: 'James & Lucy',
      country: 'United Kingdom',
      flag: '🇬🇧',
      rating: 5,
      text: `Perfect location for exploring Tuscany. The hosts were incredibly
             welcoming and the private apartment felt like a home away from home.`,
    },
    {
      name: 'Sophie L.',
      country: 'France',
      flag: '🇫🇷',
      rating: 5,
      text: `Charming, cozy, and so close to Pisa. The breakfast was
             wonderful and the parking is a huge bonus. Highly recommend!`,
    },
  ],
  booking: {
    title: 'Experience the Charm\nof Tuscany',
    subtitle: `Book your stay at B&B Catherina and wake up to garden views
               and a freshly prepared Tuscan breakfast.`,
    checkIn: 'From 14:00',
    checkOut: 'Until 10:00',
    note: 'Full payment due on arrival. Please inform expected arrival time.',
    cta: 'Book Your Stay',
    bookingUrl: 'https://www.booking.com',
  },
}
