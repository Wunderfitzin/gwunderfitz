// Screens. Every screen rebuilds #app from scratch through show().
const root = document.getElementById('app');
const langCodes = LANGUAGES.map((l) => l.code);
const knownIds = new Set(ITEMS.map((it) => it.id));

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (key === 'class') el.className = value;
    else if (value === true) el.setAttribute(key, '');
    else if (value !== false && value != null) el.setAttribute(key, value);
  }
  el.append(...children.flat().filter((c) => c != null));
  return el;
}

function show(...children) {
  Speech.stop();
  root.replaceChildren(...children.flat().filter(Boolean));
  window.scrollTo(0, 0);
}

const lang = () => Store.profile.lang;
const langInfo = (code) => LANGUAGES.find((l) => l.code === code);

// Text in the student's language, marked up so RTL and fonts behave.
function l1(text, code = lang()) {
  return h('span', { class: 'l1', lang: code, dir: langInfo(code).dir }, text);
}

// A language without translations yet shows its fallback language instead.
function pickText(map, code = lang()) {
  const shown = map[code] ? code : langInfo(code).fallback || 'en';
  return { text: map[shown], code: shown };
}

function localized(map, code = lang()) {
  const { text, code: shown } = pickText(map, code);
  return l1(text, shown);
}

// A German line with the student's language under it.
function pair(key, code = lang()) {
  return [h('span', { class: 'de' }, STRINGS[key].de), localized(STRINGS[key], code)];
}

// The student's own correction wins over the built-in translation.
function itemText(item) {
  const fix = Store.profile.fixes[`${lang()}:${item.id}`];
  return fix ? { text: fix, code: lang() } : pickText(item.t);
}

function itemL1(item) {
  const { text, code } = itemText(item);
  return l1(text, code);
}

// A drawing by its emoji key; the emoji itself is the fallback.
function icon(key, tag = 'span', className = 'ico') {
  const el = h(tag, { class: className, 'aria-hidden': 'true' });
  if (DRAWINGS[key]) el.innerHTML = DRAWINGS[key];
  else el.textContent = key;
  return el;
}

function picture(item, size = '') {
  return icon(item.pic, 'div', `pic ${size}`);
}

// Corrections stay out of the way until a student switches this on.
let editMode = false;

function redraw(refresh) {
  refresh();
  Speech.stop();
}

function editToggle(refresh, corner = false) {
  return h('button', {
    class: `edit-toggle${corner ? ' corner' : ''}${editMode ? ' on' : ''}`,
    'aria-pressed': String(editMode),
    'aria-label': STRINGS.fix.de,
    title: STRINGS.fix.de,
    onclick: () => { editMode = !editMode; redraw(refresh); },
  }, icon('✏️'), corner ? null : h('span', { class: 'stack' }, pair('fix')));
}

function editableL1(item, refresh) {
  if (!editMode) return itemL1(item);
  return h('button', { class: 'editable', onclick: () => openFix(item, refresh) }, itemL1(item));
}

function openFix(item, refresh) {
  const code = lang();
  const field = h('textarea', {
    class: 'answer', rows: 2, maxlength: MAX_FIX_LENGTH, lang: code, dir: langInfo(code).dir,
    'aria-label': STRINGS.fixHelp.de,
  });
  field.value = Store.profile.fixes[`${code}:${item.id}`] || item.t[code] || '';
  const close = () => { dialog.close(); dialog.remove(); };
  const dialog = h('dialog', { class: 'fix' },
    germanWord(item),
    h('p', { class: 'stack help' }, pair('fixHelp')),
    field,
    h('div', { class: 'fix-actions' },
      h('button', { class: 'choice stack', onclick: close }, pair('cancel')),
      h('button', {
        class: 'primary stack',
        onclick: () => { Store.setFix(code, item.id, field.value); close(); redraw(refresh); },
      }, pair('fixSave'))));
  document.body.append(dialog);
  dialog.showModal();
}

function germanWord(item) {
  if (!item.art) return h('span', { class: 'word' }, item.de);
  return h('span', { class: 'word' }, h('span', { class: `art art-${item.art}` }, item.art), ' ', item.de);
}

function fullGerman(item) {
  return item.art ? `${item.art} ${item.de}` : item.de;
}

function audioButtons(text) {
  if (!Speech.has('de')) return null;
  return h('div', { class: 'audio' },
    h('button', { class: 'round', 'aria-label': STRINGS.speak.de, title: STRINGS.speak.de, onclick: () => Speech.say(text) }, icon('🔊')),
    h('button', { class: 'round', 'aria-label': STRINGS.speakSlow.de, title: STRINGS.speakSlow.de, onclick: () => Speech.say(text, 'de', 0.55) }, icon('🐢')));
}

function topicItems(id) {
  return ITEMS.filter((it) => it.topic === id);
}

function brand() {
  return h('div', { class: 'brand' }, icon('🦊', 'span', 'brand-mark'), 'Gwunderfitz');
}

// ---- Getting started ----

function renderStart() {
  const profiles = Store.profiles();
  if (!profiles.length) return renderChooseLanguage();
  const known = LANGUAGES.find((l) => l.code === profiles[0].lang).code;
  show(h('main', { class: 'page narrow' },
    brand(),
    h('h1', { class: 'stack' }, pair('who', known)),
    h('div', { class: 'animals' },
      profiles.map((p) => h('button', {
        class: 'animal',
        'aria-label': p.animal,
        onclick: () => { Store.select(p.animal); renderHome(); },
      }, icon(p.animal))),
      Store.freeAnimals().length ? h('button', {
        class: 'animal add', 'aria-label': STRINGS.newProfile.de, onclick: renderChooseLanguage,
      }, '+') : null)));
}

function renderChooseLanguage() {
  show(h('main', { class: 'page narrow' },
    brand(),
    h('h1', {}, STRINGS.chooseLang.de),
    h('div', { class: 'stack-list' },
      LANGUAGES.map((l) => h('button', {
        class: 'choice big', lang: l.code, dir: l.dir, onclick: () => renderChooseAnimal(l.code),
      }, l.name)))));
}

