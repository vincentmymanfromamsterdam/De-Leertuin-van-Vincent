import { notFound } from 'next/navigation';
import { loadConcepts } from '@/lib/load-concepts';
import ConceptDisplay from '@/components/ConceptDisplay';

export async function generateStaticParams() {
  return loadConcepts('en').map((c) => ({ slug: c.slug }));
}

export default async function EnConceptPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const all = loadConcepts('en');
  const concept = all.find((c) => c.slug === slug);

  if (!concept) notFound();

  return (
    <ConceptDisplay
      concept={concept}
      allConcepts={all}
      isDetail
      lang="en"
      langHref={`/concept/${slug}`}
    />
  );
}
