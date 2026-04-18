import { readFileSync } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { DOMEIN_CONFIG, OVERIGE_CONFIG } from '@/lib/utils';
import type { DomeinAll } from '@/lib/utils';

const KNOWN_DOMEINEN = ['filosofie', 'kosmologie', 'natuur'] as const;

const DOMAIN_ORDER: DomeinAll[] = ['filosofie', 'kosmologie', 'natuur', 'overige'];

function loadConcepts(): Concept[] {
  try {
    const raw = readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8');
    return JSON.parse(raw) as Concept[];
  } catch {
    return [];
  }
}

function countForDomain(concepts: Concept[], domein: DomeinAll): number {
  if (domein === 'overige') {
    return concepts.filter((c) => !(KNOWN_DOMEINEN as readonly string[]).includes(c.domein)).length;
  }
  return concepts.filter((c) => c.domein === domein).length;
}

function getConfig(domein: DomeinAll) {
  return domein === 'overige' ? OVERIGE_CONFIG : DOMEIN_CONFIG[domein];
}

export default function ExplorePage() {
  const concepts = loadConcepts();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">

        {/* ── Header ── */}
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Leertuin
          </Link>
          <Link
            href="/"
            className="text-sm opacity-40 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ← Concept van de dag
          </Link>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">
          Verken de Leertuin
        </h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {concepts.length} {concepts.length === 1 ? 'concept' : 'concepten'} totaal
        </p>

        {/* ── Domain grid (2×2 on mobile, 4-col on wide) ── */}
        <div className="grid grid-cols-2 gap-4">
          {DOMAIN_ORDER.map((domein) => {
            const cfg = getConfig(domein);
            const count = countForDomain(concepts, domein);
            return (
              <Link
                key={domein}
                href={`/explore/${domein}`}
                className={[
                  'block rounded-xl border p-5 transition-all',
                  cfg.card,
                ].join(' ')}
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide uppercase mb-4 ${cfg.badge}`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {cfg.label}
                </span>
                <p className="text-3xl font-semibold leading-none mb-1">{count}</p>
                <p
                  className="text-xs opacity-40"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {count === 1 ? 'concept' : 'concepten'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
