// Verb course: present tense. Data, conjugation and exercise generators, no DOM.
// Sections: the verbs to learn, regular verbs (with persons and Sie), irregular verbs, haben and sein.

const PERSONS = [
  { key: 'ich', de: 'ich', group: 'ich' },
  { key: 'du', de: 'du', group: 'du' },
  { key: 'er', de: 'er', group: 'er' },
  { key: 'sie', de: 'sie', group: 'er' },
  { key: 'es', de: 'es', group: 'er' },
  { key: 'wir', de: 'wir', group: 'wir' },
  { key: 'ihr', de: 'ihr', group: 'ihr' },
  { key: 'siep', de: 'sie', group: 'wir' },
  { key: 'Sie', de: 'Sie', group: 'wir' },
];

const ENDINGS = { ich: 'e', du: 'st', er: 't', wir: 'en', ihr: 't' };

// `forms` holds what differs from the regular pattern. `kind`: regular, core, irregular.
const VERBS = [
  { id: 'lernen', pic: '📚', kind: 'regular', rest: 'Deutsch' },
  { id: 'machen', pic: '🛠️', kind: 'regular', rest: 'ein Vogelhaus' },
  { id: 'spielen', pic: '⚽', kind: 'regular', rest: 'Fussball' },
  { id: 'wohnen', pic: '🏠', kind: 'regular', rest: 'in Bern' },
  { id: 'kochen', pic: '🍳', kind: 'regular', rest: 'Reis' },
  { id: 'hoeren', de: 'hören', pic: '🎧', kind: 'regular', rest: 'Musik' },
  { id: 'kaufen', pic: '🛒', kind: 'regular', rest: 'Brot' },
  { id: 'trinken', pic: '🥤', kind: 'regular', rest: 'Wasser' },
  { id: 'gehen', pic: '🚶', kind: 'regular', rest: 'in die Schule' },
  { id: 'kommen', pic: '➡️', kind: 'regular', rest: 'aus Bern' },
  { id: 'haben', pic: '🤲', kind: 'core', forms: { ich: 'habe', du: 'hast', er: 'hat', wir: 'haben', ihr: 'habt' } },
  { id: 'sein', pic: '🧍', kind: 'core', forms: { ich: 'bin', du: 'bist', er: 'ist', wir: 'sind', ihr: 'seid' } },
  { id: 'fahren', pic: '🚗', kind: 'irregular', change: 'ä', forms: { du: 'fährst', er: 'fährt' }, rest: 'nach Zürich' },
  { id: 'schlafen', pic: '😴', kind: 'irregular', change: 'ä', forms: { du: 'schläfst', er: 'schläft' }, rest: 'lange' },
  { id: 'essen', pic: '🍽️', kind: 'irregular', change: 'i', forms: { du: 'isst', er: 'isst' }, rest: 'Reis' },
  { id: 'sprechen', pic: '💬', kind: 'irregular', change: 'i', forms: { du: 'sprichst', er: 'spricht' }, rest: 'Deutsch' },
  { id: 'lesen', pic: '📖', kind: 'irregular', change: 'ie', forms: { du: 'liest', er: 'liest' }, rest: 'ein Buch' },
  { id: 'sehen', pic: '👀', kind: 'irregular', change: 'ie', forms: { du: 'siehst', er: 'sieht' }, rest: 'einen Film' },
];
VERBS.forEach((v) => { v.de = v.de || v.id; v.stem = v.de.replace(/e?n$/, ''); });

const MIXED_SENTENCES = [
  { person: 'ich', verb: 'sein', rest: 'zwölf Jahre alt' },
  { person: 'wir', verb: 'haben', rest: 'Durst' },
  { person: 'er', verb: 'sein', rest: 'Lehrer' },
  { person: 'sie', verb: 'haben', rest: 'ein Buch' },
  { person: 'du', verb: 'haben', rest: 'Zeit' },
  { person: 'ich', verb: 'sein', rest: 'krank' },
];

const RULE_KEYS = ['verb1', 'verb2', 'verb3', 'pers1', 'pers2', 'konj1', 'konj2', 'konj3', 'sein1', 'haben1', 'wann1', 'wann2', 'wann3', 'ur1', 'ur2', 'ur3', 'ur4', 'ur5'];
const RULES = {
  verb1: { de: 'Verben sagen, was jemand macht.' },
  verb2: { de: 'Die Grundform heisst Infinitiv. Sie endet meistens auf -en.' },
  verb3: { de: 'Verben schreibt man klein.' },
  pers1: { de: 'Die Personen sagen, wer etwas macht.' },
  pers2: { de: 'Sie mit grossem S ist höflich. Das sagst du zu Erwachsenen, die du nicht gut kennst.' },
  konj1: { de: 'Das Verb ändert sich je nach Person. Das heisst konjugieren.' },
  konj2: { de: 'Der Stamm bleibt gleich. Die Endung ändert sich.' },
  konj3: { de: 'Diese Endungen gelten für alle regelmässigen Verben.' },
  sein1: { de: 'sein ist ganz besonders. Lerne jede Form auswendig.' },
  haben1: { de: 'haben ist fast regelmässig. Nur du hast und er hat sind anders.' },
  wann1: { de: 'sein sagt, wer oder wie jemand ist.' },
  wann2: { de: 'haben sagt, was jemand hat. Auch Hunger, Durst und Zeit hat man.' },
  wann3: { de: 'Achtung: Das Alter sagt man mit sein.' },
  ur1: { de: 'Bei unregelmässigen Verben ändert sich der Vokal im Stamm.' },
  ur2: { de: 'Das passiert nur bei du und er, sie, es.' },
  ur3: { de: 'Aus a wird ä.' },
  ur4: { de: 'Aus e wird i.' },
  ur5: { de: 'Aus e wird ie.' },
};

