'use client';

import { useState, useEffect } from 'react';

export default function TodayDate({ lang = 'nl' }: { lang?: 'nl' | 'en' }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const locale = lang === 'en' ? 'en-GB' : 'nl-NL';
    const raw = new Date().toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setLabel(raw.charAt(0).toUpperCase() + raw.slice(1));
  }, [lang]);

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
