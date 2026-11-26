// Profile pictures: 15 comic learner types instead of animals. Head and shoulders on a
// pastel circle, with a thin dark outline. Keys 'av-…' live in DRAWINGS like every picture.
// Old animal profiles keep working; new profiles choose from these.

const AV_LINE = '#2a2a2a';
const avOut = `stroke="${AV_LINE}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;

const AV_HAIR = {
  short: (c) => `<path d="M29 41c-1-22 43-23 42 0-5-8-13-11-21-10-9 0-16 4-21 10z" fill="${c}" ${avOut}/>`,
  buzz: (c) => `<path d="M30 38c2-17 38-17 40 0-6-5-13-7-20-7s-14 2-20 7z" fill="${c}" ${avOut}/>`,
  curly: (c) => [[33, 30], [40, 24], [50, 21], [60, 24], [67, 30], [71, 38], [29, 38]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c}" ${avOut}/>`).join(''),
  ponytail: (c) => `<path d="M68 34c10 2 13 16 8 28-2-9-5-14-9-17z" fill="${c}" ${avOut}/><path d="M29 41c-1-22 43-23 42 0-6-9-14-12-21-11-8 0-16 4-21 11z" fill="${c}" ${avOut}/>`,
  bun: (c) => `<circle cx="50" cy="18" r="8" fill="${c}" ${avOut}/><path d="M29 41c-1-22 43-23 42 0-6-9-14-12-21-11-8 0-16 4-21 11z" fill="${c}" ${avOut}/>`,
  long: (c) => `<path d="M28 44c-3-28 47-30 44 0v20c-4 3-8 3-10 0V40c-6-6-18-6-24 0v24c-2 3-6 3-10 0z" fill="${c}" ${avOut}/>`,
  hijab: (c) => `<path d="M26 48c-3-34 51-34 48 0l2 26H24z" fill="${c}" ${avOut}/>`,
};

// eyes: open, closed, happy, wink, cool (sunglasses), squint
function avFace({ eyes = 'open', mouth = 'smile', brows = true } = {}) {
  const eye = {
    open: `<circle cx="42" cy="44" r="2.6" fill="${AV_LINE}"/><circle cx="58" cy="44" r="2.6" fill="${AV_LINE}"/><circle cx="43" cy="43" r="0.8" fill="#fff"/><circle cx="59" cy="43" r="0.8" fill="#fff"/>`,
    closed: `<path d="M38 45q4 3 8 0M54 45q4 3 8 0" fill="none" ${avOut}/>`,
    happy: `<path d="M38 45q4-4 8 0M54 45q4-4 8 0" fill="none" ${avOut}/>`,
    wink: `<circle cx="42" cy="44" r="2.6" fill="${AV_LINE}"/><path d="M54 45q4-4 8 0" fill="none" ${avOut}/>`,
    squint: `<path d="M38 44h8M54 44h8" fill="none" ${avOut}/>`,
  }[eyes];
  const mouths = {
    smile: `<path d="M43 52q7 6 14 0" fill="none" ${avOut}/>`,
    grin: `<path d="M41 51h18q-2 8-9 8t-9-8z" fill="#fff" ${avOut}/><path d="M44 55q6 3 12 0" fill="none" stroke="#e57b8f" stroke-width="1.6"/>`,
    open: `<ellipse cx="50" cy="54" rx="4" ry="4.6" fill="${AV_LINE}"/><ellipse cx="50" cy="56" rx="2.4" ry="1.6" fill="#e57b8f"/>`,
    calm: `<path d="M45 53q5 2 10 0" fill="none" ${avOut}/>`,
    smirk: `<path d="M44 53q8 3 13-2" fill="none" ${avOut}/>`,
  }[mouth];
  const brow = brows ? `<path d="M38 38q4-2 8 0M54 38q4-2 8 0" fill="none" ${avOut}/>` : '';
  return `${brow}${eye}<circle cx="37" cy="50" r="3" fill="#f08a8a" opacity="0.3"/><circle cx="63" cy="50" r="3" fill="#f08a8a" opacity="0.3"/>${mouths}`;
}

