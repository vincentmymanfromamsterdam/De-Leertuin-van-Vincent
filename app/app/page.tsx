import { loadConcepts } from '@/lib/load-concepts';
import ConceptViewer from '@/components/ConceptViewer';
import { config } from '@/lib/config';

export default function Home() {
  const lang = config.languages.primary;
  const concepts = loadConcepts(lang);
  const langHref = config.languages.secondary ? `/${config.languages.secondary}` : undefined;
  return <ConceptViewer concepts={concepts} lang={lang} langHref={langHref} />;
}
