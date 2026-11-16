// du and Sie: the respectful form, first names and family names.
// The student's own name is only held for this exercise and never saved.
const RESPEKT_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'teacher', 'askName', 'askFirst', 'askLast', 'first', 'last', 'askTitle', 'frau', 'herr', 'noTitle', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 'duSie', 'fits', 'nameNote'];

const RESPEKT = {
  r1: { de: 'Sie ist die Respektsform. Sie zeigt Respekt und Abstand.' },
  r2: { de: 'Sage Sie zu alten Personen, zu Lehrpersonen und zu fremden Erwachsenen.' },
  r3: { de: 'Fremde Erwachsene sagen gegenseitig Sie.' },
  r4: { de: 'Sage du zu Freunden, zur Familie und zu Kindern.' },
  r5: { de: 'Unter Freunden sagst du den Vornamen.' },
  r6: { de: 'Mit Sie sagst du Frau oder Herr und den Familiennamen.' },
  teacher: { de: 'Guten Tag, ich bin {}.' },
  askName: { de: 'Wie heissen Sie?' },
  askFirst: { de: 'Wie ist Ihr Vorname?' },
  askLast: { de: 'Wie ist Ihr Familienname?' },
  first: { de: 'Vorname' },
  last: { de: 'Familienname' },
  askTitle: { de: 'Wie sollen wir dich ansprechen?' },
  frau: { de: 'Frau' },
  herr: { de: 'Herr' },
  noTitle: { de: 'Nur mein Name' },
  s1: { de: 'Deine Freundin' },
  s2: { de: 'Frau Schwegler, deine Lehrerin' },
  s3: { de: 'Ein Mann auf dem Amt' },
  s4: { de: 'Eine alte Frau im Bus' },
  s5: { de: 'Dein Bruder' },
  s6: { de: 'Ein Kind in der Pause' },
  s7: { de: 'Die Ärztin' },
  duSie: { de: 'du oder Sie?' },
  fits: { de: 'Was passt?' },
  nameNote: { de: 'Dein Name bleibt nur hier und wird nicht gespeichert.' },
};

