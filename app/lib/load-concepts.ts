import { readFileSync } from 'fs';
import path from 'path';
import type { Concept, Essay } from './types';
import { config } from './config';

const CONCEPT_FIELDS = ['titel', 'kern', 'uitleg', 'waarom', 'openVragen', 'verder_lezen'] as const;
const ESSAY_FIELDS = ['titel', 'vraag', 'synthese', 'reflectie', 'verderLezen', 'concepten'] as const;

function promoteSecondary<T extends Record<string, unknown>>(
  item: T,
  lang: string,
  fields: readonly string[],
): T {
  const out = { ...item };
  for (const f of fields) {
    const translated = item[`${f}_${lang}`];
    if (translated == null) continue;
    if (typeof translated === 'string' && translated.length > 0) {
      (out as Record<string, unknown>)[f] = translated;
    } else if (Array.isArray(translated) && translated.length > 0) {
      (out as Record<string, unknown>)[f] = translated;
    }
  }
  return out;
}

/**
 * Loads concepts and, when a non-primary language is requested,
 * promotes that language's _<lang> fields onto the primary ones.
 */
export function loadConcepts(lang: string = config.languages.primary): Concept[] {
  try {
    const concepts = JSON.parse(
      readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8'),
    ) as Concept[];
    if (lang === config.languages.primary) return concepts;
    return concepts.map((c) => promoteSecondary(c, lang, CONCEPT_FIELDS));
  } catch {
    return [];
  }
}

/** Same shape as loadConcepts but for essays. */
export function loadEssays(lang: string = config.languages.primary): Essay[] {
  try {
    const essays = JSON.parse(
      readFileSync(path.join(process.cwd(), 'data/essays.json'), 'utf-8'),
    ) as Essay[];
    if (lang === config.languages.primary) return essays;
    return essays.map((e) => promoteSecondary(e, lang, ESSAY_FIELDS));
  } catch {
    return [];
  }
}
