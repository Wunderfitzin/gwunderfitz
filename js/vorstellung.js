// «Meine Vorstellung»: the student answers six questions and builds a short introduction
// of their own, then practises it. Data and generators only, no DOM. Nothing is saved.

// Draft translations, unreviewed: see README.
const INTRO_L1 = {
  heissen: { ar: 'ما اسمك؟', prs: 'نامت چیست؟', ps: 'ستا نوم څه دی؟', ckb: 'ناوت چییە؟', om: 'Maqaan kee eenyu?', ti: 'ስምካ መን እዩ?', so: 'Magacaa?', si: 'ඔයාගේ නම මොකක්ද?', en: 'What is your name?', fr: "Comment tu t'appelles ?", tr: 'Adın ne?' },
  kommen: { ar: 'من أين أنت؟', prs: 'از کجا هستی؟', ps: 'ته له کومه یې؟', ckb: 'خەڵکی کوێیت؟', om: 'Eessaa dhufte?', ti: 'ካበይ ኢኻ?', so: 'Xagee baad ka timid?', si: 'ඔයා කොහෙන්ද?', en: 'Where are you from?', fr: "D'où viens-tu ?", tr: 'Nerelisin?' },
  wohnen: { ar: 'أين تسكن؟', prs: 'کجا زندگی می‌کنی؟', ps: 'چېرته اوسېږې؟', ckb: 'لە کوێ دەژیت؟', om: 'Eessa jiraatta?', ti: 'ኣበይ ትቕመጥ?', so: 'Xagee ku nooshahay?', si: 'ඔයා ඉන්නේ කොහෙද?', en: 'Where do you live?', fr: 'Où habites-tu ?', tr: 'Nerede oturuyorsun?' },
  sein: { ar: 'كم عمرك؟', prs: 'چند ساله هستی؟', ps: 'ته څو کلن یې؟', ckb: 'تەمەنت چەندە؟', om: 'Umuriin kee meeqa?', ti: 'ዕድመኻ ክንደይ እዩ?', so: 'Immisa jir baad tahay?', si: 'ඔයාට වයස කීයද?', en: 'How old are you?', fr: 'Quel âge as-tu ?', tr: 'Kaç yaşındasın?' },
  sprechen: { ar: 'ما اللغات التي تتكلمها؟', prs: 'به کدام زبان‌ها صحبت می‌کنی؟', ps: 'په کومو ژبو خبرې کوې؟', ckb: 'بە چ زمانێک قسە دەکەیت؟', om: 'Afaan kam dubbatta?', ti: 'እንታይ ቋንቋታት ትዛረብ?', so: 'Luqadee ku hadashaa?', si: 'ඔයා කතා කරන භාෂා මොනවාද?', en: 'Which languages do you speak?', fr: 'Quelles langues parles-tu ?', tr: 'Hangi dilleri konuşuyorsun?' },
  hobby: { ar: 'ما هي هواياتك؟', prs: 'سرگرمی‌هایت چیست؟', ps: 'ستا شوقونه څه دي؟', ckb: 'خولیاکانت چین؟', om: "Fedhiin kee maal fa'a?", ti: 'ህዋያትካ እንታይ እዮም?', so: 'Waa maxay hiwaayadahaagu?', si: 'ඔයාගේ විනෝදාංශ මොනවාද?', en: 'What are your hobbies?', fr: 'Quels sont tes loisirs ?', tr: 'Hobilerin neler?' },
  schule: { ar: 'هل تحب الذهاب إلى المدرسة؟', prs: 'آیا دوست داری به مکتب بروی؟', ps: 'ایا ښوونځي ته تلل خوښوې؟', ckb: 'حەز دەکەیت بچیتە قوتابخانە؟', om: 'Mana barumsaa deemuu ni jaallattaa?', ti: 'ናብ ቤት ትምህርቲ ምኻድ ትፈቱ ዲኻ?', so: 'Ma jeceshahay inaad dugsiga aaddo?', si: 'ඔයා පාසල් යන්න කැමතිද?', en: 'Do you like going to school?', fr: "Tu aimes aller à l'école ?", tr: 'Okula gitmeyi sever misin?' },
};

