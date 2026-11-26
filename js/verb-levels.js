// Three levels per part of the verb course, new exercise types and the verb race.
// ⭐ recognise (with choices), ⭐⭐ build (with help), ⭐⭐⭐ use (write without help).
// Data and generators only, no DOM. Draft translations, unreviewed: see README.

Object.assign(STRINGS, {
  trueFalse: { de: 'Stimmt das?', ar: 'هل هذا صحيح؟', prs: 'درست است؟', ps: 'ایا دا سم دی؟', ckb: 'ئەمە ڕاستە؟', om: 'Kun sirrii dha?', ti: 'እዚ ቅኑዕ ድዩ?', so: 'Tani ma sax baa?', si: 'මේක හරිද?', en: 'Is that right?', fr: "C'est juste ?", tr: 'Bu doğru mu?' },
  tableFill: { de: 'Füll die Tabelle aus.', ar: 'املأ الجدول.', prs: 'جدول را پر کن.', ps: 'جدول ډک کړه.', ckb: 'خشتەکە پڕ بکەرەوە.', om: 'Gabatee guuti.', ti: 'ነቲ ሰንጠረዥ ምልኦ።', so: 'Buuxi jadwalka.', si: 'වගුව පුරවන්න.', en: 'Fill in the table.', fr: 'Remplis le tableau.', tr: 'Tabloyu doldur.' },
  errorHunt: { de: 'Finde den Fehler. Schreib das Verb richtig.', ar: 'جد الخطأ. اكتب الفعل بشكل صحيح.', prs: 'اشتباه را پیدا کن. فعل را درست بنویس.', ps: 'تېروتنه پیدا کړه. فعل سم ولیکه.', ckb: 'هەڵەکە بدۆزەوە. کردارەکە بە دروستی بنووسە.', om: 'Dogoggora barbaadi. Gochima sirriitti barreessi.', ti: 'ነቲ ጌጋ ርኸብ። ነቲ ግሲ ብትኽክል ጽሓፍ።', so: 'Hel khaladka. Si sax ah u qor falka.', si: 'වැරැද්ද හොයන්න. ක්‍රියාපදය හරියට ලියන්න.', en: 'Find the mistake. Write the verb correctly.', fr: "Trouve l'erreur. Écris le verbe correctement.", tr: 'Hatayı bul. Fiili doğru yaz.' },
  dictation: { de: 'Hör zu und schreib den ganzen Satz.', ar: 'استمع واكتب الجملة كاملة.', prs: 'گوش کن و جمله را کامل بنویس.', ps: 'واوره او بشپړه جمله ولیکه.', ckb: 'گوێ بگرە و هەموو ڕستەکە بنووسە.', om: 'Dhaggeeffadhuu hima guutuu barreessi.', ti: 'ስማዕ ነቲ ምሉእ ሓሳብ ድማ ጽሓፍ።', so: 'Dhagayso oo qor jumladda oo dhan.', si: 'අහලා මුළු වාක්‍යයම ලියන්න.', en: 'Listen and write the whole sentence.', fr: 'Écoute et écris toute la phrase.', tr: 'Dinle ve cümlenin tamamını yaz.' },
  describe: { de: 'Was macht die Person? Schreib einen ganzen Satz.', ar: 'ماذا يفعل الشخص؟ اكتب جملة كاملة.', prs: 'این شخص چه می‌کند؟ یک جمله کامل بنویس.', ps: 'دا کس څه کوي؟ یوه بشپړه جمله ولیکه.', ckb: 'ئەم کەسە چی دەکات؟ ڕستەیەکی تەواو بنووسە.', om: 'Namichi maal hojjeta? Hima guutuu barreessi.', ti: 'እዚ ሰብ እንታይ ይገብር? ምሉእ ሓሳብ ጽሓፍ።', so: 'Qofkani muxuu samaynayaa? Qor jumlad dhammaystiran.', si: 'මේ කෙනා මොකද කරන්නේ? සම්පූර්ණ වාක්‍යයක් ලියන්න.', en: 'What is the person doing? Write a whole sentence.', fr: 'Que fait la personne ? Écris une phrase entière.', tr: 'Kişi ne yapıyor? Tam bir cümle yaz.' },
  raceTask: { de: 'Verb-Rennen: Wie viele schaffst du in 60 Sekunden?', ar: 'سباق الأفعال: كم تستطيع في 60 ثانية؟', prs: 'مسابقه فعل‌ها: در ۶۰ ثانیه چند تا می‌توانی؟', ps: 'د فعلونو سیالي: په ۶۰ ثانیو کې څو کولای شې؟', ckb: 'پێشبڕکێی کردار: لە ٦٠ چرکەدا چەندت پێدەکرێت؟', om: 'Dorgommii gochimaa: sekoondii 60 keessatti meeqa dandeessa?', ti: 'ውድድር ግሲታት፦ ኣብ 60 ሰከንድ ክንደይ ትኽእል?', so: 'Tartanka falalka: immisa ayaad samayn kartaa 60 ilbiriqsi gudahood?', si: 'ක්‍රියාපද තරඟය: තත්පර 60කින් කීයක් කරන්න පුළුවන්ද?', en: 'Verb race: how many can you do in 60 seconds?', fr: 'Course aux verbes : combien en fais-tu en 60 secondes ?', tr: 'Fiil yarışı: 60 saniyede kaç tane yapabilirsin?' },
  raceStart: { de: 'Los!', ar: 'انطلق!', prs: 'شروع!', ps: 'پیل!', ckb: 'دەست پێ بکە!', om: 'Jalqabi!', ti: 'ጀምር!', so: 'Bilow!', si: 'පටන් ගමු!', en: 'Go!', fr: 'Partez !', tr: 'Başla!' },
  raceBest: { de: 'Dein Rekord', ar: 'رقمك القياسي', prs: 'رکورد تو', ps: 'ستا ریکارډ', ckb: 'ڕیکۆردەکەت', om: 'Galmee kee', ti: 'ሪኮርድካ', so: 'Rikoorkaaga', si: 'ඔයාගේ වාර්තාව', en: 'Your record', fr: 'Ton record', tr: 'Rekorun' },
  raceNew: { de: 'Neuer Rekord!', ar: 'رقم قياسي جديد!', prs: 'رکورد جدید!', ps: 'نوی ریکارډ!', ckb: 'ڕیکۆردی نوێ!', om: 'Galmee haaraa!', ti: 'ሓድሽ ሪኮርድ!', so: 'Rikoor cusub!', si: 'අලුත් වාර්තාවක්!', en: 'New record!', fr: 'Nouveau record !', tr: 'Yeni rekor!' },
});

