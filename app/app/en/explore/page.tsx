import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { config, tailwindClassesFor } from '@/lib/config';
import { loadConcepts, loadEssays } from '@/lib/load-concepts';
import EssayList from '@/components/EssayList';

export default function SecondaryExplorePage() {
  const secondary = config.languages.secondary;
  if (!secondary) notFound();

  const lang = secondary;
  const L = config.ui[lang];
  const concepts = loadConcepts(lang);
  const essays = config.essaysEnabled ? loadEssays(lang) : [];
  const base = `/${lang}`;
  const primary = config.languages.primary;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">

        <header className="mb-10 flex items-center justify-between">
          <Link
            href={`${base}/`}
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {config.brand.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`${base}/`}
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.exploreBackToToday}
            </Link>
            <Link
              href="/explore"
              className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {primary.toUpperCase()}
            </Link>
          </div>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">{L.exploreTitle}</h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {concepts.length} {concepts.length === 1 ? L.conceptSingular : L.conceptPlural} {L.total}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {config.domains.map((d) => {
            const cfg = tailwindClassesFor(d.color);
            const count = concepts.filter((c: Concept) => c.domein === d.key).length;
            return (
              <Link
                key={d.key}
                href={`${base}/explore/${d.key}`}
                className={['block rounded-xl border p-5 transition-all', cfg.card].join(' ')}
                style={{ background: 'var(--bg)' }}
              >
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide uppercase mb-4 ${cfg.badge}`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {d.label[lang] ?? d.label[primary]}
                </span>
                <p className="text-3xl font-semibold leading-none mb-1">{count}</p>
                <p className="text-xs opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {count === 1 ? L.conceptSingular : L.conceptPlural}
                </p>
              </Link>
            );
          })}
        </div>

        {config.essaysEnabled && (
          <section
            className="mt-16 pt-10 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="text-2xl font-semibold mb-2 tracking-tight">{L.essaysTitle}</h2>
            <p
              className="text-sm mb-6 opacity-40"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essaysIntro}
            </p>
            <EssayList essays={essays} lang={lang} base={base} />
          </section>
        )}
      </div>
    </div>
  );
}
