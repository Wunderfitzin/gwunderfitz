// Curriculum for Gwunderfitz (A0–A1, Swiss context, Swiss spelling: ss, never ß).
// To add a word: add a row to a topic and an entry in translations.js.
// To add a language: add it to LANGUAGES and a block to translations.js.

// `fallback` is the language shown while a language has no translations yet.
const LANGUAGES = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'prs', name: 'دری', dir: 'rtl' },
  { code: 'ps', name: 'پښتو', dir: 'rtl' },
  { code: 'ckb', name: 'کوردی (سۆرانی)', dir: 'rtl' },
  { code: 'om', name: 'Afaan Oromoo', dir: 'ltr' },
  { code: 'ti', name: 'ትግርኛ', dir: 'ltr' },
  { code: 'aa', name: 'Qafar af', dir: 'ltr', fallback: 'ar' },
  { code: 'so', name: 'Soomaali', dir: 'ltr' },
  { code: 'si', name: 'සිංහල', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
];

// The translation columns of the rows below; other languages are in translations.js.
const LANG_ORDER = ['ar', 'ti', 'en'];

// Rows: id, picture, article, German, ...translations in LANG_ORDER.
// `abstract` topics have no reliable picture, so answers show translations.
// `group` marks near-synonyms that must never be distractors for each other.
const TOPICS = [
  {
    id: 'hallo', icon: '👋', abstract: true,
    title: { de: 'Begrüssung', ar: 'التحية', ti: 'ሰላምታ', en: 'Greetings' },
    groups: [['gruezi', 'hallo'], ['adieu', 'tschuess']],
    words: [
      ['gruezi', '🤝', null, 'Grüezi', 'مرحبا', 'ሰላም', 'Hello (polite)'],
      ['hallo', '👋', null, 'Hallo', 'أهلا', 'ሃለው', 'Hi'],
      ['morgen', '🌅', null, 'Guten Morgen', 'صباح الخير', 'ከመይ ሓዲርኩም', 'Good morning'],
      ['adieu', '🚪', null, 'Adieu', 'مع السلامة', 'ደሓን ኩኑ', 'Goodbye'],
      ['tschuess', '🖐️', null, 'Tschüss', 'إلى اللقاء', 'ቻው', 'Bye'],
      ['danke', '🙏', null, 'Danke', 'شكرا', 'የቐንየለይ', 'Thank you'],
      ['bitte', '💁', null, 'Bitte', 'من فضلك', 'በጃኹም', 'Please'],
      ['entschuldigung', '😔', null, 'Entschuldigung', 'عذرا', 'ይቕሬታ', 'Sorry'],
      ['ja', '✅', null, 'Ja', 'نعم', 'እወ', 'Yes'],
      ['nein', '❌', null, 'Nein', 'لا', 'ኣይፋል', 'No'],
      ['ichheisse', '🪪', null, 'Ich heisse …', 'اسمي …', 'ስመይ … እዩ', 'My name is …'],
      ['verstehe', '🤷', null, 'Ich verstehe nicht.', 'لا أفهم.', 'ኣይተረዳኣንን።', "I don't understand."],
    ],
    sentences: [
      ['s-sara', 'Ich heisse Sara.', 'اسمي سارة.', 'ስመይ ሳራ እዩ።', 'My name is Sara.'],
      ['s-wieheisst', 'Wie heisst du?', 'ما اسمك؟', 'ስምካ መን እዩ?', 'What is your name?'],
      ['s-verstehe', 'Ich verstehe das nicht.', 'لا أفهم هذا.', 'እዚ ኣይተረዳኣንን።', "I don't understand this."],
    ],
  },
  {
    id: 'zahlen', icon: '🔢',
    title: { de: 'Zahlen', ar: 'الأرقام', ti: 'ቁጽርታት', en: 'Numbers' },
    words: [
      ['eins', '1️⃣', null, 'eins', 'واحد', 'ሓደ', 'one'],
      ['zwei', '2️⃣', null, 'zwei', 'اثنان', 'ክልተ', 'two'],
      ['drei', '3️⃣', null, 'drei', 'ثلاثة', 'ሰለስተ', 'three'],
      ['vier', '4️⃣', null, 'vier', 'أربعة', 'ኣርባዕተ', 'four'],
      ['fuenf', '5️⃣', null, 'fünf', 'خمسة', 'ሓሙሽተ', 'five'],
      ['sechs', '6️⃣', null, 'sechs', 'ستة', 'ሽዱሽተ', 'six'],
      ['sieben', '7️⃣', null, 'sieben', 'سبعة', 'ሸውዓተ', 'seven'],
      ['acht', '8️⃣', null, 'acht', 'ثمانية', 'ሸሞንተ', 'eight'],
      ['neun', '9️⃣', null, 'neun', 'تسعة', 'ትሽዓተ', 'nine'],
      ['zehn', '🔟', null, 'zehn', 'عشرة', 'ዓሰርተ', 'ten'],
    ],
    sentences: [
      ['s-franken', 'Das kostet fünf Franken.', 'هذا يكلف خمسة فرنكات.', 'እዚ ሓሙሽተ ፍራንክ ይግበር።', 'That costs five francs.'],
      ['s-buecher', 'Ich habe zwei Bücher.', 'لدي كتابان.', 'ክልተ መጻሕፍቲ ኣለዉኒ።', 'I have two books.'],
    ],
  },
  {
    id: 'schule', icon: '🏫',
    title: { de: 'In der Schule', ar: 'في المدرسة', ti: 'ኣብ ቤት ትምህርቲ', en: 'At school' },
    words: [
      ['schule', '🏫', 'die', 'Schule', 'المدرسة', 'ቤት ትምህርቲ', 'school'],
      ['lehrerin', '👩‍🏫', 'die', 'Lehrerin', 'المعلمة', 'ሰበይቲ መምህር', 'teacher (woman)'],
      ['lehrer', '👨‍🏫', 'der', 'Lehrer', 'المعلم', 'መምህር', 'teacher (man)'],
      ['heft', '📓', 'das', 'Heft', 'الدفتر', 'ጥራዝ', 'notebook'],
      ['buch', '📕', 'das', 'Buch', 'الكتاب', 'መጽሓፍ', 'book'],
      ['stift', '✏️', 'der', 'Stift', 'القلم', 'ርሳስ', 'pencil'],
      ['thek', '🎒', 'der', 'Schulthek', 'الحقيبة المدرسية', 'ሳንጣ ቤት ትምህርቲ', 'school bag'],
      ['stuhl', '🪑', 'der', 'Stuhl', 'الكرسي', 'መንበር', 'chair'],
      ['pause', '🔔', 'die', 'Pause', 'الاستراحة', 'ዕረፍቲ', 'break'],
      ['hausaufgaben', '📝', 'die', 'Hausaufgaben', 'الواجبات المنزلية', 'ዕዮ ገዛ', 'homework'],
      ['znueni', '🥨', 'das', 'Znüni', 'وجبة الصباح الخفيفة', 'መኽሰስ ንግሆ', 'morning snack'],
      ['turnhalle', '🤸', 'die', 'Turnhalle', 'الصالة الرياضية', 'ኣዳራሽ ስፖርት', 'gym'],
    ],
    sentences: [
      ['s-heft', 'Das ist mein Heft.', 'هذا دفتري.', 'እዚ ጥራዘይ እዩ።', 'This is my notebook.'],
      ['s-schule', 'Ich gehe in die Schule.', 'أذهب إلى المدرسة.', 'ናብ ቤት ትምህርቲ እኸይድ ኣለኹ።', 'I am going to school.'],
      ['s-pause', 'Wann ist Pause?', 'متى الاستراحة؟', 'ዕረፍቲ መዓስ እዩ?', 'When is the break?'],
    ],
  },
  {
    id: 'familie', icon: '👨‍👩‍👧',
    title: { de: 'Familie', ar: 'العائلة', ti: 'ስድራቤት', en: 'Family' },
    words: [
      ['familie', '👨‍👩‍👧', 'die', 'Familie', 'العائلة', 'ስድራቤት', 'family'],
      ['mutter', '👩', 'die', 'Mutter', 'الأم', 'ኣደ', 'mother'],
      ['vater', '👨', 'der', 'Vater', 'الأب', 'ኣቦ', 'father'],
      ['schwester', '👧', 'die', 'Schwester', 'الأخت', 'ሓፍቲ', 'sister'],
      ['bruder', '👦', 'der', 'Bruder', 'الأخ', 'ሓው', 'brother'],
      ['baby', '👶', 'das', 'Baby', 'الرضيع', 'ህጻን', 'baby'],
      ['grossmutter', '👵', 'die', 'Grossmutter', 'الجدة', 'ዓባይ', 'grandmother'],
      ['grossvater', '👴', 'der', 'Grossvater', 'الجد', 'ኣቦሓጎ', 'grandfather'],
    ],
    sentences: [
      ['s-mutter', 'Das ist meine Mutter.', 'هذه أمي.', 'እዚኣ ኣደይ እያ።', 'This is my mother.'],
      ['s-bruder', 'Ich habe einen Bruder.', 'لدي أخ واحد.', 'ሓደ ሓው ኣለኒ።', 'I have a brother.'],
    ],
  },
  {
    id: 'essen', icon: '🍎',
    title: { de: 'Essen', ar: 'الطعام', ti: 'መግቢ', en: 'Food' },
    words: [
      ['brot', '🥖', 'das', 'Brot', 'الخبز', 'ባኒ', 'bread'],
      ['apfel', '🍎', 'der', 'Apfel', 'التفاحة', 'ቱፋሕ', 'apple'],
      ['wasser', '💧', 'das', 'Wasser', 'الماء', 'ማይ', 'water'],
      ['milch', '🥛', 'die', 'Milch', 'الحليب', 'ጸባ', 'milk'],
      ['kaese', '🧀', 'der', 'Käse', 'الجبن', 'ፎርማጆ', 'cheese'],
      ['poulet', '🍗', 'das', 'Poulet', 'الدجاج', 'ደርሆ', 'chicken'],
      ['ei', '🥚', 'das', 'Ei', 'البيضة', 'እንቋቝሖ', 'egg'],
      ['reis', '🍚', 'der', 'Reis', 'الأرز', 'ሩዝ', 'rice'],
      ['kartoffel', '🥔', 'die', 'Kartoffel', 'البطاطا', 'ድንሽ', 'potato'],
      ['schokolade', '🍫', 'die', 'Schokolade', 'الشوكولاتة', 'ቸኮላታ', 'chocolate'],
    ],
    sentences: [
      ['s-apfel', 'Ich esse einen Apfel.', 'آكل تفاحة.', 'ቱፋሕ እበልዕ ኣለኹ።', 'I am eating an apple.'],
      ['s-wasser', 'Ich trinke Wasser.', 'أشرب الماء.', 'ማይ እሰቲ ኣለኹ።', 'I am drinking water.'],
    ],
  },
  {
    id: 'unterwegs', icon: '🚲',
    title: { de: 'Unterwegs', ar: 'في الطريق', ti: 'ኣብ መገዲ', en: 'Getting around' },
    words: [
      ['bahnhof', '🚉', 'der', 'Bahnhof', 'محطة القطار', 'መደበር ባቡር', 'train station'],
      ['zug', '🚆', 'der', 'Zug', 'القطار', 'ባቡር', 'train'],
      ['tram', '🚊', 'das', 'Tram', 'الترام', 'ትራም', 'tram'],
      ['bus', '🚌', 'der', 'Bus', 'الحافلة', 'ኣውቶቡስ', 'bus'],
      ['velo', '🚲', 'das', 'Velo', 'الدراجة', 'ብሽክለታ', 'bicycle'],
      ['billett', '🎫', 'das', 'Billett', 'التذكرة', 'ቲከት', 'ticket'],
      ['strasse', '🛣️', 'die', 'Strasse', 'الشارع', 'ጽርግያ', 'street'],
      ['trottoir', '🚸', 'das', 'Trottoir', 'الرصيف', 'ናይ እግሪ መገዲ', 'pavement'],
      ['apotheke', '💊', 'die', 'Apotheke', 'الصيدلية', 'ቤት መድሃኒት', 'pharmacy'],
      ['spital', '🏥', 'das', 'Spital', 'المستشفى', 'ሆስፒታል', 'hospital'],
    ],
    sentences: [
      ['s-bahnhof', 'Wo ist der Bahnhof?', 'أين محطة القطار؟', 'መደበር ባቡር ኣበይ እዩ?', 'Where is the train station?'],
      ['s-velo', 'Ich fahre mit dem Velo.', 'أذهب بالدراجة.', 'ብብሽክለታ እኸይድ ኣለኹ።', 'I am going by bicycle.'],
      ['s-billett', 'Ich brauche ein Billett.', 'أحتاج إلى تذكرة.', 'ቲከት የድልየኒ ኣሎ።', 'I need a ticket.'],
    ],
  },
];

