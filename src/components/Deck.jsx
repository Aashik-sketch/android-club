import Slide from './Slide.jsx';

const pct = (n, d) => d ? Math.round((n / d) * 100) : 0;

export default function Deck({ stats, index, onPrev, onNext }) {
  const slides = [
    <><div className="eyebrow">Your conversation</div><div className="hero">{stats.total.toLocaleString()}</div><p className="muted">messages across {stats.spanDays} days</p></>,
    <><div className="eyebrow">People</div><h2>Who talked most?</h2>{stats.authors.map(a => <div className="bar-row" key={a.name}><span>{a.name}</span><div className="bar-track"><div className="bar" style={{ width: `${pct(a.count, stats.total)}%` }} /></div><b>{a.count}</b></div>)}</>,
    <><div className="eyebrow">Time</div><h2>When were you most active?</h2><div className="hour-chart">{stats.hours.map(h => <div className="hour" key={h.name} title={`${h.name}:00 — ${h.count} messages`}><div className="hour-bar" style={{ height: `${Math.max(4, pct(h.count, Math.max(...stats.hours.map(x => x.count), 1)))}%` }} /><span>{h.name}</span></div>)}</div></>,
    <><div className="eyebrow">Weekdays</div><h2>Your weekly rhythm</h2><div className="stat-grid">{stats.weekdays.map(x => <div className="stat" key={x.name}><strong>{x.count}</strong><span>{x.name}</span></div>)}</div></>,
    <><div className="eyebrow">Busiest day</div><div className="hero">{stats.busiestDay?.count || 0}</div><p className="muted">messages on {stats.busiestDay?.day || '—'}</p></>,
    <><div className="eyebrow">Silence</div><h2>Longest gap</h2><div className="metric">{stats.longestSilence?.hours || 0}h</div><p className="muted">between two messages</p></>,
    <><div className="eyebrow">Emoji</div><div className="emoji">{stats.topEmoji}</div><h2>Your top emoji</h2></>
  ];
  return <div className="deck"><Slide>{slides[index]}</Slide><div className="controls"><button className="nav" onClick={onPrev} disabled={!index}>← Previous</button><span className="muted">{index + 1} / {slides.length}</span><button className="nav" onClick={() => onNext(slides.length)} disabled={index === slides.length - 1}>Next →</button></div></div>;
}
