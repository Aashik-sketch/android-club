import { useEffect } from 'react';
export function useKeyPress(key, handler) { useEffect(() => { const fn = e => { if (e.key === key) handler(e); }; window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn); }, [key, handler]); }
