// Verb pictures: one scene per verb, in the style of the app's people (pictures.js)
// and drawings (drawings.js). The motifs follow the ARASAAC pictograms (Sergio Palao,
// ARASAAC, Gobierno de Aragón, CC BY-NC-SA 4.0); the drawings are new. Keys: 'v-<id>'.

// More people, so the verb pictures show children and adults from many places.
Object.assign(PEOPLE, {
  kofi: { look: 'short', skin: '#5e3a22', hair: '#140d08', top: '#4caf6e', bottom: '#2f3a4a', scale: 0.8 },
  amina: { look: 'curly', skin: '#6b4226', hair: '#1a120c', top: '#f2c14e', bottom: '#1f8a7a', skirt: true },
  mei: { look: 'straight', skin: '#f1d3b3', hair: '#151515', top: '#3f7fc1', bottom: '#2f3a4a' },
  ravi: { look: 'short', skin: '#a66b42', hair: '#151010', top: '#e8873a', bottom: '#34495e' },
  ben: { look: 'short', skin: '#f6d7bf', hair: '#c9952e', top: '#6b7fd7', bottom: '#3a3f52' },
  lena: { look: 'ponytail', skin: '#f6d7bf', hair: '#e0b84a', top: '#d9534f', bottom: '#3f7fc1', scale: 0.8 },
  arjun: { look: 'short', skin: '#a0673e', hair: '#151010', top: '#3f7fc1', bottom: '#eef0ee', scale: 0.8 },
});
PEOPLE.swimmer = { ...PEOPLE.lena, top: PEOPLE.lena.skin, scale: 1 };
const SKIN = { dark: '#5e3a22', brown: '#a66b42', light: '#f6d7bf', tan: '#e9c9a0' };

const VP_INK = '#23302f';
const VP_LINE = '#2a2a2a';
// The class vp-comic gives every filled shape the figures' thin dark outline (styles.css);
// the background circle gets its pastel colour per verb at the end of this file.
const vpFrame = (body) => `<svg class="vp-comic" viewBox="0 0 120 90" role="presentation"><circle class="vp-bg" cx="60" cy="45" r="44" fill="#e6efec"/>${body}</svg>`;
const vpLine = (d, color, width = 3) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const vpText = (x, y, text, size, color = VP_INK, weight = 800) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${text}</text>`;
const vpArrow = (x1, y1, x2, y2, color = '#e8873a') => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const tip = (da) => `${x2 - 7 * Math.cos(a + da)},${y2 - 7 * Math.sin(a + da)}`;
  return vpLine(`M${x1} ${y1}L${x2} ${y2}`, color, 3.5) + `<polygon points="${x2},${y2} ${tip(0.55)} ${tip(-0.55)}" fill="${color}"/>`;
};

// A darker (f < 1) or lighter (f > 1) shade of a colour, for outlines and folds.
function vpShade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(v * f))).toString(16).padStart(2, '0');
  return `#${ch(n >> 16)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
}

// Eyes with brows and a highlight, nose, cheeks and a mouth for the moods a verb needs.
function vpFace(c, dir, { eyes = 'open', mouth = 'smile' } = {}) {
  const ex = [-4.5 + dir * 1.5, 4.5 + dir * 1.5];
  const brows = ex.map((x) => `<path d="M${x - 2.6} -84.4q2.6-1.8 5.2 0" fill="none" stroke="${vpShade(c.hair, 1.1)}" stroke-width="1.1" stroke-linecap="round"/>`).join('');
  const eye = eyes === 'happy'
    ? ex.map((x) => `<path d="M${x - 2.6} -79q2.6-3.4 5.2 0" fill="none" stroke="${VP_INK}" stroke-width="1.5" stroke-linecap="round"/>`).join('')
    : eyes === 'closed'
    ? ex.map((x) => `<path d="M${x - 2.5} -80q2.5 2.5 5 0" fill="none" stroke="${VP_INK}" stroke-width="1.4" stroke-linecap="round"/>`).join('')
    : ex.map((x) => `<circle class="no-ol" cx="${x}" cy="-80" r="1.9" fill="${VP_INK}"/><circle class="no-ol" cx="${x + 0.6}" cy="-80.7" r="0.6" fill="#fff"/>`).join('');
  const nose = `<path d="M${dir * 2} -78.6q${dir * 1.8} 2 0 2.6" fill="none" stroke="${vpShade(c.skin, 0.72)}" stroke-width="1" stroke-linecap="round"/>`;
  const cheeks = ex.map((x) => `<circle class="no-ol" cx="${x + (x < dir * 1.5 ? -1.5 : 1.5)}" cy="-75.5" r="2.3" fill="#e8846f" opacity="0.28"/>`).join('');
  const mx = dir * 1.5;
  const mouths = {
    smile: `<path d="M${mx - 4} -73q4 4 8 0" fill="none" stroke="${VP_INK}" stroke-width="1.4" stroke-linecap="round"/>`,
    open: `<path d="M${mx - 4} -73.5h8q-1 5-4 5t-4-5z" fill="${VP_INK}"/><path d="M${mx - 2.2} -70q2.2 1.4 4.4 0" fill="#d9534f"/>`,
    o: `<ellipse cx="${mx}" cy="-72" rx="2.4" ry="3" fill="${VP_INK}"/>`,
    flat: `<path d="M${mx - 3} -72h6" stroke="${VP_INK}" stroke-width="1.4" stroke-linecap="round"/>`,
    sad: `<path d="M${mx - 4} -70q4-4 8 0" fill="none" stroke="${VP_INK}" stroke-width="1.4" stroke-linecap="round"/>`,
    laugh: `<path d="M${mx - 5.5} -74.5h11q-1 8-5.5 8t-5.5-8z" fill="${VP_INK}"/><path d="M${mx - 4.5} -74.5h9v1.6h-9z" fill="#fff"/><path d="M${mx - 3} -69q3 2 6 0q-3-2-6 0z" fill="#d9534f"/>`,
  };
  return brows + cheeks + eye + nose + mouths[mouth];
}

