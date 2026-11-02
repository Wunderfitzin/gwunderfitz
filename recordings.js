// Spoken recordings, keyed by the German text. New takes stay in this browser's
// IndexedDB until the author saves them into js/recordings-data.js for everyone.
const Recordings = {
  local: {},

  key(text) {
    return text.replace(/…/g, '').trim();
  },

  url(text) {
    const key = this.key(text);
    return this.local[key] || RECORDINGS[key] || null;
  },

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('gwunderfitz-recordings', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('takes');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async write(change) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('takes', 'readwrite');
      change(tx.objectStore('takes'));
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => reject(tx.error);
    });
  },

  async load() {
    try {
      const db = await this.open();
      await new Promise((resolve, reject) => {
        const request = db.transaction('takes').objectStore('takes').openCursor();
        request.onsuccess = () => {
          const cursor = request.result;
          if (!cursor) return resolve();
          this.local[cursor.key] = cursor.value;
          cursor.continue();
        };
        request.onerror = () => reject(request.error);
      });
      db.close();
    } catch { /* blocked storage: delivered recordings still play */ }
  },

  async save(text, dataUrl) {
    const key = this.key(text);
    this.local[key] = dataUrl;
    await this.write((store) => store.put(dataUrl, key));
  },

  async remove(text) {
    const key = this.key(text);
    delete this.local[key];
    await this.write((store) => store.delete(key));
  },

  exportFile() {
    const all = { ...RECORDINGS, ...this.local };
    return `// Recordings delivered with the app, by German text.\nvar RECORDINGS = ${JSON.stringify(all)};\n`;
  },
};
