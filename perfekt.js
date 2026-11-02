// Perfekt course: haben or sein + Partizip II. Data and exercise generators, no DOM.
// Builds on verbs.js (PERSONS, VERBS, conjugate) for persons, pictures and meanings.

// `aux`: h = haben, s = sein. `wrong` holds the typical mistakes, used as wrong options.
// `group`: regular (ge…t), irregular (ge…en), special (haben, sein), trap (see PF_RULES t1–t5).
const PF_VERBS = [
  { id: 'spielen', part: 'gespielt', aux: 'h', group: 'regular', rest: 'Fussball', wrong: ['gespielen', 'spielt'] },
  { id: 'lernen', part: 'gelernt', aux: 'h', group: 'regular', rest: 'Deutsch', wrong: ['gelernen', 'lernt'] },
  { id: 'machen', part: 'gemacht', aux: 'h', group: 'regular', rest: 'Hausaufgaben', wrong: ['gemachen', 'macht'] },
  { id: 'kochen', part: 'gekocht', aux: 'h', group: 'regular', rest: 'Reis', wrong: ['gekochen', 'kocht'] },
  { id: 'kaufen', part: 'gekauft', aux: 'h', group: 'regular', rest: 'Brot', wrong: ['gekaufen', 'kauft'] },
  { id: 'hoeren', part: 'gehört', aux: 'h', group: 'regular', rest: 'Musik', wrong: ['gehören', 'hört'] },
  { id: 'wohnen', part: 'gewohnt', aux: 'h', group: 'regular', rest: 'in Bern', wrong: ['gewohnen', 'wohnt'] },
  { id: 'essen', part: 'gegessen', aux: 'h', group: 'irregular', rest: 'Pizza', wrong: ['geesst', 'gegesst'] },
  { id: 'trinken', part: 'getrunken', aux: 'h', group: 'irregular', rest: 'Wasser', wrong: ['getrinkt', 'getrinken'] },
  { id: 'lesen', part: 'gelesen', aux: 'h', group: 'irregular', rest: 'ein Buch', wrong: ['gelest', 'gelasen'] },
  { id: 'sehen', part: 'gesehen', aux: 'h', group: 'irregular', rest: 'einen Film', wrong: ['geseht', 'gesahen'] },
  { id: 'schlafen', part: 'geschlafen', aux: 'h', group: 'irregular', rest: 'lange', wrong: ['geschlaft', 'geschläft'] },
  { id: 'sprechen', part: 'gesprochen', aux: 'h', group: 'irregular', rest: 'Deutsch', wrong: ['gesprecht', 'gesprechen'] },
  { id: 'gehen', part: 'gegangen', aux: 's', group: 'irregular', rest: 'in die Schule', wrong: ['gegeht', 'gegehen'] },
  { id: 'fahren', part: 'gefahren', aux: 's', group: 'irregular', rest: 'nach Zürich', wrong: ['gefahrt', 'gefährt'] },
  { id: 'kommen', part: 'gekommen', aux: 's', group: 'irregular', rest: 'nach Hause', wrong: ['gekommt', 'gekamen'] },
  { id: 'bleiben', pic: '🛋️', part: 'geblieben', aux: 's', group: 'irregular', rest: 'zu Hause', wrong: ['gebleibt', 'gebleiben'] },
  { id: 'haben', part: 'gehabt', aux: 'h', group: 'special', rest: 'Hunger', wrong: ['gehaben', 'gehat'] },
  { id: 'sein', part: 'gewesen', aux: 's', group: 'special', rest: 'krank', wrong: ['geseint', 'gesind'] },
  { id: 'telefonieren', pic: '📞', part: 'telefoniert', aux: 'h', group: 'trap', rest: 'mit Mama', wrong: ['getelefoniert', 'getelefonieren'] },
  { id: 'besuchen', pic: '🚪', part: 'besucht', aux: 'h', group: 'trap', rest: 'meine Tante', wrong: ['gebesucht', 'besuchen'] },
  { id: 'verstehen', pic: '💡', part: 'verstanden', aux: 'h', group: 'trap', rest: 'alles', wrong: ['geverstanden', 'versteht'] },
  { id: 'bezahlen', pic: '💰', part: 'bezahlt', aux: 'h', group: 'trap', rest: 'das Essen', wrong: ['gebezahlt', 'bezahlen'] },
  { id: 'einkaufen', pic: '🛍️', part: 'eingekauft', aux: 'h', group: 'trap', rest: 'im Laden', wrong: ['geeinkauft', 'eingekaufen'] },
  { id: 'aufstehen', pic: '⏰', part: 'aufgestanden', aux: 's', group: 'trap', rest: 'früh', wrong: ['geaufstanden', 'aufgesteht'] },
  { id: 'einschlafen', pic: '🌙', part: 'eingeschlafen', aux: 's', group: 'trap', rest: 'schnell', wrong: ['geeinschlafen', 'eingeschlaft'] },
  { id: 'arbeiten', pic: '💼', part: 'gearbeitet', aux: 'h', group: 'trap', rest: 'viel', wrong: ['gearbeitt', 'gearbeiten'] },
  { id: 'warten', pic: '⏳', part: 'gewartet', aux: 'h', group: 'trap', rest: 'auf den Bus', wrong: ['gewartt', 'gewarten'] },
];

// Verbs that are not in the present-tense course yet; their meanings come from PF_L1.
const PF_NEW = ['bleiben', 'telefonieren', 'besuchen', 'verstehen', 'bezahlen', 'einkaufen', 'aufstehen', 'einschlafen', 'arbeiten', 'warten'];

PF_VERBS.forEach((v) => {
  const known = verb(v.id);
  v.de = known ? known.de : v.id;
  v.pic = v.pic || known.pic;
  v.t = known ? known.t : {};
});