function renderChooseAnimal(code) {
  show(h('main', { class: 'page narrow' },
    brand(),
    h('h1', { class: 'stack' }, pair('pickAnimal', code)),
    h('div', { class: 'animals' },
      Store.freeAnimals().map((a) => h('button', {
        class: 'animal', 'aria-label': a,
        onclick: () => { Store.createProfile(a, code); renderHome(); },
      }, icon(a))))));
}

// ---- Home ----

function renderHome() {
  editMode = false;
  const records = Store.profile.items;
  const plan = planSession(ITEMS, records, dayNumber());
  const learned = countLearned(records);

  show(h('main', { class: 'page' },
    h('header', { class: 'topbar' },
      brand(),
      h('button', { class: 'animal small', 'aria-label': STRINGS.settings.de, onclick: renderSettings }, icon(Store.profile.animal))),
    Speech.has('de') ? null : h('p', { class: 'notice stack' }, pair('noVoice')),
    plan.length
      ? h('button', { class: 'hero', onclick: () => startSession(plan) },
          h('span', { class: 'hero-text stack' }, pair('today')),
          h('span', { class: 'hero-count', 'aria-hidden': 'true' }, String(plan.length)))
      : h('button', { class: 'hero calm', onclick: () => startSession(planPractice(ITEMS, records)) },
          h('span', { class: 'hero-text stack' }, pair('allDone')),
          h('span', { class: 'hero-sub stack' }, pair('practiceMore'))),
    STRINGS.today[lang()] ? null : h('p', { class: 'notice stack' }, pair('noTranslation')),
    learned ? h('p', { class: 'count' }, h('strong', {}, String(learned)), ' ', STRINGS.learned.de, ' · ', localized(STRINGS.learned)) : null,
    [['praesens', '🔤'], ['perfekt', '⏪'], ['gefuehle', '💞']].map(([key, pic]) => {
      const def = COURSES[key];
      const share = courseShare(def);
      return h('button', { class: 'course-link', onclick: () => renderCourse(def) },
        icon(pic, 'span', 'topic-icon'),
        h('span', { class: 'stack' }, pair(def.title)),
        h('span', { class: 'meter', role: 'img', 'aria-label': `${share} %` }, h('span', { style: `width:${share}%` })));
    }),
    h('h2', { class: 'stack' }, pair('grammar')),
    h('div', { class: 'topics' }, GRAMMAR.map((lesson) => h('button', {
      class: 'topic', onclick: () => renderGrammar(lesson, 0, renderHome),
    },
      icon('📐', 'span', 'topic-icon'),
      h('span', { class: 'stack' }, h('span', { class: 'de' }, lesson.title.de), localized(lesson.title))))),
    h('h2', { class: 'stack' }, pair('topics')),
    h('div', { class: 'topics' }, TOPICS.map(topicCard))));
}

function grammarExample(id, capitals) {
  const item = ITEMS.find((it) => it.id === id);
  const word = capitals
    ? h('span', { class: 'word' }, h('span', { class: `art art-${item.art}` }, item.art), ' ', h('span', { class: 'capital' }, item.de[0]), item.de.slice(1))
    : germanWord(item);
  return h('li', {}, picture(item), word);
}

function renderGrammar(lesson, index, onDone) {
  const card = lesson.cards[index];
  const last = index === lesson.cards.length - 1;
  show(h('main', { class: 'page narrow session' },
    h('p', { class: 'tag stack' }, pair('grammar')),
    h('h1', { class: 'stack' }, h('span', { class: 'de' }, lesson.title.de), localized(lesson.title)),
    h('div', { class: 'card' },
      h('p', { class: 'rule' }, card.text.de),
      localized(card.text),
      h('ul', { class: 'examples' }, card.examples.map((id) => grammarExample(id, card.capitals)))),
    audioButtons(card.text.de),
    h('button', {
      class: 'primary wide stack',
      onclick: () => {
        if (!last) return renderGrammar(lesson, index + 1, onDone);
        Store.profile.grammar[lesson.id] = true;
        Store.save();
        onDone();
      },
    }, pair('next'))));
  root.querySelector('.primary').focus();
  Speech.say(card.text.de);
}

function topicCard(topic) {
  const share = topicProgress(topicItems(topic.id), Store.profile.items);
  return h('button', { class: 'topic', onclick: () => renderTopic(topic) },
    icon(topic.icon, 'span', 'topic-icon'),
    h('span', { class: 'stack' }, h('span', { class: 'de' }, topic.title.de), localized(topic.title)),
    h('span', { class: 'meter', role: 'img', 'aria-label': `${Math.round(share * 100)} %` },
      h('span', { style: `width:${Math.round(share * 100)}%` })));
}

function renderTopic(topic) {
  const items = topicItems(topic.id);
  const records = Store.profile.items;
  const refresh = () => renderTopic(topic);
  show(h('main', { class: 'page' },
    h('header', { class: 'topbar' },
      h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de),
      editToggle(refresh)),
    icon(topic.icon, 'div', 'pic big'),
    h('h1', { class: 'stack' }, h('span', { class: 'de' }, topic.title.de), localized(topic.title)),
    h('button', { class: 'primary wide stack', onclick: () => startSession(topicPlan(items, records)) }, pair('practice')),
    h('button', { class: 'choice stack center', onclick: () => startWriting(items) }, pair('writing')),
    h('ul', { class: 'wordlist' }, items.map((it) => h('li', {},
      picture(it),
      h('span', { class: 'stack' }, germanWord(it), editableL1(it, refresh)),
      Speech.has('de') ? h('button', {
        class: 'round', 'aria-label': `${STRINGS.speak.de}: ${fullGerman(it)}`, onclick: () => Speech.say(fullGerman(it)),
      }, icon('🔊')) : null)))));
}

function topicPlan(items, records) {
  const plan = planSession(items, records, dayNumber());
  return plan.length ? plan : planPractice(items, records);
}

// ---- Practice session ----

let session = null;

function startSession(items) {
  // Every student meets the rules before their first nouns.
  const unseen = GRAMMAR.find((lesson) => !Store.profile.grammar[lesson.id]);
  if (unseen && items.some((it) => it.art)) return renderGrammar(unseen, 0, () => startSession(items));
  session = {
    queue: items.map((item) => ({ item, retry: false, introduced: false })),
    index: 0,
    first: items.length,
    right: 0,
  };
  nextStep();
}

