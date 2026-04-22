import { loadConcepts } from '@/lib/load-concepts';
import ConceptViewer from '@/components/ConceptViewer';

export default function EnHome() {
  const concepts = loadConcepts('en');
  return <ConceptViewer concepts={concepts} lang="en" langHref="/" />;
}
