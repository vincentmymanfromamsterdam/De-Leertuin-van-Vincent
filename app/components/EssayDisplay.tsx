import Link from 'next/link';
import type { Essay, Concept } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { config, getDomain, tailwindClassesFor } from '@/lib/config';

interface Props {
  essay: Essay;
  /** Concept list — used to decide which 'concepten' wikilinks are linkable. */
  concepts: Concept[];
  lang?: string;
  /** href to the equivalent page in the other language. */
  langHref?: string;
}

export default function EssayDisplay({
  essay,
  concepts,
  lang = config.languages.primary,
  langHref,
}: Props) {
  const L = config.ui[lang] ?? config.ui[config.languages.primary];
  const isSecondary = lang !== config.languages.primary;
  const base = isSecondary ? `/${lang}` : '';

  const otherLang = isSecondary ? config.languages.primary : config.languages.secondary;
  const knownSlugs = new Set(concepts.map((c) => c.slug));

  // Use the first domain's color for the callout/border accent
  const firstDomain = essay.domeinen.map(getDomain).find(Boolean);
  const accent = firstDomain ? tailwindClassesFor(firstDomain.color) : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">

        {/* ── Header ── */}
        <header className="mb-10 flex items-center justify-between">
          <Link
            href={base + '/'}
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {config.brand.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`${base}/essays`}
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essaysBackToAll}
            </Link>
            <Link
              href={base + '/'}
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.today}
            </Link>
            {langHref && otherLang && (
              <Link
                href={langHref}
                className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {otherLang.toUpperCase()}
              </Link>
            )}
          </div>
        </header>

        {/* ── Domain badges (one per linked domain) ── */}
        {essay.domeinen.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {essay.domeinen.map((key) => {
              const d = getDomain(key);
              if (!d) return null;
              const cls = tailwindClassesFor(d.color);
              return (
                <span
                  key={key}
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${cls.badge}`}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {d.label[lang] ?? d.label[config.languages.primary]}
                </span>
              );
            })}
          </div>
        )}

        {/* ── Title ── */}
        <h1 className="text-4xl font-semibold leading-tight mb-8 tracking-tight">
          {essay.titel}
        </h1>

        {/* ── Vraag / premisse (callout) ── */}
        {essay.vraag && accent && (
          <div className={`rounded-lg border-l-4 p-5 mb-8 ${accent.callout} ${accent.border}`}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essayQuestion}
            </p>
            <div
              className="prose text-[1rem] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: essay.vraag }}
            />
          </div>
        )}

        {/* ── Synthese (main body) ── */}
        {essay.synthese && (
          <section className="mb-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essaySynthesis}
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: essay.synthese }} />
          </section>
        )}

        {/* ── Wat ik hierdoor anders zie ── */}
        {essay.reflectie && (
          <section className="mb-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essayReflection}
            </h2>
            <div className="prose opacity-80" dangerouslySetInnerHTML={{ __html: essay.reflectie }} />
          </section>
        )}

        {/* ── Concepten die hier samenkomen ── */}
        {essay.concepten.length > 0 && (
          <section className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-40"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.essayConcepts}
            </p>
            <div className="flex flex-wrap gap-2">
              {essay.concepten.map((name) => {
                const slug = slugify(name);
                const linked = knownSlugs.has(slug);
                const cls =
                  'rounded-full px-3 py-1 text-sm border transition-opacity hover:opacity-100 opacity-70';
                return linked ? (
                  <Link
                    key={name}
                    href={`${base}/concept/${slug}`}
                    className={`${cls} hover:underline`}
                    style={{ borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}
                  >
                    {name}
                  </Link>
                ) : (
                  <span
                    key={name}
                    className={cls}
                    style={{ borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
