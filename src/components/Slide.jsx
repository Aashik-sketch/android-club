import { useEffect, useRef } from 'react';
export default function Slide({ children }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, [children]);
  return <main ref={ref} className="slide" tabIndex="-1" aria-live="polite">{children}</main>;
}
