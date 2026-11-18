import Link from 'next/link';
import { config } from '@/lib/config';
import { loadIdeas } from '@/lib/load-concepts';

/** List of notes that are linked to but not written yet. */
export default function IdeasPage({ lang }: { lang: string }) {
  const L = config.ui[lang] ?? config.ui[config.languages.primary];
  const isSecondary = lang !== config.languages.primary;
  const base = isSecondary ? `/${lang}` : '';
  const otherLang = isSecondary ? config.languages.primary : config.languages.secondary;
  const otherHref = isSecondary ? '/ideeen' : `/${config.languages.secondary}/ideeen`;
  const ideas = loadIdeas();
  const sans = { fontFamily: 'system-ui, sans-serif' };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">
        <header className="mb-10 flex items-center justify-between">
          <Link
            href={base + '/'}
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={sans}
          >
            {config.brand.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`${base}/explore`}
              className="text-sm opacity-40 hover:opacity-100 transition-opacity"
              style={sans}
            >
              {L.brandLink}
            </Link>
            {otherLang && (
              <Link
                href={otherHref}
                className="text-xs font-semibold opacity-30 hover:opacity-80 transition-opacity tracking-widest uppercase"
                style={sans}
              >
                {otherLang.toUpperCase()}
              </Link>
            )}
          </div>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">{L.ideasTitle}</h1>
        <p className="text-sm mb-10 opacity-40" style={sans}>
          {ideas.length > 0 ? L.ideasIntro : L.ideasEmpty}
        </p>

        <ul className="space-y-5">
          {ideas.map((idea) => (
            <li key={idea.naam} className="border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <p className="text-lg font-semibold leading-snug">{idea.naam}</p>
              <p className="text-sm mt-1 opacity-60" style={sans}>
                {L.ideasMentionedIn}:{' '}
                {idea.bronnen.map((b, i) => (
                  <span key={`${b.type}-${b.slug}`}>
                    {i > 0 && ', '}
                    <Link
                      href={`${base}/${b.type === 'essay' ? 'essay' : 'concept'}/${b.slug}`}
                      className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      {b.titel}
                    </Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