const PF_RULE_KEYS = ['p1', 'p2', 'p3', 'p4', 'r1', 'r2', 'u1', 'u2', 'a1', 'a2', 'a3', 'a4', 'a5', 't1', 't2', 't3', 't4', 't5', 't6'];
const PF_RULES = {
  p1: { de: 'Mit dem Perfekt erzählst du, was passiert ist. Zum Beispiel gestern oder letzte Woche.' },
  p2: { de: 'Das Perfekt hat zwei Teile: haben oder sein und das Partizip II.' },
  p3: { de: 'haben oder sein steht an Position 2. Das Partizip II steht ganz am Ende.' },
  p4: { de: 'haben und sein konjugierst du wie im Präsens. Das Partizip II ändert sich nie.' },
  r1: { de: 'Regelmässige Verben: ge + Stamm + t.' },
  r2: { de: 'Die Endung -en fällt weg. Dann kommt ge davor und t ans Ende.' },
  u1: { de: 'Unregelmässige Verben: ge + Stamm + en.' },
  u2: { de: 'Oft ändert sich der Vokal im Stamm. Lerne diese Formen auswendig.' },
  a1: { de: 'Die meisten Verben bilden das Perfekt mit haben.' },
  a2: { de: 'Mit sein: Jemand geht oder fährt von einem Ort an einen anderen Ort.' },
  a3: { de: 'Mit sein: Etwas ändert sich. Zum Beispiel aufstehen oder einschlafen.' },
  a4: { de: 'Auch sein und bleiben bilden das Perfekt mit sein.' },
  a5: { de: 'Frage dich: Bewegung von A nach B oder eine Änderung? Dann sein. Sonst haben.' },
  t1: { de: 'Verben auf -ieren haben kein ge.' },
  t2: { de: 'Verben mit be- oder ver- am Anfang haben kein ge.' },
  t3: { de: 'Trennbare Verben: ge steht in der Mitte.' },
  t4: { de: 'Endet der Stamm auf t oder d? Dann kommt et ans Ende.' },
  t5: { de: 'haben und sein sind ganz besonders: gehabt und gewesen.' },
  t6: { de: 'Das Partizip II steht immer am Ende, auch in langen Sätzen.' },
};

const PF_UI_KEYS = ['pfCourse', 'pfBasics', 'pfRegular', 'pfIrregular', 'pfAux', 'pfTraps', 'pfFinal', 'pfPart', 'pfOrder'];
Object.assign(STRINGS, {
  pfCourse: { de: 'Das Perfekt' }, pfBasics: { de: 'So bildet man das Perfekt' }, pfRegular: { de: 'Partizip II: regelmässig' },
  pfIrregular: { de: 'Partizip II: unregelmässig' }, pfAux: { de: 'haben oder sein?' }, pfTraps: { de: 'Stolpersteine' },
  pfFinal: { de: 'Schlusstest' }, pfPart: { de: 'Wie heisst das Partizip II?' }, pfOrder: { de: 'Welcher Satz ist richtig?' },
});

