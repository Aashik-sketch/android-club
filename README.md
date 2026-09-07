# Chat Wrapped

A privacy-first React single-page app that turns a WhatsApp-style chat export into an animated year-in-review story.

## Features
- Chat export parsing in the browser
- No backend and no chat data upload
- Message totals, authors, hourly activity, weekdays and daily activity
- Emoji and conversation insights
- Keyboard-friendly slide navigation
- Responsive CSS-only visualisations

## Architecture
`lib/` contains pure parsing/statistics/date/format functions. React components render the resulting data. This separation keeps analysis testable and makes future Web Worker migration straightforward.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Privacy
The selected chat file is processed locally in the browser. The application does not require a server to analyse the export.
