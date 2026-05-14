import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Concept } from '@/lib/types';
import { config, getDomain, getDomainKeys, tailwindClassesFor } from '@/lib/config';
import { loadConcepts } from '@/lib/load-concepts';

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export function generateStaticParams() {
  if (!config.languages.secondary) return [];
  return getDomainKeys().map((d) => ({ domein: d }));
}

export default async function SecondaryExploreDomeinPage(props: {
  params: Promise<{ domein: string }>;
}) {
  const { domein } = await props.params;
  const secondary = config.languages.secondary;
  if (!secondary) notFound();

  const lang = secondary;
  const L = config.ui[lang];
  const domain = getDomain(domein);
  if (!domain) notFound();

  const cfg = tailwindClassesFor(domain.color);
  const label = domain.label[lang] ?? domain.label[config.languages.primary];
  const all = loadConcepts(lang);
  const concepts = all
    .filter((c) => c.domein === domein)
    .sort((a, b) => a.titel.localeCompare(b.titel, lang));
  const base = `/${lang}`;

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
          <Link
            href={`${base}/explore`}
            className="text-sm opacity-40 hover:opacity-100 transition-opacity"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {L.brandLink}
          </Link>
        </header>

        <div className="mb-3">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${cfg.badge}`}
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {label}
          </span>
        </div>
        <h1 className="text-3xl font-semibold mb-1 tracking-tight">{label}</h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {concepts.length} {concepts.length === 1 ? L.conceptSingular : L.conceptPlural}
        </p>

        {concepts.length === 0 ? (
          <p className="opacity-40 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {L.emptyDomain}
          </p>
        ) : (
          <ul>
            {concepts.map((concept: Concept) => {
              const preview = toPlainText(concept.kern);
              return (
                <li key={concept.slug} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <Link
                    href={`${base}/concept/${concept.slug}`}
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