const TF_YES = 'Richtig';
const TF_NO = 'Falsch';
const RACE_SECONDS = 60;

// A plausible wrong form: another person's form, or for a changed vowel the regular one.
function wrongForm(v, key, rnd) {
  const right = conjugate(v, key);
  const naive = v.stem + ending(v, person(key).group);
  const pool = [naive, ...FIVE.map((k) => conjugate(v, k))].filter((f) => f !== right);
  return pickOne(pool, rnd);
}

// A sentence and its period-free form: both count when typed.
const withoutDot = (text) => [text, text.replace(/\.$/, '')];

// Persons that read well in example sentences (es and sie plural only in their own exercises).
const SENTENCE_PERSONS = ['ich', 'du', 'er', 'sie', 'wir', 'ihr', 'Sie'];

Object.assign(Q, {
  // ⭐ The picture and a verb: do they go together?
  trueFalseVerb(list, rnd) {
    const v = pickOne(list, rnd);
    const right = rnd() < 0.5;
    const shown = right ? v : pickOne(VERBS.filter((x) => x !== v), rnd);
    return {
      kind: 'choice', task: 'trueFalse', pic: v.pic, text: shown.de, answer: right ? TF_YES : TF_NO,
      full: v.de, feedbackL1: v.t, options: [TF_YES, TF_NO],
    };
  },
  // ⭐ A person, a sentence: is the verb form right?
  trueFalse(list, rnd) {
    const v = pickOne(list, rnd);
    const key = pickOne(SENTENCE_PERSONS, rnd);
    const right = rnd() < 0.5;
    const form = right ? conjugate(v, key) : wrongForm(v, key, rnd);
    const shown = `${capital(person(key).de)} ${form} ${v.particle ? `${v.rest} ${v.particle}` : v.rest}.`;
    return {
      kind: 'choice', task: 'trueFalse', person: key, pic: v.pic, text: shown, answer: right ? TF_YES : TF_NO,
      full: sentence(v, key), feedbackL1: v.t, options: [TF_YES, TF_NO],
    };
  },
  // ⭐⭐ / ⭐⭐⭐ The whole table; with help the part shared with the infinitive is given.
  tableFill(list, rnd, help = true) {
    const v = pickOne(list, rnd);
    const rows = TABLE_ROWS.map((row) => {
      const form = conjugate(v, row.key);
      let given = 0;
      if (help && v.id !== 'sein') while (given < form.length && given < v.stem.length && form[given] === v.stem[given]) given += 1;
      return { key: row.key, label: row.label, form, given: form.slice(0, given) };
    });
    return {
      kind: 'table', task: 'tableFill', pic: v.pic, verbName: v.de, rows, feedbackL1: v.t,
      full: rows.map((r) => `${r.label.split(',')[0]} ${r.form}`).join(' · '),
    };
  },
  // ⭐⭐⭐ A sentence with a wrong verb form: write the right one.
  errorHunt(list, rnd) {
    const v = pickOne(list, rnd);
    const key = pickOne(SENTENCE_PERSONS, rnd);
    const wrong = `${capital(person(key).de)} ${wrongForm(v, key, rnd)} ${v.rest}.`;
    return {
      kind: 'type', task: 'errorHunt', person: key, pic: v.pic, text: wrong, answer: conjugate(v, key),
      full: sentence(v, key), feedbackL1: v.t,
    };
  },
  // ⭐⭐⭐ Hear a sentence, write it.
  dictation(list, rnd) {
    const v = pickOne(list, rnd);
    const key = pickOne(SENTENCE_PERSONS, rnd);
    const full = sentence(v, key);
    return { kind: 'type', task: 'dictation', listen: full, answer: full, accept: withoutDot(full), full, feedbackL1: v.t };
  },
  // ⭐⭐⭐ «Was macht er?» with the picture: answer with a whole sentence (du → ich).
  describe(list, rnd) {
    const v = pickOne(list, rnd);
    const [asked, answering] = pickOne([['du', 'ich'], ['er', 'er'], ['sie', 'sie'], ['ihr', 'wir'], ['siep', 'siep']], rnd);
    const question = `Was ${conjugate(verb('machen'), asked)} ${person(asked).de}?`;
    const full = sentence(v, answering);
    return {
      kind: 'type', task: 'describe', person: asked, pic: v.pic, sentence: question, text: `… ${v.rest}`, answer: full,
      accept: withoutDot(full), full, feedbackL1: v.t, say: full,
    };
  },
  // ⭐⭐⭐ Only the translation: write the verb.
  verbFromL1Typed(list, rnd) {
    const v = pickOne(list, rnd);
    return { kind: 'type', task: 'type', l1: v.t, answer: v.de, full: v.de, feedbackL1: v.t, pic: v.pic, noPicture: true };
  },
});

