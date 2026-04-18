import { readFileSync } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { DOMEIN_CONFIG, OVERIGE_CONFIG } from '@/lib/utils';
import type { DomeinAll } from '@/lib/utils';

const KNOWN_DOMEINEN = ['filosofie', 'kosmologie', 'natuur', 'overige'] as const;
const CORE_DOMEINEN = ['filosofie', 'kosmologie', 'natuur'] as const;

function loadConcepts(): Concept[] {
  try {
    const raw = readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8');
    return JSON.parse(raw) as Concept[];
  } catch {
    return [];
  }
}

function getConfig(domein: DomeinAll) {
  return domein === 'overige' ? OVERIGE_CONFIG : DOMEIN_CONFIG[domein];
}

function filterByDomain(concepts: Concept[], domein: DomeinAll): Concept[] {
  if (domein === 'overige') {
    return concepts.filter((c) => !(CORE_DOMEINEN as readonly string[]).includes(c.domein));
  }
  return concepts.filter((c) => c.domein === domein);
}

/** Strip HTML tags for a plain-text preview. */
function toPlainText(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

export async function generateStaticParams() {
  return KNOWN_DOMEINEN.map((d) => ({ domein: d }));
}

export default async function ExploreDomeinPage(props: {
  params: Promise<{ domein: string }>;
}) {
  const { domein } = await props.params;

  if (!(KNOWN_DOMEINEN as readonly string[]).includes(domein)) notFound();

  const d = domein as DomeinAll;
  const cfg = getConfig(d);
  const all = loadConcepts();
  const concepts = filterByDomain(all, d).sort((a, b) =>
    a.titel.localeCompare(b.titel, 'nl')
  );

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
            href="/explore"
            className="text-sm opacity-40 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            ← Verken
          </Link>
        </header>

        {/* ── Domain badge + title ── */}
        <div className="mb-3">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${cfg.badge}`}
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {cfg.label}
          </span>
        </div>
        <h1 className="text-3xl font-semibold mb-1 tracking-tight">{cfg.label}</h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {concepts.length} {concepts.length === 1 ? 'concept' : 'concepten'}
        </p>

        {/* ── Concept list ── */}
        {concepts.length === 0 ? (
          <p className="opacity-40 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Nog geen concepten in dit domein.
          </p>
        ) : (
          <ul>
            {concepts.map((concept) => {
              const preview = toPlainText(concept.kern);
              return (
                <li key={concept.slug} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <Link
                    href={`/concept/${concept.slug}`}
                    className="group block py-5 transition-opacity hover:opacity-100"
                  >
                    <h3 className="font-semibold text-lg leading-snug mb-1 group-hover:underline underline-offset-2">
                      {concept.titel}
                    </h3>
                    {preview && (
                      <p
                        className="text-sm leading-relaxed opacity-50 line-clamp-2"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        {preview}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
