import { readFileSync } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Concept } from '@/lib/types';
import ConceptDisplay from '@/components/ConceptDisplay';

function loadConcepts(): Concept[] {
  try {
    const raw = readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8');
    return JSON.parse(raw) as Concept[];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  return loadConcepts().map((c) => ({ slug: c.slug }));
}

export default async function ConceptPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const all = loadConcepts();
  const concept = all.find((c) => c.slug === slug);

  if (!concept) notFound();

  return (
    <ConceptDisplay concept={concept} allConcepts={all} isDetail />
  );
}
