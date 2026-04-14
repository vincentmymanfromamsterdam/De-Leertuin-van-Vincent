import { readFileSync } from 'fs';
import path from 'path';
import type { Concept } from '@/lib/types';
import ConceptViewer from '@/components/ConceptViewer';

export default function Home() {
  let concepts: Concept[] = [];
  try {
    const raw = readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8');
    concepts = JSON.parse(raw) as Concept[];
  } catch {
    // data not yet built — ConceptViewer handles the empty state
  }

  return <ConceptViewer concepts={concepts} />;
}
