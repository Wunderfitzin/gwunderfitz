// Profiles and progress, kept only in this browser. Students are identified by
// an animal picture, not a name, so no personal data is stored.
const ANIMALS = ['🦊', '🐻', '🐼', '🦉', '🐢', '🦁', '🐸', '🐙', '🦋', '🐝', '🐧', '🦔'];
const STORE_KEY = 'gwunderfitz:v1';
const MAX_FIX_LENGTH = 200;

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
    }
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
    return ANIMALS.filter((a) => !taken.has(a));
  },

  createProfile(animal, lang) {
    this.data.profiles[animal] = { animal, lang, items: {}, fixes: {}, grammar: {}, verbs: {} };
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
    const mine = this.data.profiles[incoming.animal];
    this.data.profiles[incoming.animal] = {
      animal: incoming.animal,
      lang: mine ? mine.lang : incoming.lang,
      items: mergeRecords(mine ? mine.items : {}, incoming.items, knownIds),
      fixes: { ...cleanFixes(incoming.fixes, knownIds, knownLangs), ...(mine ? mine.fixes : {}) },
      grammar: { ...(incoming.grammar && typeof incoming.grammar === 'object' ? incoming.grammar : {}), ...(mine ? mine.grammar : {}) },
      verbs: { ...(incoming.verbs && typeof incoming.verbs === 'object' ? incoming.verbs : {}), ...(mine ? mine.verbs : {}) },
    };
    this.data.active = incoming.animal;
    this.save();
    return true;
  },
};
