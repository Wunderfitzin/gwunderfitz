// Interface text. German is always shown first, the student's language below it.
const STRINGS = {
  chooseLang: { de: 'Wähle deine Sprache', ar: 'اختر لغتك', ti: 'ቋንቋኹም ምረጹ', en: 'Choose your language' },
  who: { de: 'Wer bist du?', ar: 'من أنت؟', ti: 'መን ኢኹም?', en: 'Who are you?' },
  pickAnimal: { de: 'Wähle dein Tier', ar: 'اختر حيوانك', ti: 'እንስሳኹም ምረጹ', en: 'Choose your animal' },
  newProfile: { de: 'Neu', ar: 'جديد', ti: 'ሓድሽ', en: 'New' },
  today: { de: 'Heute lernen', ar: 'تعلم اليوم', ti: 'ሎሚ ተማሃሩ', en: 'Learn today' },
  allDone: { de: 'Für heute ist alles geschafft', ar: 'أنهيت كل شيء لهذا اليوم', ti: 'ናይ ሎሚ ኩሉ ተወዲኡ', en: 'All done for today' },
  practiceMore: { de: 'Weiter üben', ar: 'واصل التدريب', ti: 'ቀጽሉ ተለማመዱ', en: 'Keep practising' },
  topics: { de: 'Themen', ar: 'المواضيع', ti: 'ኣርእስትታት', en: 'Topics' },
  practice: { de: 'Üben', ar: 'تدرّب', ti: 'ተለማመዱ', en: 'Practise' },
  learned: { de: 'Wörter und Sätze gelernt', ar: 'كلمات وجمل تعلمتها', ti: 'ዝተማሃርኩሞም ቃላትን ምሉኣት ሓሳባትን', en: 'words and sentences learned' },
  newWord: { de: 'Neu', ar: 'جديد', ti: 'ሓድሽ', en: 'New' },
  listen: { de: 'Hör zu. Was ist richtig?', ar: 'استمع. ما الإجابة الصحيحة؟', ti: 'ስምዑ። እቲ ቅኑዕ እንታይ እዩ?', en: 'Listen. Which is right?' },
  meaning: { de: 'Was bedeutet das?', ar: 'ماذا يعني هذا؟', ti: 'እዚ እንታይ ማለት እዩ?', en: 'What does this mean?' },
  pickDe: { de: 'Wie sagt man das auf Deutsch?', ar: 'كيف نقول هذا بالألمانية؟', ti: 'እዚ ብጀርመን ከመይ ይበሃል?', en: 'How do you say this in German?' },
  article: { de: 'der, die oder das?', ar: 'der أو die أو das؟', ti: 'der, die ወይስ das?', en: 'der, die or das?' },
  type: { de: 'Schreib das Wort.', ar: 'اكتب الكلمة.', ti: 'እታ ቃል ጽሓፉ።', en: 'Write the word.' },
  build: { de: 'Bau den Satz.', ar: 'كوّن الجملة.', ti: 'እቲ ምሉእ ሓሳብ ስርዑ።', en: 'Build the sentence.' },
  check: { de: 'Prüfen', ar: 'تحقق', ti: 'ኣረጋግጹ', en: 'Check' },
  next: { de: 'Weiter', ar: 'التالي', ti: 'ቀጽሉ', en: 'Next' },
  right: { de: 'Richtig!', ar: 'صحيح!', ti: 'ቅኑዕ!', en: 'Right!' },
  notYet: { de: 'Noch nicht. Richtig ist:', ar: 'ليس بعد. الصحيح هو:', ti: 'ገና። እቲ ቅኑዕ፦', en: 'Not yet. The right answer is:' },
  wellDone: { de: 'Gut gemacht!', ar: 'أحسنت!', ti: 'ጽቡቕ ገይርኩም!', en: 'Well done!' },
  rightCount: { de: 'richtig', ar: 'صحيحة', ti: 'ቅኑዕ', en: 'right' },
  home: { de: 'Zum Start', ar: 'إلى البداية', ti: 'ናብ መጀመርታ', en: 'Back to start' },
  back: { de: 'Zurück', ar: 'رجوع', ti: 'ተመለሱ', en: 'Back' },
  settings: { de: 'Einstellungen', ar: 'الإعدادات', ti: 'ቅጥዕታት', en: 'Settings' },
  language: { de: 'Sprache', ar: 'اللغة', ti: 'ቋንቋ', en: 'Language' },
  moveTitle: { de: 'Zuhause und in der Schule', ar: 'في البيت وفي المدرسة', ti: 'ኣብ ገዛን ኣብ ቤት ትምህርትን', en: 'At home and at school' },
  moveHelp: { de: 'Speichere deine Datei. Lade sie auf dem anderen Gerät.', ar: 'احفظ ملفك. ثم حمّله على الجهاز الآخر.', ti: 'ፋይልኩም ዓቅቡ። ኣብቲ ካልእ መሳርሒ ጽዓንዎ።', en: 'Save your file. Load it on the other device.' },
  save: { de: 'Fortschritt speichern', ar: 'حفظ التقدم', ti: 'ምዕባለ ዓቅቡ', en: 'Save progress' },
  load: { de: 'Fortschritt laden', ar: 'تحميل التقدم', ti: 'ምዕባለ ጽዓኑ', en: 'Load progress' },
  loadFailed: { de: 'Diese Datei passt nicht.', ar: 'هذا الملف غير مناسب.', ti: 'እዚ ፋይል ኣይሰማማዕን።', en: 'This file does not work.' },
  deleteProfile: { de: 'Profil löschen', ar: 'حذف الملف الشخصي', ti: 'ፕሮፋይል ደምስሱ', en: 'Delete profile' },
  deleteConfirm: { de: 'Wirklich löschen? Dein Fortschritt geht verloren.', ar: 'هل تريد الحذف فعلا؟ سيضيع تقدمك.', ti: 'ብሓቂ ክድምሰስ ዲዩ? ምዕባለኹም ክጠፍእ እዩ።', en: 'Really delete? Your progress will be lost.' },
  noVoice: { de: 'Auf diesem Gerät gibt es keine deutsche Stimme.', ar: 'لا يوجد صوت ألماني على هذا الجهاز.', ti: 'ኣብዚ መሳርሒ ናይ ጀርመን ድምጺ የለን።', en: 'This device has no German voice.' },
  speak: { de: 'Anhören', ar: 'استمع', ti: 'ስምዑ', en: 'Listen' },
  speakSlow: { de: 'Langsam anhören', ar: 'استمع ببطء', ti: 'ቀስ ኢልኩም ስምዑ', en: 'Listen slowly' },
  fix: { de: 'Übersetzung korrigieren', ar: 'تصحيح الترجمة', ti: 'ትርጉም ኣስተኻኽሉ', en: 'Correct the translation' },
  fixHelp: { de: 'Schreib die richtige Übersetzung.', ar: 'اكتب الترجمة الصحيحة.', ti: 'ቅኑዕ ትርጉም ጽሓፉ።', en: 'Write the right translation.' },
  fixSave: { de: 'Speichern', ar: 'حفظ', ti: 'ዓቅቡ', en: 'Save' },
  cancel: { de: 'Abbrechen', ar: 'إلغاء', ti: 'ሰርዙ', en: 'Cancel' },
  noTranslation: { de: 'Noch keine Übersetzung. Hilf mit!', ar: 'لا توجد ترجمة بعد. ساعدنا!', ti: 'ገና ትርጉም የለን። ሓግዙና!', en: 'No translation yet. Help us!' },
};

const stringBlocks = typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : require('./translations.js').TRANSLATIONS;

for (const [code, block] of Object.entries(stringBlocks)) {
  const texts = block.strings.split('|');
  Object.keys(STRINGS).forEach((key, i) => { STRINGS[key][code] = texts[i]; });
}

// Added after the translation blocks, so it carries every language itself.
Object.assign(STRINGS, {
  repeat: { de: 'Wiederholen', ar: 'أعد التمرين', prs: 'دوباره تمرین کن', ps: 'بیا تمرین وکړه', om: 'Irra deebi\'i', ti: 'ደጊምኩም ስርሑ', so: 'Ku celi', si: 'නැවත කරන්න', ckb: 'دووبارە بکەرەوە', en: 'Repeat', fr: 'Recommencer', tr: 'Tekrarla' },
});

if (typeof module !== 'undefined') module.exports = { STRINGS };
