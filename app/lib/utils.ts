import type { Domein } from './types';

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Returns today's domain based on the day-of-week schedule, or 'random' on Sunday. */
export function getDomeinForDay(date: Date): Domein | 'random' {
  // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const schedule: Record<number, Domein | 'random'> = {
    1: 'filosofie',
    2: 'kosmologie',
    3: 'natuur',
    4: 'filosofie',
    5: 'kosmologie',
    6: 'natuur',
    0: 'random',
  };
  return schedule[date.getDay()];
}

export const DOMEIN_CONFIG: Record<
  Domein,
  { label: string; badge: string; callout: string; border: string }
> = {
  filosofie: {
    label: 'Filosofie',
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-900/25 dark:text-amber-300',
    callout: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-300 dark:border-amber-700',
  },
  kosmologie: {
    label: 'Kosmologie',
    badge: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/25 dark:text-indigo-300',
    callout: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-300 dark:border-indigo-700',
  },
  natuur: {
    label: 'Natuur',
    badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-300',
    callout: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
};
