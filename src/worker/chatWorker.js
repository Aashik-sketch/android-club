import { parseChat } from '../../lib/parser.js';
import { computeStats } from '../../lib/stats.js';

self.onmessage = ({ data }) => {
  try {
    const messages = parseChat(data.text);
    if (!messages.length) throw new Error('No chat messages were recognised. Check the WhatsApp export format.');
    const stats = computeStats(messages);
    self.postMessage({ type: 'success', messages, stats });
  } catch (error) {
    self.postMessage({ type: 'error', error: error?.message || 'Worker could not process the chat.' });
  }
};
