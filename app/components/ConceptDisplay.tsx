import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { slugify, getDomeinConfig } from '@/lib/utils';
import TodayDate from './TodayDate';

// ── UI strings per language ──────────────────────────────────────────────────
const UI = {
  nl: {
    kern: 'Kern',
    waarom: 'Waarom het ertoe doet',
    openVragen: 'Open vragen',
    verderLezen: 'Verder lezen',
    gerelateerd: 'Gerelateerd',
    toonAnder: 'Toon ander concept',
    toonAnderDisabled: 'Geen andere concepten in dit domein',
    verkenAlle: 'Verken alle concepten →',
    alleConcepten: '← Alle concepten',
    vandaag: 'Vandaag →',
    verken: '← Verken',
    domein: {
      filosofie: 'Filosofie',
      kosmologie: 'Kosmologie',
      natuur: 'Natuur',
      overige: 'Overige',
    },
  },
  en: {
    kern: 'Core idea',
    waarom: 'Why it matters',
    openVragen: 'Open questions',
    verderLezen: 'Further reading',
    gerelateerd: 'Related',
    toonAnder: 'Show another concept',
    toonAnderDisabled: 'No other concepts in this domain',
    verkenAlle: 'Explore all concepts →',
    alleConcepten: '← All concepts',
    vandaag: 'Today →',
    verken: '← Explore',
    domein: {
      filosofie: 'Philosophy',
      kosmologie: 'Cosmology',
      natuur: 'Nature',
      overige: 'Other',
    },
  },
} as const;

// ── Props ────────────────────────────────────────────────────────────────────
interface Props {
  concept: Concept;
  /** Full concept list — used to decide which gerelateerd items are linkable. */
  allConcepts: Concept[];
  /** Show a back-link and omit the "Toon ander concept" button. */
  isDetail?: boolean;
  onOther?: () => void;
  /** When true the button renders but is disabled (only one concept in domain). */
  otherDisabled?: boolean;
  lang?: 'nl' | 'en';
  /** href to the equivalent page in the other language (shows a language toggle). */
  langHref?: string;
}

export default function ConceptDisplay({
  concept,
  allConcepts,
  isDetail,
  onOther,
  otherDisabled,
  lang = 'nl',
  langHref,
}: Props) {
  const L = UI[lang];
  const base = lang === 'en' ? '/en' : '';
  const cfg = getDomeinConfig(concept.domein);
  const domainLabel = L.domein[concept.domein as keyof typeof L.domein] ?? cfg.label;
  const knownSlugs = new Set(allConcepts.map((c) => c.slug));

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
            Leertuin
          </Link>
          <div className="flex items-center gap-4">
            {isDetail && (
              <>
                <Link
                  href={`${base}/explore`}
                  className="text-sm opacity-40 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {L.alleConcepten}
                </Link>
                <Link
                  href={base + '/'}
                  className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {L.vandaag}
                </Link>
              </>
            )}
            {langHref && (
              <Link
                href={langHref}
                className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {lang === 'en' ? 'NL' : 'EN'}
              </Link>
            )}
          </div>
        </header>

        {/* ── Date (home only) ── */}
        {!isDetail && <TodayDate lang={lang} />}

        {/* ── Domain badge ── */}
        <div className="mb-4">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${cfg.badge}`}
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {domainLabel}
          </span>
        </div>

        {/* ── Title ── */}
        <h1 className="text-4xl font-semibold leading-tight mb-8 tracking-tight">
          {concept.titel}
        </h1>

        {/* ── Kern callout ── */}
        {concept.kern && (
          <div className={`rounded-lg border-l-4 p-5 mb-8 ${cfg.callout} ${cfg.border}`}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.kern}
            </p>
            <div
              className="prose text-[1rem] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: concept.kern }}
            />
          </div>
        )}

        {/* ── Uitleg ── */}
        {concept.uitleg && (
          <section className="mb-8">
            <div className="prose" dangerouslySetInnerHTML={{ __html: concept.uitleg }} />
          </section>
        )}

        {/* ── Waarom het ertoe doet ── */}
        {concept.waarom && (
          <section className="mb-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.waarom}
            </h2>
            <div
              className="prose opacity-80"
              dangerouslySetInnerHTML={{ __html: concept.waarom }}
            />
          </section>
        )}

        {/* ── Open vragen ── */}
        {concept.openVragen && (
          <section className="mb-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.openVragen}
            </h2>
            <div
              className="prose opacity-80"
              dangerouslySetInnerHTML={{ __html: concept.openVragen }}
            />
          </section>
        )}

        {/* ── Verder lezen ── */}
        {concept.verder_lezen && (
          <section className="mb-8">
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.verderLezen}
            </h2>
            <div
              className="prose prose-verder-lezen text-sm opacity-70"
              dangerouslySetInnerHTML={{ __html: concept.verder_lezen }}
            />
          </section>
        )}

        {/* ── Gerelateerd ── */}
        {concept.gerelateerd.length > 0 && (
          <section className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-40"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.gerelateerd}
            </p>
            <div className="flex flex-wrap gap-2">
              {concept.gerelateerd.map((name) => {
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

        {/* ── Tags ── */}
        {concept.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {concept.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs opacity-40"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer (home only) ── */}
        {!isDetail && (
          <div
            className="pt-6 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              onClick={otherDisabled ? undefined : onOther}
              disabled={otherDisabled}
              title={otherDisabled ? L.toonAnderDisabled : undefined}
              className={[
                'rounded-full border px-4 py-2 text-sm transition-opacity',
                otherDisabled ? 'cursor-not-allowed opacity-25' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
              style={{ borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}
            >
              {L.toonAnder}
            </button>
            <Link
              href={`${base}/explore`}
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.verkenAlle}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