// Drafts, unreviewed: see README. Order: 10 new verbs (PF_NEW), 19 rules (PF_RULE_KEYS), 9 texts (PF_UI_KEYS).
const PF_L1 = {
  si: `නවතිනවා, රැඳෙනවා|දුරකථනයෙන් කතා කරනවා|බලන්න යනවා|තේරුම් ගන්නවා|ගෙවනවා|සාප්පු යනවා|නැගිටිනවා|නින්දට වැටෙනවා|වැඩ කරනවා|බලා ඉන්නවා|Perfekt එකෙන් ඔබ සිදු වූ දේ කියනවා. උදාහරණයක් ලෙස ඊයේ හෝ පසුගිය සතියේ.|Perfekt හි කොටස් දෙකක් තියෙනවා: haben හෝ sein සහ Partizip II.|haben හෝ sein දෙවන ස්ථානයේ තියෙනවා. Partizip II හරියටම අගට එනවා.|haben සහ sein වර්තමාන කාලයේ වගේම වරනඟන්න. Partizip II කවදාවත් වෙනස් වෙන්නේ නැහැ.|නිත්‍ය ක්‍රියාපද: ge + මූලය + t.|-en අවසානය ඉවත් වෙනවා. පස්සේ ge ඉස්සරහට සහ t අගට එනවා.|අනිත්‍ය ක්‍රියාපද: ge + මූලය + en.|බොහෝවිට මූලයේ ස්වරය වෙනස් වෙනවා. මෙම රූප කටපාඩම් කරන්න.|බොහෝ ක්‍රියාපද Perfekt හදන්නේ haben සමඟයි.|sein සමඟ: යමෙක් එක තැනක සිට තවත් තැනකට යනවා.|sein සමඟ: යමක් වෙනස් වෙනවා. උදාහරණයක් ලෙස නැගිටීම හෝ නින්දට වැටීම.|sein සහ bleiben ද Perfekt හදන්නේ sein සමඟයි.|ඔබෙන්ම අහන්න: A සිට B දක්වා චලනයක්ද නැත්නම් වෙනසක්ද? එහෙනම් sein. නැත්නම් haben.|-ieren වලින් අවසන් වන ක්‍රියාපදවල ge නැහැ.|be- හෝ ver- වලින් පටන් ගන්නා ක්‍රියාපදවල ge නැහැ.|වෙන් කළ හැකි ක්‍රියාපද: ge මැදට එනවා.|මූලය t හෝ d වලින් අවසන් වෙනවාද? එහෙනම් අගට et එනවා.|haben සහ sein ඉතා විශේෂයි: gehabt සහ gewesen.|Partizip II හැමවිටම අගට එනවා, දිගු වාක්‍යවලත්.|Perfekt (අතීත කාලය)|Perfekt හදන්නේ කොහොමද|Partizip II: නිත්‍ය ක්‍රියාපද|Partizip II: අනිත්‍ය ක්‍රියාපද|haben ද sein ද?|සුලබ වැරදි|අවසාන පරීක්ෂණය|Partizip II මොකක්ද?|කුමන වාක්‍යයද නිවැරදි?`,
  ckb: `مانەوە|تەلەفۆن کردن|سەردان کردن|تێگەیشتن|پارە دان|بازاڕ کردن|لە خەو هەستان|خەو لێکەوتن|کار کردن|چاوەڕێ کردن|بە Perfekt دەگێڕیتەوە چی ڕوویداوە. بۆ نموونە دوێنێ یان هەفتەی ڕابردوو.|Perfekt دوو بەشی هەیە: haben یان sein و Partizip II.|haben یان sein لە شوێنی دووەمدایە. Partizip II لە کۆتایی ڕستەدایە.|haben و sein وەک کاتی ئێستا گەردان دەکەیت. Partizip II هەرگیز ناگۆڕێت.|کردارە ڕێکەکان: ge + ڕەگ + t.|کۆتایی -en لادەچێت. پاشان ge دێتە پێشەوە و t دێتە کۆتایی.|کردارە نارێکەکان: ge + ڕەگ + en.|زۆربەی جار پیتی بزوێنی ڕەگ دەگۆڕێت. ئەم شێوانە لەبەر بکە.|زۆربەی کردارەکان Perfekt بە haben دروست دەکەن.|بە sein: کەسێک لە شوێنێکەوە بۆ شوێنێکی تر دەڕوات.|بە sein: شتێک دەگۆڕێت. بۆ نموونە لە خەو هەستان یان خەو لێکەوتن.|sein و bleiben یش Perfekt بە sein دروست دەکەن.|لە خۆت بپرسە: جووڵە لە A بۆ B یان گۆڕانێک؟ ئەوا sein. ئەگینا haben.|ئەو کردارانەی بە -ieren کۆتاییان دێت ge یان نییە.|ئەو کردارانەی بە be- یان ver- دەست پێ دەکەن ge یان نییە.|کردارە جیابووەکان: ge دەچێتە ناوەڕاست.|ئایا ڕەگ بە t یان d کۆتایی دێت؟ ئەوا et دێتە کۆتایی.|haben و sein زۆر تایبەتن: gehabt و gewesen.|Partizip II هەمیشە لە کۆتاییدایە، تەنانەت لە ڕستە درێژەکانیشدا.|Perfekt (ڕابردوو)|Perfekt چۆن دروست دەکرێت|Partizip II: کردارە ڕێکەکان|Partizip II: کردارە نارێکەکان|haben یان sein؟|هەڵە باوەکان|تاقیکردنەوەی کۆتایی|Partizip II ی چییە؟|کام ڕستە ڕاستە؟`,
  en: `to stay|to phone|to visit|to understand|to pay|to go shopping|to get up|to fall asleep|to work|to wait|With the Perfekt you tell what happened. For example yesterday or last week.|The Perfekt has two parts: haben or sein and the Partizip II.|haben or sein is in position 2. The Partizip II is at the very end.|You conjugate haben and sein as in the present tense. The Partizip II never changes.|Regular verbs: ge + stem + t.|The ending -en is dropped. Then ge goes in front and t at the end.|Irregular verbs: ge + stem + en.|Often the vowel in the stem changes. Learn these forms by heart.|Most verbs form the Perfekt with haben.|With sein: someone goes or travels from one place to another place.|With sein: something changes. For example getting up or falling asleep.|sein and bleiben also form the Perfekt with sein.|Ask yourself: movement from A to B, or a change? Then sein. Otherwise haben.|Verbs ending in -ieren have no ge.|Verbs starting with be- or ver- have no ge.|Separable verbs: ge goes in the middle.|Does the stem end in t or d? Then et goes at the end.|haben and sein are very special: gehabt and gewesen.|The Partizip II is always at the end, even in long sentences.|The Perfekt (past tense)|How to form the Perfekt|Partizip II: regular|Partizip II: irregular|haben or sein?|Stumbling blocks|Final test|What is the Partizip II?|Which sentence is right?`,
  fr: `rester|téléphoner|rendre visite|comprendre|payer|faire les courses|se lever|s'endormir|travailler|attendre|Avec le Perfekt, tu racontes ce qui s'est passé. Par exemple hier ou la semaine dernière.|Le Perfekt a deux parties : haben ou sein et le participe II.|haben ou sein est en position 2. Le participe II est tout à la fin.|Tu conjugues haben et sein comme au présent. Le participe II ne change jamais.|Verbes réguliers : ge + radical + t.|La terminaison -en disparaît. Puis on met ge devant et t à la fin.|Verbes irréguliers : ge + radical + en.|Souvent, la voyelle du radical change. Apprends ces formes par cœur.|La plupart des verbes forment le Perfekt avec haben.|Avec sein : quelqu'un va d'un endroit à un autre endroit.|Avec sein : quelque chose change. Par exemple se lever ou s'endormir.|sein et bleiben forment aussi le Perfekt avec sein.|Demande-toi : un mouvement de A à B ou un changement ? Alors sein. Sinon haben.|Les verbes en -ieren n'ont pas de ge.|Les verbes qui commencent par be- ou ver- n'ont pas de ge.|Verbes séparables : ge est au milieu.|Le radical finit par t ou d ? Alors on ajoute et à la fin.|haben et sein sont très particuliers : gehabt et gewesen.|Le participe II est toujours à la fin, même dans les longues phrases.|Le Perfekt (passé composé)|Comment former le Perfekt|Participe II : verbes réguliers|Participe II : verbes irréguliers|haben ou sein ?|Pièges|Test final|Quel est le participe II ?|Quelle phrase est juste ?`,
  tr: `kalmak|telefon etmek|ziyaret etmek|anlamak|ödemek|alışveriş yapmak|kalkmak|uykuya dalmak|çalışmak|beklemek|Perfekt ile ne olduğunu anlatırsın. Örneğin dün veya geçen hafta.|Perfekt iki parçadan oluşur: haben veya sein ve Partizip II.|haben veya sein 2. sıradadır. Partizip II en sondadır.|haben ve sein'ı şimdiki zamandaki gibi çekersin. Partizip II hiç değişmez.|Düzenli fiiller: ge + kök + t.|-en eki düşer. Sonra başa ge, sona t gelir.|Düzensiz fiiller: ge + kök + en.|Kökteki ünlü sık sık değişir. Bu biçimleri ezberle.|Fiillerin çoğu Perfekt'i haben ile yapar.|sein ile: Biri bir yerden başka bir yere gider.|sein ile: Bir şey değişir. Örneğin kalkmak veya uykuya dalmak.|sein ve bleiben de Perfekt'i sein ile yapar.|Kendine sor: A'dan B'ye hareket mi, bir değişim mi? O zaman sein. Değilse haben.|-ieren ile biten fiillerde ge yoktur.|be- veya ver- ile başlayan fiillerde ge yoktur.|Ayrılabilen fiiller: ge ortaya gelir.|Kök t veya d ile mi bitiyor? O zaman sona et gelir.|haben ve sein çok özeldir: gehabt ve gewesen.|Partizip II her zaman sondadır, uzun cümlelerde de.|Perfekt (geçmiş zaman)|Perfekt nasıl yapılır|Partizip II: düzenli|Partizip II: düzensiz|haben mi sein mi?|Tuzaklar|Son test|Partizip II nedir?|Hangi cümle doğru?`,
  ar: `يبقى|يتصل هاتفيا|يزور|يفهم|يدفع|يتسوق|ينهض من النوم|يغفو|يعمل|ينتظر|بالـ Perfekt تحكي ما حدث. مثلا أمس أو الأسبوع الماضي.|للـ Perfekt جزآن: haben أو sein، و Partizip II.|haben أو sein في المكان الثاني. و Partizip II في آخر الجملة تماما.|تصرّف haben و sein كما في المضارع. Partizip II لا يتغير أبدا.|الأفعال المنتظمة: ge + الجذر + t.|تسقط النهاية -en. ثم تضع ge في البداية و t في النهاية.|الأفعال غير المنتظمة: ge + الجذر + en.|غالبا يتغير حرف العلة في الجذر. احفظ هذه الصيغ عن ظهر قلب.|معظم الأفعال تكوّن الـ Perfekt مع haben.|مع sein: شخص يذهب أو يسافر من مكان إلى مكان آخر.|مع sein: شيء يتغير. مثلا النهوض من النوم أو الغفو.|sein و bleiben أيضا يكوّنان الـ Perfekt مع sein.|اسأل نفسك: حركة من A إلى B أو تغيّر؟ إذن sein. وإلا haben.|الأفعال المنتهية بـ -ieren ليس فيها ge.|الأفعال التي تبدأ بـ be- أو ver- ليس فيها ge.|الأفعال المنفصلة: ge تأتي في الوسط.|هل ينتهي الجذر بـ t أو d؟ إذن تضيف et في النهاية.|haben و sein خاصّان جدا: gehabt و gewesen.|Partizip II دائما في النهاية، حتى في الجمل الطويلة.|الـ Perfekt (الماضي)|كيف نكوّن الـ Perfekt|Partizip II: الأفعال المنتظمة|Partizip II: الأفعال غير المنتظمة|haben أو sein؟|أخطاء شائعة|الاختبار النهائي|ما هو Partizip II؟|أي جملة صحيحة؟`,
  prs: `ماندن|تیلفون کردن|دیدن کردن|فهمیدن|پول پرداختن|سودا خریدن|از خواب برخاستن|به خواب رفتن|کار کردن|انتظار کشیدن|با Perfekt تعریف می‌کنی که چه اتفاق افتاده است. مثلاً دیروز یا هفتهٔ گذشته.|Perfekt دو بخش دارد: haben یا sein و Partizip II.|haben یا sein در جای دوم است. Partizip II در آخر جمله است.|haben و sein را مانند زمان حال صرف می‌کنی. Partizip II هیچ‌وقت تغییر نمی‌کند.|فعل‌های باقاعده: ge + ریشه + t.|پایانهٔ -en حذف می‌شود. بعد ge در اول و t در آخر می‌آید.|فعل‌های بی‌قاعده: ge + ریشه + en.|اکثراً حرف صدادار ریشه تغییر می‌کند. این شکل‌ها را از یاد کن.|بیشتر فعل‌ها Perfekt را با haben می‌سازند.|با sein: کسی از یک جا به جای دیگر می‌رود.|با sein: چیزی تغییر می‌کند. مثلاً از خواب برخاستن یا به خواب رفتن.|sein و bleiben هم Perfekt را با sein می‌سازند.|از خود بپرس: حرکت از A به B یا یک تغییر؟ پس sein. در غیر آن haben.|فعل‌هایی که به -ieren ختم می‌شوند ge ندارند.|فعل‌هایی که با be- یا ver- شروع می‌شوند ge ندارند.|فعل‌های جداشدنی: ge در وسط می‌آید.|آیا ریشه به t یا d ختم می‌شود؟ پس et در آخر می‌آید.|haben و sein خیلی خاص هستند: gehabt و gewesen.|Partizip II همیشه در آخر است، حتی در جمله‌های دراز.|Perfekt (زمان گذشته)|Perfekt چگونه ساخته می‌شود|Partizip II: فعل‌های باقاعده|Partizip II: فعل‌های بی‌قاعده|haben یا sein؟|اشتباهات رایج|آزمون نهایی|Partizip II آن چیست؟|کدام جمله درست است؟`,
  ps: `پاتې کېدل|ټیلیفون کول|لیدنه کول|پوهېدل|پیسې ورکول|سودا اخیستل|پاڅېدل|خوب وړل|کار کول|انتظار کول|د Perfekt په مرسته ته وایې چې څه پېښ شوي دي. د بېلګې په توګه پرون یا تېره اونۍ.|Perfekt دوه برخې لري: haben یا sein او Partizip II.|haben یا sein په دویم ځای کې دی. Partizip II د جملې په پای کې دی.|haben او sein لکه په اوسني زمان کې صرفوې. Partizip II هېڅکله نه بدلېږي.|منظم فعلونه: ge + ریښه + t.|پای -en لرې کېږي. بیا ge مخې ته او t پای ته راځي.|غیر منظم فعلونه: ge + ریښه + en.|ډېری وخت د ریښې واول بدلېږي. دا بڼې له یاده زده کړه.|ډېری فعلونه Perfekt له haben سره جوړوي.|له sein سره: یو څوک له یو ځای نه بل ځای ته ځي.|له sein سره: یو شی بدلېږي. د بېلګې په توګه پاڅېدل یا خوب وړل.|sein او bleiben هم Perfekt له sein سره جوړوي.|له ځانه پوښتنه وکړه: له A نه B ته حرکت دی که بدلون؟ نو sein. که نه، haben.|هغه فعلونه چې په -ieren پای ته رسېږي ge نه لري.|هغه فعلونه چې په be- یا ver- پیلېږي ge نه لري.|جلا کېدونکي فعلونه: ge په منځ کې راځي.|ایا ریښه په t یا d پای ته رسېږي؟ نو et پای ته راځي.|haben او sein ډېر ځانګړي دي: gehabt او gewesen.|Partizip II تل په پای کې وي، حتی په اوږدو جملو کې.|Perfekt (تېر زمان)|Perfekt څنګه جوړېږي|Partizip II: منظم فعلونه|Partizip II: غیر منظم فعلونه|haben که sein؟|عامې تېروتنې|وروستۍ ازموینه|Partizip II یې څه دی؟|کومه جمله سمه ده؟`,
  om: `turuu|bilbiluu|daawwachuu|hubachuu|kaffaluu|gabaa bituu|ka'uu|rafuu jalqabuu|hojii hojjechuu|eeguu|Perfekt'n waan ta'e himta. Fakkeenyaaf kaleessa ykn torban darbe.|Perfekt kutaa lama qaba: haben ykn sein fi Partizip II.|haben ykn sein bakka 2ffaa irra jira. Partizip II dhuma irra jira.|haben fi sein akka yeroo ammaatti jijjiirta. Partizip II gonkumaa hin jijjiiramu.|Gochimoota idilee: ge + hundee + t.|Dhumni -en ni bada. Achii ge fuula duratti, t dhumatti dhufa.|Gochimoota idilee hin taane: ge + hundee + en.|Yeroo baay'ee dubbachiiftuun hundee ni jijjiirama. Bifa kana qalbiin baradhu.|Gochimoonni baay'een Perfekt haben waliin ijaaru.|sein waliin: namni bakka tokko irraa gara bakka biraa deema.|sein waliin: wanti tokko ni jijjiirama. Fakkeenyaaf ka'uu ykn rafuu jalqabuu.|sein fi bleiben'is Perfekt sein waliin ijaaru.|Of gaafadhu: socho'iinsa A irraa gara B moo jijjiirama? Yoo ta'e sein. Yoo hin taane haben.|Gochimoonni -ieren'n dhuman ge hin qaban.|Gochimoonni be- ykn ver-'n jalqaban ge hin qaban.|Gochimoota addaan ba'an: ge gidduutti dhufa.|Hundeen t ykn d'n dhumaa? Yoos et dhumatti dhufa.|haben fi sein baay'ee addaa dha: gehabt fi gewesen.|Partizip II yeroo hunda dhuma irra jira, hima dheeraa keessattis.|Perfekt (yeroo darbe)|Akkaataa Perfekt itti ijaaramu|Partizip II: idilee|Partizip II: idilee hin taane|haben moo sein?|Dogoggora baramoo|Qormaata xumuraa|Partizip II isaa maali?|Himni kam sirrii dha?`,
  ti: `ምጽናሕ|ምድዋል|ምብጻሕ|ምርዳእ|ምኽፋል|ምዕዳግ|ምትንሳእ|ድቃስ ምውሳድ|ምስራሕ|ምጽባይ|ብ Perfekt እንታይ ከም ዝተፈጸመ ትነግሩ። ንኣብነት ትማሊ ወይ ዝሓለፈ ሰሙን።|Perfekt ክልተ ክፋላት ኣለዎ፦ haben ወይ sein ከምኡ'ውን Partizip II።|haben ወይ sein ኣብ ካልኣይ ቦታ ይርከብ። Partizip II ኣብ መወዳእታ እዩ።|haben ከምኡ'ውን sein ከም ኣብ ህሉው ግዜ ተርብሕዎ። Partizip II ፈጺሙ ኣይቕየርን።|ስሩዓት ግሲታት፦ ge + ሱር + t።|መወዳእታ -en ይወድቕ። ድሕሪኡ ge ኣብ መጀመርታ፡ t ኣብ መወዳእታ ይመጽእ።|ዘይስሩዓት ግሲታት፦ ge + ሱር + en።|መብዛሕትኡ ግዜ ኣናባቢ ሱር ይቕየር። እዞም ቅርጽታት ብልቢ ተማሃሩ።|መብዛሕትኦም ግሲታት Perfekt ምስ haben ይሰርሑ።|ምስ sein፦ ሓደ ሰብ ካብ ሓደ ቦታ ናብ ካልእ ቦታ ይኸይድ።|ምስ sein፦ ሓደ ነገር ይቕየር። ንኣብነት ምትንሳእ ወይ ድቃስ ምውሳድ።|sein ከምኡ'ውን bleiben እውን Perfekt ምስ sein ይሰርሑ።|ንርእስኹም ሕተቱ፦ ካብ A ናብ B ምንቅስቓስ ድዩ ወይስ ለውጢ? ሽዑ sein። እንተዘይኮነ haben።|ብ -ieren ዝውድኡ ግሲታት ge የብሎምን።|ብ be- ወይ ver- ዝጅምሩ ግሲታት ge የብሎምን።|ዝፈላለዩ ግሲታት፦ ge ኣብ ማእከል ይኣቱ።|ሱር ብ t ወይ d ድዩ ዝውዳእ? ሽዑ et ኣብ መወዳእታ ይመጽእ።|haben ከምኡ'ውን sein ፍሉያት እዮም፦ gehabt ከምኡ'ውን gewesen።|Partizip II ኩሉ ግዜ ኣብ መወዳእታ እዩ፡ ኣብ ነዋሕቲ ሓረጋት እውን።|Perfekt (ሕሉፍ ግዜ)|Perfekt ብኸመይ ይስራሕ|Partizip II፦ ስሩዓት ግሲታት|Partizip II፦ ዘይስሩዓት ግሲታት|haben ወይስ sein?|ተደጋገምቲ ጌጋታት|መወዳእታ ፈተና|Partizip II እንታይ እዩ?|ኣየናይ ሓረግ እዩ ቅኑዕ?`,
  so: `joogid|taleefan wicid|booqasho|fahmid|lacag bixin|wax iibsasho|kicid|seexasho|shaqayn|sugid|Perfekt waxaad ku sheegtaa waxa dhacay. Tusaale ahaan shalay ama toddobaadkii hore.|Perfekt wuxuu leeyahay laba qaybood: haben ama sein iyo Partizip II.|haben ama sein waxay ku jiraan meesha 2aad. Partizip II wuxuu ku jiraa dhammaadka.|haben iyo sein u rog sida xilliga joogtada ah. Partizip II weligii isma beddelo.|Falalka caadiga ah: ge + asal + t.|Dhammaadka -en waa la tuuraa. Kadib ge hore ayuu yimaadaa, t-na dhammaadka.|Falalka aan caadiga ahayn: ge + asal + en.|Inta badan shaqalka asalka ayaa isbeddela. Qaababkan xafid.|Falalka badankood Perfekt waxay ku sameeyaan haben.|sein: qof ayaa meel ka tagaya oo meel kale u socda.|sein: wax ayaa isbeddela. Tusaale ahaan kicid ama seexasho.|sein iyo bleiben sidoo kale Perfekt waxay ku sameeyaan sein.|Is weydii: dhaqdhaqaaq A ilaa B mise isbeddel? Markaas sein. Haddii kale haben.|Falalka ku dhammaada -ieren ma laha ge.|Falalka ku bilaabma be- ama ver- ma laha ge.|Falalka kala go'a: ge wuxuu galaa dhexda.|Asalku ma ku dhammaadaa t ama d? Markaas et ayaa dhammaadka la raaciyaa.|haben iyo sein aad bay u gaar yihiin: gehabt iyo gewesen.|Partizip II had iyo jeer wuxuu ku jiraa dhammaadka, xitaa jumlado dhaadheer.|Perfekt (wakhtiga tagay)|Sida loo sameeyo Perfekt|Partizip II: falal caadi ah|Partizip II: falal aan caadi ahayn|haben mise sein?|Khaladaadka caadiga ah|Imtixaanka ugu dambeeya|Partizip II-gu waa maxay?|Jumladee sax ah?`,
};

