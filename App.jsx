import { useMemo, useReducer } from 'react';
import { parseChat } from './lib/parser.js';
import { computeStats } from './lib/stats.js';
import DropZone from './src/components/DropZone.jsx';
import Deck from './src/components/Deck.jsx';
import ErrorPanel from './src/components/ErrorPanel.jsx';

const initial = { status: 'idle', messages: [], index: 0, error: '' };
function reducer(state, action) {
  switch (action.type) {
    case 'PARSE_START': return { ...state, status: 'parsing', error: '' };
    case 'PARSE': return { ...state, status: 'ready', messages: action.messages, index: 0, error: '' };
    case 'ERROR': return { ...initial, status: 'error', error: action.error };
    case 'RESET': return initial;
    case 'NEXT': return { ...state, index: Math.min(state.index + 1, action.max - 1) };
    case 'PREV': return { ...state, index: Math.max(0, state.index - 1) };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const stats = useMemo(() => computeStats(state.messages), [state.messages]);

  async function handleFile(file) {
    if (!file || !/\.txt$/i.test(file.name)) {
      dispatch({ type: 'ERROR', error: 'Please choose a WhatsApp .txt export.' });
      return;
    }
    dispatch({ type: 'PARSE_START' });
    try {
      const text = await file.text();
      const messages = parseChat(text);
      if (!messages.length) throw new Error('No chat messages were recognised. Check the export format.');
      dispatch({ type: 'PARSE', messages });
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message || 'Could not parse this file.' });
    }
  }

  if (state.status === 'error') return <ErrorPanel error={state.error} onReset={() => dispatch({ type: 'RESET' })} />;
  if (state.status === 'parsing') return <main className="drop"><section className="drop-card"><div className="spinner" aria-hidden="true" /><h1>Reading your chat…</h1><p>Your file stays in this browser.</p></section></main>;
  if (state.status !== 'ready') return <DropZone onFile={handleFile} />;
  return <Deck stats={stats} index={state.index} onPrev={() => dispatch({ type: 'PREV' })} onNext={(max) => dispatch({ type: 'NEXT', max })} />;
}
