// Weitere Übungen zur Lerneinheit «Amazonien», in drei Stufen. Konzept in docs/amazonia.md.
// Translations are AI drafts, in the order of AMZ_LANGS, separated by |.

Object.assign(STRINGS, {
  amzLevel1: amzT('Vertiefung 1', `التعمّق 1|تعمیق ۱|ژورتیا ۱|قووڵبوونەوە ١|Gadi fageessuu 1|ምዕማቕ 1|Qoto dheer 1|ගැඹුරු කිරීම 1|Going deeper 1|Approfondissement 1|Derinleşme 1`),
  amzLevel2: amzT('Vertiefung 2', `التعمّق 2|تعمیق ۲|ژورتیا ۲|قووڵبوونەوە ٢|Gadi fageessuu 2|ምዕማቕ 2|Qoto dheer 2|ගැඹුරු කිරීම 2|Going deeper 2|Approfondissement 2|Derinleşme 2`),
  amzLevel3: amzT('Vertiefung 3', `التعمّق 3|تعمیق ۳|ژورتیا ۳|قووڵبوونەوە ٣|Gadi fageessuu 3|ምዕማቕ 3|Qoto dheer 3|ගැඹුරු කිරීම 3|Going deeper 3|Approfondissement 3|Derinleşme 3`),
  amzMemory: amzT('Memory', `لعبة الذاكرة|بازی حافظه|د حافظې لوبه|یاری بیرەوەری|Taphataa yaadannoo|ጸወታ ዝኽሪ|Ciyaarta xusuusta|මතක ක්‍රීඩාව|Memory game|Memory|Hafıza oyunu`),
  amzSortArticle: amzT('der, die, das sortieren', `رتّب der وdie وdas|der، die، das را دسته‌بندی کن|der، die، das ترتیب کړه|der، die، das ڕیز بکە|der, die, das qindeessi|der፣ die፣ das ሰርዑ|Kala sooc der, die, das|der, die, das වර්ග කරන්න|Sort der, die, das|Trie der, die, das|der, die, das ayır`),
  amzSortClass: amzT('Wortarten sortieren', `رتّب أنواع الكلمات|نوع کلمه‌ها را دسته‌بندی کن|د کلمو ډولونه ترتیب کړه|جۆری وشەکان ڕیز بکە|Gosa jechootaa qindeessi|ዓይነት ቃላት ሰርዑ|Kala sooc noocyada ereyada|වචන වර්ග වර්ග කරන්න|Sort the word types|Trie les types de mots|Kelime türlerini ayır`),
  amzGap: amzT('Lückentext', `نص بفراغات|متن با جاهای خالی|تش ځایونو متن|دەقی بۆشایی|Barreeffama iddoo duwwaa|ጽሑፍ ምስ ባዶ ቦታታት|Qoraal meelo bannaan leh|හිස්තැන් සහිත පෙළ|Gap text|Texte à trous|Boşluk doldurma`),
  amzGapHelp: amzT('Tippe ein Wort an. Tippe dann auf die Lücke.', `انقر على كلمة. ثم انقر على الفراغ.|روی یک کلمه بزن. بعد روی جای خالی بزن.|پر یوه کلمه کېکاږه. بیا پر تش ځای کېکاږه.|دەست لە وشەیەک بدە. پاشان دەست لە بۆشاییەکە بدە.|Jecha tokko tuqi. Achiis iddoo duwwaa tuqi.|ሓንቲ ቃል ጠውቑ። ድሕሪኡ ነቲ ባዶ ቦታ ጠውቑ።|Taabo eray. Kadib taabo meesha bannaan.|වචනයක් ස්පර්ශ කරන්න. ඉන්පසු හිස්තැන ස්පර්ශ කරන්න.|Tap a word. Then tap the gap.|Touche un mot. Puis touche le trou.|Bir kelimeye dokun. Sonra boşluğa dokun.`),
  amzTrueFalse: amzT('Richtig oder falsch?', `صحيح أم خطأ؟|درست یا نادرست؟|سم که ناسم؟|ڕاست یان هەڵە؟|Sirrii moo dogoggora?|ቅኑዕ ድዩ ወይስ ጌጋ?|Sax mise khalad?|නිවැරදිද වැරදිද?|True or false?|Vrai ou faux ?|Doğru mu yanlış mı?`),
  amzTrue: amzT('richtig', `صحيح|درست|سم|ڕاست|sirrii|ቅኑዕ|sax|නිවැරදි|true|vrai|doğru`),
  amzFalse: amzT('falsch', `خطأ|نادرست|ناسم|هەڵە|dogoggora|ጌጋ|khalad|වැරදි|false|faux|yanlış`),
  amzShowL1: amzT('Übersetzung zeigen', `أظهر الترجمة|ترجمه را نشان بده|ژباړه وښیه|وەرگێڕان پیشان بدە|Hiikkaa agarsiisi|ትርጉም ኣርእዩ|Tus tarjumaadda|පරිවර්තනය පෙන්වන්න|Show translation|Montrer la traduction|Çeviriyi göster`),
  amzOpposites: amzT('Gegenteile', `الأضداد|متضادها|متضادونه|دژەکان|Faallaa|ተጻረርቲ|Lidyada|විරුද්ධ පද|Opposites|Les contraires|Zıt anlamlılar`),
  amzOppositesHelp: amzT('Finde das Gegenteil.', `جد العكس.|متضاد را پیدا کن.|متضاد یې پیدا کړه.|دژەکەی بدۆزەوە.|Faallaa isaa barbaadi.|ተጻራሪኡ ርከቡ።|Hel lidka.|විරුද්ධ පදය සොයන්න.|Find the opposite.|Trouve le contraire.|Zıt anlamlısını bul.`),
  amzBuild: amzT('Sätze bauen', `كوّن جملًا|جمله بساز|جملې جوړې کړه|ڕستە دروست بکە|Hima ijaari|ምሉእ ሓሳባት ስርዑ|Dhis jumlado|වාක්‍ය ගොඩනඟන්න|Build sentences|Construis des phrases|Cümle kur`),
  amzBuildHelp: amzT('Hör zu und bau den Satz.', `استمع وكوّن الجملة.|گوش کن و جمله را بساز.|واوره او جمله جوړه کړه.|گوێ بگرە و ڕستەکە دروست بکە.|Dhaggeeffadhuu hima ijaari.|ስምዑ እሞ እቲ ምሉእ ሓሳብ ስርዑ።|Dhageyso oo dhis jumladda.|සවන් දී වාක්‍යය ගොඩනඟන්න.|Listen and build the sentence.|Écoute et construis la phrase.|Dinle ve cümleyi kur.`),
  amzPlural: amzT('Mehrzahl', `الجمع|جمع|جمع|کۆ|Baay'ina|ብዙሕ|Wadar|බහු වචනය|Plural|Le pluriel|Çoğul`),
  amzPluralHelp: amzT('Wie heisst die Mehrzahl?', `ما صيغة الجمع؟|جمع آن چه می‌شود؟|جمع یې څه دی؟|کۆکەی چییە؟|Baay'inni isaa maali?|ብዙሑ እንታይ እዩ?|Waa maxay wadarta?|බහු වචනය කුමක්ද?|What is the plural?|Quel est le pluriel ?|Çoğulu nedir?`),
  amzVerbForm: amzT('Verb in den Satz', `الفعل في الجملة|فعل در جمله|فعل په جمله کې|کردار لە ڕستەدا|Gochima hima keessatti|ግሲ ኣብ ምሉእ ሓሳብ|Falka jumladda|වාක්‍යයේ ක්‍රියා පදය|Verb in the sentence|Le verbe dans la phrase|Cümlede fiil`),
  amzVerbHelp: amzT('Welche Form passt?', `أي صيغة تناسب؟|کدام شکل مناسب است؟|کوم شکل سمون لري؟|کام شێوە دەگونجێت؟|Bocni kami sirrii ta'a?|ኣየናይ ቅርጺ ይሰማማዕ?|Qaabkee ku habboon?|කුමන ආකාරය ගැළපේද?|Which form fits?|Quelle forme convient ?|Hangi biçim uyar?`),
  amzOwn: amzT('Eigene Sätze', `جمل خاصة بك|جمله‌های خودت|خپلې جملې|ڕستەکانی خۆت|Hima mataa kee|ናይ ገዛእ ርእስኹም ምሉእ ሓሳባት|Jumladahaaga|ඔබේම වාක්‍ය|Your own sentences|Tes propres phrases|Kendi cümlelerin`),
  amzOwnHelp: amzT('Schreib einen Satz zum Foto.', `اكتب جملة عن الصورة.|یک جمله دربارهٔ عکس بنویس.|د انځور په اړه یوه جمله ولیکه.|ڕستەیەک دەربارەی وێنەکە بنووسە.|Waa'ee suuraa hima tokko barreessi.|ብዛዕባ እቲ ስእሊ ሓደ ምሉእ ሓሳብ ጽሓፉ።|Qor jumlad ku saabsan sawirka.|ඡායාරූපය ගැන වාක්‍යයක් ලියන්න.|Write a sentence about the photo.|Écris une phrase sur la photo.|Fotoğraf hakkında bir cümle yaz.`),
  amzOwnSaved: amzT('Deine Sätze', `جملك|جمله‌های تو|ستا جملې|ڕستەکانت|Hima kee|ምሉእ ሓሳባትኩም|Jumladahaaga|ඔබේ වාක්‍ය|Your sentences|Tes phrases|Cümlelerin`),
  amzOtherPhoto: amzT('Anderes Foto', `صورة أخرى|عکس دیگر|بل انځور|وێنەیەکی تر|Suuraa biraa|ካልእ ስእሊ|Sawir kale|වෙනත් ඡායාරූපයක්|Another photo|Une autre photo|Başka fotoğraf`),
});

