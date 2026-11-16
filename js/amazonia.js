// Lerneinheit «Amazonien» für den Besuch im Museum Rietberg. Konzept in docs/amazonia.md.
// Translations are AI drafts, in the order of AMZ_LANGS, separated by |.
const AMZ_LANGS = ['ar', 'prs', 'ps', 'ckb', 'om', 'ti', 'so', 'si', 'en', 'fr', 'tr'];

function amzT(de, rest) {
  const map = { de };
  rest.split('|').forEach((text, i) => { map[AMZ_LANGS[i]] = text.trim(); });
  return map;
}

Object.assign(STRINGS, {
  amzTitle: amzT('Museum Rietberg: Amazonien', `متحف ريتبرغ: الأمازون|موزیم ریتبرگ: آمازون|د ریټبرګ موزیم: امازون|مۆزەخانەی ریتبێرگ: ئەمازۆن|Muuziyeemii Rietberg: Amazoniyaa|ቤተ-መዘክር ሪትበርግ፦ ኣማዞንያ|Matxafka Rietberg: Amazonia|රීට්බර්ග් කෞතුකාගාරය: ඇමසෝනියාව|Museum Rietberg: Amazonia|Musée Rietberg : l'Amazonie|Rietberg Müzesi: Amazonya`),
  amzRead: amzT('Lesen in deiner Sprache', `اقرأ بلغتك|به زبان خودت بخوان|په خپله ژبه یې ولوله|بە زمانی خۆت بیخوێنەوە|Afaan keetiin dubbisi|ብቋንቋኹም ኣንብቡ|Ku akhri luqaddaada|ඔබේ භාෂාවෙන් කියවන්න|Read in your language|Lis dans ta langue|Kendi dilinde oku`),
  amzWords: amzT('Wörter lernen', `تعلّم الكلمات|کلمه‌ها را یاد بگیر|کلمې زده کړه|وشەکان فێربە|Jechoota baradhu|ቃላት ተማሃሩ|Baro ereyada|වචන ඉගෙන ගන්න|Learn the words|Apprends les mots|Kelimeleri öğren`),
  amzText: amzT('Lesen auf Deutsch', `اقرأ بالألمانية|به آلمانی بخوان|په الماني یې ولوله|بە ئەڵمانی بیخوێنەوە|Afaan Jarmaniitiin dubbisi|ብጀርመን ኣንብቡ|Ku akhri Jarmal|ජර්මන් භාෂාවෙන් කියවන්න|Read in German|Lis en allemand|Almanca oku`),
  amzRepeat: amzT('Nomen, Verben, Adjektive', `الأسماء والأفعال والصفات|اسم، فعل، صفت|نوم، فعل، صفت|ناو، کردار، ئاوەڵناو|Maqaa, gochima, ibsa maqaa|ስም፣ ግሲ፣ ቅጽል|Magac, fal, tilmaame|නාම, ක්‍රියා, විශේෂණ|Nouns, verbs, adjectives|Noms, verbes, adjectifs|İsim, fiil, sıfat`),
  amzMark: amzT('Wortarten anstreichen', `علّم أنواع الكلمات|نوع کلمه‌ها را نشانی کن|د کلمو ډولونه نښه کړه|جۆری وشەکان نیشان بکە|Gosa jechootaa mallattoo godhi|ዓይነት ቃላት ምልክት ግበሩ|Calaamadee noocyada ereyada|වචන වර්ග සලකුණු කරන්න|Mark the word types|Marque les types de mots|Kelime türlerini işaretle`),
  amzHover: amzT('Zeig auf ein Wort. Dann siehst du es in deiner Sprache.', `أشر إلى كلمة. عندها تراها بلغتك.|روی یک کلمه برو. آنگاه آن را به زبان خودت می‌بینی.|پر یوه کلمه ودرېږه. بیا یې په خپله ژبه وینې.|ئاماژە بۆ وشەیەک بکە. ئینجا بە زمانی خۆت دەیبینیت.|Jecha tokko agarsiisi. Achiis afaan keetiin argita.|ናብ ሓንቲ ቃል ኣመልክቱ። ሽዑ ብቋንቋኹም ክትርእይዋ ኢኹም።|Tilmaan eray. Markaas waxaad ku arkaysaa luqaddaada.|වචනයක් පෙන්වන්න. එවිට ඔබට එය ඔබේ භාෂාවෙන් පෙනේ.|Point at a word. Then you see it in your language.|Montre un mot. Tu le vois alors dans ta langue.|Bir kelimeyi göster. O zaman onu kendi dilinde görürsün.`),
  amzMarkHelp: amzT('Wähle ein Zeichen. Klick dann auf die Wörter.', `اختر علامة. ثم انقر على الكلمات.|یک نشانه انتخاب کن. بعد روی کلمه‌ها کلیک کن.|یوه نښه وټاکه. بیا پر کلمو کلیک وکړه.|نیشانەیەک هەڵبژێرە. پاشان کرتە لە وشەکان بکە.|Mallattoo tokko filadhu. Achiis jechoota tuqi.|ሓደ ምልክት ምረጹ። ድሕሪኡ ኣብ ቃላት ጠውቑ።|Dooro calaamad. Kadib riix ereyada.|සලකුණක් තෝරන්න. ඉන්පසු වචන මත ක්ලික් කරන්න.|Choose a mark. Then click on the words.|Choisis un signe. Puis clique sur les mots.|Bir işaret seç. Sonra kelimelere tıkla.`),
  noun: amzT('Nomen', `اسم|اسم|نوم|ناو|Maqaa|ስም|Magac|නාම පදය|Noun|Nom|İsim`),
  verb: amzT('Verb', `فعل|فعل|فعل|کردار|Gochima|ግሲ|Fal|ක්‍රියා පදය|Verb|Verbe|Fiil`),
  adjective: amzT('Adjektiv', `صفة|صفت|صفت|ئاوەڵناو|Ibsa maqaa|ቅጽል|Tilmaame|නාම විශේෂණය|Adjective|Adjectif|Sıfat`),
  eraser: amzT('Radiergummi', `ممحاة|پاک‌کن|پاکوونکی|سڕەرەوە|Haqxuu|መደምሰሲ|Tirtire|මකනය|Eraser|Gomme|Silgi`),
  whichKind: amzT('Welche Wortart ist das?', `ما نوع هذه الكلمة؟|این چه نوع کلمه است؟|دا د کلمې کوم ډول دی؟|ئەمە چ جۆرە وشەیەکە؟|Kun gosa jechaa kami?|እዚ እንታይ ዓይነት ቃል እዩ?|Waa noocee erey?|මෙය කුමන වචන වර්ගයද?|What type of word is this?|Quel type de mot est-ce ?|Bu hangi kelime türü?`),
  amzMissing: amzT('Gestrichelt: Dieses Wort fehlt noch.', `خط متقطع: هذه الكلمة ما زالت ناقصة.|خط‌چین: این کلمه هنوز کم است.|ټکي ټکي کرښه: دا کلمه لا پاتې ده.|هێڵی پچڕپچڕ: ئەم وشەیە هێشتا ماوە.|Sarara cittaa: Jechi kun ammallee hir'ata.|ነጠብጣብ መስመር፦ እዛ ቃል ገና ጎዲላ።|Xarriiq go'go'an: Eraygan weli waa maqan yahay.|කඩ ඉර: මෙම වචනය තවම නැත.|Dashed line: this word is still missing.|Pointillés : ce mot manque encore.|Kesik çizgi: Bu kelime hâlâ eksik.`),
  amzWrong: amzT('Durchgestrichen: Dieses Zeichen stimmt nicht.', `مشطوب: هذه العلامة غير صحيحة.|خط‌خورده: این نشانه درست نیست.|کرښه پرې: دا نښه سمه نه ده.|هێڵی پێدا هاتوو: ئەم نیشانەیە هەڵەیە.|Sararaan haqame: Mallattoon kun sirrii miti.|ዝተሰርዘ፦ እዚ ምልክት ቅኑዕ ኣይኮነን።|La tirtiray: Calaamaddan sax maaha.|කපා හැර ඇත: මෙම සලකුණ වැරදියි.|Crossed out: this mark is not right.|Barré : ce signe n'est pas juste.|Üstü çizili: Bu işaret doğru değil.`),
  amzAllWords: amzT('Alle Wörter üben', `تدرّب على كل الكلمات|همه کلمه‌ها را تمرین کن|ټولې کلمې تمرین کړه|ڕاهێنان لەسەر هەموو وشەکان بکە|Jechoota hunda shaakali|ኩሎም ቃላት ተለማመዱ|Ku celceli dhammaan ereyada|සියලු වචන පුහුණු වන්න|Practise all words|Entraîne-toi avec tous les mots|Tüm kelimeleri çalış`),
  amzAgain: amzT('Nochmals', `مرة أخرى|دوباره|بیا|دووبارە|Irra deebi'i|እንደገና|Mar kale|නැවත|Again|Encore|Tekrar`),
});

