import { readFileSync } from 'fs';
import path from 'path';
import type { Concept } from './types';
import { config } from './config';

/**
 * Loads concepts and, when a non-primary language is requested,
 * promotes that language's _<lang> fields onto the primary ones.
 *
 * Falls back to primary-language content per-field if the secondary
 * is missing.
 */
export function loadConcepts(lang: string = config.languages.primary): Concept[] {
  try {
    const concepts = JSON.parse(
      readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8'),
    ) as Concept[];
    if (lang === config.languages.primary) return concepts;

    const fields = ['titel', 'kern', 'uitleg', 'waarom', 'openVragen', 'verder_lezen'] as const;
    return concepts.map((c) => {
      const out = { ...c };
      for (const f of fields) {
        const translated = c[`${f}_${lang}`];
        if (typeof translated === 'string' && translated.length > 0) {
          (out as Record<string, unknown>)[f] = translated;
        }
      }
      return out;
    });
  } catch {
    return [];
  }
}
