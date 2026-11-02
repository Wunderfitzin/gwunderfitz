// Audio through the voices installed on the device, so it also works offline.
const Speech = {
  voices: [],

  // Browsers load voices late; wait briefly so the first screen can rely on them.
  ready() {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) return resolve();
      const refresh = () => {
        this.voices = speechSynthesis.getVoices();
        if (this.voices.length) resolve();
      };
      speechSynthesis.addEventListener('voiceschanged', refresh);
      refresh();
      setTimeout(resolve, 800);
    });
  },

  // Higher is better. Downloaded and neural voices sound far less metallic than
  // the compact defaults; macOS novelty voices are left out altogether.
  score(voice) {
    const name = voice.name.toLowerCase();
    if (/eddy|flo|grandma|grandpa|oma|opa|reed|rocko|sandy|shelley|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox/.test(name)) return -1;
    let points = 0;
    if (/premium|neural|natural/.test(name)) points += 8;
    if (/enhanced|erweitert|verbessert/.test(name)) points += 6;
    if (/google|microsoft/.test(name)) points += 4;
    if (voice.lang.toLowerCase().replace('_', '-') === 'de-ch') points += 1;
    return points;
  },

  voiceFor(lang) {
    const local = this.voices
      .filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(lang) && this.score(v) >= 0)
      .sort((a, b) => this.score(b) - this.score(a));
    return local[0] || null;
  },

  has(lang) {
    return !!this.voiceFor(lang);
  },

  stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (this.audio) this.audio.pause();
  },

  // A recording wins over the device voice. It plays at natural speed, and the
  // slow button keeps its pitch.
  say(text, lang = 'de', rate = 0.85) {
    this.stop();
    const recording = lang === 'de' ? Recordings.url(text) : null;
    if (recording) {
      this.audio = new Audio(recording);
      this.audio.preservesPitch = true;
      this.audio.playbackRate = rate < 0.85 ? 0.7 : 1;
      this.audio.play().catch(() => {});
      return;
    }
    const voice = this.voiceFor(lang);
    if (!voice) return;
    const utterance = new SpeechSynthesisUtterance(text.replace(/…/g, ''));
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  },
};