// Stufe 2: statements on texts 1 and 2, true or false.
const AMZ_STATEMENTS = [
  [true, 'Amazonien liegt in Südamerika.', `الأمازون في أمريكا الجنوبية.|آمازون در امریکای جنوبی است.|امازون په سوېلي امریکا کې دی.|ئەمازۆن لە ئەمریکای باشوورە.|Amazoniyaan Ameerikaa Kibbaa keessa jira.|ኣማዞንያ ኣብ ደቡብ ኣሜሪካ እያ።|Amazonia waxay ku taal Koonfurta Ameerika.|ඇමසෝනියාව දකුණු ඇමරිකාවේ පිහිටා ඇත.|Amazonia is in South America.|L'Amazonie se trouve en Amérique du Sud.|Amazonya Güney Amerika'dadır.`],
  [false, 'Im Regenwald haben nie Menschen gewohnt.', `لم يعش أحد أبدًا في الغابة المطيرة.|هیچ‌وقت انسانی در جنگل بارانی زندگی نکرده است.|په باراني ځنګل کې هېڅکله خلک نه دي اوسېدلي.|هەرگیز کەس لە دارستانی بارانیدا نەژیاوە.|Bosona roobaa keessa namni gonkumaa hin jiraanne.|ኣብ ናይ ዝናብ ጫካ ሰብ ፈጺሙ ኣይነበረን።|Weligood dad kuma noolaan kaynta roobaadka.|වැසි වනාන්තරයේ කිසිදා මිනිසුන් ජීවත් වී නැත.|People never lived in the rainforest.|Personne n'a jamais vécu dans la forêt tropicale.|Yağmur ormanında hiç insan yaşamadı.`],
  [true, 'Der Amazonas ist ein Fluss.', `الأمازون نهر.|آمازون یک دریا است.|امازون یو سیند دی.|ئەمازۆن ڕووبارێکە.|Amazon laga dha.|ኣማዞን ሩባ እዩ።|Amazon waa webi.|ඇමසන් ගඟකි.|The Amazon is a river.|L'Amazone est un fleuve.|Amazon bir nehirdir.`],
  [false, 'Im Regenwald ist es kalt und trocken.', `الجو في الغابة المطيرة بارد وجاف.|در جنگل بارانی هوا سرد و خشک است.|په باراني ځنګل کې هوا سړه او وچه ده.|لە دارستانی بارانیدا سارد و وشکە.|Bosona roobaa keessa qorraa fi gogaa dha.|ኣብ ናይ ዝናብ ጫካ ዝሑልን ደረቕን እዩ።|Kaynta roobaadka waa qabow iyo engegan.|වැසි වනාන්තරයේ සීතල සහ වියළි ය.|In the rainforest it is cold and dry.|Dans la forêt tropicale, il fait froid et sec.|Yağmur ormanında hava soğuk ve kurudur.`],
  [true, 'Unter den Bäumen findet man alte Städte.', `تحت الأشجار توجد مدن قديمة.|زیر درختان شهرهای کهنه پیدا می‌شود.|د ونو لاندې زاړه ښارونه پیدا کېږي.|لە ژێر دارەکاندا شاری کۆن دەدۆزرێتەوە.|Mukeen jala magaalonni durii ni argamu.|ኣብ ትሕቲ ኦማት ጥንታውያን ከተማታት ይርከባ።|Geedaha hoostooda waxaa laga helaa magaalooyin hore.|ගස් යට පැරණි නගර හමු වේ.|Old cities are found under the trees.|On trouve des villes anciennes sous les arbres.|Ağaçların altında eski şehirler bulunur.`],
  [true, 'Die Farbe für den Körper kommt aus einer Pflanze.', `لون الجسم يأتي من نبات.|رنگ برای بدن از یک گیاه می‌آید.|د بدن رنګ له یوه بوټي راځي.|ڕەنگی لەش لە ڕووەکێکەوە دێت.|Halluun qaamaaf ta'u biqiltuu irraa dhufa.|እቲ ንኣካል ዝኸውን ሕብሪ ካብ ተኽሊ ይመጽእ።|Midabka jidhka wuxuu ka yimaadaa dhir.|සිරුර සඳහා වර්ණය ශාකයකින් පැමිණේ.|The colour for the body comes from a plant.|La couleur pour le corps vient d'une plante.|Vücut boyası bir bitkiden gelir.`],
  [true, 'Die Menschen tragen Schmuck aus Federn.', `يلبس الناس حُليًّا من الريش.|مردم زیورات پَری می‌پوشند.|خلک د بڼکو ګاڼې اغوندي.|خەڵک خشڵی پەڕ لەبەر دەکەن.|Namoonni faayaa baallee irraa hojjetame kaawwatu.|ሰባት ካብ ክንቲት ዝተሰርሐ ስልማት ይገብሩ።|Dadku waxay xidhaan qurxin baalal ka samaysan.|මිනිසුන් පිහාටුවලින් සැදූ ආභරණ පළඳිති.|The people wear jewellery made of feathers.|Les gens portent des bijoux en plumes.|İnsanlar tüylerden yapılmış takılar takar.`],
  [false, 'Heute leben keine Menschen mehr in Amazonien.', `اليوم لا يعيش أحد في الأمازون.|امروز دیگر هیچ انسانی در آمازون زندگی نمی‌کند.|نن نور هېڅ خلک په امازون کې نه اوسېږي.|ئەمڕۆ ئیتر کەس لە ئەمازۆن ناژی.|Har'a Amazoniyaa keessa namni hin jiraatu.|ሎሚ ኣብ ኣማዞንያ ሰብ የለን።|Maanta dad kuma noola Amazonia.|අද ඇමසෝනියාවේ කිසිවෙක් ජීවත් නොවෙති.|Today nobody lives in Amazonia any more.|Aujourd'hui, plus personne ne vit en Amazonie.|Bugün Amazonya'da artık kimse yaşamıyor.`],
].map(([ok, de, t]) => ({ ok, text: amzT(de, t) }));

