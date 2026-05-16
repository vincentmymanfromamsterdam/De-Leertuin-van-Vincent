import Link from 'next/link';
import type { Essay } from '@/lib/types';
import { config, getDomain, tailwindClassesFor } from '@/lib/config';

interface Props {
  essays: Essay[];
  lang: string;
  /** URL prefix: '' for primary language, '/<lang>' for secondary. */
  base: string;
}

const DATE_LOCALE: Record<string, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
  it: 'it-IT',
};

function formatDate(value: unknown, lang: string): string {
  if (!value) return '';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return '';
  const locale = DATE_LOCALE[lang] ?? lang;
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/** First sentence (or first 180 chars) of a plain-text excerpt. */
function previewFrom(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  const dot = text.search(/[.?!]\s/);
  const cut = dot > 40 ? text.slice(0, dot + 1) : text.slice(0, 180);
  return cut.length < text.length ? cut + '…' : cut;
}

export default function EssayList({ essays, lang, base }: Props) {
  const L = config.ui[lang] ?? config.ui[config.languages.primary];
  const primary = config.languages.primary;

  if (essays.length === 0) {
    return (
      <p className="opacity-40 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {L.essaysEmpty}
      </p>
    );
  }

  return (
    <ul>
      {essays.map((e) => (
        <li key={e.slug} className="border-b" style={{ borderColor: 'var(--border)' }}>
          <Link
            href={`${base}/essay/${e.slug}`}
            className="group block py-5 transition-opacity hover:opacity-100"
          >
            {e.domeinen.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {e.domeinen.map((key) => {
                  const d = getDomain(key);
                  if (!d) return null;
                  const cls = tailwindClassesFor(d.color);
                  return (
                    <span
                      key={key}
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${cls.badge}`}
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {d.label[lang] ?? d.label[primary]}
                    </span>
                  );
                })}
              </div>
            )}
            <h3 className="font-semibold text-lg leading-snug mb-1 group-hover:underline underline-offset-2">
              {e.titel}
            </h3>
            {typeof e.vraag === 'string' && e.vraag && (
              <p
                className="text-sm leading-relaxed opacity-50 line-clamp-2"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {previewFrom(e.vraag)}
              </p>
            )}
            {e.aangemaakt && (
              <p
                className="text-xs opacity-30 mt-2"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {formatDate(e.aangemaakt, lang)}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
