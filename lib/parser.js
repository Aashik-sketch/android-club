const HEADER = /^\[?(\d{1,4})[\/-](\d{1,2})[\/-](\d{1,4}),?\s+(\d{1,2}):([0-5]\d)(?::([0-5]\d))?(?:\s*([AP]M))?\]?\s*[-–]\s*(.*)$/i;

function makeDate(a, b, c, h, min, sec, ampm) {
  let year, month, day;
  if (String(a).length === 4) { year = +a; month = +b; day = +c; }
  else { day = +a; month = +b; year = +c; year += year < 100 ? 2000 : 0; }
  let hour = +h;
  if (ampm) { hour %= 12; if (ampm.toUpperCase() === 'PM') hour += 12; }
  const date = new Date(year, month - 1, day, hour, +min, +(sec || 0));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function classifyLine(line) { return HEADER.test(line.trim()) ? 'header' : 'continuation'; }

export function parseHeader(line) {
  const match = line.trim().match(HEADER);
  if (!match) return null;
  const [, a, b, c, h, min, sec, ampm, rest] = match;
  const at = makeDate(a, b, c, h, min, sec, ampm);
  if (!at) return null;
  const authorMatch = rest.match(/^([^:]+):\s?(.*)$/);
  const text = authorMatch ? authorMatch[2] : rest;
  return {
    at,
    author: authorMatch ? authorMatch[1].trim() : 'System',
    text,
    isMedia: /(?:<Media omitted>|media omitted|image omitted|video omitted|audio omitted|sticker omitted|GIF omitted)/i.test(text)
  };
}

export function detectFormat(text) { return text.split(/\r?\n/).some(line => HEADER.test(line.trim())) ? 'whatsapp' : 'unknown'; }

export function parseChat(text) {
  if (typeof text !== 'string') throw new TypeError('Chat input must be text.');
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  const messages = [];
  let current = null;
  for (const line of lines) {
    const header = parseHeader(line);
    if (header) { if (current) messages.push(current); current = header; }
    else if (current && line.trim()) current.text += `\n${line.trim()}`;
  }
  if (current) messages.push(current);
  return messages.map(message => ({
    ...message,
    text: message.text.trim(),
    isMedia: message.isMedia || /^(?:image|video|audio|sticker|GIF) omitted$/i.test(message.text.trim()),
    hour: message.at.getHours(),
    dayKey: `${message.at.getFullYear()}-${String(message.at.getMonth() + 1).padStart(2, '0')}-${String(message.at.getDate()).padStart(2, '0')}`
  })).filter(message => message.at instanceof Date && !Number.isNaN(message.at.getTime())).sort((a, b) => a.at - b.at);
}
