'use client';

import { useState, useEffect } from 'react';
import { config } from '@/lib/utils';

/** Maps a language code to a BCP-47 locale for date formatting. */
const LOCALE: Record<string, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT',
};

export default function TodayDate({ lang = config.languages.primary }: { lang?: string }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const locale = LOCALE[lang] ?? lang;
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