// Ears and a head with a fine outline; the hair goes on top.
function vpHeadShape(c) {
  const edge = vpShade(c.skin, 0.78);
  return `<circle cx="-13" cy="-78" r="3.3" fill="${c.skin}" stroke="${edge}" stroke-width="0.8"/><circle cx="13" cy="-78" r="3.3" fill="${c.skin}" stroke="${edge}" stroke-width="0.8"/>`
    + `<rect x="-4" y="-68" width="8" height="7" fill="${vpShade(c.skin, 0.88)}"/><circle cy="-78" r="13" fill="${c.skin}" stroke="${edge}" stroke-width="0.8"/>`;
}

// A person of the app with free arms (hand positions as if facing right; dir mirrors),
// legs standing, walking, running, kneeling or sitting on the floor, and something held
// (`hold`, drawn between the arms in the figure's own coordinates). `rear` shows the back of the head.
function vpFigure(who, { x, y = 86, s = 0.72, dir = 1, front = null, back = null, legs = null, hold = '', eyes, mouth, rear = false, elbow = null, backElbow = null, finger = null, over = '' } = {}) {
  const p = PEOPLE[who];
  const c = p;
  const size = s * (p.scale || 1);
  const skirt = p.skirt || p.look === 'scarf' || p.look === 'ponytail';
  const fold = vpShade(c.bottom, 0.78);
  const shoe = (sx, sy) => `<ellipse cx="${sx}" cy="${sy}" rx="7" ry="3" fill="${VP_INK}"/><path d="M${sx - 4} ${sy - 1.2}h4" stroke="#6b7775" stroke-width="0.9" stroke-linecap="round"/>`;
  const leg = (d) => vpLine(d, VP_LINE, 11.8) + vpLine(d, c.bottom, 9.6);
  const shadow = `<ellipse class="no-ol" cx="0" cy="0" rx="20" ry="3.4" fill="#23302f" opacity="0.12"/>`;
  let lower;
  let lift = 0;
  if (legs === 'walk') lower = leg('M-4-34L-12-4') + leg('M4-34L12-4') + shoe(-14, -2) + shoe(14, -2);
  else if (legs === 'run') lower = leg('M-4-34L-20-8') + leg(`M4-34L18-18L28-8`) + shoe(-22, -5) + shoe(31, -7);
  else if (legs === 'kneel') {
    // Side view: thigh down to the knee on the floor, shin lying behind.
    lift = 18;
    lower = leg('M-5-20L-7-5') + leg('M5-20L7-5') + `<ellipse cx="-7" cy="-4" rx="6" ry="3.4" fill="${fold}"/><ellipse cx="7" cy="-4" rx="6" ry="3.4" fill="${fold}"/>`;
  } else if (legs === 'sit') {
    lift = 28;
    lower = leg('M-2-9L26-9') + shoe(30, -11);
  } else if (skirt) {
    lower = `<path d="M-12-36h24l5 28h-34z" fill="${c.bottom}" stroke="${fold}" stroke-width="0.8"/><path d="M-16-9h32" stroke="${fold}" stroke-width="1.6"/><rect x="-8" y="-9" width="6" height="9" fill="${c.skin}"/><rect x="2" y="-9" width="6" height="9" fill="${c.skin}"/>${shoe(-6, -1)}${shoe(6, -1)}`;
  } else {
    lower = `<rect x="-11" y="-36" width="10" height="36" rx="3" fill="${c.bottom}" stroke="${fold}" stroke-width="0.8"/><rect x="1" y="-36" width="10" height="36" rx="3" fill="${c.bottom}" stroke="${fold}" stroke-width="0.8"/>${shoe(-6, -1)}${shoe(6, -1)}`;
  }
  if (legs === 'walk' || legs === 'run') lower = `<rect x="-11" y="-40" width="22" height="8" rx="3" fill="${c.bottom}"/>${lower}`;
  const sleeveEdge = vpShade(c.top, 0.76);
  // The front arm can bend at `elbow` and point with a `finger` towards a spot.
  const arm = (side, hand, bend = null, tip = null) => {
    const [hx, hy] = hand || [side * 17, -34];
    const path = bend ? `M${side * 12}-60L${bend[0]} ${bend[1]}L${hx} ${hy}` : `M${side * 12}-60L${hx} ${hy}`;
    return vpLine(path, VP_LINE, 9) + vpLine(path, c.top, 6.8)
      + `<circle cx="${hx}" cy="${hy}" r="4.2" fill="${c.skin}" stroke="${vpShade(c.skin, 0.75)}" stroke-width="0.8"/>`
      + (tip ? vpLine(`M${hx} ${hy}L${tip[0]} ${tip[1]}`, c.skin, 2.8) : '');
  };
  const flip = (hand) => hand && [hand[0] * dir, hand[1]];
  const tie = p.look === 'suit' ? `<path d="M0-63l-6-1 6 9 6-9z" fill="#fff"/><path d="M0-58l-2.6 6 2.6 10 2.6-10z" fill="#c8373a"/>` : '';
  const neckline = tie ? '' : `<path d="M-5-65l5 5 5-5z" fill="${c.skin}"/>`;
  const upper = `<g transform="translate(0 ${lift})">`
    + `<rect x="-14" y="-65" width="28" height="33" rx="9" fill="${c.top}" stroke="${sleeveEdge}" stroke-width="0.8"/>${neckline}${tie}`
    + vpHeadShape(c)
    + (rear ? `<circle cy="-79" r="13.6" fill="${c.hair}"/>` : `${drawHair(p.look, c, dir)}${vpFace(c, dir, { eyes, mouth })}`)
    + `${arm(-dir, flip(back), flip(backElbow))}${hold}${arm(dir, flip(front), flip(elbow), flip(finger))}${over}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${size})">${legs === 'sit' || legs === 'kneel' ? '' : shadow}${lower}${upper}</g>`;
}

