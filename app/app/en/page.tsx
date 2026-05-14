import { notFound } from 'next/navigation';
import { loadConcepts } from '@/lib/load-concepts';
import ConceptViewer from '@/components/ConceptViewer';
import { config } from '@/lib/config';

export default function SecondaryHome() {
  const secondary = config.languages.secondary;
  if (!secondary) notFound();
  const concepts = loadConcepts(secondary);
  return <ConceptViewer concepts={concepts} lang={secondary} langHref="/" />;
}
