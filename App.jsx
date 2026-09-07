import { useEffect, useMemo, useReducer, useRef } from 'react';
import { computeStats } from './lib/stats.js';
import { parseChat } from './lib/parser.js';
import DropZone from './src/components/DropZone.jsx';
import Deck from './src/components/Deck.jsx';
import ErrorPanel from './src/components/ErrorPanel.jsx';

const initial = { status: 'idle', messages: [], stats: null, index: 0, error: '', fileName: '' };
function reducer(state, action) {
  switch (action.type) {
    case 'START': return { ...state, status: 'parsing', error: '', fileName: action.fileName };
    case 'READY': return { ...state, status: 'ready', messages: action.messages, stats: action.stats, index: 0 };
    case 'ERROR': return { ...initial, status: 'error', error: action.error };
    case 'RESET': return initial;
    case 'GO': return { ...state, index: Math.max(0, Math.min(action.index, action.max - 1)) };
    case 'NEXT': return { ...state, index: Math.min(state.index + 1, action.max - 1) };
    case 'PREV': return { ...state, index: Math.max(0, state.index - 1) };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const workerRef = useRef(null);
  const fallbackStats = useMemo(() => state.stats || (state.messages.length ? computeStats(state.messages) : null), [state.stats, state.messages]);
  useEffect(() => () => workerRef.current?.terminate(), []);

  async function handleFile(file) {
    if (!file || !/\.txt$/i.test(file.name)) return dispatch({ type: 'ERROR', error: 'Please choose a WhatsApp .txt export file.' });
    if (file.size > 50 * 1024 * 1024) return dispatch({ type: 'ERROR', error: 'This file is larger than 50 MB. Export a smaller chat for browser performance.' });
    dispatch({ type: 'START', fileName: file.name });
    try {
      const text = await file.text();
      if (typeof Worker !== 'undefined') {
        workerRef.current?.terminate();
        const worker = new Worker(new URL('./src/worker/chatWorker.js', import.meta.url), { type: 'module' });
        workerRef.current = worker;
        worker.onmessage = ({ data }) => {
          worker.terminate();
          if (data.type === 'success') dispatch({ type: 'READY', messages: data.messages, stats: data.stats });
          else dispatch({ type: 'ERROR', error: data.error });
        };
        worker.onerror = () => {
          worker.terminate();
          try { const messages = parseChat(text); if (!messages.length) throw new Error('No chat messages were recognised.'); dispatch({ type: 'READY', messages, stats: computeStats(messages) }); }
          catch (error) { dispatch({ type: 'ERROR', error: error.message || 'Could not parse the chat.' }); }
        };
        worker.postMessage({ text });
      } else {
        const messages = parseChat(text);
        if (!messages.length) throw new Error('No chat messages were recognised. Check the export format.');
        dispatch({ type: 'READY', messages, stats: computeStats(messages) });
      }
    } catch (error) { dispatch({ type: 'ERROR', error: error.message || 'Could not read this file.' }); }
  }

  if (state.status === 'error') return <ErrorPanel error={state.error} onReset={() => dispatch({ type: 'RESET' })} />;
  if (state.status === 'parsing') return <main className="drop"><section className="drop-card"><div className="spinner"/><div className="eyebrow">Local processing</div><h1>Building your story…</h1><p>{state.fileName}</p><p className="privacy">Your chat never leaves this browser. Large files are parsed in a Web Worker.</p></section></main>;
  if (state.status !== 'ready' || !fallbackStats) return <DropZone onFile={handleFile} />;
  return <Deck stats={fallbackStats} index={state.index} onPrev={() => dispatch({ type: 'PREV' })} onNext={(max) => dispatch({ type: 'NEXT', max })} onGo={(index,max) => dispatch({ type: 'GO', index, max })} onReset={() => dispatch({ type: 'RESET' })} />;
}
