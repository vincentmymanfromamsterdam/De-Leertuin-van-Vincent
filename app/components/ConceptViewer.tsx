'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Concept } from '@/lib/types';
import { getDomeinForDay, config } from '@/lib/utils';
import ConceptDisplay from './ConceptDisplay';

const LS_KEY = (slug: string) => `leertuin_last_shown_${slug}`;
const today = () => new Date().toISOString().split('T')[0];

function getLastShown(slug: string, fallback: string | null): string | null {
  if (typeof window === 'undefined') return fallback;
  return localStorage.getItem(LS_KEY(slug)) ?? fallback;
}

function pickOldest(pool: Concept[]): Concept {
  return [...pool].sort((a, b) => {
    const da = getLastShown(a.slug, a.last_shown);
    const db = getLastShown(b.slug, b.last_shown);
    if (!da && !db) return 0;
    if (!da) return -1;
    if (!db) return 1;
    return da < db ? -1 : 1;
  })[0];
}

interface Props {
  concepts: Concept[];
  lang?: string;
  /** href to the equivalent home page in the other language */
  langHref?: string;
}

export default function ConceptViewer({ concepts, lang = config.languages.primary, langHref }: Props) {
  const [concept, setConcept] = useState<Concept | null>(null);
  const router = useRouter();
  const isSecondary = lang !== config.languages.primary;
  const base = isSecondary ? `/${lang}` : '';

  useEffect(() => {
    if (concepts.length === 0) return;

    const domein = getDomeinForDay(new Date());
    const pool =
      domein === 'random' ? concepts : concepts.filter((c) => c.domein === domein);
    const eligible = pool.length > 0 ? pool : concepts;
    const picked = pickOldest(eligible);

    setConcept(picked);
    localStorage.setItem(LS_KEY(picked.slug), today());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleOther() {
    if (!concept) return;
    const pool = concepts.filter(
      (c) => c.domein === concept.domein && c.slug !== concept.slug,
    );
    if (pool.length === 0) return;
    const next = pool[Math.floor(Math.random() * pool.length)];
    localStorage.setItem(LS_KEY(next.slug), today());
    router.push(`${base}/concept/${next.slug}`);
  }

  if (concepts.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'system-ui, sans-serif' }}
      >
        <p className="opacity-40 text-sm">
          {isSecondary
            ? 'Vault not built. Run '
            : 'Vault niet gebuild. Voer '}
          <code className="font-mono">npm run predev</code>
          {isSecondary ? '.' : ' uit.'}
        </p>
      </div>
    );
  }

  if (!concept) {
    return <div className="min-h-screen" style={{ background: 'var(--bg)' }} />;
  }

  const hasOthers =
    concepts.filter((c) => c.domein === concept.domein && c.slug !== concept.slug).length > 0;

  return (
    <ConceptDisplay
      concept={concept}
      allConcepts={concepts}
      onOther={handleOther}
      otherDisabled={!hasOthers}
      lang={lang}
      langHref={langHref}
    />
  );
}
