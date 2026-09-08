import { useEffect, useMemo, useState } from 'react';
import Slide from './Slide.jsx';

const fmt = n => Number(n || 0).toLocaleString();
const pct = (n, d) => d ? Math.round(n / d * 100) : 0;
const date = d => d ? new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const hour = h => `${h % 12 || 12}${h < 12 ? ' AM' : ' PM'}`;

export default function Deck({ stats, index, onPrev, onNext, onGo, onReset }) {
  const [tab, setTab] = useState('story');
  const maxHour = Math.max(...stats.hours.map(x => x.count), 1);
  const maxAuthor = Math.max(...stats.authors.map(x => x.count), 1);

  const tabs = [
    ['story', 'Story'],
    ['overview', 'Overview'],
    ['people', 'People'],
    ['timing', 'Timing'],
    ['language', 'Language'],
    ['media', 'Media'],
  ];

  const slides = useMemo(() => [
    <><div className="slide-kicker"><span>01</span> OVERVIEW</div><div className="hero">{fmt(stats.total)}</div><h2>messages that became<br/><em>a story.</em></h2><div className="insight-line"><span>{stats.activeDays} active days</span><i/><span>{stats.spanDays} days covered</span></div></>,
    <><div className="slide-kicker"><span>02</span> PEOPLE</div><h2>Every great chat<br/><em>has a cast.</em></h2><div className="rank-list">{stats.authors.map((a, i) => <div className="rank" key={a.name}><b>0{i + 1}</b><span className="rank-name">{a.name}</span><div className="bar-track"><div className="bar" style={{ width: `${pct(a.count, maxAuthor)}%` }}/></div><strong>{fmt(a.count)}</strong></div>)}</div></>,
    <><div className="slide-kicker"><span>03</span> PEAK TIME</div><div className="metric">{hour(stats.peakHour)}</div><h2>when the chat<br/><em>comes alive.</em></h2><div className="hour-chart">{stats.hours.map(x => <div className="hour" key={x.name} title={`${hour(x.name)} · ${x.count} messages`}><div className="hour-bar" style={{ height: `${Math.max(3, x.count / maxHour * 100)}%` }}/><span>{x.name}</span></div>)}</div></>,
    <><div className="slide-kicker"><span>04</span> RHYTHM</div><h2>There is a pattern<br/><em>to your presence.</em></h2><div className="stat-grid">{stats.weekdays.map(x => <div className="stat" key={x.name}><strong>{fmt(x.count)}</strong><span>{x.name}</span></div>)}</div><p className="muted">Average {fmt(stats.avgPerActiveDay)} messages per active day.</p></>,
    <><div className="slide-kicker"><span>05</span> BIGGEST DAY</div><div className="hero">{fmt(stats.busiestDay?.count)}</div><h2>messages.<br/><em>one unforgettable day.</em></h2><p className="muted">{stats.busiestDay?.day || 'No date available'}</p></>,
    <><div className="slide-kicker"><span>06</span> THE PAUSE</div><div className="metric">{stats.longestSilence?.hours || 0}<small>h</small></div><h2>the longest silence<br/><em>between words.</em></h2><p className="muted">Last message before the gap: {date(stats.longestSilence?.at)}</p></>,
    <><div className="slide-kicker"><span>07</span> EMOJI DNA</div><div className="emoji">{stats.topEmoji}</div><h2>One tiny symbol<br/><em>says a lot.</em></h2><div className="emoji-row">{stats.emojis.map(x => <span key={x.name}>{x.name} <small>{x.count}</small></span>)}</div></>,
    <><div className="slide-kicker"><span>08</span> VOCABULARY</div><h2>The words that<br/><em>sound like you.</em></h2><div className="word-cloud">{stats.topWords.map((x, i) => <span key={x.name} style={{ fontSize: `${1 + (i % 4) * .25}rem` }}>{x.name} <small>{x.count}</small></span>)}</div></>,
    <><div className="slide-kicker"><span>09</span> OPENERS</div><h2>Who starts<br/><em>the story?</em></h2>{stats.openers.map(x => <div className="bar-row" key={x.name}><span>{x.name}</span><div className="bar-track"><div className="bar" style={{ width: `${pct(x.count, stats.openers[0]?.count || 1)}%` }}/></div><b>{x.count}</b></div>)}</>,
    <><div className="slide-kicker"><span>10</span> CONNECTION</div><div className="metric">{stats.response?.averageMinutes || 0}<small> min</small></div><h2>average reply time.</h2><p className="muted">Based on {fmt(stats.response?.samples || 0)} cross-person message pairs within 24 hours.</p></>,
    <><div className="slide-kicker"><span>11</span> THE FINALE</div><div className="hero">{fmt(stats.mediaCount)}</div><h2>memories attached<br/><em>to the conversation.</em></h2><p className="muted">From {date(stats.first)} to {date(stats.last)}.</p><button className="finish-cta" onClick={onReset}>Analyse another chat <span>↗</span></button></>,
  ], [stats, maxHour, maxAuthor, onReset]);

  const overview = <>
    <div className="dashboard-hero"><div><div className="slide-kicker"><span>LIVE ANALYSIS</span> CONVERSATION OS</div><h1>Your conversation,<br/><em>decoded.</em></h1><p>Private analytics with a product-grade interface. Everything is calculated locally in your browser.</p></div><div className="score-orbit"><span>{fmt(stats.total)}</span><small>MESSAGES</small></div></div>
    <div className="kpi-grid">
      <div className="kpi"><span>ACTIVE DAYS</span><strong>{fmt(stats.activeDays)}</strong><small>{fmt(stats.avgPerActiveDay)} / active day</small></div>
      <div className="kpi"><span>PEAK HOUR</span><strong>{hour(stats.peakHour)}</strong><small>highest activity</small></div>
      <div className="kpi"><span>MEDIA</span><strong>{fmt(stats.mediaCount)}</strong><small>shared moments</small></div>
      <div className="kpi"><span>REPLY TIME</span><strong>{stats.response?.averageMinutes || 0}<i>m</i></strong><small>{fmt(stats.response?.samples || 0)} samples</small></div>
    </div>
    <div className="dashboard-grid"><section><span className="section-label">MOST ACTIVE PEOPLE</span>{stats.authors.slice(0, 5).map((a, i) => <div className="mini-rank" key={a.name}><b>{String(i + 1).padStart(2, '0')}</b><span>{a.name}</span><div><i style={{ width: `${pct(a.count, maxAuthor)}%` }}/></div><strong>{fmt(a.count)}</strong></div>)}</section><section><span className="section-label">WEEKLY RHYTHM</span><div className="rhythm-chart">{stats.weekdays.map(x => <div key={x.name}><i style={{ height: `${Math.max(5, pct(x.count, Math.max(...stats.weekdays.map(w => w.count), 1)))}%` }}/><span>{x.name.slice(0, 3)}</span></div>)}</div></section></div>
  </>;

  const people = <><div className="tab-heading"><span>PEOPLE</span><h2>The cast behind<br/><em>the messages.</em></h2></div><div className="people-grid">{stats.authors.map((a, i) => <article key={a.name}><div className="avatar-letter">{a.name?.trim()?.[0]?.toUpperCase() || '?'}</div><span>#{String(i + 1).padStart(2, '0')}</span><h3>{a.name}</h3><strong>{fmt(a.count)}</strong><small>{pct(a.count, stats.total)}% of all messages</small><div className="line"><i style={{ width: `${pct(a.count, maxAuthor)}%` }}/></div></article>)}</div></>;
  const timing = <><div className="tab-heading"><span>TIMING</span><h2>Find the hours<br/><em>that define you.</em></h2></div><div className="timing-feature"><strong>{hour(stats.peakHour)}</strong><span>your conversation's busiest hour</span></div><div className="full-hour-chart">{stats.hours.map(x => <div key={x.name}><span>{x.name}</span><i style={{ height: `${Math.max(4, x.count / maxHour * 100)}%` }}/><small>{x.count}</small></div>)}</div></>;
  const language = <><div className="tab-heading"><span>LANGUAGE</span><h2>Your vocabulary<br/><em>has a fingerprint.</em></h2></div><div className="word-cloud large">{stats.topWords.map((x, i) => <span key={x.name} style={{ fontSize: `${1 + (i % 5) * .3}rem` }}>{x.name}<small>{x.count}</small></span>)}</div><div className="emoji-row language-emojis">{stats.emojis.map(x => <span key={x.name}>{x.name} <small>{x.count}</small></span>)}</div></>;
  const media = <><div className="tab-heading"><span>MEDIA</span><h2>Moments worth<br/><em>remembering.</em></h2></div><div className="media-hero"><strong>{fmt(stats.mediaCount)}</strong><span>media messages detected</span></div><div className="media-grid"><div><b>{fmt(stats.total)}</b><span>Total messages</span></div><div><b>{fmt(stats.activeDays)}</b><span>Active days</span></div><div><b>{date(stats.first)}</b><span>First message</span></div><div><b>{date(stats.last)}</b><span>Latest message</span></div></div></>;

  useEffect(() => { const key = e => { if (e.key === 'ArrowRight') { e.preventDefault(); if (tab === 'story' && index < slides.length - 1) onNext(slides.length); } if (e.key === 'ArrowLeft' && tab === 'story' && index > 0) { e.preventDefault(); onPrev(); } if (e.key === 'Home') onReset(); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [index, slides.length, onNext, onPrev, onReset, tab]);

  return <div className="deck"><div className="deck-glow"/><div className="topbar"><strong><span>◈</span> CHAT WRAPPED</strong><span>PRIVATE · LOCAL · {fmt(stats.total)} MSGS</span></div><nav className="tabbar" aria-label="Analytics sections">{tabs.map(([id, label]) => <button key={id} className={tab === id ? 'tab active' : 'tab'} onClick={() => setTab(id)}>{label}<i/></button>)}</nav>
    <main className="workspace">
      {tab === 'story' && <><div className="progress"><i style={{ width: `${(index + 1) / slides.length * 100}%` }}/></div><Slide key={index}>{slides[index]}</Slide><div className="controls"><button className="nav" onClick={onPrev} disabled={!index}>←</button><div className="story-counter">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div><button className="nav" onClick={() => onNext(slides.length)} disabled={index === slides.length - 1}>→</button></div></>}
      {tab === 'overview' && <section className="dashboard-view">{overview}</section>}
      {tab === 'people' && <section className="dashboard-view">{people}</section>}
      {tab === 'timing' && <section className="dashboard-view">{timing}</section>}
      {tab === 'language' && <section className="dashboard-view">{language}</section>}
      {tab === 'media' && <section className="dashboard-view">{media}</section>}
    </main>
    <div className="bottom-bar"><span>NO SERVER · NO UPLOAD · NO TRACKING</span><button onClick={onReset}>Analyse another chat ↗</button></div>
  </div>;
}