const VERB_UI_KEYS = ['course', 'basics', 'regular', 'core', 'irregular', 'intro', 'learn', 'test', 'passed', 'failed', 'continueHere', 'match', 'gap', 'whoIsIt'];
Object.assign(STRINGS, {
  course: { de: 'Verben im Präsens' }, basics: { de: 'Grundlagen' }, regular: { de: 'Regelmässige Verben' },
  core: { de: 'haben und sein' }, irregular: { de: 'Unregelmässige Verben' }, intro: { de: 'Einführung' },
  learn: { de: 'Lernen' }, test: { de: 'Test' }, passed: { de: 'Test bestanden!' },
  failed: { de: 'Noch nicht bestanden. Übe noch einmal.' }, continueHere: { de: 'Hier geht es weiter' },
  match: { de: 'Finde die Paare.' }, gap: { de: 'Ergänze die Lücke.' }, whoIsIt: { de: 'Wer ist das?' },
});

const verbL1 = typeof VERB_L1 !== 'undefined' ? VERB_L1 : require('./verbs-l1.js').VERB_L1;
const VERB_TEXT_COUNT = 9 + 18 + 9 + 9 + 6 + 18 + 14;

function buildVerbTexts() {
  const assign = (code, parts) => {
    const take = (n) => parts.splice(0, n);
    const set = (list, texts, field) => list.forEach((x, i) => { (x[field] = x[field] || {})[code] = texts[i]; });
    set(PERSONS, take(PERSONS.length), 't');
    set(VERBS, take(VERBS.length), 't');
    set(PERSONS, take(PERSONS.length), 'tired');
    set(PERSONS, take(PERSONS.length), 'hungry');
    set(MIXED_SENTENCES, take(MIXED_SENTENCES.length), 't');
    set(RULE_KEYS.map((k) => RULES[k]), take(RULE_KEYS.length), 't');
    set(VERB_UI_KEYS.map((k) => STRINGS[k]), take(VERB_UI_KEYS.length), 'all');
    VERB_UI_KEYS.forEach((k) => { STRINGS[k][code] = STRINGS[k].all[code]; });
  };
  for (const [code, text] of Object.entries(verbL1)) assign(code, text.split('|'));
  VERB_UI_KEYS.forEach((k) => { delete STRINGS[k].all; });
}
buildVerbTexts();

// ---- More verbs. The texts of everything below are keyed by id in verbs-more-l1.js. ----

const verbMore = typeof VERB_MORE_L1 !== 'undefined' ? VERB_MORE_L1 : require('./verbs-more-l1.js').VERB_MORE_L1;

const MORE_VERBS = [
  { id: 'schreiben', pic: '🖊️', kind: 'regular', rest: 'eine Nachricht' },
  { id: 'fragen', pic: '❓', kind: 'regular', rest: 'die Lehrerin' },
  { id: 'heissen', pic: '🏷️', kind: 'regular', rest: 'Meier' },
  { id: 'arbeiten', pic: '🧑‍🌾', kind: 'regular', rest: 'im Büro' },
  { id: 'finden', pic: '🔍', kind: 'regular', rest: 'den Schlüssel' },
  { id: 'malen', pic: '🎨', kind: 'regular', rest: 'ein Bild' },
  { id: 'singen', pic: '🎤', kind: 'regular', rest: 'ein Lied' },
  { id: 'brauchen', pic: '🧾', kind: 'regular', rest: 'ein Pflaster' },
  { id: 'laufen', pic: '👟', kind: 'irregular', change: 'ä', forms: { du: 'läufst', er: 'läuft' }, rest: 'schnell' },
  { id: 'geben', pic: '🎁', kind: 'irregular', change: 'i', forms: { du: 'gibst', er: 'gibt' }, rest: 'ein Geschenk' },
  { id: 'nehmen', pic: '🫳', kind: 'irregular', change: 'i', forms: { du: 'nimmst', er: 'nimmt' }, rest: 'einen Apfel' },
  { id: 'helfen', pic: '🙌', kind: 'irregular', change: 'i', forms: { du: 'hilfst', er: 'hilft' }, rest: 'gern' },
  { id: 'schwimmen', kind: 'regular', rest: 'im See' },
  { id: 'tanzen', kind: 'regular', rest: 'gern' },
  { id: 'beten', kind: 'regular', rest: 'leise' },
  { id: 'kuessen', de: 'küssen', kind: 'regular', rest: 'dich' },
  { id: 'kleben', kind: 'regular', rest: 'ein Bild ins Heft' },
  { id: 'schneiden', kind: 'regular', rest: 'das Papier' },
  { id: 'weinen', kind: 'regular', rest: 'leise' },
  { id: 'fuehlen', de: 'fühlen', kind: 'regular', rest: 'Schmerzen' },
  { id: 'lachen', kind: 'regular', rest: 'laut' },
  // Separable (ich räume auf): only in the vocabulary part, not in the conjugation exercises.
  { id: 'aufraeumen', de: 'aufräumen', kind: 'separable', particle: 'auf', rest: 'das Zimmer' },
  { id: 'putzen', kind: 'regular', rest: 'das Fenster' },
];
MORE_VERBS.forEach((v) => {
  v.de = v.de || v.id;
  // A separable verb conjugates without its particle: ich räume … auf.
  v.stem = v.de.slice((v.particle || '').length).replace(/e?n$/, '');
  v.t = verbMore.verbs[v.id];
  VERBS.push(v);
});
// Every verb has its own scene in verb-pictures.js.
VERBS.forEach((v) => { v.pic = `v-${v.id}`; });
// sein and haben get a rest that fits their pictures (pointing at oneself, holding a ball).
VERBS.find((v) => v.id === 'sein').rest = 'hier';
VERBS.find((v) => v.id === 'haben').rest = 'einen Ball';