// Every level with a few words, so writing builds up within one sitting. These
// steps do not move words between boxes: one word appears several times here.
const WRITING_WORDS = 3;

function startWriting(items) {
  const records = Store.profile.items;
  const words = planPractice(items.filter(isTypable), records, WRITING_WORDS);
  const queue = WRITING_LEVELS.flatMap((level, i) => shuffle(words).map((item) => ({
    item, level, retry: false, introduced: i > 0 || !!records[item.id], ungraded: true,
  })));
  session = { queue, index: 0, first: queue.length, right: 0 };
  nextStep();
}

function sessionFrame(...content) {
  const done = session.index / session.queue.length;
  show(h('main', { class: 'page narrow session' },
    h('header', { class: 'session-bar' },
      h('button', { class: 'round', 'aria-label': STRINGS.home.de, onclick: renderHome }, '✕'),
      h('span', { class: 'meter grow', role: 'img', 'aria-label': `${session.index + 1} / ${session.queue.length}` },
        h('span', { style: `width:${Math.round(done * 100)}%` }))),
    content));
}

function nextStep() {
  const step = session.queue[session.index];
  if (!step) return renderDone();
  const record = Store.profile.items[step.item.id];
  if (!record && !step.introduced) return renderIntro(step);
  const box = record ? record.box : 0;
  const type = step.level || chooseExercise(step.item, box, Speech.has('de'));
  ({
    listen: renderChoice, meaning: renderChoice, pickDe: renderChoice, article: renderArticle, type: renderType,
    build: renderBuild, letter: renderSpelling, drag: renderSpelling, scramble: renderSpelling,
  })[type](step, type);
}

// A big mark, and on a mistake the student's own answer struck through.
function verdict(correct, given) {
  return [
    h('div', { class: 'mark', 'aria-hidden': 'true' }, correct ? '✓' : '✗'),
    !correct && given != null ? h('div', { class: 'given' },
      h('span', { class: 'stack' }, pair('yourAnswer')),
      h('s', { class: 'given-answer' }, given)) : null,
    h('p', { class: 'stack feedback-title' }, pair(correct ? 'right' : 'notYet')),
  ];
}

function renderIntro(step) {
  const { item } = step;
  const refresh = () => renderIntro(step);
  sessionFrame(
    h('p', { class: 'tag stack' }, pair('newWord')),
    h('div', { class: 'card' },
      editToggle(refresh, true),
      picture(item, 'huge'),
      germanWord(item),
      editableL1(item, refresh)),
    audioButtons(fullGerman(item)),
    h('button', { class: 'primary wide stack', autofocus: true, onclick: () => { step.introduced = true; nextStep(); } }, pair('next')));
  Speech.say(fullGerman(item));
}

function answer(step, correct, given) {
  const profile = Store.profile;
  if (!step.retry) {
    if (!step.ungraded) {
      profile.items[step.item.id] = grade(profile.items[step.item.id], correct, dayNumber());
      Store.save();
    }
    if (correct) session.right += 1;
  }
  if (!correct && !step.retry) session.queue.push({ ...step, retry: true, introduced: true });
  renderFeedback(step, correct, given);
}

function renderFeedback(step, correct, given) {
  const { item } = step;
  const advance = () => { session.index += 1; nextStep(); };
  const refresh = () => renderFeedback(step, correct, given);
  sessionFrame(
    h('div', { class: `feedback ${correct ? 'good' : 'again'}`, role: 'status' },
      editToggle(refresh, true),
      verdict(correct, given),
      picture(item, 'big'),
      germanWord(item),
      editableL1(item, refresh)),
    audioButtons(fullGerman(item)),
    h('button', { class: 'primary wide stack', onclick: advance }, pair('next')));
  root.querySelector('.primary').focus();
  Speech.say(fullGerman(item));
}

function renderChoice(step, type) {
  const { item } = step;
  const toGerman = type === 'pickDe';
  const pictures = !toGerman && !item.abstract;
  const label = toGerman ? fullGerman : pictures ? (it) => it.pic : (it) => itemText(it).text;
  const pool = ITEMS.filter((it) => !pictures || !it.abstract);
  const options = makeOptions(item, pool, label);

  const prompt = {
    listen: () => audioButtons(fullGerman(item)),
    meaning: () => h('div', { class: 'card' }, germanWord(item)),
    pickDe: () => h('div', { class: 'card' },
      item.abstract ? null : picture(item, 'big'),
      h('span', { class: 'prompt-l1' }, itemL1(item))),
  }[type]();

  sessionFrame(
    h('h1', { class: 'stack task' }, pair(type)),
    prompt,
    h('div', { class: pictures ? 'options pictures' : 'options' },
      options.map((option) => h('button', {
        class: 'option',
        'aria-label': pictures ? itemText(option).text : null,
        onclick: () => answer(step, option.id === item.id, toGerman ? fullGerman(option) : pictures ? picture(option) : itemL1(option)),
      }, toGerman ? fullGerman(option) : pictures ? picture(option) : itemL1(option)))));
  if (type !== 'pickDe') Speech.say(fullGerman(item));
}

function renderArticle(step) {
  const { item } = step;
  sessionFrame(
    h('h1', { class: 'stack task' }, pair('article')),
    h('div', { class: 'card' },
      picture(item, 'big'),
      h('span', { class: 'word' }, item.de),
      itemL1(item)),
    h('div', { class: 'options three' },
      ['der', 'die', 'das'].map((art) => h('button', {
        class: `option art-button art-${art}`, onclick: () => answer(step, art === item.art, art),
      }, art))));
}

function renderType(step) {
  const { item } = step;
  const input = h('input', {
    type: 'text', class: 'answer', lang: 'de', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
    'aria-label': STRINGS.type.de,
  });
  const insert = (letter) => {
    input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end');
    input.focus();
  };
  sessionFrame(
    h('h1', { class: 'stack task' }, pair('type')),
    h('div', { class: 'card' },
      picture(item, 'big'),
      itemL1(item)),
    audioButtons(fullGerman(item)),
    h('form', {
      class: 'type-form',
      onsubmit: (e) => {
        e.preventDefault();
        if (input.value.trim()) answer(step, checkTyped(item, input.value), input.value.trim());
      },
    },
      input,
      h('div', { class: 'letters' }, ['ä', 'ö', 'ü'].map((letter) => h('button', {
        type: 'button', class: 'letter', onclick: () => insert(letter),
      }, letter))),
      h('button', { type: 'submit', class: 'primary wide stack' }, pair('check'))));
  input.focus();
}

