// Screens. Every screen rebuilds #app from scratch through show().
const root = document.getElementById('app');
const langCodes = LANGUAGES.map((l) => l.code);
const knownIds = new Set([...ITEMS, ...AMZ_ITEMS].map((it) => it.id));

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (key === 'class') el.className = value;
    else if (value === true) el.setAttribute(key, '');
    else if (value !== false && value != null) el.setAttribute(key, value);
  }
  el.append(...children.flat(Infinity).filter((c) => c != null));
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
  const same = pickText(STRINGS[key], code).text === STRINGS[key].de;
  return [h('span', { class: 'de' }, STRINGS[key].de), same ? null : localized(STRINGS[key], code)];
}

// The student's own correction wins over the built-in translation.
function itemText(item) {
  if (item.own) return { text: item.l1, code: item.lang };
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

// A thick yellow arrow with a dark edge, so it shows on light and dark parts of a photo.
function arrowSvg([x1, y1, x2, y2]) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const [dx, dy] = [(x2 - x1) / len, (y2 - y1) / len];
  const [bx, by] = [x2 - dx * 55, y2 - dy * 55];
  const head = [[x2, y2], [bx - dy * 38, by + dx * 38], [bx + dy * 38, by - dx * 38]].map((pt) => pt.map(Math.round).join(',')).join(' ');
  return `<line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" class="arrow-edge"/><line x1="${x1}" y1="${y1}" x2="${bx}" y2="${by}" class="arrow"/><polygon points="${head}" class="arrow-tip"/>`;
}

// A photo at its own proportions, so arrows drawn in its pixels stay on target.
function photo(p) {
  const el = h('span', { class: 'photo' }, h('img', { src: p.src, alt: '', width: p.w, height: p.h, loading: 'lazy' }));
  if (p.arrows) el.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 ${p.w} ${p.h}" aria-hidden="true">${p.arrows.map(arrowSvg).join('')}</svg>`);
  return el;
}

// Words with photos show both photos when large, and the clearer second one when small.
function picture(item, size = '') {
  if (item.photos) {
    const shown = size ? item.photos : item.photos.slice(-1);
    return h('div', { class: `pic photos ${size}`, 'aria-hidden': 'true' }, shown.map(photo));
  }
  if (!item.pic) return null;
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
  if (!editMode || item.own) return itemL1(item);
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
    screenKeyboard(field, code),
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

function ownItems() {
  return Store.profile.own.map(ownItem);
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
    h('h1', { class: 'stack' }, pair('pickAvatar', code)),
    h('div', { class: 'animals' },
      Store.freeAnimals().map((a) => h('button', {
        class: 'animal avatar', 'aria-label': avatarName(a) || a,
        onclick: () => { Store.createProfile(a, code); renderHome(); },
      }, icon(a), avatarName(a) ? h('span', { class: 'avatar-name' }, avatarName(a)) : null)))));
}

// ---- Home ----

// «Warum lerne ich das?»: one line in German and the student's language, under a block.
function whyLine(key) {
  return h('span', { class: 'why stack' }, pair(key));
}

// The student's animal greets and says how long today's words take.
function greeting(planned) {
  const minutes = Math.max(1, Math.round(planned * 0.6));
  return h('div', { class: 'greeting' },
    icon(Store.profile.animal, 'div', 'pic greeting-animal'),
    h('div', { class: 'greeting-bubble stack' },
      pair('hello'),
      planned ? [h('span', { class: 'de greeting-plan' }, fillPlan(STRINGS.todayPlan, planned, minutes).de), localized(fillPlan(STRINGS.todayPlan, planned, minutes))] : null));
}

function renderHome() {
  editMode = false;
  const records = Store.profile.items;
  const plan = planSession(ITEMS.concat(AMZ_ITEMS, ownItems()), records, dayNumber());
  const learned = countLearned(records);

  show(h('main', { class: 'page' },
    h('header', { class: 'topbar' },
      brand(),
      h('button', { class: 'animal small', 'aria-label': STRINGS.settings.de, onclick: renderSettings }, icon(Store.profile.animal))),
    greeting(plan.length),
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
        whyLine(WHY[key]),
        h('span', { class: 'meter', role: 'img', 'aria-label': `${share} %` }, h('span', { style: `width:${share}%` })));
    }),
    h('button', { class: 'course-link', onclick: renderAmazonia },
      icon('🏺', 'span', 'topic-icon'),
      h('span', { class: 'stack' }, pair('amzTitle')),
      whyLine(WHY.amazonia),
      h('span', { class: 'meter', role: 'img', 'aria-label': `${amzShare()} %` }, h('span', { style: `width:${amzShare()}%` }))),
    h('button', { class: 'course-link', onclick: () => renderOwnWords() },
      icon('📝', 'span', 'topic-icon'),
      h('span', { class: 'stack' }, pair('myWords')),
      whyLine(WHY.own),
      Store.profile.own.length ? h('span', { class: 'own-count' }, String(Store.profile.own.length)) : null),
    h('h2', { class: 'stack' }, pair('grammar')),
    h('p', { class: 'why-block' }, whyLine(WHY.grammar)),
    h('div', { class: 'topics' }, GRAMMAR.map((lesson) => h('button', {
      class: 'topic', onclick: () => renderGrammar(lesson, 0, renderHome),
    },
      icon('📐', 'span', 'topic-icon'),
      h('span', { class: 'stack' }, h('span', { class: 'de' }, lesson.title.de), localized(lesson.title))))),
    h('h2', { class: 'stack' }, pair('topics')),
    h('p', { class: 'why-block' }, whyLine(WHY.topics)),
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