// One race question: quick choices only.
const RACE_MAKERS = {
  vocab: (r) => (r() < 0.5 ? Q.verbFromL1(VERBS, r) : Q.trueFalseVerb(VERBS, r)),
  regular: (r) => (r() < 0.5 ? Q.gap(REGULAR_EARLY, r) : Q.trueFalse(REGULAR_EARLY, r)),
  irregular: (r) => (r() < 0.5 ? Q.vowel(IRREGULAR, r) : Q.gap(IRREGULAR_ALL, r)),
  core: (r) => (r() < 0.5 ? Q.haveOrBe(r) : Q.gap(CORE, r)),
};

function levelStations(section, sets) {
  const mixOf = (makers) => (r) => mix(makers, 18, r);
  return [
    { id: `${section}-l1`, kind: 'practice', title: '⭐ Leicht: erkennen', questions: mixOf(sets[0]) },
    { id: `${section}-l2`, kind: 'practice', title: '⭐⭐ Mittel: bilden', questions: mixOf(sets[1]) },
    { id: `${section}-l3`, kind: 'practice', title: '⭐⭐⭐ Schwer: anwenden', questions: mixOf(sets[2]) },
    { id: `${section}-race`, kind: 'practice', title: '⏱ Verb-Rennen', steps: () => [{ race: section }] },
  ];
}

