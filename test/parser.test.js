import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChat, detectFormat } from '../lib/parser.js';
import { computeStats } from '../lib/stats.js';

test('detects WhatsApp export', () => {
  assert.equal(detectFormat('15/03/2026, 09:12 - Alex: Hello'), 'whatsapp');
});

test('parses multiline messages and caches grouping fields', () => {
  const messages = parseChat('15/03/2026, 09:12 - Alex: Hello\ncontinued line\n15/03/2026, 09:14 - Sam: Hi 👋');
  assert.equal(messages.length, 2);
  assert.equal(messages[0].text, 'Hello\ncontinued line');
  assert.equal(messages[0].hour, 9);
  assert.equal(messages[0].dayKey, '2026-03-15');
});

test('computes core and advanced statistics', () => {
  const messages = parseChat('15/03/2026, 09:12 - Alex: Hello 🚀\n15/03/2026, 09:14 - Sam: Hello\n16/03/2026, 10:14 - Alex: build works');
  const stats = computeStats(messages);
  assert.equal(stats.total, 3);
  assert.equal(stats.authors[0].count, 2);
  assert.equal(stats.topEmoji, '🚀');
  assert.equal(stats.activeDays, 2);
  assert.ok(stats.longestSilence.hours >= 24);
});
