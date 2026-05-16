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
/** A single item in the "Concepten die hier samenkomen" list. */
export interface EssayConcept {
  /** The wikilink target name, e.g. "Hume's probleem van inductie". */
  link: string;
  /** Optional explanation after the em-dash on that line. */
  uitleg?: string;
}

export interface Essay {
  slug: string;
  titel: string;
  /** One or more domain keys this essay touches. */
  domeinen: string[];
  /** Concept references parsed from the body section (with optional per-item gloss). */
  concepten: EssayConcept[];
  aangemaakt: string | null;
  vraag: string;          // Vraag/premisse → HTML
  synthese: string;       // Synthese → HTML
  reflectie: string;      // Wat dit zichtbaar maakt → HTML
  verderLezen: string;    // Verder lezen → HTML (may be empty)
  /** Dynamic secondary-language fields. */
  [key: string]: unknown;
}