// Drafts, unreviewed: see README. Order as in RESPEKT_KEYS.
const RESPEKT_L1 = {
  si: `Sie යනු ගෞරව රූපයයි. එය ගෞරවය සහ දුර පෙන්වයි.|වයස්ගත අයට, ගුරුවරුන්ට සහ නොදන්නා වැඩිහිටියන්ට Sie කියන්න.|එකිනෙකා නොදන්නා වැඩිහිටියන් දෙපැත්තෙන්ම Sie කියනවා.|යාළුවන්ට, පවුලේ අයට සහ ළමයින්ට du කියන්න.|යාළුවන් අතර මුල් නම කියනවා.|Sie සමඟ Frau හෝ Herr සහ පවුලේ නම කියනවා.|ආයුබෝවන්, මම {}.|ඔබේ නම කුමක්ද?|ඔබේ මුල් නම කුමක්ද?|ඔබේ පවුලේ නම කුමක්ද?|මුල් නම|පවුලේ නම|අපි ඔයාට කතා කරන්නේ කොහොමද?|මහත්මිය|මහතා|මගේ නම පමණයි|ඔයාගේ යාළුවා (ගැහැණු)|ශ්වෙග්ලර් මහත්මිය, ඔයාගේ ගුරුතුමිය|කාර්යාලයක මිනිසෙක්|බස් එකේ වයසක කාන්තාවක්|ඔයාගේ සහෝදරයා|විවේකයේ ළමයෙක්|වෛද්‍යවරිය|du ද Sie ද?|මොකක්ද ගැළපෙන්නේ?|ඔබේ නම මෙතැන පමණක් රැඳේ, එය සුරකින්නේ නැහැ.`,
  ckb: `Sie شێوەی ڕێزە. ڕێز و دووری نیشان دەدات.|بە کەسانی بەتەمەن، مامۆستایان و گەورەساڵانی نەناسراو بڵێ Sie.|گەورەساڵانی نەناسراو بە یەکتر دەڵێن Sie.|بە هاوڕێکان، خێزان و منداڵان بڵێ du.|لە نێوان هاوڕێکاندا ناوی یەکەم دەوترێت.|لەگەڵ Sie دەڵێیت Frau یان Herr و ناوی بنەماڵە.|سڵاو، من {}م.|ناوتان چییە؟|ناوی یەکەمتان چییە؟|ناوی بنەماڵەتان چییە؟|ناوی یەکەم|ناوی بنەماڵە|چۆن بانگت بکەین؟|خاتوو|بەڕێز|تەنها ناوەکەم|هاوڕێکەت (کچ)|خاتوو شڤێگلەر، مامۆستاکەت|پیاوێک لە فەرمانگە|ژنێکی پیر لە پاسدا|براکەت|منداڵێک لە پشوودا|دکتۆرەکە (ژن)|du یان Sie؟|کامیان گونجاوە؟|ناوەکەت تەنها لێرە دەمێنێتەوە و پاشەکەوت ناکرێت.`,
  en: `Sie is the respectful form. It shows respect and distance.|Say Sie to old people, teachers and adults you do not know.|Adults who do not know each other both say Sie.|Say du to friends, family and children.|With friends, you use the first name.|With Sie, you say Frau or Herr and the family name.|Hello, I am {}.|What is your name? (polite)|What is your first name? (polite)|What is your family name? (polite)|First name|Family name|How should we address you?|Mrs|Mr|Just my name|Your friend|Mrs Schwegler, your teacher|A man at an office|An old woman on the bus|Your brother|A child at break|The doctor|du or Sie?|What fits?|Your name stays here and is not saved.`,
  fr: `Sie est la forme de respect. Elle montre le respect et la distance.|Dis Sie aux personnes âgées, aux enseignants et aux adultes inconnus.|Les adultes qui ne se connaissent pas se disent Sie mutuellement.|Dis du aux amis, à la famille et aux enfants.|Entre amis, on utilise le prénom.|Avec Sie, on dit Frau ou Herr et le nom de famille.|Bonjour, je suis {}.|Comment vous appelez-vous ?|Quel est votre prénom ?|Quel est votre nom de famille ?|Prénom|Nom de famille|Comment devons-nous t'appeler ?|Madame|Monsieur|Seulement mon nom|Ton amie|Madame Schwegler, ton enseignante|Un homme dans un bureau officiel|Une vieille dame dans le bus|Ton frère|Un enfant à la récréation|La médecin|du ou Sie ?|Qu'est-ce qui convient ?|Ton nom reste ici et n'est pas enregistré.`,
  tr: `Sie saygı biçimidir. Saygı ve mesafe gösterir.|Yaşlılara, öğretmenlere ve tanımadığın yetişkinlere Sie de.|Birbirini tanımayan yetişkinler karşılıklı Sie der.|Arkadaşlara, aileye ve çocuklara du de.|Arkadaşlar arasında ad kullanılır.|Sie ile Frau veya Herr ve soyadı söylenir.|Merhaba, ben {}.|Adınız nedir?|Adınız nedir? (ön ad)|Soyadınız nedir?|Ad|Soyad|Sana nasıl hitap edelim?|Bayan|Bay|Sadece adım|Arkadaşın|Bayan Schwegler, öğretmenin|Resmi dairede bir adam|Otobüste yaşlı bir kadın|Erkek kardeşin|Teneffüste bir çocuk|Kadın doktor|du mu Sie mi?|Hangisi uygun?|Adın burada kalır ve kaydedilmez.`,
  ar: `Sie هي صيغة الاحترام. تُظهر الاحترام والمسافة.|قل Sie لكبار السن والمعلمين والبالغين الغرباء.|البالغون الغرباء يقولون لبعضهم Sie.|قل du للأصدقاء والعائلة والأطفال.|بين الأصدقاء تستخدم الاسم الأول.|مع Sie تقول Frau أو Herr واسم العائلة.|مرحبا، أنا {}.|ما اسم حضرتك؟|ما اسم حضرتك الأول؟|ما اسم عائلة حضرتك؟|الاسم الأول|اسم العائلة|كيف نخاطبك؟|السيدة|السيد|اسمي فقط|صديقتك|السيدة شفيغلر، معلمتك|رجل في دائرة حكومية|امرأة مسنة في الحافلة|أخوك|طفل في الاستراحة|الطبيبة|du أو Sie؟|ما المناسب؟|يبقى اسمك هنا ولا يُحفظ.`,
  prs: `Sie شکل احترام است. احترام و فاصله را نشان می‌دهد.|به افراد مسن، معلمان و بزرگسالان ناآشنا Sie بگو.|بزرگسالان ناآشنا به یکدیگر Sie می‌گویند.|به دوستان، فامیل و کودکان du بگو.|میان دوستان نام کوچک گفته می‌شود.|با Sie کلمهٔ Frau یا Herr و تخلص گفته می‌شود.|سلام، من {} هستم.|نام شما چیست؟|نام کوچک شما چیست؟|تخلص شما چیست؟|نام|تخلص|تو را چگونه صدا کنیم؟|خانم|آقا|فقط نامم|دوست تو|خانم شویگلر، معلم تو|مردی در اداره|زن مسنی در بس|برادر تو|کودکی در تفریح|داکتر زن|du یا Sie؟|کدام مناسب است؟|نام تو همین‌جا می‌ماند و ذخیره نمی‌شود.`,
  ps: `Sie د درناوي بڼه ده. درناوی او واټن ښيي.|سپین‌ږیرو، ښوونکو او ناپېژندلو لویانو ته Sie ووایه.|ناپېژندل لویان یو بل ته Sie وایي.|ملګرو، کورنۍ او ماشومانو ته du ووایه.|د ملګرو ترمنځ لومړی نوم ویل کېږي.|له Sie سره Frau یا Herr او کورنی نوم ویل کېږي.|سلام، زه {} یم.|ستاسو نوم څه دی؟|ستاسو لومړی نوم څه دی؟|ستاسو کورنی نوم څه دی؟|لومړی نوم|کورنی نوم|تا څنګه ورغږ کړو؟|مېرمن|ښاغلی|یوازې زما نوم|ستا ملګرې|مېرمن شویګلر، ستا ښوونکې|په اداره کې یو سړی|په بس کې یوه زړه ښځه|ستا ورور|په تفریح کې یو ماشوم|ډاکټره|du که Sie؟|کوم مناسب دی؟|ستا نوم همدلته پاتې کېږي او نه خوندي کېږي.`,
  om: `Sie bifa kabajaa ti. Kabajaa fi fageenya agarsiisa.|Maanguddootaaf, barsiisotaaf fi namoota gurguddoo hin beekneef Sie jedhi.|Namoonni gurguddoon wal hin beekne wal Sie jedhu.|Hiriyootaaf, maatiif fi ijoolleef du jedhi.|Hiriyoota gidduutti maqaa ofii jedhama.|Sie waliin Frau ykn Herr fi maqaa maatii jedhama.|Akkam, ani {} dha.|Maqaan keessan eenyu?|Maqaan keessan inni jalqabaa eenyu?|Maqaan maatii keessanii eenyu?|Maqaa jalqabaa|Maqaa maatii|Akkamitti si waamnu?|Aadde|Obbo|Maqaa koo qofa|Hiriyyaa kee|Aadde Schwegler, barsiistuu kee|Dhiira waajjira keessaa|Dubartii jaartii awtobisii keessaa|Obboleessa kee|Daa'ima boqonnaa irratti|Doktoora dubartii|du moo Sie?|Maaltu ta'a?|Maqaan kee asitti hafa, hin olkaa'amu.`,
  ti: `Sie ናይ ኽብሪ ቅርጺ እዩ። ኽብርን ርሕቀትን የርኢ።|ንዓበይቲ ዕድመ፡ ንመምህራንን ንዘይትፈልጥዎም ዓበይትን Sie በሉ።|ዘይፋለጡ ዓበይቲ ንሓድሕዶም Sie ይበሃሃሉ።|ንመሓዙት፡ ንስድራን ንቖልዑን du በሉ።|ኣብ መንጎ መሓዙት ስም ይጥቀሱ።|ምስ Sie፡ Frau ወይ Herr ከምኡ'ውን ስም ስድራ ይበሃል።|ሰላም፡ ኣነ {} እየ።|ስምኩም መን እዩ?|ቀዳማይ ስምኩም መን እዩ?|ስም ስድራኹም መን እዩ?|ቀዳማይ ስም|ስም ስድራ|ከመይ ንጽውዓኩም?|ወይዘሮ|ኣቶ|ስመይ ጥራይ|መሓዛኹም|ወይዘሮ ሽቬግለር፡ መምህርኩም|ኣብ ቤት ጽሕፈት ሓደ ሰብኣይ|ኣብ ኣውቶቡስ ሓንቲ ኣረጊት|ሓውኹም|ኣብ ዕረፍቲ ሓደ ቆልዓ|ሓኪም (ሰበይቲ)|du ወይስ Sie?|እንታይ ይሰማማዕ?|ስምኩም ኣብዚ ይተርፍ፡ ኣይዕቀብን።`,
  so: `Sie waa qaabka ixtiraamka. Wuxuu muujiyaa ixtiraam iyo masaafo.|Sie u dheh dadka waayeelka ah, macallimiinta iyo dadka waaweyn ee aadan aqoon.|Dadka waaweyn ee aan is aqoon waxay isu yiraahdaan Sie.|du u dheh saaxiibada, qoyska iyo carruurta.|Saaxiibada dhexdooda waxaa la isticmaalaa magaca koowaad.|Sie waxaa lagu yiraahdaa Frau ama Herr iyo magaca qoyska.|Salaan, waxaan ahay {}.|Magacaagu waa maxay? (edeb)|Magacaaga koowaad waa maxay? (edeb)|Magaca qoyskaagu waa maxay? (edeb)|Magaca koowaad|Magaca qoyska|Sidee kuu wacnaa?|Marwo|Mudane|Magacayga oo keliya|Saaxiibtaa|Marwo Schwegler, macallimaddaada|Nin xafiis jooga|Haweeney waayeel ah oo bas ku jirta|Walaalkaa|Ilmo nasashada jooga|Dhakhtaradda|du mise Sie?|Maxaa ku habboon?|Magacaagu halkan buu joogaa, lama kaydiyo.`,
};