// Text 1, read in the student's own language before the German work starts.
const AMZ_TEXT1 = {
  de: [
    'Amazonien ist ein sehr grosses Gebiet in Südamerika. Es liegt in neun Ländern: Brasilien, Peru, Kolumbien, Venezuela, Ecuador, Bolivien, Guyana, Suriname und Französisch-Guayana (es gehört zu Frankreich). Dort gibt es einen riesigen Regenwald und viele Flüsse. Der grösste Fluss heisst Amazonas.',
    'Der Regenwald ist wichtig für die ganze Welt: Hier leben sehr viele verschiedene Tiere und Pflanzen, und die Bäume speichern viel CO₂. Das hilft gegen den Klimawandel. Aber der Regenwald ist in Gefahr: Menschen fällen und verbrennen Bäume, um Platz für Kühe, Felder und Minen zu machen.',
    'Viele Leute denken, im Regenwald haben früher keine Menschen gewohnt. Das stimmt nicht. Seit mindestens 13\'000 Jahren leben Menschen in Amazonien. Sie bauten Dörfer und sogar Städte. Heute sind diese alten Städte unter den Bäumen versteckt. Man findet sie mit Lasern. Ein Laser ist ein sehr starkes, gerades Licht. Ein Flugzeug fliegt über den Wald und schickt Laserlicht nach unten. Das Licht kommt zwischen den Blättern hindurch bis zum Boden. So sieht man die alten Häuser, Wege und Mauern unter den Bäumen.',
    'Die Menschen machten schöne Kunst: Töpfe aus Ton mit Figuren von Menschen und Vögeln, Schmuck in Form von Fröschen und grosse Bilder auf Felsen.',
    'Auch heute leben viele indigene Gemeinschaften im Regenwald. Sie kennen den Wald sehr gut. Für sie gehören Menschen, Tiere und Pflanzen zusammen. Sie bemalen ihren Körper mit Farben aus Pflanzen und tragen Schmuck aus Federn.',
    'Das Museum Rietberg in Zürich zeigt diese Kunst.',
  ],
  ar: [
    'الأمازون منطقة كبيرة جدًا في أمريكا الجنوبية. تمتد في تسع دول: البرازيل، بيرو، كولومبيا، فنزويلا، الإكوادور، بوليفيا، غيانا، سورينام وغويانا الفرنسية (وهي تابعة لفرنسا). فيها غابة مطيرة ضخمة وأنهار كثيرة. أكبر نهر اسمه نهر الأمازون.',
    'الغابة المطيرة مهمة للعالم كله: يعيش فيها عدد كبير جدًا من الحيوانات والنباتات المختلفة، والأشجار تخزّن كثيرًا من ثاني أكسيد الكربون (CO₂). هذا يساعد ضد تغيّر المناخ. لكن الغابة المطيرة في خطر: يقطع الناس الأشجار ويحرقونها ليفسحوا المكان للأبقار والحقول والمناجم.',
    'يعتقد كثير من الناس أن أحدًا لم يعش في الغابة المطيرة في الماضي. هذا غير صحيح. يعيش الناس في الأمازون منذ 13000 سنة على الأقل. بنوا قرى بل ومدنًا أيضًا. اليوم هذه المدن القديمة مخفية تحت الأشجار. يجدونها باستخدام الليزر. الليزر ضوء قوي جدًا ومستقيم. تطير طائرة فوق الغابة وترسل ضوء الليزر إلى الأسفل. يمرّ الضوء بين الأوراق حتى يصل إلى الأرض. هكذا نرى البيوت والطرق والجدران القديمة تحت الأشجار.',
    'صنع هؤلاء الناس فنًا جميلًا: أواني من الطين عليها أشكال بشر وطيور، وحُليًّا على شكل ضفادع، ورسومًا كبيرة على الصخور.',
    'وما زالت اليوم مجتمعات كثيرة من السكان الأصليين تعيش في الغابة المطيرة. إنهم يعرفون الغابة جيدًا. بالنسبة لهم، الإنسان والحيوان والنبات ينتمون إلى بعضهم. يرسمون على أجسادهم بألوان من النباتات، ويلبسون حُليًّا من الريش.',
    'يعرض متحف ريتبرغ في زيورخ هذا الفن.',
  ],
  prs: [
    'آمازون یک منطقهٔ بسیار بزرگ در امریکای جنوبی است. این منطقه در نُه کشور قرار دارد: برازیل، پیرو، کلمبیا، ونزوئلا، اکوادور، بولیویا، گویان، سورینام و گویان فرانسه (که به فرانسه تعلق دارد). در آنجا یک جنگل بارانی بسیار بزرگ و دریاهای زیادی است. بزرگترین دریا آمازون نام دارد.',
    'جنگل بارانی برای تمام جهان مهم است: در اینجا حیوانات و گیاهان بسیار گوناگونی زندگی می‌کنند و درختان مقدار زیادی CO₂ را ذخیره می‌کنند. این کار در برابر تغییر اقلیم کمک می‌کند. اما جنگل بارانی در خطر است: مردم درختان را قطع می‌کنند و می‌سوزانند تا برای گاوها، کشتزارها و معدن‌ها جا باز کنند.',
    'بسیاری از مردم فکر می‌کنند که در گذشته کسی در جنگل بارانی زندگی نمی‌کرد. این درست نیست. انسان‌ها دست‌کم از ۱۳۰۰۰ سال پیش در آمازون زندگی می‌کنند. آن‌ها قریه‌ها و حتی شهرها ساختند. امروز این شهرهای کهنه زیر درختان پنهان هستند. آن‌ها را با لیزر پیدا می‌کنند. لیزر یک نور بسیار قوی و مستقیم است. یک طیاره بالای جنگل پرواز می‌کند و نور لیزر را به پایین می‌فرستد. نور از میان برگ‌ها تا زمین می‌رسد. این‌طور خانه‌ها، راه‌ها و دیوارهای کهنه زیر درختان دیده می‌شوند.',
    'این مردم هنر زیبا ساختند: کوزه‌های گلی با شکل انسان و پرنده، زیورات به شکل بقه و نقاشی‌های بزرگ روی سنگ‌ها.',
    'امروز هم بسیاری از جوامع بومی در جنگل بارانی زندگی می‌کنند. آن‌ها جنگل را خیلی خوب می‌شناسند. برای آن‌ها انسان، حیوان و گیاه به هم تعلق دارند. آن‌ها بدن خود را با رنگ‌هایی از گیاهان رنگ می‌کنند و زیورات پَری می‌پوشند.',
    'موزیم ریتبرگ در زوریخ این هنر را نشان می‌دهد.',
  ],
  ps: [
    'امازون په سوېلي امریکا کې یوه ډېره لویه سیمه ده. دا په نهو هېوادونو کې پرته ده: برازیل، پیرو، کولمبیا، وینزویلا، اکوادور، بولیویا، ګیانا، سورینام او فرانسوي ګیانا (چې د فرانسې برخه ده). هلته یو ډېر لوی باراني ځنګل او ډېر سیندونه دي. تر ټولو لوی سیند امازون نومېږي.',
    'باراني ځنګل د ټولې نړۍ لپاره مهم دی: دلته ډېر بېلابېل ژوي او بوټي ژوند کوي، او ونې ډېر CO₂ ساتي. دا د اقلیم د بدلون پر وړاندې مرسته کوي. خو باراني ځنګل له خطر سره مخ دی: خلک ونې پرې کوي او سوځوي، څو د غواګانو، کروندو او کانونو لپاره ځای جوړ کړي.',
    'ډېر خلک فکر کوي چې پخوا په باراني ځنګل کې هېڅوک نه اوسېدل. دا سمه نه ده. خلک لږ تر لږه ۱۳۰۰۰ کاله په امازون کې اوسېږي. هغوی کلي او حتی ښارونه جوړ کړل. نن دا زاړه ښارونه د ونو لاندې پټ دي. هغه په لېزر سره پیدا کوي. لېزر ډېره قوي او سمه رڼا ده. یوه الوتکه د ځنګل پر سر الوزي او لېزري رڼا ښکته لېږي. رڼا د پاڼو له منځه تر ځمکې پورې رسېږي. داسې د ونو لاندې زاړه کورونه، لارې او دېوالونه لیدل کېږي.',
    'دې خلکو ښکلی هنر جوړ کړ: د خټو لوښي چې پر هغو د انسانانو او مرغانو شکلونه دي، د چنګښو په شکل ګاڼې او پر ډبرو لوی انځورونه.',
    'نن هم ډېرې بومي ټولنې په باراني ځنګل کې ژوند کوي. دوی ځنګل ډېر ښه پېژني. د دوی لپاره انسانان، ژوي او بوټي سره یو ځای دي. دوی خپل بدنونه د بوټو له رنګونو رنګوي او د بڼکو ګاڼې اغوندي.',
    'په زوریخ کې د ریټبرګ موزیم دا هنر ښیي.',
  ],
  ckb: [
    'ئەمازۆن ناوچەیەکی زۆر گەورەیە لە ئەمریکای باشوور. لە نۆ وڵاتدا هەیە: بەڕازیل، پیرو، کۆلۆمبیا، ڤەنزوێلا، ئێکوادۆر، بۆلیڤیا، گوویانا، سورینام و گوویانای فەڕەنسی (کە سەر بە فەڕەنسایە). لەوێ دارستانێکی بارانیی زۆر گەورە و چەندین ڕووبار هەن. گەورەترین ڕووبار ناوی ئەمازۆنە.',
    'دارستانی بارانی بۆ هەموو جیهان گرنگە: لێرە ئاژەڵ و ڕووەکی زۆر جۆراوجۆر دەژین، و دارەکان بڕێکی زۆر CO₂ هەڵدەگرن. ئەمە دژی گۆڕانی کەشوهەوا یارمەتی دەدات. بەڵام دارستانی بارانی لە مەترسیدایە: خەڵک دار دەبڕن و دەیسووتێنن بۆ ئەوەی شوێن بۆ مانگا، کێڵگە و کان بکەنەوە.',
    'زۆر کەس وا بیر دەکەنەوە کە لە ڕابردوودا کەس لە دارستانی بارانیدا نەژیاوە. ئەمە ڕاست نییە. مرۆڤەکان لانیکەم ١٣٠٠٠ ساڵە لە ئەمازۆن دەژین. ئەوان گوند و تەنانەت شاریشیان دروست کرد. ئەمڕۆ ئەم شارە کۆنانە لە ژێر دارەکاندا شاراونەتەوە. بە لەیزەر دەیاندۆزنەوە. لەیزەر ڕووناکییەکی زۆر بەهێز و ڕاستە. فڕۆکەیەک بەسەر دارستاندا دەفڕێت و تیشکی لەیزەر بۆ خوارەوە دەنێرێت. ڕووناکییەکە لە نێوان گەڵاکاندا تا زەوی دەگات. بەم شێوەیە ماڵ و ڕێگا و دیوارە کۆنەکان لە ژێر دارەکاندا دەبینرێن.',
    'ئەم خەڵکە هونەری جوانیان دروست کرد: مەنجەڵی قوڕین بە وێنەی مرۆڤ و باڵندە، خشڵ بە شێوەی بۆق، و وێنەی گەورە لەسەر بەردەکان.',
    'ئەمڕۆش زۆر کۆمەڵگەی ڕەسەن لە دارستانی بارانیدا دەژین. ئەوان دارستان زۆر باش دەناسن. بۆ ئەوان مرۆڤ و ئاژەڵ و ڕووەک پێکەوە سەر بە یەکن. لەشیان بە ڕەنگی ڕووەک ڕەنگ دەکەن و خشڵی پەڕ لەبەر دەکەن.',
    'مۆزەخانەی ریتبێرگ لە زووریخ ئەم هونەرە پیشان دەدات.',
  ],
  om: [
    'Amazoniyaan naannoo baay\'ee guddaa Ameerikaa Kibbaa keessatti argamu dha. Biyyoota sagal keessa jira: Biraazil, Peeruu, Kolombiyaa, Veenezuweelaa, Ekuwaador, Booliiviyaa, Gaayaanaa, Surinaam fi Gaayaanaa Faransaayii (kan Faransaayitti hirkatu). Achitti bosona roobaa guddaa fi laggeen baay\'eetu jira. Laggi hundarra guddaan Amazon jedhama.',
    'Bosonni roobaa addunyaa guutuuf barbaachisaa dha: as bineensonnii fi biqiltoonni gosa adda addaa baay\'een jiraatu, mukeenis CO₂ baay\'ee kuusu. Kun jijjiirama qilleensaa ittisuuf gargaara. Garuu bosonni roobaa balaa keessa jira: namoonni loonii, maasii fi albuudaaf bakka argachuuf mukeen muranii gubu.',
    'Namoonni baay\'een durii bosona roobaa keessa namni hin jiraanne jedhanii yaadu. Kun dhugaa miti. Namoonni yoo xiqqaate waggaa 13,000f Amazoniyaa keessa jiraachaa jiru. Isaan gandoota fi magaalota illee ijaaran. Har\'a magaalonni durii kun mukeen jala dhokatanii jiru. Leezeriin argamu. Leezerri ifa baay\'ee jabaa fi qajeelaa dha. Xiyyaarri tokko bosona irra balali\'ee ifa leezerii gara gadiitti erga. Ifni sun baala gidduun darbee hanga lafaatti ga\'a. Akkasitti manneen, karaawwanii fi dallaawwan durii mukeen jala jiran ni mul\'atu.',
    'Namoonni kun aartii bareedaa hojjetan: okkotee suphee fakkii namaa fi simbirroo qaban, faayaa boca raacitii fi fakkiiwwan gurguddaa dhagaa irratti.',
    'Har\'as hawaasni qe\'ee baay\'een bosona roobaa keessa jiraata. Isaan bosona sana baay\'ee beeku. Isaaniif namni, bineensii fi biqiltuun waliin jiru. Qaama isaanii halluu biqiltootaatiin dibu, faayaa baallee irraa hojjetame ni kaawwatu.',
    'Muuziyeemiin Rietberg kan Zuurik aartii kana agarsiisa.',
  ],
  ti: [
    'ኣማዞንያ ኣብ ደቡብ ኣሜሪካ ዘሎ ኣዝዩ ዓቢ ከባቢ እዩ። ኣብ ትሽዓተ ሃገራት ይርከብ፦ ብራዚል፣ ፔሩ፣ ኮሎምብያ፣ ቬኔዝዌላ፣ ኢኳዶር፣ ቦሊቭያ፣ ጉያና፣ ሱሪናም ከምኡውን ፈረንሳዊት ጉያና (ናይ ፈረንሳ እያ)። ኣብኡ ኣዝዩ ዓቢ ናይ ዝናብ ጫካን ብዙሓት ሩባታትን ኣለዉ። እቲ ዝዓበየ ሩባ ኣማዞን ይበሃል።',
    'ናይ ዝናብ ጫካ ንመላእ ዓለም ኣገዳሲ እዩ፦ ኣብዚ ኣዝዮም ብዙሓት ዝተፈላለዩ እንስሳታትን ተኽልታትን ይነብሩ፣ ኦማት ድማ ብዙሕ CO₂ ይዕቅቡ። እዚ ኣንጻር ለውጢ ክሊማ ይሕግዝ። ግን ናይ ዝናብ ጫካ ኣብ ሓደጋ ኣሎ፦ ሰባት ንኣሓ፣ ንግራውሕን ንዕድናትን ቦታ ንምርካብ ኦማት ይቖርጹን የቃጽሉን።',
    'ብዙሓት ሰባት ኣብ ዝሓለፈ ግዜ ኣብ ናይ ዝናብ ጫካ ሰብ ኣይነበረን ኢሎም ይሓስቡ። እዚ ሓቂ ኣይኮነን። ሰባት እንተወሓደ ን13,000 ዓመት ኣብ ኣማዞንያ ይነብሩ ኣለዉ። ዓድታት ጥራይ ዘይኮነስ ከተማታት እውን ሰሪሖም። ሎሚ እዘን ጥንታውያን ከተማታት ኣብ ትሕቲ ኦማት ተሓቢአን ኣለዋ። ብሌዘር ይርከባ። ሌዘር ኣዝዩ ሓያልን ቀጥታውን ብርሃን እዩ። ሓንቲ ነፋሪት ኣብ ልዕሊ ጫካ ትነፍር እሞ ብርሃን ሌዘር ናብ ታሕቲ ትሰድድ። እቲ ብርሃን ኣብ መንጎ ቆጽሊ ሓሊፉ ክሳብ መሬት ይበጽሕ። ከምዚ ጌርካ ኣብ ትሕቲ ኦማት ዘለዉ ጥንታውያን ኣባይቲ፣ መገድታትን መናድቕን ይረኣዩ።',
    'እዞም ሰባት ጽቡቕ ስነ-ጥበብ ሰሪሖም፦ ናይ ሰባትን ኣዕዋፍን ምስሊ ዘለዎ ናይ ጭቃ ኣቕሑ፣ ከም ዕንቍርቝር ዝመስል ስልማትን ኣብ ከውሒ ዝተሳእሉ ዓበይቲ ስእልታትን።',
    'ሎሚ እውን ብዙሓት ማሕበረሰባት ደቀባት ኣብ ናይ ዝናብ ጫካ ይነብሩ። ንጫካ ኣጸቢቖም ይፈልጥዎ። ንዓታቶም ሰብ፣ እንስሳን ተኽልን ብሓባር እዮም። ኣካላቶም ካብ ተኽልታት ብዝተሰርሐ ሕብሪ ይቕብኡ፣ ካብ ክንቲት ዝተሰርሐ ስልማት ድማ ይገብሩ።',
    'ኣብ ዙሪክ ዘሎ ቤተ-መዘክር ሪትበርግ ነዚ ስነ-ጥበብ የርኢ።',
  ],
  so: [
    'Amazonia waa gobol aad u weyn oo ku yaal Koonfurta Ameerika. Waxay ku taal sagaal waddan: Baraasiil, Peru, Kolombiya, Fenesuweyla, Ecuador, Boliifiya, Guyana, Suriname iyo Guyana Faransiiska (waxay ka tirsan tahay Faransiiska). Halkaas waxaa ku yaal kayn roobaad aad u weyn iyo webiyo badan. Webiga ugu weyn waxaa la yiraahdaa Amazon.',
    'Kaynta roobaadku waa muhiim adduunka oo dhan: halkan waxaa ku nool xayawaan iyo dhir aad u badan oo kala duwan, geedahuna waxay kaydiyaan CO₂ badan. Tani waxay ka caawisaa isbeddelka cimilada. Laakiin kaynta roobaadku khatar ayay ku jirtaa: dadku waxay jaraan oo gubaan geedaha si ay meel ugu helaan lo\'da, beeraha iyo macdanta.',
    'Dad badan waxay u maleeyaan in hore cidna ku noolayn kaynta roobaadka. Taasi run maaha. Dadku ugu yaraan 13,000 sano ayay ku noolaayeen Amazonia. Waxay dhiseen tuulooyin iyo xataa magaalooyin. Maanta magaalooyinkan hore waxay ku qarsoon yihiin geedaha hoostooda. Waxaa lagu helaa leysar. Leysarku waa iftiin aad u xooggan oo toosan. Diyaarad ayaa dul maraysa kaynta oo iftiinka leysarka hoos u dirta. Iftiinku wuxuu ka dhex gudbaa caleemaha ilaa uu dhulka gaaro. Sidaas ayaa lagu arkaa guryihii hore, waddooyinka iyo derbiyada geedaha hoostooda ku jira.',
    'Dadkaasi waxay sameeyeen farshaxan qurux badan: dheryo dhoobo ah oo leh sawirro dad iyo shimbiro, qurxin u eg rah, iyo sawirro waaweyn oo dhagaxyada ku yaal.',
    'Maanta sidoo kale bulshooyin badan oo asal ah ayaa ku nool kaynta roobaadka. Aad bay u yaqaanaan kaynta. Iyaga ahaan dadka, xayawaanka iyo dhirtu way wada jiraan. Jidhkooda waxay ku rinjiyeeyaan midabo laga sameeyay dhir, waxayna xidhaan qurxin baalal laga sameeyay.',
    'Matxafka Rietberg ee Zürich wuxuu soo bandhigaa farshaxankan.',
  ],
  si: [
    'ඇමසෝනියාව දකුණු ඇමරිකාවේ ඉතා විශාල ප්‍රදේශයකි. එය රටවල් නවයක පැතිර ඇත: බ්‍රසීලය, පේරු, කොලොම්බියාව, වෙනිසියුලාව, ඉක්වදෝරය, බොලීවියාව, ගයනාව, සුරිනාමය සහ ප්‍රංශ ගයනාව (එය ප්‍රංශයට අයත් ය). එහි ඉතා විශාල වැසි වනාන්තරයක් සහ ගංගා රාශියක් ඇත. විශාලතම ගඟ ඇමසන් ලෙස හැඳින්වේ.',
    'වැසි වනාන්තරය මුළු ලෝකයටම වැදගත් ය: මෙහි විවිධ සතුන් සහ ශාක ඉතා විශාල සංඛ්‍යාවක් ජීවත් වන අතර ගස් CO₂ විශාල ප්‍රමාණයක් ගබඩා කරයි. මෙය දේශගුණික විපර්යාසවලට එරෙහිව උපකාරී වේ. නමුත් වැසි වනාන්තරය අනතුරේ ය: ගවයින්, කෙත් සහ පතල් සඳහා ඉඩ සෑදීමට මිනිසුන් ගස් කපා පුළුස්සා දමති.',
    'අතීතයේ වැසි වනාන්තරයේ කිසිවෙක් ජීවත් නොවූ බව බොහෝ දෙනා සිතති. එය සත්‍ය නොවේ. අවම වශයෙන් වසර 13,000ක සිට මිනිසුන් ඇමසෝනියාවේ ජීවත් වෙති. ඔවුන් ගම් සහ නගර පවා ඉදි කළහ. අද මෙම පැරණි නගර ගස් යට සැඟවී ඇත. ඒවා ලේසර් මගින් සොයා ගනී. ලේසර් යනු ඉතා ප්‍රබල, සෘජු ආලෝකයකි. ගුවන් යානයක් වනාන්තරය උඩින් පියාසර කර ලේසර් ආලෝකය පහළට යවයි. ආලෝකය කොළ අතරින් බිම දක්වා යයි. මේ ආකාරයට ගස් යට ඇති පැරණි නිවාස, මාර්ග සහ තාප්ප දැකිය හැක.',
    'මෙම මිනිසුන් ලස්සන කලා කෘති නිර්මාණය කළහ: මිනිසුන්ගේ සහ කුරුල්ලන්ගේ රූප සහිත මැටි භාජන, ගෙම්බන්ගේ හැඩයෙන් යුත් ආභරණ සහ ගල් මත විශාල චිත්‍ර.',
    'අදත් බොහෝ ආදිවාසී ප්‍රජාවන් වැසි වනාන්තරයේ ජීවත් වෙති. ඔවුන් වනාන්තරය ඉතා හොඳින් දනිති. ඔවුන්ට මිනිසුන්, සතුන් සහ ශාක එකට අයත් ය. ඔවුන් ශාකවලින් ලබාගත් වර්ණවලින් සිරුර පින්තාරු කරන අතර පිහාටුවලින් සැදූ ආභරණ පළඳිති.',
    'සූරිච්හි රීට්බර්ග් කෞතුකාගාරය මෙම කලාව පෙන්වයි.',
  ],
  en: [
    'Amazonia is a very large region in South America. It lies in nine countries: Brazil, Peru, Colombia, Venezuela, Ecuador, Bolivia, Guyana, Suriname and French Guiana (it belongs to France). There is a huge rainforest and many rivers. The biggest river is called the Amazon.',
    'The rainforest is important for the whole world: very many different animals and plants live here, and the trees store a lot of CO₂. This helps against climate change. But the rainforest is in danger: people cut down and burn trees to make room for cows, fields and mines.',
    'Many people think that nobody lived in the rainforest in the past. That is not true. People have lived in Amazonia for at least 13,000 years. They built villages and even cities. Today these old cities are hidden under the trees. They are found with lasers. A laser is a very strong, straight light. A plane flies over the forest and sends laser light down. The light gets through between the leaves all the way to the ground. This way you can see the old houses, paths and walls under the trees.',
    'The people made beautiful art: clay pots with figures of people and birds, jewellery in the shape of frogs, and large pictures on rocks.',
    'Today, many Indigenous communities still live in the rainforest. They know the forest very well. For them, people, animals and plants belong together. They paint their bodies with colours from plants and wear jewellery made of feathers.',
    'The Museum Rietberg in Zurich shows this art.',
  ],
  fr: [
    'L\'Amazonie est une très grande région d\'Amérique du Sud. Elle s\'étend sur neuf pays : le Brésil, le Pérou, la Colombie, le Venezuela, l\'Équateur, la Bolivie, le Guyana, le Suriname et la Guyane française (elle fait partie de la France). Il y a une immense forêt tropicale et beaucoup de fleuves. Le plus grand fleuve s\'appelle l\'Amazone.',
    'La forêt tropicale est importante pour le monde entier : de très nombreux animaux et plantes différents y vivent, et les arbres stockent beaucoup de CO₂. Cela aide à lutter contre le changement climatique. Mais la forêt tropicale est en danger : des gens abattent et brûlent des arbres pour faire de la place aux vaches, aux champs et aux mines.',
    'Beaucoup de gens pensent que personne ne vivait autrefois dans la forêt tropicale. Ce n\'est pas vrai. Des êtres humains vivent en Amazonie depuis au moins 13 000 ans. Ils ont construit des villages et même des villes. Aujourd\'hui, ces anciennes villes sont cachées sous les arbres. On les trouve avec des lasers. Un laser est une lumière très forte et droite. Un avion vole au-dessus de la forêt et envoie de la lumière laser vers le bas. La lumière passe entre les feuilles jusqu\'au sol. On voit ainsi les anciennes maisons, les chemins et les murs sous les arbres.',
    'Ces personnes ont créé de belles œuvres d\'art : des pots en argile avec des figures d\'humains et d\'oiseaux, des bijoux en forme de grenouille et de grandes peintures sur les rochers.',
    'Aujourd\'hui encore, beaucoup de communautés autochtones vivent dans la forêt tropicale. Elles connaissent très bien la forêt. Pour elles, les humains, les animaux et les plantes vont ensemble. Elles se peignent le corps avec des couleurs tirées des plantes et portent des bijoux en plumes.',
    'Le musée Rietberg à Zurich montre cet art.',
  ],
  tr: [
    'Amazonya, Güney Amerika\'da çok büyük bir bölgedir. Dokuz ülkeye yayılır: Brezilya, Peru, Kolombiya, Venezuela, Ekvador, Bolivya, Guyana, Surinam ve Fransız Guyanası (Fransa\'ya aittir). Orada çok büyük bir yağmur ormanı ve birçok nehir vardır. En büyük nehrin adı Amazon\'dur.',
    'Yağmur ormanı bütün dünya için önemlidir: Burada çok sayıda farklı hayvan ve bitki yaşar ve ağaçlar çok miktarda CO₂ depolar. Bu, iklim değişikliğine karşı yardımcı olur. Ama yağmur ormanı tehlikede: İnsanlar inekler, tarlalar ve madenler için yer açmak amacıyla ağaçları kesiyor ve yakıyor.',
    'Birçok insan, eskiden yağmur ormanında kimsenin yaşamadığını düşünür. Bu doğru değil. İnsanlar en az 13.000 yıldır Amazonya\'da yaşıyor. Köyler ve hatta şehirler kurdular. Bugün bu eski şehirler ağaçların altında saklı. Onları lazerlerle buluyorlar. Lazer çok güçlü ve düz bir ışıktır. Bir uçak ormanın üzerinden uçar ve aşağıya lazer ışığı gönderir. Işık yaprakların arasından geçip yere kadar ulaşır. Böylece ağaçların altındaki eski evler, yollar ve duvarlar görülür.',
    'Bu insanlar güzel sanat eserleri yaptılar: insan ve kuş figürlü kilden çömlekler, kurbağa şeklinde takılar ve kayalar üzerine büyük resimler.',
    'Bugün de birçok yerli topluluk yağmur ormanında yaşıyor. Ormanı çok iyi tanıyorlar. Onlara göre insanlar, hayvanlar ve bitkiler birbirine aittir. Bedenlerini bitkilerden yapılan boyalarla boyarlar ve tüylerden yapılmış takılar takarlar.',
    'Zürih\'teki Rietberg Müzesi bu sanatı gösteriyor.',
  ],
};

