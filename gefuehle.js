// Topic «Gut miteinander reden», modules 1–3: feelings, «ich fühle mich …», needs.
// Feelings are always said with «ich fühle mich», never with «ich bin»: we are not our
// feelings, we have them. See docs/konzept-gefuehle.md. Data and generators, no DOM.

// `level` 1: module 1, `level` 2: added in module 2.
const GF_FEELINGS = [
  { id: 'froh', de: 'froh', pic: '🙂', pleasant: true, level: 1 },
  { id: 'traurig', de: 'traurig', pic: '😢', level: 1 },
  { id: 'wuetend', de: 'wütend', pic: '😠', level: 1 },
  { id: 'aengstlich', de: 'ängstlich', pic: '😨', level: 1 },
  { id: 'muede', de: 'müde', pic: '🥱', level: 1 },
  { id: 'nervoes', de: 'nervös', pic: '😬', level: 1 },
  { id: 'ruhig', de: 'ruhig', pic: '😌', pleasant: true, level: 1 },
  { id: 'gluecklich', de: 'glücklich', pic: '😄', pleasant: true, level: 2 },
  { id: 'stolz', de: 'stolz', pic: '😊', pleasant: true, level: 2 },
  { id: 'erleichtert', de: 'erleichtert', pic: '😮‍💨', pleasant: true, level: 2 },
  { id: 'enttaeuscht', de: 'enttäuscht', pic: '😞', level: 2 },
  { id: 'einsam', de: 'einsam', pic: '😶', level: 2 },
  { id: 'verwirrt', de: 'verwirrt', pic: '😕', level: 2 },
];

// Words that sound like feelings after «ich fühle mich» but are thoughts about others.
const GF_THOUGHTS = ['ausgelacht', 'ignoriert', 'beleidigt', 'ausgeschlossen', 'vergessen'].map((de) => ({ de }));

const GF_NEEDS = [
  { id: 'ruhe', art: 'die', de: 'Ruhe', pic: '🔇' },
  { id: 'sicherheit', art: 'die', de: 'Sicherheit', pic: '🛡️' },
  { id: 'freundschaft', art: 'die', de: 'Freundschaft', pic: '🫂' },
  { id: 'respekt', art: 'der', de: 'Respekt', pic: '🫱' },
  { id: 'hilfe', art: 'die', de: 'Hilfe', pic: '🫴' },
  { id: 'spass', art: 'der', de: 'Spass', pic: '🎈' },
  { id: 'ordnung', art: 'die', de: 'Ordnung', pic: '🗂️' },
  { id: 'schlaf', art: 'der', de: 'Schlaf', pic: '😴' },
];

// `also`: needs that would fit too, so they are never wrong options.
const GF_SITUATIONS = [
  { de: 'Die anderen sind laut. Samir fühlt sich wütend.', who: 'Samir', feeling: 'wuetend', need: 'ruhe', also: ['schlaf'] },
  { de: 'Lina weiss nicht, was jetzt passiert. Sie fühlt sich nervös.', who: 'Lina', feeling: 'nervoes', need: 'sicherheit', also: ['hilfe', 'ordnung'] },
  { de: 'Mia ist in der Pause allein. Sie fühlt sich einsam.', who: 'Mia', feeling: 'einsam', need: 'freundschaft', also: ['spass'] },
  { de: 'Jemand lacht über Amir. Er fühlt sich traurig.', who: 'Amir', feeling: 'traurig', need: 'respekt', also: ['freundschaft'] },
  { de: 'Ali versteht die Aufgabe nicht. Er fühlt sich verwirrt.', who: 'Ali', feeling: 'verwirrt', need: 'hilfe', also: ['ruhe'] },
  { de: 'Lina hat schlecht geschlafen. Sie fühlt sich müde.', who: 'Lina', feeling: 'muede', need: 'schlaf', also: ['ruhe'] },
  { de: 'Samir findet sein Heft nicht. Alles liegt durcheinander. Er fühlt sich nervös.', who: 'Samir', feeling: 'nervoes', need: 'ordnung', also: ['hilfe', 'ruhe', 'sicherheit'] },
  { de: 'Heute gibt es nur Aufgaben und kein Spiel. Mia fühlt sich enttäuscht.', who: 'Mia', feeling: 'enttaeuscht', need: 'spass', also: ['freundschaft', 'ruhe'] },
];

const GF_NEED_OR_COMMAND = [
  { de: 'Ich brauche Ruhe.', basket: 'gfNeedWord' },
  { de: 'Mir ist Freundschaft wichtig.', basket: 'gfNeedWord' },
  { de: 'Ich brauche Hilfe.', basket: 'gfNeedWord' },
  { de: 'Mir ist Respekt wichtig.', basket: 'gfNeedWord' },
  { de: 'Sei sofort still!', basket: 'gfCommand' },
  { de: 'Du musst mit mir spielen!', basket: 'gfCommand' },
  { de: 'Mach die Aufgabe für mich!', basket: 'gfCommand' },
  { de: 'Hör auf zu lachen!', basket: 'gfCommand' },
];

const GF_RULE_KEYS = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];
const GF_RULES = {
  e1: { de: 'Alle Menschen haben Gefühle.' },
  e2: { de: 'Gefühle sind wie Lampen im Auto. Sie zeigen dir etwas.' },
  e3: { de: 'Fühlst du dich froh? Dann ist etwas gut für dich.' },
  e4: { de: 'Fühlst du dich traurig oder wütend? Dann fehlt dir etwas.' },
  e5: { de: 'Kein Gefühl ist falsch. Wichtig ist, was du mit dem Gefühl machst.' },
  e6: { de: 'So fragst du: Wie fühlst du dich?' },
  f1: { de: 'Du kannst sagen: Ich bin traurig. Oder: Ich fühle mich traurig. Beides ist richtig.' },
  f2: { de: 'Aber du bist nicht dein Gefühl. Du hast ein Gefühl. Es kommt und geht wieder.' },
  f3: { de: 'Darum sagen wir: Ich fühle mich …' },
  f4: { de: 'Es gibt angenehme Gefühle. Du hast sie, wenn es dir gut geht.' },
  f5: { de: 'Es gibt unangenehme Gefühle. Du hast sie, wenn dir etwas fehlt.' },
  f6: { de: 'Ein Gefühl kann schwach oder stark sein: ein bisschen müde, sehr müde.' },
  f7: { de: 'Achtung: Nach «Ich fühle mich» kommt ein Gefühl. «Ausgelacht» ist kein Gefühl, sondern ein Gedanke.' },
  b1: { de: 'Hinter jedem Gefühl steht ein Bedürfnis.' },
  b2: { de: 'Ein Bedürfnis ist etwas, das du zum Leben brauchst.' },
  b3: { de: 'Alle Menschen haben die gleichen Bedürfnisse.' },
  b4: { de: 'So sagst du es: Ich brauche Ruhe. Mir ist Respekt wichtig.' },
  b5: { de: 'Mit weil verbindest du Gefühl und Bedürfnis. Das Verb steht am Ende.' },
  b6: { de: 'Achtung: Ein Bedürfnis ist kein Befehl. Für ein Bedürfnis gibt es viele Wege.' },
};

const GF_UI_KEYS = ['gfCourse', 'gf1', 'gf2', 'gf3', 'gfHow', 'gfNeed', 'gfSort', 'gfPleasant', 'gfUnpleasant', 'gfFeeling', 'gfThought', 'gfNeedWord', 'gfCommand'];
Object.assign(STRINGS, {
  gfCourse: { de: 'Gut miteinander reden' }, gf1: { de: 'Gefühle zeigen uns etwas' }, gf2: { de: 'Gefühle genau sagen' },
  gf3: { de: 'Was brauche ich?' }, gfHow: { de: 'Wie fühlt sich die Person?' }, gfNeed: { de: 'Was braucht die Person?' },
  gfSort: { de: 'Wohin gehört das?' }, gfPleasant: { de: 'angenehm' }, gfUnpleasant: { de: 'unangenehm' },
  gfFeeling: { de: 'Gefühl' }, gfThought: { de: 'Gedanke' }, gfNeedWord: { de: 'Bedürfnis' }, gfCommand: { de: 'Befehl' },
});