const MORE_RULES = {
  regT: 'Endet der Stamm auf -t oder -d, kommt ein e dazu: du arbeitest, er arbeitet, ihr arbeitet.',
  regS: 'Endet der Stamm auf -s, -ss oder -z, bekommt du nur ein -t: du heisst.',
  sie1: 'Mit Sie hat das Verb die gleiche Form wie mit wir: wir lernen, Sie lernen.',
  sie2: 'Sie schreibt man immer gross, auch mitten im Satz.',
  ur3b: 'Auch aus au wird äu: du läufst, er läuft.',
  ur4b: 'nehmen ist besonders: du nimmst, er nimmt.',
};
for (const [key, de] of Object.entries(MORE_RULES)) RULES[key] = { de, t: verbMore.rules[key] };

const MORE_UI = {
  vocab: 'Die wichtigsten Verben', memory: 'Memory: Finde die Paare.', letters: 'Leg die Buchstaben richtig hin.',
  whichPerson: 'Welche Person passt?', polite: 'Frag höflich mit Sie.', sortGroup: 'Zu welcher Gruppe gehört das Verb?',
  legendEnding: 'Endung', legendVowel: 'anderer Vokal', legendExtra: 'e dazu', legendChanged: 'ganz anders', legendShort: 'du: nur -t',
};
for (const [key, de] of Object.entries(MORE_UI)) STRINGS[key] = { de, ...verbMore.ui[key] };
// The three groups of irregular verbs: the same label in every language.
const CATEGORY = { ä: 'catAe', i: 'catI', ie: 'catIe' };
for (const [change, key] of Object.entries(CATEGORY)) {
  const label = `${change === 'ä' ? 'a' : 'e'} → ${change}`;
  STRINGS[key] = Object.fromEntries(['de', ...Object.keys(verbMore.ui.vocab)].map((code) => [code, label]));
}

const MORE_MIXED = [
  { person: 'du', verb: 'sein', rest: 'in der Schule' },
  { person: 'wir', verb: 'sein', rest: 'Freunde' },
  { person: 'ihr', verb: 'haben', rest: 'Hunger' },
  { person: 'ich', verb: 'haben', rest: 'eine Schwester' },
  { person: 'siep', verb: 'sein', rest: 'Geschwister' },
  { person: 'er', verb: 'haben', rest: 'Angst' },
  { person: 'ihr', verb: 'sein', rest: 'zu spät' },
  { person: 'sie', verb: 'sein', rest: 'zehn Jahre alt' },
];
MORE_MIXED.forEach((s, i) => { s.t = verbMore.sentences[i]; MIXED_SENTENCES.push(s); });

// Questions to ask politely. {v} is the verb, {V} the verb at the start, {p} the person.
const SIE_QUESTIONS = [
  { verb: 'wohnen', q: 'Wo {v} {p}?' },
  { verb: 'kommen', q: 'Woher {v} {p}?' },
  { verb: 'heissen', q: 'Wie {v} {p}?' },
  { verb: 'lernen', q: '{V} {p} gern Deutsch?' },
  { verb: 'trinken', q: 'Was {v} {p} gern?' },
  { verb: 'spielen', q: '{V} {p} Fussball?' },
  { verb: 'brauchen', q: 'Was {v} {p}?' },
  { verb: 'arbeiten', q: 'Wo {v} {p}?' },
  { verb: 'kochen', q: 'Was {v} {p} heute?' },
  { verb: 'hoeren', q: 'Welche Musik {v} {p}?' },
  { verb: 'machen', q: 'Was {v} {p} am Wochenende?' },
  { verb: 'sprechen', q: '{V} {p} Deutsch?' },
  { verb: 'fahren', q: '{V} {p} nach Bern?' },
  { verb: 'lesen', q: 'Was {v} {p} gern?' },
  { verb: 'helfen', q: '{V} {p} mir?' },
  { verb: 'haben', q: '{V} {p} Zeit?' },
  { verb: 'sein', q: '{V} {p} müde?' },
  { verb: 'sein', q: 'Wie alt {v} {p}?' },
];

const person = (key) => PERSONS.find((p) => p.key === key);
const verb = (id) => VERBS.find((v) => v.id === id);

// A stem on -t or -d takes an extra e (du arbeitest); on -s or -z, du only takes -t (du heisst).
function ending(v, group) {
  if (/[td]$/.test(v.stem) && ['du', 'er', 'ihr'].includes(group)) return `e${ENDINGS[group]}`;
  if (/[szx]$/.test(v.stem) && group === 'du') return 't';
  return ENDINGS[group];
}

function conjugate(v, personKey) {
  const { group } = person(personKey);
  return (v.forms && v.forms[group]) || v.stem + ending(v, group);
}