// The 30 words to learn: key, word class (N/V/A), picture, article, German, translations.
const AMZ_WORDS = [
  ['wald', 'N', '🌳', 'der', 'Wald', `غابة|جنگل|ځنګل|دارستان|bosona|ጫካ|kayn|වනාන්තරය|forest|forêt|orman`],
  ['fluss', 'N', '🏞️', 'der', 'Fluss', `نهر|دریا|سیند|ڕووبار|laga|ሩባ|webi|ගඟ|river|fleuve|nehir`],
  ['tier', 'N', '🐾', 'das', 'Tier', `حيوان|حیوان|ژوی|ئاژەڵ|bineensa|እንስሳ|xayawaan|සතා|animal|animal|hayvan`],
  ['jaguar', 'N', '🐆', 'der', 'Jaguar', `جاغوار|جگوار|جګوار|جاگوار|jaaguwaarii|ጃጓር|jaguar|ජගුවාරයා|jaguar|jaguar|jaguar`],
  ['mensch', 'N', '🧑', 'der', 'Mensch', `إنسان|انسان|انسان|مرۆڤ|nama|ሰብ|qof|මිනිසා|human, person|être humain|insan`],
  ['bild', 'N', '🖼️', 'das', 'Bild', `صورة|تصویر|انځور|وێنە|fakkii|ስእሊ|sawir|පින්තූරය|picture|image|resim`],
  ['pflanze', 'N', '🌿', 'die', 'Pflanze', `نبات|گیاه|بوټی|ڕووەک|biqiltuu|ተኽሊ|dhir|ශාකය|plant|plante|bitki`],
  ['stadt', 'N', '🏙️', 'die', 'Stadt', `مدينة|شهر|ښار|شار|magaalaa|ከተማ|magaalo|නගරය|city|ville|şehir`],
  ['topf', 'N', '🏺', 'der', 'Topf', `إناء|کوزه|لوښی|مەنجەڵ|okkotee|ድስቲ|dheri|භාජනය|pot|pot|çömlek`],
  ['schmuck', 'N', '📿', 'der', 'Schmuck', `حُلي|زیورات|ګاڼې|خشڵ|faaya|ስልማት|qurxin|ආභරණ|jewellery|bijoux|takı`],
  ['leben', 'V', 'amz-leben', null, 'leben', `يعيش|زندگی کردن|ژوند کول|ژیان|jiraachuu|ምንባር|ku noolaan|ජීවත් වෙනවා|to live|vivre|yaşamak`],
  ['besuchen', 'V', 'amz-besuchen', null, 'besuchen', `يزور|بازدید کردن|لیدنه کول|سەردان کردن|daawwachuu|ምብጻሕ|booqasho|බැලීමට යනවා|to visit|visiter|ziyaret etmek`],
  ['sehen', 'V', '👀', null, 'sehen', `يرى|دیدن|لیدل|بینین|arguu|ምርኣይ|arag|දකිනවා|to see|voir|görmek`],
  ['zeigen', 'V', 'amz-zeigen', null, 'zeigen', `يعرض|نشان دادن|ښودل|پیشاندان|agarsiisuu|ምርኣይ (ኣርኣየ)|tusid|පෙන්වනවා|to show|montrer|göstermek`],
  ['malen', 'V', 'amz-malen', null, 'malen', `يرسم|نقاشی کردن|انځورول|وێنە کێشان|fakkii kaasuu|ምስኣል|sawirid|චිත්‍ර අඳිනවා|to paint|peindre|resim yapmak`],
  ['finden', 'V', 'amz-finden', null, 'finden', `يجد|پیدا کردن|پیدا کول|دۆزینەوە|argachuu|ምርካብ|helid|සොයා ගන්නවා|to find|trouver|bulmak`],
  ['tragen', 'V', 'amz-tragen', null, 'tragen', `يلبس|پوشیدن|اغوستل|لەبەرکردن|uffachuu|ምልባስ|xidhid|පළඳිනවා|to wear|porter|takmak, giymek`],
  ['hoeren', 'V', 'amz-hoeren', null, 'hören', `يسمع|شنیدن|اورېدل|بیستن|dhagahuu|ምስማዕ|maqal|අසනවා|to hear|entendre|duymak`],
  ['wachsen', 'V', 'amz-wachsen', null, 'wachsen', `ينمو|رشد کردن|وده کول|گەشەکردن|guddachuu|ምዕባይ|korid|වැඩෙනවා|to grow|pousser|büyümek`],
  ['kennen', 'V', 'amz-kennen', null, 'kennen', `يعرف|شناختن|پېژندل|ناسین|beekuu|ምፍላጥ|aqoon|දන්නවා|to know|connaître|tanımak`],
  ['gross', 'A', 'amz-gross', null, 'gross', `كبير|بزرگ|لوی|گەورە|guddaa|ዓቢ|weyn|විශාල|big|grand|büyük`],
  ['alt', 'A', 'amz-alt', null, 'alt', `قديم|کهنه|زوړ|کۆن|durii|ጥንታዊ|hore|පැරණි|old|vieux, ancien|eski`],
  ['gruen', 'A', 'amz-gruen', null, 'grün', `أخضر|سبز|شین|سەوز|magariisa|ቀጠልያ|cagaar|කොළ පාට|green|vert|yeşil`],
  ['farbig', 'A', 'amz-farbig', null, 'farbig', `ملوّن|رنگی|رنګین|ڕەنگین|halluu qabu|ሕብራዊ|midab leh|වර්ණවත්|colourful|coloré|renkli`],
  ['schoen', 'A', 'amz-schoen', null, 'schön', `جميل|زیبا|ښکلی|جوان|bareedaa|ጽቡቕ|qurux badan|ලස්සන|beautiful|beau|güzel`],
  ['warm', 'A', 'amz-warm', null, 'warm', `دافئ|گرم|ګرم|گەرم|ho'aa|ዉዑይ|diiran|උණුසුම්|warm|chaud|sıcak`],
  ['nass', 'A', 'amz-nass', null, 'nass', `مبلّل|تر|لوند|تەڕ|jiidhaa|ርሑስ|qoyan|තෙත්|wet|mouillé|ıslak`],
  ['lang', 'A', 'amz-lang', null, 'lang', `طويل|دراز|اوږد|درێژ|dheeraa|ነዊሕ|dheer|දිග|long|long|uzun`],
  ['rot', 'A', 'amz-rot', null, 'rot', `أحمر|سرخ|سور|سوور|diimaa|ቀይሕ|casaan|රතු|red|rouge|kırmızı`],
  ['wichtig', 'A', 'amz-wichtig', null, 'wichtig', `مهم|مهم|مهم|گرنگ|barbaachisaa|ኣገዳሲ|muhiim|වැදගත්|important|important|önemli`],
];