Object.assign(STRINGS, {
  introTitle: { de: 'Meine Vorstellung', ar: 'تقديم نفسي', prs: 'معرفی من', ps: 'زما معرفي', ckb: 'ناساندنی خۆم', om: 'Of beeksisuu koo', ti: 'ምልላይ ርእሰይ', so: 'Is-baridkayga', si: 'මාව හඳුන්වා දීම', en: 'My introduction', fr: 'Ma présentation', tr: 'Kendimi tanıtıyorum' },
  introNote: { de: 'Deine Antworten bleiben nur hier und werden nicht gespeichert.', ar: 'تبقى إجاباتك هنا فقط ولا تُحفظ.', prs: 'پاسخ‌هایت فقط همین‌جا می‌مانند و ذخیره نمی‌شوند.', ps: 'ستا ځوابونه یوازې دلته پاتې کېږي او نه خوندي کېږي.', ckb: 'وەڵامەکانت تەنها لێرە دەمێننەوە و پاشەکەوت ناکرێن.', om: "Deebiin kee asitti qofa hafa, hin olkaa'amu.", ti: 'መልስታትካ ኣብዚ ጥራይ ይተርፉ፡ ኣይዕቀቡን።', so: 'Jawaabahaagu halkan oo keliya ayay joogaan, lama kaydiyo.', si: 'ඔයාගේ පිළිතුරු මෙතන විතරයි, ඒවා සුරකින්නේ නැහැ.', en: 'Your answers stay here only and are not saved.', fr: 'Tes réponses restent seulement ici et ne sont pas enregistrées.', tr: 'Cevapların sadece burada kalır ve kaydedilmez.' },
  introListen: { de: 'Das ist deine Vorstellung. Hör zu und sprich laut mit.', ar: 'هذا تقديمك لنفسك. استمع وتكلم بصوت عالٍ معه.', prs: 'این معرفی توست. گوش کن و بلند با آن بگو.', ps: 'دا ستا معرفي ده. واوره او په لوړ غږ ورسره ووایه.', ckb: 'ئەمە ناساندنی خۆتە. گوێ بگرە و بە دەنگی بەرز لەگەڵیدا بڵێ.', om: 'Kun of beeksisuu kee ti. Dhaggeeffadhuu sagalee ol kaasii waliin dubbadhu.', ti: 'እዚ ምልላይ ርእስኻ እዩ። ስማዕ ብዓውታ ድማ ምስኡ ተዛረብ።', so: 'Kani waa is-baridkaaga. Dhagayso oo kor ugu dheh.', si: 'මේ ඔයාගේ හැඳින්වීම. අහලා ශබ්ද නඟලා කියන්න.', en: 'This is your introduction. Listen and say it out loud.', fr: 'Voici ta présentation. Écoute et dis-la à voix haute.', tr: 'Bu senin tanıtımın. Dinle ve yüksek sesle söyle.' },
  introOwn: { de: 'Oder schreib selbst:', ar: 'أو اكتب بنفسك:', prs: 'یا خودت بنویس:', ps: 'یا پخپله ولیکه:', ckb: 'یان خۆت بینووسە:', om: 'Ykn ofii kee barreessi:', ti: 'ወይ ባዕልኻ ጽሓፍ፦', so: 'Ama adigu qor:', si: 'නැත්නම් ඔයාම ලියන්න:', en: 'Or write it yourself:', fr: 'Ou écris toi-même :', tr: 'Ya da kendin yaz:' },
});

// Countries that take an article: «aus der Türkei», «aus dem Irak».
const INTRO_COUNTRY_PHRASE = { Türkei: 'aus der Türkei', Ukraine: 'aus der Ukraine', Schweiz: 'aus der Schweiz', Irak: 'aus dem Irak', Iran: 'aus dem Iran', Jemen: 'aus dem Jemen', Sudan: 'aus dem Sudan' };
const INTRO_LANGUAGE_NAMES = { ar: 'Arabisch', prs: 'Dari', ps: 'Paschtu', ckb: 'Kurdisch', om: 'Oromo', ti: 'Tigrinya', aa: 'Afar', so: 'Somali', si: 'Singhalesisch', en: 'Englisch', fr: 'Französisch', tr: 'Türkisch' };