// Drafts, unreviewed: see README. Order: 13 feelings, 5 thoughts, 8 needs, 8 situations,
// 8 need-or-command sentences, 19 rules (GF_RULE_KEYS), 13 texts (GF_UI_KEYS).
const GF_L1 = {
  en: `glad|sad|angry|afraid|tired|nervous|calm|happy|proud|relieved|disappointed|lonely|confused|laughed at|ignored|insulted|left out|forgotten|quiet|safety|friendship|respect|help|fun|order|sleep|The others are loud. Samir feels angry.|Lina does not know what will happen now. She feels nervous.|Mia is alone at break. She feels lonely.|Someone laughs at Amir. He feels sad.|Ali does not understand the task. He feels confused.|Lina slept badly. She feels tired.|Samir cannot find his notebook. Everything is messy. He feels nervous.|Today there are only tasks and no games. Mia feels disappointed.|I need quiet.|Friendship is important to me.|I need help.|Respect is important to me.|Be quiet right now!|You have to play with me!|Do the task for me!|Stop laughing!|All people have feelings.|Feelings are like the lights in a car. They show you something.|Do you feel glad? Then something is good for you.|Do you feel sad or angry? Then something is missing for you.|No feeling is wrong. What matters is what you do with the feeling.|This is how you ask: How do you feel?|You can say: Ich bin traurig. Or: Ich fühle mich traurig. Both are correct.|But you are not your feeling. You have a feeling. It comes and goes again.|That is why we say: Ich fühle mich … (I feel …)|There are pleasant feelings. You have them when you are well.|There are unpleasant feelings. You have them when something is missing.|A feeling can be weak or strong: a bit tired, very tired.|Careful: after «Ich fühle mich» comes a feeling. «Ausgelacht» (laughed at) is not a feeling but a thought.|Behind every feeling there is a need.|A need is something you need to live.|All people have the same needs.|This is how you say it: Ich brauche Ruhe (I need quiet). Mir ist Respekt wichtig (Respect is important to me).|With weil (because) you connect feeling and need. The verb goes at the end.|Careful: a need is not an order. There are many ways to meet a need.|Talking well together|Feelings show us something|Saying feelings exactly|What do I need?|How does the person feel?|What does the person need?|Where does this belong?|pleasant|unpleasant|feeling|thought|need|order`,
  fr: `content|triste|en colère|qui a peur|fatigué|nerveux|calme|heureux|fier|soulagé|déçu|seul|perdu, confus|moqué|ignoré|insulté|exclu|oublié|le calme|la sécurité|l'amitié|le respect|l'aide|le plaisir|l'ordre|le sommeil|Les autres font du bruit. Samir se sent en colère.|Lina ne sait pas ce qui va se passer. Elle se sent nerveuse.|Mia est seule à la récréation. Elle se sent seule.|Quelqu'un se moque d'Amir. Il se sent triste.|Ali ne comprend pas l'exercice. Il se sent perdu.|Lina a mal dormi. Elle se sent fatiguée.|Samir ne trouve pas son cahier. Tout est en désordre. Il se sent nerveux.|Aujourd'hui, il n'y a que des exercices et pas de jeux. Mia se sent déçue.|J'ai besoin de calme.|L'amitié est importante pour moi.|J'ai besoin d'aide.|Le respect est important pour moi.|Tais-toi tout de suite !|Tu dois jouer avec moi !|Fais l'exercice pour moi !|Arrête de rire !|Tous les êtres humains ont des sentiments.|Les sentiments sont comme les voyants d'une voiture. Ils te montrent quelque chose.|Tu te sens content ? Alors quelque chose est bon pour toi.|Tu te sens triste ou en colère ? Alors il te manque quelque chose.|Aucun sentiment n'est faux. Ce qui compte, c'est ce que tu fais avec ce sentiment.|Voici comment demander : Comment te sens-tu ?|Tu peux dire : Ich bin traurig. Ou : Ich fühle mich traurig. Les deux sont corrects.|Mais tu n'es pas ton sentiment. Tu as un sentiment. Il vient et repart.|C'est pourquoi nous disons : Ich fühle mich … (je me sens …)|Il y a des sentiments agréables. Tu les as quand tu vas bien.|Il y a des sentiments désagréables. Tu les as quand il te manque quelque chose.|Un sentiment peut être faible ou fort : un peu fatigué, très fatigué.|Attention : après « Ich fühle mich » vient un sentiment. « Ausgelacht » (moqué) n'est pas un sentiment, mais une pensée.|Derrière chaque sentiment, il y a un besoin.|Un besoin, c'est quelque chose dont tu as besoin pour vivre.|Tous les êtres humains ont les mêmes besoins.|Voici comment le dire : Ich brauche Ruhe (j'ai besoin de calme). Mir ist Respekt wichtig (le respect est important pour moi).|Avec weil (parce que), tu relies sentiment et besoin. Le verbe va à la fin.|Attention : un besoin n'est pas un ordre. Il y a beaucoup de façons de répondre à un besoin.|Bien parler ensemble|Les sentiments nous montrent quelque chose|Dire ses sentiments avec précision|De quoi ai-je besoin ?|Comment se sent la personne ?|De quoi la personne a-t-elle besoin ?|Où est-ce que ça va ?|agréable|désagréable|sentiment|pensée|besoin|ordre`,
  tr: `memnun|üzgün|öfkeli|korkmuş|yorgun|gergin|sakin|mutlu|gururlu|rahatlamış|hayal kırıklığına uğramış|yalnız|kafası karışık|alay edilmiş|görmezden gelinmiş|hakaret edilmiş|dışlanmış|unutulmuş|sessizlik|güvenlik|arkadaşlık|saygı|yardım|eğlence|düzen|uyku|Diğerleri gürültü yapıyor. Samir kendini öfkeli hissediyor.|Lina şimdi ne olacağını bilmiyor. Kendini gergin hissediyor.|Mia teneffüste yalnız. Kendini yalnız hissediyor.|Biri Amir'e gülüyor. Kendini üzgün hissediyor.|Ali ödevi anlamıyor. Kafası karışık hissediyor.|Lina kötü uyudu. Kendini yorgun hissediyor.|Samir defterini bulamıyor. Her şey dağınık. Kendini gergin hissediyor.|Bugün sadece ödev var, oyun yok. Mia hayal kırıklığı hissediyor.|Sessizliğe ihtiyacım var.|Arkadaşlık benim için önemli.|Yardıma ihtiyacım var.|Saygı benim için önemli.|Hemen sus!|Benimle oynamak zorundasın!|Ödevi benim için yap!|Gülmeyi bırak!|Bütün insanların duyguları vardır.|Duygular arabadaki uyarı lambaları gibidir. Sana bir şey gösterirler.|Kendini memnun mu hissediyorsun? O zaman bir şey senin için iyi.|Kendini üzgün veya öfkeli mi hissediyorsun? O zaman sana bir şey eksik.|Hiçbir duygu yanlış değildir. Önemli olan, duyguyla ne yaptığındır.|Böyle sorarsın: Nasıl hissediyorsun?|Şöyle diyebilirsin: Ich bin traurig. Ya da: Ich fühle mich traurig. İkisi de doğru.|Ama sen duygun değilsin. Bir duygun var. Gelir ve yine gider.|Bu yüzden şöyle deriz: Ich fühle mich … (kendimi … hissediyorum)|Hoş duygular vardır. İyi olduğunda onları hissedersin.|Hoş olmayan duygular vardır. Bir şey eksik olduğunda onları hissedersin.|Bir duygu zayıf veya güçlü olabilir: biraz yorgun, çok yorgun.|Dikkat: «Ich fühle mich»den sonra bir duygu gelir. «Ausgelacht» (alay edilmiş) bir duygu değil, bir düşüncedir.|Her duygunun arkasında bir ihtiyaç vardır.|İhtiyaç, yaşamak için gerekli olan bir şeydir.|Bütün insanların ihtiyaçları aynıdır.|Böyle söylersin: Ich brauche Ruhe (sessizliğe ihtiyacım var). Mir ist Respekt wichtig (saygı benim için önemli).|weil (çünkü) ile duyguyu ve ihtiyacı bağlarsın. Fiil sona gelir.|Dikkat: İhtiyaç bir emir değildir. Bir ihtiyacı karşılamanın birçok yolu vardır.|Birlikte iyi konuşmak|Duygular bize bir şey gösterir|Duyguları tam söylemek|Neye ihtiyacım var?|Kişi nasıl hissediyor?|Kişinin neye ihtiyacı var?|Bu nereye ait?|hoş|hoş olmayan|duygu|düşünce|ihtiyaç|emir`,
  ar: `مسرور|حزين|غاضب|خائف|متعب|متوتر|هادئ|سعيد|فخور|مرتاح|خائب الأمل|وحيد|حائر|مُستهزأ به|مُتجاهَل|مُهان|مُستبعَد|منسي|الهدوء|الأمان|الصداقة|الاحترام|المساعدة|المرح|النظام|النوم|الآخرون يصدرون ضجيجا. سمير يشعر بالغضب.|لينا لا تعرف ماذا سيحدث الآن. تشعر بالتوتر.|ميا وحدها في الاستراحة. تشعر بالوحدة.|شخص ما يضحك على أمير. يشعر بالحزن.|علي لا يفهم المهمة. يشعر بالحيرة.|لينا نامت نوما سيئا. تشعر بالتعب.|سمير لا يجد دفتره. كل شيء في فوضى. يشعر بالتوتر.|اليوم توجد مهام فقط ولا ألعاب. ميا تشعر بخيبة الأمل.|أحتاج إلى الهدوء.|الصداقة مهمة بالنسبة لي.|أحتاج إلى المساعدة.|الاحترام مهم بالنسبة لي.|اسكت فورا!|يجب أن تلعب معي!|حلّ المهمة بدلا مني!|توقف عن الضحك!|كل الناس لديهم مشاعر.|المشاعر مثل الأضواء في السيارة. إنها تُظهر لك شيئا.|هل تشعر بالسرور؟ إذن هناك شيء جيد لك.|هل تشعر بالحزن أو الغضب؟ إذن ينقصك شيء.|لا يوجد شعور خاطئ. المهم هو ما تفعله بالشعور.|هكذا تسأل: كيف تشعر؟|يمكنك أن تقول: Ich bin traurig. أو: Ich fühle mich traurig. كلاهما صحيح.|لكنك لست شعورك. لديك شعور. يأتي ثم يذهب.|لذلك نقول: Ich fühle mich … (أشعر بـ …)|هناك مشاعر لطيفة. تشعر بها عندما تكون بخير.|هناك مشاعر مزعجة. تشعر بها عندما ينقصك شيء.|يمكن أن يكون الشعور ضعيفا أو قويا: متعب قليلا، متعب جدا.|انتبه: بعد «Ich fühle mich» يأتي شعور. «Ausgelacht» (مُستهزأ به) ليس شعورا بل فكرة.|وراء كل شعور حاجة.|الحاجة هي شيء تحتاجه لتعيش.|كل الناس لديهم نفس الحاجات.|هكذا تقولها: Ich brauche Ruhe (أحتاج إلى الهدوء). Mir ist Respekt wichtig (الاحترام مهم بالنسبة لي).|بكلمة weil (لأن) تربط الشعور بالحاجة. الفعل يأتي في النهاية.|انتبه: الحاجة ليست أمرا. هناك طرق كثيرة لتلبية الحاجة.|نتحدث معا بشكل جيد|المشاعر تُظهر لنا شيئا|التعبير عن المشاعر بدقة|ماذا أحتاج؟|كيف يشعر الشخص؟|ماذا يحتاج الشخص؟|أين مكان هذا؟|لطيف|مزعج|شعور|فكرة|حاجة|أمر`,
  prs: `خوش|غمگین|عصبانی|ترسیده|خسته|بی‌قرار|آرام|خوشحال|مفتخر|آسوده|ناامید|تنها|سردرگم|مسخره‌شده|نادیده‌گرفته‌شده|توهین‌شده|کنارگذاشته‌شده|فراموش‌شده|آرامی|امنیت|دوستی|احترام|کمک|خوشی و تفریح|نظم|خواب|دیگران سر و صدا می‌کنند. سمیر احساس عصبانیت می‌کند.|لینا نمی‌داند حالا چه می‌شود. او احساس بی‌قراری می‌کند.|میا در تفریح تنهاست. او احساس تنهایی می‌کند.|کسی به امیر می‌خندد. او احساس غم می‌کند.|علی وظیفه را نمی‌فهمد. او احساس سردرگمی می‌کند.|لینا بد خوابیده است. او احساس خستگی می‌کند.|سمیر کتابچه‌اش را پیدا نمی‌کند. همه چیز درهم است. او احساس بی‌قراری می‌کند.|امروز فقط وظیفه است و بازی نیست. میا احساس ناامیدی می‌کند.|من به آرامی ضرورت دارم.|دوستی برای من مهم است.|من به کمک ضرورت دارم.|احترام برای من مهم است.|همین حالا چپ شو!|باید با من بازی کنی!|وظیفه را به جای من انجام بده!|دیگر نخند!|همهٔ انسان‌ها احساسات دارند.|احساسات مانند چراغ‌های موتر هستند. آن‌ها چیزی را به تو نشان می‌دهند.|آیا احساس خوشی می‌کنی؟ پس چیزی برای تو خوب است.|آیا احساس غم یا عصبانیت می‌کنی؟ پس چیزی کم داری.|هیچ احساسی نادرست نیست. مهم این است که با احساس خود چه می‌کنی.|این‌طور می‌پرسی: چه احساسی داری؟|می‌توانی بگویی: Ich bin traurig. یا: Ich fühle mich traurig. هر دو درست است.|اما تو احساس خود نیستی. تو یک احساس داری. می‌آید و دوباره می‌رود.|بنابراین می‌گوییم: Ich fühle mich … (احساس … می‌کنم)|احساسات خوشایند وجود دارند. وقتی حالت خوب است آن‌ها را داری.|احساسات ناخوشایند وجود دارند. وقتی چیزی کم داری آن‌ها را داری.|یک احساس می‌تواند ضعیف یا قوی باشد: کمی خسته، خیلی خسته.|توجه: بعد از «Ich fühle mich» یک احساس می‌آید. «Ausgelacht» (مسخره‌شده) احساس نیست، بلکه یک فکر است.|پشت هر احساس یک نیاز است.|نیاز چیزی است که برای زندگی به آن ضرورت داری.|همهٔ انسان‌ها نیازهای یکسان دارند.|این‌طور می‌گویی: Ich brauche Ruhe (به آرامی ضرورت دارم). Mir ist Respekt wichtig (احترام برایم مهم است).|با weil (چون) احساس و نیاز را وصل می‌کنی. فعل در آخر می‌آید.|توجه: نیاز یک امر نیست. برای یک نیاز راه‌های زیادی وجود دارد.|خوب با هم صحبت کردن|احساسات چیزی را به ما نشان می‌دهند|احساسات را دقیق گفتن|به چه ضرورت دارم؟|این شخص چه احساسی دارد؟|این شخص به چه ضرورت دارد؟|این به کجا تعلق دارد؟|خوشایند|ناخوشایند|احساس|فکر|نیاز|امر`,
  ps: `خوښ|خپه|غوسه|وېرېدلی|ستړی|اندېښمن|ارام|ډېر خوښ|ویاړمن|ارام شوی|نهیلی|یوازې|حیران|ملنډې پرې وهل شوې|له پامه غورځول شوی|سپکاوی پرې شوی|ګوښه شوی|هېر شوی|ارامي|امنیت|ملګرتیا|درناوی|مرسته|خوښي او ساعتېري|نظم|خوب|نور شور کوي. سمیر د غوسې احساس کوي.|لینا نه پوهېږي چې اوس به څه کېږي. هغه د اندېښنې احساس کوي.|میا په تفریح کې یوازې ده. هغه د یوازیتوب احساس کوي.|یو څوک پر امیر خاندي. هغه د خپګان احساس کوي.|علي په دنده نه پوهېږي. هغه د حیرانتیا احساس کوي.|لینا بد ویده شوې ده. هغه د ستړیا احساس کوي.|سمیر خپله کتابچه نه پیدا کوي. هر څه ګډوډ دي. هغه د اندېښنې احساس کوي.|نن یوازې دندې دي او لوبې نشته. میا د نهیلۍ احساس کوي.|زه ارامۍ ته اړتیا لرم.|ملګرتیا راته مهمه ده.|زه مرستې ته اړتیا لرم.|درناوی راته مهم دی.|سمدستي چوپ شه!|ته باید له ما سره لوبې وکړې!|دنده زما پر ځای وکړه!|خندا بس کړه!|ټول انسانان احساسات لري.|احساسات د موټر د څراغونو په څېر دي. تاته یو شی ښيي.|ایا د خوښۍ احساس کوې؟ نو یو شی ستا لپاره ښه دی.|ایا د خپګان یا غوسې احساس کوې؟ نو یو شی درته کم دی.|هېڅ احساس غلط نه دی. مهمه دا ده چې له احساس سره څه کوې.|داسې پوښتنه کوې: څه احساس کوې؟|ته ویلی شې: Ich bin traurig. یا: Ich fühle mich traurig. دواړه سم دي.|خو ته خپل احساس نه یې. ته یو احساس لرې. راځي او بیا ځي.|نو موږ وایو: Ich fühle mich … (د … احساس کوم)|خوندور احساسات شته. کله چې ښه یې، هغه لرې.|ناخوښه احساسات شته. کله چې یو شی درته کم وي، هغه لرې.|یو احساس کمزوری یا قوي کېدای شي: لږ ستړی، ډېر ستړی.|پام: له «Ich fühle mich» وروسته احساس راځي. «Ausgelacht» (ملنډې پرې وهل شوې) احساس نه دی، بلکې فکر دی.|د هر احساس تر شا یوه اړتیا ده.|اړتیا هغه شی دی چې د ژوند لپاره ورته اړتیا لرې.|ټول انسانان ورته اړتیاوې لري.|داسې یې وایې: Ich brauche Ruhe (ارامۍ ته اړتیا لرم). Mir ist Respekt wichtig (درناوی راته مهم دی).|په weil (ځکه چې) احساس او اړتیا سره نښلوې. فعل په پای کې راځي.|پام: اړتیا امر نه دی. د یوې اړتیا لپاره ډېرې لارې شته.|یو له بل سره ښې خبرې|احساسات موږ ته یو شی ښيي|احساسات په دقت ویل|زه څه ته اړتیا لرم؟|دا کس څه احساس کوي؟|دا کس څه ته اړتیا لري؟|دا چېرې ځای لري؟|خوندور|ناخوښه|احساس|فکر|اړتیا|امر`,
  ckb: `دڵخۆش|خەمبار|توڕە|ترساو|ماندوو|دڵەڕاوکێ|ئارام|بەختەوەر|سەربەرز|ئاسوودە|نائومێد|تەنیا|سەرلێشێواو|گاڵتەپێکراو|پشتگوێخراو|سووکایەتیپێکراو|دوورخراوە|لەبیرکراو|ئارامی|ئاسایش|هاوڕێیەتی|ڕێز|یارمەتی|خۆشی|ڕێکوپێکی|خەو|ئەوانی تر دەنگەدەنگ دەکەن. سەمیر هەست بە توڕەیی دەکات.|لینا نازانێت ئێستا چی ڕوو دەدات. هەست بە دڵەڕاوکێ دەکات.|میا لە پشوودا تەنیایە. هەست بە تەنیایی دەکات.|کەسێک بە ئەمیر پێدەکەنێت. هەست بە خەمباری دەکات.|عەلی لە ئەرکەکە تێناگات. هەست بە سەرلێشێواوی دەکات.|لینا خراپ خەوتووە. هەست بە ماندوویی دەکات.|سەمیر دەفتەرەکەی نادۆزێتەوە. هەموو شتێک تێکچووە. هەست بە دڵەڕاوکێ دەکات.|ئەمڕۆ تەنها ئەرک هەیە و یاری نییە. میا هەست بە نائومێدی دەکات.|پێویستم بە ئارامییە.|هاوڕێیەتی بۆ من گرنگە.|پێویستم بە یارمەتییە.|ڕێز بۆ من گرنگە.|یەکسەر بێدەنگ بە!|دەبێت لەگەڵ من یاری بکەیت!|ئەرکەکە لە جیاتی من بکە!|واز لە پێکەنین بهێنە!|هەموو مرۆڤەکان هەستیان هەیە.|هەستەکان وەک چراکانی ئۆتۆمبێل وان. شتێکت پیشان دەدەن.|هەست بە دڵخۆشی دەکەیت؟ ئەوا شتێک بۆ تۆ باشە.|هەست بە خەمباری یان توڕەیی دەکەیت؟ ئەوا شتێکت کەمە.|هیچ هەستێک هەڵە نییە. گرنگ ئەوەیە چی لەگەڵ هەستەکەت دەکەیت.|بەم شێوەیە دەپرسیت: هەست بە چی دەکەیت؟|دەتوانیت بڵێیت: Ich bin traurig. یان: Ich fühle mich traurig. هەردووکیان ڕاستن.|بەڵام تۆ هەستەکەت نیت. تۆ هەستێکت هەیە. دێت و دەڕوات.|بۆیە دەڵێین: Ich fühle mich … (هەست بە … دەکەم)|هەستی خۆش هەن. کاتێک باشیت هەستیان پێدەکەیت.|هەستی ناخۆش هەن. کاتێک شتێکت کەمە هەستیان پێدەکەیت.|هەستێک دەتوانێت لاواز یان بەهێز بێت: کەمێک ماندوو، زۆر ماندوو.|ئاگاداربە: دوای «Ich fühle mich» هەستێک دێت. «Ausgelacht» (گاڵتەپێکراو) هەست نییە، بەڵکو بیرۆکەیە.|لە پشت هەموو هەستێکەوە پێویستییەک هەیە.|پێویستی شتێکە کە بۆ ژیان پێویستتە.|هەموو مرۆڤەکان هەمان پێویستییان هەیە.|بەم شێوەیە دەیڵێیت: Ich brauche Ruhe (پێویستم بە ئارامییە). Mir ist Respekt wichtig (ڕێز بۆ من گرنگە).|بە weil (چونکە) هەست و پێویستی پێکەوە دەبەستیت. کردار دەچێتە کۆتایی.|ئاگاداربە: پێویستی فەرمان نییە. بۆ پێویستییەک ڕێگای زۆر هەیە.|پێکەوە باش قسە کردن|هەستەکان شتێکمان پیشان دەدەن|هەستەکان بە وردی گوتن|پێویستم بە چییە؟|ئەم کەسە هەست بە چی دەکات؟|ئەم کەسە پێویستی بە چییە؟|ئەمە سەر بە کوێیە؟|خۆش|ناخۆش|هەست|بیرۆکە|پێویستی|فەرمان`,
  om: `gammadaa|gaddaa|aaraa|sodaataa|dadhabaa|yaaddaa'aa|tasgabbaa'aa|baay'ee gammadaa|boonaa|furamaa|abdii kutataa|kophaa ta'e|burjaaja'aa|kolfamee|tuffatamee|arrabsamee|baafamee|irraanfatamee|tasgabbii|nageenya|hiriyummaa|kabaja|gargaarsa|bashannana|sirna|hirriba|Warri kaan sagalee guddaa dhageessisu. Samiir aariin itti dhaga'ama.|Liinaan amma maaltu akka ta'u hin beektu. Yaaddoon itti dhaga'ama.|Miyaan boqonnaa irratti kophaa ishee jirti. Kophummaan itti dhaga'ama.|Namni tokko Amiir irratti kolfa. Gaddi itti dhaga'ama.|Aliin hojii sana hin hubatu. Burjaajiin itti dhaga'ama.|Liinaan gaarii hin rafne. Dadhabbiin itti dhaga'ama.|Samiir kitaaba isaa hin argatu. Wanti hundi walitti makame. Yaaddoon itti dhaga'ama.|Har'a hojii qofatu jira, taphni hin jiru. Miyaan abdii kutachuun itti dhaga'ama.|Tasgabbiin na barbaachisa.|Hiriyummaan naaf barbaachisaa dha.|Gargaarsi na barbaachisa.|Kabajni naaf barbaachisaa dha.|Amma callisi!|Ana wajjin taphachuu qabda!|Hojii kana anaaf hojjedhu!|Kolfuu dhiisi!|Namoonni hundi miira qabu.|Miirri akka ibsaa konkolaataa ti. Waan tokko si agarsiisa.|Gammachuun sitti dhaga'amaa? Yoos wanti tokko siif gaarii dha.|Gaddi ykn aariin sitti dhaga'amaa? Yoos wanti tokko si hir'ate.|Miirri tokkollee dogoggora miti. Kan barbaachisu waan miira sana wajjin gootu dha.|Akkana gaafatta: Maaltu sitti dhaga'ama?|Akkas jechuu dandeessa: Ich bin traurig. Ykn: Ich fühle mich traurig. Lamaanuu sirrii dha.|Garuu ati miira kee miti. Ati miira qabda. Ni dhufa, deebi'ee ni deema.|Kanaafuu ni jenna: Ich fühle mich … (… natti dhaga'ama)|Miirri gammachiisaan ni jira. Yeroo gaarii taatu isaan qabda.|Miirri hin gammachiisne ni jira. Yeroo wanti tokko si hir'atu isaan qabda.|Miirri tokko laafaa ykn cimaa ta'uu danda'a: xiqqoo dadhabaa, baay'ee dadhabaa.|Of eeggadhu: «Ich fühle mich» booda miirri dhufa. «Ausgelacht» (kolfamee) miira miti, yaada dha.|Miira hunda duuba fedhiin jira.|Fedhiin waan jiraachuuf si barbaachisu dha.|Namoonni hundi fedhii wal fakkaatu qabu.|Akkana jetta: Ich brauche Ruhe (tasgabbiin na barbaachisa). Mir ist Respekt wichtig (kabajni naaf barbaachisaa dha).|weil (sababni isaas) tiin miiraa fi fedhii walitti hidhta. Gochimni dhuma irratti dhufa.|Of eeggadhu: fedhiin ajaja miti. Fedhii tokkoof karaan baay'een jira.|Wal wajjin gaarii dubbachuu|Miirri waan tokko nu agarsiisa|Miira sirriitti himuu|Maaltu na barbaachisa?|Namichatti maaltu dhaga'ama?|Namicha maaltu barbaachisa?|Kun eessatti ramadama?|gammachiisaa|kan hin gammachiisne|miira|yaada|fedhii|ajaja`,
  ti: `ሕጉስ|ጉሁይ|ሕሩቕ|ፈራሕ|ድኹም|ሻቕሎት ዘለዎ|ህዱእ|ብጣዕሚ ሕጉስ|ኩሩዕ|ዝተዛናገዐ|ተስፋ ዝቖረጸ|በይኑ|ዝተደናገረ|ዝተሰሓቐሉ|ዕሽሽ ዝተባህለ|ዝተጸርፈ|ዝተገለለ|ዝተረስዐ|ህድኣት|ድሕንነት|ዕርክነት|ኽብሪ|ሓገዝ|ሓጎስን ጸወታን|ስርዓት|ድቃስ|እቶም ካልኦት ይጫውጩ። ሳሚር ሕርቃን ይስምዖ።|ሊና ሕጂ እንታይ ከም ዝኸውን ኣይትፈልጥን። ሻቕሎት ይስምዓ።|ሚያ ኣብ ዕረፍቲ በይና እያ። ብሕትውና ይስምዓ።|ሓደ ሰብ ኣብ ልዕሊ ኣሚር ይስሕቕ። ጓሂ ይስምዖ።|ዓሊ እቲ ዕዮ ኣይርደኦን። ምድንጋር ይስምዖ።|ሊና ብሕማቕ ደቂሳ። ድኻም ይስምዓ።|ሳሚር ጥራዙ ኣይረኽቦን። ኩሉ ተዘራሪጉ እዩ። ሻቕሎት ይስምዖ።|ሎሚ ዕዮ ጥራይ እዩ ዘሎ፡ ጸወታ የለን። ሚያ ተስፋ ምቑራጽ ይስምዓ።|ህድኣት የድልየኒ።|ዕርክነት ንዓይ ኣገዳሲ እዩ።|ሓገዝ የድልየኒ።|ኽብሪ ንዓይ ኣገዳሲ እዩ።|ሕጂ ስቕ በል!|ምሳይ ክትጻወት ኣለካ!|እቲ ዕዮ ኣብ ክንዳይ ስርሓዮ!|ምስሓቕ ኣቋርጽ!|ኩሎም ሰባት ስምዒታት ኣለዉዎም።|ስምዒታት ከም መብራህቲ መኪና እዮም። ሓደ ነገር የርእዩኹም።|ሓጎስ ይስምዓኩም ድዩ? ሽዑ ሓደ ነገር ንዓኹም ጽቡቕ እዩ።|ጓሂ ወይ ሕርቃን ይስምዓኩም ድዩ? ሽዑ ሓደ ነገር ጎዲሉኩም ኣሎ።|ዝኾነ ስምዒት ጌጋ ኣይኮነን። ኣገዳሲ ምስቲ ስምዒት እንታይ ትገብሩ እዩ።|ከምዚ ትሓትዉ፦ እንታይ ይስምዓካ?|ክትብሉ ትኽእሉ ኢኹም፦ Ich bin traurig. ወይ፦ Ich fühle mich traurig. ክልቲኡ ቅኑዕ እዩ።|ግን ንስኹም ስምዒትኩም ኣይኮንኩምን። ስምዒት ኣለኩም። ይመጽእ ደሓር ከኣ ይኸይድ።|ስለዚ ንብል፦ Ich fühle mich … (… ይስምዓኒ)|ደስ ዘብሉ ስምዒታት ኣለዉ። ጽቡቕ ምስ ዝኾንኩም ይስምዑኹም።|ደስ ዘይብሉ ስምዒታት ኣለዉ። ሓደ ነገር ምስ ዝጎድለኩም ይስምዑኹም።|ስምዒት ድኹም ወይ ሓያል ክኸውን ይኽእል፦ ቁሩብ ድኹም፡ ብጣዕሚ ድኹም።|ተጠንቀቑ፦ ድሕሪ «Ich fühle mich» ስምዒት ይመጽእ። «Ausgelacht» (ዝተሰሓቐሉ) ስምዒት ኣይኮነን፡ ሓሳብ እዩ።|ድሕሪ ነፍሲ ወከፍ ስምዒት ድሌት ኣሎ።|ድሌት ንምንባር ዘድልየኩም ነገር እዩ።|ኩሎም ሰባት ሓደ ዓይነት ድሌታት ኣለዉዎም።|ከምዚ ትብልዎ፦ Ich brauche Ruhe (ህድኣት የድልየኒ)። Mir ist Respekt wichtig (ኽብሪ ንዓይ ኣገዳሲ እዩ)።|ብ weil (ምኽንያቱ) ስምዒትን ድሌትን ተራኽቡ። ግሲ ኣብ መወዳእታ ይኣቱ።|ተጠንቀቑ፦ ድሌት ትእዛዝ ኣይኮነን። ንሓደ ድሌት ብዙሕ መገድታት ኣሎ።|ብጽቡቕ ምዝርራብ|ስምዒታት ሓደ ነገር የርእዩና|ስምዒታት ብልክዕ ምግላጽ|እንታይ የድልየኒ?|እዚ ሰብ እንታይ ይስምዖ?|እዚ ሰብ እንታይ የድልዮ?|እዚ ናበይ ይኸይድ?|ደስ ዘብል|ደስ ዘይብል|ስምዒት|ሓሳብ|ድሌት|ትእዛዝ`,
  so: `faraxsan|murugaysan|cadhaysan|cabsanaya|daallan|walwalsan|deggan|aad u faraxsan|ku faanaya|nafisay|niyad jabsan|kalinimo|wareersan|lagu qoslay|la iska indha tiray|la caayay|la takooray|la ilaaway|degganaansho|badbaado|saaxiibtinimo|ixtiraam|caawimaad|madadaalo|nidaam|hurdo|Kuwa kale way qaylinayaan. Samiir wuxuu dareemayaa cadho.|Liina ma garanayso waxa hadda dhici doona. Waxay dareemaysaa walwal.|Miya nasashada kaligeed ayay joogtaa. Waxay dareemaysaa kalinimo.|Qof ayaa Amiir ku qoslaya. Wuxuu dareemayaa murugo.|Cali ma fahmin hawsha. Wuxuu dareemayaa wareer.|Liina si xun ayay u seexatay. Waxay dareemaysaa daal.|Samiir ma helayo buuggiisa. Wax walba waa isku qasan yihiin. Wuxuu dareemayaa walwal.|Maanta hawl keliya ayaa jirta, ciyaar ma jirto. Miya waxay dareemaysaa niyad jab.|Waxaan u baahanahay degganaansho.|Saaxiibtinimadu waa muhiim ii ah.|Waxaan u baahanahay caawimaad.|Ixtiraamku waa muhiim ii ah.|Hadda aamus!|Waa inaad ila ciyaartaa!|Hawsha ii qabo!|Jooji qosolka!|Dadka oo dhan waxay leeyihiin dareen.|Dareenku waa sida nalalka baabuurka. Wax bay ku tusaan.|Ma dareemaysaa farxad? Markaas wax ayaa kuu wanaagsan.|Ma dareemaysaa murugo ama cadho? Markaas wax ayaa kaa maqan.|Dareen khaldan ma jiro. Waxa muhiimka ah waa waxa aad dareenka ku samayso.|Sidan ayaad u weydiisaa: Sideed dareemaysaa?|Waxaad dhihi kartaa: Ich bin traurig. Ama: Ich fühle mich traurig. Labaduba waa sax.|Laakiin adigu ma tihid dareenkaaga. Dareen ayaad leedahay. Wuu yimaadaa oo wuu tagaa.|Sidaas darteed waxaan dhahnaa: Ich fühle mich … (waxaan dareemayaa …)|Waxaa jira dareen wanaagsan. Waad dareentaa marka aad fiican tahay.|Waxaa jira dareen aan wanaagsanayn. Waad dareentaa marka wax kaa maqan yihiin.|Dareenku wuxuu noqon karaa mid daciif ah ama xoog leh: wax yar daallan, aad u daallan.|Digniin: «Ich fühle mich» kadib dareen ayaa yimaada. «Ausgelacht» (lagu qoslay) ma aha dareen, waa fikrad.|Dareen kasta gadaashiisa baahi ayaa jirta.|Baahidu waa wax aad u baahan tahay si aad u noolaato.|Dadka oo dhan waxay leeyihiin baahiyo isku mid ah.|Sidan ayaad u dhahdaa: Ich brauche Ruhe (waxaan u baahanahay degganaansho). Mir ist Respekt wichtig (ixtiraamku waa muhiim ii ah).|weil (sababtoo ah) ayaad ku xiraysaa dareenka iyo baahida. Falku wuxuu yimaadaa dhammaadka.|Digniin: baahidu ma aha amar. Baahi waxaa loo heli karaa siyaabo badan.|Si wanaagsan wada hadal|Dareenku wax buu ina tusaa|Dareenka si sax ah u sheeg|Maxaan u baahanahay?|Qofku sidee ayuu dareemayaa?|Qofku muxuu u baahan yahay?|Tani xaggee bay ka tirsan tahay?|wanaagsan|aan wanaagsanayn|dareen|fikrad|baahi|amar`,
  si: `සතුටු|දුක්බර|කෝපවූ|බියවූ|මහන්සි|නොසන්සුන්|සන්සුන්|ඉතා සතුටු|ආඩම්බර|සහනය ලැබූ|කලකිරුණු|තනිවූ|ව්‍යාකූල|සමච්චල් කළ|නොසලකා හැරිය|අපහාස කළ|ඉවත් කළ|අමතක කළ|නිහඬබව|ආරක්ෂාව|මිත්‍රත්වය|ගෞරවය|උදව්ව|විනෝදය|පිළිවෙළ|නින්ද|අනිත් අය ඝෝෂා කරනවා. සමීර්ට කේන්තියක් දැනෙනවා.|දැන් මොකද වෙන්නේ කියලා ලීනා දන්නේ නැහැ. ඇයට නොසන්සුන්බවක් දැනෙනවා.|මියා විවේකයේදී තනියම ඉන්නවා. ඇයට තනිකමක් දැනෙනවා.|කවුරුහරි අමීර්ට හිනා වෙනවා. ඔහුට දුකක් දැනෙනවා.|අලීට කාර්යය තේරෙන්නේ නැහැ. ඔහුට ව්‍යාකූලබවක් දැනෙනවා.|ලීනා හොඳට නිදාගත්තේ නැහැ. ඇයට මහන්සියක් දැනෙනවා.|සමීර්ට ඔහුගේ පොත හොයාගන්න බැහැ. හැම දෙයක්ම අවුල්. ඔහුට නොසන්සුන්බවක් දැනෙනවා.|අද තියෙන්නේ කාර්යයන් විතරයි, සෙල්ලම් නැහැ. මියාට කලකිරීමක් දැනෙනවා.|මට නිහඬබව අවශ්‍යයි.|මිත්‍රත්වය මට වැදගත්.|මට උදව් අවශ්‍යයි.|ගෞරවය මට වැදගත්.|දැන්ම නිශ්ශබ්ද වෙනවා!|ඔයා මාත් එක්ක සෙල්ලම් කරන්නම ඕනේ!|මට වෙනුවෙන් කාර්යය කරන්න!|හිනාවෙන එක නවත්තනවා!|සියලු මිනිසුන්ට හැඟීම් තියෙනවා.|හැඟීම් වාහනයක ලාම්පු වගේ. ඒවා ඔබට යමක් පෙන්වනවා.|ඔබට සතුටක් දැනෙනවාද? එහෙනම් යමක් ඔබට හොඳයි.|ඔබට දුකක් හෝ කේන්තියක් දැනෙනවාද? එහෙනම් ඔබට යමක් අඩුයි.|කිසිම හැඟීමක් වැරදි නැහැ. වැදගත් වෙන්නේ ඔබ ඒ හැඟීමෙන් කරන දේයි.|මෙහෙම අහන්න: ඔබට කොහොමද දැනෙන්නේ?|ඔබට කියන්න පුළුවන්: Ich bin traurig. නැත්නම්: Ich fühle mich traurig. දෙකම නිවැරදියි.|නමුත් ඔබ ඔබේ හැඟීම නොවේ. ඔබට හැඟීමක් තියෙනවා. එය එනවා, ආයෙත් යනවා.|ඒ නිසා අපි කියනවා: Ich fühle mich … (මට … දැනෙනවා)|ප්‍රසන්න හැඟීම් තියෙනවා. ඔබ හොඳින් ඉන්නකොට ඒවා දැනෙනවා.|අප්‍රසන්න හැඟීම් තියෙනවා. ඔබට යමක් අඩු වුණාම ඒවා දැනෙනවා.|හැඟීමක් දුර්වල හෝ ශක්තිමත් වෙන්න පුළුවන්: ටිකක් මහන්සි, ගොඩක් මහන්සි.|පරිස්සමින්: «Ich fühle mich» ට පස්සේ එන්නේ හැඟීමක්. «Ausgelacht» (සමච්චල් කළ) හැඟීමක් නොවේ, එය සිතුවිල්ලක්.|හැම හැඟීමක් පිටුපසම අවශ්‍යතාවක් තියෙනවා.|අවශ්‍යතාවක් කියන්නේ ජීවත් වෙන්න ඔබට ඕන දෙයක්.|සියලු මිනිසුන්ට එකම අවශ්‍යතා තියෙනවා.|මෙහෙම කියන්න: Ich brauche Ruhe (මට නිහඬබව අවශ්‍යයි). Mir ist Respekt wichtig (ගෞරවය මට වැදගත්).|weil (මොකද) එකෙන් ඔබ හැඟීම සහ අවශ්‍යතාව සම්බන්ධ කරනවා. ක්‍රියාපදය අගට යනවා.|පරිස්සමින්: අවශ්‍යතාවක් අණක් නොවේ. අවශ්‍යතාවක් සපුරාගන්න බොහෝ මාර්ග තියෙනවා.|එකට හොඳින් කතා කිරීම|හැඟීම් අපට යමක් පෙන්වනවා|හැඟීම් නිවැරදිව කීම|මට මොනවද අවශ්‍ය?|මේ පුද්ගලයාට කොහොමද දැනෙන්නේ?|මේ පුද්ගලයාට මොනවද අවශ්‍ය?|මේක අයිති කොහෙටද?|ප්‍රසන්න|අප්‍රසන්න|හැඟීම|සිතුවිල්ල|අවශ්‍යතාව|අණ`,
};