// The student's own words: a form to add them, the list, and the same practice as a topic.
function renderOwnWords() {
  const code = lang();
  const items = ownItems();
  const records = Store.profile.items;
  const field = (key, fieldLang, dir) => {
    const input = h('input', {
      type: 'text', class: 'answer', lang: fieldLang, dir, autocomplete: 'off', spellcheck: 'false',
      required: true, maxlength: MAX_OWN_LENGTH, 'aria-label': STRINGS[key].de,
    });
    return { input, row: h('div', { class: 'field' }, h('label', { class: 'stack' }, pair(key), input), screenKeyboard(input, fieldLang)) };
  };
  const german = field('inGerman', 'de', 'ltr');
  const own = field('inMyLanguage', code, langInfo(code).dir);
  show(h('main', { class: 'page' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de), null),
    icon('📝', 'div', 'pic big'),
    h('h1', { class: 'stack' }, pair('myWords')),
    h('form', {
      class: 'own-form card',
      onsubmit: (e) => {
        e.preventDefault();
        if (!german.input.value.trim() || !own.input.value.trim()) return;
        const word = Store.addOwnWord(german.input.value, own.input.value);
        renderOwnWords();
        openPicturePicker(word);
      },
    },
      h('p', { class: 'stack help' }, pair('myWordsHelp')),
      german.row,
      own.row,
      h('button', { type: 'submit', class: 'primary wide stack' }, pair('addWord'))),
    items.length ? [
      h('button', { class: 'primary wide stack', onclick: () => startSession(topicPlan(items, records)) }, pair('practice')),
      items.some(isTypable) ? h('button', { class: 'choice stack center', onclick: () => startWriting(items) }, pair('writing')) : null,
    ] : h('p', { class: 'stack help center' }, pair('noWordsYet')),
    h('ul', { class: 'wordlist own-list' }, [...items].reverse().map((it) => h('li', {},
      h('button', {
        class: 'own-pic', 'aria-label': `${STRINGS.pickPicture.de}: ${fullGerman(it)}`, title: STRINGS.pickPicture.de,
        onclick: () => openPicturePicker(Store.profile.own.find((w) => w.id === it.id)),
      }, picture(it) || icon('🖼️')),
      h('span', { class: 'stack' }, germanWord(it), itemL1(it)),
      h('span', { class: 'own-actions' },
        Speech.has('de') ? h('button', {
          class: 'round', 'aria-label': `${STRINGS.speak.de}: ${fullGerman(it)}`, onclick: () => Speech.say(fullGerman(it)),
        }, icon('🔊')) : null,
        h('button', {
          class: 'round', 'aria-label': `${STRINGS.removeWord.de}: ${fullGerman(it)}`, title: STRINGS.removeWord.de,
          onclick: () => { Store.removeOwnWord(it.id); renderOwnWords(); },
        }, '🗑')))))));
}

// Everything an own word can show: the unit's photos and every drawing, each with
// the German words it stands for in the app, so a search can find it.
function pictureOptions() {
  const words = {};
  const add = (key, de) => { (words[key] = words[key] || []).push(de.toLowerCase()); };
  ITEMS.forEach((it) => add(it.pic, it.de));
  AMZ_ITEMS.forEach((it) => add(it.pic, it.de));
  VERBS.forEach((v) => add(v.pic, v.de));
  const photos = AMZ_ITEMS.filter((it) => it.photos).flatMap((it) => it.photos.map((p) => ({
    value: { photo: { src: p.src, w: p.w, h: p.h } }, words: [it.de.toLowerCase()], render: () => photo(p),
  })));
  const drawings = Object.keys(DRAWINGS).map((key) => ({
    value: { pic: key }, words: words[key] || [], render: () => icon(key, 'span', 'pic'),
  }));
  return photos.concat(drawings);
}

// A camera photo, made small enough to keep in the browser and in the save file.
async function shrinkPhoto(file) {
  const image = await createImageBitmap(file);
  const scale = Math.min(1, 320 / Math.max(image.width, image.height));
  const canvas = h('canvas', { width: Math.round(image.width * scale), height: Math.round(image.height * scale) });
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return { src: canvas.toDataURL('image/jpeg', 0.72), w: canvas.width, h: canvas.height };
}

// Opens with pictures for the word itself; with no match, all pictures show.
function openPicturePicker(word) {
  if (!word) return;
  const item = ownItem(word);
  const options = pictureOptions();
  const close = () => { dialog.close(); dialog.remove(); };
  const choose = (choice) => { Store.setOwnPicture(word.id, choice); close(); renderOwnWords(); };
  const search = h('input', {
    type: 'search', class: 'answer', lang: 'de', autocomplete: 'off',
    placeholder: STRINGS.searchPicture.de, 'aria-label': STRINGS.searchPicture.de,
  });
  const grid = h('div', { class: 'picture-grid' });
  const draw = () => {
    const query = search.value.trim().toLowerCase();
    const found = query ? options.filter((o) => o.words.some((w) => w.includes(query) || query.includes(w))) : [];
    grid.replaceChildren(...(found.length ? found : options).map((o) => h('button', {
      class: 'picture-choice', type: 'button', 'aria-label': o.words[0] || STRINGS.pickPicture.de, onclick: () => choose(o.value),
    }, o.render())));
  };
  const camera = h('input', {
    type: 'file', accept: 'image/*', capture: 'environment', hidden: true,
    onchange: async () => { if (camera.files[0]) choose({ photo: await shrinkPhoto(camera.files[0]) }); },
  });
  search.value = item.de;
  search.addEventListener('input', draw);
  draw();
  const dialog = h('dialog', { class: 'fix picker' },
    h('h2', { class: 'stack' }, pair('pickPicture')),
    germanWord(item),
    h('div', { class: 'fix-actions' },
      h('button', { class: 'choice stack', type: 'button', onclick: () => camera.click() }, '📷', pair('takePhoto')),
      h('button', { class: 'choice stack', type: 'button', onclick: () => choose({}) }, pair('noPicture'))),
    search, grid, camera);
  document.body.append(dialog);
  dialog.showModal();
}

function topicPlan(items, records) {
  const plan = planSession(items, records, dayNumber());
  return plan.length ? plan : planPractice(items, records);
}

// ---- Practice session ----

let session = null;

// Practice in rounds of five: each word once, then all five matched at once, then
// each word again in a harder form. The second time does not move the word's box.
const ROUND_SIZE = 5;

function roundQueue(items) {
  const queue = [];
  for (let i = 0; i < items.length; i += ROUND_SIZE) {
    const round = items.slice(i, i + ROUND_SIZE);
    queue.push(...round.map((item) => ({ item, retry: false, introduced: false })));
    if (round.length > 1) queue.push({ match: round });
    queue.push(...shuffle(round).map((item) => ({
      item, retry: false, introduced: true, ungraded: true, level: isTypable(item) ? 'letter' : 'pickDe',
    })));
  }
  return queue;
}

// `back` is where the session ends and where ✕ leads; `rounds` practises in rounds.
function startSession(items, back = renderHome, rounds = false) {
  // Every student meets the rules before their first nouns.
  const unseen = GRAMMAR.find((lesson) => !Store.profile.grammar[lesson.id]);
  if (unseen && items.some((it) => it.art)) return renderGrammar(unseen, 0, () => startSession(items, back, rounds));
  session = {
    queue: rounds ? roundQueue(items) : items.map((item) => ({ item, retry: false, introduced: false })),
    index: 0,
    first: items.length,
    right: 0,
    back,
    restart: () => startSession(items, back, rounds),
  };
  nextStep();
}

