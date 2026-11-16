// «Meine Wörter»: words the student adds, in German and in their own script.
// They are kept with the profile and practised with the same exercises as the course.
const MAX_OWN_LENGTH = 60;

Object.assign(STRINGS, {
  myWords: { de: 'Meine Wörter', ar: 'كلماتي', prs: 'کلمه‌های من', ps: 'زما کلمې', om: 'Jechoota koo', ti: 'ናተይ ቃላት', so: 'Ereyadayda', si: 'මගේ වචන', ckb: 'وشەکانی من', en: 'My words', fr: 'Mes mots', tr: 'Kelimelerim' },
  myWordsHelp: { de: 'Schreib ein Wort auf Deutsch und in deiner Sprache.', ar: 'اكتب كلمة بالألمانية وبلغتك.', prs: 'یک کلمه را به آلمانی و به زبان خودت بنویس.', ps: 'یوه کلمه په الماني او په خپله ژبه ولیکه.', om: 'Jecha tokko Afaan Jarmanii fi afaan keetiin barreessi.', ti: 'ሓንቲ ቃል ብጀርመንን ብቋንቋኹምን ጽሓፉ።', so: 'Eray ku qor Jarmal iyo luqaddaada.', si: 'වචනයක් ජර්මන් භාෂාවෙන් සහ ඔබේ භාෂාවෙන් ලියන්න.', ckb: 'وشەیەک بە ئەڵمانی و بە زمانی خۆت بنووسە.', en: 'Write a word in German and in your language.', fr: 'Écris un mot en allemand et dans ta langue.', tr: 'Bir kelimeyi Almanca ve kendi dilinde yaz.' },
  inGerman: { de: 'Auf Deutsch', ar: 'بالألمانية', prs: 'به آلمانی', ps: 'په الماني', om: 'Afaan Jarmaniin', ti: 'ብጀርመን', so: 'Af Jarmal', si: 'ජර්මන් භාෂාවෙන්', ckb: 'بە ئەڵمانی', en: 'In German', fr: 'En allemand', tr: 'Almanca' },
  inMyLanguage: { de: 'In meiner Sprache', ar: 'بلغتي', prs: 'به زبان من', ps: 'زما په ژبه', om: 'Afaan kootiin', ti: 'ብቋንቋይ', so: 'Luqaddayda', si: 'මගේ භාෂාවෙන්', ckb: 'بە زمانی من', en: 'In my language', fr: 'Dans ma langue', tr: 'Kendi dilimde' },
  addWord: { de: 'Hinzufügen', ar: 'أضف', prs: 'اضافه کن', ps: 'ور اضافه کړه', om: 'Dabali', ti: 'ወስኹ', so: 'Ku dar', si: 'එකතු කරන්න', ckb: 'زیاد بکە', en: 'Add', fr: 'Ajouter', tr: 'Ekle' },
  noWordsYet: { de: 'Noch keine Wörter. Schreib dein erstes Wort!', ar: 'لا توجد كلمات بعد. اكتب كلمتك الأولى!', prs: 'هنوز کلمه‌ای نیست. اولین کلمه‌ات را بنویس!', ps: 'تر اوسه کومه کلمه نشته. خپله لومړۍ کلمه ولیکه!', om: 'Ammallee jechi hin jiru. Jecha kee isa jalqabaa barreessi!', ti: 'ገና ቃል የለን። ናይ መጀመርታ ቃልኹም ጽሓፉ!', so: 'Weli eray ma jiro. Qor eraygaaga ugu horreeya!', si: 'තවම වචන නැත. ඔබේ පළමු වචනය ලියන්න!', ckb: 'هێشتا هیچ وشەیەک نییە. یەکەم وشەت بنووسە!', en: 'No words yet. Write your first word!', fr: 'Pas encore de mots. Écris ton premier mot !', tr: 'Henüz kelime yok. İlk kelimeni yaz!' },
  removeWord: { de: 'Wort löschen', ar: 'احذف الكلمة', prs: 'کلمه را پاک کن', ps: 'کلمه ړنګه کړه', om: 'Jecha haqi', ti: 'ቃል ደምስሱ', so: 'Tirtir erayga', si: 'වචනය මකන්න', ckb: 'وشەکە بسڕەوە', en: 'Delete word', fr: 'Supprimer le mot', tr: 'Kelimeyi sil' },
});

// A leading der/die/das becomes the article, so own nouns get the article exercise too.
function ownItem(word) {
  const match = /^(der|die|das)\s+(\S.*)$/i.exec(word.de.trim());
  return {
    id: word.id, kind: 'word', topic: 'own', own: true, abstract: true, pic: null,
    de: match ? match[2] : word.de.trim(),
    art: match ? match[1].toLowerCase() : null,
    l1: word.l1, lang: word.lang,
  };
}

// Only well-formed entries survive a loaded save file.
function cleanOwnWords(list, knownLangs) {
  if (!Array.isArray(list)) return [];
  return list.filter((w) => w && typeof w.id === 'string' && w.id.startsWith('own-')
    && typeof w.de === 'string' && typeof w.l1 === 'string' && w.de.trim() && w.l1.trim()
    && w.de.length <= MAX_OWN_LENGTH && w.l1.length <= MAX_OWN_LENGTH && knownLangs.includes(w.lang))
    .map(({ id, de, l1, lang }) => ({ id, de, l1, lang }));
}

if (typeof module !== 'undefined') module.exports = { ownItem, cleanOwnWords, MAX_OWN_LENGTH };