// A big head and shoulders, for verbs of the face: eat, drink, sing, hear, see …
function vpHead(who, { x = 60, y = 40, k = 2.3, dir = 1, eyes, mouth, extra = '' } = {}) {
  const p = PEOPLE[who];
  return `<g transform="translate(${x} ${y + 78 * k}) scale(${k})">`
    + `<rect x="-22" y="-62" width="44" height="40" rx="14" fill="${p.top}" stroke="${vpShade(p.top, 0.76)}" stroke-width="0.7"/><path d="M-6-62l6 6 6-6z" fill="${p.skin}"/>`
    + `${vpHeadShape(p)}${drawHair(p.look, p, dir)}${vpFace(p, dir, { eyes, mouth })}${extra}</g>`;
}

// A hand coming in from the side: the arm runs to the left of (x, y) before rotation.
function vpHand(x, y, rot, { skin = '#e9c9a0', sleeve = '#6b7fd7', pose = 'grip' } = {}) {
  const edge = vpShade(skin, 0.72);
  const part = (px, py, w, hgt, r) => `<rect x="${px}" y="${py}" width="${w}" height="${hgt}" rx="${r}" fill="${skin}" stroke="${edge}" stroke-width="0.7"/>`;
  const fingers = {
    grip: part(2, -9, 9, 18, 4.5) + vpLine('M5-4.5h5M5 0h5M5 4.5h5', edge, 0.9),
    point: part(2, -3, 9, 12, 4.5) + vpLine('M5 1.5h5M5 5.5h5', edge, 0.9) + part(4, -9, 18, 5.5, 2.75),
    open: part(4, -9, 15, 4.2, 2.1) + part(4, -4.4, 17, 4.2, 2.1) + part(4, 0.2, 16, 4.2, 2.1) + part(4, 4.8, 13, 4.2, 2.1),
  }[pose];
  return `<g transform="translate(${x} ${y}) rotate(${rot})">`
    + `<rect x="-60" y="-8" width="48" height="16" rx="4" fill="${sleeve}" stroke="${vpShade(sleeve, 0.76)}" stroke-width="0.8"/><rect x="-17" y="-8" width="5" height="16" rx="1.5" fill="${vpShade(sleeve, 0.82)}"/>`
    + `${part(-16, -9, 22, 18, 8)}${fingers}`
    + `<ellipse cx="-4" cy="-10" rx="7" ry="3.6" fill="${skin}" stroke="${edge}" stroke-width="0.7"/></g>`;
}