// Every level with a few words, so writing builds up within one sitting. These
// steps do not move words between boxes: one word appears several times here.
const WRITING_WORDS = 3;

function startWriting(items, back = renderHome, count = WRITING_WORDS) {
  const records = Store.profile.items;
  const words = planPractice(items.filter(isTypable), records, count);
  const queue = WRITING_LEVELS.flatMap((level, i) => shuffle(words).map((item) => ({
    item, level, retry: false, introduced: i > 0 || !!records[item.id], ungraded: true,
  })));
  session = { queue, index: 0, first: queue.length, right: 0, back, restart: () => startWriting(items, back, count) };
  nextStep();
}

function sessionFrame(...content) {
  const done = session.index / session.queue.length;
  show(h('main', { class: 'page narrow session' },
    h('header', { class: 'session-bar' },
      h('button', { class: 'round', 'aria-label': STRINGS.home.de, onclick: () => session.back() }, '✕'),
      h('span', { class: 'meter grow', role: 'img', 'aria-label': `${session.index + 1} / ${session.queue.length}` },
        h('span', { style: `width:${Math.round(done * 100)}%` }))),
    content));
}

function nextStep() {
  const step = session.queue[session.index];
  if (!step) return renderDone();
  if (step.match) return renderMatchStep(step);
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
    h('p', { class: 'stack feedback-title' }, pair(correct ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : 'notYet')),
    correct ? null : h('p', { class: 'stack help mistakes' }, pair('mistakes')),
  ];
}

function renderIntro(step) {
  const { item } = step;
  const refresh = () => renderIntro(step);
  sessionFrame(
    h('p', { class: 'tag stack' }, pair('newWord')),
    h('div', { class: 'card' },
      item.own ? null : editToggle(refresh, true),
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
      item.own ? null : editToggle(refresh, true),
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
  const label = toGerman ? fullGerman : pictures ? (it) => it.pic || it.id : (it) => itemText(it).text;
  // Own words are asked among each other first; course words fill up short lists.
  const pool = (item.own ? ownItems() : item.topic === 'amazonia' ? AMZ_ITEMS : []).concat(ITEMS).filter((it) => !pictures || !it.abstract);
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

// Nouns are written without their article: it stands in front, in its colour.
function withArticle(item, field) {
  if (!item.art) return field;
  return h('div', { class: 'type-line' }, h('span', { class: `art art-${item.art}` }, item.art), field);
}

// Several words at once: a German word on the left, its translation on the right.
function renderMatchStep(step) {
  let chosen = null;
  let found = 0;
  const leftButtons = shuffle(step.match).map((item) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (chosen) chosen.button.classList.remove('chosen');
        chosen = { item, button };
        button.classList.add('chosen');
        Speech.say(fullGerman(item));
      },
    }, fullGerman(item));
    return button;
  });
  const rightButtons = shuffle(step.match).map((item) => {
    const button = h('button', {
      class: 'option',
      onclick: () => {
        if (!chosen) return;
        if (chosen.item !== item) {
          button.classList.add('wrong');
          setTimeout(() => button.classList.remove('wrong'), 500);
          return;
        }
        chosen.button.disabled = true;
        chosen.button.classList.remove('chosen');
        button.disabled = true;
        chosen = null;
        found += 1;
        if (found === step.match.length) setTimeout(() => { session.index += 1; nextStep(); }, 700);
      },
    }, itemL1(item));
    return button;
  });
  sessionFrame(
    h('h1', { class: 'stack task' }, pair('match')),
    h('div', { class: 'match' }, h('div', { class: 'options' }, leftButtons), h('div', { class: 'options' }, rightButtons)));
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
      withArticle(item, input),
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
    withArticle(item, slotRow), bank, check);
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

// The score screen ends with «Wiederholen» beside «Weiter».
function doneButtons(repeat, next, nextKey = 'next') {
  return h('div', { class: 'done-buttons' },
    h('button', { class: 'choice center', onclick: repeat }, pair('repeat')),
    h('button', { class: 'primary', onclick: next }, pair(nextKey)));
}

