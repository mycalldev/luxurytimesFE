'use client';

import { useEffect, useRef } from 'react';

// Loads the Elfsight reviews widget only when it scrolls near the viewport,
// rather than eagerly on window load. Keeps the heavy third-party script
// (its own framework + fonts) out of the initial load so it no longer drags
// down Total Blocking Time / Lighthouse. Mirrors the homepage GoogleReviews
// approach. Safe to render multiple times — the script is injected once.
export default function ProductReviews({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (document.querySelector('script[src*="elfsightcdn.com"]')) return;

        const script = document.createElement('script');
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.head.appendChild(script);
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className} ref={ref}>
      <div
        className="elfsight-app-3cdc3d51-1a1c-45ef-9439-764920914d6e"
        data-elfsight-app-lazy
      />
    </div>
  );
}