// Stufe 2: adjectives and their opposites, matched four at a time.
const AMZ_OPPOSITES = [
  [['gross', 'klein'], ['alt', 'neu'], ['warm', 'kalt'], ['nass', 'trocken']],
  [['lang', 'kurz'], ['schön', 'hässlich'], ['farbig', 'grau'], ['wichtig', 'unwichtig']],
];

// Stufe 2: sentences from text 2, built from shuffled words after listening.
const AMZ_BUILD = [
  'Wir besuchen das Museum Rietberg.',
  'Dort wächst ein grüner Wald.',
  'Im Wald ist es warm und nass.',
  'Der Jaguar lebt auch dort.',
  'Im Wald hören wir viele Vögel.',
  'Sie kennen den Wald gut.',
  'Die Töpfe sind schön und farbig.',
  'Die Farbe kommt aus einer Pflanze.',
];

// Stufe 3: plural of the nouns; the right form first, then two wrong ones.
const AMZ_PLURALS = [
  ['wald', 'Wälder', 'Walder', 'Walde'],
  ['fluss', 'Flüsse', 'Flusse', 'Flussen'],
  ['tier', 'Tiere', 'Tieren', 'Tiers'],
  ['jaguar', 'Jaguare', 'Jäguare', 'Jaguaren'],
  ['mensch', 'Menschen', 'Mensche', 'Menscher'],
  ['bild', 'Bilder', 'Bilde', 'Bilds'],
  ['pflanze', 'Pflanzen', 'Pflanzes', 'Pflänze'],
  ['stadt', 'Städte', 'Stadte', 'Stadten'],
  ['topf', 'Töpfe', 'Topfe', 'Topfs'],
];