// One learner: shirt, skin, hair, face, and things in front (`front`) or behind (`back`).
function avatar({ bg, skin, shirt, hair = 'short', hairColor = '#2a1d16', face = {}, back = '', front = '', top = '' }) {
  return `<svg viewBox="0 0 100 100" role="presentation"><circle cx="50" cy="50" r="48" fill="${bg}"/>${back}`
    + `<path d="M17 100c2-20 15-30 33-30s31 10 33 30z" fill="${shirt}" ${avOut}/>`
    + `<rect x="44" y="58" width="12" height="13" fill="${skin}" ${avOut}/>`
    + (hair === 'hijab' ? AV_HAIR.hijab(hairColor) : '')
    + `<circle cx="29" cy="45" r="4.5" fill="${skin}" ${avOut}/><circle cx="71" cy="45" r="4.5" fill="${skin}" ${avOut}/>`
    + `<circle cx="50" cy="43" r="21" fill="${skin}" ${avOut}/>`
    // A headscarf frames the face: the cloth also lies over the forehead.
    + (hair === 'hijab' ? `<path d="M28 44c-2-28 46-28 44 0-6-9-14-12-22-12s-16 3-22 12z" fill="${hairColor}" ${avOut}/>` : AV_HAIR[hair](hairColor))
    + avFace(face) + top + front + '</svg>';
}

const AV_SKIN = { a: '#f6d7bf', b: '#e9b98f', c: '#c98d5e', d: '#a66b42', e: '#7a4a2e', f: '#5e3a22' };
const AV_BG = { lilac: '#e6defd', peach: '#ffe0cf', mint: '#d4f3e2', sky: '#d6ebff', lemon: '#fbf0bf', rose: '#ffdce8' };