// Letter exercises. A tile can be dragged onto a slot or simply tapped, which
// fills the next free slot; tapping a filled slot gives the letter back.
function renderSpelling(step, level) {
  const { item } = step;
  const task = spellingTask(item.de, level);
  const tiles = task.tiles.map((text, id) => ({ text, id }));
  const filled = task.slots.map(() => null);
  const open = task.slots.map((letter, i) => (letter ? null : i)).filter((i) => i !== null);

  const slotRow = h('div', { class: 'slots', dir: 'ltr' });
  const bank = h('div', { class: 'tile-bank', dir: 'ltr' });
  const check = h('button', {
    class: 'primary wide stack', disabled: true,
    onclick: () => {
      const word = task.slots.map((letter, i) => letter || filled[i].text).join('');
      answer(step, word === item.de, word);
    },
  }, pair('check'));

  const place = (tile, slot) => {
    const free = slot ?? open.find((i) => !filled[i]);
    if (free === undefined) return;
    const from = filled.indexOf(tile);
    if (from >= 0) filled[from] = null;
    filled[free] = tile;
    draw();
  };

  const startDrag = (event, tile, node) => {
    event.preventDefault();
    const ghost = node.cloneNode(true);
    ghost.classList.add('dragging');
    document.body.append(ghost);
    const move = (e) => {
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
    };
    move(event);
    const startX = event.clientX;
    const startY = event.clientY;
    const stop = (e) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
      ghost.remove();
      if (Math.hypot(e.clientX - startX, e.clientY - startY) < 8) return place(tile);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const slot = target && target.closest('[data-slot]');
      if (slot) place(tile, Number(slot.dataset.slot));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  };

  const tileNode = (tile) => {
    const node = h('button', {
      class: 'tile letter-tile',
      onpointerdown: (e) => startDrag(e, tile, node),
      onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); place(tile); } },
    }, tile.text);
    return node;
  };

  const draw = () => {
    slotRow.replaceChildren(...task.slots.map((letter, i) => {
      if (letter) return h('span', { class: 'slot fixed' }, letter);
      const tile = filled[i];
      return h('button', {
        class: tile ? 'slot taken' : 'slot', 'data-slot': i,
        'aria-label': tile ? tile.text : `${i + 1}`,
        onclick: () => { if (tile) { filled[i] = null; draw(); } },
      }, tile ? tile.text : '');
    }));
    bank.replaceChildren(...tiles.map((tile) => (filled.includes(tile)
      ? h('span', { class: 'tile letter-tile ghost', 'aria-hidden': 'true' }, tile.text)
      : tileNode(tile))));
    check.disabled = open.some((i) => !filled[i]);
  };
  draw();

  sessionFrame(
    h('h1', { class: 'stack task' }, pair(level)),
    h('div', { class: 'card' }, picture(item, 'big'), itemL1(item)),
    audioButtons(fullGerman(item)),
    slotRow, bank, check);
  Speech.say(fullGerman(item));
}

function renderBuild(step) {
  const { item } = step;
  const words = item.de.split(' ').map((text, id) => ({ text, id }));
  let tiles = shuffle(words);
  // A shuffle that lands on the solution would leave nothing to do.
  while (tiles.length > 1 && tiles.every((t, i) => t.id === i)) tiles = shuffle(words);
  const placed = [];

  const line = h('div', { class: 'sentence-line' });
  const bank = h('div', { class: 'tile-bank' });
  const check = h('button', {
    class: 'primary wide stack', disabled: true,
    onclick: () => {
      const built = placed.map((t) => t.text).join(' ');
      answer(step, built === item.de, built);
    },
  }, pair('check'));

  const draw = () => {
    line.replaceChildren(...placed.map((tile) => h('button', {
      class: 'tile',
      onclick: () => { placed.splice(placed.indexOf(tile), 1); draw(); },
    }, tile.text)));
    bank.replaceChildren(...tiles.map((tile) => (placed.includes(tile)
      ? h('span', { class: 'tile ghost', 'aria-hidden': 'true' }, tile.text)
      : h('button', { class: 'tile', onclick: () => { placed.push(tile); draw(); } }, tile.text))));
    check.disabled = placed.length !== tiles.length;
  };
  draw();

  sessionFrame(
    h('h1', { class: 'stack task' }, pair('build')),
    h('div', { class: 'card' }, itemL1(item)),
    audioButtons(item.de),
    line, bank, check);
}