const LEVELS = {
  vocab: [
    [(x) => Q.verbFromSound(VERBS, x), (x) => Q.trueFalseVerb(VERBS, x), (x) => Q.verbFromL1(VERBS, x), (x) => Q.memoryPictures(VERBS, x)],
    [(x) => Q.verbLetters(VERBS, x), (x) => Q.verbTyped(VERBS, x), (x) => Q.trueFalseVerb(VERBS, x)],
    [(x) => Q.verbFromL1Typed(VERBS, x), (x) => Q.verbTyped(VERBS, x), (x) => Q.verbFromL1Typed(VERBS, x)],
  ],
  regular: [
    [(x) => Q.trueFalse(REGULAR_EARLY, x), (x) => Q.formFromSound(REGULAR_EARLY, x), (x) => Q.match(REGULAR_EARLY, x), (x) => Q.pronoun(REGULAR_EARLY, x)],
    [(x) => Q.tableFill(REGULAR_EARLY, x), (x) => Q.ending(PLAIN, x), (x) => Q.gap(REGULAR_EARLY, x, true), (x) => Q.build(REGULAR_EARLY, x)],
    [(x) => Q.tableFill(REGULAR_EARLY, x, false), (x) => Q.errorHunt(REGULAR_EARLY, x), (x) => Q.dictation(REGULAR_EARLY, x), (x) => Q.describe(REGULAR_EARLY, x)],
  ],
  irregular: [
    [(x) => Q.trueFalse(IRREGULAR_ALL, x), (x) => Q.vowel(IRREGULAR, x), Q.sortGroups, (x) => Q.formFromSound(IRREGULAR_ALL, x)],
    [(x) => Q.tableFill(IRREGULAR_ALL, x), (x) => Q.gap(IRREGULAR_ALL, x, true), (x) => Q.duShort(S_GROUP, x), (x) => Q.build(IRREGULAR_ALL, x)],
    [(x) => Q.tableFill(IRREGULAR_ALL, x, false), (x) => Q.errorHunt(IRREGULAR_ALL, x), (x) => Q.dictation(IRREGULAR_ALL, x), (x) => Q.describe(IRREGULAR_ALL, x)],
  ],
  core: [
    [(x) => Q.trueFalse(CORE, x), (x) => Q.haveOrBe(x), (x) => Q.match(CORE, x)],
    [(x) => Q.tableFill(CORE, x), (x) => Q.coreFromL1('sein', x, true), (x) => Q.coreFromL1('haben', x, true), (x) => Q.build(CORE, x)],
    [(x) => Q.tableFill(CORE, x, false), (x) => Q.errorHunt(CORE, x), (x) => Q.dictation(CORE, x), (x) => Q.haveOrBe(x, true)],
  ],
};

// The levels come right before each part's test, so the test can show what was practised.
for (const part of COURSE) {
  if (!LEVELS[part.section]) continue;
  const testIndex = part.stations.findIndex((s) => s.kind === 'test');
  part.stations.splice(testIndex < 0 ? part.stations.length : testIndex, 0, ...levelStations(part.section, LEVELS[part.section]));
}
STATIONS.splice(0, STATIONS.length, ...COURSE.flatMap((s) => s.stations));

if (typeof module !== 'undefined') module.exports = { RACE_MAKERS, RACE_SECONDS, TF_YES, TF_NO };
