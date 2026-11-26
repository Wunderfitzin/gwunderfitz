# Gwunderfitz

Deutsch lernen für Neuzugezogene (DaZ, A0–A1), mit Hilfe in der Muttersprache und Schweizer Alltag.

**Starten:** `index.html` im Browser öffnen. Es braucht keinen Server und keine Installation.

**Stand:** Prototyp ohne Konten. Der Fortschritt bleibt im Browser des Geräts und lässt sich in den Einstellungen als Datei sichern und laden. Das Konzept für den ganzen A1-Kurs steht in [docs/konzept-a1.md](docs/konzept-a1.md).

**Inhalte bearbeiten:**

- Wörter und Sätze: `js/content.js`, weitere Sprachen in `js/translations.js`
- Oberflächentexte: `js/i18n.js`
- Motivation (Begrüssung, «Warum lerne ich das?», Kann-ich-Ziele, Lob): `js/motivation.js`
- Grammatik-Einführungen: `js/grammar.js`
- Verbenkurs (41 Verben, Memory, Schreib- und Satzübungen): `js/verbs.js`, Übersetzungen in `js/verbs-l1.js` und `js/verbs-more-l1.js` (nach Verb geordnet)
- Stufen im Verbenkurs (⭐ erkennen, ⭐⭐ bilden, ⭐⭐⭐ anwenden, ⏱ Verb-Rennen) mit Tabelle, Diktat, Fehlerjäger und «Was macht die Person?»: `js/verb-levels.js`
- «Meine Vorstellung» (Kinder bauen ihre eigene Vorstellung aus sieben Sätzen und üben sie; nichts wird gespeichert): `js/vorstellung.js`
- Perfektkurs: `js/perfekt.js` (Verben, Regeln und Übersetzungen in einer Datei)
- «Gut miteinander reden» (Gefühle und Bedürfnisse): `js/gefuehle.js`, Konzept in `docs/konzept-gefuehle.md`
- Design «Schweiz Pastell» (Farben, Kacheln, Schrift): `theme.css`, geladen nach `styles.css`. Ohne diese Zeile in `index.html` erscheint wieder das alte Design.
- Profilfiguren (15 Comic-Lerntypen statt Tiere; alte Tier-Profile funktionieren weiter): `js/avatars.js`
- Zeichnungen: `js/drawings.js`, Figuren und Personenszenen in `js/pictures.js`
- Verbbilder: `js/verb-pictures.js`, eine Szene pro Verb. Die Motive folgen den Piktogrammen von [ARASAAC](https://arasaac.org) (Sergio Palao, Gobierno de Aragón, CC BY-NC-SA 4.0); deshalb stehen diese Bilder ebenfalls unter CC BY-NC-SA 4.0 und dürfen nicht kommerziell genutzt werden. Der Hinweis steht in den Einstellungen der App.
- «Meine Wörter» (eigene Wörter der Lernenden): `js/eigene.js`
- Lerneinheit «Amazonien» (Museum Rietberg): `js/amazonia.js`, Übungen in Stufen in `js/amazonia-uebungen.js`, Fotos in `images/amazonia/`, Konzept in `docs/amazonia.md`
- Bildschirmtastaturen (Arabisch, Dari, Paschtu, Sorani, Tigrinya, Singhalesisch): `js/keyboard.js`

**Stimme aufnehmen:** `index.html?autor` öffnen. Aufnahmen bleiben zuerst in diesem Browser. Mit «Für alle Lernenden sichern» entsteht `recordings-data.js`, die die Datei im Ordner `js` ersetzt. Die Seite ist nicht verlinkt, aber auch nicht mit einem Passwort geschützt.

**Tests:** `node tests/check.js` (braucht Node.js).

**Vor dem Einsatz prüfen:** Alle Übersetzungen sind KI-Entwürfe und von Muttersprachlern noch nicht geprüft. Das gilt besonders für Tigrinya, Oromo, Somali, Paschtu, Kurdisch (Sorani) und Singhalesisch. Afar hat noch keine Übersetzungen und zeigt Arabisch.