function renderDone() {
  const total = session.first;
  show(h('main', { class: 'page narrow' },
    h('div', { class: 'card done' },
      icon(Store.profile.animal, 'div', 'pic huge'),
      h('h1', { class: 'stack' }, pair('wellDone')),
      h('p', { class: 'score' }, `${session.right} / ${total} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount))),
    h('button', { class: 'primary wide stack', onclick: renderHome }, pair('home'))));
  root.querySelector('.primary').focus();
}

// ---- Verb course ----

let course = null;

const COURSES = {
  praesens: { title: 'course', parts: COURSE, stations: STATIONS },
  perfekt: { title: 'pfCourse', parts: PF_COURSE, stations: PF_STATIONS },
  gefuehle: { title: 'gfCourse', parts: GF_COURSE, stations: GF_STATIONS },
};
let shownCourse = COURSES.praesens;

function courseShare(def) {
  const done = def.stations.filter((s) => Store.profile.verbs[s.id]).length;
  return Math.round((done / def.stations.length) * 100);
}

// Also used as a click handler, so anything that is not a course keeps the current one.
function renderCourse(def) {
  if (def && def.parts) shownCourse = def;
  const { stations, parts, title } = shownCourse;
  const next = stations.find((s) => !Store.profile.verbs[s.id]);
  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de), null),
    h('h1', { class: 'stack' }, pair(title)),
    parts.flatMap((part) => [
      h('h2', { class: 'stack' }, pair(part.section)),
      h('ol', { class: 'stations' }, part.stations.map((station) => {
        const done = Store.profile.verbs[station.id];
        const kindKey = station.kind === 'practice' ? 'practice' : station.kind;
        return h('li', {}, h('button', {
          class: `station${station === next ? ' next' : ''}`, onclick: () => startStation(station),
        },
          h('span', { class: 'station-mark', 'aria-hidden': 'true' }, done ? '✓' : station.kind === 'test' ? '★' : '○'),
          h('span', { class: 'stack' },
            h('span', { class: 'de' }, station.title),
            h('span', { class: 'station-kind' }, STRINGS[kindKey].de, ' · ', localized(STRINGS[kindKey]))),
          station === next ? h('span', { class: 'station-next stack' }, pair('continueHere')) : null));
      })),
    ])));
}

function startStation(station) {
  course = {
    station,
    steps: station.steps ? station.steps() : [],
    stepIndex: 0,
    queue: (station.questions ? station.questions(Math.random) : []).map((q) => ({ q, retry: false })),
    index: 0,
    right: 0,
  };
  course.first = course.queue.length;
  courseNext();
}

function courseNext() {
  if (course.stepIndex < course.steps.length) return renderCourseStep(course.steps[course.stepIndex]);
  if (course.index < course.queue.length) return renderQuestion(course.queue[course.index]);
  renderStationDone();
}

function courseFrame(...content) {
  const total = course.steps.length + course.queue.length;
  const share = Math.round(((course.stepIndex + course.index) / total) * 100);
  show(h('main', { class: 'page narrow session' },
    h('header', { class: 'session-bar' },
      h('button', { class: 'round', 'aria-label': STRINGS.home.de, onclick: renderCourse }, '✕'),
      h('span', { class: 'meter grow', role: 'img', 'aria-label': `${share} %` }, h('span', { style: `width:${share}%` }))),
    content));
}

function personPicture(key, size = 'big') {
  const el = h('div', { class: `pic scene ${size}`, 'aria-hidden': 'true' });
  el.innerHTML = personSvg(key);
  return el;
}

function figurePicture(who, size = 'big') {
  const el = h('div', { class: `pic figure ${size}`, 'aria-hidden': 'true' });
  el.innerHTML = figureSvg(who);
  return el;
}

// Asks for the student's name; the exercises that follow use it. Nothing is saved.
function renderNames() {
  const field = (key) => {
    const input = h('input', {
      type: 'text', class: 'answer', lang: 'de', autocomplete: 'off', autocapitalize: 'words', spellcheck: 'false',
      required: true, maxlength: 40, 'aria-label': RESPEKT[key].de,
    });
    return { input, row: h('label', { class: 'field stack' }, h('span', { class: 'de' }, RESPEKT[key].de), localized(RESPEKT[key]), input) };
  };
  const first = field('first');
  const last = field('last');
  const go = (title) => {
    const names = { first: first.input.value.trim(), last: last.input.value.trim(), title };
    if (!names.first || !names.last) return first.input.reportValidity() && last.input.reportValidity();
    const self = title ? `${title} ${names.last}` : `${names.first} ${names.last}`;
    course.steps.push(
      { learn: { figure: 'listener', de: `Hallo ${names.first}!`, t: RESPEKT.r5 } },
      { learn: { figure: 'elder', de: `Guten Tag, ${self}.`, t: RESPEKT.r6 } },
    );
    course.queue = respektPersonal(names).map((q) => ({ q, retry: false }));
    course.first = course.queue.length;
    course.stepIndex += 1;
    courseNext();
  };
  courseFrame(
    h('h1', { class: 'stack task' }, h('span', { class: 'de' }, RESPEKT.askName.de), localized(RESPEKT.askName)),
    first.row,
    last.row,
    h('p', { class: 'help stack' }, h('span', { class: 'de' }, RESPEKT.nameNote.de), localized(RESPEKT.nameNote)),
    h('p', { class: 'stack' }, h('span', { class: 'de' }, RESPEKT.askTitle.de), localized(RESPEKT.askTitle)),
    h('div', { class: 'options three' }, ['frau', 'herr', 'noTitle'].map((key) => h('button', {
      class: 'option stack center', onclick: () => go(key === 'noTitle' ? '' : RESPEKT[key].de),
    }, h('span', { class: 'de' }, RESPEKT[key].de), localized(RESPEKT[key])))));
  first.input.focus();
}

function emojiPicture(pic, size = 'big') {
  return icon(pic, 'div', `pic ${size}`);
}

function stemAndEnding(v, form) {
  const shared = v.id !== 'sein' && form.startsWith(v.stem) ? v.stem : null;
  if (!shared) return h('strong', { class: 'form-changed' }, form);
  return h('span', {}, shared, h('strong', { class: 'form-ending' }, form.slice(shared.length)));
}

function conjugationTable(id) {
  const v = verb(id);
  return h('table', { class: 'conj' }, h('tbody', {}, TABLE_ROWS.map((row) => {
    const form = conjugate(v, row.key);
    return h('tr', { onclick: () => Speech.say(`${row.label.split(',')[0]} ${form}`) },
      h('td', {}, row.label), h('td', {}, stemAndEnding(v, form)));
  })));
}

// A Perfekt sentence with haben/sein and the Partizip II marked: the two ends of the frame.
function perfektLine(frame) {
  const text = `${frame.start} ${frame.aux} ${frame.middle} ${frame.part}.`;
  return h('p', { class: 'example-line pf-line', onclick: () => Speech.say(text) },
    frame.start, ' ', h('strong', { class: 'pf-aux' }, frame.aux), ' ', frame.middle, ' ', h('strong', { class: 'pf-part' }, frame.part), '.');
}

function perfektTable(id) {
  const v = pfVerb(id);
  return h('table', { class: 'conj' }, h('tbody', {}, TABLE_ROWS.map((row) => {
    const aux = pfAuxForm(v, row.key);
    return h('tr', { onclick: () => Speech.say(`${row.label.split(',')[0]} ${aux} ${v.part}`) },
      h('td', {}, row.label), h('td', {}, h('strong', { class: 'pf-aux' }, aux), ' ', h('strong', { class: 'pf-part' }, v.part)));
  })));
}

// ich fühle mich, du fühlst dich …: the reflexive pronoun marked.
function reflexiveTable(id) {
  const f = gfFeeling(id);
  return h('table', { class: 'conj' }, h('tbody', {}, TABLE_ROWS.map((row) => {
    const text = `${conjugate(FUEHLEN, row.key)} ${GF_SELF[row.key]} ${f.de}`;
    return h('tr', { onclick: () => Speech.say(`${row.label.split(',')[0]} ${text}`) },
      h('td', {}, row.label),
      h('td', {}, conjugate(FUEHLEN, row.key), ' ', h('strong', { class: 'pf-aux' }, GF_SELF[row.key]), ' ', f.de));
  })));
}

// ge + spiel + t: the pieces of a regular or irregular Partizip II.
function perfektBuild(v) {
  const end = v.part.endsWith('en') ? 'en' : 't';
  const middle = v.part.slice(2, -end.length);
  return h('p', { class: 'split' }, v.de, ' → ', h('strong', { class: 'form-ending' }, 'ge'), middle, h('strong', { class: 'form-ending' }, end));
}

function renderCourseStep(step) {
  const advance = () => { course.stepIndex += 1; courseNext(); };
  const nextButton = h('button', { class: 'primary wide stack', onclick: advance }, pair('next'));
  if (step.names) return renderNames();
  if (step.learn) {
    const { learn } = step;
    courseFrame(
      h('div', { class: 'card' },
        learn.figure ? figurePicture(learn.figure)
          : learn.person ? personPicture(learn.person, 'huge') : emojiPicture(learn.pic, 'huge'),
        h('span', { class: 'word' }, learn.de),
        localized(learn.t),
        learn.example ? perfektLine(learn.example) : null,
        learn.line ? h('p', { class: 'example-line' }, learn.line) : null),
      audioButtons(learn.say || learn.de),
      nextButton);
    nextButton.focus();
    Speech.say(learn.say || learn.de);
    return;
  }
  const rule = (step.map || RULES)[step.rule];
  const examples = step.verbs ? h('ul', { class: 'examples' }, step.verbs.map((id) => h('li', {},
    emojiPicture(verb(id).pic, ''), h('span', { class: 'word' }, verb(id).de)))) : null;
  const split = step.split ? h('p', { class: 'split' },
    h('span', {}, verb(step.split).stem), ' + ', h('strong', { class: 'form-ending' }, 'en')) : null;
  courseFrame(
    h('div', { class: 'card' },
      step.person ? personPicture(step.person) : null,
      step.pic ? emojiPicture(step.pic) : null,
      h('p', { class: 'rule' }, rule.de),
      localized(rule.t || rule),
      split, examples,
      step.example ? h('p', { class: 'example-line' }, step.example) : null,
      step.table ? conjugationTable(step.table) : null,
      step.frame ? perfektLine(step.frame) : null,
      step.ptable ? perfektTable(step.ptable) : null,
      step.rtable ? reflexiveTable(step.rtable) : null,
      step.pics ? h('div', { class: 'pic-row' }, step.pics.map((pic) => emojiPicture(pic, ''))) : null,
      step.build ? perfektBuild(pfVerb(step.build)) : null,
      step.parts ? h('ul', { class: 'examples' }, step.parts.map((id) => h('li', {},
        emojiPicture(pfVerb(id).pic, ''), h('span', { class: 'word small' }, pfShown(pfVerb(id)))))) : null),
    audioButtons(rule.de),
    nextButton);
  nextButton.focus();
  Speech.say(rule.de);
}

function promptFor(q) {
  return h('div', { class: 'card' },
    q.figure ? figurePicture(q.figure) : null,
    q.person ? personPicture(q.person) : null,
    q.pic && !q.listen ? emojiPicture(q.pic, q.person ? '' : 'big') : null,
    q.sentence ? h('p', { class: 'rule' }, q.sentence) : null,
    q.sentenceL1 ? localized(q.sentenceL1) : null,
    q.l1 ? h('span', { class: 'prompt-l1' }, localized(q.l1)) : null,
    q.text ? h('span', { class: 'word' }, q.text) : null);
}

function renderQuestion(entry) {
  const { q } = entry;
  if (q.kind === 'match') return renderMatch(entry);
  if (q.kind === 'sort') return renderSort(entry);
  const prompt = q.listen ? null : promptFor(q);
  const replay = q.listen ? audioButtons(q.listen) : null;
  if (q.kind === 'type') {
    const input = h('input', {
      type: 'text', class: 'answer', lang: 'de', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': STRINGS.gap.de,
    });
    courseFrame(
      h('h1', { class: 'stack task' }, pair(q.task)),
      prompt,
      h('form', {
        class: 'type-form',
        onsubmit: (e) => {
          e.preventDefault();
          const accepted = (q.accept || [q.answer]).map(normalise);
          if (input.value.trim()) courseAnswer(entry, accepted.includes(normalise(input.value)), input.value.trim());
        },
      },
        input,
        h('div', { class: 'letters' }, ['ä', 'ö', 'ü'].map((letter) => h('button', {
          type: 'button', class: 'letter',
          onclick: () => { input.setRangeText(letter, input.selectionStart, input.selectionEnd, 'end'); input.focus(); },
        }, letter))),
        h('button', { type: 'submit', class: 'primary wide stack' }, pair('check'))));
    input.focus();
    return;
  }
  const grid = q.pictures ? 'options pictures' : q.options.length === 2 ? 'options two' : 'options';
  courseFrame(
    h('h1', { class: 'stack task' }, pair(q.task)),
    prompt,
    replay,
    h('div', { class: grid }, q.options.map((option) => h('button', {
      class: 'option',
      onclick: () => courseAnswer(entry, option === q.answer, q.pictures ? emojiPicture(option, '') : option),
    }, q.pictures ? emojiPicture(option, '') : option))));
  if (q.listen) Speech.say(q.listen);
}

function renderMatch(entry) {
  const { q } = entry;
  const lefts = shuffle(q.pairs);
  const rights = shuffle(q.pairs);
  let chosen = null;
  let found = 0;
  let mistakes = 0;
  const leftButtons = lefts.map((pair_) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (chosen) chosen.button.classList.remove('chosen');
        chosen = { pair: pair_, button };
        button.classList.add('chosen');
      },
    }, pair_.left);
    return button;
  });
  const rightButtons = rights.map((pair_) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (!chosen) return;
        if (chosen.pair.right !== pair_.right) {
          mistakes += 1;
          button.classList.add('wrong');
          setTimeout(() => button.classList.remove('wrong'), 500);
          return;
        }
        Speech.say(`${chosen.pair.left} ${pair_.right}`);
        chosen.button.disabled = true;
        chosen.button.classList.remove('chosen');
        button.disabled = true;
        chosen = null;
        found += 1;
        if (found === q.pairs.length) setTimeout(() => courseAnswer(entry, mistakes === 0), 700);
      },
    }, pair_.right);
    return button;
  });
  courseFrame(
    h('h1', { class: 'stack task' }, pair('match')),
    q.verbName ? h('div', { class: 'card' }, emojiPicture(q.pic), h('span', { class: 'word' }, q.verbName), localized(q.feedbackL1)) : null,
    h('div', { class: 'match' }, h('div', { class: 'options' }, leftButtons), h('div', { class: 'options' }, rightButtons)));
}

// Cards one after the other into two baskets. A wrong tap still files the card,
// but in the right basket and marked, so the student sees where it belongs.
function renderSort(entry) {
  const { q } = entry;
  let index = 0;
  let mistakes = 0;
  const card = h('div', { class: 'card sort-card', 'aria-live': 'polite' });
  const baskets = q.baskets.map((key) => ({ key, list: h('ul', { class: 'sort-list' }) }));
  const showCard = () => {
    const c = q.cards[index];
    card.replaceChildren(h('span', { class: 'word' }, c.de), c.t ? localized(c.t) : null);
    Speech.say(c.de);
  };
  const file = (basket, button) => {
    if (index >= q.cards.length) return;
    const c = q.cards[index];
    const right = c.basket === basket.key;
    if (!right) {
      mistakes += 1;
      button.classList.add('wrong');
      setTimeout(() => button.classList.remove('wrong'), 500);
    }
    baskets.find((b) => b.key === c.basket).list.append(h('li', { class: right ? 'sorted' : 'sorted corrected' }, c.de));
    index += 1;
    if (index === q.cards.length) setTimeout(() => courseAnswer(entry, mistakes === 0), 900);
    else showCard();
  };
  courseFrame(
    h('h1', { class: 'stack task' }, pair(q.task)),
    card,
    h('div', { class: 'sort-baskets' }, baskets.map((basket) => {
      const button = h('button', { class: 'option basket stack', onclick: () => file(basket, button) }, pair(basket.key));
      return h('div', { class: 'basket-col' }, button, basket.list);
    })));
  showCard();
}

function courseAnswer(entry, correct, given) {
  const { q } = entry;
  const isTest = course.station.kind === 'test';
  if (!entry.retry && correct) course.right += 1;
  if (!correct && !entry.retry && !isTest) course.queue.push({ q, retry: true });
  const advance = () => { course.index += 1; courseNext(); };
  const button = h('button', { class: 'primary wide stack', onclick: advance }, pair('next'));
  courseFrame(
    h('div', { class: `feedback ${correct ? 'good' : 'again'}`, role: 'status' },
      verdict(correct, given),
      q.figure ? figurePicture(q.figure) : q.person ? personPicture(q.person) : q.pic ? emojiPicture(q.pic) : null,
      q.full ? h('span', { class: 'word' }, q.full) : null,
      q.feedbackL1 ? localized(q.feedbackL1) : null),
    q.full ? audioButtons(q.say || q.full) : null,
    button);
  button.focus();
  if (q.full) Speech.say(q.say || q.full);
}

function renderStationDone() {
  const { station, right, first } = course;
  const isTest = station.kind === 'test';
  const passed = !isTest || right / first >= PASS_SHARE;
  if (passed) {
    Store.profile.verbs[station.id] = true;
    Store.save();
  }
  show(h('main', { class: 'page narrow' },
    h('div', { class: 'card done' },
      icon(Store.profile.animal, 'div', 'pic huge'),
      h('h1', { class: 'stack' }, pair(isTest ? (passed ? 'passed' : 'failed') : 'wellDone')),
      first ? h('p', { class: 'score' }, `${right} / ${first} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount)) : null),
    passed ? null : h('button', { class: 'choice stack', onclick: () => startStation(station) }, pair('practice')),
    h('button', { class: 'primary wide stack', onclick: renderCourse }, pair('next'))));
  root.querySelector('.primary').focus();
}