function translations(cols) {
  return Object.fromEntries(LANG_ORDER.map((code, i) => [code, cols[i]]));
}

// Flattens the rows above into one list of items, words before sentences.
function compileItems(topics) {
  const items = [];
  for (const topic of topics) {
    const groupOf = (id) => (topic.groups || []).findIndex((g) => g.includes(id));
    for (const [id, pic, art, de, ...cols] of topic.words) {
      const g = groupOf(id);
      items.push({
        id, pic, art, de, kind: 'word', topic: topic.id,
        abstract: !!topic.abstract,
        group: g >= 0 ? `${topic.id}-${g}` : null,
        t: translations(cols),
      });
    }
    for (const [id, de, ...cols] of topic.sentences) {
      items.push({ id, pic: topic.icon, art: null, de, kind: 'sentence', topic: topic.id, abstract: true, group: null, t: translations(cols) });
    }
  }
  return items;
}

const ITEMS = compileItems(TOPICS);

const langBlocks = typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : require('./translations.js').TRANSLATIONS;

for (const [code, block] of Object.entries(langBlocks)) {
  for (const topic of TOPICS) {
    const [title, ...texts] = block.items[topic.id].split('|');
    topic.title[code] = title;
    ITEMS.filter((it) => it.topic === topic.id).forEach((it, i) => { it.t[code] = texts[i]; });
  }
}

if (typeof module !== 'undefined') module.exports = { LANGUAGES, LANG_ORDER, TOPICS, ITEMS };
