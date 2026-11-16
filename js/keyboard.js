// On-screen keyboards, because school computers rarely have an Arabic, Ge'ez or
// Sinhala layout. Rows are keys separated by spaces; a key inserts its own text.
const PERSIAN_ROWS = ['ض ص ث ق ف غ ع ه خ ح ج چ', 'ش س ی ب ل ا ت ن م ک گ', 'ظ ط ز ر ذ د پ و ژ'];

const KEYBOARDS = {
  ar: ['ض ص ث ق ف غ ع ه خ ح ج د', 'ش س ي ب ل ا ت ن م ك ط', 'ئ ء ؤ ر ى ة و ز ظ ذ', 'أ إ آ ، ؟'],
  prs: [...PERSIAN_ROWS, 'آ ئ ء ، ؟'],
  ps: [...PERSIAN_ROWS, 'ټ ډ ړ ږ ښ ګ ڼ ې ۍ ځ څ ي', 'آ ئ ء ، ؟'],
  ckb: ['ئ ا ب پ ت ج چ ح خ د ر ڕ', 'ز ژ س ش ع غ ف ڤ ق ک گ', 'ل ڵ م ن ه ە و ۆ ی ێ', '، ؟'],
  si: [
    'අ ආ ඇ ඈ ඉ ඊ උ ඌ එ ඒ ඔ ඕ',
    'ක ග ච ජ ට ඩ ණ ත ද න',
    'ප බ ම ය ර ල ව ස හ ළ ෆ',
    'ඛ ඝ ඞ ඟ ඡ ඤ ඨ ඪ ථ ධ ඳ ඵ භ ශ ෂ',
    'ා ැ ෑ ි ී ු ූ ෘ ෙ ේ ො ෝ ් ං',
  ],
  // Tigrinya: a tap on the first form opens all its vowel forms.
  ti: ['ሀ ለ ሐ መ ረ ሰ ሸ ቀ ቐ በ ቨ ተ ቸ ነ ኘ አ ከ', 'ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ ጠ ጨ ጰ ጸ ፀ ፈ ፐ', '። ፣ ?'],
};

// Latin scripts only need the letters a normal keyboard lacks.
const EXTRA_LETTERS = {
  fr: 'é è ê à â ç ù û ô î ë ï œ',
  tr: 'ç ğ ı İ ö ş ü',
};

// Ge'ez letters sit in rows of seven vowel forms. The -wa form is the eighth for
// most letters and lives elsewhere for the four with a -kwa/-gwa sound.
const GEEZ_WA_EIGHTH = 'ለሐመረሰሸበቨተቸነኘዘዠደጀጠጨጰጸፈፐ';
const GEEZ_WA_OTHER = { ቀ: 'ቋ', ቐ: 'ቛ', ከ: 'ኳ', ገ: 'ጓ' };

function geezForms(base) {
  const start = base.codePointAt(0);
  const forms = [0, 1, 2, 3, 4, 5, 6].map((i) => String.fromCodePoint(start + i));
  if (GEEZ_WA_EIGHTH.includes(base)) forms.push(String.fromCodePoint(start + 7));
  if (GEEZ_WA_OTHER[base]) forms.push(GEEZ_WA_OTHER[base]);
  return forms;
}

// Keys that join the letter before them show a dotted circle for that letter.
function keyLabel(text) {
  return /^\p{M}/u.test(text) ? `◌${text}` : text;
}

function screenKeyboard(input, code) {
  const rows = KEYBOARDS[code];
  const extras = EXTRA_LETTERS[code];
  if (!rows && !extras) return null;
  const insert = (text) => {
    input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
    input.focus();
  };
  const key = (text, onclick = () => insert(text), className = 'key') => h('button', {
    type: 'button', class: className, lang: code, onclick,
  }, keyLabel(text));
  if (!rows) return h('div', { class: 'keyboard' }, h('div', { class: 'key-row' }, extras.split(' ').map((t) => key(t))));

  // Only the on-screen keys, so phones do not open their own keyboard on top.
  input.setAttribute('inputmode', 'none');
  const forms = h('div', { class: 'key-row forms', hidden: true });
  const pickForms = (base) => {
    forms.replaceChildren(...geezForms(base).map((form) => key(form, () => { insert(form); forms.hidden = true; }, 'key big')));
    forms.hidden = false;
  };
  const erase = () => {
    const { selectionStart: start, selectionEnd: end } = input;
    if (start === end && start > 0) input.setRangeText('', start - 1, start, 'end');
    else input.setRangeText('', start, end, 'end');
    input.focus();
  };
  return h('div', { class: 'keyboard', dir: langInfo(code).dir },
    forms,
    rows.map((row) => h('div', { class: 'key-row' }, row.split(' ').map((text) => (code === 'ti' && /^[ሀ-ፚ]$/.test(text)
      ? key(text, () => pickForms(text))
      : key(text))))),
    h('div', { class: 'key-row' },
      h('button', { type: 'button', class: 'key space', 'aria-label': 'Leerzeichen', onclick: () => insert(' ') }, '␣'),
      h('button', { type: 'button', class: 'key', 'aria-label': 'Löschen', onclick: erase }, '⌫')));
}
