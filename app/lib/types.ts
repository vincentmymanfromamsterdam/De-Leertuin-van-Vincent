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
  /** File name without extension — what wikilinks in the vault point at. */
  bestand?: string;
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
  /** Free-form essays: whole body as HTML when the fixed sections are absent. */
  tekst?: string;
  /** Dynamic secondary-language fields. */
  [key: string]: unknown;
}

/**
 * A note that is linked to from published notes or essays but does not exist yet.
 * Generated at build time into data/ideas.json.
 */
export interface Idea {
  naam: string;
  /** Published notes and essays that link to it. */
  bronnen: { titel: string; slug: string; type: 'concept' | 'essay' }[];
}

/**
 * A word card from vault/taal/woorden, for the /taal vocabulary trainer.
 * Generated at build time into data/words.json.
 */
export interface Word {
  woord: string;
  soort: string;
  betekenis: string;
  /** What you would say in everyday words instead. */
  alledaags: string;
  /** Fixed combinations the word occurs in. */
  verbindingen: string[];
  /** Sentence with one ___ gap. */
  gatzin: string;
  /** The form that fits the gap. */
  invul: string;
  volgorde: number;
  /** A sentence from a published note that uses the word. */
  voorbeeld?: { zin: string; titel: string; slug: string };
}