for (const [code, text] of Object.entries(GF_L1)) {
  const parts = text.split('|');
  const fill = (list) => parts.splice(0, list.length).forEach((t, i) => { (list[i].t = list[i].t || {})[code] = t; });
  fill(GF_FEELINGS);
  fill(GF_THOUGHTS);
  fill(GF_NEEDS);
  fill(GF_SITUATIONS);
  fill(GF_NEED_OR_COMMAND);
  parts.splice(0, GF_RULE_KEYS.length).forEach((t, i) => { GF_RULES[GF_RULE_KEYS[i]][code] = t; });
  parts.splice(0, GF_UI_KEYS.length).forEach((t, i) => { STRINGS[GF_UI_KEYS[i]][code] = t; });
}

const gfFeeling = (id) => GF_FEELINGS.find((f) => f.id === id);
const gfNeed = (id) => GF_NEEDS.find((n) => n.id === id);
const gfNeedName = (n) => `${n.art} ${n.de}`;
const gfSay = (f) => `Ich fühle mich ${f.de}.`;

// fühlen is regular; the reflexive pronoun follows the person.
const FUEHLEN = { stem: 'fühl' };
const GF_SELF = { ich: 'mich', du: 'dich', er: 'sich', sie: 'sich', es: 'sich', wir: 'uns', ihr: 'euch', siep: 'sich', Sie: 'sich' };