// Stufe 3: the verb in the right form. Before the gap, infinitive, after the gap, right form, wrong forms.
const AMZ_VERB_TASKS = [
  ['Die Menschen', 'leben', 'im Wald.', 'leben', ['lebt', 'lebst']],
  ['Der Jaguar', 'leben', 'im Wald.', 'lebt', ['leben', 'lebe']],
  ['Wir', 'besuchen', 'das Museum.', 'besuchen', ['besucht', 'besuchst']],
  ['Ich', 'sehen', 'alte Töpfe.', 'sehe', ['sieht', 'siehst']],
  ['Du', 'sehen', 'einen Jaguar.', 'siehst', ['sehst', 'sieht']],
  ['Das Museum', 'zeigen', 'eine Ausstellung.', 'zeigt', ['zeigen', 'zeige']],
  ['Der Wald', 'wachsen', 'schnell.', 'wächst', ['wachst', 'wachsen']],
  ['Die Frauen', 'tragen', 'Schmuck.', 'tragen', ['trägt', 'trägst']],
  ['Ihr', 'hören', 'Musik.', 'hört', ['hören', 'hörst']],
  ['Ich', 'kennen', 'den Wald gut.', 'kenne', ['kennst', 'kennt']],
];

// Stufe 3: beginnings for own sentences about a photo.
const AMZ_STARTERS = ['Ich sehe …', 'Das ist …', 'Im Museum gibt es …', 'Mir gefällt …'];

