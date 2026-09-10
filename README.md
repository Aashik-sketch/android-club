# Chat Wrapped — conversations, turned into a visual story ✨

<p align="center">
  <strong>A cinematic, privacy-first WhatsApp conversation analytics experience built with React + Vite.</strong>
</p>

<p align="center">
  <a href="https://android-club.vercel.app/">Live Demo</a> ·
  <a href="https://github.com/Aashik-sketch/android-club">Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Privacy-Local--First-111111?style=for-the-badge&logo=shield&logoColor=white" alt="Privacy first" />
  <img src="https://img.shields.io/badge/License-Private-555555?style=for-the-badge" alt="Private project" />
</p>

> **Your chat becomes a story, not another spreadsheet.**
>
> Upload a WhatsApp `.txt` export and Chat Wrapped turns raw conversation history into an interactive visual narrative — while keeping the data inside your browser.

## ✨ Why this project stands out

This is deliberately **not** a generic analytics dashboard. The product treats conversation data like a visual story.

- 🔒 **Local-first privacy** — chat content is processed in the browser; there is no application backend.
- ⚡ **Web Worker analytics** — heavier parsing/statistics work can stay away from the main UI thread.
- 🎞️ **Cinematic story deck** — insights are presented through an 11-card progressive experience rather than a wall of charts.
- 🎯 **Premium visual language** — oversized typography, restrained colour, thin borders, ambient glow and motion create a product-launch feel.
- 📊 **Conversation intelligence** — people, peak time, rhythm, busiest day, silence, emoji DNA, vocabulary, openers, reply time and media.
- ⌨️ **Keyboard-first navigation** — arrow keys, Space and Home make the story usable without a mouse.
- 📱 **Responsive by design** — the experience is built for desktop, tablet and mobile.
- 🧪 **Testable core** — parsing and analytics are kept framework-free where possible.
- 🚀 **Deployment-ready** — Vite production builds and automated verification are already part of the project direction.

## 🧠 Product flow

```text
WhatsApp .txt export
        ↓
Drag & drop / file picker
        ↓
Local browser processing
        ↓
Web Worker
        ↓
Parser → normalized messages
        ↓
Statistics engine
        ↓
Cinematic 11-card story
```

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Build | Vite 5 |
| Analytics | JavaScript |
| Heavy processing | Web Worker |
| Styling | Custom CSS |
| Testing | Node test runner |
| Deployment | Vercel |

## 🚀 Run locally

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

## 🗂️ Project structure

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

## 🔐 Privacy model

No chat is intentionally sent to a server. The selected file is read with browser APIs and processed locally. **Never commit a real private WhatsApp export.** The included `public/sample-chat.txt` is intended only for sanitized demo data.

## 🧩 Engineering decisions

### Why a Web Worker?

Parsing a large exported conversation and calculating statistics can create unnecessary UI work. Moving the heavier operation into a Worker helps keep the interface responsive while the analysis runs.

### Why a story deck instead of a dashboard?

A dashboard makes users scan. A story gives them a sequence: **who → when → how → what → memorable patterns**. The 11-card structure turns raw statistics into something people can actually explore.

### Why local-first?

Conversation exports can contain highly personal information. Keeping processing in the browser reduces the need to transmit raw chat data to an application backend.

## ⚠️ Parser note

WhatsApp export syntax can vary by platform, locale and application version. The parser supports common date/time formats and multiline messages, but a real export should always be tested before claiming universal compatibility.

---

<p align="center">
  <strong>Built to make conversation analytics feel like a product, not a report.</strong>
</p>