for (const [code, text] of Object.entries(RESPEKT_L1)) {
  text.split('|').forEach((part, i) => { RESPEKT[RESPEKT_KEYS[i]][code] = part; });
}

STRINGS.duSie = RESPEKT.duSie;
STRINGS.fits = RESPEKT.fits;

const TEACHERS = [
  { name: 'Frau Schwegler', figure: 'schwegler' },
  { name: 'Frau Alexander', figure: 'alexander' },
  { name: 'Herr Bötschi', figure: 'boetschi' },
];

const SITUATIONS = [
  { key: 's1', figure: 'listener', answer: 'du' },
  { key: 's2', figure: 'schwegler', answer: 'Sie' },
  { key: 's3', figure: 'elder', answer: 'Sie' },
  { key: 's4', figure: 'oldwoman', answer: 'Sie' },
  { key: 's5', figure: 'man', answer: 'du' },
  { key: 's6', figure: 'child', answer: 'du' },
  { key: 's7', figure: 'doctor', answer: 'Sie' },
];

function fillName(map, name) {
  return Object.fromEntries(Object.entries(map).map(([code, text]) => [code, text.replace('{}', name)]));
}

function respektSteps() {
  return [
    { rule: 'r1', map: RESPEKT, person: 'Sie' },
    ...TEACHERS.map((t) => ({ learn: { figure: t.figure, de: `Guten Tag, ich bin ${t.name}.`, t: fillName(RESPEKT.teacher, t.name) } })),
    { rule: 'r2', map: RESPEKT, example: 'Guten Tag, Frau Schwegler. Wie geht es Ihnen?' },
    { rule: 'r3', map: RESPEKT, example: 'Wie heissen Sie? Woher kommen Sie?' },
    { rule: 'r4', map: RESPEKT, person: 'du', example: 'Wie heisst du? Woher kommst du?' },
    { rule: 'r5', map: RESPEKT, example: 'Hallo Amir!' },
    { rule: 'r6', map: RESPEKT, example: 'Guten Tag, Herr Bötschi.' },
  ];
}

