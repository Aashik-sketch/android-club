import { useRef } from 'react';

export default function DropZone({ onFile }) {
  const inputRef = useRef(null);
  const pick = (event) => {
    const file = event.target.files?.[0];
    if (file) onFile(file);
  };
  const drop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFile(file);
  };
  return <main className="drop"><section className="drop-card" onDragOver={(e) => e.preventDefault()} onDrop={drop}>
    <div className="eyebrow">Privacy-first chat analytics</div><h1>Chat Wrapped</h1>
    <p>Turn a WhatsApp text export into a private year-in-review. Your chat is processed locally in this browser.</p>
    <label className="file-label">Choose chat export<input ref={inputRef} type="file" accept=".txt,text/plain" onChange={pick} /></label>
    <p className="privacy">No upload • No backend • No account required</p>
  </section></main>;
}