function renderDone() {
  const total = session.first;
  show(h('main', { class: 'page narrow' },
    h('div', { class: 'card done' },
      icon(Store.profile.animal, 'div', 'pic huge'),
      h('h1', { class: 'stack' }, pair('wellDone')),
      h('p', { class: 'score' }, `${session.right} / ${total} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount))),
    doneButtons(session.restart, () => session.back(), session.back === renderHome ? 'home' : 'next')));
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
// Under a section of the verb course: «Warum lerne ich das?» (open where the student is
// working) and the can-do goals, ticked when their station is done.
function sectionWhy(part, next) {
  const key = SECTION_WHY[part.section];
  if (!key) return null;
  const goals = SECTION_GOALS[part.section] || [];
  return h('div', { class: 'section-why' },
    h('details', { open: part.stations.includes(next) },
      h('summary', { class: 'stack' }, pair('whyTitle')),
      h('p', { class: 'stack why-text' }, pair(key))),
    goals.length ? h('div', { class: 'goals' },
      h('p', { class: 'stack goals-title' }, pair('canDo')),
      h('ul', {}, goals.map(([goal, station]) => {
        const done = Store.profile.verbs[station];
        return h('li', { class: done ? 'goal done' : 'goal' },
          h('span', { class: 'goal-mark', 'aria-hidden': 'true' }, done ? '✓' : '○'),
          h('span', { class: 'stack' }, pair(goal)));
      }))) : null);
}

function renderCourse(def) {
  if (def && def.parts) shownCourse = def;
  const { stations, parts, title } = shownCourse;
  const next = stations.find((s) => !Store.profile.verbs[s.id]);
  const courseKey = Object.keys(COURSES).find((k) => COURSES[k] === shownCourse);
  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de), null),
    h('h1', { class: 'stack' }, pair(title)),
    courseKey ? h('p', { class: 'why-block' }, whyLine(WHY[courseKey])) : null,
    parts.flatMap((part) => [
      h('h2', { class: 'stack' }, pair(part.section)),
      sectionWhy(part, next),
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

// A translation bubble for a word or a few words (see introGloss in vorstellung.js).
function introGlossOf(text) {
  const whole = introGloss(text, langCodes);
  if (whole && text.includes(' ')) return whole;
  const parts = text.split(' ').map((w) => introGloss(w, langCodes)).filter(Boolean);
  if (!parts.length) return null;
  if (parts.length === 1) return { ...parts[0], de: text.replace(/[.,!?]/g, '') };
  const t = Object.fromEntries(langCodes.map((c) => [c, parts.map((g) => pickText(g.t, c).text).join(' ')]));
  return { de: text, t };
}

// A sentence whose words show their translation when pointed at or tapped.
function introTipped(text) {
  return text.split(' ').map((word, i) => {
    const gloss = introGloss(word, langCodes);
    const node = gloss ? h('span', { class: 'gl', tabindex: 0 }, word, glossTip(gloss)) : word;
    return i ? [' ', node] : node;
  });
}

// «Meine Vorstellung»: one question after the other; the German sentence grows below
// the answer. Buttons or own text; nothing is saved.
function renderIntroBuilder() {
  const state = course.intro || (course.intro = { index: 0, chosen: INTRO_STEPS.map(() => []), typed: INTRO_STEPS.map(() => '') });
  const i = state.index;
  const step = INTRO_STEPS[i];
  // The student's own language is offered first; Deutsch is in the sentence already.
  if (step.id === 'sprechen' && !state.chosen[i].length && !state.typed[i] && INTRO_LANGUAGE_NAMES[lang()] && INTRO_LANGUAGE_NAMES[lang()] !== 'Deutsch') {
    state.chosen[i] = [INTRO_LANGUAGE_NAMES[lang()]];
  }
  const value = () => introAnswer(step, state.chosen[i], state.typed[i]);
  const filled = () => (step.many ? value().length > 0 : value() !== '');
  const line = h('p', { class: 'example-line intro-line', 'aria-live': 'polite' });
  const next = h('button', {
    class: 'primary wide stack',
    onclick: () => {
      if (!filled()) return;
      if (i + 1 < INTRO_STEPS.length) {
        state.index += 1;
        renderIntroBuilder();
        return;
      }
      const answers = INTRO_STEPS.map((s, k) => introAnswer(s, state.chosen[k], state.typed[k]));
      course.steps.push({ introSummary: INTRO_STEPS.map((s, k) => s.say(answers[k])) });
      course.queue = introPractice(answers).map((q) => ({ q, retry: false }));
      course.first = course.queue.length;
      course.stepIndex += 1;
      courseNext();
    },
  }, pair('next'));
  const update = () => {
    line.replaceChildren(...introTipped(filled() ? step.say(value()) : step.say(step.many ? ['…'] : '…')).flat());
    next.disabled = !filled();
  };
  const input = step.type ? h('input', {
    type: 'text', class: 'answer', lang: 'de', autocomplete: 'off', spellcheck: 'false', maxlength: 40,
    value: state.typed[i], 'aria-label': step.question,
    oninput: () => {
      state.typed[i] = input.value;
      if (!step.many && input.value.trim()) { state.chosen[i] = []; chips.forEach((c) => c.classList.remove('on')); }
      update();
    },
  }) : null;
  // A preselected answer that is not among the buttons (e.g. Singhalesisch) gets its own button.
  const chips = [...new Set([...(step.many ? state.chosen[i] : []), ...(step.pick || [])])].map((option) => {
    const gloss = introGlossOf(option);
    const chip = h('button', {
      class: `chip${state.chosen[i].includes(option) ? ' on' : ''}`, 'aria-pressed': String(state.chosen[i].includes(option)), 'data-option': option,
      onclick: () => {
        // On a touch screen there is no pointing: a tap shows the translation for a moment.
        chips.forEach((c) => c.classList.remove('tip-open'));
        if (gloss) { chip.classList.add('tip-open'); setTimeout(() => chip.classList.remove('tip-open'), 1800); }
        if (step.many) {
          state.chosen[i] = state.chosen[i].includes(option) ? state.chosen[i].filter((x) => x !== option) : [...state.chosen[i], option];
        } else {
          state.chosen[i] = [option];
          state.typed[i] = '';
          if (input) input.value = '';
        }
        chips.forEach((c) => {
          const on = state.chosen[i].includes(c.dataset.option);
          c.classList.toggle('on', on);
          c.setAttribute('aria-pressed', String(on));
        });
        update();
      },
    }, option, gloss ? glossTip(gloss) : null);
    return chip;
  });
  courseFrame(
    h('p', { class: 'tag stack' }, pair('introTitle'), ` ${i + 1} / ${INTRO_STEPS.length}`),
    h('div', { class: 'card' }, emojiPicture(verb(step.verb).pic, 'big'), h('p', { class: 'rule' }, step.question), localized(step.t)),
    audioButtons(step.question),
    chips.length ? h('div', { class: 'chips' }, chips) : null,
    input ? h('label', { class: 'field stack' }, chips.length ? pair('introOwn') : null, input) : null,
    line,
    i === 0 ? h('p', { class: 'help stack' }, pair('introNote')) : null,
    h('div', { class: 'done-buttons' },
      i > 0 ? h('button', { class: 'choice center', onclick: () => { state.index -= 1; renderIntroBuilder(); } }, pair('back')) : null,
      next));
  update();
  if (input && !chips.length) input.focus();
  Speech.say(step.question);
}

// The whole introduction, to listen to and say out loud; each line can be heard alone.
function renderIntroSummary(lines) {
  const nextButton = h('button', { class: 'primary wide stack', onclick: () => { course.stepIndex += 1; courseNext(); } }, pair('next'));
  courseFrame(
    h('div', { class: 'card intro-card' },
      h('h2', { class: 'stack' }, pair('introTitle')),
      h('div', { class: 'intro-text' }, lines.map((text) => h('p', { class: 'intro-sentence', onclick: () => Speech.say(text) }, introTipped(text))))),
    h('p', { class: 'help stack' }, pair('introListen')),
    audioButtons(lines.join(' ')),
    nextButton);
  nextButton.focus();
  Speech.say(lines.join(' '));
}

function emojiPicture(pic, size = 'big') {
  return icon(pic, 'div', `pic ${size}`);
}

// Each part of a verb form in its own colour (see formParts in verbs.js).
const MARK_CLASS = { ending: 'form-ending', vowel: 'form-vowel', extra: 'form-extra', short: 'form-short', changed: 'form-changed' };
const LEGEND = [['vowel', 'legendVowel', 'ä'], ['changed', 'legendChanged', 'bin'], ['extra', 'legendExtra', 'e'], ['short', 'legendShort', 't'], ['ending', 'legendEnding', 'en']];

function markedForm(parts) {
  return h('span', {}, parts.map((part) => (part.mark ? h('strong', { class: MARK_CLASS[part.mark] }, part.text) : part.text)));
}

// Rows that are not regular get a tint; a legend explains the colours this table uses.
function conjugationTable(id) {
  const v = verb(id);
  const used = new Set();
  const rows = TABLE_ROWS.map((row) => {
    const parts = formParts(v, row.key);
    parts.forEach((part) => part.mark && used.add(part.mark));
    const odd = parts.some((part) => part.mark && part.mark !== 'ending');
    const form = conjugate(v, row.key);
    return h('tr', { class: odd ? 'odd' : '', onclick: () => Speech.say(`${row.label.split(',')[0]} ${form}`) },
      h('td', {}, row.label), h('td', {}, markedForm(parts)));
  });
  return h('div', { class: 'conj-wrap' },
    h('table', { class: 'conj' }, h('tbody', {}, rows)),
    h('ul', { class: 'legend' }, LEGEND.filter(([mark]) => used.has(mark)).map(([mark, key, sample]) => h('li', {},
      h('strong', { class: `legend-sample ${MARK_CLASS[mark]}` }, sample), h('span', { class: 'stack' }, pair(key))))));
}

// The vowel change of an irregular verb, big: a → ä, and the du form with it.
function vowelChange(id) {
  const v = verb(id);
  const parts = formParts(v, 'du');
  const changed = parts.find((part) => part.mark === 'vowel');
  if (!changed) return null;
  return h('div', { class: 'vowel-change' },
    h('span', { class: 'vowel-was' }, changed.was), h('span', { class: 'vowel-arrow', 'aria-hidden': 'true' }, '→'),
    h('strong', { class: 'form-vowel' }, changed.text),
    h('p', { class: 'vowel-example' }, `${v.de} → du `, markedForm(parts)));
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
  if (step.introBuilder) return renderIntroBuilder();
  if (step.race) return renderRace(step.race);
  if (step.introSummary) return renderIntroSummary(step.introSummary);
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
      step.table && /^ur/.test(step.rule) ? vowelChange(step.table) : null,
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
    q.pic && !q.listen && !q.noPicture ? emojiPicture(q.pic, q.person ? '' : 'big') : null,
    q.sentence ? h('p', { class: 'rule' }, q.sentence) : null,
    q.sentenceL1 ? localized(q.sentenceL1) : null,
    q.l1 ? h('span', { class: 'prompt-l1' }, localized(q.l1)) : null,
    q.text ? h('span', { class: 'word' }, q.text) : null);
}

function renderQuestion(entry) {
  const { q } = entry;
  if (q.kind === 'match') return renderMatch(entry);
  if (q.kind === 'sort') return renderSort(entry);
  if (q.kind === 'memory') return renderMemory(entry);
  if (q.kind === 'letters') return renderLetters(entry);
  if (q.kind === 'build') return renderCourseBuild(entry);
  if (q.kind === 'table') return renderTableFill(entry);
  const prompt = q.listen ? null : promptFor(q);
  const replay = q.listen ? audioButtons(q.listen) : null;
  if (q.kind === 'type') {
    const input = h('input', {
      type: 'text', class: 'answer', lang: 'de', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': STRINGS.gap.de,
    });
    courseFrame(
      h('h1', { class: 'stack task' }, pair(q.task)),
      prompt,
      replay,
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
    if (q.listen) Speech.say(q.listen);
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

// The whole conjugation table to fill in. With help, the part shared with the
// infinitive stands before each field. All rows right counts as right.
function renderTableFill(entry) {
  const { q } = entry;
  const fields = q.rows.map((row) => h('input', {
    type: 'text', class: 'answer table-answer', lang: 'de', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
    'aria-label': row.label,
  }));
  const check = () => {
    const results = q.rows.map((row, i) => normalise(row.given + fields[i].value) === normalise(row.form));
    results.forEach((ok, i) => fields[i].classList.toggle('wrong', !ok));
    const firstWrong = results.indexOf(false);
    const given = firstWrong < 0 ? null : `${q.rows[firstWrong].label.split(',')[0]} ${q.rows[firstWrong].given}${fields[firstWrong].value.trim()}`;
    setTimeout(() => courseAnswer(entry, firstWrong < 0, given), firstWrong < 0 ? 200 : 900);
  };
  courseFrame(
    h('h1', { class: 'stack task' }, pair(q.task)),
    h('div', { class: 'card' }, emojiPicture(q.pic), h('span', { class: 'word' }, q.verbName), localized(q.feedbackL1)),
    h('form', { class: 'type-form', onsubmit: (e) => { e.preventDefault(); check(); } },
      h('table', { class: 'conj fill' }, h('tbody', {}, q.rows.map((row, i) => h('tr', {},
        h('td', {}, row.label),
        h('td', {}, h('span', { class: 'table-given' }, row.given), fields[i]))))),
      h('div', { class: 'letters' }, ['ä', 'ö', 'ü'].map((letter) => h('button', {
        type: 'button', class: 'letter',
        onclick: () => {
          const field = fields.find((f) => f === document.activeElement) || fields[0];
          field.setRangeText(letter, field.selectionStart, field.selectionEnd, 'end');
          field.focus();
        },
      }, letter))),
      h('button', { type: 'submit', class: 'primary wide stack' }, pair('check'))));
  fields[0].focus();
}

// The verb race: as many right answers as possible in RACE_SECONDS. Quick choices,
// the next question at once; the best score is kept.
function renderRace(section) {
  const bestKey = `best-${section}`;
  const best = Number(Store.profile.verbs[bestKey]) || 0;
  const start = h('button', { class: 'primary wide stack', onclick: () => runRace(section) }, pair('raceStart'));
  courseFrame(
    h('div', { class: 'card' },
      h('div', { class: 'race-clock', 'aria-hidden': 'true' }, '⏱'),
      h('p', { class: 'rule' }, STRINGS.raceTask.de), localized(STRINGS.raceTask),
      best ? h('p', { class: 'stack' }, pair('raceBest'), h('strong', { class: 'race-best' }, String(best))) : null),
    start);
  start.focus();
}

function runRace(section) {
  const maker = RACE_MAKERS[section];
  const end = Date.now() + RACE_SECONDS * 1000;
  let right = 0;
  const bar = h('span', { style: 'width:100%' });
  const score = h('strong', { class: 'race-score' }, '0');
  const board = h('div', { class: 'race-board' });
  const timer = setInterval(() => {
    const left = Math.max(0, end - Date.now());
    bar.style.width = `${(left / (RACE_SECONDS * 1000)) * 100}%`;
    if (!left) finish();
  }, 200);
  const ask = () => {
    const q = maker(Math.random);
    board.replaceChildren(
      promptFor({ ...q, listen: null, l1: q.l1, noPicture: false }),
      h('div', { class: q.options.length === 2 ? 'options two' : 'options' }, q.options.map((option) => h('button', {
        class: 'option',
        onclick: (e) => {
          const ok = option === q.answer;
          if (ok) right += 1;
          score.textContent = String(right);
          e.currentTarget.classList.add(ok ? 'race-ok' : 'wrong');
          setTimeout(ask, ok ? 150 : 600);
        },
      }, option))));
  };
  let done = false;
  function finish() {
    if (done) return;
    done = true;
    clearInterval(timer);
    const key = `best-${section}`;
    const record = right > (Number(Store.profile.verbs[key]) || 0);
    if (record) Store.profile.verbs[key] = right;
    Store.profile.verbs[course.station.id] = true;
    Store.save();
    show(h('main', { class: 'page narrow' },
      h('div', { class: 'card done' },
        icon(Store.profile.animal, 'div', 'pic huge'),
        h('h1', { class: 'stack' }, pair(record ? 'raceNew' : PRAISE[Math.floor(Math.random() * PRAISE.length)])),
        h('p', { class: 'score' }, `${right} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount)),
        h('p', { class: 'stack' }, pair('raceBest'), h('strong', { class: 'race-best' }, String(Math.max(right, Number(Store.profile.verbs[key]) || 0))))),
      doneButtons(() => startStation(course.station), renderCourse)));
    root.querySelector('.primary').focus();
  }
  show(h('main', { class: 'page narrow session' },
    h('header', { class: 'session-bar' },
      h('button', { class: 'round', 'aria-label': STRINGS.home.de, onclick: () => { done = true; clearInterval(timer); renderCourse(); } }, '✕'),
      h('span', { class: 'meter grow race-meter' }, bar),
      score),
    board));
  ask();
}

