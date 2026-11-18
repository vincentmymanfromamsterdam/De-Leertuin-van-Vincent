import type { Metadata } from 'next';
import { loadConcepts, loadWords } from '@/lib/load-concepts';
import { config } from '@/lib/config';
import TaalTrainer from '@/components/TaalTrainer';

export const metadata: Metadata = { title: `Taal · ${config.brand.name}` };

export default function TaalPage() {
  const words = loadWords();
  const concepts = loadConcepts(config.languages.primary).map((c) => ({
    slug: c.slug,
    titel: c.titel,
    domein: c.domein,
    last_shown: c.last_shown ?? null,
  }));
  return <TaalTrainer words={words} concepts={concepts} brand={config.brand.name} />;
}
