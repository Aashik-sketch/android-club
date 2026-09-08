# Chat Wrapped — conversation, turned into a visual story ✨

A privacy-first React + Vite experience that transforms a WhatsApp `.txt` export into a cinematic, interactive conversation story. The interface is inspired by modern 21st-style product design: oversized type, restrained color, micro-interactions, strong hierarchy and a deliberately premium editorial feel.

## What makes this version different

- 🔒 **Local-first:** your chat stays in the browser; there is no backend.
- ⚡ **Web Worker analytics:** parsing and statistics stay off the main UI thread when supported.
- ✦ **Cinematic story deck:** 11 cards with progressive storytelling instead of a conventional dashboard.
- 🎯 **Premium landing experience:** drag-and-drop upload, animated orbit system, live-style preview and clear privacy messaging.
- 📈 **Conversation intelligence:** people, peak time, rhythm, busiest day, silence, emoji DNA, vocabulary, openers, reply time and media.
- ⌨️ **Keyboard-first:** Arrow keys navigate, Space advances and Home resets.
- 📱 **Responsive:** intentionally designed for desktop, tablet and mobile rather than simply shrinking the desktop UI.
- 🧪 **Testable architecture:** parser and analytics remain framework-free.
- ✅ **CI ready:** tests and production build run through GitHub Actions.

## Run locally

```bash
git clone https://github.com/Aashik-sketch/android-club.git
cd android-club
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

### Production verification

```bash
npm test
npm run build
npm run preview
```

## Product flow

```text
WhatsApp .txt export
        ↓
Drag & drop / file picker
        ↓
Web Worker
        ↓
Parser → normalized messages
        ↓
Statistics engine
        ↓
Cinematic 11-card story
```

## Project structure

```text
.
├── App.jsx
├── main.jsx
├── index.html
├── index.css
├── package.json
├── lib/
│   ├── parser.js
│   ├── stats.js
│   ├── dates.js
│   └── format.js
├── src/components/
│   ├── DropZone.jsx
│   ├── Deck.jsx
│   ├── Slide.jsx
│   ├── BarChart.jsx
│   ├── Heatmap.jsx
│   └── ErrorPanel.jsx
├── src/worker/chatWorker.js
├── hooks/
├── test/
└── public/sample-chat.txt
```

## Design direction

The redesign intentionally avoids a generic admin-dashboard look. It uses a near-black canvas, acid-lime accent, oversized editorial typography, thin borders, subtle ambient glow, animated orbit rings and compact monospace metadata. The result is closer to a premium product launch page than a student analytics dashboard.

## Privacy

No chat is sent to a server. The selected file is read with browser APIs and processed locally. Never commit a real private chat export; `public/sample-chat.txt` is intended only for sanitized demo data.

## Parser note

WhatsApp export syntax can vary by platform, locale and application version. The parser supports common date/time formats and multiline messages, but a real export should always be tested before claiming universal compatibility.
