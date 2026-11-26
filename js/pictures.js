// Person pictures: small scenes with drawn characters. The speaker is always the
// same woman with a speech bubble. Whoever is meant stands in colour on a warm glow;
// everyone else in the scene is grey.
const PEOPLE = {
  speaker: { look: 'ponytail', skin: '#c98d5e', hair: '#2b1d14', top: '#1f8a7a', bottom: '#34495e' },
  listener: { look: 'short', skin: '#f0c8a0', hair: '#7a4a25', top: '#6b7fd7', bottom: '#3a3f52' },
  man: { look: 'beard', skin: '#8d5a3a', hair: '#1c1410', top: '#e0a030', bottom: '#2f4a6b' },
  woman: { look: 'scarf', skin: '#e7b98f', hair: '#b24a6a', top: '#d9708f', bottom: '#5a4a7a' },
  child: { look: 'child', skin: '#d9a273', hair: '#3a2415', top: '#e4572e', bottom: '#2f6fb5', scale: 0.68 },
  elder: { look: 'suit', skin: '#f0d0b0', hair: '#c2c6c8', top: '#2f3a4a', bottom: '#2f3a4a' },
  schwegler: { look: 'bob', skin: '#f2cfae', hair: '#a8662e', top: '#7a4fb0', bottom: '#3a3f52', skirt: true },
  alexander: { look: 'ponytail', skin: '#7a4a2e', hair: '#17110d', top: '#e0a030', bottom: '#2f4a6b' },
  boetschi: { look: 'suit', skin: '#eec39c', hair: '#5a3a22', top: '#3f6d57', bottom: '#2e3a36' },
  oldwoman: { look: 'bob', skin: '#ecd0b6', hair: '#d6d9db', top: '#9a6a8a', bottom: '#5a5a6a', skirt: true },
  girl: { look: 'ponytail', skin: '#d9a273', hair: '#3a2415', top: '#e58aa6', bottom: '#5a4a7a', scale: 0.8 },
  grandpa: { look: 'beard', skin: '#e8c6a4', hair: '#d6d9db', top: '#8a9a7a', bottom: '#4a5560' },
  doctor: { look: 'bob', skin: '#b87f55', hair: '#23170f', top: '#f2f5f4', bottom: '#8ab4c4', skirt: true },
};
const GREY = { skin: '#dfe3e1', hair: '#b4bcba', top: '#c6cdcb', bottom: '#aeb6b4' };
const INK = '#23302f';

