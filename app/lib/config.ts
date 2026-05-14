/**
 * Loads, validates, and exposes the Leertuin config.
 *
 * Import from this module (not directly from leertuin.config.ts)
 * so you get the validated config + helper functions.
 *
 * If the config is inconsistent the validator throws at module-load,
 * which fails the build with a clear message.
 */

import rawConfig from '../leertuin.config';
import {
  PALETTE_COLORS,
  SECTION_KEYS,
  type LeertuinConfig,
  type DomainDef,
  type SectionDef,
  type SectionKey,
  type PaletteColor,
} from './config-types';

function validate(cfg: LeertuinConfig): void {
  const errors: string[] = [];

  // Languages
  if (!cfg.languages.primary) errors.push('languages.primary is required');
  if (cfg.languages.secondary === cfg.languages.primary) {
    errors.push('languages.secondary must differ from languages.primary');
  }
  const langs = [cfg.languages.primary, ...(cfg.languages.secondary ? [cfg.languages.secondary] : [])];

  // UI strings present for all configured languages
  for (const lang of langs) {
    if (!cfg.ui[lang]) errors.push(`ui.${lang} is missing`);
  }

  // Domains
  if (cfg.domains.length === 0) errors.push('domains must contain at least one entry');
  const domainKeys = new Set<string>();
  for (const d of cfg.domains) {
    if (domainKeys.has(d.key)) errors.push(`duplicate domain key: ${d.key}`);
    domainKeys.add(d.key);
    if (!PALETTE_COLORS.includes(d.color)) {
      errors.push(`domain "${d.key}": invalid color "${d.color}"`);
    }
    for (const lang of langs) {
      if (!d.label[lang]) errors.push(`domain "${d.key}": missing label for "${lang}"`);
    }
  }

  // Schedule: each entry must be a known domain key or 'random'
  for (const day of [0, 1, 2, 3, 4, 5, 6] as const) {
    const entry = cfg.schedule[day];
    if (entry !== 'random' && !domainKeys.has(entry)) {
      errors.push(`schedule[${day}] = "${entry}" is not a known domain key (use 'random' or one of: ${[...domainKeys].join(', ')})`);
    }
  }

  // Sections: all 5 keys present exactly once
  const seenSectionKeys = new Set<SectionKey>();
  for (const s of cfg.sections) {
    if (seenSectionKeys.has(s.key)) errors.push(`duplicate section key: ${s.key}`);
    seenSectionKeys.add(s.key);
    if (!SECTION_KEYS.includes(s.key)) {
      errors.push(`section "${s.key}": not a valid section key (must be one of ${SECTION_KEYS.join(', ')})`);
    }
    for (const lang of langs) {
      if (!s.heading[lang]) errors.push(`section "${s.key}": missing heading for "${lang}"`);
      if (!s.uiLabel[lang]) errors.push(`section "${s.key}": missing uiLabel for "${lang}"`);
    }
  }
  for (const k of SECTION_KEYS) {
    if (!seenSectionKeys.has(k)) errors.push(`sections is missing required key: ${k}`);
  }

  if (errors.length > 0) {
    throw new Error(`leertuin.config.ts is invalid:\n  - ${errors.join('\n  - ')}`);
  }
}

validate(rawConfig);

export const config: LeertuinConfig = rawConfig;

// ─── Helpers ──────────────────────────────────────────────────

export type LangCode = string;

export function allLanguages(): LangCode[] {
  return config.languages.secondary
    ? [config.languages.primary, config.languages.secondary]
    : [config.languages.primary];
}

export function getDomain(key: string): DomainDef | undefined {
  return config.domains.find((d) => d.key === key);
}

export function getSection(key: SectionKey): SectionDef {
  // Validated to exist
  return config.sections.find((s) => s.key === key)!;
}

export function getDomainKeys(): string[] {
  return config.domains.map((d) => d.key);
}

/** Returns today's domain key, or 'random' for a surprise. */
export function getDomeinForDay(date: Date): string {
  return config.schedule[date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6];
}

/** Tailwind utility class strings for a given palette color.
 *  Kept centralised so the safelist matches. */
export interface DomainTwClasses {
  badge: string;
  callout: string;
  border: string;
  card: string;
}

export function tailwindClassesFor(color: PaletteColor): DomainTwClasses {
  return {
    badge: `bg-${color}-100 text-${color}-900 dark:bg-${color}-900/25 dark:text-${color}-300`,
    callout: `bg-${color}-50 dark:bg-${color}-950/40`,
    border: `border-${color}-300 dark:border-${color}-700`,
    card: `border-${color}-200 dark:border-${color}-900/60 hover:border-${color}-400 dark:hover:border-${color}-700`,
  };
}
