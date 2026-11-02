// Writing exercises, from easiest to hardest. No DOM here.
// letter: one letter is missing. drag: several are missing. scramble: all letters
// are mixed up. type: the whole word is written freely.
const WRITING_LEVELS = ['letter', 'drag', 'scramble', 'type'];

Object.assign(STRINGS, {
  writing: { de: 'Schreiben', ar: 'الكتابة', prs: 'نوشتن', ps: 'لیکل', om: 'Barreessuu', ti: 'ጽሕፈት', so: 'Qoraal', si: 'ලිවීම', ckb: 'نووسین', en: 'Writing', fr: 'Écrire', tr: 'Yazma' },
  letter: { de: 'Welcher Buchstabe fehlt?', ar: 'أي حرف ناقص؟', prs: 'کدام حرف کم است؟', ps: 'کوم توری کم دی؟', om: 'Qubeen kam hir?', ti: 'ኣየናይ ፊደል ጎዲሉ?', so: 'Xarafkee ayaa maqan?', si: 'කුමන අකුරද අඩු?', ckb: 'کام پیت ون بووە؟', en: 'Which letter is missing?', fr: 'Quelle lettre manque ?', tr: 'Hangi harf eksik?' },
  drag: { de: 'Zieh die Buchstaben an den richtigen Platz.', ar: 'اسحب الحروف إلى مكانها الصحيح.', prs: 'حروف را به جای درست بکش.', ps: 'توري سم ځای ته کش کړه.', om: 'Qubee gara bakka sirriitti harkisi.', ti: 'ፊደላት ናብ ቅኑዕ ቦታ ሰሓቡ።', so: 'U jiid xarfaha meesha saxda ah.', si: 'අකුරු නිවැරදි තැනට ඇදගෙන යන්න.', ckb: 'پیتەکان بۆ شوێنی ڕاست ڕابکێشە.', en: 'Drag the letters to the right place.', fr: 'Fais glisser les lettres à la bonne place.', tr: 'Harfleri doğru yere sürükle.' },
  scramble: { de: 'Ordne die Buchstaben.', ar: 'رتّب الحروف.', prs: 'حروف را مرتب کن.', ps: 'توري ترتیب کړه.', om: 'Qubee tartiibaan qindeessi.', ti: 'ፊደላት ስርዑ።', so: 'Hagaaji xarfaha.', si: 'අකුරු පිළිවෙළට තබන්න.', ckb: 'پیتەکان ڕێک بخە.', en: 'Put the letters in order.', fr: 'Remets les lettres dans l\'ordre.', tr: 'Harfleri sırala.' },
  yourAnswer: { de: 'Deine Antwort', ar: 'إجابتك', prs: 'جواب تو', ps: 'ستا ځواب', om: 'Deebii kee', ti: 'መልስኹም', so: 'Jawaabtaada', si: 'ඔබේ පිළිතුර', ckb: 'وەڵامەکەت', en: 'Your answer', fr: 'Ta réponse', tr: 'Senin cevabın' },
});

const FILLER_LETTERS = 'abdeghiklmnorstu';

function randomIndexes(length, count, rnd) {
  return shuffle([...Array(length).keys()], rnd).slice(0, count).sort((a, b) => a - b);
}

// Returns the slots (a letter, or null where the student fills one in) and the tiles.
function spellingTask(word, level, rnd = Math.random) {
  const letters = [...word];
  const missing = level === 'scramble'
    ? letters.map((_, i) => i)
    : randomIndexes(letters.length, level === 'letter' ? 1 : Math.min(3, Math.ceil(letters.length / 2)), rnd);
  const needed = missing.map((i) => letters[i]);
  const fillers = shuffle([...FILLER_LETTERS].filter((l) => !needed.includes(l)), rnd)
    .slice(0, { letter: 3, drag: 1, scramble: 0 }[level]);
  let tiles = shuffle([...needed, ...fillers], rnd);
  // A scramble that lands on the word itself would leave nothing to do.
  while (level === 'scramble' && needed.length > 1 && new Set(needed).size > 1 && tiles.join('') === word) tiles = shuffle(needed, rnd);
  return { slots: letters.map((l, i) => (missing.includes(i) ? null : l)), tiles };
}

if (typeof module !== 'undefined') module.exports = { WRITING_LEVELS, spellingTask };