// Memory: every card face down, two open at a time. A pair stays open, the others turn
// back. Mistakes belong to the game, so a finished game counts as right.
function renderMemory(entry) {
  const { q } = entry;
  const back = () => h('span', { class: 'memory-back', 'aria-hidden': 'true' }, '?');
  const face = (card) => (card.pic ? emojiPicture(card.pic, '') : h('span', { class: 'memory-text' }, card.text));
  let open = [];
  let found = 0;
  let busy = false;
  const turn = (card, button) => {
    if (busy || button.classList.contains('open')) return;
    button.classList.add('open');
    button.replaceChildren(face(card));
    button.setAttribute('aria-label', card.text || card.say);
    open.push({ card, button });
    if (open.length < 2) {
      if (card.text) Speech.say(card.text);
      return;
    }
    const [a, b] = open;
    open = [];
    if (a.card.pair === b.card.pair) {
      [a, b].forEach((x) => { x.button.classList.add('found'); x.button.disabled = true; });
      Speech.say(a.card.say);
      found += 1;
      if (found * 2 === q.cards.length) setTimeout(() => courseAnswer(entry, true), 900);
      return;
    }
    if (card.text) Speech.say(card.text);
    busy = true;
    setTimeout(() => {
      [a, b].forEach((x) => { x.button.classList.remove('open'); x.button.replaceChildren(back()); x.button.setAttribute('aria-label', '?'); });
      busy = false;
    }, 1100);
  };
  const cards = q.cards.map((card) => {
    const button = h('button', { class: 'memory-card', 'aria-label': '?', onclick: () => turn(card, button) }, back());
    return button;
  });
  courseFrame(
    h('h1', { class: 'stack task' }, pair('memory')),
    q.verbName ? h('div', { class: 'card' }, emojiPicture(q.pic), h('span', { class: 'word' }, q.verbName), localized(q.feedbackL1)) : null,
    h('div', { class: `memory-grid${q.cards.length > 6 ? ' four' : ''}` }, cards));
}

