import { notFound } from 'next/navigation';
import { loadConcepts } from '@/lib/load-concepts';
import ConceptDisplay from '@/components/ConceptDisplay';
import { config } from '@/lib/config';

export function generateStaticParams() {
  if (!config.languages.secondary) return [];
  return loadConcepts(config.languages.secondary).map((c) => ({ slug: c.slug }));
}

export default async function SecondaryConceptPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const secondary = config.languages.secondary;
  if (!secondary) notFound();

  const all = loadConcepts(secondary);
  const concept = all.find((c) => c.slug === slug);

  if (!concept) notFound();

  return (
    <ConceptDisplay
      concept={concept}
      allConcepts={all}
      isDetail
      lang={secondary}
      langHref={`/concept/${slug}`}
    />
  );
}