// ---- Settings ----

function saveFile() {
  const blob = new Blob([Store.exportProfile()], { type: 'application/json' });
  const link = h('a', { href: URL.createObjectURL(blob), download: 'gwunderfitz-fortschritt.json' });
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderSettings(message) {
  const fileInput = h('input', {
    type: 'file', accept: '.json,application/json', hidden: true,
    onchange: async () => {
      const file = fileInput.files[0];
      if (!file) return;
      const loaded = Store.importProfile(await file.text(), knownIds, langCodes);
      if (loaded) renderHome();
      else renderSettings('loadFailed');
    },
  });

  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' },
      h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de),
      null),
    h('h1', { class: 'stack' }, pair('settings')),
    h('h2', { class: 'stack' }, pair('language')),
    h('div', { class: 'stack-list' },
      LANGUAGES.map((l) => h('button', {
        class: l.code === lang() ? 'choice selected' : 'choice',
        'aria-pressed': String(l.code === lang()),
        lang: l.code, dir: l.dir,
        onclick: () => { Store.profile.lang = l.code; Store.save(); renderSettings(); },
      }, l.name))),
    h('h2', { class: 'stack' }, pair('moveTitle')),
    h('p', { class: 'stack help' }, pair('moveHelp')),
    typeof message === 'string' ? h('p', { class: 'notice stack', role: 'alert' }, pair(message)) : null,
    h('div', { class: 'stack-list' },
      h('button', { class: 'choice stack', onclick: saveFile }, pair('save')),
      h('button', { class: 'choice stack', onclick: () => fileInput.click() }, pair('load')),
      fileInput),
    h('div', { class: 'settings-end' },
      h('button', { class: 'choice stack', onclick: () => { Store.signOut(); renderStart(); } }, pair('who')),
      h('button', {
        class: 'text-button danger',
        onclick: () => {
          if (confirm(`${STRINGS.deleteConfirm.de}\n${pickText(STRINGS.deleteConfirm).text}`)) {
            Store.deleteProfile();
            renderStart();
          }
        },
      }, STRINGS.deleteProfile.de))));
}

