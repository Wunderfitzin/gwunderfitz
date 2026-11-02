// All pictures in one style: flat shapes from one palette on a pale round
// background. Keyed by the emoji used in the content files, so a text without a
// drawing still shows its emoji.
const C = {
  red: '#d9534f', orange: '#e8873a', yellow: '#f2c14e', green: '#4caf6e', teal: '#1f8a7a', blue: '#3f7fc1', sky: '#bfe3f2',
  navy: '#2f3a4a', purple: '#7a4fb0', pink: '#e58aa6', brown: '#9a6238', tan: '#e9c9a0', cream: '#f6ecd8', grey: '#b9c1bf',
  dark: '#6b7775', white: '#fff', ink: '#23302f',
};

const art = (body) => `<svg viewBox="0 0 120 90" role="presentation"><circle cx="60" cy="45" r="44" fill="#e6efec"/>${body}</svg>`;
const rect = (x, y, w, h, fill, r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const dot = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const path = (d, fill) => `<path d="${d}" fill="${fill}"/>`;
const line = (d, color, width = 4) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const eyes = (x1, x2, y) => dot(x1, y, 2.4, C.ink) + dot(x2, y, 2.4, C.ink);

// A drawn person from pictures.js, framed to sit on the same background.
const scene = (...people) => {
  const figures = people.map(([who, x, options = {}]) => drawFigure(who, { x, ...options })).join('');
  return `<svg viewBox="-18 30 147 110" role="presentation"><circle cx="55" cy="85" r="53" fill="#e6efec"/>${figures}</svg>`;
};

function numberTile(n) {
  const rowStart = (count) => 60 - ((count - 1) * 14) / 2;
  const dots = Array.from({ length: n }, (_, i) => dot(rowStart(i < 5 ? Math.min(n, 5) : n - 5) + (i % 5) * 14, 66 + Math.floor(i / 5) * 9, 4, C.orange)).join('');
  return art(rect(32, 8, 56, 46, C.teal, 10) + `<text x="60" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" font-weight="700" fill="#fff">${n}</text>${dots}`);
}

const animalFace = (ears, face, details) => art(ears + face + details);

// Feeling faces: one round face; the feeling shows in brows, eyes and mouth.
const FACE_EYES = {
  open: dot(49, 40, 3, C.ink) + dot(71, 40, 3, C.ink),
  happy: line('M44 42q5-6 10 0M66 42q5-6 10 0', C.ink, 3),
  closed: line('M44 40q5 4 10 0M66 40q5 4 10 0', C.ink, 3),
  wide: dot(49, 40, 6, C.white) + dot(71, 40, 6, C.white) + dot(49, 40, 3, C.ink) + dot(71, 40, 3, C.ink),
  down: dot(49, 44, 3, C.ink) + dot(71, 44, 3, C.ink),
  sleepy: line('M44 42h10M66 42h10', C.ink, 3),
};
const FACE_BROWS = {
  none: '',
  angry: line('M42 29l12 6M78 29l-12 6', C.ink, 3),
  worried: line('M43 34l11-5M77 34l-11-5', C.ink, 3),
  raised: line('M43 31q6-5 11 0M66 31q6-5 11 0', C.ink, 3),
  confused: line('M43 33h11M66 31q6-5 11 0', C.ink, 3),
};
const FACE_MOUTHS = {
  smile: line('M48 54q12 10 24 0', C.ink, 3),
  small: line('M52 57q8 5 16 0', C.ink, 3),
  big: path('M45 52h30q-2 17-15 17t-15-17z', C.ink) + path('M52 64q8 5 16 0q-8-4-16 0z', C.red),
  frown: line('M48 63q12-10 24 0', C.ink, 3),
  flat: line('M51 59h18', C.ink, 3),
  o: `<ellipse cx="60" cy="59" rx="5" ry="6" fill="${C.ink}"/>`,
  yawn: `<ellipse cx="60" cy="58" rx="7" ry="10" fill="${C.ink}"/>`,
  teeth: `<rect x="46" y="53" width="28" height="11" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="2"/>` + line('M46 58.5h28M53 53v11M60 53v11M67 53v11', C.ink, 1.5),
  wavy: line('M47 59q4-4 8 0t8 0t8 0', C.ink, 3),
};
const FACE_EXTRAS = {
  tear: path('M76 47q5 8 0 11q-5-3 0-11z', C.blue),
  sweat: path('M87 22q5 8 0 11q-5-3 0-11z', '#7fb8e6'),
  question: `<text x="90" y="30" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="${C.purple}">?</text>`,
  zz: `<text x="88" y="26" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="${C.purple}">z z</text>`,
  puff: line('M81 57h12M83 63h8', C.grey, 3),
  star: path('M95 9l3 6 6.5 1-4.7 4.5 1.1 6.5-5.9-3.1-5.9 3.1 1.1-6.5-4.7-4.5 6.5-1z', C.orange),
  blush: dot(42, 53, 4.5, C.pink) + dot(78, 53, 4.5, C.pink),
  others: dot(99, 66, 5, C.grey) + dot(109, 70, 5, C.grey) + dot(104, 78, 5, C.grey),
};

function feelingFace({ skin = C.yellow, eyes = 'open', brows = 'none', mouth = 'smile', extra = [] }) {
  return art(dot(60, 45, 30, skin) + FACE_BROWS[brows] + FACE_EYES[eyes] + FACE_MOUTHS[mouth] + extra.map((key) => FACE_EXTRAS[key]).join(''));
}

const heart = (x, y, size, fill) => path(`M${x} ${y + size}c${-size} ${-size * 0.8} ${-size * 1.2} ${-size * 1.5} ${-size * 0.8} ${-size * 1.9} ${size * 0.3} ${-size * 0.3} ${size * 0.7} ${-size * 0.2} ${size * 0.8} ${size * 0.1} ${size * 0.1} ${-size * 0.3} ${size * 0.5} ${-size * 0.4} ${size * 0.8} ${-size * 0.1} ${size * 0.4} ${size * 0.4} ${size * 0.2} ${size} ${-size * 0.8} ${size * 1.9}z`, fill);

const DRAWINGS = {
  // Begrüssung
  '🤝': scene(['speaker', 18, { arm: 'shake' }], ['boetschi', 92, { dir: -1, arm: 'shake' }]),
  '👋': scene(['listener', 55, { arm: 'point' }]),
  '🌅': art(path('M16 62a44 44 0 0 0 88 0z', C.blue) + dot(60, 50, 18, C.yellow) + rect(12, 58, 96, 5, C.orange, 2) + line('M60 22v-10M34 32l-7-7M86 32l7-7', C.orange)),
  '🚪': art(rect(38, 12, 44, 68, C.brown, 3) + rect(44, 18, 32, 24, '#b57a4a', 2) + rect(44, 48, 32, 26, '#b57a4a', 2) + dot(73, 46, 3, C.yellow)),
  '🖐️': scene(['woman', 55, { arm: 'point', dir: -1 }]),
  '🙏': art(path('M60 74C30 54 26 38 34 28c8-9 20-6 26 4 6-10 18-13 26-4 8 10 4 26-26 46z', C.red)),
  '💁': art(path('M60 18l12 22 24 4-17 17 4 24-23-11-23 11 4-24-17-17 24-4z', C.yellow)),
  '😔': art(dot(60, 45, 30, C.yellow) + eyes(49, 71, 40) + line('M48 62q12-9 24 0', C.ink, 3) + path('M76 46q5 9 0 12q-5-3 0-12z', C.blue)),
  '✅': art(dot(60, 45, 32, C.green) + line('M44 46l11 11 21-23', C.white, 7)),
  '❌': art(dot(60, 45, 32, C.red) + line('M46 31l28 28M74 31l-28 28', C.white, 7)),
  '🪪': art(rect(24, 22, 72, 46, C.white, 6) + rect(24, 22, 72, 12, C.teal, 6) + dot(42, 50, 8, C.tan) + line('M58 46h26M58 56h18', C.grey)),
  '🤷': art(dot(60, 45, 30, C.tan) + `<text x="60" y="58" text-anchor="middle" font-family="system-ui, sans-serif" font-size="38" font-weight="700" fill="${C.red}">?</text>`),

  // Zahlen
  '1️⃣': numberTile(1), '2️⃣': numberTile(2), '3️⃣': numberTile(3), '4️⃣': numberTile(4), '5️⃣': numberTile(5),
  '6️⃣': numberTile(6), '7️⃣': numberTile(7), '8️⃣': numberTile(8), '9️⃣': numberTile(9), '🔟': numberTile(10),

  // Schule
  '🏫': art(rect(26, 36, 68, 42, C.cream, 2) + path('M20 38 60 14l40 24z', C.red) + rect(52, 56, 16, 22, C.brown) + rect(34, 46, 12, 10, C.sky) + rect(74, 46, 12, 10, C.sky) + dot(60, 40, 6, C.white)),
  '👩‍🏫': scene(['schwegler', 55]),
  '👨‍🏫': scene(['boetschi', 55]),
  '📓': art(rect(38, 14, 44, 62, C.blue, 4) + rect(38, 14, 8, 62, C.navy, 3) + rect(52, 26, 24, 12, C.white, 2)),
  '📕': art(rect(36, 14, 48, 62, C.red, 4) + rect(40, 66, 44, 7, C.cream) + line('M48 28h26M48 38h18', C.white, 3)),
  '✏️': art(path('M28 72l6-18 42-42 12 12-42 42z', C.yellow) + path('M28 72l6-18 12 12z', C.tan) + path('M28 72l2-6 4 4z', C.ink) + path('M76 12l12 12 5-5a4 4 0 0 0 0-6l-6-6a4 4 0 0 0-6 0z', C.pink)),
  '🎒': art(line('M44 24c0-16 32-16 32 0', C.navy, 4) + rect(34, 22, 52, 56, C.teal, 14) + rect(42, 48, 36, 22, C.yellow, 5) + rect(56, 44, 8, 10, C.navy, 2)),
  '🪑': art(rect(40, 12, 8, 66, C.brown, 2) + rect(40, 44, 44, 9, '#b57a4a', 3) + rect(76, 48, 8, 30, C.brown, 2) + rect(44, 14, 8, 26, '#b57a4a')),
  '🔔': art(path('M60 14c-16 0-22 12-22 28 0 12-6 16-8 20h60c-2-4-8-8-8-20 0-16-6-28-22-28z', C.yellow) + dot(60, 68, 7, C.orange) + dot(60, 12, 4, C.orange)),
  '📝': art(rect(34, 12, 50, 66, C.white, 4) + line('M42 26h34M42 38h34M42 50h22', C.grey, 3) + path('M62 66l3-10 22-22 8 8-22 22z', C.orange)),
  '🥨': art(line('M44 60C20 50 24 22 44 26c12 2 18 26 34 34M76 60c24-10 20-38 0-34-12 2-18 26-34 34', C.brown, 9) + dot(44, 34, 1.6, C.white) + dot(76, 34, 1.6, C.white) + dot(60, 44, 1.6, C.white)),
  '🤸': scene(['child', 55, { arm: 'point', s: 1.3 }]),

  // Familie
  '👨‍👩‍👧': scene(['man', 18, { s: 0.92 }], ['woman', 55, { s: 0.92 }], ['child', 88, { s: 1 }]),
  '👩': scene(['woman', 55]),
  '👨': scene(['man', 55]),
  '👧': scene(['girl', 55]),
  '👦': scene(['child', 55, { s: 1.25 }]),
  '👶': art(dot(60, 40, 24, C.tan) + eyes(52, 68, 38) + line('M54 48q6 5 12 0', C.ink, 2.5) + path('M38 62c6-6 38-6 44 0v16H38z', C.sky) + dot(60, 18, 3, C.brown)),
  '👵': scene(['oldwoman', 55]),
  '👴': scene(['grandpa', 55]),

  // Essen
  '🥖': art(path('M22 66C14 56 74 12 92 18c10 6 2 16-12 28C60 62 34 76 22 66z', '#d9a35b') + line('M42 44l10 8M56 34l10 8M70 24l9 7', C.cream, 4)),
  '🍎': art(path('M60 28c-26-12-40 12-32 32 6 16 18 24 32 16 14 8 26 0 32-16 8-20-6-44-32-32z', C.red) + line('M60 28c0-8 3-14 8-18', C.brown, 4) + path('M64 18c6-8 16-8 20-4-4 8-14 10-20 4z', C.green)),
  '💧': art(path('M60 10c14 22 26 32 26 46a26 26 0 0 1-52 0c0-14 12-24 26-46z', C.blue) + line('M46 58c0 8 6 12 12 13', C.sky, 4)),
  '🥛': art(path('M38 14h44l-6 64H44z', C.white) + path('M40 34h40l-4 44H44z', '#dfe7ea') + rect(36, 12, 48, 4, C.grey, 2)),
  '🧀': art(path('M16 52 74 22l30 30v22H16z', C.yellow) + path('M16 52h88l-30-30z', '#f7d98b') + dot(42, 64, 6, C.orange) + dot(72, 62, 4, C.orange) + dot(90, 66, 3, C.orange)),
  '🍗': art(path('M38 18c20-10 42 8 36 28-4 14-20 20-30 14-18-8-22-34-6-42z', '#c98238') + line('M62 54l20 20', C.cream, 8) + dot(86, 72, 5, C.cream) + dot(80, 78, 5, C.cream)),
  '🥚': art(path('M60 12c16 0 28 26 28 40a28 28 0 0 1-56 0c0-14 12-40 28-40z', C.cream) + line('M44 44c0-8 4-14 8-18', C.white, 4)),
  '🍚': art(path('M26 42a34 26 0 0 1 68 0z', C.white) + path('M22 42h76c0 18-14 34-38 34S22 60 22 42z', C.blue) + dot(46, 32, 2, C.grey) + dot(62, 26, 2, C.grey) + dot(74, 34, 2, C.grey)),
  '🥔': art(path('M30 28c20-20 62-8 62 22 0 26-46 36-62 16-10-12-10-28 0-38z', '#c49a5e') + dot(50, 38, 2.5, C.brown) + dot(70, 34, 2.5, C.brown) + dot(62, 56, 2.5, C.brown) + dot(80, 52, 2.5, C.brown)),
  '🍫': art(rect(34, 12, 52, 66, '#6b3f26', 5) + rect(40, 18, 18, 16, '#8a5634', 2) + rect(62, 18, 18, 16, '#8a5634', 2) + rect(40, 38, 18, 16, '#8a5634', 2) + rect(62, 38, 18, 16, '#8a5634', 2) + rect(34, 58, 52, 20, C.red, 4)),

  // Unterwegs
  '🚉': art(path('M18 44 60 18l42 26z', '#a8533a') + rect(26, 44, 68, 34, C.cream) + dot(60, 36, 7, C.white) + line('M60 36v-4M60 36l3 2', C.ink, 2) + path('M34 78V60a7 7 0 0 1 14 0v18zM53 78V60a7 7 0 0 1 14 0v18zM72 78V60a7 7 0 0 1 14 0v18z', C.teal)),
  '🚆': art(path('M12 38a10 10 0 0 1 10-10h86v38H12z', C.red) + rect(26, 35, 16, 13, C.sky, 2) + rect(50, 35, 16, 13, C.sky, 2) + rect(74, 35, 16, 13, C.sky, 2) + rect(12, 54, 96, 3, C.white) + dot(32, 70, 5, C.ink) + dot(88, 70, 5, C.ink) + rect(12, 76, 96, 3, C.dark)),
  '🚊': art(line('M18 8h84', C.dark, 2) + line('M60 8 50 22h20z', C.ink, 2.5) + rect(30, 22, 60, 46, C.blue, 9) + rect(37, 30, 20, 16, C.sky, 2) + rect(63, 30, 20, 16, C.sky, 2) + rect(30, 54, 60, 3, C.white) + dot(44, 71, 5, C.ink) + dot(76, 71, 5, C.ink) + rect(18, 76, 84, 3, C.dark)),
  '🚌': art(rect(18, 24, 84, 44, C.yellow, 8) + rect(26, 32, 18, 14, C.sky, 2) + rect(50, 32, 18, 14, C.sky, 2) + rect(74, 32, 18, 14, C.sky, 2) + rect(18, 52, 84, 3, C.orange) + dot(38, 70, 8, C.ink) + dot(82, 70, 8, C.ink)),
  '🚲': art(line('M36 62 50 34h26l10 28M50 34l14 28H36M76 34l-4-10h-8M50 34l-4-8h-8', C.teal, 4) + `<circle cx="36" cy="62" r="15" fill="none" stroke="${C.ink}" stroke-width="4"/><circle cx="86" cy="62" r="15" fill="none" stroke="${C.ink}" stroke-width="4"/>`),
  '🎫': art(path('M16 28h88v12a6 6 0 0 0 0 12v12H16V52a6 6 0 0 0 0-12z', C.orange) + line('M78 30v30', C.white, 2) + line('M28 38h36M28 50h24', C.white, 4)),
  '🛣️': art(path('M50 10h20l26 70H24z', C.dark) + line('M60 14v10M60 34v12M60 56v16', C.white, 4)),
  '🚸': art(rect(16, 60, 88, 18, C.dark) + rect(16, 46, 88, 14, C.grey) + rect(16, 44, 88, 4, C.cream) + line('M34 69h10M56 69h10M78 69h10', C.white, 3) + person0(60)),
  '💊': art(`<g transform="rotate(-35 60 45)">` + rect(24, 30, 72, 30, C.white, 15) + path('M60 30H39a15 15 0 0 0 0 30h21z', C.red) + `</g>`),
  '🏥': art(rect(26, 22, 68, 56, C.white, 4) + rect(52, 30, 16, 30, C.red, 2) + rect(45, 37, 30, 16, C.red, 2) + rect(52, 64, 16, 14, C.blue)),

  // Verben
  '📚': art(rect(26, 58, 68, 14, C.blue, 3) + rect(32, 42, 60, 14, C.red, 3) + rect(28, 26, 62, 14, C.green, 3)),
  '🛠️': art(`<g transform="rotate(40 60 45)">` + rect(54, 28, 12, 56, C.brown, 4) + rect(34, 12, 52, 22, C.dark, 4) + `</g>`),
  '⚽': art(dot(60, 45, 32, C.white) + path('M60 32l12 9-5 14H53l-5-14z', C.ink) + line('M60 32V14M72 41l17-6M67 55l11 14M53 55 42 69M48 41l-17-6', C.ink, 3)),
  '🏠': art(path('M18 46 60 12l42 34z', C.red) + rect(30, 44, 60, 34, C.cream) + rect(52, 56, 16, 22, C.brown) + rect(36, 52, 11, 11, C.sky) + rect(73, 52, 11, 11, C.sky)),
  '🍳': art(path('M26 44h68v10c0 16-12 24-34 24S26 70 26 54z', C.navy) + rect(20, 42, 80, 6, C.dark, 3) + rect(18, 52, 8, 6, C.dark, 2) + rect(94, 52, 8, 6, C.dark, 2) + line('M46 32c-5-6 5-9 0-16M60 32c-5-6 5-9 0-16M74 32c-5-6 5-9 0-16', C.grey, 3)),
  '🎧': art(line('M30 54V46a30 30 0 0 1 60 0v8', C.navy, 7) + rect(22, 50, 16, 26, C.teal, 7) + rect(82, 50, 16, 26, C.teal, 7)),
  '🛒': art(line('M18 20h12l10 40h44l8-30H34', C.navy, 5) + path('M36 32h54l-7 26H42z', C.sky) + dot(46, 74, 6, C.ink) + dot(80, 74, 6, C.ink)),
  '🥤': art(path('M38 26h44l-6 52H44z', C.red) + rect(34, 22, 52, 7, C.white, 3) + line('M64 22 70 6h10', C.teal, 4)),
  '🚶': scene(['listener', 55, { arm: 'point' }]).replace('</svg>', `${line('M112 92h14M116 84l10 8-10 8', C.orange, 4)}</svg>`),
  '➡️': art(rect(24, 16, 34, 62, C.brown, 3) + dot(51, 48, 3, C.yellow) + line('M104 47H68M80 35 68 47l12 12', C.orange, 7)),
  '🤲': art(rect(38, 18, 44, 36, C.orange, 4) + rect(56, 18, 8, 36, C.yellow) + path('M18 58c14-6 26 8 42 8s28-14 42-8l-8 16H26z', C.tan)),
  '🧍': scene(['speaker', 55]),
  '🚗': art(path('M16 56c0-8 8-10 14-10l10-16h36l14 16c8 0 14 3 14 10v10H16z', C.blue) + path('M44 34h14v12H36zM62 34h13l9 12H62z', C.sky) + dot(38, 68, 9, C.ink) + dot(84, 68, 9, C.ink)),
  '😴': art(rect(16, 50, 88, 18, C.blue, 4) + rect(16, 44, 34, 12, C.white, 5) + rect(14, 40, 6, 38, C.brown, 2) + rect(100, 52, 6, 26, C.brown, 2) + dot(36, 40, 10, C.tan) + `<text x="66" y="30" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="${C.purple}">Z z</text>`),
  '🍽️': art(dot(60, 45, 28, C.white) + dot(60, 45, 19, '#dfe7ea') + line('M16 18v18c0 5 8 5 8 0V18M20 36v38', C.dark, 3) + line('M100 74V16c-8 6-8 26 0 28', C.dark, 3)),
  '💬': art(path('M16 18h56a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H36L24 68V56h-8a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z', C.teal) + path('M58 42h48a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-6v10L88 72H58a6 6 0 0 1-6-6V48a6 6 0 0 1 6-6z', C.orange)),
  '📖': art(path('M60 26C48 16 30 16 18 20v50c12-4 30-4 42 6 12-10 30-10 42-6V20c-12-4-30-4-42 6z', C.white) + line('M60 26v50', C.grey, 2) + line('M28 32c8-2 16-1 22 2M28 44c8-2 16-1 22 2M92 32c-8-2-16-1-22 2M92 44c-8-2-16-1-22 2', C.grey, 3)),
  '👀': art(path('M14 45C32 16 88 16 106 45 88 74 32 74 14 45z', C.white) + dot(60, 45, 17, C.teal) + dot(60, 45, 8, C.ink) + dot(65, 40, 3, C.white)),

  // Themen und Kurse
  '🔢': art(`<text x="60" y="58" text-anchor="middle" font-family="system-ui, sans-serif" font-size="34" font-weight="700" fill="${C.teal}">123</text>`),
  '📐': art(path('M24 74V16l66 58z', C.yellow) + path('M36 62V42l23 20z', '#e6efec')),
  '🔤': art(`<text x="60" y="60" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" font-weight="700" fill="${C.orange}">Abc</text>`),

  // Oberfläche
  // Perfekt
  '⏪': art(dot(64, 46, 28, C.teal) + dot(64, 46, 22, C.white) + line('M64 46V32M64 46l-10 6', C.ink, 3) + line('M30 24a40 40 0 0 0-8 22', C.orange, 5) + path('M20 18l16 4-10 12z', C.orange)),
  '🛋️': art(rect(26, 28, 68, 22, '#2aa08e', 8) + rect(22, 44, 76, 22, C.teal, 6) + rect(14, 38, 16, 30, C.teal, 7) + rect(90, 38, 16, 30, C.teal, 7) + rect(22, 66, 6, 10, C.brown, 2) + rect(92, 66, 6, 10, C.brown, 2)),
  '📞': art(rect(40, 10, 40, 70, C.navy, 8) + rect(45, 18, 30, 48, C.sky, 3) + dot(60, 73, 3, C.white) + line('M88 26a14 14 0 0 1 0 18M96 18a26 26 0 0 1 0 34', C.orange, 4)),
  '💡': art(line('M60 6v7M30 18l5 5M90 18l-5 5M22 40h7M91 40h7', C.orange, 3) + dot(60, 40, 21, C.yellow) + rect(50, 56, 20, 8, C.yellow, 2) + rect(50, 62, 20, 12, C.grey, 3) + line('M52 67h16', C.dark, 2)),
  '💰': art(rect(22, 62, 34, 9, C.orange, 4) + rect(24, 53, 34, 9, C.yellow, 4) + rect(22, 44, 34, 9, C.orange, 4) + dot(78, 48, 20, C.yellow) + dot(78, 48, 15, C.orange) + `<text x="78" y="54" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#fff">Fr.</text>`),
  '🛍️': art(path('M32 32h56l6 46H26z', C.pink) + line('M46 38V26a14 14 0 0 1 28 0v12', C.navy, 4) + dot(46, 40, 3, C.navy) + dot(74, 40, 3, C.navy)),
  '⏰': art(line('M42 72l-6 8M78 72l6 8', C.ink, 4) + dot(38, 22, 10, C.red) + dot(82, 22, 10, C.red) + dot(60, 48, 27, C.red) + dot(60, 48, 21, C.white) + line('M60 48V35M60 48l9 5', C.ink, 3)),
  '🌙': art(path('M66 12a34 34 0 1 0 30 48 27 27 0 1 1-30-48z', C.yellow) + `<text x="70" y="40" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="${C.purple}">Z z</text>`),
  '💼': art(line('M48 30v-8h24v8', C.navy, 4) + rect(24, 30, 72, 44, C.brown, 6) + rect(24, 46, 72, 4, '#7a4a25') + rect(55, 43, 10, 10, C.yellow, 2)),
  '⏳': art(path('M42 16h36c0 18-14 22-14 29s14 11 14 29H42c0-18 14-22 14-29s-14-11-14-29z', C.sky) + path('M50 24h20c-2 6-10 9-10 14 0-5-8-8-10-14z', C.yellow) + path('M46 72c2-9 11-12 14-17 3 5 12 8 14 17z', C.yellow) + rect(36, 10, 48, 7, C.brown, 3) + rect(36, 73, 48, 7, C.brown, 3)),
  '🔊': art(path('M28 36h14l20-16v50L42 54H28z', C.teal) + line('M72 32a18 18 0 0 1 0 26M82 22a32 32 0 0 1 0 46', C.teal, 5)),

  // Gut miteinander reden: Gefühle
  '🙂': feelingFace({ mouth: 'smile' }),
  '😢': feelingFace({ brows: 'worried', mouth: 'frown', extra: ['tear'] }),
  '😠': feelingFace({ skin: '#f29b5c', brows: 'angry', mouth: 'frown' }),
  '😨': feelingFace({ eyes: 'wide', brows: 'worried', mouth: 'o', extra: ['sweat'] }),
  '🥱': feelingFace({ eyes: 'sleepy', mouth: 'yawn', extra: ['zz'] }),
  '😬': feelingFace({ brows: 'worried', mouth: 'teeth', extra: ['sweat'] }),
  '😌': feelingFace({ eyes: 'closed', mouth: 'small' }),
  '😄': feelingFace({ eyes: 'happy', mouth: 'big', extra: ['blush'] }),
  '😊': feelingFace({ eyes: 'closed', brows: 'raised', mouth: 'smile', extra: ['star'] }),
  '😮‍💨': feelingFace({ eyes: 'closed', brows: 'raised', mouth: 'o', extra: ['puff'] }),
  '😞': feelingFace({ eyes: 'down', brows: 'worried', mouth: 'frown' }),
  '😶': feelingFace({ eyes: 'down', mouth: 'flat', extra: ['others'] }),
  '😕': feelingFace({ brows: 'confused', mouth: 'wavy', extra: ['question'] }),
  '🚦': art(rect(18, 24, 84, 42, C.navy, 12) + dot(42, 45, 13, '#5a2a2a') + dot(42, 45, 9, C.red) + dot(78, 45, 13, '#22452f') + dot(78, 45, 9, C.green)),
  '💞': art(heart(52, 26, 22, C.red) + heart(82, 18, 12, C.pink)),
  // Gut miteinander reden: Bedürfnisse
  '🔇': art(path('M26 36h14l20-16v50L40 54H26z', C.teal) + line('M72 34l18 18M90 34l-18 18', C.red, 5)),
  '🛡️': art(path('M60 10l30 10v20c0 20-14 32-30 40-16-8-30-20-30-40V20z', C.teal) + line('M46 44l10 10 18-20', C.white, 5)),
  '🫂': scene(['girl', 24, { arm: 'shake' }], ['child', 84, { dir: -1, arm: 'shake' }]).replace('</svg>', `${heart(55, 44, 9, C.red)}</svg>`),
  '🫱': scene(['woman', 20, { arm: 'shake' }], ['man', 90, { dir: -1, arm: 'shake' }]),
  '🫴': scene(['listener', 22, { arm: 'shake' }], ['child', 84, { dir: -1, arm: 'shake' }]),
  '🎈': art(line('M46 46q-2 14 8 30M72 40q2 18-10 36M60 56v20', C.dark, 2) + dot(46, 32, 14, C.red) + dot(74, 28, 14, C.yellow) + dot(60, 46, 12, C.blue)),
  '🗂️': art(rect(28, 26, 14, 48, C.red, 2) + rect(44, 26, 14, 48, C.teal, 2) + rect(60, 26, 14, 48, C.yellow, 2) + rect(76, 26, 14, 48, C.purple, 2) + rect(22, 74, 76, 5, C.brown, 2)),

  // Tiere der Profile
  '🦊': animalFace(path('M30 34 26 10l24 14zM90 34l4-24-24 14z', C.orange), path('M26 30h68c0 22-16 40-34 48-18-8-34-26-34-48z', C.orange) + path('M26 30c6 18 22 26 34 48 12-22 28-30 34-48-14 4-24 14-34 24-10-10-20-20-34-24z', C.white), eyes(46, 74, 40) + dot(60, 74, 4, C.ink)),
  '🐻': animalFace(dot(34, 22, 12, C.brown) + dot(86, 22, 12, C.brown), dot(60, 46, 34, C.brown), dot(60, 56, 15, C.tan) + eyes(47, 73, 38) + dot(60, 50, 4, C.ink)),
  '🐼': animalFace(dot(34, 20, 11, C.ink) + dot(86, 20, 11, C.ink), dot(60, 46, 34, C.white), dot(46, 40, 9, C.ink) + dot(74, 40, 9, C.ink) + dot(46, 40, 2.4, C.white) + dot(74, 40, 2.4, C.white) + dot(60, 54, 4, C.ink)),
  '🦉': animalFace(path('M30 26 24 8l22 10zM90 26l6-18-22 10z', C.brown), path('M26 40c0-34 68-34 68 0v30c0 8-68 8-68 0z', C.brown), dot(45, 38, 13, C.white) + dot(75, 38, 13, C.white) + dot(45, 38, 5, C.ink) + dot(75, 38, 5, C.ink) + path('M54 48h12l-6 10z', C.orange)),
  '🐢': animalFace('', path('M20 60a34 30 0 0 1 68 0z', C.green) + line('M34 46l20-14 20 14M54 32v28', '#2f7d4d', 3), dot(96, 46, 11, '#7cc08f') + dot(99, 44, 2.2, C.ink) + rect(26, 58, 12, 12, '#7cc08f', 4) + rect(70, 58, 12, 12, '#7cc08f', 4)),
  '🦁': animalFace(dot(60, 45, 40, C.orange), dot(60, 46, 27, C.yellow), eyes(49, 71, 40) + path('M54 52h12l-6 7z', C.ink)),
  '🐸': animalFace(dot(40, 22, 12, C.green) + dot(80, 22, 12, C.green), path('M24 50c0-34 72-34 72 0 0 22-72 22-72 0z', C.green), dot(40, 22, 6, C.white) + dot(80, 22, 6, C.white) + dot(40, 22, 3, C.ink) + dot(80, 22, 3, C.ink) + line('M42 54q18 12 36 0', C.ink, 3)),
  '🐙': animalFace('', path('M34 40a26 26 0 0 1 52 0v8c0 8 10 12 14 24-8 2-14-2-18-8 0 8-2 12-6 16-4-4-6-8-6-14-2 6-4 10-10 14-6-4-8-8-10-14 0 6-2 10-6 14-4-4-6-8-6-16-4 6-10 10-18 8 4-12 14-16 14-24z', C.purple), eyes(50, 70, 40)),
  '🦋': animalFace('', path('M58 42C44 8 14 12 18 36c2 12 22 12 40 6zM62 42c14-34 44-30 40-6-2 12-22 12-40 6zM58 46c-18-2-32 4-30 18 2 12 24 8 30-18zM62 46c18-2 32 4 30 18-2 12-24 8-30-18z', C.orange), rect(57, 26, 6, 44, C.ink, 3) + line('M58 26l-8-12M62 26l8-12', C.ink, 2)),
  '🐝': animalFace(path('M44 24c-4-22 22-20 14 2zM76 24c4-22-22-20-14 2z', C.sky), rect(28, 28, 64, 42, C.yellow, 20) + rect(50, 28, 11, 42, C.ink) + rect(70, 28, 11, 42, C.ink), dot(38, 46, 3, C.ink)),
  '🐧': animalFace('', path('M60 8c20 0 28 22 28 44 0 22-14 30-28 30S32 74 32 52c0-22 8-44 28-44z', C.navy) + path('M60 26c12 0 16 14 16 28 0 16-8 22-16 22s-16-6-16-22c0-14 4-28 16-28z', C.white), eyes(52, 68, 26) + path('M54 32h12l-6 8z', C.orange)),
  '🦔': animalFace('', path('M18 62C20 34 40 20 64 20c18 0 30 10 36 24l-10 2 6 8-12 0 4 10z', C.brown), path('M72 40c12 0 26 10 30 24H62c0-14 2-24 10-24z', C.tan) + dot(84, 50, 2.4, C.ink) + dot(103, 63, 3.5, C.ink)),
};

function person0(x) {
  return dot(x, 22, 7, C.tan) + rect(x - 6, 30, 12, 18, C.teal, 4) + line(`M${x - 3} 48l-5 14M${x + 3} 48l6 14`, C.navy, 4);
}
