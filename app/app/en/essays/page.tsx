import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Essay } from '@/lib/types';
import { config, getDomain, tailwindClassesFor } from '@/lib/config';
import { loadEssays } from '@/lib/load-concepts';

function preview(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  const dot = text.search(/[.?!]\s/);
  const cut = dot > 40 ? text.slice(0, dot + 1) : text.slice(0, 200);
  return cut.length < text.length ? cut + '…' : cut;
}

export default function SecondaryEssaysIndexPage() {
  if (!config.essaysEnabled) notFound();
  const secondary = config.languages.secondary;
  if (!secondary) notFound();

  const lang = secondary;
  const L = config.ui[lang];
  const essays = loadEssays(lang);
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
              href="/essays"
              className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {primary.toUpperCase()}
            </Link>
          </div>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">{L.essaysTitle}</h1>
        <p className="text-sm mb-10 opacity-40" style={{ fontFamily: 'system-ui, sans-serif' }}>
          {L.essaysIntro}
        </p>

        {essays.length === 0 ? (
          <p className="opacity-40 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
            {L.essaysEmpty}
          </p>
        ) : (
          <ul>
            {essays.map((e: Essay) => (
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
                  {e.vraag && (
                    <p
                      className="text-sm leading-relaxed opacity-50 line-clamp-2"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {preview(e.vraag)}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
