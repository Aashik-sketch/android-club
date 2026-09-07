# Chat Wrapped

A privacy-first React single-page app that turns a WhatsApp `.txt` export into an interactive chat year-in-review.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## How it works

1. Select or drag a WhatsApp text export into the browser.
2. `lib/parser.js` converts raw text into normalized message objects.
3. `lib/stats.js` computes conversation statistics.
4. React renders the statistics as a story deck.

No backend or chat upload is required: processing happens in the browser.

## Project structure

- `App.jsx` — application state and parsing flow
- `src/components/` — React UI components
- `lib/` — pure parsing, statistics, date and formatting utilities
- `public/sample-chat.txt` — safe sample data
- `vite.config.js` — Vite configuration

## Notes

WhatsApp export formats vary by platform, locale and app version. Test the parser against a real export before relying on the results.
