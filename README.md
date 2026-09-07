# Chat Wrapped ✨

A privacy-first React + Vite single-page app that turns a WhatsApp `.txt` export into an interactive 11-card conversation story.

## Highlights

- 🔒 **Local-first:** chat text is processed in the browser; there is no backend.
- ⚡ **Web Worker:** parsing and analytics run off the UI thread when supported.
- 📊 **11 story cards:** totals, people, peak hour, weekly rhythm, busiest day, longest silence, emoji fingerprint, vocabulary, daily openers, reply time and media.
- 🧠 **Pure analytics layer:** `lib/parser.js` and `lib/stats.js` have no React dependency.
- ♿ **Keyboard accessible:** Arrow keys navigate; Space advances; Home resets.
- 📱 **Responsive:** desktop and mobile layouts.
- 🧪 **Automated tests:** parser and analytics edge cases run with Node's built-in test runner.
- ✅ **CI:** GitHub Actions runs tests and the production build on pushes and pull requests.

## Run in VS Code

```bash
git clone https://github.com/Aashik-sketch/android-club.git
cd android-club
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, normally `http://localhost:5173`.

### Production verification

```bash
npm test
npm run build
npm run preview
```

## Project structure

```text
.
├── App.jsx
├── main.jsx
├── index.html
├── index.css
├── vite.config.js
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
├── src/worker/
│   └── chatWorker.js
├── hooks/
│   ├── useKeyPress.js
│   └── useLocalStorage.js
├── test/
│   └── parser.test.js
└── public/
    └── sample-chat.txt
```

## Architecture

`raw .txt → Web Worker → parser → normalized messages → statistics → React story deck`

The parser and statistics modules are intentionally framework-free. This keeps the data pipeline testable and makes the Worker migration straightforward.

## Privacy

No chat is sent to a server. The app reads the selected file using browser APIs and performs parsing/analytics locally. Do not put private exports into the repository; use `public/sample-chat.txt` only for sanitized demo data.

## Parser note

WhatsApp export syntax can vary by platform, locale and application version. The parser supports common day/month/year, year/month/day, 12-hour and 24-hour forms plus multiline messages, but a real export should always be tested before claiming universal compatibility.
