import { notFound } from 'next/navigation';
import { loadConcepts } from '@/lib/load-concepts';
import ConceptDisplay from '@/components/ConceptDisplay';
import { config } from '@/lib/config';

export function generateStaticParams() {
  return loadConcepts(config.languages.primary).map((c) => ({ slug: c.slug }));
}

export default async function ConceptPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const lang = config.languages.primary;
  const all = loadConcepts(lang);
  const concept = all.find((c) => c.slug === slug);

  if (!concept) notFound();

  const langHref = config.languages.secondary
    ? `/${config.languages.secondary}/concept/${slug}`
    : undefined;

  return (
    <ConceptDisplay
      concept={concept}
      allConcepts={all}
      isDetail
      lang={lang}
      langHref={langHref}
    />
  );
}