// A form in marked parts, so a table can show exactly what is regular and what is not:
// mark 'vowel' (the changed vowel, `was` holds the old one), 'extra' (du arbeitest),
// 'ending', 'short' (du heisst: only -t), or 'changed' (a form that has to be learned whole, like bin or hast).
function formParts(v, personKey) {
  const { group } = person(personKey);
  const form = conjugate(v, personKey);
  const end = ending(v, group);
  if (v.id === 'sein' || !form.endsWith(end)) return [{ text: form, mark: 'changed' }];
  const base = form.slice(0, form.length - end.length);
  const { stem } = v;
  let p = 0;
  while (p < base.length && p < stem.length && base[p] === stem[p]) p += 1;
  let s = 0;
  while (s < base.length - p && s < stem.length - p && base[base.length - 1 - s] === stem[stem.length - 1 - s]) s += 1;
  // lesen → liest: only an i comes in; mark the whole new vowel, e → ie.
  if (s && p === stem.length - s) s -= 1;
  const changed = base.slice(p, base.length - s);
  if (base !== stem && !changed) return [{ text: form, mark: 'changed' }];
  const parts = [{ text: base.slice(0, p) }];
  if (changed) parts.push({ text: changed, mark: 'vowel', was: stem.slice(p, stem.length - s) });
  if (s) parts.push({ text: base.slice(base.length - s) });
  if (end !== ENDINGS[group] && end.startsWith('e')) parts.push({ text: 'e', mark: 'extra' }, { text: end.slice(1), mark: 'ending' });
  else parts.push({ text: end, mark: group === 'du' && end === 't' ? 'short' : 'ending' });
  return parts.filter((part) => part.text);
}

const capital = (text) => text[0].toUpperCase() + text.slice(1);

function sentence(v, personKey, rest = v.rest) {
  const end = v.particle ? `${rest} ${v.particle}` : rest;
  return `${capital(person(personKey).de)} ${conjugate(v, personKey)} ${end}.`;
}

function gapped(personKey, rest) {
  return `${capital(person(personKey).de)} ___ ${rest}.`;
}

function pickOne(list, rnd) {
  return list[Math.floor(rnd() * list.length)];
}

function distinct(answer, others, n, rnd) {
  const options = [answer];
  for (const other of shuffle(others, rnd)) {
    if (options.length === n) break;
    if (!options.includes(other)) options.push(other);
  }
  return shuffle(options, rnd);
}

const FIVE = ['ich', 'du', 'er', 'wir', 'ihr'];

// Persons whose forms differ, so every pair has exactly one partner (er lernt = ihr lernt).
function uniqueForms(v, rnd) {
  const seen = new Set();
  return shuffle(FIVE, rnd).filter((k) => {
    const form = conjugate(v, k);
    return !seen.has(form) && seen.add(form);
  });
}

function fillQuestion(q, form, pron) {
  return q.q.replace('{V}', capital(form)).replace('{v}', form).replace('{p}', pron);
}

// ---- Exercise generators. Each returns one question for the course screen. ----