// A word from its shuffled letters: tap them in order; tap a placed letter to give it back.
function renderLetters(entry) {
  const { q } = entry;
  const letters = [...q.answer].map((text, id) => ({ text, id }));
  let tiles = shuffle(letters);
  while (tiles.length > 1 && tiles.map((t) => t.text).join('') === q.answer) tiles = shuffle(letters);
  const placed = [];
  const slotRow = h('div', { class: 'slots', dir: 'ltr' });
  const bank = h('div', { class: 'tile-bank', dir: 'ltr' });
  const check = h('button', {
    class: 'primary wide stack', disabled: true,
    onclick: () => {
      const word = placed.map((t) => t.text).join('');
      courseAnswer(entry, word === q.answer, word);
    },
  }, pair('check'));
  const draw = () => {
    slotRow.replaceChildren(...letters.map((_, i) => {
      const tile = placed[i];
      return h('button', {
        class: tile ? 'slot taken' : 'slot', 'aria-label': tile ? tile.text : `${i + 1}`,
        onclick: () => { if (tile) { placed.splice(i, 1); draw(); } },
      }, tile ? tile.text : '');
    }));
    bank.replaceChildren(...tiles.map((tile) => (placed.includes(tile)
      ? h('span', { class: 'tile letter-tile ghost', 'aria-hidden': 'true' }, tile.text)
      : h('button', { class: 'tile letter-tile', onclick: () => { placed.push(tile); draw(); } }, tile.text))));
    check.disabled = placed.length !== letters.length;
  };
  draw();
  courseFrame(h('h1', { class: 'stack task' }, pair(q.task)), promptFor(q), slotRow, bank, check);
}

// A sentence from its shuffled words, as in the topics, inside the verb course.
function renderCourseBuild(entry) {
  const { q } = entry;
  const words = q.words.map((text, id) => ({ text, id }));
  let tiles = shuffle(words);
  while (tiles.length > 1 && tiles.every((t, i) => t.id === i)) tiles = shuffle(words);
  const placed = [];
  const line = h('div', { class: 'sentence-line' });
  const bank = h('div', { class: 'tile-bank' });
  const check = h('button', {
    class: 'primary wide stack', disabled: true,
    onclick: () => {
      const built = placed.map((t) => t.text).join(' ');
      courseAnswer(entry, built === q.answer, built);
    },
  }, pair('check'));
  const draw = () => {
    line.replaceChildren(...placed.map((tile) => h('button', {
      class: 'tile', onclick: () => { placed.splice(placed.indexOf(tile), 1); draw(); },
    }, tile.text)));
    bank.replaceChildren(...tiles.map((tile) => (placed.includes(tile)
      ? h('span', { class: 'tile ghost', 'aria-hidden': 'true' }, tile.text)
      : h('button', { class: 'tile', onclick: () => { placed.push(tile); draw(); } }, tile.text))));
    check.disabled = placed.length !== tiles.length;
  };
  draw();
  courseFrame(h('h1', { class: 'stack task' }, pair('build')), promptFor(q), line, bank, check);
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
    h('div', { class: `sort-baskets${baskets.length === 3 ? ' three' : ''}` }, baskets.map((basket) => {
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
    doneButtons(() => startStation(station), renderCourse)));
  root.querySelector('.primary').focus();
}

// ---- Lerneinheit «Amazonien» (Museum Rietberg) ----

// The words step is done once every word has been met in practice.
function amzDone(step) {
  if (step === 'amzWords') return AMZ_ITEMS.every((it) => Store.profile.items[it.id]);
  return !!(Store.profile.units.amazonia || {})[step];
}

function amzFinish(step) {
  Store.profile.units.amazonia = { ...Store.profile.units.amazonia, [step]: true };
  Store.save();
}

const amzStations = () => AMZ_SECTIONS.flatMap(([, stations]) => stations);

function amzShare() {
  const stations = amzStations();
  return Math.round((stations.filter(([id]) => amzDone(id)).length / stations.length) * 100);
}

function amzPage(titleKey, ...content) {
  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderAmazonia }, '← ', STRINGS.back.de), null),
    h('h1', { class: 'stack' }, pair(titleKey)),
    content));
}