function introList(words) {
  return words.length < 2 ? words.join('') : `${words.slice(0, -1).join(', ')} und ${words[words.length - 1]}`;
}

// One question each, in the order of the introduction. `pick` offers buttons, `many` allows
// several, `type` allows own text. `say` turns the answer into the German sentence; `verb`
// and `form` name the verb form in it, for the gap exercise afterwards.
const INTRO_STEPS = [
  { id: 'heissen', verb: 'heissen', question: 'Wie heisst du?', type: true, say: (a) => `Ich heisse ${a}.`, form: () => 'heisse' },
  {
    id: 'kommen', verb: 'kommen', question: 'Woher kommst du?', type: true,
    pick: ['Afghanistan', 'Eritrea', 'Syrien', 'Somalia', 'Äthiopien', 'Irak', 'Iran', 'Türkei', 'Sri Lanka', 'Ukraine', 'Schweiz'],
    say: (a) => `Ich komme ${INTRO_COUNTRY_PHRASE[a] || `aus ${a}`}.`, form: () => 'komme',
  },
  { id: 'sein', verb: 'sein', question: 'Wie alt bist du?', type: true, pick: Array.from({ length: 17 }, (_, i) => String(14 + i)), say: (a) => `Ich bin ${a} Jahre alt.`, form: () => 'bin' },
  {
    id: 'sprechen', verb: 'sprechen', question: 'Welche Sprachen sprichst du?', many: true, type: true,
    pick: ['Arabisch', 'Dari', 'Paschtu', 'Kurdisch', 'Tigrinya', 'Somali', 'Oromo', 'Türkisch', 'Englisch', 'Französisch', 'Italienisch'],
    say: (a) => `Ich spreche ${a.join(', ')} und lerne Deutsch.`, form: () => 'spreche',
  },
  {
    id: 'hobby', verb: 'spielen', question: 'Was sind deine Hobbys?', many: true, type: true,
    pick: ['Fussball', 'Volleyball', 'Gym', 'Federball', 'Basketball', 'Schwimmen', 'Tanzen', 'Gamen', 'Telefonieren', 'Deutsch lernen', 'Cricket spielen', 'Singen', 'Lesen', 'Boxen', 'Spazieren', 'Kochen'],
    say: (a) => (a.length > 1 ? `Meine Hobbys sind ${introList(a)}.` : `Mein Hobby ist ${a[0]}.`),
    form: (a) => (a.length > 1 ? 'sind' : 'ist'), options: ['ist', 'sind', 'bin'],
  },
  { id: 'wohnen', verb: 'wohnen', question: 'Wo wohnst du?', type: true, say: (a) => `Ich wohne in ${a}.`, form: () => 'wohne' },
  { id: 'schule', verb: 'gehen', question: 'Gehst du gerne in die Schule?', pick: ['gerne', 'nicht gerne'], say: (a) => `Ich gehe ${a} in die Schule.`, form: () => 'gehe' },
];
INTRO_STEPS.forEach((step) => { step.t = INTRO_L1[step.id]; });

// The answer of a step: a list for `many`, otherwise one text.
function introAnswer(step, chosen, typed) {
  const own = typed.trim();
  return step.many ? [...chosen, own].filter(Boolean) : own || chosen[0] || '';
}

