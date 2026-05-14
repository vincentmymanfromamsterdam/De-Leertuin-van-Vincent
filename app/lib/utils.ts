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

export {
  getDomain,
  getDomainKeys,
  getDomeinForDay,
  tailwindClassesFor,
  allLanguages,
  config,
} from './config';

export type { DomainTwClasses } from './config';