function amzNext(step) {
  return h('button', { class: 'primary wide stack', onclick: () => { amzFinish(step); renderAmazonia(); } }, pair('next'));
}

function renderAmazonia() {
  const next = amzStations().find(([id]) => !amzDone(id));
  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderHome }, '← ', STRINGS.back.de), null),
    // The rainforest from above, to make the students curious.
    h('div', { class: 'amz-hero' }, h('img', { src: AMZ_PHOTOS.wald[0].src, alt: '', width: AMZ_PHOTOS.wald[0].w, height: AMZ_PHOTOS.wald[0].h })),
    h('h1', { class: 'stack' }, pair('amzTitle')),
    AMZ_SECTIONS.map(([titleKey, stations]) => [
      titleKey ? h('h2', { class: 'stack' }, pair(titleKey)) : null,
      h('ol', { class: 'stations' }, stations.map((station) => h('li', {}, h('button', {
        class: `station${station === next ? ' next' : ''}`, onclick: () => station[2](),
      },
        h('span', { class: 'station-mark', 'aria-hidden': 'true' }, amzDone(station[0]) ? '✓' : '○'),
        h('span', { class: 'stack' }, pair(station[1])),
        station === next ? h('span', { class: 'station-next stack' }, pair('continueHere')) : null)))),
    ]),
    h('button', { class: 'text-button center', onclick: renderAmzCredits }, 'Bildnachweis')));
}

// The licences ask for photographer and licence with every photo used.
function renderAmzCredits() {
  show(h('main', { class: 'page narrow' },
    h('header', { class: 'topbar' }, h('button', { class: 'text-button', onclick: renderAmazonia }, '← ', STRINGS.back.de), null),
    h('h1', {}, 'Bildnachweis'),
    h('p', { class: 'help' }, 'Alle Fotos stammen von Wikimedia Commons.'),
    h('ul', { class: 'credits' }, AMZ_ITEMS.filter((it) => it.photos).flatMap((it) => it.photos.map((p) => h('li', {},
      h('img', { src: p.src, alt: '', width: p.w, height: p.h, loading: 'lazy' }),
      h('span', {},
        h('strong', {}, fullGerman(it)), h('br'),
        h('a', { href: p.page, target: '_blank', rel: 'noopener' }, p.title), h('br'),
        `${p.artist} · `, p.licenseUrl ? h('a', { href: p.licenseUrl, target: '_blank', rel: 'noopener' }, p.license) : p.license,
        p.arrows ? ' · Pfeile ergänzt' : null)))))));
}

function renderAmzRead() {
  const { text, code } = pickText(AMZ_TEXT1);
  amzPage('amzRead',
    h('article', { class: 'card reading', lang: code, dir: langInfo(code).dir }, text.map((p) => h('p', {}, p))),
    amzNext('amzRead'));
}

function renderAmzWords() {
  const records = Store.profile.items;
  // Words not met yet come first, then the weakest.
  const practise = (items) => startSession(planPractice(items, records, items.length), renderAmzWords, true);
  amzPage('amzWords',
    h('button', { class: 'primary wide stack', onclick: () => practise(AMZ_ITEMS) }, pair('amzAllWords')),
    ['N', 'V', 'A'].map((cls) => AMZ_ITEMS.filter((it) => it.wordClass === cls)).map((items) => [
      h('h2', { class: 'stack' }, pair(AMZ_CLASS_KEYS[items[0].wordClass])),
      h('div', { class: 'word-actions' },
        h('button', { class: 'choice stack center', onclick: () => practise(items) }, pair('practice')),
        h('button', { class: 'choice stack center', onclick: () => startWriting(items, renderAmzWords, 5) }, pair('writing'))),
      h('ul', { class: 'wordlist' }, items.map((it) => h('li', {},
        picture(it),
        h('span', { class: 'stack' }, germanWord(it), itemL1(it)),
        Speech.has('de') ? h('button', {
          class: 'round', 'aria-label': `${STRINGS.speak.de}: ${fullGerman(it)}`, onclick: () => Speech.say(fullGerman(it)),
        }, icon('🔊')) : null))),
    ]));
}

// The base form with its article in colour, and the translation of that base form.
function glossTip(gloss) {
  return h('span', { class: 'gl-tip' },
    h('span', { class: 'gl-de', lang: 'de' },
      gloss.art ? [h('span', { class: `art art-${gloss.art}` }, gloss.art), ' '] : null, gloss.de),
    localized(gloss.t));
}

function renderAmzText() {
  amzPage('amzText',
    h('p', { class: 'stack help' }, pair('amzHover')),
    audioButtons(AMZ_TEXT2.map(amzPlain).join(' ')),
    h('article', { class: 'card reading', lang: 'de' }, AMZ_TEXT2.map((p) => h('p', {}, amzTokens(p).map((token) => {
      if (token.text) return token.text;
      if (!token.gloss) return token.word;
      return h('span', { class: 'gl', tabindex: 0 }, token.word, glossTip(token.gloss));
    })))),
    amzNext('amzText'));
}

// A word drawn with the mark of its class: box, wavy line or dotted line.
function markSample(cls, text) {
  return h('span', { class: `mk-sample mk-${cls}` }, text);
}

function renderAmzRules() {
  amzPage('amzRepeat',
    ['N', 'V', 'A'].map((cls) => h('section', { class: 'card rule-card' },
      h('h2', { class: 'stack' }, markSample(cls, STRINGS[AMZ_CLASS_KEYS[cls]].de), localized(STRINGS[AMZ_CLASS_KEYS[cls]])),
      AMZ_RULES.filter((rule) => rule.cls === cls).map((rule) => [
        h('p', { class: 'rule' }, rule.text.de),
        localized(rule.text),
        rule.examples ? h('p', { class: 'rule-examples', lang: 'de' }, rule.examples.map((word) => markSample(cls, word))) : null,
      ]))),
    h('button', { class: 'primary wide stack', onclick: () => renderAmzQuiz(0, 0) }, pair('next')));
}