// ---- Author screen (index.html?autor), German only and not linked from the app ----

function recordingSections() {
  return [
    ...GRAMMAR.map((lesson) => ({ title: `Grammatik: ${lesson.title.de}`, texts: lesson.cards.map((card) => card.text.de) })),
    ...TOPICS.map((topic) => ({ title: topic.title.de, texts: topicItems(topic.id).map(fullGerman) })),
    { title: 'Verben: Regeln', texts: RULE_KEYS.map((key) => RULES[key].de) },
    { title: 'Perfekt: Regeln', texts: PF_RULE_KEYS.map((key) => PF_RULES[key].de) },
    { title: 'Perfekt: Partizip II', texts: PF_VERBS.map(pfSaid) },
    { title: 'Gefühle: Regeln', texts: GF_RULE_KEYS.map((key) => GF_RULES[key].de) },
    { title: 'Gefühle und Bedürfnisse', texts: [...GF_FEELINGS.map(gfSay), ...GF_NEEDS.map(gfNeedName), ...GF_SITUATIONS.map((x) => x.de)] },
    { title: 'Respektsform', texts: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'askName', 'askFirst', 'askLast'].map((key) => RESPEKT[key].de).concat(TEACHERS.map((t) => `Guten Tag, ich bin ${t.name}.`)) },
    { title: 'Verben: Grundformen', texts: VERBS.map((v) => v.de) },
    { title: 'Verben: Personen', texts: [...new Set(PERSONS.map((p) => p.de))] },
    { title: 'sein', texts: [...new Set(PERSONS.map((p) => sentence(verb('sein'), p.key, 'müde')))] },
    { title: 'haben', texts: [...new Set(PERSONS.map((p) => sentence(verb('haben'), p.key, 'Hunger')))] },
  ];
}

