// Profiles and progress, kept only in this browser. Learners are identified by a
// comic figure (avatars.js), not a name, so no personal data is stored. Profiles made
// with the earlier animals get a figure when they are loaded or imported.
const OLD_ANIMALS = ['🦊', '🐻', '🐼', '🦉', '🐢', '🦁', '🐸', '🐙', '🦋', '🐝', '🐧', '🦔'];
const PICKABLE = typeof AVATAR_KEYS !== 'undefined' ? AVATAR_KEYS : OLD_ANIMALS;
const ANIMALS = [...PICKABLE, ...OLD_ANIMALS];
const STORE_KEY = 'gwunderfitz:v1';
const MAX_FIX_LENGTH = 200;

// The figure an animal profile becomes: the same place in the list, or the first free one.
function figureFor(animal, taken) {
  if (PICKABLE === OLD_ANIMALS || !OLD_ANIMALS.includes(animal)) return animal;
  const wanted = PICKABLE[OLD_ANIMALS.indexOf(animal)];
  return wanted && !taken.has(wanted) ? wanted : PICKABLE.find((k) => !taken.has(k)) || animal;
}

function cleanFixes(fixes, knownIds, knownLangs) {
  const clean = {};
  for (const [key, text] of Object.entries(fixes && typeof fixes === 'object' ? fixes : {})) {
    const [code, id] = key.split(':');
    if (knownLangs.includes(code) && knownIds.has(id) && typeof text === 'string' && text.length <= MAX_FIX_LENGTH) clean[key] = text;
  }
  return clean;
}

const Store = {
  data: { active: null, profiles: {} },

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && saved.profiles) this.data = saved;
    } catch { /* private window or blocked storage: runs in memory only */ }
    // Profiles from before the current language list keep working.
    for (const p of this.profiles()) {
      if (!LANGUAGES.some((l) => l.code === p.lang)) p.lang = 'en';
      p.fixes = p.fixes || {};
      p.grammar = p.grammar || {};
      p.verbs = p.verbs || {};
      p.own = p.own || [];
      p.units = p.units || {};
    }
    // Animal profiles become figures; their progress moves along.
    for (const p of this.profiles()) {
      if (!OLD_ANIMALS.includes(p.animal)) continue;
      const taken = new Set(this.profiles().map((x) => x.animal));
      const key = figureFor(p.animal, taken);
      if (key !== p.animal) this.move(p.animal, key);
    }
    this.save();
  },

  // A profile under another figure; the active profile stays active.
  move(from, to) {
    const p = this.data.profiles[from];
    delete this.data.profiles[from];
    p.animal = to;
    this.data.profiles[to] = p;
    if (this.data.active === from) this.data.active = to;
  },

  // The learner chooses another figure; false when another profile has it.
  changeFigure(key) {
    if (!PICKABLE.includes(key) || (this.data.profiles[key] && key !== this.data.active)) return false;
    this.move(this.data.active, key);
    this.save();
    return true;
  },

  save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(this.data));
    } catch { /* see load() */ }
  },

  get profile() {
    return this.data.profiles[this.data.active] || null;
  },

  profiles() {
    return Object.values(this.data.profiles);
  },

  freeAnimals() {
    const taken = new Set(this.profiles().map((p) => p.animal));
    return PICKABLE.filter((a) => !taken.has(a));
  },

  createProfile(animal, lang) {
    this.data.profiles[animal] = { animal, lang, items: {}, fixes: {}, grammar: {}, verbs: {}, own: [], units: {} };
    this.data.active = animal;
    this.save();
  },

  select(animal) {
    this.data.active = animal;
    this.save();
  },

  signOut() {
    this.data.active = null;
    this.save();
  },

  // Corrections apply to this profile at once. They reach other students only
  // after review, so a wrong entry cannot mislead anyone else.
  setFix(code, itemId, text) {
    const key = `${code}:${itemId}`;
    const clean = text.trim();
    if (clean) this.profile.fixes[key] = clean;
    else delete this.profile.fixes[key];
    this.save();
  },

  addOwnWord(de, l1) {
    const id = `own-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const word = { id, de: de.trim(), l1: l1.trim(), lang: this.profile.lang };
    this.profile.own.push(word);
    this.save();
    return word;
  },

  // A drawing key (`pic`) or a photo ({ src, w, h }); an empty choice removes the picture.
  setOwnPicture(id, { pic, photo }) {
    const word = this.profile.own.find((w) => w.id === id);
    if (!word) return;
    delete word.pic;
    delete word.photo;
    if (pic) word.pic = pic;
    if (photo) word.photo = photo;
    this.save();
  },

  removeOwnWord(id) {
    this.profile.own = this.profile.own.filter((w) => w.id !== id);
    delete this.profile.items[id];
    this.save();
  },

  deleteProfile() {
    delete this.data.profiles[this.data.active];
    this.data.active = null;
    this.save();
  },

  exportProfile() {
    return JSON.stringify({ app: 'gwunderfitz', version: 1, profile: this.profile });
  },

  // Returns false when the text is not a usable save file.
  importProfile(text, knownIds, knownLangs) {
    let file;
    try {
      file = JSON.parse(text);
    } catch {
      return false;
    }
    const incoming = file && file.app === 'gwunderfitz' ? file.profile : null;
    if (!incoming || typeof incoming.items !== 'object' || !incoming.items) return false;
    if (!ANIMALS.includes(incoming.animal) || !knownLangs.includes(incoming.lang)) return false;
    // A file from an animal profile lands on that animal's figure.
    incoming.animal = OLD_ANIMALS.includes(incoming.animal) && PICKABLE !== OLD_ANIMALS
      ? PICKABLE[OLD_ANIMALS.indexOf(incoming.animal)] || PICKABLE[0] : incoming.animal;
    const mine = this.data.profiles[incoming.animal];
    // Own words from both sides, and the progress on each of them.
    const own = [...(mine ? mine.own : [])];
    for (const word of cleanOwnWords(incoming.own, knownLangs)) if (!own.some((w) => w.id === word.id)) own.push(word);
    const ids = new Set([...knownIds, ...own.map((w) => w.id)]);
    this.data.profiles[incoming.animal] = {
      animal: incoming.animal,
      lang: mine ? mine.lang : incoming.lang,
      items: mergeRecords(mine ? mine.items : {}, incoming.items, ids),
      fixes: { ...cleanFixes(incoming.fixes, knownIds, knownLangs), ...(mine ? mine.fixes : {}) },
      grammar: { ...(incoming.grammar && typeof incoming.grammar === 'object' ? incoming.grammar : {}), ...(mine ? mine.grammar : {}) },
      verbs: { ...(incoming.verbs && typeof incoming.verbs === 'object' ? incoming.verbs : {}), ...(mine ? mine.verbs : {}) },
      own,
      units: { ...(incoming.units && typeof incoming.units === 'object' ? incoming.units : {}), ...(mine ? mine.units : {}) },
    };
    this.data.active = incoming.animal;
    this.save();
    return true;
  },
};
