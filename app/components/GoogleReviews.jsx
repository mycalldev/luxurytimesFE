'use client';

import { useEffect, useRef } from 'react';
import styles from './GoogleReviews.module.css';

export default function GoogleReviews() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
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
    <section className={styles.section} ref={containerRef}>
      <div
        className={`elfsight-app-4f73375a-e589-435a-a794-4600de891411 ${styles.widgetPlaceholder}`}
        data-elfsight-app-lazy
      />
    </section>
  );
}
