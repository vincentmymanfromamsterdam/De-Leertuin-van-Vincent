import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { DOMEIN_CONFIG, OVERIGE_CONFIG } from '@/lib/utils';
import type { DomeinAll } from '@/lib/utils';
import { loadConcepts } from '@/lib/load-concepts';

const KNOWN_DOMEINEN = ['filosofie', 'kosmologie', 'natuur', 'fysica'] as const;
const DOMAIN_ORDER: DomeinAll[] = ['filosofie', 'kosmologie', 'natuur', 'fysica', 'overige'];

const EN_LABEL: Record<DomeinAll, string> = {
  filosofie: 'Philosophy',
  kosmologie: 'Cosmology',
  natuur: 'Nature',
  fysica: 'Physics',
  overige: 'Other',
};

function countForDomain(concepts: Concept[], domein: DomeinAll): number {
  if (domein === 'overige') {
    return concepts.filter((c) => !(KNOWN_DOMEINEN as readonly string[]).includes(c.domein)).length;
  }
  return concepts.filter((c) => c.domein === domein).length;
}

function getConfig(domein: DomeinAll) {
  return domein === 'overige' ? OVERIGE_CONFIG : DOMEIN_CONFIG[domein];
}

export default function EnExplorePage() {
  const concepts = loadConcepts('en');

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">

        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/en"
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            Leertuin
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/en"
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              ← Concept of the day
            </Link>
            <Link
              href="/explore"
              className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              NL
            </Link>
          </div>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">
          Explore the Leertuin
        </h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {concepts.length} {concepts.length === 1 ? 'concept' : 'concepts'} total
        </p>

        <div className="grid grid-cols-2 gap-4">
          {DOMAIN_ORDER.map((domein) => {
            const cfg = getConfig(domein);
            const count = countForDomain(concepts, domein);
            return (
              <Link
                key={domein}
                href={`/en/explore/${domein}`}
                className={['block rounded-xl border p-5 transition-all', cfg.card].join(' ')}
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide uppercase mb-4 ${cfg.badge}`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {EN_LABEL[domein]}
                </span>
                <p className="text-3xl font-semibold leading-none mb-1">{count}</p>
                <p className="text-xs opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {count === 1 ? 'concept' : 'concepts'}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
