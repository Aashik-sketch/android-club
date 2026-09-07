const STOP_WORDS = new Set('the a an and or but if then than this that with for from you your are was were is it to of in on at as i we me my our be have has had do did can will just not so very'.split(' '));
function counts(items, key) { const result = {}; for (const item of items) { const k = key(item); result[k] = (result[k] || 0) + 1; } return result; }
function top(map, n = 10) { return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count })); }
function empty() { return { total: 0, authors: [], hours: Array.from({length:24},(_,name)=>({name,count:0})), weekdays: [], daily: [], monthly: [], busiestDay: null, longestSilence: null, topEmoji: '—', emojis: [], topWords: [], openers: [], mediaCount: 0, first: null, last: null, spanDays: 0, activeDays: 0, avgPerActiveDay: 0, peakHour: 0, response: null }; }
export function computeStats(messages) {
  if (!messages.length) return empty();
  const ordered = [...messages].sort((a,b) => a.at - b.at);
  const first = ordered[0].at, last = ordered[ordered.length - 1].at;
  const authors = top(counts(ordered, m => m.author));
  const hours = Array.from({length:24}, (_, hour) => ({ name: hour, count: ordered.reduce((n,m) => n + (m.hour === hour ? 1 : 0), 0) }));
  const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const weekdays = top(counts(ordered, m => m.at.getDay())).map(x => ({ ...x, name: weekdayNames[+x.name] }));
  const dailyMap = counts(ordered, m => m.dayKey);
  const daily = Object.entries(dailyMap).map(([day,count]) => ({day,count})).sort((a,b) => b.count-a.count);
  const monthly = top(counts(ordered, m => `${m.at.getFullYear()}-${String(m.at.getMonth()+1).padStart(2,'0')}`), 12).map(x => ({month:x.name,count:x.count}));
  let longest = 0, longestAt = null, responseSum = 0, responseCount = 0;
  for (let i=1;i<ordered.length;i++) {
    const gap = ordered[i].at - ordered[i-1].at;
    if (gap > longest) { longest = gap; longestAt = ordered[i-1].at; }
    if (ordered[i].author !== ordered[i-1].author && gap >= 0 && gap <= 24*3600000) { responseSum += gap; responseCount++; }
  }
  const emojiMap = {};
  const wordMap = {};
  for (const message of ordered) {
    for (const char of Array.from(message.text)) if (/\p{Extended_Pictographic}/u.test(char)) emojiMap[char] = (emojiMap[char] || 0) + 1;
    for (const word of message.text.toLowerCase().match(/[a-z][a-z'’-]{2,}/g) || []) if (!STOP_WORDS.has(word)) wordMap[word] = (wordMap[word] || 0) + 1;
  }
  const openers = [];
  for (let i=0;i<ordered.length;i++) if (i===0 || ordered[i].dayKey !== ordered[i-1].dayKey) openers.push(ordered[i]);
  const emojis = top(emojiMap, 8);
  const activeDays = Object.keys(dailyMap).length;
  const peakHour = hours.reduce((best,x) => x.count > best.count ? x : best, hours[0]).name;
  return {
    total: ordered.length, authors, hours, weekdays, daily, monthly,
    busiestDay: daily[0] || null,
    longestSilence: longestAt ? { at: longestAt, hours: Math.round(longest/3600000), minutes: Math.round(longest/60000) } : null,
    topEmoji: emojis[0]?.name || '—', emojis, topWords: top(wordMap, 10),
    openers: top(counts(openers, m => m.author)), mediaCount: ordered.filter(m => m.isMedia).length,
    first, last, spanDays: Math.max(1, Math.ceil((last-first)/86400000)), activeDays,
    avgPerActiveDay: Math.round(ordered.length / activeDays), peakHour,
    response: responseCount ? { averageMinutes: Math.round(responseSum/responseCount/60000), samples: responseCount } : null
  };
}