let activeRecorder = null;

async function startRecording(onDone) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = () => {
    stream.getTracks().forEach((track) => track.stop());
    const reader = new FileReader();
    reader.onload = () => onDone(reader.result);
    reader.readAsDataURL(new Blob(chunks, { type: recorder.mimeType }));
  };
  recorder.start();
  activeRecorder = recorder;
}

function renderAuthor() {
  const sections = recordingSections();
  const total = sections.reduce((sum, s) => sum + s.texts.length, 0);
  const counter = h('p', { class: 'count' });
  const message = h('p', { class: 'notice', hidden: true, role: 'alert' });
  const updateCount = () => {
    const done = sections.reduce((sum, s) => sum + s.texts.filter((t) => Recordings.url(t)).length, 0);
    counter.textContent = `${done} von ${total} aufgenommen`;
  };
  const fail = (text) => { message.textContent = text; message.hidden = false; };

  const makeRow = (text) => {
    const row = h('li', { class: 'rec-row' });
    const redrawRow = (recording = false) => {
      const url = Recordings.url(text);
      row.replaceChildren(
        h('span', { class: 'rec-text' }, url ? '✓ ' : '', text),
        h('button', {
          class: recording ? 'round rec on' : 'round rec',
          'aria-label': recording ? 'Aufnahme beenden' : 'Aufnehmen',
          title: recording ? 'Aufnahme beenden' : 'Aufnehmen',
          onclick: async () => {
            if (recording) {
              activeRecorder.stop();
              activeRecorder = null;
              return;
            }
            if (activeRecorder) return fail('Beende zuerst die laufende Aufnahme.');
            try {
              await startRecording(async (dataUrl) => {
                await Recordings.save(text, dataUrl);
                redrawRow();
                updateCount();
              });
              redrawRow(true);
            } catch {
              fail('Das Mikrofon lässt sich nicht starten. Erlaube den Zugriff im Browser und versuche es noch einmal.');
            }
          },
        }, recording ? '■' : '●'),
        h('button', { class: 'round', 'aria-label': 'Anhören', title: 'Anhören', disabled: !url, onclick: () => Speech.say(text) }, '▶'),
        h('button', {
          class: 'round', 'aria-label': 'Aufnahme löschen', title: 'Aufnahme löschen', disabled: !Recordings.local[Recordings.key(text)],
          onclick: async () => { await Recordings.remove(text); redrawRow(); updateCount(); },
        }, '🗑'));
    };
    redrawRow();
    return row;
  };

  updateCount();
  show(h('main', { class: 'page' },
    brand(),
    h('h1', {}, 'Aufnahmen'),
    h('p', { class: 'help' }, 'Drücke ● und sprich den Text. Drücke ■, wenn du fertig bist. Wo eine Aufnahme fehlt, spricht die Geräte-Stimme.'),
    counter,
    message,
    h('button', {
      class: 'primary',
      onclick: () => {
        const blob = new Blob([Recordings.exportFile()], { type: 'text/javascript' });
        const link = h('a', { href: URL.createObjectURL(blob), download: 'recordings-data.js' });
        link.click();
        URL.revokeObjectURL(link.href);
      },
    }, 'Für alle Lernenden sichern'),
    h('p', { class: 'help' }, 'Lege die gesicherte Datei danach in den Ordner js und ersetze die alte. Erst dann hören alle Lernenden deine Stimme.'),
    sections.flatMap((section) => [
      h('h2', {}, section.title),
      h('ul', { class: 'wordlist' }, section.texts.map(makeRow)),
    ])));
}

// ---- Boot ----

async function init() {
  Store.load();
  await Promise.all([Speech.ready(), Recordings.load()]);
  if (new URLSearchParams(location.search).has('autor')) return renderAuthor();
  if (Store.profile) renderHome();
  else renderStart();
}

init();