for (const [code, text] of Object.entries(PF_L1)) {
  const parts = text.split('|');
  const take = (n) => parts.splice(0, n);
  take(PF_NEW.length).forEach((t, i) => { PF_VERBS.find((v) => v.id === PF_NEW[i]).t[code] = t; });
  take(PF_RULE_KEYS.length).forEach((t, i) => { PF_RULES[PF_RULE_KEYS[i]][code] = t; });
  take(PF_UI_KEYS.length).forEach((t, i) => { STRINGS[PF_UI_KEYS[i]][code] = t; });
}

const pfVerb = (id) => PF_VERBS.find((v) => v.id === id);
const pfGroup = (...groups) => PF_VERBS.filter((v) => groups.includes(v.group));
const pfAuxVerb = (v) => verb(v.aux === 's' ? 'sein' : 'haben');
const pfAuxForm = (v, personKey) => conjugate(pfAuxVerb(v), personKey);

function pfSentence(v, personKey, rest = v.rest) {
  return `${capital(person(personKey).de)} ${pfAuxForm(v, personKey)} ${rest} ${v.part}.`;
}

// One sentence in its parts, so the screen can colour haben/sein and the Partizip II.
function pfFrame(id, personKey = 'ich', rest) {
  const v = pfVerb(id);
  return { start: capital(person(personKey).de), aux: pfAuxForm(v, personKey), middle: rest || v.rest, part: v.part };
}

