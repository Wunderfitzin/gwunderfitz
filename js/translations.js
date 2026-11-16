// Draft translations, one language per block. Unreviewed: see README.
// `items`: per topic, separated by |, the topic title first, then its words and
// sentences in the order of content.js. `strings`: in the key order of i18n.js.
// tests/check.js counts the entries, so a missing one shows up there.
var TRANSLATIONS = {
  si: {
    items: {
      hallo: 'ආචාර කිරීම|ආයුබෝවන් (ගෞරවයෙන්)|හායි|සුබ උදෑසනක්|ගිහින් එන්නම්|බායි|ස්තූතියි|කරුණාකර|සමාවෙන්න|ඔව්|නැහැ|මගේ නම …|මට තේරෙන්නේ නැහැ.|මගේ නම සාරා.|ඔයාගේ නම මොකක්ද?|මට මේක තේරෙන්නේ නැහැ.',
      zahlen: 'අංක|එක|දෙක|තුන|හතර|පහ|හය|හත|අට|නවය|දහය|මේක ෆ්‍රෑන්ක් පහයි.|මට පොත් දෙකක් තියෙනවා.',
      schule: 'පාසලේදී|පාසල|ගුරුතුමිය|ගුරුතුමා|අභ්‍යාස පොත|පොත|පැන්සල|පාසල් බෑගය|පුටුව|විවේකය|ගෙදර වැඩ|උදේ කෙටි ආහාරය|ක්‍රීඩා ශාලාව|මේ මගේ අභ්‍යාස පොත.|මම පාසල් යනවා.|විවේකය කීයටද?',
      familie: 'පවුල|පවුල|අම්මා|තාත්තා|සහෝදරිය|සහෝදරයා|බබා|ආච්චි|සීයා|මේ මගේ අම්මා.|මට සහෝදරයෙක් ඉන්නවා.',
      essen: 'කෑම|පාන්|ඇපල්|වතුර|කිරි|චීස්|කුකුල් මස්|බිත්තරය|බත්|අර්තාපල්|චොකලට්|මම ඇපල් එකක් කනවා.|මම වතුර බොනවා.',
      unterwegs: 'ගමනේදී|දුම්රිය ස්ථානය|දුම්රිය|ට්‍රෑම් රථය|බස් රථය|බයිසිකලය|ප්‍රවේශ පත්‍රය|පාර|පදික වේදිකාව|ඖෂධ හල|රෝහල|දුම්රිය ස්ථානය කොහෙද?|මම බයිසිකලෙන් යනවා.|මට ප්‍රවේශ පත්‍රයක් ඕනේ.',
    },
    strings: 'ඔබේ භාෂාව තෝරන්න|ඔබ කවුද?|ඔබේ සතා තෝරන්න|අලුත්|අද ඉගෙන ගන්න|අදට හැම දෙයක්ම ඉවරයි|දිගටම පුහුණු වෙන්න|මාතෘකා|පුහුණු වෙන්න|ඉගෙනගත් වචන සහ වාක්‍ය|අලුත්|අහන්න. නිවැරදි මොකක්ද?|මේකේ තේරුම මොකක්ද?|මේක ජර්මන් භාෂාවෙන් කියන්නේ කොහොමද?|der, die ද das ද?|වචනය ලියන්න.|වාක්‍යය හදන්න.|පරීක්ෂා කරන්න|ඊළඟ|නිවැරදියි!|තවම නැහැ. නිවැරදි පිළිතුර:|හොඳට කළා!|නිවැරදි|මුලට|ආපසු|සැකසුම්|භාෂාව|ගෙදර සහ පාසලේ|ඔබේ ගොනුව සුරකින්න. අනෙක් උපාංගයේ එය විවෘත කරන්න.|ප්‍රගතිය සුරකින්න|ප්‍රගතිය විවෘත කරන්න|මෙම ගොනුව ගැළපෙන්නේ නැහැ.|පැතිකඩ මකන්න|ඇත්තටම මකන්නද? ඔබේ ප්‍රගතිය නැති වෙනවා.|මෙම උපාංගයේ ජර්මන් හඬක් නැහැ.|අහන්න|හෙමින් අහන්න|පරිවර්තනය නිවැරදි කරන්න|නිවැරදි පරිවර්තනය ලියන්න.|සුරකින්න|අවලංගු කරන්න|තවම පරිවර්තනයක් නැහැ. උදව් කරන්න!',
  },
  ckb: {
    items: {
      hallo: 'سڵاو و چاک‌وچۆنی|سڵاو (بە ڕێزەوە)|سڵاو|بەیانی باش|خوات لەگەڵ|خوا حافیز|سوپاس|تکایە|ببورە|بەڵێ|نەخێر|ناوم …یە|تێناگەم.|ناوم سارایە.|ناوت چییە؟|لەمە تێناگەم.',
      zahlen: 'ژمارەکان|یەک|دوو|سێ|چوار|پێنج|شەش|حەوت|هەشت|نۆ|دە|ئەمە پێنج فرانکە.|دوو کتێبم هەیە.',
      schule: 'لە قوتابخانە|قوتابخانە|مامۆستا (ژن)|مامۆستا (پیاو)|دەفتەر|کتێب|قەڵەم|جانتای قوتابخانە|کورسی|پشوو|ئەرکی ماڵەوە|خواردنی سووکی بەیانی|هۆڵی وەرزش|ئەمە دەفتەرەکەی منە.|دەچمە قوتابخانە.|پشوو کەیە؟',
      familie: 'خێزان|خێزان|دایک|باوک|خوشک|برا|منداڵی ساوا|داپیر|باپیر|ئەمە دایکمە.|برایەکم هەیە.',
      essen: 'خواردن|نان|سێو|ئاو|شیر|پەنیر|مریشک|هێلکە|برنج|پەتاتە|شوکولاتە|سێوێک دەخۆم.|ئاو دەخۆمەوە.',
      unterwegs: 'لە ڕێگادا|وێستگەی شەمەندەفەر|شەمەندەفەر|ترام|پاس|پاسکیل|بلیت|شەقام|پیادەڕەو|دەرمانخانە|نەخۆشخانە|وێستگەی شەمەندەفەر لە کوێیە؟|بە پاسکیل دەڕۆم.|پێویستم بە بلیتێکە.',
    },
    strings: 'زمانەکەت هەڵبژێرە|تۆ کێیت؟|ئاژەڵەکەت هەڵبژێرە|نوێ|ئەمڕۆ فێربە|ئەمڕۆ هەموو شتێک تەواو بوو|بەردەوام بە لە ڕاهێنان|بابەتەکان|ڕاهێنان بکە|وشە و ڕستەی فێربوو|نوێ|گوێ بگرە. کامیان ڕاستە؟|ئەمە واتای چییە؟|ئەمە بە ئەڵمانی چۆن دەوترێت؟|der، die یان das؟|وشەکە بنووسە.|ڕستەکە دروست بکە.|پشکنین|دواتر|ڕاستە!|هێشتا نا. وەڵامی ڕاست:|دەستخۆش!|ڕاست|بۆ سەرەتا|گەڕانەوە|ڕێکخستنەکان|زمان|لە ماڵەوە و لە قوتابخانە|فایلەکەت پاشەکەوت بکە. لە ئامێرەکەی تر بیکەرەوە.|پێشکەوتن پاشەکەوت بکە|پێشکەوتن بار بکە|ئەم فایلە گونجاو نییە.|سڕینەوەی پرۆفایل|بەڕاستی بیسڕیتەوە؟ پێشکەوتنەکەت لەدەست دەچێت.|ئەم ئامێرە دەنگی ئەڵمانی نییە.|گوێ بگرە|بە هێواشی گوێ بگرە|ڕاستکردنەوەی وەرگێڕان|وەرگێڕانی ڕاست بنووسە.|پاشەکەوت|هەڵوەشاندنەوە|هێشتا وەرگێڕان نییە. یارمەتیمان بدە!',
  },
  prs: {
    items: {
      hallo: 'سلام و احوالپرسی|سلام|سلام دوست|صبح بخیر|خدا حافظ|خدا نگهدار|تشکر|لطفاً|ببخشید|بلی|نخیر|نام من … است|نمی‌فهمم.|نام من سارا است.|نام تو چیست؟|این را نمی‌فهمم.',
      zahlen: 'اعداد|یک|دو|سه|چهار|پنج|شش|هفت|هشت|نه|ده|این پنج فرانک قیمت دارد.|من دو کتاب دارم.',
      schule: 'در مکتب|مکتب|معلم زن|معلم مرد|کتابچه|کتاب|پنسل|بکس مکتب|چوکی|تفریح|کارخانگی|میان‌وعدهٔ صبح|سالون ورزش|این کتابچهٔ من است.|من به مکتب می‌روم.|تفریح چه وقت است؟',
      familie: 'فامیل|فامیل|مادر|پدر|خواهر|برادر|نوزاد|مادرکلان|پدرکلان|این مادر من است.|من یک برادر دارم.',
      essen: 'غذا|نان|سیب|آب|شیر|پنیر|مرغ|تخم مرغ|برنج|کچالو|چاکلیت|من یک سیب می‌خورم.|من آب می‌نوشم.',
      unterwegs: 'در راه|ایستگاه قطار|قطار|تراموا|بس|بایسکل|تکت|سرک|پیاده‌رو|دواخانه|شفاخانه|ایستگاه قطار کجاست؟|من با بایسکل می‌روم.|من به یک تکت ضرورت دارم.',
    },
    strings: 'زبان خود را انتخاب کن|تو کی هستی؟|حیوان خود را انتخاب کن|جدید|امروز بیاموز|برای امروز همه چیز تمام شد|به تمرین ادامه بده|موضوعات|تمرین کن|کلمات و جملات آموخته‌شده|جدید|گوش کن. کدام درست است؟|این چه معنی دارد؟|این را به آلمانی چه می‌گویند؟|der، die یا das؟|کلمه را بنویس.|جمله را بساز.|بررسی کن|بعدی|درست است!|هنوز نه. جواب درست:|آفرین!|درست|به شروع|برگشت|تنظیمات|زبان|در خانه و در مکتب|فایل خود را ذخیره کن. آن را در دستگاه دیگر باز کن.|ذخیرهٔ پیشرفت|بارگذاری پیشرفت|این فایل مناسب نیست.|حذف پروفایل|واقعاً حذف شود؟ پیشرفت تو از بین می‌رود.|این دستگاه صدای آلمانی ندارد.|گوش کن|آهسته گوش کن|اصلاح ترجمه|ترجمهٔ درست را بنویس.|ذخیره|لغو|هنوز ترجمه‌ای نیست. کمک کن!',
  },
  ps: {
    items: {
      hallo: 'سلام او احوال پرسي|سلام|سلام ملګریه|سهار مو پخیر|د خدای په امان|خدای پامان|مننه|مهرباني وکړئ|بښنه غواړم|هو|نه|زما نوم … دی|زه نه پوهېږم.|زما نوم سارا دی.|ستا نوم څه دی؟|زه په دې نه پوهېږم.',
      zahlen: 'شمېرې|یو|دوه|درې|څلور|پنځه|شپږ|اوه|اته|نهه|لس|دا پنځه فرانکه دی.|زه دوه کتابونه لرم.',
      schule: 'په ښوونځي کې|ښوونځی|ښوونکې|ښوونکی|کتابچه|کتاب|پنسل|د ښوونځي بکس|چوکۍ|تفریح|کورنی کار|د سهار سبک خواړه|د ورزش تالار|دا زما کتابچه ده.|زه ښوونځي ته ځم.|تفریح کله ده؟',
      familie: 'کورنۍ|کورنۍ|مور|پلار|خور|ورور|ماشوم|انا|نیکه|دا زما مور ده.|زه یو ورور لرم.',
      essen: 'خواړه|ډوډۍ|مڼه|اوبه|شیدې|پنیر|چرګ|هګۍ|وریجې|کچالو|چاکلیټ|زه یوه مڼه خورم.|زه اوبه څښم.',
      unterwegs: 'په لاره کې|د اورګاډي تمځای|اورګاډی|ټرام|بس|بایسکل|ټکټ|سړک|پیاده رو|درملتون|روغتون|د اورګاډي تمځای چېرته دی؟|زه په بایسکل ځم.|زه یو ټکټ ته اړتیا لرم.',
    },
    strings: 'خپله ژبه وټاکه|ته څوک یې؟|خپل ژوی وټاکه|نوی|نن زده کړه|د نن ورځې لپاره هر څه بشپړ شول|تمرین ته دوام ورکړه|موضوعګانې|تمرین وکړه|زده شوي کلمې او جملې|نوی|غوږ ونیسه. کوم یو سم دی؟|دا څه معنی لري؟|دا په الماني څنګه ویل کېږي؟|der، die که das؟|کلمه ولیکه.|جمله جوړه کړه.|وګوره|بل|سم دی!|لا نه. سم ځواب:|ډېر ښه!|سم|پیل ته|شاته|تنظیمات|ژبه|په کور او ښوونځي کې|خپل فایل خوندي کړه. په بل وسیله یې پرانیزه.|پرمختګ خوندي کړه|پرمختګ پورته کړه|دا فایل مناسب نه دی.|پروفایل ړنګ کړه|په رښتیا ړنګ شي؟ ستا پرمختګ به له منځه ولاړ شي.|پر دې وسیله الماني غږ نشته.|غوږ ونیسه|ورو غوږ ونیسه|ژباړه سمه کړه|سمه ژباړه ولیکه.|خوندي کړه|لغوه کړه|لا ژباړه نشته. مرسته وکړه!',
  },
  om: {
    items: {
      hallo: 'Nagaa gaafachuu|Akkam|Nagaa|Akkam bultan|Nagaatti|Nagaan turaa|Galatoomaa|Maaloo|Dhiifama|Eeyyee|Lakki|Maqaan koo … dha|Hin hubadhu.|Maqaan koo Saaraa dha.|Maqaan kee eenyu?|Kana hin hubadhu.',
      zahlen: `Lakkoofsota|tokko|lama|sadii|afur|shan|ja'a|torba|saddeet|sagal|kudhan|Kun Firaankii shan baasa.|Kitaabota lama qaba.`,
      schule: 'Mana barumsaa keessatti|mana barumsaa|barsiistuu|barsiisaa|daftara|kitaaba|qalama|boorsaa mana barumsaa|teessoo|boqonnaa|hojii manaa|nyaata salphaa ganamaa|galma ispoortii|Kun daftara kooti.|Ani gara mana barumsaa deemaa jira.|Boqonnaan yoomi?',
      familie: `Maatii|maatii|haadha|abbaa|obboleettii|obboleessa|daa'ima|akkoo|akaakayyuu|Kun haadha kooti.|Obboleessa tokko qaba.`,
      essen: 'Nyaata|daabboo|appilii|bishaan|aannan|baaduu|foon lukkuu|hanqaaquu|ruuza|dinnicha|cokoleetii|Appilii nyaachaa jira.|Bishaan dhugaa jira.',
      unterwegs: 'Karaa irratti|buufata baaburaa|baabura|tiraamii|awtobisii|biskileeta|tikkeetii|karaa|karaa miilaa|mana qorichaa|hospitaala|Buufanni baaburaa eessa?|Biskileetaan deema.|Tikkeetii nan barbaada.',
    },
    strings: 'Afaan kee filadhu|Ati eenyu?|Bineensa kee filadhu|Haaraa|Har\'a baradhu|Har\'aaf hundi xumurameera|Shaakala itti fufi|Mata-dureewwan|Shaakali|jechootaa fi himoota baratame|Haaraa|Dhaggeeffadhu. Kam sirrii dha?|Kun maal jechuu dha?|Kana Afaan Jarmaniitiin akkamitti jedhu?|der, die moo das?|Jecha barreessi.|Hima ijaari.|Mirkaneessi|Itti aanu|Sirrii dha!|Ammallee miti. Deebiin sirriin:|Baay\'ee gaarii!|sirrii|Gara jalqabaatti|Duubatti|Qindaa\'ina|Afaan|Manaa fi mana barumsaa|Faayila kee olkaa\'i. Meeshaa biraa irratti bani.|Guddina olkaa\'i|Guddina fe\'i|Faayilli kun hin ta\'u.|Piroofaayilii balleessi|Dhuguma ni balleessamaa? Guddinni kee ni bada.|Meeshaan kun sagalee Jarmanii hin qabu.|Dhaggeeffadhu|Suuta dhaggeeffadhu|Hiika sirreessi|Hiika sirrii barreessi.|Olkaa\'i|Dhiisi|Hiikni hin jiru. Nu gargaari!',
  },
  so: {
    items: {
      hallo: 'Is-salaamin|Salaan|Haye|Subax wanaagsan|Nabad gelyo|Nabad|Mahadsanid|Fadlan|Iga raalli ahow|Haa|Maya|Magacaygu waa …|Ma fahmin.|Magacaygu waa Sara.|Magacaa?|Tan ma fahmin.',
      zahlen: 'Tirooyin|kow|laba|saddex|afar|shan|lix|toddoba|siddeed|sagaal|toban|Tani waa shan faran.|Waxaan haystaa laba buug.',
      schule: 'Dugsiga|dugsi|macallimad|macallin|buug-qoraal|buug|qalin|boorsada dugsiga|kursi|nasasho|shaqada guriga|cunto fudud oo subaxnimo|qolka jimicsiga|Kani waa buug-qoraalkayga.|Waxaan aadayaa dugsiga.|Goormay tahay nasashadu?',
      familie: 'Qoys|qoys|hooyo|aabbe|walaasha|walaalka|ilmo yar|ayeeyo|awoowe|Tani waa hooyaday.|Waxaan leeyahay walaal.',
      essen: 'Cunto|rooti|tufaax|biyo|caano|farmaajo|digaag|ukun|bariis|baradho|shukulaato|Waxaan cunayaa tufaax.|Waxaan cabayaa biyo.',
      unterwegs: 'Socdaalka|saldhigga tareenka|tareen|taraam|bas|baaskiil|tigidh|waddo|marinka lugaynta|farmashiye|cisbitaal|Xagee buu ku yaal saldhigga tareenku?|Waxaan ku socdaa baaskiil.|Waxaan u baahanahay tigidh.',
    },
    strings: 'Dooro luqaddaada|Yaad tahay?|Dooro xayawaankaaga|Cusub|Maanta baro|Maanta wax walba waa la dhammeeyay|Sii wad tababarka|Mawduucyo|Tababar|erayo iyo weedho la bartay|Cusub|Dhageyso. Kee sax ah?|Tani maxay ka dhigan tahay?|Sidee Jarmal loogu yiraahdaa?|der, die mise das?|Qor erayga.|Dhis weedha.|Hubi|Xiga|Sax!|Weli maya. Jawaabta saxda ah:|Si fiican ayaad u samaysay!|sax|Bilowga|Dib u noqo|Dejinta|Luqad|Guriga iyo dugsiga|Kaydi faylkaaga. Ku fur qalabka kale.|Kaydi horumarka|Soo rar horumarka|Faylkani kuma habboona.|Tirtir astaanta|Ma hubtaa inaad tirtirto? Horumarkaagu wuu lumayaa.|Qalabkan ma laha cod Jarmal ah.|Dhageyso|Si tartiib ah u dhageyso|Sax turjumaadda|Qor turjumaadda saxda ah.|Kaydi|Jooji|Weli turjumaad ma jirto. Na caawi!',
  },
  fr: {
    items: {
      hallo: `Salutations|Bonjour (poli)|Salut|Bonjour (le matin)|Au revoir|Salut (pour partir)|Merci|S'il vous plaît|Pardon|Oui|Non|Je m'appelle …|Je ne comprends pas.|Je m'appelle Sara.|Comment tu t'appelles ?|Je ne comprends pas ça.`,
      zahlen: 'Nombres|un|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|Ça coûte cinq francs.|J\'ai deux livres.',
      schule: `À l'école|école|enseignante|enseignant|cahier|livre|crayon|sac d'école|chaise|récréation|devoirs|collation du matin|salle de gym|C'est mon cahier.|Je vais à l'école.|Quand est la récréation ?`,
      familie: `Famille|famille|mère|père|sœur|frère|bébé|grand-mère|grand-père|C'est ma mère.|J'ai un frère.`,
      essen: `Nourriture|pain|pomme|eau|lait|fromage|poulet|œuf|riz|pomme de terre|chocolat|Je mange une pomme.|Je bois de l'eau.`,
      unterwegs: 'En route|gare|train|tram|bus|vélo|billet|rue|trottoir|pharmacie|hôpital|Où est la gare ?|Je vais à vélo.|J\'ai besoin d\'un billet.',
    },
    strings: `Choisis ta langue|Qui es-tu ?|Choisis ton animal|Nouveau|Apprendre aujourd'hui|Tout est fait pour aujourd'hui|Continuer à s'entraîner|Thèmes|S'entraîner|mots et phrases appris|Nouveau|Écoute. Quelle est la bonne réponse ?|Qu'est-ce que cela veut dire ?|Comment dit-on cela en allemand ?|der, die ou das ?|Écris le mot.|Construis la phrase.|Vérifier|Suivant|Juste !|Pas encore. La bonne réponse est :|Bravo !|justes|Retour au début|Retour|Réglages|Langue|À la maison et à l'école|Enregistre ton fichier. Ouvre-le sur l'autre appareil.|Enregistrer les progrès|Charger les progrès|Ce fichier ne convient pas.|Supprimer le profil|Vraiment supprimer ? Tes progrès seront perdus.|Cet appareil n'a pas de voix allemande.|Écouter|Écouter lentement|Corriger la traduction|Écris la bonne traduction.|Enregistrer|Annuler|Pas encore de traduction. Aide-nous !`,
  },
  tr: {
    items: {
      hallo: 'Selamlaşma|Merhaba (kibar)|Selam|Günaydın|Hoşça kalın|Hoşça kal|Teşekkür ederim|Lütfen|Özür dilerim|Evet|Hayır|Benim adım …|Anlamıyorum.|Benim adım Sara.|Adın ne?|Bunu anlamıyorum.',
      zahlen: 'Sayılar|bir|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on|Bu beş frank.|İki kitabım var.',
      schule: 'Okulda|okul|kadın öğretmen|erkek öğretmen|defter|kitap|kalem|okul çantası|sandalye|teneffüs|ev ödevi|sabah atıştırmalığı|spor salonu|Bu benim defterim.|Okula gidiyorum.|Teneffüs ne zaman?',
      familie: 'Aile|aile|anne|baba|kız kardeş|erkek kardeş|bebek|büyükanne|büyükbaba|Bu benim annem.|Bir erkek kardeşim var.',
      essen: 'Yemek|ekmek|elma|su|süt|peynir|tavuk|yumurta|pirinç|patates|çikolata|Bir elma yiyorum.|Su içiyorum.',
      unterwegs: 'Yolda|tren istasyonu|tren|tramvay|otobüs|bisiklet|bilet|cadde|kaldırım|eczane|hastane|Tren istasyonu nerede?|Bisikletle gidiyorum.|Bir bilete ihtiyacım var.',
    },
    strings: 'Dilini seç|Sen kimsin?|Hayvanını seç|Yeni|Bugün öğren|Bugünlük her şey tamam|Çalışmaya devam et|Konular|Çalış|öğrenilen kelime ve cümle|Yeni|Dinle. Hangisi doğru?|Bu ne demek?|Bunu Almanca nasıl söyleriz?|der, die mi das mı?|Kelimeyi yaz.|Cümleyi kur.|Kontrol et|İleri|Doğru!|Henüz değil. Doğrusu:|Aferin!|doğru|Başa dön|Geri|Ayarlar|Dil|Evde ve okulda|Dosyanı kaydet. Diğer cihazda aç.|İlerlemeyi kaydet|İlerlemeyi yükle|Bu dosya uygun değil.|Profili sil|Gerçekten silinsin mi? İlerlemen kaybolacak.|Bu cihazda Almanca ses yok.|Dinle|Yavaş dinle|Çeviriyi düzelt|Doğru çeviriyi yaz.|Kaydet|İptal|Henüz çeviri yok. Yardım et!',
  },
};

if (typeof module !== 'undefined') module.exports = { TRANSLATIONS };