function duOderSie(rnd) {
  const s = pickOne(SITUATIONS, rnd);
  return {
    kind: 'choice', task: 'duSie', figure: s.figure, text: RESPEKT[s.key].de, l1: RESPEKT[s.key], answer: s.answer,
    full: `${RESPEKT[s.key].de}: ${s.answer}`, feedbackL1: RESPEKT[s.key], options: ['du', 'Sie'],
  };
}

// Built after the student has entered a name, so the exercises are about them.
function respektPersonal({ first, last, title }) {
  const formal = title ? `${title} ${last}` : `${first} ${last}`;
  const full = `${first} ${last}`;
  const asFit = (text, figure, answer, wrong, l1) => ({
    kind: 'choice', task: 'fits', figure, text, l1, answer, full: answer, feedbackL1: l1, options: shuffle([answer, ...wrong]),
  });
  const typed = (key, answer, accept = [answer]) => ({
    kind: 'type', task: 'fits', figure: 'elder', text: RESPEKT[key].de, l1: RESPEKT[key], answer, accept, full: answer, feedbackL1: RESPEKT[key],
  });
  return [
    asFit('Wie heisst du?', 'listener', `Ich heisse ${first}.`, [`Ich heisse ${formal}.`], ITEMS.find((i) => i.id === 's-wieheisst').t),
    typed('askName', full, [full, `ich heisse ${full}`]),
    typed('askFirst', first),
    typed('askLast', last),
    asFit(TEACHERS[2].name, 'boetschi', 'Guten Tag, Herr Bötschi.', ['Hallo Bötschi!', 'Hallo du!'], RESPEKT.r6),
    asFit(TEACHERS[1].name, 'alexander', 'Guten Tag, Frau Alexander.', ['Hallo Alexander!', 'Tschüss, du!'], RESPEKT.r6),
    asFit('Dein Freund Amir', 'man', 'Hallo Amir!', ['Guten Tag, Herr Amir.', 'Guten Tag, Sie.'], RESPEKT.r5),
    asFit(RESPEKT.s4.de, 'oldwoman', 'Wie heissen Sie?', ['Wie heisst du?'], RESPEKT.askName),
  ];
}
