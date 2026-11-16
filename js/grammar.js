// Grammar introductions. Each card is one short rule in simple German, with noun
// examples taken from ITEMS. `capitals` highlights the first letter of the examples.
const GRAMMAR = [
  {
    id: 'nomen',
    title: {
      de: 'Nomen schreibt man gross',
      ar: 'الأسماء تُكتب بحرف كبير', prs: 'اسم‌ها با حرف بزرگ نوشته می‌شوند', ps: 'نومونه په لوی توري لیکل کېږي',
      om: 'Maqaawwan qubee gurguddaan barreeffamu', ti: 'ስማት ብዓቢ ፊደል ይጽሓፉ', so: 'Magacyada waxaa lagu qoraa xaraf weyn', si: 'නාම පද ලොකු අකුරින් ලියනවා', ckb: 'ناوەکان بە پیتی گەورە دەنووسرێن',
      en: 'Nouns start with a capital letter', fr: `Les noms s'écrivent avec une majuscule`, tr: 'İsimler büyük harfle yazılır',
    },
    cards: [
      {
        examples: ['lehrerin', 'apfel', 'stuhl'],
        text: {
          de: 'Nomen sind Namen für Menschen, Tiere und Dinge.',
          ar: 'الأسماء هي كلمات للناس والحيوانات والأشياء.', prs: 'اسم‌ها نام انسان‌ها، حیوانات و چیزها هستند.', ps: 'نومونه د انسانانو، ژویو او شیانو نومونه دي.',
          om: 'Maqaawwan maqaa namootaa, bineensotaa fi wantootaa ti.', ti: 'ስማት ናይ ሰባት፡ እንስሳታትን ነገራትን ስም እዮም።', so: 'Magacyadu waa magacyada dadka, xayawaanka iyo walxaha.', si: 'නාම පද කියන්නේ මිනිසුන්ගේ, සතුන්ගේ සහ දේවල්වල නම්.', ckb: 'ناوەکان ناوی مرۆڤ، ئاژەڵ و شتەکانن.',
          en: 'Nouns are names for people, animals and things.', fr: 'Les noms désignent des personnes, des animaux et des choses.', tr: 'İsimler insanların, hayvanların ve eşyaların adlarıdır.',
        },
      },
      {
        examples: ['schule', 'brot', 'velo'],
        capitals: true,
        text: {
          de: 'Im Deutschen schreibt man alle Nomen gross.',
          ar: 'في الألمانية تُكتب كل الأسماء بحرف أول كبير.', prs: 'در زبان آلمانی همهٔ اسم‌ها با حرف اول بزرگ نوشته می‌شوند.', ps: 'په الماني کې ټول نومونه په لوی لومړي توري لیکل کېږي.',
          om: 'Afaan Jarmaniitiin maqaawwan hundi qubee gurguddaan jalqabu.', ti: 'ብጀርመንኛ ኩሎም ስማት ብዓቢ ፊደል ይጅምሩ።', so: 'Jarmalka, dhammaan magacyada waxay ku bilowdaan xaraf weyn.', si: 'ජර්මන් භාෂාවේ සියලු නාම පද ලොකු අකුරකින් පටන් ගන්නවා.', ckb: 'لە ئەڵمانیدا هەموو ناوەکان بە پیتی گەورە دەست پێ دەکەن.',
          en: 'In German, all nouns start with a capital letter.', fr: 'En allemand, tous les noms commencent par une majuscule.', tr: 'Almancada bütün isimler büyük harfle başlar.',
        },
      },
    ],
  },
  {
    id: 'artikel',
    title: {
      de: 'der, die, das',
      ar: 'أدوات التعريف', prs: 'حرف تعریف', ps: 'حرف تعریف',
      om: 'Aartikiloota', ti: 'ኣርቲክላት', so: 'Qodobbada', si: 'ආටිකල්', ckb: 'ئامرازی ناساندن',
      en: 'Articles', fr: 'Les articles', tr: 'Artikeller',
    },
    cards: [
      {
        examples: ['stuhl', 'schule', 'buch'],
        text: {
          de: 'Jedes Nomen hat einen Artikel: der, die oder das.',
          ar: 'لكل اسم أداة: der أو die أو das.', prs: 'هر اسم یک حرف تعریف دارد: der، die یا das.', ps: 'هر نوم یو حرف تعریف لري: der، die یا das.',
          om: 'Maqaan hundi aartikilii qaba: der, die yookiin das.', ti: 'ነፍሲ ወከፍ ስም ኣርቲክል ኣለዎ፦ der, die ወይ das።', so: 'Magac kasta wuxuu leeyahay qodob: der, die ama das.', si: 'සෑම නාම පදයකටම ආටිකලයක් තියෙනවා: der, die හෝ das.', ckb: 'هەموو ناوێک ئامرازێکی هەیە: der، die یان das.',
          en: 'Every noun has an article: der, die or das.', fr: 'Chaque nom a un article : der, die ou das.', tr: 'Her ismin bir artikeli vardır: der, die veya das.',
        },
      },
      {
        examples: ['apfel', 'milch', 'brot'],
        text: {
          de: 'Lerne jedes Nomen immer mit dem Artikel.',
          ar: 'احفظ كل اسم دائما مع أداته.', prs: 'هر اسم را همیشه با حرف تعریف آن یاد بگیر.', ps: 'هر نوم تل له حرف تعریف سره زده کړه.',
          om: 'Maqaa hunda yeroo hunda aartikilii isaa wajjin baradhu.', ti: 'ነፍሲ ወከፍ ስም ኩሉ ግዜ ምስ ኣርቲክሉ ተማሃሩ።', so: 'Magac kasta had iyo jeer la baro qodobkiisa.', si: 'සෑම නාම පදයක්ම හැමවිටම එහි ආටිකලය සමඟ ඉගෙන ගන්න.', ckb: 'هەمیشە هەر ناوێک لەگەڵ ئامرازەکەی فێربە.',
          en: 'Always learn each noun with its article.', fr: 'Apprends toujours chaque nom avec son article.', tr: 'Her ismi daima artikeliyle öğren.',
        },
      },
      {
        examples: ['zug', 'strasse', 'velo'],
        text: {
          de: 'Die Farben helfen dir: der ist blau, die ist rot, das ist grün.',
          ar: 'الألوان تساعدك: der أزرق، die أحمر، das أخضر.', prs: 'رنگ‌ها به تو کمک می‌کنند: der آبی، die سرخ، das سبز است.', ps: 'رنګونه له تا سره مرسته کوي: der آبي، die سور، das زرغون دی.',
          om: 'Halluuwwan si gargaaru: der cuquliisa, die diimaa, das magariisa.', ti: 'ሕብሪታት ይሕግዙኹም፦ der ሰማያዊ፡ die ቀይሕ፡ das ቀጠልያ እዩ።', so: 'Midabbadu way ku caawinayaan: der waa buluug, die waa casaan, das waa cagaar.', si: 'වර්ණ ඔබට උදව් කරනවා: der නිල්, die රතු, das කොළ.', ckb: 'ڕەنگەکان یارمەتیت دەدەن: der شینە، die سوورە، das سەوزە.',
          en: 'The colours help you: der is blue, die is red, das is green.', fr: `Les couleurs t'aident : der est bleu, die est rouge, das est vert.`, tr: 'Renkler sana yardım eder: der mavi, die kırmızı, das yeşil.',
        },
      },
    ],
  },
];

STRINGS.grammar = {
  de: 'Grammatik', ar: 'القواعد', prs: 'گرامر', ps: 'ګرامر', om: 'Seer-luga', ti: 'ሰዋስው', so: 'Naxwe', si: 'ව්‍යාකරණ', ckb: 'ڕێزمان', en: 'Grammar', fr: 'Grammaire', tr: 'Dil bilgisi',
};

if (typeof module !== 'undefined') module.exports = { GRAMMAR };