// Drawings for the verbs and adjectives, in the style of drawings.js. Verbs show a
// figure doing the action; adjectives show the meant thing in colour with a tick
// and its opposite small and pale beside it.
const amzScene = (body) => `<svg viewBox="-18 30 147 110" role="presentation"><circle cx="55" cy="85" r="53" fill="#e6efec"/>${body}</svg>`;
const amzOnFigure = (x, s, body) => `<g transform="translate(${x} 134) scale(${s})">${body}</g>`;
const amzTick = (x, y) => dot(x, y, 9, C.teal) + line(`M${x - 5} ${y}l4 4 7-8`, C.white, 3);
const amzCompare = (meant, other, tick = [16, 14]) => art(`<g opacity="0.3">${other}</g>${meant}${amzTick(...tick)}`);
const amzPot = (dx, dy, k, fill, extra = '') => `<g transform="translate(${dx} ${dy}) scale(${k})">${path('M10 0h28c0 8 8 14 8 26 0 14-10 22-22 22S2 40 2 26C2 14 10 8 10 0z', fill)}${rect(6, -6, 36, 8, fill, 3)}${extra}</g>`;
const amzTree = (x, ground, k) => rect(x - 3 * k, ground - 22 * k, 6 * k, 22 * k, C.brown, 2) + dot(x, ground - 30 * k, 16 * k, C.green) + dot(x - 9 * k, ground - 22 * k, 10 * k, C.green);
const amzShirt = (dx, dy, k, fill) => `<g transform="translate(${dx} ${dy}) scale(${k})">${path('M12 0l-12 8 6 10 6-4v30h28V14l6 4 6-10-12-8h-8q-5 6-10 0z', fill)}</g>`;