// Translations for the words of the introduction, shown when the student points at a word.
// Draft translations, unreviewed: see README.
const INTRO_WORDS = {
  aus: { ar: 'من', prs: 'از', ps: 'له', ckb: 'لە', om: 'irraa', ti: 'ካብ', so: 'ka', si: 'සිට', en: 'from', fr: 'de', tr: '-den' },
  jahre: { ar: 'سنوات', prs: 'سال', ps: 'کاله', ckb: 'ساڵ', om: 'waggaa', ti: 'ዓመታት', so: 'sano', si: 'අවුරුදු', en: 'years', fr: 'ans', tr: 'yıl' },
  alt: { ar: 'العمر', prs: 'ساله', ps: 'کلن', ckb: 'تەمەن', om: 'umurii', ti: 'ዕድመ', so: 'jir', si: 'වයස', en: 'old', fr: 'âgé', tr: 'yaşında' },
  und: { ar: 'و', prs: 'و', ps: 'او', ckb: 'و', om: 'fi', ti: 'ከምኡውን', so: 'iyo', si: 'සහ', en: 'and', fr: 'et', tr: 've' },
  deutsch: { ar: 'الألمانية', prs: 'آلمانی', ps: 'الماني', ckb: 'ئەڵمانی', om: 'Afaan Jarmanii', ti: 'ጀርመንኛ', so: 'Jarmal', si: 'ජර්මන්', en: 'German', fr: 'allemand', tr: 'Almanca' },
  mein: { ar: 'ـي (لي)', prs: 'ـم (مال من)', ps: 'زما', ckb: 'هی من', om: 'koo', ti: 'ናተይ', so: 'kayga', si: 'මගේ', en: 'my', fr: 'mon, ma, mes', tr: 'benim' },
  hobby: { ar: 'هواية، هوايات', prs: 'سرگرمی', ps: 'شوق', ckb: 'خولیا', om: 'fedhii', ti: 'ህዋይ', so: 'hiwaayad', si: 'විනෝදාංශය', en: 'hobby, hobbies', fr: 'loisir, loisirs', tr: 'hobi' },
  in: { ar: 'في', prs: 'در', ps: 'په', ckb: 'لە', om: 'keessa', ti: 'ኣብ', so: 'ku', si: 'තුළ', en: 'in', fr: 'à, dans', tr: '-de' },
  gerne: { ar: 'بكل سرور، أحب', prs: 'با علاقه', ps: 'په خوښۍ', ckb: 'بە حەزەوە', om: 'gammachuudhaan', ti: 'ብሓጎስ', so: 'si farxad leh', si: 'කැමැත්තෙන්', en: 'gladly, like to', fr: 'volontiers, aimer', tr: 'seve seve' },
  nicht: { ar: 'لا', prs: 'نه', ps: 'نه', ckb: 'نا', om: 'miti', ti: 'ኣይኮነን', so: 'ma aha', si: 'නැහැ', en: 'not', fr: 'ne … pas', tr: 'değil' },
  fussball: { ar: 'كرة القدم', prs: 'فوتبال', ps: 'فوټبال', ckb: 'تۆپی پێ', om: 'kubbaa miillaa', ti: 'ኩዕሶ እግሪ', so: 'kubbadda cagta', si: 'පාපන්දු', en: 'football', fr: 'football', tr: 'futbol' },
  volleyball: { ar: 'الكرة الطائرة', prs: 'والیبال', ps: 'والیبال', ckb: 'تۆپی باڵە', om: 'kubbaa harkaa', ti: 'ቮሊቦል', so: 'kubbadda laliska', si: 'වොලිබෝල්', en: 'volleyball', fr: 'volley-ball', tr: 'voleybol' },
  gym: { ar: 'النادي الرياضي', prs: 'باشگاه ورزشی', ps: 'جم', ckb: 'هۆڵی وەرزش', om: 'jiimii', ti: 'ጂም', so: 'jimicsi', si: 'ජිම්', en: 'gym, workout', fr: 'salle de sport', tr: 'spor salonu' },
  federball: { ar: 'الريشة الطائرة', prs: 'بدمینتون', ps: 'بیډمنټن', ckb: 'بادمینتن', om: 'badmintanii', ti: 'ባድሚንተን', so: 'badminton', si: 'බැඩ්මින්ටන්', en: 'badminton', fr: 'badminton', tr: 'badminton' },
  basketball: { ar: 'كرة السلة', prs: 'بسکتبال', ps: 'باسکیټبال', ckb: 'تۆپی سەبەتە', om: 'kubbaa saanduqaa', ti: 'ባስኬት ቦል', so: 'kubbadda koleyga', si: 'බාස්කට්බෝල්', en: 'basketball', fr: 'basket', tr: 'basketbol' },
  gamen: { ar: 'ألعاب الفيديو', prs: 'بازی‌های ویدیویی', ps: 'ویډیو لوبې', ckb: 'یاری ڤیدیۆیی', om: 'taphoota viidiyoo', ti: 'ጸወታታት ቪድዮ', so: 'ciyaaraha fiidiyowga', si: 'වීඩියෝ ක්‍රීඩා', en: 'video games', fr: 'jeux vidéo', tr: 'video oyunları' },
  telefonieren: { ar: 'التحدث بالهاتف', prs: 'تلفن زدن', ps: 'ټیلیفون کول', ckb: 'تەلەفۆن کردن', om: 'bilbila dubbachuu', ti: 'ብተሌፎን ምዝራብ', so: 'taleefan ku hadlid', si: 'දුරකථනයෙන් කතා කිරීම', en: 'talking on the phone', fr: 'téléphoner', tr: 'telefonla konuşmak' },
  boxen: { ar: 'الملاكمة', prs: 'بوکس', ps: 'باکسینګ', ckb: 'بۆکسێن', om: 'bokkisii', ti: 'ቦክስ', so: 'feer', si: 'බොක්සිං', en: 'boxing', fr: 'boxe', tr: 'boks' },
  spazieren: { ar: 'التنزه', prs: 'قدم زدن', ps: 'چکر وهل', ckb: 'پیاسە کردن', om: 'deemsa bashannanaa', ti: 'ምዝዋር', so: 'socod', si: 'ඇවිදීම', en: 'going for a walk', fr: 'se promener', tr: 'yürüyüş yapmak' },
  cricket: { ar: 'الكريكيت', prs: 'کریکت', ps: 'کرکټ', ckb: 'کریکیت', om: 'kiriikeetii', ti: 'ክሪኬት', so: 'kiriket', si: 'ක්‍රිකට්', en: 'cricket', fr: 'cricket', tr: 'kriket' },
};
// Hobbys are nouns (das Schwimmen): translated as the activity, not as «he swims».
Object.assign(INTRO_WORDS, {
  schwimmen: { ar: 'السباحة', prs: 'شنا', ps: 'لامبو', ckb: 'مەلەوانی', om: 'daakuu', ti: 'ምሕምባስ', so: 'dabaal', si: 'පිහිනීම', en: 'swimming', fr: 'natation', tr: 'yüzme' },
  tanzen: { ar: 'الرقص', prs: 'رقص', ps: 'نڅا', ckb: 'سەما', om: 'shubbisuu', ti: 'ስዕስዒት', so: 'qoob ka ciyaar', si: 'නැටුම්', en: 'dancing', fr: 'danse', tr: 'dans' },
  singen: { ar: 'الغناء', prs: 'آواز خواندن', ps: 'سندرې ویل', ckb: 'گۆرانی گوتن', om: 'faarfannaa', ti: 'ምዝማር', so: 'heesaha', si: 'ගායනය', en: 'singing', fr: 'chant', tr: 'şarkı söylemek' },
  lesen: { ar: 'القراءة', prs: 'مطالعه', ps: 'لوستل', ckb: 'خوێندنەوە', om: 'dubbisuu', ti: 'ምንባብ', so: 'akhris', si: 'කියවීම', en: 'reading', fr: 'lecture', tr: 'okumak' },
  kochen: { ar: 'الطبخ', prs: 'آشپزی', ps: 'پخلی', ckb: 'چێشت لێنان', om: 'nyaata bilcheessuu', ti: 'ምኽሻን', so: 'karinta', si: 'ඉවීම', en: 'cooking', fr: 'cuisine', tr: 'yemek yapmak' },
  'deutsch lernen': { ar: 'تعلم الألمانية', prs: 'آموختن آلمانی', ps: 'الماني زده کول', ckb: 'فێربوونی ئەڵمانی', om: 'Afaan Jarmanii barachuu', ti: 'ጀርመንኛ ምምሃር', so: 'barashada Jarmalka', si: 'ජර්මන් ඉගෙනීම', en: 'learning German', fr: "apprendre l'allemand", tr: 'Almanca öğrenmek' },
  'cricket spielen': { ar: 'لعب الكريكيت', prs: 'کریکت بازی کردن', ps: 'کرکټ لوبول', ckb: 'یاری کریکیت', om: 'kiriikeetii taphachuu', ti: 'ክሪኬት ምጽዋት', so: 'ciyaarista kiriketka', si: 'ක්‍රිකට් සෙල්ලම් කිරීම', en: 'playing cricket', fr: 'jouer au cricket', tr: 'kriket oynamak' },
});
INTRO_WORDS.meine = INTRO_WORDS.mein;
INTRO_WORDS.hobbys = INTRO_WORDS.hobby;
// Languages and countries show their own name: everyone recognises العربية or ትግርኛ.
const INTRO_NATIVE = {
  arabisch: 'العربية', dari: 'دری', paschtu: 'پښتو', kurdisch: 'کوردی', tigrinya: 'ትግርኛ', somali: 'Soomaali', oromo: 'Afaan Oromoo',
  türkisch: 'Türkçe', englisch: 'English', französisch: 'Français', italienisch: 'Italiano', singhalesisch: 'සිංහල', afar: 'Qafar af',
  afghanistan: 'افغانستان', eritrea: 'ኤርትራ', syrien: 'سوريا', somalia: 'Soomaaliya', äthiopien: 'ኢትዮጵያ', irak: 'العراق', iran: 'ایران',
  türkei: 'Türkiye', sri: 'ශ්‍රී ලංකාව', lanka: 'ශ්‍රී ලංකාව', ukraine: 'Україна', schweiz: 'Schweiz · Suisse · Svizzera',
};
// Verb forms of the introduction and the verb they belong to.
const INTRO_FORMS = { heisse: 'heissen', komme: 'kommen', bin: 'sein', ist: 'sein', sind: 'sein', spreche: 'sprechen', lerne: 'lernen', wohne: 'wohnen', gehe: 'gehen' };

