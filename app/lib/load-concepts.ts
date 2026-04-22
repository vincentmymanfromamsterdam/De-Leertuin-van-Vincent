import { readFileSync } from 'fs';
import path from 'path';
import type { Concept } from './types';

export function loadConcepts(lang: 'nl' | 'en' = 'nl'): Concept[] {
  try {
    const concepts = JSON.parse(
      readFileSync(path.join(process.cwd(), 'data/concepts.json'), 'utf-8'),
    ) as Concept[];
    if (lang === 'nl') return concepts;
    // For English: promote _en fields to primary fields when present
    return concepts.map((c) => ({
      ...c,
      titel: c.titel_en ?? c.titel,
      kern: c.kern_en ?? c.kern,
      uitleg: c.uitleg_en ?? c.uitleg,
      waarom: c.waarom_en ?? c.waarom,
      openVragen: c.openVragen_en ?? c.openVragen,
      verder_lezen: c.verder_lezen_en ?? c.verder_lezen,
    }));
  } catch {
    return [];
  }
}