const pfShown = (v) => `${v.de} → ${v.part}`;
const pfSaid = (v) => `${v.de}, ${v.part}`;

// ---- Exercise generators ----

const PQ = {
  partFromInf(list, rnd) {
    const v = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'pfPart', pic: v.pic, text: `${v.de} → ___`, answer: v.part,
      full: pfShown(v), say: pfSaid(v), feedbackL1: v.t, options: distinct(v.part, v.wrong, 3, rnd),
    };
  },
  partTyped(list, rnd) {
    const v = pickOne(list, rnd);
    return { kind: 'type', task: 'pfPart', pic: v.pic, text: `${v.de} → ___`, answer: v.part, full: pfShown(v), say: pfSaid(v), feedbackL1: v.t };
  },
  partFromSound(list, rnd) {
    const v = pickOne(list, rnd);
    return {
      kind: 'choice', task: 'listen', listen: v.part, answer: v.pic, pictures: true, pic: v.pic,
      full: pfShown(v), say: pfSaid(v), feedbackL1: v.t, options: distinct(v.pic, list.map((x) => x.pic), 4, rnd),
    };
  },
  gapPart(list, rnd, typed = false) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: p.key, pic: v.pic,
      text: `${capital(p.de)} ${pfAuxForm(v, p.key)} ${v.rest} ___.`, answer: v.part,
      full: pfSentence(v, p.key), feedbackL1: v.t, options: distinct(v.part, v.wrong, 3, rnd),
    };
  },
  aux(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = pfAuxForm(v, p.key);
    const other = conjugate(verb(v.aux === 's' ? 'haben' : 'sein'), p.key);
    return {
      kind: 'choice', task: 'pfAux', person: p.key, pic: v.pic, text: `${capital(p.de)} ___ ${v.rest} ${v.part}.`, answer,
      full: pfSentence(v, p.key), feedbackL1: v.t, options: shuffle([answer, other], rnd),
    };
  },
  // The right helper verb and the right person: ich habe, du hast, wir sind …
  auxForm(list, rnd, typed = false) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const answer = pfAuxForm(v, p.key);
    const other = verb(v.aux === 's' ? 'haben' : 'sein');
    const forms = ['ich', 'du', 'er', 'wir', 'ihr'].map((k) => conjugate(pfAuxVerb(v), k)).concat(conjugate(other, p.key));
    return {
      kind: typed ? 'type' : 'choice', task: 'gap', person: p.key, pic: v.pic, text: `${capital(p.de)} ___ ${v.rest} ${v.part}.`, answer,
      full: pfSentence(v, p.key), feedbackL1: v.t, options: distinct(answer, forms, 4, rnd),
    };
  },
  order(list, rnd) {
    const v = pickOne(list, rnd);
    const p = pickOne(PERSONS, rnd);
    const start = capital(p.de);
    const aux = pfAuxForm(v, p.key);
    const answer = pfSentence(v, p.key);
    return {
      kind: 'choice', task: 'pfOrder', person: p.key, pic: v.pic, answer, full: answer, feedbackL1: v.t,
      options: shuffle([answer, `${start} ${aux} ${v.part} ${v.rest}.`, `${start} ${v.part} ${v.rest} ${aux}.`], rnd),
    };
  },
  match(list, rnd) {
    const pairs = shuffle(list, rnd).slice(0, 4).map((v) => ({ left: v.de, right: v.part }));
    return { kind: 'match', task: 'match', pairs, full: '' };
  },
};

