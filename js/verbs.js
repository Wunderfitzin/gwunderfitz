// Verb course: present tense. Data, conjugation and exercise generators, no DOM.
// Sections: basics, regular verbs, haben and sein, irregular verbs.

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
  { id: 'machen', pic: '🛠️', kind: 'regular', rest: 'Hausaufgaben' },
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

const person = (key) => PERSONS.find((p) => p.key === key);
const verb = (id) => VERBS.find((v) => v.id === id);

function conjugate(v, personKey) {
  const { group } = person(personKey);
  return (v.forms && v.forms[group]) || v.stem + ENDINGS[group];
}

const capital = (text) => text[0].toUpperCase() + text.slice(1);

function sentence(v, personKey, rest = v.rest) {
  return `${capital(person(personKey).de)} ${conjugate(v, personKey)} ${rest}.`;
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
      options: distinct(v.de, list.map((x) => x.de), 4, rnd),
    };
  },
  ending(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const end = ENDINGS[p.group];
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
      options: distinct(answer, ['ich', 'du', 'er', 'wir', 'ihr'].map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  formFromSound(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = conjugate(v, p.key);
    return {
      kind: 'choice', task: 'listen', listen: `${p.de} ${answer}`, answer, full: `${p.de} ${answer}`, feedbackL1: v.t, pic: v.pic,
      options: distinct(answer, ['ich', 'du', 'er', 'wir', 'ihr'].map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  match(list, rnd) {
    const v = pickOne(list, rnd);
    // Two persons can share a form (er lernt, ihr lernt); a pair must have one answer.
    const seen = new Set();
    const pairs = shuffle(['ich', 'du', 'er', 'wir', 'ihr'], rnd)
      .map((k) => ({ left: person(k).de, right: conjugate(v, k) }))
      .filter((p) => !seen.has(p.right) && seen.add(p.right))
      .slice(0, 4);
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
      options: distinct(answer, ['ich', 'du', 'er', 'wir', 'ihr'].map((k) => conjugate(v, k)), 4, rnd),
    };
  },
  haveOrBe(rnd) {
    const s = pickOne(MIXED_SENTENCES, rnd);
    const answer = conjugate(verb(s.verb), s.person);
    const other = conjugate(verb(s.verb === 'sein' ? 'haben' : 'sein'), s.person);
    return {
      kind: 'choice', task: 'gap', person: s.person, l1: s.t, text: gapped(s.person, s.rest), answer,
      full: sentence(verb(s.verb), s.person, s.rest), feedbackL1: s.t, options: shuffle([answer, other], rnd),
    };
  },
  vowel(rnd) {
    const v = pickOne(VERBS.filter((x) => x.kind === 'irregular'), rnd);
    const key = pickOne(['du', 'er', 'sie', 'es'], rnd);
    const answer = conjugate(v, key);
    const naive = v.stem + ENDINGS[person(key).group];
    return {
      kind: 'choice', task: 'gap', person: key, pic: v.pic, text: gapped(key, v.rest), answer,
      full: sentence(v, key), feedbackL1: v.t, options: distinct(answer, [naive, conjugate(v, 'ich'), conjugate(v, 'wir')], 3, rnd),
    };
  },
};

const REGULAR = VERBS.filter((v) => v.kind === 'regular');
const IRREGULAR = VERBS.filter((v) => v.kind === 'irregular');

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

// The fixed path. Practice repeats wrong answers; a test needs PASS_SHARE right.
const PASS_SHARE = 0.8;
const COURSE = [
  {
    section: 'basics',
    stations: [
      { id: 'was', kind: 'intro', title: 'Was sind Verben?', steps: () => [{ rule: 'verb1', verbs: ['lernen', 'spielen', 'kochen'] }, { rule: 'verb2', verbs: ['wohnen', 'kaufen', 'hoeren'] }, { rule: 'verb3', verbs: ['lernen', 'gehen', 'kommen'] }] },
      { id: 'wortschatz', kind: 'learn', title: 'Verben lernen', steps: () => REGULAR.map(learnVerb), questions: (r) => mix([(x) => Q.verbFromSound(REGULAR, x), (x) => Q.verbFromL1(REGULAR, x)], 10, r) },
      { id: 'wortschatz-test', kind: 'test', title: 'Verben', questions: (r) => mix([(x) => Q.verbFromL1(REGULAR, x), (x) => Q.verbFromSound(REGULAR, x)], 10, r) },
      { id: 'personen', kind: 'intro', title: 'ich, du, er, sie, es …', steps: () => [{ rule: 'pers1' }, ...PERSONS.map(learnPerson), { rule: 'pers2', person: 'Sie' }] },
      { id: 'personen-ueben', kind: 'practice', title: 'Personen', questions: (r) => mix([Q.personFromPicture, Q.personFromL1], 12, r) },
      { id: 'personen-test', kind: 'test', title: 'Personen', questions: (r) => mix([Q.personFromL1, Q.personFromPicture], 10, r) },
      { id: 'respekt', kind: 'intro', title: 'Sie: die Respektsform', steps: () => respektSteps() },
      { id: 'respekt-ueben', kind: 'practice', title: 'du oder Sie?', questions: (r) => mix([(x) => duOderSie(x)], 10, r) },
      { id: 'respekt-name', kind: 'practice', title: 'Wie heissen Sie?', steps: () => [{ names: true }] },
    ],
  },
  {
    section: 'regular',
    stations: [
      { id: 'konjugieren', kind: 'intro', title: 'Was ist konjugieren?', steps: () => [{ rule: 'konj1', table: 'lernen' }, { rule: 'konj2', split: 'lernen' }, { rule: 'konj3', table: 'spielen' }] },
      { id: 'regular-ueben', kind: 'practice', title: 'Die Endungen', questions: (r) => mix([(x) => Q.ending(REGULAR, x), (x) => Q.match(REGULAR, x), (x) => Q.gap(REGULAR, x), (x) => Q.formFromSound(REGULAR, x)], 12, r) },
      { id: 'regular-test', kind: 'test', title: 'Regelmässige Verben', questions: (r) => mix([(x) => Q.gap(REGULAR, x, true), (x) => Q.ending(REGULAR, x), (x) => Q.formFromSound(REGULAR, x)], 10, r) },
    ],
  },
  {
    section: 'core',
    stations: [
      { id: 'sein-intro', kind: 'intro', title: 'sein', steps: () => [{ rule: 'sein1', table: 'sein' }, ...learnForm('sein', 'müde', 'tired')] },
      { id: 'sein-ueben', kind: 'practice', title: 'sein', questions: (r) => mix([(x) => Q.coreFromL1('sein', x), (x) => Q.match([verb('sein')], x), (x) => Q.formFromSound([verb('sein')], x), (x) => Q.coreFromL1('sein', x, true)], 12, r) },
      { id: 'haben-intro', kind: 'intro', title: 'haben', steps: () => [{ rule: 'haben1', table: 'haben' }, ...learnForm('haben', 'Hunger', 'hungry')] },
      { id: 'haben-ueben', kind: 'practice', title: 'haben', questions: (r) => mix([(x) => Q.coreFromL1('haben', x), (x) => Q.match([verb('haben')], x), (x) => Q.formFromSound([verb('haben')], x), (x) => Q.coreFromL1('haben', x, true)], 12, r) },
      { id: 'wann-intro', kind: 'intro', title: 'Wann haben, wann sein?', steps: () => [{ rule: 'wann1' }, { rule: 'wann2' }, { rule: 'wann3' }] },
      { id: 'wann-ueben', kind: 'practice', title: 'haben oder sein?', questions: (r) => mix([Q.haveOrBe], 10, r) },
      { id: 'core-test', kind: 'test', title: 'haben und sein', questions: (r) => mix([(x) => Q.coreFromL1('sein', x, true), (x) => Q.coreFromL1('haben', x, true), Q.haveOrBe], 12, r) },
    ],
  },
  {
    section: 'irregular',
    stations: [
      { id: 'ur-intro', kind: 'intro', title: 'Der Vokal ändert sich', steps: () => [{ rule: 'ur1' }, { rule: 'ur2', table: 'fahren' }] },
      {
        id: 'ur-gruppen', kind: 'learn', title: 'Drei Gruppen',
        steps: () => ['ä', 'i', 'ie'].flatMap((change, i) => {
          const group = IRREGULAR.filter((v) => v.change === change);
          return [{ rule: `ur${i + 3}`, table: group[0].id }, ...group.map(learnVerb), { rule: `ur${i + 3}`, table: group[1].id }];
        }),
        questions: (r) => mix([(x) => Q.verbFromL1(IRREGULAR, x), (x) => Q.verbFromSound(IRREGULAR, x)], 6, r),
      },
      { id: 'ur-ueben', kind: 'practice', title: 'Unregelmässige Verben', questions: (r) => mix([Q.vowel, (x) => Q.match(IRREGULAR, x), (x) => Q.formFromSound(IRREGULAR, x), (x) => Q.gap(IRREGULAR, x)], 12, r) },
      { id: 'ur-test', kind: 'test', title: 'Unregelmässige Verben', questions: (r) => mix([(x) => Q.gap(IRREGULAR, x, true), Q.vowel], 10, r) },
    ],
  },
];

const STATIONS = COURSE.flatMap((s) => s.stations);

// The conjugation table shows five rows, because er, sie, es and wir, sie, Sie share a form.
const TABLE_ROWS = [
  { key: 'ich', label: 'ich' }, { key: 'du', label: 'du' }, { key: 'er', label: 'er, sie, es' },
  { key: 'wir', label: 'wir' }, { key: 'ihr', label: 'ihr' }, { key: 'siep', label: 'sie, Sie' },
];

if (typeof module !== 'undefined') module.exports = { PERSONS, VERBS, COURSE, STATIONS, Q, conjugate, sentence };