const AVATARS = [
  {
    key: 'av-muskel', name: 'Muskellerner',
    svg: avatar({ bg: AV_BG.mint, skin: AV_SKIN.d, shirt: '#7fd8a8', hair: 'buzz', face: { mouth: 'grin' },
      top: `<path d="M29 33h42" stroke="#ff9cc0" stroke-width="5" stroke-linecap="round"/>`,
      front: `<path d="M74 92c-2-10 0-18 8-22 6-3 10 2 8 7-2 4-6 4-8 2" fill="${AV_SKIN.d}" ${avOut}/><rect x="70" y="58" width="22" height="6" rx="2" fill="#6b7775" ${avOut}/><rect x="66" y="54" width="6" height="14" rx="2" fill="#b9a6ff" ${avOut}/><rect x="90" y="54" width="6" height="14" rx="2" fill="#b9a6ff" ${avOut}/>` }),
  },
  {
    key: 'av-buecherwurm', name: 'Bücherwurm',
    svg: avatar({ bg: AV_BG.peach, skin: AV_SKIN.a, shirt: '#ffb08a', hair: 'ponytail', hairColor: '#c9952e', face: { mouth: 'smile' },
      top: `<g fill="none" ${avOut}><circle cx="42" cy="44" r="6"/><circle cx="58" cy="44" r="6"/><path d="M48 44h4"/></g>`,
      front: `<path d="M30 100l2-18 18 4 18-4 2 18z" fill="#86c3ff" ${avOut}/><path d="M50 86v14" ${avOut}/>` }),
  },
  {
    key: 'av-nachteule', name: 'Nachteule',
    svg: avatar({ bg: '#d9d4f5', skin: AV_SKIN.f, shirt: '#8d84c9', hair: 'short', hairColor: '#140d08', face: { eyes: 'squint', mouth: 'calm' },
      top: `<path d="M28 34c4-18 40-22 46-2l8 8-4 2-6-6c-12-6-30-6-44-2z" fill="#6f5bd8" ${avOut}/><circle cx="82" cy="42" r="4" fill="#fff" ${avOut}/>`,
      front: `<rect x="62" y="78" width="16" height="14" rx="3" fill="#fff" ${avOut}/><path d="M78 82c5 0 5 7 0 7" fill="none" ${avOut}/><path d="M66 74q2-3 0-6M72 74q2-3 0-6" fill="none" stroke="#9a92b8" stroke-width="1.4"/>`,
      back: `<path d="M18 22a10 10 0 1 0 10 12 8 8 0 1 1-10-12z" fill="#f2cf4a" ${avOut}/>` }),
  },
  {
    key: 'av-rakete', name: 'Sprachrakete',
    svg: avatar({ bg: AV_BG.sky, skin: AV_SKIN.c, shirt: '#ff9cc0', hair: 'curly', hairColor: '#3a2415', face: { mouth: 'open' },
      top: `<path d="M30 36h40" stroke="#86c3ff" stroke-width="7" stroke-linecap="round"/><circle cx="41" cy="36" r="5" fill="#d6ebff" ${avOut}/><circle cx="59" cy="36" r="5" fill="#d6ebff" ${avOut}/>`,
      back: `<path d="M80 70c0-18 6-30 10-34 4 4 6 16 4 34z" fill="#fff" ${avOut}/><path d="M82 70l-2 10 6-4 6 4-2-10" fill="#ffb08a" ${avOut}/><circle cx="88" cy="52" r="3" fill="#86c3ff" ${avOut}/>` }),
  },
  {
    key: 'av-wortjaeger', name: 'Wortjägerin',
    svg: avatar({ bg: AV_BG.lemon, skin: AV_SKIN.b, shirt: '#f2cf4a', hair: 'hijab', hairColor: '#7fd8a8', face: { eyes: 'wink', mouth: 'smirk' },
      back: `<path d="M78 92 90 40" ${avOut}/><ellipse cx="88" cy="30" rx="10" ry="12" fill="#fff" fill-opacity="0.7" ${avOut}/><text x="88" y="34" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="${AV_LINE}">Aa</text>` }),
  },
  {
    key: 'av-ninja', name: 'Grammatik-Ninja',
    svg: avatar({ bg: AV_BG.lilac, skin: AV_SKIN.c, shirt: '#4a4a5e', hair: 'buzz', hairColor: '#2a2a2a', face: { mouth: 'calm', brows: false },
      top: `<path d="M29 46c0-7 42-7 42 0v14c-6 6-36 6-42 0z" fill="#4a4a5e" ${avOut}/><path d="M29 40h42v8H29z" fill="#b9a6ff" ${avOut}/><path d="M71 42l12-4-3 6 4 4-13-2" fill="#b9a6ff" ${avOut}/><circle cx="42" cy="44" r="2.4" fill="${AV_LINE}"/><circle cx="58" cy="44" r="2.4" fill="${AV_LINE}"/>` }),
  },
  {
    key: 'av-plauder', name: 'Plaudertasche',
    svg: avatar({ bg: AV_BG.rose, skin: AV_SKIN.e, shirt: '#ff9cc0', hair: 'long', hairColor: '#1a120c', face: { mouth: 'open' },
      back: `<path d="M64 6h28a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H76l-6 6v-6h-6a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5z" fill="#fff" ${avOut}/><text x="78" y="21" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="9" font-weight="700" fill="${AV_LINE}">Hallo!</text>` }),
  },
  {
    key: 'av-champion', name: 'Gedächtnis-Champion',
    svg: avatar({ bg: AV_BG.lemon, skin: AV_SKIN.a, shirt: '#86c3ff', hair: 'short', hairColor: '#8a4a25', face: { eyes: 'happy', mouth: 'grin' },
      front: `<path d="M44 70l6 10 6-10" fill="none" stroke="#ff6b6b" stroke-width="3"/><circle cx="50" cy="84" r="6" fill="#f2cf4a" ${avOut}/><text x="50" y="87" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="700" fill="${AV_LINE}">1</text>`,
      back: `<path d="M78 20h14v6c0 6-3 9-7 9s-7-3-7-9z" fill="#f2cf4a" ${avOut}/><path d="M85 35v5M80 42h10" ${avOut}/>` }),
  },
  {
    key: 'av-beat', name: 'Beat-Lerner',
    svg: avatar({ bg: AV_BG.mint, skin: AV_SKIN.f, shirt: '#b9a6ff', hair: 'curly', hairColor: '#140d08', face: { eyes: 'closed', mouth: 'smile' },
      top: `<path d="M27 46c0-28 46-28 46 0" fill="none" stroke="#2a2a2a" stroke-width="4"/><rect x="22" y="42" width="9" height="14" rx="4" fill="#ff9cc0" ${avOut}/><rect x="69" y="42" width="9" height="14" rx="4" fill="#ff9cc0" ${avOut}/>`,
      back: `<ellipse cx="86" cy="26" rx="4" ry="3" fill="${AV_LINE}"/><path d="M89.5 25V12l5 2" fill="none" ${avOut}/><ellipse cx="14" cy="36" rx="3.4" ry="2.6" fill="${AV_LINE}"/><path d="M17 35V24" fill="none" ${avOut}/>` }),
  },
  {
    key: 'av-kuenstlerin', name: 'Zeichenkünstlerin',
    svg: avatar({ bg: AV_BG.peach, skin: AV_SKIN.c, shirt: '#7fd8a8', hair: 'long', hairColor: '#b24a6a', face: { eyes: 'happy', mouth: 'smile' },
      top: `<path d="M30 28c6-12 34-14 42-2-4 2-10 0-14-2-10 2-20 4-28 4z" fill="#ff6b6b" ${avOut}/><circle cx="52" cy="17" r="2.4" fill="#ff6b6b" ${avOut}/>`,
      front: `<path d="M70 98 88 62l5 2-14 38z" fill="#f2cf4a" ${avOut}/><path d="M88 62l3-6 2 8z" fill="#2a2a2a"/>` }),
  },
  {
    key: 'av-raetsel', name: 'Rätselprofi',
    svg: avatar({ bg: AV_BG.sky, skin: AV_SKIN.b, shirt: '#c8955a', hair: 'short', hairColor: '#3a2415', face: { eyes: 'wink', mouth: 'smirk' },
      top: `<path d="M24 32c4-14 48-14 52 0z" fill="#9a6238" ${avOut}/><path d="M34 26c2-10 30-10 32 0" fill="#c8955a" ${avOut}/>`,
      front: `<circle cx="78" cy="78" r="9" fill="#fff" fill-opacity="0.6" ${avOut}/><path d="M71 85 62 96" stroke="${AV_LINE}" stroke-width="4" stroke-linecap="round"/>` }),
  },
  {
    key: 'av-sprinter', name: 'Sprinterin',
    svg: avatar({ bg: AV_BG.rose, skin: AV_SKIN.d, shirt: '#ff6b6b', hair: 'ponytail', hairColor: '#140d08', face: { mouth: 'grin' },
      top: `<path d="M30 34h40" stroke="#7fd8a8" stroke-width="5" stroke-linecap="round"/>`,
      back: `<path d="M6 40h12M4 50h14M8 60h10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="84" cy="24" r="9" fill="#fff" ${avOut}/><path d="M84 24v-5M84 24l4 2M82 13h4" fill="none" ${avOut}/>` }),
  },
  {
    key: 'av-zen', name: 'Zen-Lernerin',
    svg: avatar({ bg: AV_BG.mint, skin: AV_SKIN.a, shirt: '#e6defd', hair: 'bun', hairColor: '#151515', face: { eyes: 'closed', mouth: 'calm' },
      back: `<path d="M80 30c-8-10 4-20 10-18 2 8-2 16-10 18z" fill="#7fd8a8" ${avOut}/><path d="M80 30 88 16" fill="none" ${avOut}/><circle cx="14" cy="30" r="3" fill="#fff" ${avOut}/><circle cx="20" cy="20" r="2" fill="#fff" ${avOut}/>` }),
  },
  {
    key: 'av-weltenbummler', name: 'Weltenbummler',
    svg: avatar({ bg: AV_BG.lemon, skin: AV_SKIN.e, shirt: '#86c3ff', hair: 'short', hairColor: '#140d08', face: { mouth: 'grin' },
      top: `<path d="M28 36c0-16 44-16 44 0z" fill="#ff9cc0" ${avOut}/><path d="M64 36h16" stroke="${AV_LINE}" stroke-width="1.8"/><path d="M62 33h20" stroke="#ff9cc0" stroke-width="5" stroke-linecap="round"/>`,
      front: `<path d="M30 74v26M70 74v26" stroke="#9a6238" stroke-width="5"/>`,
      back: `<circle cx="16" cy="24" r="10" fill="#86c3ff" ${avOut}/><path d="M10 20c4 2 6 6 4 10M20 16c-2 4 2 8 6 8" fill="#7fd8a8" ${avOut}/>` }),
  },
  {
    key: 'av-superheld', name: 'Super-Lernerin',
    svg: avatar({ bg: AV_BG.lilac, skin: AV_SKIN.c, shirt: '#6f5bd8', hair: 'curly', hairColor: '#1a120c', face: { mouth: 'grin' },
      back: `<path d="M20 100c4-24 14-34 30-34s26 10 30 34" fill="#ff6b6b" ${avOut}/>`,
      top: `<path d="M33 40c6-4 12-4 17 0 5-4 11-4 17 0v6c-6 3-12 3-17-1-5 4-11 4-17 1z" fill="#ff6b6b" ${avOut}/><circle cx="42" cy="43" r="2.4" fill="${AV_LINE}"/><circle cx="58" cy="43" r="2.4" fill="${AV_LINE}"/>`,
      front: `<path d="M44 78l6-6 6 6-6 10z" fill="#f2cf4a" ${avOut}/><text x="50" y="84" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="7" font-weight="700" fill="${AV_LINE}">A</text>` }),
  },
];

for (const a of AVATARS) DRAWINGS[a.key] = a.svg;
const AVATAR_KEYS = AVATARS.map((a) => a.key);
const avatarName = (key) => (AVATARS.find((a) => a.key === key) || {}).name || '';

if (typeof module !== 'undefined') module.exports = { AVATAR_KEYS };
