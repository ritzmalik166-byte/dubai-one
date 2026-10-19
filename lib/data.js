export const UNITS = {
  A: {
    name: '1 BHK',
    type: 'Type A',
    color: '#4f86c6',
    apt: 742,
    balcony: 98,
    view: 'living',
    plan: {
      w: 100,
      h: 64,
      rooms: [
        [0, 0, 38, 52, 'Bedroom', 'bed', "12'4\" × 16'8\""],
        [38, 0, 20, 20, 'Bath', 'wet'],
        [58, 0, 16, 20, 'Foyer', 'store'],
        [74, 0, 26, 20, 'Kitchen', 'kit'],
        [38, 20, 62, 32, 'Living / Dining', 'liv', "20'1\" × 10'4\""],
        [0, 52, 100, 12, 'Balcony', 'bal'],
      ],
    },
  },
  B: {
    name: '1 BHK + Study',
    type: 'Type B',
    color: '#6aa36f',
    apt: 812,
    balcony: 132,
    view: 'living',
    plan: {
      w: 100,
      h: 64,
      rooms: [
        [0, 0, 36, 52, 'Bedroom', 'bed', "11'8\" × 16'8\""],
        [36, 0, 18, 22, 'Bath', 'wet'],
        [54, 0, 22, 22, 'Study', 'store'],
        [76, 0, 24, 22, 'Kitchen', 'kit'],
        [36, 22, 64, 30, 'Living / Dining', 'liv', "20'9\" × 9'8\""],
        [0, 52, 100, 12, 'Balcony', 'bal'],
      ],
    },
  },
  C: {
    name: '2 BHK',
    type: 'Type C',
    color: '#6b62c9',
    apt: 1186,
    balcony: 164,
    view: 'dining',
    plan: {
      w: 130,
      h: 70,
      rooms: [
        [0, 0, 36, 44, 'Master Bedroom', 'bed', "11'8\" × 14'3\""],
        [36, 0, 18, 20, 'Ensuite', 'wet'],
        [54, 0, 22, 20, 'Kitchen', 'kit'],
        [76, 0, 18, 20, 'Bath', 'wet'],
        [94, 0, 36, 44, 'Bedroom 2', 'bed', "11'8\" × 14'3\""],
        [36, 20, 58, 38, 'Living / Dining', 'liv', "18'9\" × 12'4\""],
        [0, 44, 36, 14, 'Walk-in', 'store'],
        [94, 44, 36, 14, 'Wardrobe', 'store'],
        [0, 58, 130, 12, 'Balcony', 'bal'],
      ],
    },
  },
  D: {
    name: '3 BHK',
    type: 'Type D',
    color: '#d9a441',
    apt: 1712,
    balcony: 236,
    view: 'dining',
    plan: {
      w: 150,
      h: 74,
      rooms: [
        [0, 0, 40, 46, 'Master Bedroom', 'bed', "13'0\" × 14'11\""],
        [40, 0, 20, 22, 'Ensuite', 'wet'],
        [60, 0, 30, 22, 'Kitchen', 'kit'],
        [90, 0, 18, 22, 'Bath', 'wet'],
        [108, 0, 42, 30, 'Bedroom 2', 'bed'],
        [108, 30, 42, 30, 'Bedroom 3', 'bed'],
        [40, 22, 68, 38, 'Living / Dining', 'liv', "22'0\" × 12'4\""],
        [0, 46, 40, 14, 'Walk-in', 'store'],
        [0, 60, 150, 14, 'Balcony', 'bal'],
      ],
    },
  },
  P: {
    name: '4 BHK Penthouse with Jacuzzi',
    type: 'Type P',
    color: '#a9c04a',
    apt: 3940,
    balcony: 1120,
    view: 'bedroom',
    plan: {
      w: 170,
      h: 100,
      rooms: [
        [0, 0, 46, 44, 'Master Suite', 'bed', "15'0\" × 14'3\""],
        [46, 0, 34, 26, 'Kitchen', 'kit'],
        [80, 0, 14, 14, 'Powder', 'wet'],
        [80, 14, 14, 12, 'Foyer', 'store'],
        [94, 0, 40, 32, 'Bedroom 2', 'bed'],
        [134, 0, 36, 14, 'Bath', 'wet'],
        [134, 14, 36, 34, 'Bedroom 3', 'bed'],
        [46, 26, 88, 40, 'Living / Dining', 'liv', "28'6\" × 13'0\""],
        [0, 44, 26, 22, 'Ensuite', 'wet'],
        [26, 44, 20, 22, 'Walk-in', 'store'],
        [134, 48, 36, 30, 'Bedroom 4', 'bed'],
        [0, 66, 26, 12, 'Laundry', 'wet'],
        [26, 66, 20, 12, 'Maid', 'store'],
        [46, 66, 88, 12, 'Family Lounge', 'liv'],
        [0, 78, 170, 22, 'Sky Terrace + Jacuzzi', 'bal'],
      ],
      jacuzzi: [128, 82, 22, 14],
    },
  },
  S: {
    name: '3 BHK Sky Villa',
    type: 'Type S',
    color: '#d98a3a',
    apt: 2640,
    balcony: 610,
    view: 'bedroom',
    plan: {
      w: 140,
      h: 90,
      rooms: [
        [0, 0, 44, 44, 'Master Bedroom', 'bed', "14'3\" × 14'3\""],
        [44, 0, 20, 24, 'Ensuite', 'wet'],
        [64, 0, 30, 24, 'Kitchen', 'kit'],
        [94, 0, 46, 40, 'Bedroom 2', 'bed'],
        [44, 24, 20, 16, 'Powder', 'wet'],
        [64, 24, 30, 16, 'Pantry', 'store'],
        [44, 40, 96, 30, 'Living / Dining', 'liv', "31'2\" × 9'8\""],
        [0, 44, 44, 26, 'Bedroom 3', 'bed'],
        [0, 70, 140, 20, 'Terrace', 'bal'],
      ],
    },
  },
};

