'use client';

import { useState, useEffect } from 'react';

export default function TodayDate() {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const raw = new Date().toLocaleDateString('nl-NL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    // Ensure capital first letter (some platforms return lowercase weekday)
    setLabel(raw.charAt(0).toUpperCase() + raw.slice(1));
  }, []);

  // Render nothing until hydrated — avoids SSR/client mismatch
  if (!label) return null;

  return (
    <p
      className="text-sm mb-5 opacity-40"
      style={{ fontFamily: 'system-ui, sans-serif' }}
    >
      {label}
    </p>
  );
}