function gfLine(personKey, f) {
  return `${capital(person(personKey).de)} ${conjugate(FUEHLEN, personKey)} ${GF_SELF[personKey]} ${f.de}.`;
}

const GF_BASIC = GF_FEELINGS.filter((f) => f.level === 1);
const GF_MORE = GF_FEELINGS.filter((f) => f.level === 2);

// Three cards from each basket, mixed.
function gfSortCards(cards, rnd) {
  const baskets = [...new Set(cards.map((c) => c.basket))];
  return shuffle(baskets.flatMap((b) => shuffle(cards.filter((c) => c.basket === b), rnd).slice(0, 3)), rnd);
}

// ---- Exercise generators ----

const GQ = {
  feelFromFace(list, rnd) {
    const f = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'gfHow', pic: f.pic, answer: f.de, full: gfSay(f), feedbackL1: f.t,
      options: distinct(f.de, list.map((x) => x.de), 4, rnd),
    };
  },
  faceFromSound(list, rnd) {
    const f = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'listen', listen: gfSay(f), answer: f.pic, pictures: true, pic: f.pic, full: gfSay(f), feedbackL1: f.t,
      options: distinct(f.pic, list.map((x) => x.pic), 4, rnd),
    };
  },
  feelFromL1(list, rnd) {
    const f = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'pickDe', l1: f.t, answer: f.de, full: gfSay(f), feedbackL1: f.t,
      options: distinct(f.de, list.map((x) => x.de), 4, rnd),
    };
  },
  feelGap(list, rnd, typed = false) {
    const f = pickOne(list, rnd);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', pic: f.pic, text: 'Ich fühle mich ___.', answer: f.de, full: gfSay(f), feedbackL1: f.t,
      options: distinct(f.de, list.map((x) => x.de), 4, rnd),
    };
  },
  reflexive(list, rnd, typed = false) {
    const f = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = GF_SELF[p.key];
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: p.key, pic: f.pic,
      text: `${capital(p.de)} ${conjugate(FUEHLEN, p.key)} ___ ${f.de}.`, answer, full: gfLine(p.key, f), feedbackL1: f.t,
      options: distinct(answer, ['mich', 'dich', 'sich', 'uns', 'euch'], 4, rnd),
    };
  },
  fuehlenForm(list, rnd) {
    const f = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = conjugate(FUEHLEN, p.key);
    return {
      kind: 'choice', task: 'gap', person: p.key, pic: f.pic,
      text: `${capital(p.de)} ___ ${GF_SELF[p.key]} ${f.de}.`, answer, full: gfLine(p.key, f), feedbackL1: f.t,
      options: shuffle(['fühle', 'fühlst', 'fühlt', 'fühlen'], rnd),
    };
  },
  pleasantSort(rnd) {
    const cards = GF_FEELINGS.map((f) => ({ de: f.de, t: f.t, basket: f.pleasant ? 'gfPleasant' : 'gfUnpleasant' }));
    return { kind: 'sort', task: 'gfSort', baskets: ['gfPleasant', 'gfUnpleasant'], cards: gfSortCards(cards, rnd), full: '' };
  },
  thoughtSort(rnd) {
    const feelings = GF_FEELINGS.filter((f) => !f.pleasant).map((f) => ({ de: gfSay(f), t: f.t, basket: 'gfFeeling' }));
    const thoughts = GF_THOUGHTS.map((x) => ({ de: `Ich fühle mich ${x.de}.`, t: x.t, basket: 'gfThought' }));
    return { kind: 'sort', task: 'gfSort', baskets: ['gfFeeling', 'gfThought'], cards: gfSortCards(feelings.concat(thoughts), rnd), full: '' };
  },
  commandSort(rnd) {
    return { kind: 'sort', task: 'gfSort', baskets: ['gfNeedWord', 'gfCommand'], cards: gfSortCards(GF_NEED_OR_COMMAND, rnd), full: '' };
  },
  needFromPic(rnd) {
    const n = pickOne(GF_NEEDS, rnd);
    return {
      kind: 'choice', task: 'pickDe', pic: n.pic, answer: gfNeedName(n), full: `Ich brauche ${n.de}.`, feedbackL1: n.t,
      options: distinct(gfNeedName(n), GF_NEEDS.map(gfNeedName), 4, rnd),
    };
  },
  needFromSound(rnd) {
    const n = pickOne(GF_NEEDS, rnd);
    return {
      kind: 'choice', task: 'listen', listen: gfNeedName(n), answer: n.pic, pictures: true, pic: n.pic, full: `Ich brauche ${n.de}.`, feedbackL1: n.t,
      options: distinct(n.pic, GF_NEEDS.map((x) => x.pic), 4, rnd),
    };
  },
  needFromL1(rnd) {
    const n = pickOne(GF_NEEDS, rnd);
    return {
      kind: 'choice', task: 'pickDe', l1: n.t, answer: gfNeedName(n), full: `Ich brauche ${n.de}.`, feedbackL1: n.t,
      options: distinct(gfNeedName(n), GF_NEEDS.map(gfNeedName), 4, rnd),
    };
  },
  situation(rnd) {
    const s = pickOne(GF_SITUATIONS, rnd);
    const n = gfNeed(s.need);
    const others = GF_NEEDS.filter((x) => x !== n && !s.also.includes(x.id)).map((x) => x.de);
    return {
      kind: 'choice', task: 'gfNeed', pic: gfFeeling(s.feeling).pic, sentence: s.de, sentenceL1: s.t, answer: n.de,
      full: `${s.who} braucht ${n.de}.`, feedbackL1: n.t, options: distinct(n.de, others, 4, rnd),
    };
  },
  weilGap(rnd, typed = false) {
    const s = pickOne(GF_SITUATIONS, rnd);
    const f = gfFeeling(s.feeling);
    const n = gfNeed(s.need);
    const others = GF_NEEDS.filter((x) => x !== n && !s.also.includes(x.id)).map((x) => x.de);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', pic: f.pic, text: `Ich fühle mich ${f.de}, weil ich ___ brauche.`, answer: n.de,
      full: `Ich fühle mich ${f.de}, weil ich ${n.de} brauche.`, feedbackL1: n.t, options: distinct(n.de, others, 4, rnd),
    };
  },
  weilOrder(rnd) {
    const s = pickOne(GF_SITUATIONS, rnd);
    const f = gfFeeling(s.feeling);
    const n = gfNeed(s.need);
    const start = `Ich fühle mich ${f.de}, weil`;
    const answer = `${start} ich ${n.de} brauche.`;
    return {
      kind: 'choice', task: 'pfOrder', pic: f.pic, answer, full: answer, feedbackL1: n.t,
      options: shuffle([answer, `${start} ich brauche ${n.de}.`, `${start} brauche ich ${n.de}.`], rnd),
    };
  },
};

