import { useRef, useState } from 'react';

const features = [
  ['01', 'Private by design', 'Everything runs inside your browser.'],
  ['02', 'Instant insights', 'Turn a raw export into a visual story.'],
  ['03', 'No setup', 'No account, server, or database required.'],
];

export default function DropZone({ onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const pick = (event) => {
    const file = event.target.files?.[0];
    if (file) onFile(file);
  };
  const drop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <main className="landing">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="landing-nav">
        <div className="brand-mark"><span>◈</span> CHAT WRAPPED</div>
        <div className="nav-pill">LOCAL-FIRST <i /></div>
      </nav>

      <section className="landing-grid">
        <div className="landing-copy">
          <div className="eyebrow"><span className="live-dot" /> Your conversations, reimagined</div>
          <h1>Make your<br /><em>chat history</em><br />feel alive.</h1>
          <p className="lead">A cinematic, private analytics experience for your WhatsApp exports. Discover the people, patterns and tiny moments hiding in thousands of messages.</p>
          <div className="hero-actions">
            <label className="primary-cta">
              Explore my chat <span>↗</span>
              <input ref={inputRef} type="file" accept=".txt,text/plain" onChange={pick} />
            </label>
            <span className="action-note">TXT export · up to 50 MB</span>
          </div>
          <div className="trust-row"><span>✦ 100% local</span><span>◌ Zero uploads</span><span>⌁ No account</span></div>
        </div>

        <div className={`upload-orbit ${dragging ? 'dragging' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}>
          <div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" />
          <div className="preview-card">
            <div className="preview-top"><span>YOUR CHAT</span><b>2026</b></div>
            <div className="preview-number">12,480</div>
            <div className="preview-label">messages worth remembering</div>
            <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="preview-bottom"><span>ACTIVE DAYS</span><strong>284</strong><span>PEAK</span><strong>9 PM</strong></div>
          </div>
          <div className="drop-hint"><span>+</span><strong>{dragging ? 'Release to analyse' : 'Drop your export here'}</strong><small>or use the button on the left</small></div>
        </div>
      </section>

      <section className="feature-strip">
        {features.map(([n, title, text]) => <div className="feature" key={n}><b>{n}</b><div><strong>{title}</strong><p>{text}</p></div></div>)}
      </section>
      <p className="landing-foot">Built for people who want the story, without giving away the data.</p>
    </main>
  );
}
