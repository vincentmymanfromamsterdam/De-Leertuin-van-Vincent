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
    6: 'fysica',
    0: 'random',
  };
  return schedule[date.getDay()];
}

export type DomeinAll = Domein | 'overige';

export interface DomeinConfig {
  label: string;
  badge: string;
  callout: string;
  border: string;
  /** Card border/hover used on the /explore grid. */
  card: string;
}

export const DOMEIN_CONFIG: Record<Domein, DomeinConfig> = {
  filosofie: {
    label: 'Filosofie',
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-900/25 dark:text-amber-300',
    callout: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-300 dark:border-amber-700',
    card: 'border-amber-200 dark:border-amber-900/60 hover:border-amber-400 dark:hover:border-amber-700',
  },
  kosmologie: {
    label: 'Kosmologie',
    badge: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/25 dark:text-indigo-300',
    callout: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-300 dark:border-indigo-700',
    card: 'border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-400 dark:hover:border-indigo-700',
  },
  natuur: {
    label: 'Natuur',
    badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/25 dark:text-emerald-300',
    callout: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-300 dark:border-emerald-700',
    card: 'border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-700',
  },
  fysica: {
    label: 'Fysica',
    badge: 'bg-violet-100 text-violet-900 dark:bg-violet-900/25 dark:text-violet-300',
    callout: 'bg-violet-50 dark:bg-violet-950/40',
    border: 'border-violet-300 dark:border-violet-700',
    card: 'border-violet-200 dark:border-violet-900/60 hover:border-violet-400 dark:hover:border-violet-700',
  },
};

export const OVERIGE_CONFIG: DomeinConfig = {
  label: 'Overige',
  badge: 'bg-slate-100 text-slate-900 dark:bg-slate-800/40 dark:text-slate-300',
  callout: 'bg-slate-50 dark:bg-slate-900/40',
  border: 'border-slate-300 dark:border-slate-600',
  card: 'border-slate-200 dark:border-slate-800/60 hover:border-slate-400 dark:hover:border-slate-600',
};

export function getDomeinConfig(d: DomeinAll): DomeinConfig {
  return d === 'overige' ? OVERIGE_CONFIG : DOMEIN_CONFIG[d];
}
