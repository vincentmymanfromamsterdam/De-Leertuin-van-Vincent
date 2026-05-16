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

/**
 * An essay synthesises multiple concepts into a longer-form piece.
 * Essays are not part of the daily concept rotation; they live at
 * /essays and /essay/[slug].
 */
export interface Essay {
  slug: string;
  titel: string;
  /** One or more domain keys this essay touches. */
  domeinen: string[];
  /** Concept titles (wikilinks resolved to text) that this essay connects. */
  concepten: string[];
  aangemaakt: string | null;
  vraag: string;       // Vraag / premisse → HTML
  synthese: string;    // Synthese → HTML
  reflectie: string;   // Wat ik hierdoor anders zie → HTML
  /** Dynamic secondary-language fields. */
  [key: string]: unknown;
}