function gfLearn(f) {
  return { learn: { pic: f.pic, de: f.de, say: gfSay(f), t: f.t, line: gfSay(f) } };
}

function gfNeedLearn(n) {
  return { learn: { pic: n.pic, de: gfNeedName(n), say: `${gfNeedName(n)}. Ich brauche ${n.de}.`, t: n.t, line: `Ich brauche ${n.de}.` } };
}

const gfStep = (rule, extra = {}) => ({ rule, map: GF_RULES, ...extra });

const GF_COURSE = [
  {
    section: 'gf1',
    stations: [
      {
        id: 'gf-gefuehle', kind: 'intro', title: 'Wozu sind Gefühle da?',
        steps: () => [
          gfStep('e1', { pics: ['🙂', '😢', '😠', '😨'] }),
          gfStep('e2', { pic: '🚦' }),
          gfStep('e3', { pic: '🙂' }),
          gfStep('e4', { pics: ['😢', '😠'] }),
          gfStep('e5'),
          gfStep('e6', { example: 'Wie fühlst du dich? – Ich fühle mich froh.' }),
        ],
      },
      {
        id: 'gf-gefuehle-lernen', kind: 'learn', title: 'Sieben Gefühle', steps: () => GF_BASIC.map(gfLearn),
        questions: (r) => mix([(x) => GQ.feelFromFace(GF_BASIC, x), (x) => GQ.faceFromSound(GF_BASIC, x)], 8, r),
      },
      {
        id: 'gf-gefuehle-ueben', kind: 'practice', title: 'Gefühle erkennen',
        questions: (r) => mix([(x) => GQ.feelFromFace(GF_BASIC, x), (x) => GQ.faceFromSound(GF_BASIC, x), (x) => GQ.feelFromL1(GF_BASIC, x), (x) => GQ.feelGap(GF_BASIC, x)], 12, r),
      },
      {
        id: 'gf-gefuehle-test', kind: 'test', title: 'Gefühle',
        questions: (r) => mix([(x) => GQ.feelGap(GF_BASIC, x, true), (x) => GQ.faceFromSound(GF_BASIC, x), (x) => GQ.feelFromL1(GF_BASIC, x)], 10, r),
      },
    ],
  },
  {
    section: 'gf2',
    stations: [
      {
        id: 'gf-genau', kind: 'intro', title: 'Ich fühle mich …',
        steps: () => [
          gfStep('f1', { pic: '😢', example: 'Ich bin traurig.  ·  Ich fühle mich traurig.' }),
          gfStep('f2', { pics: ['🥱', '🙂', '😬'] }),
          gfStep('f3', { rtable: 'muede' }),
          gfStep('f4', { pics: GF_FEELINGS.filter((f) => f.pleasant).map((f) => f.pic) }),
          gfStep('f5', { pics: GF_FEELINGS.filter((f) => !f.pleasant).map((f) => f.pic) }),
          gfStep('f6', { pic: '🥱', example: 'Ich fühle mich ein bisschen müde. Ich fühle mich sehr müde.' }),
          gfStep('f7', { example: 'Ich fühle mich traurig. ✓  ·  Ich fühle mich ausgelacht. ✗' }),
        ],
      },
      {
        id: 'gf-mehr', kind: 'learn', title: 'Sechs neue Gefühle', steps: () => GF_MORE.map(gfLearn),
        questions: (r) => mix([(x) => GQ.feelFromFace(GF_MORE, x), (x) => GQ.faceFromSound(GF_MORE, x)], 8, r),
      },
      {
        id: 'gf-mich', kind: 'practice', title: 'mich, dich, sich …',
        questions: (r) => mix([(x) => GQ.reflexive(GF_FEELINGS, x), (x) => GQ.fuehlenForm(GF_FEELINGS, x)], 12, r),
      },
      {
        id: 'gf-alle-ueben', kind: 'practice', title: 'Alle Gefühle',
        questions: (r) => mix([(x) => GQ.feelFromFace(GF_FEELINGS, x), (x) => GQ.feelFromL1(GF_FEELINGS, x), (x) => GQ.faceFromSound(GF_FEELINGS, x), (x) => GQ.feelGap(GF_FEELINGS, x, true)], 12, r),
      },
      { id: 'gf-angenehm', kind: 'practice', title: 'angenehm oder unangenehm?', questions: (r) => mix([GQ.pleasantSort], 3, r) },
      { id: 'gf-gedanke', kind: 'practice', title: 'Gefühl oder Gedanke?', questions: (r) => mix([GQ.thoughtSort], 3, r) },
      {
        id: 'gf-genau-test', kind: 'test', title: 'Gefühle genau sagen',
        questions: (r) => mix([(x) => GQ.reflexive(GF_FEELINGS, x, true), (x) => GQ.feelGap(GF_FEELINGS, x, true), (x) => GQ.feelFromFace(GF_FEELINGS, x), GQ.thoughtSort], 12, r),
      },
    ],
  },
  {
    section: 'gf3',
    stations: [
      {
        id: 'gf-beduerfnis', kind: 'intro', title: 'Was ist ein Bedürfnis?',
        steps: () => [
          gfStep('b1', { pics: ['😠', '🔇'] }),
          gfStep('b2', { pics: ['😴', '🛡️', '🫂'] }),
          gfStep('b3'),
          gfStep('b4', { example: 'Ich brauche Ruhe. Mir ist Respekt wichtig.' }),
          gfStep('b5', { pic: '🥱', example: 'Ich fühle mich müde, weil ich Schlaf brauche.' }),
          gfStep('b6', { example: 'Ich brauche Ruhe. ✓  ·  Sei sofort still! ✗' }),
        ],
      },
      {
        id: 'gf-beduerfnisse-lernen', kind: 'learn', title: 'Acht Bedürfnisse', steps: () => GF_NEEDS.map(gfNeedLearn),
        questions: (r) => mix([GQ.needFromPic, GQ.needFromSound], 8, r),
      },
      { id: 'gf-beduerfnisse-ueben', kind: 'practice', title: 'Was braucht die Person?', questions: (r) => mix([GQ.situation, GQ.needFromPic, GQ.needFromL1, GQ.needFromSound], 12, r) },
      { id: 'gf-weil', kind: 'practice', title: '… weil ich Ruhe brauche', questions: (r) => mix([GQ.weilGap, GQ.weilOrder, GQ.situation], 12, r) },
      { id: 'gf-befehl', kind: 'practice', title: 'Bedürfnis oder Befehl?', questions: (r) => mix([GQ.commandSort], 3, r) },
      {
        id: 'gf-beduerfnisse-test', kind: 'test', title: 'Was brauche ich?',
        questions: (r) => mix([GQ.situation, (x) => GQ.weilGap(x, true), GQ.weilOrder, GQ.commandSort], 12, r),
      },
    ],
  },
];

const GF_STATIONS = GF_COURSE.flatMap((s) => s.stations);

if (typeof module !== 'undefined') module.exports = { GF_FEELINGS, GF_NEEDS, GF_COURSE, GF_STATIONS, GQ };
