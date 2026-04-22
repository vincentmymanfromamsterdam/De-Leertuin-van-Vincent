import { loadConcepts } from '@/lib/load-concepts';
import ConceptViewer from '@/components/ConceptViewer';

export default function Home() {
  const concepts = loadConcepts('nl');
  return <ConceptViewer concepts={concepts} lang="nl" langHref="/en" />;
}
