import { notFound } from 'next/navigation';
import { loadConcepts, loadEssays } from '@/lib/load-concepts';
import EssayDisplay from '@/components/EssayDisplay';
import { config } from '@/lib/config';

export function generateStaticParams() {
  if (!config.essaysEnabled) return [];
  return loadEssays(config.languages.primary).map((e) => ({ slug: e.slug }));
}

export default async function EssayPage(props: {
  params: Promise<{ slug: string }>;
}) {
  if (!config.essaysEnabled) notFound();
  const { slug } = await props.params;
  const lang = config.languages.primary;
  const essay = loadEssays(lang).find((e) => e.slug === slug);
  if (!essay) notFound();

  const concepts = loadConcepts(lang);
  const langHref = config.languages.secondary
    ? `/${config.languages.secondary}/essay/${slug}`
    : undefined;

  return <EssayDisplay essay={essay} concepts={concepts} lang={lang} langHref={langHref} />;
}