Object.assign(DRAWINGS, {
  'amz-leben': amzScene(
    path('M62 96l24-20 24 20z', C.red) + rect(66, 96, 40, 38, C.cream) + rect(80, 112, 12, 22, C.brown, 2) + rect(70, 102, 8, 8, C.sky, 1) + rect(94, 102, 8, 8, C.sky, 1)
    + drawFigure('woman', { x: 26, s: 0.82 }) + drawFigure('child', { x: 47, s: 0.85 })),
  'amz-besuchen': amzScene(
    path('M58 84l26-14 26 14z', C.grey) + rect(60, 84, 48, 6, C.grey) + [64, 76, 88, 100].map((x) => rect(x, 92, 6, 36, C.cream)).join('') + rect(58, 128, 52, 6, C.grey)
    + drawFigure('listener', { x: 20, s: 0.8, arm: 'point' }) + line('M36 128h14M44 122l6 6-6 6', C.orange, 3)),
  'amz-zeigen': amzScene(
    rect(76, 104, 26, 30, C.grey, 2) + amzPot(78, 76, 0.48, C.orange, line('M6 22h36M6 30h36', C.brown, 4))
    + drawFigure('speaker', { x: 26, s: 0.85, arm: 'point' })),
  'amz-malen': amzScene(
    line('M80 134l12-62M104 134l-12-62', C.brown, 3) + rect(70, 74, 44, 36, C.white, 2)
    + path('M76 100c8-12 18-18 32-16', 'none') + line('M76 102c8-12 18-18 32-18', C.green, 4) + dot(84, 86, 4, C.orange) + dot(96, 92, 4, C.red) + dot(104, 82, 3, C.yellow)
    + drawFigure('man', { x: 26, s: 0.85, arm: 'point' }) + line('M57 76l11-6', C.brown, 3) + dot(68, 70, 2.5, C.red)),
  'amz-finden': art(
    path('M10 74c10-16 22-18 30-6 8-14 22-12 28 2 8-10 22-8 30 4z', C.green) + amzPot(44, 40, 0.5, C.orange, line('M6 24h36', C.brown, 4))
    + `<circle cx="56" cy="48" r="22" fill="none" stroke="${C.ink}" stroke-width="6"/>` + line('M72 64l20 20', C.ink, 8)
    + line('M84 18l4-6M92 24l7-2M88 32l6 2', C.yellow, 3)),
  'amz-tragen': amzScene(
    drawFigure('woman', { x: 55, s: 1.05 })
    + amzOnFigure(55, 1.05, [-12, -8, -4, 0, 4, 8, 12].map((x, i) => dot(x, -61 + (1 - (x / 12) ** 2) * 9, 3.4, i % 2 ? C.teal : C.yellow)).join('')
      + `<g fill="none" stroke="${C.yellow}" stroke-width="2.4"><circle cx="-14" cy="-70" r="4"/><circle cx="14" cy="-70" r="4"/></g>`)),
  'amz-hoeren': amzScene(
    drawFigure('girl', { x: 34, s: 1 })
    + amzOnFigure(34, 0.8, `<path d="M12-60L18-80" stroke="${PEOPLE.girl.top}" stroke-width="7" stroke-linecap="round"/><circle cx="18" cy="-81" r="4.2" fill="${PEOPLE.girl.skin}"/>`)
    + line('M62 60q6 8 0 16M70 54q10 14 0 28M78 48q14 20 0 40', C.teal, 3)
    + path('M92 58v18', 'none') + line('M94 56v18', C.ink, 3) + dot(90, 75, 4, C.ink) + line('M94 56l8 3', C.ink, 3)),
  'amz-wachsen': art(
    rect(8, 74, 104, 6, C.brown, 3)
    + line('M24 74v-8', C.green, 3) + path('M24 68c-6 0-8-4-8-6 4 0 8 2 8 6z', C.green)
    + line('M58 74v-22', C.green, 4) + path('M58 60c-10 0-14-6-14-10 7 0 14 4 14 10zM58 56c9 0 12-6 12-9-7 0-12 4-12 9z', C.green)
    + line('M94 74v-44', C.green, 5) + path('M94 52c-14 0-18-8-18-13 9 0 18 5 18 13zM94 42c13 0 17-8 17-12-9 0-17 5-17 12z', C.green) + dot(94, 26, 7, C.green)
    + line('M30 22q28-14 50-4', C.orange, 3) + line('M74 12l7 6-9 4', C.orange, 3)),
  'amz-kennen': amzScene(
    drawFigure('man', { x: 28, s: 0.9 })
    + dot(47, 54, 3, C.white) + dot(53, 47, 5, C.white) + `<ellipse cx="82" cy="58" rx="27" ry="22" fill="${C.white}"/>`
    + amzTree(82, 74, 0.75) + amzTick(102, 42)),
  'amz-gross': amzCompare(amzTree(38, 82, 1.7), amzTree(92, 82, 0.6)),
  'amz-alt': amzCompare(
    amzPot(8, 24, 1.05, C.brown, line('M14 18l6 8-5 6 7 9M32 6l-4 10', C.ink, 2) + path('M38 0h4v6z', C.paper || C.cream)),
    amzPot(74, 46, 0.6, C.orange, line('M10 12q4-4 8 0', C.white, 3))),
  'amz-gruen': amzCompare(
    path('M12 76C12 40 34 18 64 14 64 46 44 72 12 76z', C.green) + line('M16 72C30 54 44 38 60 18', '#2e7d4f', 3),
    path('M76 78C76 58 88 46 106 44 106 62 94 76 76 78z', C.yellow) + line('M78 76c8-10 16-20 26-30', C.orange, 2)),
  'amz-farbig': amzCompare(
    amzPot(10, 22, 1.05, C.orange, rect(4, 8, 40, 6, C.teal) + rect(2, 20, 44, 6, C.yellow) + rect(3, 32, 42, 6, C.red) + rect(8, 42, 32, 4, C.purple)),
    amzPot(74, 46, 0.6, C.grey)),
  'amz-schoen': amzCompare(
    line('M36 82V44', C.green, 4) + path('M36 64c-12 0-14-8-14-12 8 0 14 4 14 12z', C.green)
    + [0, 72, 144, 216, 288].map((a) => `<ellipse cx="36" cy="26" rx="8" ry="13" transform="rotate(${a} 36 38)" fill="${C.pink}"/>`).join('') + dot(36, 38, 7, C.yellow),
    line('M90 82V60q0-10 10-14', C.dark, 3) + `<ellipse cx="102" cy="52" rx="6" ry="4" fill="${C.brown}"/>` + path('M100 56l-2 8 4-2 3 6', C.brown)),
  'amz-warm': amzCompare(
    line('M36 8v8M36 64v8M8 40h8M56 40h8M16 20l6 6M50 54l6 6M16 60l6-6M50 26l6-6', C.orange, 4) + dot(36, 40, 16, C.yellow),
    line('M92 48v34M77 56l30 18M77 74l30-18', C.sky, 4) + line('M92 52l-4-4M92 52l4-4M92 78l-4 4M92 78l4 4', C.sky, 3)),
  'amz-nass': amzCompare(
    amzShirt(6, 14, 1.15, C.blue) + [[18, 72], [34, 80], [50, 74], [26, 86]].map(([x, y]) => path(`M${x} ${y - 7}q5 7 0 9q-5-2 0-9z`, '#7fb8e6')).join('') + line('M20 30q4 6 0 10M44 34q4 6 0 10', '#7fb8e6', 3),
    amzShirt(74, 40, 0.6, C.sky)),
  'amz-lang': amzCompare(
    path('M8 34c10-10 20 10 30 0s20 10 30 0 20 10 30 0l8-2-2 6c-8 6-18-8-28 0s-20-10-30 0-20-10-30 0z', C.green) + dot(104, 33, 2, C.ink),
    path('M44 66c6-6 12 6 18 0s8 4 12 0l4-1-1 4c-5 4-10-4-15 0s-12-6-18 0z', C.green), [8, 18]),
  'amz-rot': amzCompare(
    dot(36, 48, 22, C.red) + line('M36 26q2-8 8-10', C.brown, 3) + path('M40 22c6-6 14-4 16 0-6 4-12 4-16 0z', C.green) + dot(28, 40, 4, '#f08a87'),
    dot(92, 62, 13, C.yellow) + line('M92 49q1-5 5-6', C.brown, 2)),
  'amz-wichtig': amzCompare(
    rect(12, 12, 50, 66, C.white, 4) + path('M37 18l26 46H11z', C.orange) + rect(35, 30, 4, 20, C.white, 2) + dot(37, 56, 3, C.white) + line('M18 70h38', C.grey, 3),
    rect(78, 40, 28, 38, C.white, 3) + line('M84 50h16M84 58h16M84 66h10', C.grey, 2), [70, 12]),
});

