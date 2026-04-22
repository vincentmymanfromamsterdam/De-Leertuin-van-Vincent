import { readFileSync } from 'fs';
import path from 'path';
import type { Concept } from './types';

export function loadConcepts(lang: 'nl' | 'en' = 'nl'): Concept[] {
  const file = lang === 'en' ? 'data/concepts.en.json' : 'data/concepts.json';
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), file), 'utf-8')) as Concept[];
  } catch {
    return [];
  }
}
