import { notFound } from 'next/navigation';
import { loadConcepts, loadEssays } from '@/lib/load-concepts';
import EssayDisplay from '@/components/EssayDisplay';
import { config } from '@/lib/config';

export function generateStaticParams() {
  if (!config.essaysEnabled || !config.languages.secondary) return [];
  return loadEssays(config.languages.secondary).map((e) => ({ slug: e.slug }));
}

export default async function SecondaryEssayPage(props: {
  params: Promise<{ slug: string }>;
}) {
  if (!config.essaysEnabled) notFound();
  const secondary = config.languages.secondary;
  if (!secondary) notFound();
  const { slug } = await props.params;

  const essay = loadEssays(secondary).find((e) => e.slug === slug);
  if (!essay) notFound();

  const concepts = loadConcepts(secondary);

  return <EssayDisplay essay={essay} concepts={concepts} lang={secondary} langHref={`/essay/${slug}`} />;
}
