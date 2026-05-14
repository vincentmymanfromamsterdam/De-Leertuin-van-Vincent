/**
 * The shape of a concept as stored in data/concepts.json.
 *
 * The fixed fields below mirror the section keys in your config.
 * Secondary-language content lives under dynamic keys like
 * `${field}_${langCode}`, e.g. `kern_en`, `titel_de`.
 */

/** Free-form string — validated against your config at build time. */
export type Domein = string;

export interface Concept {
  slug: string;
  titel: string;
  domein: Domein;
  tags: string[];
  gerelateerd: string[];
  last_shown: string | null;
  aangemaakt: string | null;
  kern: string;
  uitleg: string;
  waarom: string;
  openVragen: string;
  verder_lezen: string;
  /** Dynamic secondary-language fields: titel_en, kern_en, kern_de, etc. */
  [key: string]: unknown;
}