function renderAmzQuiz(index, right) {
  if (index === AMZ_QUIZ.length) {
    amzFinish('amzRepeat');
    return amzPage('amzRepeat',
      h('div', { class: 'card done' },
        icon(Store.profile.animal, 'div', 'pic huge'),
        h('h1', { class: 'stack' }, pair('wellDone')),
        h('p', { class: 'score' }, `${right} / ${AMZ_QUIZ.length} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount))),
      doneButtons(() => renderAmzQuiz(0, 0), renderAmazonia));
  }
  const [word, answer] = AMZ_QUIZ[index];
  const next = h('button', { class: 'primary wide stack', hidden: true }, pair('next'));
  const buttons = ['N', 'V', 'A'].map((cls) => h('button', {
    class: 'option stack center',
    onclick: () => {
      const correct = cls === answer;
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (['N', 'V', 'A'][i] === answer) b.classList.add('right-answer');
      });
      if (!correct) buttons[['N', 'V', 'A'].indexOf(cls)].classList.add('wrong');
      next.onclick = () => renderAmzQuiz(index + 1, right + (correct ? 1 : 0));
      next.hidden = false;
      next.focus();
    },
  }, markSample(cls, STRINGS[AMZ_CLASS_KEYS[cls]].de), localized(STRINGS[AMZ_CLASS_KEYS[cls]])));
  amzPage('amzRepeat',
    h('p', { class: 'stack task' }, pair('whichKind')),
    h('div', { class: 'card' }, h('span', { class: 'word', lang: 'de' }, word)),
    h('div', { class: 'options three' }, buttons),
    next);
}

// Marking: pick a mark, click words. «Prüfen» shows right marks, wrong ones
// struck through and missing ones dashed; any new click hides the check again.
function renderAmzMark() {
  const words = [];
  let tool = 'N';
  let checked = false;
  const result = h('div', { class: 'notice stack', role: 'status', hidden: true });

  const paint = () => words.forEach((w) => {
    const classes = ['mk'];
    if (w.mark) classes.push(`mk-${w.mark}`);
    if (checked && w.mark && w.mark !== w.cls) classes.push('mk-wrong');
    if (checked && !w.mark && w.cls) classes.push(`mk-${w.cls}`, 'mk-missing');
    w.el.className = classes.join(' ');
  });

  const text = AMZ_TEXT2.map((p) => h('p', {}, amzTokens(p).map((token) => {
    if (token.text) return token.text;
    const w = { cls: token.wordClass, mark: null };
    w.el = h('button', {
      type: 'button', class: 'mk',
      onclick: () => {
        w.mark = tool === 'X' || w.mark === tool ? null : tool;
        checked = false;
        result.hidden = true;
        paint();
      },
    }, token.word);
    words.push(w);
    return w.el;
  })));

  const toolButtons = ['N', 'V', 'A', 'X'].map((key) => h('button', {
    class: `mk-tool stack${key === tool ? ' selected' : ''}`,
    'aria-pressed': String(key === tool),
    onclick: () => {
      tool = key;
      toolButtons.forEach((b, i) => {
        const on = ['N', 'V', 'A', 'X'][i] === key;
        b.classList.toggle('selected', on);
        b.setAttribute('aria-pressed', String(on));
      });
    },
  }, key === 'X'
    ? [h('span', { class: 'de' }, '⌫ ', STRINGS.eraser.de), localized(STRINGS.eraser)]
    : [markSample(key, STRINGS[AMZ_CLASS_KEYS[key]].de), localized(STRINGS[AMZ_CLASS_KEYS[key]])]));

  const check = () => {
    checked = true;
    paint();
    const total = words.filter((w) => w.cls).length;
    const right = words.filter((w) => w.cls && w.mark === w.cls).length;
    const wrong = words.filter((w) => w.mark && w.mark !== w.cls).length;
    const done = right === total && !wrong;
    if (done) amzFinish('amzMark');
    result.replaceChildren(...[
      h('p', { class: 'score' }, `${right} / ${total} `, STRINGS.rightCount.de, ' · ', localized(STRINGS.rightCount)),
      done ? h('p', { class: 'stack' }, pair('wellDone')) : null,
      !done && wrong ? h('p', { class: 'stack' }, pair('amzWrong')) : null,
      !done && right < total ? h('p', { class: 'stack' }, pair('amzMissing')) : null,
    ].filter(Boolean));
    result.hidden = false;
  };

  amzPage('amzMark',
    h('p', { class: 'stack help' }, pair('amzMarkHelp')),
    h('div', { class: 'mk-tools' }, toolButtons),
    h('article', { class: 'card reading marking', lang: 'de' }, text),
    result,
    h('button', { class: 'primary wide stack', onclick: check }, pair('check')),
    h('button', { class: 'choice stack center', onclick: renderAmazonia }, pair('next')));
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
    h('h2', { class: 'stack' }, pair('pickAvatar')),
    h('div', { class: 'animals' }, [Store.profile.animal, ...Store.freeAnimals()].filter((a) => avatarName(a)).map((a) => h('button', {
      class: a === Store.profile.animal ? 'animal avatar current' : 'animal avatar', 'aria-label': avatarName(a),
      'aria-pressed': String(a === Store.profile.animal),
      onclick: () => { if (Store.changeFigure(a)) renderSettings(); },
    }, icon(a), h('span', { class: 'avatar-name' }, avatarName(a))))),
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
      }, STRINGS.deleteProfile.de)),
    h('p', { class: 'help' }, 'Verbbilder: Motive nach den Piktogrammen von ARASAAC (Sergio Palao, Gobierno de Aragón), ',
      h('a', { href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/', target: '_blank', rel: 'noopener' }, 'CC BY-NC-SA 4.0'), '.')));
}

// ---- Author screen (index.html?autor), German only and not linked from the app ----

function recordingSections() {
  return [
    ...GRAMMAR.map((lesson) => ({ title: `Grammatik: ${lesson.title.de}`, texts: lesson.cards.map((card) => card.text.de) })),
    ...TOPICS.map((topic) => ({ title: topic.title.de, texts: topicItems(topic.id).map(fullGerman) })),
    { title: 'Verben: Regeln', texts: Object.values(RULES).map((rule) => rule.de) },
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