// The base form and translation of one word ({ de, t }), or null when there is none.
function introGloss(word, codes) {
  const key = word.replace(/[.,!?]/g, '').toLowerCase();
  if (INTRO_WORDS[key]) return { de: key === 'meine' ? 'mein, meine' : word.replace(/[.,!?]/g, ''), t: INTRO_WORDS[key] };
  if (INTRO_NATIVE[key]) return { de: word.replace(/[.,!?]/g, ''), t: Object.fromEntries(codes.map((c) => [c, INTRO_NATIVE[key]])) };
  const v = verb(INTRO_FORMS[key] || key);
  if (v) return { de: v.de, t: v.t };
  if (key === 'ich') return { de: 'ich', t: person('ich').t };
  const item = typeof ITEMS !== 'undefined' && ITEMS.find((it) => it.de.toLowerCase() === key && it.kind === 'word');
  return item ? { de: item.de, art: item.art, t: item.t } : null;
}

function introVerbGap(step, answer, line, rnd) {
  const v = verb(step.verb);
  const form = step.form(answer);
  const others = step.options || ['du', 'er', 'wir'].map((k) => conjugate(v, k));
  return {
    kind: 'choice', task: 'gap', pic: v.pic, text: line.replace(` ${form} `, ' ___ '), answer: form, full: line, feedbackL1: step.t,
    options: distinct(form, others, 3, rnd),
  };
}

function introBuild(step, line) {
  return { kind: 'build', task: 'build', pic: verb(step.verb).pic, l1: step.t, words: line.split(' '), answer: line, full: line, feedbackL1: step.t };
}

// Practice from the student's own lines: every sentence built once, every verb chosen once.
function introPractice(answers, rnd = Math.random) {
  const made = INTRO_STEPS.map((step, i) => ({ step, answer: answers[i], line: step.say(answers[i]) }));
  return [
    ...shuffle(made, rnd).map((m) => introBuild(m.step, m.line)),
    ...shuffle(made, rnd).map((m) => introVerbGap(m.step, m.answer, m.line, rnd)),
  ];
}

if (typeof module !== 'undefined') module.exports = { INTRO_STEPS, introPractice, introList, introAnswer, introGloss };