const PF_REGULAR = pfGroup('regular');
const PF_IRREGULAR = pfGroup('irregular');
const PF_BASIC = pfGroup('regular', 'irregular');
const PF_TRAPS = pfGroup('trap', 'special');
const PF_ALL = PF_VERBS;
const PF_SEIN = PF_VERBS.filter((v) => v.aux === 's');
// For haben-or-sein practice: every sein verb plus as many haben verbs, so guessing haben does not pay.
const PF_AUX_MIX = PF_SEIN.concat(PF_VERBS.filter((v) => v.aux === 'h').slice(0, PF_SEIN.length));

function pfLearn(v) {
  return { learn: { pic: v.pic, de: pfShown(v), say: pfSaid(v), t: v.t, example: pfFrame(v.id) } };
}

const pfStep = (rule, extra = {}) => ({ rule, map: PF_RULES, ...extra });

const PF_COURSE = [
  {
    section: 'pfBasics',
    stations: [
      {
        id: 'pf-was', kind: 'intro', title: 'Was ist das Perfekt?',
        steps: () => [
          pfStep('p1', { frame: pfFrame('spielen', 'ich', 'gestern Fussball') }),
          pfStep('p2', { frame: pfFrame('fahren', 'wir', 'nach Zürich') }),
          pfStep('p3', { frame: pfFrame('essen', 'ich', 'am Sonntag mit meiner Familie Pizza') }),
          pfStep('p4', { ptable: 'spielen' }),
          pfStep('p4', { ptable: 'gehen' }),
        ],
      },
      { id: 'pf-bau', kind: 'practice', title: 'Perfekt-Sätze bauen', questions: (r) => mix([(x) => PQ.order(PF_BASIC, x), (x) => PQ.auxForm(PF_BASIC, x)], 10, r) },
    ],
  },
  {
    section: 'pfRegular',
    stations: [
      {
        id: 'pf-reg', kind: 'learn', title: 'ge … t',
        steps: () => [pfStep('r1', { build: 'spielen' }), pfStep('r2', { build: 'kaufen' }), ...PF_REGULAR.map(pfLearn)],
        questions: (r) => mix([(x) => PQ.partFromInf(PF_REGULAR, x), (x) => PQ.partFromSound(PF_REGULAR, x)], 8, r),
      },
      {
        id: 'pf-reg-ueben', kind: 'practice', title: 'Regelmässige Partizipien',
        questions: (r) => mix([(x) => PQ.partFromInf(PF_REGULAR, x), (x) => PQ.match(PF_REGULAR, x), (x) => PQ.gapPart(PF_REGULAR, x), (x) => PQ.partFromSound(PF_REGULAR, x), (x) => PQ.partTyped(PF_REGULAR, x)], 14, r),
      },
      { id: 'pf-reg-test', kind: 'test', title: 'Partizip II: regelmässig', questions: (r) => mix([(x) => PQ.partTyped(PF_REGULAR, x), (x) => PQ.gapPart(PF_REGULAR, x, true), (x) => PQ.partFromSound(PF_REGULAR, x)], 10, r) },
    ],
  },
  {
    section: 'pfIrregular',
    stations: [
      {
        id: 'pf-ur', kind: 'learn', title: 'ge … en',
        steps: () => [pfStep('u1', { build: 'sehen' }), pfStep('u2', { parts: ['trinken', 'sprechen', 'gehen'] }), ...PF_IRREGULAR.map(pfLearn)],
        questions: (r) => mix([(x) => PQ.partFromInf(PF_IRREGULAR, x), (x) => PQ.partFromSound(PF_IRREGULAR, x)], 10, r),
      },
      {
        id: 'pf-ur-ueben', kind: 'practice', title: 'Unregelmässige Partizipien',
        questions: (r) => mix([(x) => PQ.partFromInf(PF_IRREGULAR, x), (x) => PQ.match(PF_IRREGULAR, x), (x) => PQ.gapPart(PF_IRREGULAR, x), (x) => PQ.partFromSound(PF_IRREGULAR, x), (x) => PQ.partTyped(PF_IRREGULAR, x)], 16, r),
      },
      {
        id: 'pf-mix-ueben', kind: 'practice', title: 'ge … t oder ge … en?',
        questions: (r) => mix([(x) => PQ.partFromInf(PF_BASIC, x), (x) => PQ.match(PF_BASIC, x), (x) => PQ.partTyped(PF_BASIC, x)], 12, r),
      },
      { id: 'pf-ur-test', kind: 'test', title: 'Partizip II: unregelmässig', questions: (r) => mix([(x) => PQ.partTyped(PF_IRREGULAR, x), (x) => PQ.gapPart(PF_IRREGULAR, x, true), (x) => PQ.partFromInf(PF_IRREGULAR, x)], 12, r) },
    ],
  },
  {
    section: 'pfAux',
    stations: [
      {
        id: 'pf-aux', kind: 'intro', title: 'Wann haben, wann sein?',
        steps: () => [
          pfStep('a1', { frame: pfFrame('lernen', 'ich', 'gestern Deutsch') }),
          pfStep('a2', { pic: '🚶', frame: pfFrame('gehen', 'ich', 'in die Schule') }),
          pfStep('a2', { pic: '🚗', frame: pfFrame('fahren', 'wir', 'mit dem Zug nach Zürich') }),
          pfStep('a3', { pic: '⏰', frame: pfFrame('aufstehen', 'ich', 'um sieben Uhr') }),
          pfStep('a4', { frame: pfFrame('sein', 'ich', 'gestern krank') }),
          pfStep('a4', { pic: '🛋️', frame: pfFrame('bleiben', 'ich', 'zu Hause') }),
          pfStep('a5'),
        ],
      },
      { id: 'pf-aux-ueben', kind: 'practice', title: 'haben oder sein?', questions: (r) => mix([(x) => PQ.aux(PF_AUX_MIX, x), (x) => PQ.auxForm(PF_AUX_MIX, x)], 14, r) },
      { id: 'pf-aux-test', kind: 'test', title: 'haben oder sein?', questions: (r) => mix([(x) => PQ.aux(PF_AUX_MIX, x), (x) => PQ.auxForm(PF_AUX_MIX, x, true)], 12, r) },
    ],
  },
  {
    section: 'pfTraps',
    stations: [
      {
        id: 'pf-trap', kind: 'learn', title: 'Achtung, Stolpersteine!',
        steps: () => [
          pfStep('t1', { parts: ['telefonieren'] }),
          pfStep('t2', { parts: ['besuchen', 'verstehen', 'bezahlen'] }),
          pfStep('t3', { parts: ['einkaufen', 'aufstehen', 'einschlafen'] }),
          pfStep('t4', { parts: ['arbeiten', 'warten'] }),
          pfStep('t5', { parts: ['haben', 'sein'] }),
          pfStep('t6', { frame: pfFrame('arbeiten', 'er', 'am Samstag lange im Restaurant') }),
          ...PF_TRAPS.map(pfLearn),
        ],
        questions: (r) => mix([(x) => PQ.partFromInf(PF_TRAPS, x)], 10, r),
      },
      {
        id: 'pf-trap-ueben', kind: 'practice', title: 'Stolpersteine üben',
        questions: (r) => mix([(x) => PQ.partFromInf(PF_TRAPS, x), (x) => PQ.gapPart(PF_TRAPS, x), (x) => PQ.match(PF_TRAPS, x), (x) => PQ.partTyped(PF_TRAPS, x), (x) => PQ.aux(PF_TRAPS, x), (x) => PQ.order(PF_TRAPS, x)], 16, r),
      },
      { id: 'pf-trap-test', kind: 'test', title: 'Stolpersteine', questions: (r) => mix([(x) => PQ.partTyped(PF_TRAPS, x), (x) => PQ.gapPart(PF_TRAPS, x, true), (x) => PQ.aux(PF_TRAPS, x)], 12, r) },
    ],
  },
  {
    section: 'pfFinal',
    stations: [
      { id: 'pf-wiederholen', kind: 'practice', title: 'Alles wiederholen', questions: (r) => mix([(x) => PQ.partFromInf(PF_ALL, x), (x) => PQ.aux(PF_ALL, x), (x) => PQ.order(PF_ALL, x), (x) => PQ.match(PF_ALL, x), (x) => PQ.gapPart(PF_ALL, x, true)], 16, r) },
      {
        id: 'pf-final', kind: 'test', title: 'Schlusstest Perfekt',
        questions: (r) => mix([(x) => PQ.partTyped(PF_ALL, x), (x) => PQ.auxForm(PF_ALL, x, true), (x) => PQ.gapPart(PF_ALL, x, true), (x) => PQ.order(PF_ALL, x)], 20, r),
      },
    ],
  },
];

const PF_STATIONS = PF_COURSE.flatMap((s) => s.stations);

if (typeof module !== 'undefined') module.exports = { PF_VERBS, PF_COURSE, PF_STATIONS, PQ, pfSentence };