const TYPICAL = {
  label: 'Typical floor plan of levels 02 – 10',
  core: [76, 12, 48, 70],
  units: [
    { id: 'A', poly: '18,12 74,12 74,42 18,42' },
    { id: 'A', poly: '126,12 182,12 182,42 126,42' },
    { id: 'B', poly: '18,44 74,44 74,84 18,84' },
    { id: 'B', poly: '126,44 182,44 182,84 126,84' },
    { id: 'C', poly: '60,84 140,84 140,112 60,112' },
  ],
};

const UPPER = {
  label: 'Typical floor plan of levels 11 – 14',
  core: [76, 12, 48, 92],
  units: [
    { id: 'D', poly: '14,12 74,12 74,62 14,62' },
    { id: 'D', poly: '126,12 186,12 186,62 126,62' },
    { id: 'C', poly: '14,64 74,64 74,108 14,108' },
    { id: 'C', poly: '126,64 186,64 186,108 126,108' },
  ],
};

const CROWN = {
  label: 'Floor plan of level 15 — Penthouse',
  core: [96, 18, 28, 80],
  units: [
    { id: 'P', poly: '12,10 94,10 94,110 30,110 12,92' },
    { id: 'S', poly: '126,10 188,10 188,84 126,84' },
  ],
};

export const LEVELS = Array.from({ length: 15 }, (_, i) => {
  const n = i + 1;
  const floor = n === 15 ? CROWN : n >= 11 ? UPPER : TYPICAL;
  const mix = [...new Set(floor.units.map((u) => UNITS[u.id].name))];
  return { n, ...floor, mix };
});

export const AMENITIES = [
  { name: 'Zen Garden', img: 'garden', note: 'Ornamental grasses, shaded seating, slow mornings.' },
  { name: 'Yoga Studio', img: 'gym', note: 'Oak-lined and daylit, for the first stretch of the day.' },
  { name: 'Modern Well-Equipped Gym', img: 'gym', note: 'Strength, cardio and recovery under one roof.' },
  { name: 'Walking Track', img: 'masterplan', note: 'A planted loop around the podium deck.' },
  { name: 'Adults Swimming Pool', img: 'pool', note: 'A rooftop edge that runs into the skyline.' },
  { name: 'Steam Rooms with Personal Lockers', img: 'spa', note: 'Warm timber, low light, nothing to hurry for.' },
  { name: 'Open Terrace for Socials', img: 'terrace', note: 'Long tables for long evenings.' },
  { name: 'Jacuzzi', img: 'pool', note: 'Hydrotherapy with a view.' },
  { name: 'Kids Play Area', img: 'kids', note: 'Natural timber, soft ground, endless loops.' },
  { name: 'Padel Court', img: 'padel', note: 'Glass-walled and floodlit for evening matches.' },
  { name: 'Cricket Simulator', img: 'padel', note: 'Bowling-machine nets beside the court.' },
  { name: 'Kids Swimming Pool', img: 'masterplan', note: 'Shallow, shaded and in sight of the deck.' },
];

export const ROOMS = [
  { name: 'The Living Room', img: 'living', tag: 'Gather, unwind' },
  { name: 'The Kitchen', img: 'kitchen', tag: 'Italian fitted' },
  { name: 'The Bedroom', img: 'bedroom', tag: 'Rooms made to return to' },
  { name: 'The Bathroom', img: 'bathroom', tag: 'Stone & brass' },
];

export const STATS = [
  { n: 5, label: 'Ibn Battuta Mall', sub: 'Minutes by car' },
  { n: 5, label: 'Sheikh Zayed Road', sub: 'Minutes by car' },
  { n: 12, label: 'Expo City Dubai', sub: 'Minutes by car' },
  { n: 25, label: 'Downtown Dubai', sub: 'Minutes by car' },
];

export const HOTSPOTS = [
  { x: 30, y: 30, label: 'Adults Swimming Pool' },
  { x: 25, y: 76, label: 'Kids Swimming Pool' },
  { x: 70, y: 46, label: 'Padel Court' },
  { x: 59, y: 80, label: 'Cabanas & Socials' },
  { x: 86, y: 70, label: 'Walking Track' },
  { x: 52, y: 40, label: 'Residences Tower' },
];
