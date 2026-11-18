/**
 * Small utilities shared across the app.
 *
 * Domain configuration and the day-of-week schedule now live in
 * leertuin.config.ts. This module just re-exports the helpers
 * and provides slugify().
 */

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Slug with runs of hyphens collapsed, so "a - b" and "a: b" compare equal. */
function looseKey(slug: string): string {
  return slug.replace(/-+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Returns a function that maps a wikilink name to the slug of an existing
 * concept, or undefined when there is none. Tries the exact slug first, then
 * a tolerant match on title or file name that ignores punctuation differences
 * (":" vs " - ", commas) and a leading "NN-" prefix.
 * A tolerant match is only used when it points to exactly one concept.
 */
export function makeSlugResolver(
  items: Iterable<{ slug: string; bestand?: unknown }>,
): (name: string) => string | undefined {
  const exact = new Set<string>();
  const loose = new Map<string, string | null>();
  const add = (key: string, slug: string) => {
    loose.set(key, loose.has(key) && loose.get(key) !== slug ? null : slug);
  };
  for (const item of items) {
    exact.add(item.slug);
    add(looseKey(item.slug), item.slug);
    // Wikilinks point at file names, which can differ from the note's title.
    if (typeof item.bestand === 'string') add(looseKey(slugify(item.bestand)), item.slug);
  }
  return (name: string) => {
    const slug = slugify(name);
    if (exact.has(slug)) return slug;
    const k = looseKey(slug);
    const hit = loose.get(k) ?? loose.get(k.replace(/^\d+-/, ''));
    return hit ?? undefined;
  };
}

export {
  getDomain,
  getDomainKeys,
  getDomeinForDay,
  tailwindClassesFor,
  allLanguages,
  config,
} from './config';

export type { DomainTwClasses } from './config';
