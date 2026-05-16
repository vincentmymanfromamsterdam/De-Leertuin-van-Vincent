/**
 * Type definitions for leertuin.config.ts.
 *
 * Edit leertuin.config.ts (not this file) to customize your Leertuin.
 * This file only describes the shape — your editor uses it for
 * autocomplete and type-checking.
 */

/** The 12 available palette colors. */
export type PaletteColor =
  | 'amber'
  | 'indigo'
  | 'emerald'
  | 'violet'
  | 'rose'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'lime'
  | 'fuchsia'
  | 'orange'
  | 'slate';

export const PALETTE_COLORS: readonly PaletteColor[] = [
  'amber', 'indigo', 'emerald', 'violet', 'rose', 'teal',
  'cyan', 'sky', 'lime', 'fuchsia', 'orange', 'slate',
] as const;

/**
 * An object keyed by language code (e.g. 'nl', 'en').
 * The primary language is always required; if a secondary
 * language is configured, that key must also be present.
 */
export type LocalizedString = Record<string, string>;

export interface DomainDef {
  /** Internal id — matches the `domein` frontmatter value in notes. */
  key: string;
  /** Display label per language. */
  label: LocalizedString;
  /** One of the 12 palette colors. */
  color: PaletteColor;
}

/** Either a domain key from `domains`, or 'random' for surprise me. */
export type ScheduleEntry = string;

/**
 * Mapping of weekday → domain key (or 'random').
 * 0=Sunday, 1=Monday, ..., 6=Saturday.
 */
export interface ScheduleConfig {
  0: ScheduleEntry;
  1: ScheduleEntry;
  2: ScheduleEntry;
  3: ScheduleEntry;
  4: ScheduleEntry;
  5: ScheduleEntry;
  6: ScheduleEntry;
}

/** The five fixed section keys. Adopters can rename their headings/labels
 *  but not add new sections (a deliberate design choice for v1). */
export type SectionKey = 'kern' | 'uitleg' | 'waarom' | 'openVragen' | 'verderLezen';

export const SECTION_KEYS: readonly SectionKey[] = [
  'kern', 'uitleg', 'waarom', 'openVragen', 'verderLezen',
] as const;

export type SectionStyle = 'callout' | 'body' | 'links';

export interface SectionDef {
  key: SectionKey;
  /** The markdown ## heading the build script looks for, per language. */
  heading: LocalizedString;
  /** What the visitor sees as the section title, per language. */
  uiLabel: LocalizedString;
  style: SectionStyle;
}

export interface UiStrings {
  showAnother: string;
  noOthers: string;
  exploreAll: string;
  backToAll: string;
  today: string;
  related: string;
  exploreTitle: string;
  exploreBackToToday: string;
  conceptSingular: string;
  conceptPlural: string;
  total: string;
  emptyDomain: string;
  brandLink: string;
  essays: string;
  essaysTitle: string;
  essaysIntro: string;
  essaysEmpty: string;
  essaysBackToAll: string;
  essayQuestion: string;
  essaySynthesis: string;
  essayReflection: string;
  essayConcepts: string;
  essayFurtherReading: string;
}

export interface LeertuinConfig {
  brand: {
    name: string;
    tagline: string;
    author?: string;
  };
  languages: {
    primary: string;
    secondary: string | null;
  };
  vault: {
    /** Path relative to the app/ directory. */
    path: string;
  };
  domains: DomainDef[];
  schedule: ScheduleConfig;
  sections: SectionDef[];
  /** When true, /essays + /essay/[slug] routes are served. */
  essaysEnabled: boolean;
  /** UI strings keyed by language code. */
  ui: Record<string, UiStrings>;
}
