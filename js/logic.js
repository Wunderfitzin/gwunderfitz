// Learning logic: spaced repetition and exercise choice. No DOM access.
// Each item sits in a box from 0 (new) to 5. A right answer moves it up and
// pushes the next review further out; a wrong answer moves it down one box.

const MAX_BOX = 5;
const INTERVALS = [0, 1, 2, 4, 8, 16];
const SESSION_SIZE = 10;
const MAX_NEW = 5;
const LEARNED_BOX = 3;

function dayNumber(now = Date.now()) {
  const d = new Date(now);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

function grade(record, correct, day) {
  const box = record ? record.box : 0;
  const next = correct ? Math.min(MAX_BOX, box + 1) : Math.max(1, box - 1);
  return { box: next, due: day + INTERVALS[next], last: day };
}

// Overdue reviews come first; new items only fill what is left.
function planSession(items, records, day, size = SESSION_SIZE, maxNew = MAX_NEW) {
  const due = items
    .filter((it) => records[it.id] && records[it.id].due <= day)
    .sort((a, b) => records[a.id].due - records[b.id].due || records[a.id].box - records[b.id].box);
  const fresh = items.filter((it) => !records[it.id]);
  const plan = due.slice(0, size);
  return plan.concat(fresh.slice(0, Math.min(maxNew, size - plan.length)));
}

// Extra practice beyond the schedule: weakest items first.
function planPractice(items, records, size = SESSION_SIZE) {
  return [...items]
    .sort((a, b) => (records[a.id] ? records[a.id].box : 0) - (records[b.id] ? records[b.id].box : 0))
    .slice(0, size);
}

function isTypable(item) {
  return item.kind === 'word' && !/[\s…]/.test(item.de);
}

// Recognition first; production once an item has been remembered a few times.
function chooseExercise(item, box, hasVoice, rnd = Math.random) {
  if (item.kind === 'sentence') return 'build';
  const recognise = hasVoice ? 'listen' : 'meaning';
  if (box <= 1) return recognise;
  const options = box === 2 ? ['pickDe', 'meaning'] : ['pickDe'];
  // Writing grows with the box: fill in letters, then order them, then write freely.
  if (isTypable(item)) {
    if (box === 2) options.push('letter', 'letter');
    if (box === 3) options.push('drag', 'scramble');
    if (box >= 4) options.push('scramble', 'type', 'type');
  }
  if (item.art) options.push('article');
  return options[Math.floor(rnd() * options.length)];
}

function shuffle(list, rnd = Math.random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Up to n answer choices. `label` is what the student sees, so two choices that
// would look identical are never offered, and near-synonyms are left out.
function makeOptions(item, pool, label, n = 4, rnd = Math.random) {
  const usable = (other) =>
    other.id !== item.id && other.kind === item.kind && !(item.group && other.group === item.group);
  const sameTopic = shuffle(pool.filter((o) => usable(o) && o.topic === item.topic), rnd);
  const otherTopics = shuffle(pool.filter((o) => usable(o) && o.topic !== item.topic), rnd);
  const seen = new Set([label(item)]);
  const options = [item];
  for (const other of [...sameTopic, ...otherTopics]) {
    if (options.length === n) break;
    if (seen.has(label(other))) continue;
    seen.add(label(other));
    options.push(other);
  }
  return shuffle(options, rnd);
}

function normalise(text) {
  return text.trim().toLowerCase().replace(/ß/g, 'ss').replace(/\s+/g, ' ');
}

// Capitals are forgiven and the article is optional: this exercise is about spelling.
function checkTyped(item, typed) {
  const answer = normalise(typed);
  const word = normalise(item.de);
  return answer === word || (!!item.art && answer === `${item.art} ${word}`);
}

function topicProgress(items, records) {
  if (!items.length) return 0;
  const sum = items.reduce((total, it) => total + (records[it.id] ? records[it.id].box : 0), 0);
  return sum / (items.length * MAX_BOX);
}

function countLearned(records) {
  return Object.values(records).filter((r) => r.box >= LEARNED_BOX).length;
}

// Combines a loaded save file with what is on this device, record by record.
// Whichever side was practised most recently wins.
function mergeRecords(mine, theirs, knownIds) {
  const merged = { ...mine };
  for (const [id, rec] of Object.entries(theirs)) {
    const valid = knownIds.has(id) && rec && Number.isInteger(rec.box) && rec.box >= 0 && rec.box <= MAX_BOX
      && Number.isInteger(rec.due) && Number.isInteger(rec.last);
    if (!valid) continue;
    if (!merged[id] || rec.last > merged[id].last) merged[id] = { box: rec.box, due: rec.due, last: rec.last };
  }
  return merged;
}

if (typeof module !== 'undefined') {
  module.exports = {
    MAX_BOX, dayNumber, grade, planSession, planPractice, chooseExercise, isTypable,
    shuffle, makeOptions, checkTyped, topicProgress, countLearned, mergeRecords,
  };
}