// ---- Screens ----

function amzExPage(titleKey, share, ...content) {
  show(h('main', { class: 'page narrow session' },
    h('header', { class: 'session-bar' },
      h('button', { class: 'round', 'aria-label': STRINGS.back.de, onclick: renderAmazonia }, '✕'),
      h('span', { class: 'meter grow', role: 'img', 'aria-label': `${Math.round(share * 100)} %` }, h('span', { style: `width:${Math.round(share * 100)}%` }))),
    h('h1', { class: 'stack task' }, pair(titleKey)),
    content));
}

function amzDoneScreen(id, titleKey, right, total) {
  amzFinish(id);
  amzExPage(titleKey, 1,
    h('div', { class: 'card done' },
      icon(Store.profile.animal, 'div', 'pic huge'),
      h('h2', { class: 'stack' }, pair('wellDone')),
      total ? h('p', { class: 'score' }, `${right} / ${total} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount)) : null),
    h('button', { class: 'primary wide stack', onclick: renderAmazonia }, pair('next')));
  root.querySelector('.primary').focus();
}

// Single choice, task after task. A task has a prompt and options, one of them right;
// `after` shows once answered, `say` is spoken then.
function amzQuiz(id, titleKey, tasks, index = 0, right = 0) {
  if (index === tasks.length) return amzDoneScreen(id, titleKey, right, tasks.length);
  const task = tasks[index];
  const after = h('div', { class: 'quiz-after' });
  const next = h('button', { class: 'primary wide stack', hidden: true }, pair('next'));
  const buttons = task.options.map((option, i) => h('button', {
    class: 'option stack center',
    onclick: () => {
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (task.options[j].right) b.classList.add('right-answer');
      });
      if (!option.right) buttons[i].classList.add('wrong');
      if (task.after) after.replaceChildren(task.after());
      if (task.say) Speech.say(task.say);
      next.onclick = () => amzQuiz(id, titleKey, tasks, index + 1, right + (option.right ? 1 : 0));
      next.hidden = false;
      next.focus();
    },
  }, option.label));
  const columns = { 2: ' two', 3: ' three' }[task.options.length] || '';
  amzExPage(titleKey, index / tasks.length,
    task.help ? h('p', { class: 'stack' }, pair(task.help)) : null,
    h('div', { class: 'card' }, task.prompt()),
    h('div', { class: `options${columns}` }, buttons),
    after, next);
  if (task.sayFirst) Speech.say(task.sayFirst);
}

const amzClassOption = (cls) => [markSample(cls, STRINGS[AMZ_CLASS_KEYS[cls]].de), localized(STRINGS[AMZ_CLASS_KEYS[cls]])];
const amzArticleLabel = (art) => h('span', { class: `art art-${art}` }, art);
const amzNouns = () => AMZ_ITEMS.filter((it) => it.wordClass === 'N');

// Stufe 1

function renderAmzMemory() {
  const words = shuffle(amzNouns()).slice(0, 6);
  const cards = shuffle(words.flatMap((it) => [{ it, face: 'photo' }, { it, face: 'word' }]));
  let open = [];
  let found = 0;
  let busy = false;
  const grid = h('div', { class: 'memory' });
  const draw = () => grid.replaceChildren(...cards.map((card) => {
    const visible = card.shown || card.done;
    return h('button', {
      class: `memory-card${visible ? ' shown' : ''}${card.done ? ' done' : ''}`,
      'aria-label': visible ? fullGerman(card.it) : '?',
      onclick: () => flip(card),
    }, visible ? (card.face === 'photo' ? picture(card.it) : germanWord(card.it)) : '?');
  }));
  const flip = (card) => {
    if (busy || card.shown || card.done) return;
    card.shown = true;
    open.push(card);
    draw();
    if (open.length < 2) return;
    const [a, b] = open;
    open = [];
    if (a.it === b.it) {
      a.done = true;
      b.done = true;
      found += 1;
      Speech.say(fullGerman(a.it));
      draw();
      if (found === words.length) setTimeout(() => amzDoneScreen('memory', 'amzMemory', 0, 0), 1200);
      return;
    }
    busy = true;
    setTimeout(() => { a.shown = false; b.shown = false; busy = false; draw(); }, 1200);
  };
  draw();
  amzExPage('amzMemory', 0, h('p', { class: 'stack' }, pair('match')), grid);
}

function renderAmzSortArticle() {
  amzQuiz('sortArticle', 'amzSortArticle', shuffle(amzNouns()).map((it) => ({
    help: 'article',
    prompt: () => [picture(it), h('span', { class: 'word' }, it.de)],
    options: ['der', 'die', 'das'].map((art) => ({ label: amzArticleLabel(art), right: art === it.art })),
    after: () => germanWord(it),
    say: fullGerman(it),
  })));
}

function renderAmzSortClass() {
  amzQuiz('sortClass', 'amzSortClass', shuffle(AMZ_ITEMS).slice(0, 15).map((it) => ({
    help: 'whichKind',
    prompt: () => h('span', { class: 'word', lang: 'de' }, it.de),
    options: ['N', 'V', 'A'].map((cls) => ({ label: amzClassOption(cls), right: cls === it.wordClass })),
    say: it.de,
  })));
}

// Stufe 2

// Text 2 paragraph by paragraph, with up to four of the learned words taken out.
function renderAmzGap(index = 0, right = 0, total = 0) {
  if (index === AMZ_TEXT2.length) return amzDoneScreen('gap', 'amzGap', right, total);
  const learned = new Set(AMZ_WORDS.map(([key]) => key));
  const tokens = amzTokens(AMZ_TEXT2[index]);
  const candidates = tokens.map((t, i) => (t.wordClass && learned.has(t.key) ? i : -1)).filter((i) => i >= 0);
  const step = Math.max(1, Math.ceil(candidates.length / 4));
  const gapAt = new Set(candidates.filter((_, n) => n % step === 0).slice(0, 4));
  const gaps = [...gapAt].map((i) => ({ i, answer: tokens[i].word, filled: null }));
  const bank = shuffle(gaps.map((g, n) => ({ id: n, word: g.answer })));
  let chosen = null;
  let checked = false;
  let firstTry = true;
  const text = h('p', { class: 'gap-text', lang: 'de' });
  const bankRow = h('div', { class: 'tile-bank' });
  const check = h('button', { class: 'primary wide stack', disabled: true }, pair('check'));

  const draw = () => {
    text.replaceChildren(...tokens.map((t, i) => {
      if (t.text) return t.text;
      const gap = gaps.find((g) => g.i === i);
      if (!gap) return t.word;
      const state = checked ? (gap.filled && gap.filled.word === gap.answer ? ' good' : ' again') : '';
      return h('button', {
        class: `gap-slot${gap.filled ? ' filled' : ''}${state}`,
        onclick: () => {
          checked = false;
          if (chosen) {
            gaps.forEach((g) => { if (g.filled === chosen) g.filled = null; });
            gap.filled = chosen;
            chosen = null;
          } else gap.filled = null;
          draw();
        },
      }, gap.filled ? gap.filled.word : '…');
    }));
    bankRow.replaceChildren(...bank.map((tile) => (gaps.some((g) => g.filled === tile)
      ? h('span', { class: 'tile ghost', 'aria-hidden': 'true' }, tile.word)
      : h('button', {
        class: `tile${chosen === tile ? ' chosen' : ''}`,
        onclick: () => { chosen = chosen === tile ? null : tile; draw(); },
      }, tile.word))));
    check.disabled = gaps.some((g) => !g.filled);
  };

  check.onclick = () => {
    const correct = gaps.filter((g) => g.filled.word === g.answer).length;
    if (firstTry) {
      right += correct;
      total += gaps.length;
      firstTry = false;
    }
    if (correct === gaps.length) return renderAmzGap(index + 1, right, total);
    checked = true;
    draw();
  };
  draw();
  amzExPage('amzGap', index / AMZ_TEXT2.length,
    h('p', { class: 'stack' }, pair('amzGapHelp')),
    h('div', { class: 'card reading' }, text),
    bankRow, check);
}

function renderAmzTrueFalse() {
  amzQuiz('trueFalse', 'amzTrueFalse', AMZ_STATEMENTS.map((s) => ({
    prompt: () => {
      const reveal = h('button', { class: 'text-button', onclick: () => reveal.replaceWith(localized(s.text)) }, '🌐 ', STRINGS.amzShowL1.de);
      return [h('p', { class: 'rule', lang: 'de' }, s.text.de), audioButtons(s.text.de), reveal];
    },
    options: [
      { label: ['✓ ', ...pair('amzTrue')], right: s.ok },
      { label: ['✗ ', ...pair('amzFalse')], right: !s.ok },
    ],
    sayFirst: s.text.de,
  })));
}

// Two columns of German words: tap one on the left, then its partner on the right.
function renderAmzOpposites(round = 0) {
  if (round === AMZ_OPPOSITES.length) return amzDoneScreen('opposites', 'amzOpposites', 0, 0);
  const pairs = AMZ_OPPOSITES[round];
  let chosen = null;
  let found = 0;
  const lefts = shuffle(pairs).map((p) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (chosen) chosen.button.classList.remove('chosen');
        chosen = { p, button };
        button.classList.add('chosen');
        Speech.say(p[0]);
      },
    }, p[0]);
    return button;
  });
  const rights = shuffle(pairs).map((p) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (!chosen) return;
        if (chosen.p !== p) {
          button.classList.add('wrong');
          setTimeout(() => button.classList.remove('wrong'), 500);
          return;
        }
        Speech.say(`${p[0]}, ${p[1]}`);
        chosen.button.disabled = true;
        chosen.button.classList.remove('chosen');
        button.disabled = true;
        chosen = null;
        found += 1;
        if (found === pairs.length) setTimeout(() => renderAmzOpposites(round + 1), 900);
      },
    }, p[1]);
    return button;
  });
  amzExPage('amzOpposites', round / AMZ_OPPOSITES.length,
    h('p', { class: 'stack' }, pair('amzOppositesHelp')),
    h('div', { class: 'match', lang: 'de' }, h('div', { class: 'options' }, lefts), h('div', { class: 'options' }, rights)));
}

function renderAmzBuild(index = 0, right = 0) {
  if (index === AMZ_BUILD.length) return amzDoneScreen('build', 'amzBuild', right, AMZ_BUILD.length);
  const sentence = AMZ_BUILD[index];
  const words = sentence.split(' ').map((text, id) => ({ text, id }));
  let tiles = shuffle(words);
  while (tiles.length > 1 && tiles.every((t, i) => t.id === i)) tiles = shuffle(words);
  const placed = [];
  const line = h('div', { class: 'sentence-line', lang: 'de' });
  const bank = h('div', { class: 'tile-bank', lang: 'de' });
  const feedback = h('div', {});
  const check = h('button', { class: 'primary wide stack', disabled: true }, pair('check'));
  const draw = () => {
    line.replaceChildren(...placed.map((tile) => h('button', {
      class: 'tile', onclick: () => { placed.splice(placed.indexOf(tile), 1); draw(); },
    }, tile.text)));
    bank.replaceChildren(...tiles.map((tile) => (placed.includes(tile)
      ? h('span', { class: 'tile ghost', 'aria-hidden': 'true' }, tile.text)
      : h('button', { class: 'tile', onclick: () => { placed.push(tile); draw(); } }, tile.text))));
    check.disabled = placed.length !== tiles.length;
  };
  check.onclick = () => {
    const correct = placed.map((t) => t.text).join(' ') === sentence;
    feedback.replaceChildren(h('div', { class: `feedback ${correct ? 'good' : 'again'}`, role: 'status' },
      h('p', { class: 'stack feedback-title' }, pair(correct ? 'right' : 'notYet')),
      h('p', { class: 'word', lang: 'de' }, sentence)));
    Speech.say(sentence);
    line.replaceChildren();
    bank.replaceChildren();
    check.replaceWith(h('button', { class: 'primary wide stack', onclick: () => renderAmzBuild(index + 1, right + (correct ? 1 : 0)) }, pair('next')));
  };
  draw();
  amzExPage('amzBuild', index / AMZ_BUILD.length,
    h('p', { class: 'stack' }, pair('amzBuildHelp')),
    audioButtons(sentence),
    line, bank, feedback, check);
  Speech.say(sentence);
}

// Stufe 3

// Umlauts in a plural are what the students most often miss, so they stand out.
// The plural «die» has no colour: red would read as a feminine noun.
const amzPluralArticle = () => h('span', { class: 'art art-plural' }, 'die');
const amzUmlauts = (word) => [...word].map((ch) => (/[äöü]/.test(ch) ? h('strong', { class: 'umlaut' }, ch) : ch));

function renderAmzPlural() {
  amzQuiz('plural', 'amzPlural', shuffle(AMZ_PLURALS).map(([key, plural, ...wrong]) => {
    const it = AMZ_ITEMS.find((x) => x.id === `amz-${key}`);
    return {
      help: 'amzPluralHelp',
      prompt: () => [picture(it), germanWord(it), h('span', { class: 'word', lang: 'de' }, amzPluralArticle(), ' …')],
      options: shuffle([plural, ...wrong]).map((form) => ({ label: h('span', { lang: 'de' }, form), right: form === plural })),
      after: () => h('p', { class: 'word', lang: 'de' }, amzPluralArticle(), ' ', amzUmlauts(plural)),
      say: `die ${plural}`,
    };
  }));
}

function renderAmzVerbForm() {
  amzQuiz('verbForm', 'amzVerbForm', AMZ_VERB_TASKS.map(([before, infinitive, after, form, wrong]) => ({
    help: 'amzVerbHelp',
    prompt: () => [
      h('p', { class: 'rule', lang: 'de' }, before, ' ', h('span', { class: 'gap-mark' }, '___'), ' ', after),
      h('p', { class: 'help', lang: 'de' }, `(${infinitive})`),
    ],
    options: shuffle([form, ...wrong]).map((f) => ({ label: h('span', { lang: 'de' }, f), right: f === form })),
    after: () => h('p', { class: 'word', lang: 'de' }, `${before} `, h('strong', {}, form), ` ${after}`),
    say: `${before} ${form} ${after}`,
  })));
}

// Sentences stay with the profile, so they are in the saved file for the teacher.
function renderAmzOwn(photoIndex = 0) {
  const photos = AMZ_ITEMS.filter((it) => it.photos).flatMap((it) => it.photos.map((p) => ({ it, p })));
  const { it, p } = photos[photoIndex % photos.length];
  const unit = Store.profile.units.amazonia || {};
  const sentences = unit.sentences || [];
  const field = h('textarea', { class: 'answer', rows: 2, maxlength: 200, lang: 'de', 'aria-label': STRINGS.amzOwnHelp.de });
  const save = () => {
    const text = field.value.trim();
    if (!text) return;
    Store.profile.units.amazonia = { ...unit, sentences: [...sentences, { src: p.src, word: fullGerman(it), text }] };
    Store.save();
    if (sentences.length + 1 >= 2) amzFinish('own');
    renderAmzOwn(photoIndex + 1);
  };
  amzExPage('amzOwn', Math.min(1, sentences.length / 3),
    h('p', { class: 'stack' }, pair('amzOwnHelp')),
    h('div', { class: 'card' }, h('div', { class: 'pic photos big' }, photo(p)), germanWord(it)),
    h('div', { class: 'starters', lang: 'de' }, AMZ_STARTERS.map((start) => h('button', {
      class: 'tile',
      onclick: () => { field.value = start.replace(' …', ' '); field.focus(); },
    }, start))),
    field,
    h('button', { class: 'primary wide stack', onclick: save }, pair('fixSave')),
    h('button', { class: 'choice stack center', onclick: () => renderAmzOwn(photoIndex + 1) }, pair('amzOtherPhoto')),
    sentences.length ? [
      h('h2', { class: 'stack' }, pair('amzOwnSaved')),
      h('ul', { class: 'wordlist own-sentences' }, sentences.map((s, i) => h('li', {},
        h('img', { src: s.src, alt: '' }),
        h('span', { lang: 'de' }, s.text),
        h('button', {
          class: 'round', 'aria-label': STRINGS.removeWord.de,
          onclick: () => {
            Store.profile.units.amazonia = { ...unit, sentences: sentences.filter((_, j) => j !== i) };
            Store.save();
            renderAmzOwn(photoIndex);
          },
        }, '🗑')))),
    ] : null);
}

// The unit: the text in the student's language for everyone, then three rounds of
// going deeper. The German text opens round 2, once the words are known.
// Screens of app.js are wrapped, as that file loads after this one.
const AMZ_SECTIONS = [
  [null, [['amzRead', 'amzRead', () => renderAmzRead()]]],
  ['amzLevel1', [
    ['amzWords', 'amzWords', () => renderAmzWords()], ['memory', 'amzMemory', renderAmzMemory],
    ['sortArticle', 'amzSortArticle', renderAmzSortArticle], ['amzRepeat', 'amzRepeat', () => renderAmzRules()],
    ['sortClass', 'amzSortClass', renderAmzSortClass]]],
  ['amzLevel2', [
    ['amzText', 'amzText', () => renderAmzText()], ['amzMark', 'amzMark', () => renderAmzMark()],
    ['gap', 'amzGap', renderAmzGap], ['trueFalse', 'amzTrueFalse', renderAmzTrueFalse],
    ['opposites', 'amzOpposites', renderAmzOpposites], ['build', 'amzBuild', renderAmzBuild]]],
  ['amzLevel3', [['plural', 'amzPlural', renderAmzPlural], ['verbForm', 'amzVerbForm', renderAmzVerbForm], ['own', 'amzOwn', renderAmzOwn]]],
];