function drawHair(look, c, dir) {
  if (look === 'ponytail') return `<path d="M-14-80a14 14 0 0 1 28 0c-6-6-20-6-28 0z" fill="${c.hair}"/><path d="M${-13 * dir}-84c${-12 * dir} 2 ${-13 * dir} 18 ${-6 * dir} 26c${2 * dir}-8 ${3 * dir}-16 ${7 * dir}-22z" fill="${c.hair}"/>`;
  if (look === 'short') return `<path d="M-14-79a14 14 0 0 1 28 0l-4-2-6-3-8 3-6-1z" fill="${c.hair}"/>`;
  if (look === 'beard') return `<path d="M-14-80a14 14 0 0 1 28 0c-5-4-23-4-28 0z" fill="${c.hair}"/><path d="M-13-76c0 18 26 18 26 0-4 5-22 5-26 0z" fill="${c.hair}"/>`;
  if (look === 'scarf') return `<path d="M0-96a17 17 0 0 0-17 17c0 12 4 20 17 22 13-2 17-10 17-22a17 17 0 0 0-17-17zm0 5a11 11 0 0 1 11 12c0 7-4 12-11 12s-11-5-11-12a11 11 0 0 1 11-12z" fill="${c.hair}"/>`;
  if (look === 'bob') return `<path d="M-15-64c-3-40 33-40 30 0h-7c2-10 0-18-4-20-6 3-14 3-19 4-1 6-2 10 0 16z" fill="${c.hair}"/>`;
  if (look === 'curly') return [[-12, -86], [-7, -92], [0, -94], [7, -92], [12, -86], [-14, -79], [14, -79]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5" fill="${c.hair}"/>`).join('');
  if (look === 'straight') return `<path d="M-15-62c-4-42 34-42 30 0h-5v-23h-20v23z" fill="${c.hair}"/>`;
  if (look === 'child') return `<path d="M-14-78a14 14 0 0 1 28 0c-3-3-5-6-8-6-4 3-14 3-20 6z" fill="${c.hair}"/>`;
  return `<path d="M-14-78c-1-22 29-22 28 0-3-6-6-8-9-8h-10c-3 0-6 2-9 8z" fill="${c.hair}"/>`;
}

function drawFace(look, c, dir) {
  const eyes = `<circle cx="${-4.5 + dir * 1.5}" cy="-80" r="1.7" fill="${INK}"/><circle cx="${4.5 + dir * 1.5}" cy="-80" r="1.7" fill="${INK}"/>`;
  const smile = look === 'beard'
    ? `<path d="M${-3 + dir} -71q${3} 2 6 0" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`
    : `<path d="M${-4 + dir} -73q4 4 8 0" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`;
  const glasses = look === 'suit'
    ? `<g fill="none" stroke="${INK}" stroke-width="1"><circle cx="${-4.5 + dir * 1.5}" cy="-80" r="4"/><circle cx="${4.5 + dir * 1.5}" cy="-80" r="4"/></g>` : '';
  return eyes + smile + glasses;
}

function drawArm(c, dir, arm) {
  const side = arm === 'self' ? dir : dir;
  const hand = { point: [dir * 36, -68], shake: [dir * 34, -52], self: [dir * 2, -56] }[arm];
  const shoulderX = side * 12;
  return `<path d="M${shoulderX}-60L${hand[0]} ${hand[1]}" stroke="${c.top}" stroke-width="7" stroke-linecap="round"/><circle cx="${hand[0]}" cy="${hand[1]}" r="4.2" fill="${c.skin}"/>`;
}

function drawFigure(who, { x, s = 1, on = true, arm = null, dir = 1 }) {
  const person = PEOPLE[who];
  const c = on ? person : GREY;
  const size = s * (person.scale || 1);
  const skirt = person.skirt || person.look === 'scarf' || person.look === 'ponytail';
  const lower = skirt
    ? `<path d="M-12-36h24l5 28h-34z" fill="${c.bottom}"/><rect x="-8" y="-9" width="6" height="9" fill="${c.skin}"/><rect x="2" y="-9" width="6" height="9" fill="${c.skin}"/>`
    : `<rect x="-11" y="-36" width="10" height="36" rx="3" fill="${c.bottom}"/><rect x="1" y="-36" width="10" height="36" rx="3" fill="${c.bottom}"/>`;
  const shoes = `<ellipse cx="-6" cy="-1" rx="7" ry="3" fill="${INK}"/><ellipse cx="6" cy="-1" rx="7" ry="3" fill="${INK}"/>`;
  const tie = person.look === 'suit' ? `<path d="M0-63l-6-1 6 9 6-9zM0-58l-2.6 6 2.6 10 2.6-10z" fill="${on ? '#fff' : '#eee'}"/><path d="M0-58l-2.6 6 2.6 10 2.6-10z" fill="${on ? '#c8373a' : '#ddd'}"/>` : '';
  const stillArm = (side) => `<path d="M${side * 13}-60L${side * 17}-36" stroke="${c.top}" stroke-width="7" stroke-linecap="round"/><circle cx="${side * 17}" cy="-34" r="4.2" fill="${c.skin}"/>`;
  return `<g transform="translate(${x} 134) scale(${size})">${lower}${shoes}`
    + `<rect x="-14" y="-65" width="28" height="33" rx="9" fill="${c.top}"/>${tie}`
    + `<rect x="-4" y="-68" width="8" height="7" fill="${c.skin}"/>`
    + `<circle cy="-78" r="13" fill="${c.skin}"/>${drawHair(person.look, c, dir)}${drawFace(person.look, c, dir)}`
    + `${stillArm(-dir)}${arm ? drawArm(c, dir, arm) : stillArm(dir)}</g>`;
}

function drawGlow(x, s, wide = 42) {
  const ry = Math.min(60 * s, 66);
  return `<ellipse cx="${x}" cy="${134 - ry + 2}" rx="${wide * s}" ry="${ry}" fill="#ffe3cb"/>`;
}

function drawBubble(x) {
  return `<g transform="translate(${x + 14} 10)"><path d="M6 0h36a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H16l-9 9 2-9H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" fill="#fff" stroke="${INK}" stroke-width="1.6"/><circle cx="14" cy="12" r="2.4" fill="${INK}"/><circle cx="24" cy="12" r="2.4" fill="${INK}"/><circle cx="34" cy="12" r="2.4" fill="${INK}"/></g>`;
}

// Listeners stand behind the speaker, so the pointing arm is free.
const pointing = (x) => ({ who: 'speaker', x, on: false, arm: 'point' });
const listening = { who: 'listener', x: 30, on: false };

const PERSON_SCENES = {
  ich: { bubble: 94, people: [{ who: 'speaker', x: 110, arm: 'self', dir: -1, meant: true }] },
  du: { bubble: 46, people: [pointing(60), { who: 'man', x: 160, dir: -1, meant: true }] },
  er: { bubble: 76, people: [listening, pointing(90), { who: 'man', x: 176, s: 0.85, dir: -1, meant: true }] },
  sie: { bubble: 76, people: [listening, pointing(90), { who: 'woman', x: 176, s: 0.85, dir: -1, meant: true }] },
  es: { bubble: 76, people: [listening, pointing(90), { who: 'child', x: 174, s: 0.95, dir: -1, meant: true }] },
  wir: {
    bubble: 40,
    glow: [110, 1.08, 88],
    people: [{ who: 'speaker', x: 58, meant: true }, { who: 'man', x: 108, dir: -1, meant: true }, { who: 'woman', x: 150, dir: -1, meant: true }, { who: 'child', x: 186, dir: -1, meant: true }],
  },
  ihr: {
    bubble: 30,
    glow: [158, 1.05, 54],
    people: [pointing(44), { who: 'man', x: 130, dir: -1, meant: true }, { who: 'woman', x: 180, dir: -1, meant: true }],
  },
  siep: {
    bubble: 58,
    glow: [172, 0.82, 56],
    people: [{ who: 'listener', x: 24, on: false }, pointing(72), { who: 'man', x: 136, s: 0.72, dir: -1, meant: true }, { who: 'woman', x: 170, s: 0.72, dir: -1, meant: true }, { who: 'child', x: 200, s: 0.72, dir: -1, meant: true }],
  },
  Sie: {
    bubble: 36,
    people: [{ who: 'speaker', x: 72, on: false, arm: 'shake' }, { who: 'elder', x: 144, dir: -1, arm: 'shake', meant: true }],
  },
};

function personSvg(key) {
  const scene = PERSON_SCENES[key];
  const glows = scene.glow
    ? drawGlow(...scene.glow)
    : scene.people.filter((p) => p.meant).map((p) => drawGlow(p.x, p.s || 1)).join('');
  const figures = scene.people.map((p) => drawFigure(p.who, p)).join('');
  return `<svg viewBox="0 0 220 140" role="presentation">${glows}<path d="M6 134h208" stroke="#cfd6d3" stroke-width="2"/>${figures}${drawBubble(scene.bubble)}</svg>`;
}

function figureSvg(who) {
  return `<svg viewBox="0 0 110 140" role="presentation">${drawFigure(who, { x: 55 })}</svg>`;
}

