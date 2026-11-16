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
  pickPicture: { de: 'Bild wählen', ar: 'اختر صورة', prs: 'یک تصویر انتخاب کن', ps: 'انځور وټاکه', om: 'Fakkii filadhu', ti: 'ስእሊ ምረጹ', so: 'Dooro sawir', si: 'පින්තූරයක් තෝරන්න', ckb: 'وێنەیەک هەڵبژێرە', en: 'Choose a picture', fr: 'Choisis une image', tr: 'Resim seç' },
  takePhoto: { de: 'Foto machen', ar: 'التقط صورة', prs: 'عکس بگیر', ps: 'عکس واخله', om: 'Suuraa kaasi', ti: 'ስእሊ ኣልዕሉ', so: 'Sawir qaado', si: 'ඡායාරූපයක් ගන්න', ckb: 'وێنە بگرە', en: 'Take a photo', fr: 'Prends une photo', tr: 'Fotoğraf çek' },
  noPicture: { de: 'Ohne Bild', ar: 'بدون صورة', prs: 'بدون تصویر', ps: 'بې انځوره', om: 'Fakkii malee', ti: 'ብዘይ ስእሊ', so: "Sawir la'aan", si: 'පින්තූරයක් නැතිව', ckb: 'بێ وێنە', en: 'No picture', fr: 'Sans image', tr: 'Resimsiz' },
  searchPicture: { de: 'Bild suchen (auf Deutsch)', ar: 'ابحث عن صورة (بالألمانية)', prs: 'تصویر را جستجو کن (به آلمانی)', ps: 'انځور ولټوه (په الماني)', om: 'Fakkii barbaadi (Afaan Jarmaniin)', ti: 'ስእሊ ድለዩ (ብጀርመን)', so: 'Raadi sawir (Jarmal)', si: 'පින්තූරයක් සොයන්න (ජර්මන් භාෂාවෙන්)', ckb: 'بەدوای وێنەدا بگەڕێ (بە ئەڵمانی)', en: 'Search for a picture (in German)', fr: 'Cherche une image (en allemand)', tr: 'Resim ara (Almanca)' },
  removeWord: { de: 'Wort löschen', ar: 'احذف الكلمة', prs: 'کلمه را پاک کن', ps: 'کلمه ړنګه کړه', om: 'Jecha haqi', ti: 'ቃል ደምስሱ', so: 'Tirtir erayga', si: 'වචනය මකන්න', ckb: 'وشەکە بسڕەوە', en: 'Delete word', fr: 'Supprimer le mot', tr: 'Kelimeyi sil' },
});

// A leading der/die/das becomes the article, so own nouns get the article exercise too.
// A word with a picture also gets the picture exercises.
function ownItem(word) {
  const match = /^(der|die|das)\s+(\S.*)$/i.exec(word.de.trim());
  return {
    id: word.id, kind: 'word', topic: 'own', own: true,
    abstract: !word.pic && !word.photo, pic: word.pic || null, photos: word.photo ? [word.photo] : null,
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
    .map(({ id, de, l1, lang, pic, photo }) => ({
      id, de, l1, lang,
      ...(typeof pic === 'string' && pic.length <= 40 ? { pic } : {}),
      ...(validPhoto(photo) ? { photo: { src: photo.src, w: photo.w, h: photo.h } } : {}),
    }));
}

// Own photos are small JPEGs inside the save file; the unit's photos are paths.
function validPhoto(photo) {
  return !!photo && typeof photo.src === 'string' && Number.isFinite(photo.w) && Number.isFinite(photo.h)
    && ((photo.src.startsWith('data:image/jpeg;base64,') && photo.src.length < 300000) || /^images\/[\w/.-]+$/.test(photo.src));
}

if (typeof module !== 'undefined') module.exports = { ownItem, cleanOwnWords, MAX_OWN_LENGTH };
