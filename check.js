// Run with: node tests/check.js
const assert = require('node:assert');
const { LANGUAGES, TOPICS, ITEMS } = require('../js/content.js');
const { STRINGS } = require('../js/i18n.js');
const L = require('../js/logic.js');
global.STRINGS = STRINGS;
const { ownItem, cleanOwnWords } = require('../js/eigene.js');

// Afar has no translations yet and uses its fallback language.
const LANG_ORDER = LANGUAGES.filter((l) => !l.fallback).map((l) => l.code);

const tests = {
  'item ids are unique'() {
    assert.strictEqual(new Set(ITEMS.map((i) => i.id)).size, ITEMS.length);
  },
  'every item has every translation'() {
    for (const it of ITEMS) for (const code of LANG_ORDER) assert.ok(it.t[code], `${it.id}.${code}`);
  },
  'every interface string has every language'() {
    for (const [key, s] of Object.entries(STRINGS)) for (const code of ['de', ...LANG_ORDER]) assert.ok(s[code], `${key}.${code}`);
  },
  'German text uses Swiss spelling'() {
    for (const it of ITEMS) assert.ok(!it.de.includes('ß'), it.id);
  },
  'articles are valid'() {
    for (const it of ITEMS) assert.ok([null, 'der', 'die', 'das'].includes(it.art), it.id);
  },
  'pictures are distinct within non-abstract words'() {
    const pics = ITEMS.filter((i) => i.kind === 'word' && !i.abstract).map((i) => i.pic);
    assert.strictEqual(new Set(pics).size, pics.length);
  },
  'every item can get four distinct options in each label'() {
    for (const lang of LANG_ORDER) {
      for (const it of ITEMS.filter((i) => i.kind === 'word')) {
        const labels = [(x) => x.t[lang], (x) => x.de];
        for (const label of labels) {
          const opts = L.makeOptions(it, ITEMS, label);
          assert.strictEqual(opts.length, 4, it.id);
          assert.strictEqual(new Set(opts.map(label)).size, 4, it.id);
          assert.ok(opts.includes(it));
        }
      }
    }
  },
  'near-synonyms are never distractors'() {
    const gruezi = ITEMS.find((i) => i.id === 'gruezi');
    for (let i = 0; i < 200; i++) {
      assert.ok(!L.makeOptions(gruezi, ITEMS, (x) => x.de).some((o) => o.id === 'hallo'));
    }
  },
  'grade moves up, down and stays in range'() {
    assert.deepStrictEqual(L.grade(undefined, true, 100), { box: 1, due: 101, last: 100 });
    assert.strictEqual(L.grade({ box: 5 }, true, 100).box, 5);
    assert.strictEqual(L.grade({ box: 5 }, true, 100).due, 116);
    assert.strictEqual(L.grade({ box: 3 }, false, 100).box, 2);
    assert.strictEqual(L.grade(undefined, false, 100).box, 1);
  },
  'planSession puts overdue first and caps new items'() {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }];
    const records = { c: { box: 1, due: 5 }, b: { box: 1, due: 9 }, a: { box: 1, due: 50 } };
    const plan = L.planSession(items, records, 10, 10, 1).map((i) => i.id);
    assert.deepStrictEqual(plan, ['c', 'b', 'd']);
  },
  'planSession caps session size when reviews fill it'() {
    const items = ['a', 'b', 'c'].map((id) => ({ id }));
    const records = { a: { box: 1, due: 1 }, b: { box: 1, due: 2 } };
    assert.deepStrictEqual(L.planSession(items, records, 10, 2).map((i) => i.id), ['a', 'b']);
  },
  'planPractice takes weakest first'() {
    const items = ['a', 'b'].map((id) => ({ id }));
    assert.strictEqual(L.planPractice(items, { a: { box: 4 }, b: { box: 1 } })[0].id, 'b');
  },
  'chooseExercise matches level'() {
    const noun = ITEMS.find((i) => i.id === 'velo');
    const phrase = ITEMS.find((i) => i.id === 'ichheisse');
    const sentence = ITEMS.find((i) => i.kind === 'sentence');
    assert.strictEqual(L.chooseExercise(noun, 0, true), 'listen');
    assert.strictEqual(L.chooseExercise(noun, 0, false), 'meaning');
    assert.strictEqual(L.chooseExercise(sentence, 4, true), 'build');
    assert.strictEqual(L.chooseExercise(noun, 4, true, () => 0.99), 'article');
    for (let i = 0; i < 200; i++) assert.notStrictEqual(L.chooseExercise(phrase, 5, true), 'type');
    for (let i = 0; i < 200; i++) assert.notStrictEqual(L.chooseExercise(noun, 2, true), 'type');
  },
  'checkTyped forgives capitals, ß and the article'() {
    const strasse = ITEMS.find((i) => i.id === 'strasse');
    for (const typed of ['Strasse', 'strasse', ' Straße ', 'die Strasse']) assert.ok(L.checkTyped(strasse, typed), typed);
    for (const typed of ['Strase', 'der Strasse', '']) assert.ok(!L.checkTyped(strasse, typed), typed);
  },
  'mergeRecords keeps the latest practice and drops bad data'() {
    const merged = L.mergeRecords(
      { velo: { box: 2, due: 10, last: 8 }, bus: { box: 3, due: 20, last: 16 } },
      { velo: { box: 4, due: 20, last: 12 }, bus: { box: 1, due: 2, last: 1 }, zug: { box: 99, due: 1, last: 1 }, fake: { box: 1, due: 1, last: 1 } },
      new Set(['velo', 'bus', 'zug']),
    );
    assert.deepStrictEqual(merged, { velo: { box: 4, due: 20, last: 12 }, bus: { box: 3, due: 20, last: 16 } });
  },
  'own words take a leading article apart'() {
    const noun = ownItem({ id: 'own-a', de: ' Die Katze ', l1: 'قطة', lang: 'ar' });
    assert.strictEqual(noun.art, 'die');
    assert.strictEqual(noun.de, 'Katze');
    assert.strictEqual(ownItem({ id: 'own-b', de: 'Dieb', l1: 'x', lang: 'ar' }).art, null);
  },
  'cleanOwnWords drops bad entries from a save file'() {
    const clean = cleanOwnWords([
      { id: 'own-a', de: 'Katze', l1: 'قطة', lang: 'ar', extra: 1 },
      { id: 'x', de: 'a', l1: 'b', lang: 'ar' },
      { id: 'own-c', de: 'a'.repeat(99), l1: 'b', lang: 'ar' },
      { id: 'own-d', de: 'a', l1: 'b', lang: 'xx' },
    ], ['ar']);
    assert.deepStrictEqual(clean, [{ id: 'own-a', de: 'Katze', l1: 'قطة', lang: 'ar' }]);
  },
  'cleanOwnWords keeps a picture and drops a bad one'() {
    const [good, bad] = cleanOwnWords([
      { id: 'own-a', de: 'Wald', l1: 'x', lang: 'ar', pic: '🌳', photo: { src: 'images/amazonia/wald-2.jpg', w: 550, h: 800 } },
      { id: 'own-b', de: 'Haus', l1: 'x', lang: 'ar', photo: { src: 'https://example.com/a.jpg', w: 1, h: 1 } },
    ], ['ar']);
    assert.deepStrictEqual(good.photo, { src: 'images/amazonia/wald-2.jpg', w: 550, h: 800 });
    assert.strictEqual(good.pic, '🌳');
    assert.strictEqual(bad.photo, undefined);
  },
  'the verbs conjugate correctly'() {
    const { VERBS, conjugate } = require('../js/verbs.js');
    assert.strictEqual(VERBS.length, 41);
    const expected = {
      lernen: 'lerne lernst lernt lernen lernt', arbeiten: 'arbeite arbeitest arbeitet arbeiten arbeitet',
      finden: 'finde findest findet finden findet', heissen: 'heisse heisst heisst heissen heisst',
      laufen: 'laufe läufst läuft laufen lauft', nehmen: 'nehme nimmst nimmt nehmen nehmt',
      essen: 'esse isst isst essen esst', lesen: 'lese liest liest lesen lest',
      haben: 'habe hast hat haben habt', sein: 'bin bist ist sind seid',
    };
    for (const [id, forms] of Object.entries(expected)) {
      const v = VERBS.find((x) => x.id === id);
      assert.strictEqual(['ich', 'du', 'er', 'wir', 'ihr'].map((k) => conjugate(v, k)).join(' '), forms, id);
    }
    for (const v of VERBS) for (const code of LANG_ORDER) assert.ok(v.t[code], `${v.id}.${code}`);
  },
  'verb tables mark exactly what is irregular'() {
    const { VERBS, formParts } = require('../js/verbs.js');
    const marked = (id, key) => formParts(VERBS.find((v) => v.id === id), key).map((p) => (p.mark ? `[${p.text}]` : p.text)).join('');
    assert.strictEqual(marked('fahren', 'du'), 'f[ä]hr[st]');
    assert.strictEqual(marked('lesen', 'du'), 'l[ie]s[t]');
    assert.strictEqual(marked('essen', 'er'), '[i]ss[t]');
    assert.strictEqual(marked('arbeiten', 'du'), 'arbeit[e][st]');
    assert.strictEqual(marked('haben', 'du'), '[hast]');
    assert.strictEqual(formParts(VERBS.find((v) => v.id === 'heissen'), 'du').pop().mark, 'short');
  },
  'dayNumber changes at local midnight'() {
    const a = new Date(2026, 9, 31, 0, 1).getTime();
    const b = new Date(2026, 9, 31, 23, 59).getTime();
    const c = new Date(2026, 10, 1, 0, 1).getTime();
    assert.strictEqual(L.dayNumber(a), L.dayNumber(b));
    assert.strictEqual(L.dayNumber(c), L.dayNumber(a) + 1);
  },
};

let failed = 0;
for (const [name, run] of Object.entries(tests)) {
  try {
    run();
    console.log(`ok   ${name}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL ${name}\n     ${error.message}`);
  }
}
console.log(`\n${Object.keys(tests).length - failed}/${Object.keys(tests).length} passed, ${ITEMS.length} items in ${TOPICS.length} topics`);
process.exit(failed ? 1 : 0);