const AMZ_ITEMS = AMZ_WORDS.map(([key, wordClass, pic, art, de, t]) => ({
  id: `amz-${key}`, kind: 'word', topic: 'amazonia', wordClass, pic, art, de, t: amzT(de, t),
  // Verbs and adjectives have no reliable picture, so answers show translations.
  abstract: wordClass !== 'N',
}));

// Photos for the nouns, from Wikimedia Commons: first from Amazonia, then one from
// here or a clearer one. Credits show on the «Bildnachweis» screen. `arrows` are
// drawn over the photo in its own pixels.
const AMZ_PHOTOS = {
  wald: [{"src": "images/amazonia/wald-1.jpg", "w": 800, "h": 491, "title": "Aerial view of the Amazon Rainforest.jpg", "artist": "lubasi", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0", "page": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Amazon_Rainforest.jpg"}, {"src": "images/amazonia/wald-2.jpg", "w": 550, "h": 800, "title": "Sihlwald Tannboden 20200416.jpg", "artist": "Daniel Kraft", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "page": "https://commons.wikimedia.org/wiki/File:Sihlwald_Tannboden_20200416.jpg"}],
  fluss: [{"src": "images/amazonia/fluss-1.jpg", "w": 800, "h": 600, "title": "Manaus Encontro das aguas 10 2006 102 8x6.jpg", "artist": "Mario Roberto Duran Ortiz Mariordo", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "page": "https://commons.wikimedia.org/wiki/File:Manaus_Encontro_das_aguas_10_2006_102_8x6.jpg"}, {"src": "images/amazonia/fluss-2.jpg", "w": 800, "h": 600, "title": "Limmat bei Zürich (2).jpg", "artist": "Manecke", "license": "CC BY-SA 3.0", "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/", "page": "https://commons.wikimedia.org/wiki/File:Limmat_bei_Z%C3%BCrich_(2).jpg"}],
  tier: [{"src": "images/amazonia/tier-1.jpg", "w": 600, "h": 800, "title": "Ara macao (preening).jpg", "artist": "Hamilton Furtado", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "page": "https://commons.wikimedia.org/wiki/File:Ara_macao_(preening).jpg"}, {"src": "images/amazonia/tier-2.jpg", "w": 800, "h": 533, "title": "Melchsee-Frutt Kuh.jpg", "artist": "Ikiwaner", "license": "CC BY-SA 3.0", "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/", "page": "https://commons.wikimedia.org/wiki/File:Melchsee-Frutt_Kuh.jpg"}],
  jaguar: [{"src": "images/amazonia/jaguar-1.jpg", "w": 800, "h": 533, "title": "Jaguar (Panthera onca palustris) male Rio Negro 2.JPG", "artist": "Charles J. Sharp", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "page": "https://commons.wikimedia.org/wiki/File:Jaguar_(Panthera_onca_palustris)_male_Rio_Negro_2.JPG"}],
  mensch: [{"src": "images/amazonia/mensch-1.jpg", "w": 800, "h": 600, "title": "Jovem Fotógrafo Huni Kuin em ação.jpg", "artist": "Ilex Duca", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "page": "https://commons.wikimedia.org/wiki/File:Jovem_Fot%C3%B3grafo_Huni_Kuin_em_a%C3%A7%C3%A3o.jpg"}, {"src": "images/amazonia/mensch-2.jpg", "w": 618, "h": 800, "title": "Young man at Palm Beach (Unsplash).jpg", "artist": "Mohammad Faruque primitivestudios", "license": "CC0", "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "page": "https://commons.wikimedia.org/wiki/File:Young_man_at_Palm_Beach_(Unsplash).jpg"}],
  bild: [{"src": "images/amazonia/bild-1.jpg", "w": 800, "h": 600, "title": "Pinturas rupestres de los Nukak 1.jpg", "artist": "Julianruizp", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "page": "https://commons.wikimedia.org/wiki/File:Pinturas_rupestres_de_los_Nukak_1.jpg"}, {"src": "images/amazonia/bild-2.jpg", "w": 800, "h": 583, "title": "Framed wall art (Unsplash).jpg", "artist": "Crew crew", "license": "CC0", "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "page": "https://commons.wikimedia.org/wiki/File:Framed_wall_art_(Unsplash).jpg"}],
  pflanze: [{"src": "images/amazonia/pflanze-1.jpg", "w": 800, "h": 431, "title": "Bixa orellana fruit open.jpg", "artist": "Leonardo Ré-Jorge", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "page": "https://commons.wikimedia.org/wiki/File:Bixa_orellana_fruit_open.jpg"}, {"src": "images/amazonia/pflanze-2.jpg", "w": 533, "h": 800, "title": "Bright windowsill (Unsplash).jpg", "artist": "Lucas Alexander lucasalexander", "license": "CC0", "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "page": "https://commons.wikimedia.org/wiki/File:Bright_windowsill_(Unsplash).jpg"}],
  stadt: [{"src": "images/amazonia/stadt-1.jpg", "w": 800, "h": 531, "title": "Manaus aerial view.jpg", "artist": "CIAT", "license": "CC BY-SA 2.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0", "page": "https://commons.wikimedia.org/wiki/File:Manaus_aerial_view.jpg"}],
  topf: [{"src": "images/amazonia/topf-1.jpg", "w": 800, "h": 696, "title": "Vasija (quénti) de los indios Shipibo-Conibo. Museo de América.jpg", "artist": "Dorieo", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "page": "https://commons.wikimedia.org/wiki/File:Vasija_(qu%C3%A9nti)_de_los_indios_Shipibo-Conibo._Museo_de_Am%C3%A9rica.jpg"}, {"src": "images/amazonia/topf-2.jpg", "w": 800, "h": 735, "title": "Toepfe (fcm).jpg", "artist": "Photograph:  Frank C. Müller, Baden-Baden", "license": "CC BY-SA 2.5", "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5", "page": "https://commons.wikimedia.org/wiki/File:Toepfe_(fcm).jpg"}],
  schmuck: [{"src": "images/amazonia/schmuck-1.jpg", "w": 595, "h": 800, "title": "Rikbaktsa003.jpg", "artist": "Valter Campanato/ABr", "license": "CC BY 3.0 br", "licenseUrl": "https://creativecommons.org/licenses/by/3.0/br/deed.en", "page": "https://commons.wikimedia.org/wiki/File:Rikbaktsa003.jpg", "arrows": [[15, 275, 52, 350], [536, 655, 408, 574]]}, {"src": "images/amazonia/schmuck-2.jpg", "w": 607, "h": 800, "title": "Collana, anello e orecchino in oro e corniola, da semproniano, loc. capalle, IV-V sec. ca.JPG", "artist": "Sailko", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "page": "https://commons.wikimedia.org/wiki/File:Collana,_anello_e_orecchino_in_oro_e_corniola,_da_semproniano,_loc._capalle,_IV-V_sec._ca.JPG"}],
};

AMZ_ITEMS.forEach((it) => { it.photos = AMZ_PHOTOS[it.id.slice(4)] || null; });

// What pointing at a word in text 2 shows: the base form (noun in the singular with
// its article, verb in the infinitive, adjective uninflected) and its translation.
const AMZ_GLOSS = Object.fromEntries([
  ...AMZ_WORDS.map(([key, , , art, de, t]) => [key, { art, de, t: amzT(de, t) }]),
  ...[
    ['museum', 'das', 'Museum', `متحف|موزیم|موزیم|مۆزەخانە|muuziyeemii|ቤተ-መዘክር|matxaf|කෞතුකාගාරය|museum|musée|müze`],
    ['ausstellung', 'die', 'Ausstellung', `معرض|نمایشگاه|نندارتون|پێشانگا|agarsiisa|ምርኢት|bandhig|ප්‍රදර්ශනය|exhibition|exposition|sergi`],
    ['amazonien', null, 'Amazonien', `الأمازون|آمازون|امازون|ئەمازۆن|Amazoniyaa|ኣማዞንያ|Amazonia|ඇමසෝනියාව|Amazonia|l'Amazonie|Amazonya`],
    ['farbe', 'die', 'Farbe', `لون|رنگ|رنګ|ڕەنگ|halluu|ሕብሪ|midab|වර්ණය|colour|couleur|renk`],
    ['sein', null, 'sein', `يكون|بودن|ول|بوون|ta'uu|ምዃን|ahaan|වෙනවා|to be|être|olmak`],
    // «geben» alone would mislead here, so the phrase stays whole.
    ['geben', null, 'es gibt', `يوجد|وجود دارد|شته|هەیە|jira|ኣሎ|waxaa jira|ඇත|there is, there are|il y a|var`],
    ['kommen', null, 'kommen', `يأتي|آمدن|راتلل|هاتن|dhufuu|ምምጻእ|imaad|එනවා|to come|venir|gelmek`],
    ['bemalen', null, 'bemalen', `يرسم على|رنگ کردن|رنګول|ڕەنگکردن|halluu dibuu|ምቕባእ|rinjiyeyn|පින්තාරු කරනවා|to paint (on)|peindre|boyamak`],
    ['vogel', 'der', 'Vogel', `طائر|پرنده|مرغه|باڵندە|simbirroo|ዑፍ|shimbir|කුරුල්ලා|bird|oiseau|kuş`],
    ['dorf', 'das', 'Dorf', `قرية|قریه|کلی|گوند|ganda|ዓዲ|tuulo|ගම|village|village|köy`],
    ['baum', 'der', 'Baum', `شجرة|درخت|ونه|دار|muka|ኦም|geed|ගස|tree|arbre|ağaç`],
    ['felsen', 'der', 'Felsen', `صخرة|صخره|ډبره|بەرد|dhagaa|ከውሒ|dhagax|පර්වතය|rock|rocher|kaya`],
    ['koerper', 'der', 'Körper', `جسم|بدن|بدن|لەش|qaama|ኣካል|jidh|සිරුර|body|corps|vücut`],
    ['feder', 'die', 'Feder', `ريشة|پَر|بڼکه|پەڕ|baallee|ክንቲት|baal|පිහාටුව|feather|plume|tüy`],
    ['raum', 'der', 'Raum', `قاعة|اتاق|کوټه|ژوور|kutaa|ክፍሊ|qol|කාමරය|room|salle|oda`],
    ['musik', 'die', 'Musik', `موسيقى|موسیقی|موسیقي|مۆسیقا|muuziqaa|ሙዚቃ|muusig|සංගීතය|music|musique|müzik`],
    ['stimme', 'die', 'Stimme', `صوت|صدا|غږ|دەنگ|sagalee|ድምጺ|cod|හඬ|voice|voix|ses`],
    ['wissen', 'das', 'Wissen', `معرفة|دانش|پوهه|زانیاری|beekumsa|ፍልጠት|aqoon|දැනුම|knowledge|savoir|bilgi`],
    ['jahr', 'das', 'Jahr', `سنة|سال|کال|ساڵ|waggaa|ዓመት|sano|වර්ෂය|year|année|yıl`],
    ['gut', null, 'gut', `جيد، جيدًا|خوب|ښه|باش|gaarii|ጽቡቕ|si fiican|හොඳින්|good, well|bien|iyi`],
    ['heute', null, 'heute', `اليوم|امروز|نن|ئەمڕۆ|har'a|ሎሚ|maanta|අද|today|aujourd'hui|bugün`],
    ['dort', null, 'dort', `هناك|آنجا|هلته|لەوێ|achi|ኣብኡ|halkaas|එහි|there|là-bas|orada`],
    ['sehr', null, 'sehr', `جدًا|خیلی|ډېر|زۆر|baay'ee|ኣዝዩ|aad|ඉතා|very|très|çok`],
    ['viele', null, 'viele', `كثير|زیاد|ډېر|زۆر|baay'ee|ብዙሓት|badan|බොහෝ|many|beaucoup|çok`],
  ].map(([key, art, de, t]) => [key, { art, de, t: amzT(de, t) }]),
]);

// Text 2 in German. {Wort|class|key}: class N, V, A or - (none); key points into
// AMZ_GLOSS and defaults to the word in lower case. Other words are plain.
const AMZ_TEXT2 = [
  'Wir {besuchen|V} das {Museum|N} {Rietberg|N} in {Zürich|N}. Das {Museum|N} {zeigt|V|zeigen} eine {Ausstellung|N} über {Amazonien|N}.',
  '{Amazonien|N} {ist|V|sein} {sehr|-} {gross|A}. {Dort|-} {wächst|V|wachsen} ein {grüner|A|gruen} {Wald|N}. Es {gibt|V|geben} {viele|-} {lange|A|lang} {Flüsse|N|fluss}. Im {Wald|N} {ist|V|sein} es {warm|A} und {nass|A}. {Viele|-} {Tiere|N|tier} und {Pflanzen|N|pflanze} {leben|V} {dort|-}. Der {Jaguar|N} {lebt|V|leben} auch {dort|-}. Im {Wald|N} {hören|V|hoeren} wir {viele|-} {Vögel|N|vogel}.',
  'Seit 13\'000 {Jahren|N|jahr} {leben|V} {Menschen|N|mensch} im {Wald|N}. Sie {kennen|V} den {Wald|N} {gut|A}. Es {gibt|V|geben} {alte|A|alt} {Dörfer|N|dorf} und {Städte|N|stadt}. {Heute|-} {findet|V|finden} man die {Städte|N|stadt} unter den {Bäumen|N|baum}.',
  'Im {Museum|N} {sehen|V} wir {alte|A|alt} {Töpfe|N|topf}. Die {Töpfe|N|topf} {sind|V|sein} {schön|A|schoen} und {farbig|A}. Wir {sehen|V} auch {Bilder|N|bild} auf {Felsen|N}. Die {Menschen|N|mensch} {malen|V} {Jaguare|N|jaguar} und andere {Tiere|N|tier}.',
  'Die {Menschen|N|mensch} {bemalen|V} auch ihren {Körper|N|koerper}. Die {Farbe|N} {kommt|V|kommen} aus einer {Pflanze|N}. Sie {ist|V|sein} oft {rot|A}. Die {Menschen|N|mensch} {tragen|V} auch {Schmuck|N} aus {Federn|N|feder}.',
  'Die {Menschen|N|mensch} in {Amazonien|N} {leben|V} {heute|-} noch {dort|-}. Ihr {Wissen|N} {ist|V|sein} {wichtig|A}.',
];

// Splits a paragraph into words and the text between them. Every word can be
// marked; `wordClass` is null for words that are neither noun, verb nor adjective.
function amzTokens(paragraph) {
  const tokens = [];
  const pattern = /\{([^|}]+)\|([NVA-])(?:\|([^}]+))?\}|([^{]+)/g;
  for (const [, word, wordClass, key, plain] of paragraph.matchAll(pattern)) {
    if (word) {
      const glossKey = key || word.toLowerCase();
      tokens.push({ word, wordClass: wordClass === '-' ? null : wordClass, key: glossKey, gloss: AMZ_GLOSS[glossKey] || null });
      continue;
    }
    for (const [, letters, other] of plain.matchAll(/(\p{L}[\p{L}'’]*)|([^\p{L}]+)/gu)) {
      tokens.push(letters ? { word: letters, wordClass: null, gloss: null } : { text: other });
    }
  }
  return tokens;
}

function amzPlain(paragraph) {
  return paragraph.replace(/\{([^|}]+)\|[^}]*\}/g, '$1');
}

// Repetition: the three word classes, then a short quiz with words from the text.
const AMZ_RULES = [
  { cls: 'N', text: amzT('Nomen sind Namen für Menschen, Tiere, Dinge und Orte.', `الأسماء هي أسماء للناس والحيوانات والأشياء والأماكن.|اسم‌ها نام انسان‌ها، حیوانات، چیزها و جاها هستند.|نومونه د انسانانو، ژویو، شیانو او ځایونو نومونه دي.|ناوەکان ناوی مرۆڤ، ئاژەڵ، شت و شوێنن.|Maqaan maqaa namootaa, bineensotaa, wantootaa fi bakkeeti.|ስማት ናይ ሰባት፣ እንስሳታት፣ ነገራትን ቦታታትን ኣስማት እዮም።|Magacyadu waa magacyada dadka, xayawaanka, waxyaabaha iyo meelaha.|නාම පද යනු මිනිසුන්, සතුන්, දේවල් සහ ස්ථානවල නම් ය.|Nouns are names for people, animals, things and places.|Les noms désignent des personnes, des animaux, des choses et des lieux.|İsimler insanların, hayvanların, eşyaların ve yerlerin adlarıdır.`), examples: ['der Wald', 'das Tier', 'die Pflanze'] },
  { cls: 'N', text: amzT('Nomen schreibt man gross. Man kann der, die oder das davor setzen.', `في الألمانية تُكتب الأسماء بحرف كبير. ويمكن وضع der أو die أو das قبلها.|در زبان آلمانی اسم‌ها با حرف بزرگ نوشته می‌شوند. می‌توان der، die یا das را پیش از آن‌ها گذاشت.|په الماني کې نومونه په لوی توري لیکل کېږي. مخکې یې der، die یا das راتلای شي.|لە ئەڵمانیدا ناو بە پیتی گەورە دەنووسرێت. دەتوانیت der، die یان das بخەیتە پێشی.|Afaan Jarmaniitiin maqaan qubee guddaan barreeffama. Duratti der, die ykn das kaa'uu dandeessa.|ብጀርመን ስማት ብዓቢ ፊደል ይጽሓፉ። ቅድሚኦም der፣ die ወይ das ከተቐምጡ ትኽእሉ።|Jarmalka magacyada waxaa lagu qoraa xaraf weyn. Waxaad hortooda dhigi kartaa der, die ama das.|ජර්මන් භාෂාවේ නාම පද ලොකු අකුරින් ලියයි. ඒවාට ඉදිරියෙන් der, die හෝ das දැමිය හැක.|In German, nouns start with a capital letter. You can put der, die or das in front of them.|En allemand, les noms commencent par une majuscule. On peut mettre der, die ou das devant.|Almancada isimler büyük harfle yazılır. Önlerine der, die veya das koyabilirsin.`) },
  { cls: 'V', text: amzT('Verben sagen, was jemand tut oder was passiert.', `الأفعال تقول ماذا يفعل شخص ما أو ماذا يحدث.|فعل‌ها می‌گویند کسی چه کاری می‌کند یا چه اتفاقی می‌افتد.|فعلونه وايي چې څوک څه کوي یا څه پېښېږي.|کردارەکان دەڵێن کەسێک چی دەکات یان چی ڕوودەدات.|Gochimni waan namni hojjetu ykn waan ta'u ibsa.|ግስታት ሓደ ሰብ እንታይ ከም ዝገብር ወይ እንታይ ከም ዝኸውን ይነግሩ።|Falalku waxay sheegaan waxa qof sameeyo ama waxa dhaca.|ක්‍රියා පද කියන්නේ යමෙක් කරන දේ හෝ සිදුවන දේ ය.|Verbs say what someone does or what happens.|Les verbes disent ce que quelqu'un fait ou ce qui se passe.|Fiiller birinin ne yaptığını veya ne olduğunu söyler.`), examples: ['malen', 'sehen', 'wachsen'] },
  { cls: 'V', text: amzT('Verben ändern sich mit der Person: ich lebe, du lebst. Auch «ist», «sind» und «gibt» sind Verben.', `الأفعال تتغيّر مع الشخص: ich lebe، du lebst. وكذلك ist وsind وgibt أفعال.|فعل‌ها با شخص تغییر می‌کنند: ich lebe، du lebst. ist، sind و gibt هم فعل هستند.|فعلونه د شخص سره بدلېږي: ich lebe، du lebst. ist، sind او gibt هم فعلونه دي.|کردارەکان لەگەڵ کەسدا دەگۆڕێن: ich lebe، du lebst. ist، sind و gibt یش کردارن.|Gochimni akka namaatti jijjiirama: ich lebe, du lebst. ist, sind fi gibt illee gochima.|ግስታት ምስቲ ሰብ ይቕየሩ፦ ich lebe፣ du lebst። ist፣ sind ከምኡውን gibt እውን ግስታት እዮም።|Falalku way isbeddelaan marka qofku isbeddelo: ich lebe, du lebst. ist, sind iyo gibt sidoo kale waa falal.|ක්‍රියා පද පුද්ගලයා අනුව වෙනස් වේ: ich lebe, du lebst. ist, sind සහ gibt ද ක්‍රියා පද වේ.|Verbs change with the person: ich lebe, du lebst. ist, sind and gibt are verbs too.|Les verbes changent selon la personne : ich lebe, du lebst. ist, sind et gibt sont aussi des verbes.|Fiiller kişiye göre değişir: ich lebe, du lebst. ist, sind ve gibt de fiildir.`) },
  { cls: 'A', text: amzT('Adjektive sagen, wie etwas ist.', `الصفات تقول كيف يكون الشيء.|صفت‌ها می‌گویند چیزی چگونه است.|صفتونه وايي چې یو شی څنګه دی.|ئاوەڵناوەکان دەڵێن شتێک چۆنە.|Ibsi maqaa akkamitti akka wanti tokko jiru ibsa.|ቅጽላት ሓደ ነገር ከመይ ምዃኑ ይነግሩ።|Tilmaameyaashu waxay sheegaan sida wax u yihiin.|නාම විශේෂණ කියන්නේ යමක් කෙසේද යන්නයි.|Adjectives say what something is like.|Les adjectifs disent comment est quelque chose.|Sıfatlar bir şeyin nasıl olduğunu söyler.`), examples: ['grün', 'alt', 'schön'] },
  { cls: 'A', text: amzT('Test: Passt das Wort in «Der Wald ist ___.»? Dann ist es ein Adjektiv.', `اختبار: هل تناسب الكلمة «Der Wald ist ___.»؟ إذن هي صفة.|آزمایش: آیا کلمه در «Der Wald ist ___.» جا می‌شود؟ پس صفت است.|ازموینه: آیا کلمه په «Der Wald ist ___.» کې ځای کېږي؟ نو صفت دی.|تاقیکردنەوە: ئایا وشەکە لە «Der Wald ist ___.» دا دەگونجێت؟ کەواتە ئاوەڵناوە.|Qormaata: Jechi sun «Der Wald ist ___.» keessatti ni ta'aa? Yoo ta'e ibsa maqaati.|ፈተና፦ እታ ቃል ኣብ «Der Wald ist ___.» ትሰማማዕዶ? እንተ ኾይና ቅጽል እያ።|Tijaabo: Erayga ma ku habboon yahay «Der Wald ist ___.»? Haddaba waa tilmaame.|පරීක්ෂාව: වචනය «Der Wald ist ___.» තුළට ගැළපේද? එසේ නම් එය නාම විශේෂණයකි.|Test: Does the word fit in «Der Wald ist ___.»? Then it is an adjective.|Test : le mot va-t-il dans « Der Wald ist ___. » ? Alors c'est un adjectif.|Test: Kelime «Der Wald ist ___.» cümlesine uyuyor mu? O zaman sıfattır.`) },
];

const AMZ_QUIZ = [['Wald', 'N'], ['malen', 'V'], ['farbig', 'A'], ['Fluss', 'N'], ['hören', 'V'], ['alt', 'A'], ['Stadt', 'N'], ['wachsen', 'V'], ['nass', 'A']];

const AMZ_CLASS_KEYS = { N: 'noun', V: 'verb', A: 'adjective' };

if (typeof module !== 'undefined') module.exports = { AMZ_ITEMS, AMZ_TEXT1, AMZ_TEXT2, AMZ_GLOSS, amzTokens, amzPlain };