const Q = {
  personFromPicture(rnd) {
    const p = pickOne(PERSONS, rnd);
    return {
      kind: 'choice', task: 'whoIsIt', person: p.key, answer: p.de, full: p.de, feedbackL1: p.t,
      options: distinct(p.de, PERSONS.map((x) => x.de), 4, rnd),
    };
  },
  personFromL1(rnd) {
    const p = pickOne(PERSONS, rnd);
    return {
      kind: 'choice', task: 'pickDe', l1: p.t, answer: p.de, full: p.de, feedbackL1: p.t, person: p.key,
      options: distinct(p.de, PERSONS.map((x) => x.de), 4, rnd),
    };
  },
  verbFromSound(list, rnd) {
    const v = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'listen', listen: v.de, answer: v.pic, full: v.de, feedbackL1: v.t, pic: v.pic, pictures: true,
      options: distinct(v.pic, VERBS.map((x) => x.pic), 4, rnd),
    };
  },
  verbFromL1(list, rnd) {
    const v = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'pickDe', l1: v.t, pic: v.pic, answer: v.de, full: v.de, feedbackL1: v.t,
      options: distinct(v.de, (list.length >= 4 ? list : VERBS).map((x) => x.de), 4, rnd),
    };
  },
  // The verb from its letters, then typed: picture and translation as the prompt.
  verbLetters(list, rnd) {
    const v = pickOne(list, rnd);
    return { kind: 'letters', task: 'letters', pic: v.pic, l1: v.t, answer: v.de, full: v.de, feedbackL1: v.t };
  },
  verbTyped(list, rnd) {
    const v = pickOne(list, rnd);
    return { kind: 'type', task: 'type', pic: v.pic, l1: v.t, answer: v.de, full: v.de, feedbackL1: v.t };
  },
  // Memory: a drawing and its verb make a pair.
  memoryPictures(list, rnd, size = 6) {
    const verbs = shuffle(list, rnd).slice(0, size);
    const cards = verbs.flatMap((v) => [{ pair: v.id, pic: v.pic, say: v.de }, { pair: v.id, text: v.de, say: v.de }]);
    return { kind: 'memory', task: 'memory', cards: shuffle(cards, rnd) };
  },
  // Memory: a person and its form make a pair (ich – bin).
  memoryForms(list, rnd) {
    const v = pickOne(list, rnd);
    const cards = uniqueForms(v, rnd).flatMap((k) => {
      const said = `${person(k).de} ${conjugate(v, k)}`;
      return [{ pair: k, text: person(k).de, say: said }, { pair: k, text: conjugate(v, k), say: said }];
    });
    return { kind: 'memory', task: 'memory', pic: v.pic, verbName: v.de, feedbackL1: v.t, cards: shuffle(cards, rnd) };
  },
  ending(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const end = ending(v, p.group);
    return {
      kind: 'choice', task: 'gap', person: p.key, pic: v.pic, text: `${p.de} ${v.stem}___`, answer: end,
      full: `${p.de} ${conjugate(v, p.key)}`, feedbackL1: v.t, options: ['e', 'st', 't', 'en'],
    };
  },
  gap(list, rnd, typed = false) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = conjugate(v, p.key);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: p.key, pic: v.pic, text: gapped(p.key, v.rest), answer,
      full: sentence(v, p.key), feedbackL1: v.t,
      options: distinct(answer, FIVE.map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  // The form is given; which person goes with it? Only persons with a different form are offered.
  pronoun(list, rnd) {
    const v = pickOne(list, rnd);
    const key = pickOne(['ich', 'du', 'wir'], rnd);
    const form = conjugate(v, key);
    const answer = capital(person(key).de);
    const others = FIVE.filter((k) => conjugate(v, k) !== form).map((k) => capital(person(k).de));
    return {
      kind: 'choice', task: 'whichPerson', pic: v.pic, text: `___ ${form} ${v.rest}.`, answer,
      full: sentence(v, key), feedbackL1: v.t, options: distinct(answer, others, 4, rnd),
    };
  },
  // The words of a sentence in the right order; the picture shows who.
  build(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS.filter((x) => !['es', 'siep'].includes(x.key)), rnd);
    const full = sentence(v, p.key);
    return { kind: 'build', task: 'build', person: p.key, pic: v.pic, text: v.de, words: full.split(' '), answer: full, full, feedbackL1: v.t };
  },
  formFromSound(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = conjugate(v, p.key);
    return {
      kind: 'choice', task: 'listen', listen: `${p.de} ${answer}`, answer, full: `${p.de} ${answer}`, feedbackL1: v.t, pic: v.pic,
      options: distinct(answer, FIVE.map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  match(list, rnd) {
    const v = pickOne(list, rnd);
    const pairs = uniqueForms(v, rnd).slice(0, 4).map((k) => ({ left: person(k).de, right: conjugate(v, k) }));
    return { kind: 'match', task: 'match', pic: v.pic, pairs, verbName: v.de, feedbackL1: v.t, full: v.de };
  },
  // sein and haben: from the student's own language to each exact form.
  coreFromL1(id, rnd, typed = false) {
    const v = verb(id);
    const p = pickOne(PERSONS, rnd);
    const rest = id === 'sein' ? 'müde' : 'Hunger';
    const field = id === 'sein' ? 'tired' : 'hungry';
    const answer = conjugate(v, p.key);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: p.key, l1: p[field], text: gapped(p.key, rest), answer,
      full: sentence(v, p.key, rest), feedbackL1: p[field],
      options: distinct(answer, FIVE.map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  haveOrBe(rnd, typed = false) {
    const s = pickOne(MIXED_SENTENCES, rnd);
    const answer = conjugate(verb(s.verb), s.person);
    const other = conjugate(verb(s.verb === 'sein' ? 'haben' : 'sein'), s.person);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: s.person, l1: s.t, text: gapped(s.person, s.rest), answer,
      full: sentence(verb(s.verb), s.person, s.rest), feedbackL1: s.t, options: shuffle([answer, other], rnd),
    };
  },
  vowel(list, rnd) {
    const v = pickOne(list, rnd);
    const key = pickOne(['du', 'er', 'sie', 'es'], rnd);
    const answer = conjugate(v, key);
    const naive = v.stem + ending(v, person(key).group);
    return {
      kind: 'choice', task: 'gap', person: key, pic: v.pic, text: gapped(key, v.rest), answer,
      full: sentence(v, key), feedbackL1: v.t, options: distinct(answer, [naive, conjugate(v, 'ich'), conjugate(v, 'wir')], 3, rnd),
    };
  },
  // -s, -ss, -z: du only takes -t. The usual mistake, -st, is offered beside it.
  duShort(list, rnd) {
    const v = pickOne(list, rnd);
    const answer = conjugate(v, 'du');
    return {
      kind: 'choice', task: 'gap', person: 'du', pic: v.pic, text: gapped('du', v.rest), answer, full: sentence(v, 'du'),
      feedbackL1: RULES.regS.t, options: distinct(answer, [`${answer.slice(0, -1)}st`, conjugate(v, 'ich')], 3, rnd),
    };
  },
  // A du question becomes a polite Sie question.
  duToSie(verbs, rnd) {
    const q = pickOne(SIE_QUESTIONS.filter((x) => verbs.some((v) => v.id === x.verb)), rnd);
    const v = verb(q.verb);
    const answer = fillQuestion(q, conjugate(v, 'Sie'), 'Sie');
    const wrong = ['du', 'er'].map((k) => fillQuestion(q, conjugate(v, k), 'Sie'));
    return {
      kind: 'choice', task: 'polite', figure: 'elder', text: fillQuestion(q, conjugate(v, 'du'), 'du'), answer, full: answer,
      feedbackL1: RULES.sie1.t, options: distinct(answer, wrong, 3, rnd),
    };
  },
  sieGap(list, rnd) {
    const v = pickOne(list, rnd);
    const answer = capital(conjugate(v, 'Sie'));
    return {
      kind: 'choice', task: 'gap', figure: 'elder', text: `___ Sie ${v.rest}?`, answer, full: `${answer} Sie ${v.rest}?`,
      feedbackL1: RULES.sie1.t, options: distinct(answer, ['ich', 'du', 'er'].map((k) => capital(conjugate(v, k))), 3, rnd),
    };
  },
  // Cards into baskets: the three vowel groups, or regular and irregular.
  sortGroups(rnd) {
    const cards = shuffle(IRREGULAR, rnd).slice(0, 6).map((v) => ({ de: v.de, t: v.t, basket: CATEGORY[v.change] }));
    return { kind: 'sort', task: 'sortGroup', baskets: ['catAe', 'catI', 'catIe'], cards };
  },
  sortRegular(rnd) {
    const cards = shuffle([...shuffle(REGULAR, rnd).slice(0, 3), ...shuffle(IRREGULAR, rnd).slice(0, 3)], rnd)
      .map((v) => ({ de: v.de, t: v.t, basket: v.kind }));
    return { kind: 'sort', task: 'sortGroup', baskets: ['regular', 'irregular'], cards };
  },
};

const REGULAR = VERBS.filter((v) => v.kind === 'regular');
const IRREGULAR = VERBS.filter((v) => v.kind === 'irregular');
const CORE = VERBS.filter((v) => v.kind === 'core');
// Regular verbs whose endings follow the table exactly: the ending exercises use only these.
const PLAIN = REGULAR.filter((v) => !/[tdszx]$/.test(v.stem));
const SPECIAL = ['arbeiten', 'finden', 'beten', 'schneiden'].map(verb);
// -s, -ss, -z: du only takes -t. Taught with the irregular verbs, so the regular part leaves these out.
const S_REGULAR = REGULAR.filter((v) => /[szx]$/.test(v.stem));
const S_GROUP = [...S_REGULAR, verb('essen'), verb('lesen')];
const REGULAR_EARLY = REGULAR.filter((v) => !S_REGULAR.includes(v));
const IRREGULAR_ALL = [...IRREGULAR, ...S_REGULAR];
const byChange = (change) => IRREGULAR.filter((v) => v.change === change);
const UR_AE = byChange('ä');
const UR_I = byChange('i');
const UR_IE = byChange('ie');

const VOCAB_GROUPS = [
  { id: 'wortschatz-1', title: 'So stelle ich mich vor', verbs: ['sein', 'haben', 'heissen', 'wohnen', 'kommen', 'gehen'] },
  { id: 'wortschatz-2', title: 'In der Schule', verbs: ['lernen', 'schreiben', 'lesen', 'malen', 'fragen', 'sprechen'] },
  { id: 'wortschatz-3', title: 'Zu Hause', verbs: ['kochen', 'essen', 'trinken', 'schlafen', 'machen', 'brauchen'] },
  { id: 'wortschatz-4', title: 'In der Freizeit', verbs: ['spielen', 'singen', 'tanzen', 'schwimmen', 'hoeren', 'sehen', 'laufen', 'fahren'] },
  { id: 'wortschatz-5', title: 'Miteinander', verbs: ['kaufen', 'geben', 'nehmen', 'helfen', 'finden', 'arbeiten'] },
  { id: 'wortschatz-6', title: 'Gefühle', verbs: ['lachen', 'weinen', 'fuehlen', 'kuessen', 'beten'] },
  { id: 'wortschatz-7', title: 'Basteln und aufräumen', verbs: ['kleben', 'schneiden', 'aufraeumen', 'putzen'] },
];

function mix(makers, count, rnd) {
  return Array.from({ length: count }, (_, i) => makers[i % makers.length](rnd));
}

function learnVerb(v) {
  return { learn: { pic: v.pic, de: v.de, t: v.t } };
}

function learnPerson(p) {
  return { learn: { person: p.key, de: p.de, t: p.t } };
}

function learnForm(id, rest, field) {
  const v = verb(id);
  return PERSONS.map((p) => ({ learn: { person: p.key, de: sentence(v, p.key, rest), t: p[field] } }));
}

// One group of irregular verbs: the rule with a table, each verb, then the rule again.
function urSteps(rule, verbs, last) {
  return [{ rule, table: verbs[0].id }, ...verbs.map(learnVerb), last || { rule, table: verbs[verbs.length - 1].id }];
}

function urPractice(list) {
  return (r) => mix([(x) => Q.vowel(list, x), (x) => Q.match(list, x), (x) => Q.gap(list, x), (x) => Q.formFromSound(list, x), (x) => Q.gap(list, x, true), (x) => Q.memoryForms(list, x)], 12, r);
}

// The fixed path. Practice repeats wrong answers; a test needs PASS_SHARE right.
const PASS_SHARE = 0.8;
const COURSE = [
  {
    section: 'vocab',
    stations: [
      { id: 'was', kind: 'intro', title: 'Was sind Verben?', steps: () => [{ rule: 'verb1', verbs: ['lernen', 'spielen', 'kochen'] }, { rule: 'verb2', verbs: ['wohnen', 'kaufen', 'hoeren'] }, { rule: 'verb3', verbs: ['lernen', 'gehen', 'kommen'] }] },
      ...VOCAB_GROUPS.map((g) => {
        const verbs = g.verbs.map(verb);
        return {
          id: g.id, kind: 'learn', title: g.title, steps: () => verbs.map(learnVerb),
          questions: (r) => mix([(x) => Q.verbFromSound(verbs, x), (x) => Q.verbFromL1(verbs, x), (x) => Q.verbLetters(verbs, x)], 9, r),
        };
      }),
      { id: 'verben-memory', kind: 'practice', title: 'Memory', questions: (r) => mix([(x) => Q.memoryPictures(VERBS, x)], 3, r) },
      { id: 'verben-schreiben', kind: 'practice', title: 'Verben schreiben', questions: (r) => mix([(x) => Q.verbLetters(VERBS, x), (x) => Q.verbTyped(VERBS, x)], 12, r) },
      { id: 'wortschatz-test', kind: 'test', title: 'Alle Verben', questions: (r) => mix([(x) => Q.verbFromL1(VERBS, x), (x) => Q.verbFromSound(VERBS, x), (x) => Q.verbTyped(VERBS, x)], 15, r) },
    ],
  },
  {
    section: 'regular',
    stations: [
      { id: 'personen', kind: 'intro', title: 'ich, du, er, sie, es …', steps: () => [{ rule: 'pers1' }, ...PERSONS.map(learnPerson), { rule: 'pers2', person: 'Sie' }] },
      { id: 'personen-ueben', kind: 'practice', title: 'Personen', questions: (r) => mix([Q.personFromPicture, Q.personFromL1], 12, r) },
      { id: 'personen-test', kind: 'test', title: 'Personen', questions: (r) => mix([Q.personFromL1, Q.personFromPicture], 10, r) },
      { id: 'konjugieren', kind: 'intro', title: 'Was ist konjugieren?', steps: () => [{ rule: 'konj1', table: 'lernen' }, { rule: 'konj2', split: 'lernen' }, { rule: 'konj3', table: 'spielen' }] },
      { id: 'regular-ueben', kind: 'practice', title: 'Die Endungen', questions: (r) => mix([(x) => Q.ending(PLAIN, x), (x) => Q.match(PLAIN, x), (x) => Q.memoryForms(PLAIN, x)], 12, r) },
      { id: 'reg-luecken', kind: 'practice', title: 'Lückensätze', questions: (r) => mix([(x) => Q.gap(PLAIN, x), (x) => Q.pronoun(PLAIN, x), (x) => Q.formFromSound(PLAIN, x)], 12, r) },
      { id: 'reg-schreiben', kind: 'practice', title: 'Schreiben und Sätze bauen', questions: (r) => mix([(x) => Q.gap(PLAIN, x, true), (x) => Q.build(PLAIN, x)], 12, r) },
      { id: 'reg-besonders', kind: 'intro', title: 'arbeiten, finden, schneiden', steps: () => [{ rule: 'regT', table: 'arbeiten' }, { rule: 'regT', table: 'finden' }, { rule: 'regT', table: 'schneiden' }] },
      { id: 'reg-besonders-ueben', kind: 'practice', title: 'arbeiten, finden, schneiden', questions: (r) => mix([(x) => Q.gap(SPECIAL, x), (x) => Q.match(SPECIAL, x), (x) => Q.formFromSound(SPECIAL, x), (x) => Q.gap(SPECIAL, x, true)], 12, r) },
      { id: 'respekt', kind: 'intro', title: 'Sie: die Respektsform', steps: () => respektSteps() },
      { id: 'respekt-ueben', kind: 'practice', title: 'du oder Sie?', questions: (r) => mix([(x) => duOderSie(x)], 10, r) },
      { id: 'respekt-name', kind: 'practice', title: 'Wie heissen Sie?', steps: () => [{ names: true }] },
      { id: 'sie-verben', kind: 'intro', title: 'Verben mit Sie', steps: () => [{ rule: 'sie1', person: 'Sie', table: 'lernen' }, { rule: 'sie2', example: 'Woher kommen Sie? Wo wohnen Sie?' }] },
      { id: 'sie-ueben', kind: 'practice', title: 'Höflich fragen', questions: (r) => mix([(x) => Q.duToSie(REGULAR, x), (x) => Q.sieGap(REGULAR, x)], 12, r) },
      { id: 'regular-test', kind: 'test', title: 'Regelmässige Verben', questions: (r) => mix([(x) => Q.gap(REGULAR_EARLY, x, true), (x) => Q.ending(PLAIN, x), (x) => Q.pronoun(REGULAR_EARLY, x), (x) => Q.duToSie(REGULAR, x), (x) => Q.formFromSound(REGULAR_EARLY, x)], 15, r) },
    ],
  },
  {
    section: 'irregular',
    stations: [
      { id: 'ur-intro', kind: 'intro', title: 'Der Vokal ändert sich', steps: () => [{ rule: 'ur1' }, { rule: 'ur2', table: 'fahren' }] },
      { id: 'ur-ae', kind: 'learn', title: 'a wird ä', steps: () => urSteps('ur3', UR_AE, { rule: 'ur3b', table: 'laufen' }), questions: (r) => mix([(x) => Q.vowel(UR_AE, x), (x) => Q.verbFromL1(UR_AE, x)], 6, r) },
      { id: 'ur-ae-ueben', kind: 'practice', title: 'a wird ä', questions: urPractice(UR_AE) },
      { id: 'ur-i', kind: 'learn', title: 'e wird i', steps: () => urSteps('ur4', UR_I, { rule: 'ur4b', table: 'nehmen' }), questions: (r) => mix([(x) => Q.vowel(UR_I, x), (x) => Q.verbFromL1(UR_I, x)], 6, r) },
      { id: 'ur-i-ueben', kind: 'practice', title: 'e wird i', questions: urPractice(UR_I) },
      { id: 'ur-ie', kind: 'learn', title: 'e wird ie', steps: () => urSteps('ur5', UR_IE), questions: (r) => mix([(x) => Q.vowel(UR_IE, x), (x) => Q.verbFromL1(UR_IE, x)], 6, r) },
      { id: 'ur-ie-ueben', kind: 'practice', title: 'e wird ie', questions: urPractice(UR_IE) },
      { id: 'ur-s', kind: 'learn', title: '-s, -ss, -z: du nur -t', steps: () => [{ rule: 'regS', table: 'heissen' }, ...S_GROUP.map(learnVerb), { rule: 'regS', table: 'essen' }], questions: (r) => mix([(x) => Q.duShort(S_GROUP, x), (x) => Q.verbFromL1(S_GROUP, x)], 6, r) },
      { id: 'ur-s-ueben', kind: 'practice', title: '-s, -ss, -z: du nur -t', questions: (r) => mix([(x) => Q.duShort(S_GROUP, x), (x) => Q.match(S_GROUP, x), (x) => Q.gap(S_GROUP, x), (x) => Q.formFromSound(S_GROUP, x), (x) => Q.gap(S_GROUP, x, true), (x) => Q.memoryForms(S_GROUP, x)], 12, r) },
      { id: 'ur-ueben', kind: 'practice', title: 'Alle Gruppen', questions: (r) => mix([Q.sortGroups, (x) => Q.vowel(IRREGULAR, x), Q.sortRegular, (x) => Q.gap(IRREGULAR_ALL, x), (x) => Q.duShort(S_GROUP, x), (x) => Q.build(IRREGULAR_ALL, x), (x) => Q.duToSie(IRREGULAR, x)], 14, r) },
      { id: 'ur-test', kind: 'test', title: 'Unregelmässige Verben', questions: (r) => mix([(x) => Q.gap(IRREGULAR_ALL, x, true), (x) => Q.vowel(IRREGULAR, x), (x) => Q.duShort(S_GROUP, x), (x) => Q.formFromSound(IRREGULAR_ALL, x)], 16, r) },
    ],
  },
  {
    section: 'core',
    stations: [
      { id: 'sein-intro', kind: 'intro', title: 'sein', steps: () => [{ rule: 'sein1', table: 'sein' }, ...learnForm('sein', 'müde', 'tired')] },
      { id: 'sein-ueben', kind: 'practice', title: 'sein', questions: (r) => mix([(x) => Q.coreFromL1('sein', x), (x) => Q.memoryForms([verb('sein')], x), (x) => Q.formFromSound([verb('sein')], x), (x) => Q.pronoun([verb('sein')], x), (x) => Q.coreFromL1('sein', x, true), (x) => Q.build([verb('sein')], x)], 14, r) },
      { id: 'haben-intro', kind: 'intro', title: 'haben', steps: () => [{ rule: 'haben1', table: 'haben' }, ...learnForm('haben', 'Hunger', 'hungry')] },
      { id: 'haben-ueben', kind: 'practice', title: 'haben', questions: (r) => mix([(x) => Q.coreFromL1('haben', x), (x) => Q.memoryForms([verb('haben')], x), (x) => Q.formFromSound([verb('haben')], x), (x) => Q.pronoun([verb('haben')], x), (x) => Q.coreFromL1('haben', x, true), (x) => Q.build([verb('haben')], x)], 14, r) },
      { id: 'wann-intro', kind: 'intro', title: 'Wann haben, wann sein?', steps: () => [{ rule: 'wann1' }, { rule: 'wann2' }, { rule: 'wann3' }] },
      { id: 'wann-ueben', kind: 'practice', title: 'haben oder sein?', questions: (r) => mix([Q.haveOrBe], 14, r) },
      { id: 'core-mix', kind: 'practice', title: 'haben und sein gemischt', questions: (r) => mix([(x) => Q.haveOrBe(x, true), (x) => Q.match(CORE, x), (x) => Q.build(CORE, x), (x) => Q.duToSie(CORE, x), (x) => Q.coreFromL1('sein', x, true), (x) => Q.coreFromL1('haben', x, true)], 14, r) },
      { id: 'core-test', kind: 'test', title: 'haben und sein', questions: (r) => mix([(x) => Q.coreFromL1('sein', x, true), (x) => Q.coreFromL1('haben', x, true), (x) => Q.haveOrBe(x)], 12, r) },
      { id: 'alles-test', kind: 'test', title: 'Grosser Verbentest', questions: (r) => mix([(x) => Q.verbFromL1(VERBS, x), (x) => Q.gap(REGULAR, x, true), (x) => Q.vowel(IRREGULAR, x), (x) => Q.haveOrBe(x, true), (x) => Q.duToSie(VERBS, x)], 20, r) },
    ],
  },
];

// Right after «So stelle ich mich vor»: the student builds an introduction of their own (vorstellung.js).
COURSE[0].stations.splice(2, 0, { id: 'vorstellung', kind: 'practice', title: 'Meine Vorstellung', steps: () => [{ introBuilder: true }] });

const STATIONS = COURSE.flatMap((s) => s.stations);

// The conjugation table shows five rows, because er, sie, es and wir, sie, Sie share a form.
const TABLE_ROWS = [
  { key: 'ich', label: 'ich' }, { key: 'du', label: 'du' }, { key: 'er', label: 'er, sie, es' },
  { key: 'wir', label: 'wir' }, { key: 'ihr', label: 'ihr' }, { key: 'siep', label: 'sie, Sie' },
];

if (typeof module !== 'undefined') module.exports = { PERSONS, VERBS, COURSE, STATIONS, Q, conjugate, sentence, formParts, SIE_QUESTIONS };