const vpBubble = (x, y, w, h, inner, tail = 'left') => {
  const t = tail === 'left' ? `M${x + 10} ${y + h}l-6 9 14-9` : `M${x + w - 10} ${y + h}l6 9-14-9`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff" stroke="${VP_INK}" stroke-width="1.4"/><path d="${t}" fill="#fff" stroke="${VP_INK}" stroke-width="1.4" stroke-linejoin="round"/><rect x="${x + 4}" y="${y + h - 2}" width="18" height="3" fill="#fff"/>${inner}`;
};
const vpThought = (cx, cy, r, inner, fromX, fromY) => `<circle cx="${fromX}" cy="${fromY}" r="2.4" fill="#fff" stroke="${VP_INK}" stroke-width="1.2"/><circle cx="${(fromX + cx) / 2}" cy="${(fromY + cy + r) / 2}" r="3.6" fill="#fff" stroke="${VP_INK}" stroke-width="1.2"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${VP_INK}" stroke-width="1.4"/>${inner}`;
const vpBall = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#d9534f"/><path d="M${x - r * 0.5} ${y - r * 0.45}a${r * 0.6} ${r * 0.6} 0 0 1 ${r * 0.5}-${r * 0.25}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="0.7"/>`;
const vpPaper = (x, y, w, h, lines = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#fff" stroke="#b9c1bf" stroke-width="1"/>${lines}`;
const vpNote = (x, y, color = '#7a4fb0') => `<ellipse cx="${x}" cy="${y}" rx="4" ry="3" fill="${color}" transform="rotate(-20 ${x} ${y})"/>${vpLine(`M${x + 3.5} ${y - 1}V${y - 16}l7 3`, color, 2)}`;

// Direction marks painted on the road: tip up (away from us) or down (towards us).
const vpChevrons = (marks, up) => marks.map(([y, w]) => vpLine(up ? `M${60 - w} ${y + w * 0.7}L60 ${y}L${60 + w} ${y + w * 0.7}` : `M${60 - w} ${y}L60 ${y + w * 0.7}L${60 + w} ${y}`, '#e8873a', 3)).join('');
const vpRoadPlain = `<path d="M30 90 54 30h12l24 60z" fill="#d9d3c4"/>`;
const vpRoad = `<path d="M30 90 54 30h12l24 60z" fill="#d9d3c4"/><path d="M60 34v8M60 52v10M60 72v12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`;

const VERB_PICTURES = {
  // So stelle ich mich vor
  sein: vpFrame(`<ellipse class="no-ol" cx="52" cy="50" rx="30" ry="40" fill="#ffe3cb"/>` + vpFigure('amina', { x: 52, y: 90, s: 1, front: [8, -50], elbow: [26, -42], finger: [1, -53] }) + vpBubble(78, 8, 30, 20, vpText(93, 22, 'ich', 11), 'left')),
  haben: vpFrame(vpFigure('kofi', { x: 60, s: 1.1, front: [8, -50], back: [-8, -50], hold: vpBall(0, -50, 12) })),
  // A small name badge on the chest, shown enlarged in a magnifier: ALI.
  heissen: vpFrame(vpFigure('man', { x: 40, y: 88, s: 0.9, over: `<rect x="-10" y="-56" width="12" height="8" rx="1.2" fill="#fff" stroke="#d9534f" stroke-width="0.8"/><rect x="-10" y="-56" width="12" height="2.4" fill="#d9534f"/><path d="M-8-51h8" stroke="${VP_INK}" stroke-width="0.8"/>` }) + `<path d="M41 52 66 24M41 57 66 58" stroke="#9aa3a1" stroke-width="1" stroke-dasharray="2 2"/><circle cx="86" cy="41" r="25" fill="#fff" stroke="#2f3a4a" stroke-width="3"/>${vpLine('M104 59l9 9', '#2f3a4a', 5)}` + `<rect x="68" y="30" width="36" height="22" rx="3" fill="#fff" stroke="#d9534f" stroke-width="1.4"/><rect x="68" y="30" width="36" height="6" rx="2" fill="#d9534f"/>${vpText(86, 49, 'ALI', 12)}`),
  wohnen: vpFrame(`<path d="M22 44 60 14l38 30z" fill="#d9534f"/><rect x="30" y="42" width="60" height="42" fill="#f2c14e"/><rect x="78" y="18" width="8" height="16" fill="#d9534f"/><rect x="48" y="52" width="24" height="32" fill="#fff6dc"/>${vpFigure('lena', { x: 60, y: 84, s: 0.5 })}`),
  kommen: vpFrame(vpRoadPlain + vpChevrons([[32, 4], [39, 5.5], [46, 7]], false) + vpFigure('lena', { x: 60, y: 90, s: 0.6, legs: 'walk', front: [20, -82] })),
  gehen: vpFrame(vpRoadPlain + `<rect x="46" y="16" width="28" height="16" fill="#f2c14e"/><path d="M44 16 60 6l16 10z" fill="#d9534f"/><rect x="57" y="24" width="6" height="8" fill="#9a6238"/><rect x="49" y="20" width="5" height="4" fill="#fff"/><rect x="66" y="20" width="5" height="4" fill="#fff"/>${vpLine('M60 6V0', '#6b7775', 1.2)}<path d="M60 0h6l-2 2 2 2h-6z" fill="#d9534f"/>` + vpChevrons([[68, 6], [76, 8], [84, 9.5]], true) + vpFigure('mei', { x: 60, y: 64, s: 0.36, legs: 'walk', rear: true, front: [16, -40], back: [-16, -40] })),
  // In der Schule
  lernen: vpFrame(vpHead('kofi', { x: 60, y: 52, k: 1.45, extra: `<g transform="translate(0 -100) scale(0.62)"><path d="M-14 4c-6-10 4-18 10-14 4-6 14-4 14 4 8 0 10 10 2 14 2 8-8 10-12 6-6 4-14 0-14-10z" fill="#e58aa6"/><path d="M-6-4q4 4 0 8M4-6q-3 5 2 9" fill="none" stroke="#c45f80" stroke-width="2"/></g>` }) + vpPaper(10, 14, 22, 26, vpText(21, 27, 'abc', 7, '#3f7fc1') + vpText(21, 36, 'ABC', 6, '#3f7fc1')) + vpText(102, 22, '2+3', 11, '#e8873a') + vpArrow(33, 24, 48, 20) + vpArrow(90, 26, 74, 20)),
  schreiben: vpFrame(vpPaper(20, 12, 54, 68, vpText(40, 34, 'a', 14, '#3f7fc1', 600) + vpText(40, 54, 'b', 14, '#3f7fc1', 600) + vpText(40, 72, 'c', 14, '#3f7fc1', 600)) + `<g transform="translate(70 52) rotate(35)"><rect x="-3" y="-34" width="6" height="30" fill="#f2c14e"/><path d="M-3-4h6l-3 7z" fill="#e9c9a0"/></g>` + vpHand(84, 46, -125, { skin: SKIN.dark, sleeve: '#4caf6e' })),
  lesen: vpFrame(vpFigure('amina', { x: 60, s: 0.85, front: [14, -48], back: [-14, -48], hold: `<path d="M0-62-20-58v24l20-4 20 4v-24z" fill="#4caf6e"/><path d="M0-62v24" stroke="#2f7d4d" stroke-width="2"/><path d="M-17-55l15-3M-17-49l15-3M17-55l-15-3M17-49l-15-3" stroke="#fff" stroke-width="1.5" opacity="0.6"/>` })),
  malen: vpFrame(`<rect x="16" y="14" width="56" height="62" rx="3" fill="#3f7fc1"/><circle cx="32" cy="32" r="7" fill="#d9534f"/><circle cx="44" cy="28" r="6" fill="#fff"/><circle cx="40" cy="42" r="7" fill="#f2c14e"/>` + `<g transform="translate(62 44) rotate(40)"><rect x="-2" y="-2" width="4" height="40" fill="#9a6238"/><path d="M-3-2h6l-3-9z" fill="#d9534f"/></g>` + vpHand(86, 64, -130, { skin: SKIN.light, sleeve: '#d9534f' })),
  fragen: vpFrame(vpHead('mei', { x: 46, y: 46, k: 1.9, mouth: 'open' }) + vpBubble(70, 10, 34, 30, vpText(87, 34, '?', 24, '#7a4fb0'))),
  sprechen: vpFrame(vpHead('ravi', { x: 34, y: 50, k: 1.4, mouth: 'open' }) + vpHead('ben', { x: 88, y: 50, k: 1.4, dir: -1 }) + vpBubble(16, 8, 52, 22, vpText(42, 24, 'Hallo!', 10))),
  // Zu Hause
  kochen: vpFrame(vpLine('M44 26q-5-6 0-12M58 24q-5-6 0-12M72 26q-5-6 0-12', '#b9c1bf', 2.5) + `<rect x="30" y="40" width="58" height="34" rx="6" fill="#b9c1bf"/><rect x="26" y="36" width="66" height="7" rx="3" fill="#6b7775"/><path d="M36 37q23-14 46 0z" fill="#fff" stroke="#e0d6c0" stroke-width="0.8"/><rect x="34" y="40" width="50" height="6" fill="#fff"/><path d="M40 43h3M48 42h3M56 44h3M64 42h3M72 43h3" stroke="#e0d6c0" stroke-width="1.4" stroke-linecap="round"/><rect x="24" y="76" width="70" height="6" rx="2" fill="#2f3a4a"/>` + vpLine('M66 44 82 14', '#9a6238', 4) + vpHand(84, 22, -150, { skin: SKIN.brown, sleeve: '#d9708f' })),
  // Rice from a bowl with chopsticks.
  essen: vpFrame(vpHead('mei', { x: 50, y: 40, k: 1.9, mouth: 'open' }) + vpLine('M62 50 98 70M64 54 99 66', '#9a6238', 2.2) + `<ellipse cx="63" cy="52" rx="4" ry="2.6" fill="#fff"/><path d="M76 70h34q-2 14-17 14t-17-14z" fill="#d9534f"/><ellipse cx="93" cy="70" rx="17" ry="4" fill="#fff"/>`),
  // Tea from a tea glass.
  trinken: vpFrame(vpFigure('woman', { x: 56, y: 88, s: 0.8, front: [10, -76], elbow: [24, -56] }) + `<g transform="translate(63 33) rotate(-30)"><path d="M-5-8h10l-1.4 18h-7.2z" fill="#e6f3fa" stroke="#7fb8e6" stroke-width="1.4"/><path d="M-4.4 0h8.8l-0.8 9h-7.2z" fill="#7fb8e6"/></g>`),
  schlafen: vpFrame(`<rect x="12" y="58" width="96" height="8" rx="2" fill="#9a6238"/><rect x="12" y="36" width="6" height="42" fill="#9a6238"/><rect x="102" y="48" width="6" height="30" fill="#9a6238"/><rect x="18" y="42" width="34" height="16" rx="8" fill="#fff"/>`
    + `<circle cx="38" cy="44" r="11" fill="${PEOPLE.kofi.skin}"/><path d="M27 44a11 11 0 0 1 11-11v4c-5 1-8 4-8 7z" fill="${PEOPLE.kofi.hair}"/><path d="M36 42q2.5 2 5 0M43 47q2 1.5 4 0" fill="none" stroke="${VP_INK}" stroke-width="1.3" stroke-linecap="round"/>`
    + `<path d="M46 46q28-10 58 0v14H46z" fill="#3f7fc1"/><path d="M46 46q28-10 58 0" fill="none" stroke="#fff" stroke-width="2"/>${vpText(64, 30, 'z', 11, '#7a4fb0')}${vpText(76, 20, 'z', 14, '#7a4fb0')}`),
  machen: vpFrame(vpFigure('ravi', { x: 36, front: [30, -76] }) + `<g transform="translate(70 32) rotate(35)"><rect x="-2" y="-2" width="5" height="22" fill="#9a6238"/><rect x="-9" y="-9" width="20" height="8" rx="2" fill="#6b7775"/></g>` + `<path d="M64 60 82 46l18 14z" fill="#9a6238"/><rect x="68" y="60" width="28" height="26" fill="#c8955a"/><path d="M68 68h28M68 77h28" stroke="#9a6238" stroke-width="1.5"/><circle cx="82" cy="72" r="4" fill="#5a3a22"/>${vpText(76, 50, '✦', 9, '#f2c14e', 400)}`),
  // A child with a scraped knee reaches for a plaster: something is missing and needed.
  brauchen: vpFrame(vpFigure('kofi', { x: 36, s: 0.9, legs: 'sit', front: [56, -62], mouth: 'sad' }) + `<path d="M42 77q3-3 6 0q-3 3-6 0z" fill="#d9534f"/><path d="M43 75l-1-3M46 75l1-3" stroke="#d9534f" stroke-width="1.2"/><g transform="translate(88 60) rotate(-20)"><rect x="-16" y="-6" width="32" height="12" rx="6" fill="#e9c9a0" stroke="#c8955a"/><rect x="-6" y="-5" width="12" height="10" rx="2" fill="#f6ecd8"/><circle cx="-11" cy="0" r="1" fill="#c8955a"/><circle cx="11" cy="0" r="1" fill="#c8955a"/></g>` + vpText(98, 30, '?', 18, '#7a4fb0')),
  // In der Freizeit
  spielen: vpFrame(vpFigure('kofi', { x: 34, s: 0.8, legs: 'run', front: [20, -52], back: [-20, -48], mouth: 'open' }) + `<circle cx="58" cy="78" r="7.5" fill="#fff" stroke="#23302f" stroke-width="1.2"/><path d="M58 74.5l3.3 2.4-1.3 3.9h-4l-1.3-3.9z" fill="#23302f"/>` + vpFigure('arjun', { x: 94, dir: -1, s: 0.8, front: [18, -58] }) + `<g transform="translate(84 50) rotate(-35)"><rect x="-1.8" y="-12" width="3.6" height="12" fill="#9a6238"/><rect x="-4.5" y="-40" width="9" height="28" rx="2.5" fill="#e9c9a0" stroke="#c8955a"/></g>`),
  singen: vpFrame(vpHead('amina', { x: 58, y: 44, k: 2, eyes: 'closed', mouth: 'o' }) + vpNote(22, 36) + vpNote(96, 28, '#e8873a') + vpNote(100, 60, '#3f7fc1')),
  hoeren: vpFrame(vpHead('ravi', { x: 48, y: 44, k: 2 }) + `${vpLine('M90 56 100 84', '#e8873a', 9)}<path d="M72 26q18 2 18 18t-18 18q8-18 0-36z" fill="#c8875a" stroke="#8a5530" stroke-width="1.2"/>` + vpNote(102, 30) + vpLine('M96 40q4 4 0 8M104 38q6 6 0 12', '#e8873a', 2.5)),
  sehen: vpFrame(vpHead('lena', { x: 44, y: 44, k: 2 }) + `<ellipse cx="80" cy="38" rx="9" ry="6" fill="#fff" stroke="${VP_INK}" stroke-width="1.6"/><circle cx="80" cy="38" r="3.4" fill="#1f8a7a"/>` + vpArrow(90, 38, 98, 38) + `<rect x="98" y="28" width="18" height="14" rx="2" fill="#2f3a4a"/><path d="M105 31v8l6-4z" fill="#fff"/>`),
  laufen: vpFrame(vpFigure('kofi', { x: 64, s: 0.9, legs: 'run', front: [28, -56], back: [-24, -44] }) + vpLine('M14 40h18M10 52h18M16 64h14', '#b9c1bf', 4)),
  fahren: vpFrame(`<path d="M18 34h84l-10-20H28z" fill="#bfe3f2"/><path d="M54 34l4-20h4l4 20z" fill="#d9d3c4"/><rect x="74" y="16" width="22" height="9" rx="1.5" fill="#2e8b57"/>${vpText(85, 23, 'Zürich', 6, '#fff', 700)}<path d="M84 25v9" stroke="#6b7775" stroke-width="1.2"/><rect x="14" y="34" width="92" height="10" rx="3" fill="#2f3a4a"/>` + `<circle cx="60" cy="62" r="22" fill="none" stroke="#23302f" stroke-width="6"/><circle cx="60" cy="62" r="7" fill="#23302f"/>${vpLine('M53 62H38M67 62h15M60 69v15', '#23302f', 5)}` + `<circle cx="40" cy="52" r="6" fill="${SKIN.light}"/><circle cx="80" cy="52" r="6" fill="${SKIN.light}"/>${vpLine('M40 56 26 86M80 56l14 30', '#1f8a7a', 9)}`),
  // Miteinander
  kaufen: vpFrame(vpFigure('woman', { x: 30, front: [30, -48] }) + `<g transform="translate(52 40) rotate(-10)"><rect width="26" height="14" rx="2" fill="#f2c14e" stroke="#c89a1e"/>${vpText(13, 10, '10 CHF', 6.5, '#5a3a00')}</g>` + vpLine('M66 58h6l5 18h22l5-14H75', VP_INK, 2.5) + `<path d="M75 62h28l-4 12H79z" fill="#bfe3f2"/><ellipse cx="86" cy="59" rx="8" ry="4.5" fill="#c8873a"/><path d="M82 57l2 3M86 56l2 3M90 57l2 3" stroke="#9a6238" stroke-width="1.2"/><rect x="93" y="54" width="6" height="9" rx="1.5" fill="#4caf6e"/><circle cx="82" cy="82" r="3.6" fill="${VP_INK}"/><circle cx="98" cy="82" r="3.6" fill="${VP_INK}"/>`),
  geben: vpFrame(vpFigure('ravi', { x: 28, front: [30, -50] }) + vpFigure('lena', { x: 96, dir: -1, front: [30, -54] }) + `<rect x="52" y="42" width="18" height="16" rx="2" fill="#d9534f"/><rect x="59" y="42" width="4" height="16" fill="#f2c14e"/><path d="M61 42c-4-6-10-4-7 0zM61 42c4-6 10-4 7 0z" fill="#f2c14e"/>` + vpArrow(44, 22, 78, 22)),
  nehmen: vpFrame(`<path d="M24 64h64q-4 20-32 20t-32-20z" fill="#3f7fc1"/><circle cx="38" cy="62" r="8" fill="#e8873a"/><circle cx="52" cy="60" r="8" fill="#f2c14e"/><circle cx="78" cy="62" r="8" fill="#4caf6e"/>` + `<circle cx="64" cy="38" r="8" fill="#d9534f"/><path d="M64 30v-4" stroke="#7a4a25" stroke-width="1.6"/><path d="M64 28q5-4 8 0q-4 3-8 0z" fill="#4caf6e"/>` + vpHand(66, 26, 100, { pose: 'open', skin: SKIN.brown, sleeve: '#e58aa6' }) + vpArrow(98, 60, 98, 24)),
  // A young woman takes an old woman's arm and carries her shopping bag.
  helfen: vpFrame(vpFigure('amina', { x: 40, front: [30, -49], back: [-18, -38] }) + `<path d="M21 62h16l-2 18H23z" fill="#e8873a"/><path d="M24 62q5-8 10 0" fill="none" stroke="#9a6238" stroke-width="2"/>` + vpFigure('oldwoman', { x: 78, dir: -1, front: [22, -48], back: [-20, -36] }) + vpLine('M93 60 97 86', '#6b7775', 3) + vpLine('M90 60h6', '#6b7775', 3)),
  finden: vpFrame(vpFigure('kofi', { x: 48, front: [16, -96], mouth: 'open' }) + `<g transform="translate(58 26) rotate(30)"><circle r="6" fill="none" stroke="#e0a030" stroke-width="3"/><path d="M0 6v16M0 16h5M0 21h4" stroke="#e0a030" stroke-width="3" fill="none"/></g>${vpText(80, 22, '!', 18, '#d9534f')}${vpText(40, 18, '✦', 12, '#f2c14e', 400)}${vpText(88, 44, '✦', 10, '#f2c14e', 400)}`),
  // Side view: sitting on a chair at the desk, typing, with a desktop computer.
  arbeiten: vpFrame(`<rect x="62" y="56" width="46" height="5" rx="1.5" fill="#9a6238"/><rect x="100" y="61" width="4" height="25" fill="#7a4a25"/>`
    + `<rect x="84" y="24" width="6" height="26" rx="2" fill="#2f3a4a"/><rect x="80" y="50" width="14" height="3" rx="1" fill="#2f3a4a"/><rect x="86" y="26" width="2" height="22" fill="#7fb8e6"/><rect x="64" y="53" width="16" height="3" rx="1" fill="#6b7775"/>`
    + `<rect x="26" y="36" width="5" height="30" rx="2" fill="#3f6d57"/><rect x="26" y="62" width="24" height="5" rx="2" fill="#3f6d57"/><path d="M38 67v15M30 84h16" stroke="#2f3a4a" stroke-width="2.5" stroke-linecap="round"/>`
    + vpLine('M40 61H58V82', PEOPLE.ben.bottom, 9) + `<ellipse cx="61" cy="84" rx="6" ry="2.6" fill="${VP_INK}"/>`
    + `<rect x="32" y="34" width="16" height="28" rx="6" fill="${PEOPLE.ben.top}" stroke="${vpShade(PEOPLE.ben.top, 0.76)}" stroke-width="0.8"/>`
    + `<rect x="38" y="28" width="6" height="7" fill="${vpShade(PEOPLE.ben.skin, 0.88)}"/><circle cx="42" cy="22" r="9.5" fill="${PEOPLE.ben.skin}" stroke="${vpShade(PEOPLE.ben.skin, 0.78)}" stroke-width="0.8"/><path d="M32.5 22a9.5 9.5 0 0 1 18-4.5c-4-1-9 0-11 3-2 1-4 4-4 7z" fill="${PEOPLE.ben.hair}"/><circle cx="39" cy="23" r="2.2" fill="${PEOPLE.ben.skin}" stroke="${vpShade(PEOPLE.ben.skin, 0.78)}" stroke-width="0.7"/>`
    + `<circle cx="47" cy="21" r="1.4" fill="${VP_INK}"/><path d="M51 22.5l1.6 2.2-1.6.6" fill="none" stroke="${vpShade(PEOPLE.ben.skin, 0.7)}" stroke-width="0.9"/><path d="M47 27.5q2 1 3.5-.2" fill="none" stroke="${VP_INK}" stroke-width="1" stroke-linecap="round"/>`
    + vpLine('M42 40 52 48 66 52', vpShade(PEOPLE.ben.top, 0.76), 7.6) + vpLine('M42 40 52 48 66 52', PEOPLE.ben.top, 6) + `<circle cx="68" cy="52" r="3.4" fill="${PEOPLE.ben.skin}" stroke="${vpShade(PEOPLE.ben.skin, 0.75)}" stroke-width="0.7"/>`),
  // Weitere Verben
  schwimmen: vpFrame(vpHead('swimmer', { x: 52, y: 36, k: 1.35, mouth: 'open', extra: `<path d="M-12-62v12M12-62v12" stroke="#d9534f" stroke-width="3"/><path d="M-16-50h32v8h-32z" fill="#d9534f"/><g fill="#7fb8e6" stroke="#3f7fc1" stroke-width="0.8"><circle cx="-5" cy="-89" r="3.4"/><circle cx="5" cy="-89" r="3.4"/></g><path d="M-13-89h4.6M1.6-89h-3.2M8.4-89H13" stroke="#3f7fc1" stroke-width="1"/>` })
    + vpLine('M66 54 92 34', PEOPLE.lena.skin, 7) + `<circle cx="93" cy="33" r="4.2" fill="${PEOPLE.lena.skin}" stroke="${vpShade(PEOPLE.lena.skin, 0.75)}" stroke-width="0.8"/>`
    + `<path d="M16 58q11-7 22 0t22 0t22 0t22 0V74q-44 26-88 0z" fill="#7fb8e6" opacity="0.92"/>` + vpLine('M24 66q8-5 16 0M70 66q8-5 16 0', '#fff', 2) + `<g fill="#7fb8e6"><circle cx="100" cy="40" r="1.8"/><circle cx="98" cy="28" r="1.4"/><circle cx="104" cy="34" r="1.2"/></g>`),
  tanzen: vpFrame(vpFigure('mei', { x: 60, legs: 'walk', front: [24, -94], back: [-24, -90], mouth: 'open' }) + vpNote(26, 30) + vpNote(94, 26, '#e8873a')),
  // Neutral: closed eyes and hands together, no sign of any one religion.
  // Kneeling with eyes closed and hands together: no sign of any one religion.
  beten: vpFrame(`<ellipse class="no-ol" cx="60" cy="44" rx="30" ry="36" fill="#ffe3cb"/><rect x="30" y="80" width="60" height="7" rx="3" fill="#9fc3d8"/><path d="M34 83.5h52" stroke="#fff" stroke-width="1" stroke-dasharray="3 3"/>` + vpFigure('ravi', { x: 60, y: 84, s: 0.95, legs: 'kneel', front: [3, -54], back: [-3, -54], elbow: [17, -44], backElbow: [-17, -44], eyes: 'closed', mouth: 'flat', over: `<path d="M-3.6-48V-60q3.6-9 7.2 0v12z" fill="${PEOPLE.ravi.skin}" stroke="${vpShade(PEOPLE.ravi.skin, 0.72)}" stroke-width="0.8"/><path d="M0-64v16" stroke="${vpShade(PEOPLE.ravi.skin, 0.72)}" stroke-width="0.8"/>` })),
  kuessen: vpFrame(`<circle cx="34" cy="48" r="22" fill="${PEOPLE.amina.skin}"/><path d="M12 48a22 22 0 0 1 30-21c-8 2-14 10-14 22z" fill="${PEOPLE.amina.hair}"/><path d="M44 44q3 2 6 0" fill="none" stroke="${VP_INK}" stroke-width="1.6" stroke-linecap="round"/>`
    + `<circle cx="86" cy="48" r="22" fill="${PEOPLE.ben.skin}"/><path d="M108 48a22 22 0 0 0-30-21c8 2 14 10 14 22z" fill="${PEOPLE.ben.hair}"/><path d="M70 44q3 2 6 0" fill="none" stroke="${VP_INK}" stroke-width="1.6" stroke-linecap="round"/>`
    + `<path d="M52 52q4-5 8-1v8q-4 4-8-1q2-3 0-6z" fill="#d9534f"/><path d="M68 52q-4-5-8-1v8q4 4 8-1q-2-3 0-6z" fill="#c8373a"/><path d="M60 26c-3-5-10-2-7 3l7 6 7-6c3-5-4-8-7-3z" fill="#d9534f"/>`),
  // An open exercise book; a hand presses a picture onto the page, the glue stick lies open beside it.
  kleben: vpFrame(`<path d="M12 30l46 4v42l-46-4z" fill="#fff" stroke="#b9c1bf"/><path d="M108 30l-50 4v42l50-4z" fill="#fff" stroke="#b9c1bf"/><path d="M18 46l34 3M18 54l34 3M18 62l34 3" stroke="#bfe3f2" stroke-width="1.2"/>`
    + `<g transform="rotate(-6 82 56)"><rect x="66" y="44" width="30" height="24" fill="#f2c14e" stroke="#c89a1e"/><circle cx="75" cy="52" r="4" fill="#d9534f"/><path d="M66 68l10-9 7 5 13-11v15z" fill="#4caf6e"/></g>`
    + vpHand(96, 40, 120, { pose: 'open', skin: SKIN.brown, sleeve: '#4caf6e' })
    + `<g transform="translate(34 85) rotate(-90)"><rect x="-4.5" y="-12" width="9" height="22" rx="2" fill="#fff" stroke="#9aa3a1"/><rect x="-3.5" y="-16" width="7" height="5" fill="#f6ecd8" stroke="#9aa3a1" stroke-width="0.6"/></g><rect x="52" y="81" width="9" height="8" rx="2" fill="#d9534f"/>`),
  // Scissors cutting paper along a dashed line.
  schneiden: vpFrame(`<path d="M14 30h56l6 40H20z" fill="#fff" stroke="#b9c1bf"/><path d="M24 50h44" stroke="#6b7775" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M70 46l10-2 0 8z" fill="#fff" stroke="#b9c1bf"/>`
    + `<g transform="translate(66 50)"><path d="M0 0 22-10l2 3z" fill="#b9c1bf" stroke="#6b7775" stroke-width="0.8"/><path d="M0 0 22 10l2-3z" fill="#cfd6d3" stroke="#6b7775" stroke-width="0.8"/><circle cx="6" cy="0" r="1.6" fill="#6b7775"/><circle cx="30" cy="-12" r="6" fill="none" stroke="#d9534f" stroke-width="3.2"/><circle cx="30" cy="12" r="6" fill="none" stroke="#d9534f" stroke-width="3.2"/></g>`
    + vpHand(104, 54, 180, { skin: SKIN.light, sleeve: '#3f7fc1' })),
  weinen: vpFrame(vpHead('lena', { x: 60, y: 44, k: 2, eyes: 'closed', mouth: 'sad', extra: `<path d="M-6-76q-2 6 0 8q2-2 0-8zM8-76q-2 6 0 8q2-2 0-8z" fill="#3f7fc1"/>` })),
  // Pain: a red spot on the skin with lightning, a face that hurts, «Aua!».
  fuehlen: vpFrame(vpHead('arjun', { x: 36, y: 34, k: 1.5, eyes: 'closed', mouth: 'sad' }) + `${vpLine('M52 70H104', vpShade(PEOPLE.arjun.skin, 0.8), 15)}${vpLine('M52 70H104', PEOPLE.arjun.skin, 13)}<ellipse cx="80" cy="70" rx="8" ry="4.5" fill="#d9534f" opacity="0.85"/><path transform="translate(72 54) scale(1)" d="M0-10 6-10 2-2 7-2-4 10-1 1-5 1z" fill="#f2c14e" stroke="#c89a1e" stroke-width="0.8" stroke-linejoin="round"/><path transform="translate(90 52) scale(1.2)" d="M0-10 6-10 2-2 7-2-4 10-1 1-5 1z" fill="#f2c14e" stroke="#c89a1e" stroke-width="0.8" stroke-linejoin="round"/><path transform="translate(82 88) scale(0.8)" d="M0-10 6-10 2-2 7-2-4 10-1 1-5 1z" fill="#f2c14e" stroke="#c89a1e" stroke-width="0.8" stroke-linejoin="round"/>${vpText(86, 30, 'Aua!', 13, '#d9534f')}`),
  lachen: vpFrame(vpFigure('arjun', { x: 60, y: 88, s: 1.15, eyes: 'happy', mouth: 'laugh', front: [9, -44], back: [-9, -44], over: `<path d="M-11-77q-1.5 4 0 5q1.5-1 0-5zM11-77q-1.5 4 0 5q1.5-1 0-5z" fill="#7fb8e6"/>` }) + vpText(22, 34, 'ha', 14, '#e8873a') + vpText(98, 26, 'ha', 16, '#d9534f') + vpText(100, 52, 'ha', 12, '#7a4fb0') + vpLine('M30 50l-6-3M90 64l6 2', '#e8873a', 2)),
  aufraeumen: vpFrame(`<path d="M30 52h56v32H30z" fill="#c8955a"/><path d="M30 52l-10-10h56l10 10z" fill="#e0b47a"/><path d="M86 52l10-10" stroke="#9a6238" stroke-width="2"/>` + vpBall(58, 30, 9) + vpArrow(76, 24, 76, 46) + `<rect x="36" y="58" width="10" height="10" fill="#3f7fc1"/>` + vpHand(66, 14, 100, { pose: 'open', skin: SKIN.light, sleeve: '#7a4fb0' })),
  putzen: vpFrame(`<rect x="22" y="14" width="60" height="64" rx="3" fill="#bfe3f2" stroke="#fff" stroke-width="4"/><path d="M52 14v64M22 46h60" stroke="#fff" stroke-width="4"/>${vpText(34, 32, '✦', 12, '#fff', 400)}${vpText(70, 66, '✦', 10, '#fff', 400)}<rect x="56" y="40" width="22" height="16" rx="4" fill="#f2c14e"/>` + vpHand(84, 52, 190, { skin: SKIN.brown, sleeve: '#e4572e' })),
};

// Pastel backgrounds like the profile figures, in turn.
const VP_BACKS = ['#d4f3e2', '#ffe0cf', '#e6defd', '#d6ebff', '#fbf0bf', '#ffdce8'];
Object.entries(VERB_PICTURES).forEach(([id, svg], i) => {
  DRAWINGS[`v-${id}`] = svg.replace('class="vp-bg" cx="60" cy="45" r="44" fill="#e6efec"', `class="vp-bg" cx="60" cy="45" r="44" fill="${VP_BACKS[i % VP_BACKS.length]}"`);
});
