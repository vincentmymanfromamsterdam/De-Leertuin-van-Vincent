import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { config, getDomain, tailwindClassesFor } from '@/lib/config';
import type { SectionKey } from '@/lib/config-types';
import TodayDate from './TodayDate';

// Map SectionKey to the JSON field name where its HTML lives.
const FIELD_NAME: Record<SectionKey, keyof Concept> = {
  kern: 'kern',
  uitleg: 'uitleg',
  waarom: 'waarom',
  openVragen: 'openVragen',
  verderLezen: 'verder_lezen',
};

interface Props {
  concept: Concept;
  /** Full concept list — used to decide which gerelateerd items are linkable. */
  allConcepts: Concept[];
  /** Show a back-link and omit the "show another" button. */
  isDetail?: boolean;
  onOther?: () => void;
  /** When true the button renders but is disabled (only one concept in domain). */
  otherDisabled?: boolean;
  lang?: string;
  /** href to the equivalent page in the other language (shows a language toggle). */
  langHref?: string;
}

export default function ConceptDisplay({
  concept,
  allConcepts,
  isDetail,
  onOther,
  otherDisabled,
  lang = config.languages.primary,
  langHref,
}: Props) {
  const L = config.ui[lang] ?? config.ui[config.languages.primary];
  const isSecondary = lang !== config.languages.primary;
  const base = isSecondary ? `/${lang}` : '';

  const domain = getDomain(concept.domein);
  const cfg = domain ? tailwindClassesFor(domain.color) : null;
  const domainLabel = domain?.label[lang] ?? domain?.label[config.languages.primary] ?? concept.domein;

  const knownSlugs = new Set(allConcepts.map((c) => c.slug));

  // Pre-compute the section blocks we want to render in order.
  const sections = config.sections.map((s) => {
    const field = FIELD_NAME[s.key];
    const html = (concept[field] as string) ?? '';
    const label = s.uiLabel[lang] ?? s.uiLabel[config.languages.primary];
    return { ...s, html, label };
  });

  const kernSection = sections.find((s) => s.key === 'kern');
  const otherSections = sections.filter((s) => s.key !== 'kern');

  const otherLang = isSecondary
    ? config.languages.primary
    : config.languages.secondary;

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
            {isDetail && (
              <>
                <Link
                  href={`${base}/explore`}
                  className="text-sm opacity-40 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {L.backToAll}
                </Link>
                <Link
                  href={base + '/'}
                  className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {L.today}
                </Link>
              </>
            )}
            {!isDetail && config.essaysEnabled && (
              <Link
                href={`${base}/essays`}
                className="text-sm opacity-40 hover:opacity-100 transition-opacity"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {L.essays}
              </Link>
            )}
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

        {/* ── Date (home only) ── */}
        {!isDetail && <TodayDate lang={lang} />}

        {/* ── Domain badge ── */}
        {cfg && (
          <div className="mb-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${cfg.badge}`}
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {domainLabel}
            </span>
          </div>
        )}

        {/* ── Title ── */}
        <h1 className="text-4xl font-semibold leading-tight mb-8 tracking-tight">
          {concept.titel}
        </h1>

        {/* ── Kern callout ── */}
        {kernSection && kernSection.html && cfg && (
          <div className={`rounded-lg border-l-4 p-5 mb-8 ${cfg.callout} ${cfg.border}`}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {kernSection.label}
            </p>
            <div
              className="prose text-[1rem] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: kernSection.html }}
            />
          </div>
        )}

        {/* ── Other sections in config order ── */}
        {otherSections.map((s) => {
          if (!s.html) return null;
          if (s.key === 'uitleg') {
            return (
              <section key={s.key} className="mb-8">
                <div className="prose" dangerouslySetInnerHTML={{ __html: s.html }} />
              </section>
            );
          }
          const proseClass = s.style === 'links' ? 'prose prose-verder-lezen text-sm opacity-70' : 'prose opacity-80';
          return (
            <section key={s.key} className="mb-8">
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-50"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {s.label}
              </h2>
              <div className={proseClass} dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          );
        })}

        {/* ── Gerelateerd ── */}
        {concept.gerelateerd.length > 0 && (
          <section className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-40"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.related}
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
              title={otherDisabled ? L.noOthers : undefined}
              className={[
                'rounded-full border px-4 py-2 text-sm transition-opacity',
                otherDisabled ? 'cursor-not-allowed opacity-25' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
              style={{ borderColor: 'var(--border)', fontFamily: 'system-ui, sans-serif' }}
            >
              {L.showAnother}
            </button>
            <Link
              href={`${base}/explore`}
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {L.exploreAll}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
