import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { slugify, makeSlugResolver } from '../lib/utils';
import { config } from '../lib/config';
import type { SectionKey } from '../lib/config-types';

const VAULT_DIR = path.join(__dirname, '..', config.vault.path);
const ESSAYS_DIR = path.join(__dirname, '..', path.dirname(config.vault.path), 'essays');
const OUTPUT_FILE = path.join(__dirname, '../data/concepts.json');
const ESSAYS_OUTPUT = path.join(__dirname, '../data/essays.json');
const IDEAS_OUTPUT = path.join(__dirname, '../data/ideas.json');
const WORDS_DIR = path.join(__dirname, '..', path.dirname(config.vault.path), 'taal', 'woorden');
const WORDS_OUTPUT = path.join(__dirname, '../data/words.json');
const CACHE_FILE = path.join(__dirname, '../translations/cache.json');

const PRIMARY = config.languages.primary;
const SECONDARY = config.languages.secondary;
const SECONDARY_SUFFIX = `.${SECONDARY}.md`;

const VALID_DOMAINS = new Set(config.domains.map((d) => d.key));

/** Map field names (used in concepts.json) to SectionKey. */
const FIELD_NAME: Record<SectionKey, string> = {
  kern: 'kern',
  uitleg: 'uitleg',
  waarom: 'waarom',
  openVragen: 'openVragen',
  verderLezen: 'verder_lezen',
};

/**
 * Essay sections — fixed structure, hard-coded headings per language.
 * Heading matching is whitespace-tolerant (see extractSection), so
 * `## Vraag/premisse` and `## Vraag / premisse` both match.
 */
const ESSAY_SECTIONS: {
  key: string;
  heading: Record<string, string>;
  style: 'body' | 'links';
}[] = [
  { key: 'vraag',       heading: { nl: 'Vraag/premisse',            en: 'Question/premise' },          style: 'body'  },
  { key: 'synthese',    heading: { nl: 'Synthese',                  en: 'Synthesis' },                 style: 'body'  },
  { key: 'reflectie',   heading: { nl: 'Wat dit zichtbaar maakt',   en: 'What this makes visible' },   style: 'body'  },
  { key: 'verderLezen', heading: { nl: 'Verder lezen',              en: 'Further reading' },           style: 'links' },
];

/** Heading for the structured concepten list — parsed separately from prose sections. */
const CONCEPTEN_HEADING: Record<string, string> = {
  nl: 'Concepten die hier samenkomen',
  en: 'Concepts that converge here',
};

/** Strip Obsidian [[wikilinks]] to plain text, optionally resolving aliases. */
function stripWikilinks(text: string): string {
  return text.replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, (_, link, alias) =>
    alias ? alias.slice(1) : link
  );
}

async function toHtml(markdown: string, externalLinksInNewTab = false): Promise<string> {
  const cleaned = stripWikilinks(markdown);
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(cleaned);
  let html = result.toString().trim();
  if (externalLinksInNewTab) {
    html = html.replace(
      /<a href="(https?:\/\/[^"]+)"/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer"',
    );
  }
  return html;
}

/**
 * Extracts the text under a ## Heading from a markdown body.
 * Stops at the next ## heading. Returns '' if not found.
 */
/**
 * Lowercase + strip all whitespace. Makes heading comparisons tolerant
 * to "Vraag/premisse" vs "Vraag / premisse" and similar variants.
 */
function normHeading(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '');
}

function extractSection(body: string, heading: string): string {
  // Normalize CRLF → LF so Windows-edited notes match headings reliably
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const target = normHeading(heading);
  let inside = false;
  const collected: string[] = [];

  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (inside) break;
      if (normHeading(line.replace(/^##\s+/, '')) === target) {
        inside = true;
      }
      continue;
    }
    if (inside) collected.push(line);
  }

  return collected.join('\n').trim();
}

/** Extract wikilink text from a frontmatter array like ["[[Thales van Milete]]", ...]. */
function parseRelated(items: unknown[]): string[] {
  return (items ?? []).map((item) => {
    const s = String(item);
    const match = s.match(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/);
    if (match) return match[2] ? match[2].slice(1) : match[1];
    return s;
  });
}

/**
 * Extracts all concept sections from a markdown body for a given language.
 * Tries the configured heading for `lang` first; if not found and `lang`
 * is not the primary, falls back to the primary heading.
 */
async function extractAllSections(body: string, lang: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const section of config.sections) {
    const heading = section.heading[lang] ?? section.heading[PRIMARY];
    let raw = extractSection(body, heading);
    if (!raw && lang !== PRIMARY) {
      raw = extractSection(body, section.heading[PRIMARY]);
    }
    const html = await toHtml(raw, section.style === 'links');
    out[FIELD_NAME[section.key]] = html;
  }
  return out;
}

/** Same logic as extractAllSections but for the (hard-coded) essay sections. */
async function extractEssaySections(body: string, lang: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const s of ESSAY_SECTIONS) {
    const heading = s.heading[lang] ?? s.heading[PRIMARY] ?? s.heading.nl;
    let raw = extractSection(body, heading);
    if (!raw && lang !== PRIMARY) {
      const fallback = s.heading[PRIMARY] ?? s.heading.nl;
      raw = extractSection(body, fallback);
    }
    out[s.key] = await toHtml(raw, s.style === 'links');
  }

  // Free-form essays: if none of the fixed prose sections is present,
  // render the whole body (minus the title, the concepten list and
  // Verder lezen) as one text with its own ## headings.
  if (!out.vraag && !out.synthese && !out.reflectie) {
    out.tekst = await toHtml(extractFreeBody(body, lang));
  }
  return out;
}

/** Body of a free-form essay without the # title, concepten and verder-lezen sections. */
function extractFreeBody(body: string, lang: string): string {
  const skip = new Set(
    [
      CONCEPTEN_HEADING[lang], CONCEPTEN_HEADING[PRIMARY], CONCEPTEN_HEADING.nl,
      ...ESSAY_SECTIONS.filter((s) => s.key === 'verderLezen').flatMap((s) => Object.values(s.heading)),
    ]
      .filter(Boolean)
      .map((h) => normHeading(h as string)),
  );
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const kept: string[] = [];
  let skipping = false;
  for (const line of lines) {
    if (/^#\s+/.test(line)) continue; // drop the H1 title
    if (/^##\s+/.test(line)) {
      skipping = skip.has(normHeading(line.replace(/^##\s+/, '')));
    }
    if (!skipping) kept.push(line);
  }
  return kept.join('\n').trim();
}

/**
 * Parses the "Concepten die hier samenkomen" section into structured items.
 * Accepts lines like:
 *   - [[Concept name]] — explanation goes here
 *   - [[Concept name]]                       (no explanation)
 *   * [[Concept name]] - explanation         (alt bullet, alt dash)
 * Anything that isn't a wikilink-starting bullet is skipped.
 */
function parseConceptenList(markdown: string): { link: string; uitleg?: string }[] {
  const out: { link: string; uitleg?: string }[] = [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const re = /^\s*[-*]\s*\[\[([^\]|]+)(?:\|[^\]]+)?\]\]\s*(?:[—–-]+\s*(.+?))?\s*$/;
  for (const line of lines) {
    const m = line.match(re);
    if (!m) continue;
    const link = m[1].trim();
    const uitleg = m[2]?.trim();
    out.push(uitleg ? { link, uitleg } : { link });
  }
  return out;
}

/**
 * Extracts the concepten list for an essay, trying the body section first
 * (which can carry per-item explanations) and falling back to the
 * frontmatter `concepten` array (links only).
 */
function extractConceptenList(
  body: string,
  frontmatter: unknown,
  lang: string,
): { link: string; uitleg?: string }[] {
  const primaryHeading = CONCEPTEN_HEADING[PRIMARY] ?? CONCEPTEN_HEADING.nl;
  const langHeading = CONCEPTEN_HEADING[lang] ?? primaryHeading;
  let raw = extractSection(body, langHeading);
  if (!raw && lang !== PRIMARY) raw = extractSection(body, primaryHeading);
  const fromBody = parseConceptenList(raw);
  if (fromBody.length > 0) return fromBody;

  // Fall back to frontmatter — wikilink names only, no explanations
  if (Array.isArray(frontmatter)) {
    return parseRelated(frontmatter).map((link) => ({ link }));
  }
  return [];
}

async function buildConcepts(): Promise<void> {
  if (!fs.existsSync(VAULT_DIR)) {
    console.error(`Vault directory not found: ${VAULT_DIR}`);
    process.exit(1);
  }

  const translationCache: Record<string, Record<string, string>> = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
    : {};

  const files = fs
    .readdirSync(VAULT_DIR)
    .filter((f) => f.endsWith('.md') && (!SECONDARY || !f.endsWith(SECONDARY_SUFFIX)));
  const concepts = [];
  const invalidDomains: { file: string; domein: string }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(VAULT_DIR, file), 'utf-8');
    const { data, content: body } = matter(raw);

    // Only ripe, eligible notes
    if (data.status !== 'ripe' || data.concept_of_day_eligible !== true) continue;

    const titel = String(data.titel ?? path.basename(file, '.md'));
    const slug = slugify(titel);
    const domein = String(data.domein ?? '');

    if (!VALID_DOMAINS.has(domein)) {
      invalidDomains.push({ file, domein });
      continue;
    }

    const primarySections = await extractAllSections(body, PRIMARY);

    let secondaryFields: Record<string, string> = {};
    if (SECONDARY) {
      const enFile = file.replace(/\.md$/, SECONDARY_SUFFIX);
      const enPath = path.join(VAULT_DIR, enFile);
      if (fs.existsSync(enPath)) {
        const enRaw = fs.readFileSync(enPath, 'utf-8');
        const { data: enData, content: enBody } = matter(enRaw);
        const enTitel = String(enData.titel ?? '');
        const enSections = await extractAllSections(enBody, SECONDARY);
        if (enTitel) secondaryFields[`titel_${SECONDARY}`] = enTitel;
        for (const [field, value] of Object.entries(enSections)) {
          if (value) secondaryFields[`${field}_${SECONDARY}`] = value;
        }
      } else {
        const cached = translationCache[slug];
        if (cached) {
          if (cached.titel) secondaryFields[`titel_${SECONDARY}`] = cached.titel;
          if (cached.kern) secondaryFields[`kern_${SECONDARY}`] = cached.kern;
          if (cached.uitleg) secondaryFields[`uitleg_${SECONDARY}`] = cached.uitleg;
          if (cached.waarom) secondaryFields[`waarom_${SECONDARY}`] = cached.waarom;
          if (cached.openVragen) secondaryFields[`openVragen_${SECONDARY}`] = cached.openVragen;
          if (cached.verder_lezen) secondaryFields[`verder_lezen_${SECONDARY}`] = cached.verder_lezen;
        }
      }
    }

    concepts.push({
      slug,
      bestand: path.basename(file, '.md'),
      titel,
      domein,
      tags: Array.isArray(data.tags) ? data.tags : [],
      gerelateerd: parseRelated(data.gerelateerd ?? []),
      last_shown: data.last_shown ?? null,
      aangemaakt: data.aangemaakt ?? null,
      ...primarySections,
      ...secondaryFields,
    });
  }

  if (invalidDomains.length > 0) {
    console.error('✗ Notes with invalid domein values:');
    for (const { file, domein } of invalidDomains) {
      console.error(`  - ${file}: domein "${domein}" not defined in leertuin.config.ts`);
    }
    console.error(`  Valid domains: ${[...VALID_DOMAINS].join(', ')}`);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(concepts, null, 2), 'utf-8');
  console.log(`✓ Built ${concepts.length} concept(s) → data/concepts.json`);
}

async function buildEssays(): Promise<void> {
  fs.mkdirSync(path.dirname(ESSAYS_OUTPUT), { recursive: true });

  if (!fs.existsSync(ESSAYS_DIR)) {
    fs.writeFileSync(ESSAYS_OUTPUT, '[]', 'utf-8');
    console.log('✓ No essays/ folder → data/essays.json (empty)');
    return;
  }

  const files = fs
    .readdirSync(ESSAYS_DIR)
    .filter((f) => f.endsWith('.md') && (!SECONDARY || !f.endsWith(SECONDARY_SUFFIX)));
  const essays: Record<string, unknown>[] = [];
  const invalidDomains: { file: string; domein: string }[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ESSAYS_DIR, file), 'utf-8');
    const { data, content: body } = matter(raw);

    // Only published essays make it into the build
    if (data.status !== 'published') continue;

    const titel = String(data.titel ?? path.basename(file, '.md'));
    const slug = slugify(titel);
    const domeinen = Array.isArray(data.domeinen) ? data.domeinen.map(String) : [];

    const fileInvalid: string[] = [];
    for (const d of domeinen) {
      if (!VALID_DOMAINS.has(d)) fileInvalid.push(d);
    }
    if (fileInvalid.length > 0) {
      for (const d of fileInvalid) invalidDomains.push({ file, domein: d });
      continue;
    }

    const primarySections = await extractEssaySections(body, PRIMARY);
    const primaryConcepten = extractConceptenList(body, data.concepten, PRIMARY);

    let secondaryFields: Record<string, unknown> = {};
    if (SECONDARY) {
      const enFile = file.replace(/\.md$/, SECONDARY_SUFFIX);
      const enPath = path.join(ESSAYS_DIR, enFile);
      if (fs.existsSync(enPath)) {
        const enRaw = fs.readFileSync(enPath, 'utf-8');
        const { data: enData, content: enBody } = matter(enRaw);
        const enTitel = String(enData.titel ?? '');
        const enSections = await extractEssaySections(enBody, SECONDARY);
        const enConcepten = extractConceptenList(enBody, enData.concepten, SECONDARY);
        if (enTitel) secondaryFields[`titel_${SECONDARY}`] = enTitel;
        for (const [field, value] of Object.entries(enSections)) {
          if (value) secondaryFields[`${field}_${SECONDARY}`] = value;
        }
        if (enConcepten.length > 0) secondaryFields[`concepten_${SECONDARY}`] = enConcepten;
      }
    }

    essays.push({
      slug,
      bestand: path.basename(file, '.md'),
      titel,
      domeinen,
      concepten: primaryConcepten,
      aangemaakt: data.aangemaakt ?? null,
      ...primarySections,
      ...secondaryFields,
    });
  }

  if (invalidDomains.length > 0) {
    console.error('✗ Essays with invalid domein values in `domeinen`:');
    for (const { file, domein } of invalidDomains) {
      console.error(`  - ${file}: "${domein}" not defined in leertuin.config.ts`);
    }
    console.error(`  Valid domains: ${[...VALID_DOMAINS].join(', ')}`);
    process.exit(1);
  }

  // Sort: newest first by aangemaakt (ISO/date string comparison)
  essays.sort((a, b) => {
    const da = String(a.aangemaakt ?? '');
    const db = String(b.aangemaakt ?? '');
    if (da === db) return 0;
    return da < db ? 1 : -1;
  });

  fs.writeFileSync(ESSAYS_OUTPUT, JSON.stringify(essays, null, 2), 'utf-8');
  console.log(`✓ Built ${essays.length} essay(s) → data/essays.json`);
}

/**
 * Collects wikilinks from published notes and essays that do not lead to an
 * existing note or essay. These are the "ideas for notes" shown at /ideeen.
 */
function buildIdeas(): void {
  type Item = { slug: string; bestand?: string; titel: string; gerelateerd?: string[]; concepten?: { link: string }[] };
  const concepts = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8')) as Item[];
  const essays = JSON.parse(fs.readFileSync(ESSAYS_OUTPUT, 'utf-8')) as Item[];
  const toConcept = makeSlugResolver(concepts);
  const toEssay = makeSlugResolver(essays);

  const ideas = new Map<string, { naam: string; bronnen: { titel: string; slug: string; type: string }[] }>();
  const note = (naam: string, bron: Item, type: 'concept' | 'essay') => {
    if (toConcept(naam) !== undefined || toEssay(naam) !== undefined) return;
    const key = slugify(naam);
    const idea = ideas.get(key) ?? { naam, bronnen: [] };
    if (!idea.bronnen.some((b) => b.slug === bron.slug && b.type === type)) {
      idea.bronnen.push({ titel: bron.titel, slug: bron.slug, type });
    }
    ideas.set(key, idea);
  };
  for (const c of concepts) for (const naam of c.gerelateerd ?? []) note(naam, c, 'concept');
  for (const e of essays) for (const item of e.concepten ?? []) note(item.link, e, 'essay');

  const sorted = [...ideas.values()].sort(
    (a, b) => b.bronnen.length - a.bronnen.length || a.naam.localeCompare(b.naam, PRIMARY),
  );
  fs.writeFileSync(IDEAS_OUTPUT, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log(`✓ Built ${sorted.length} idea(s) → data/ideas.json`);
}

/**
 * Reads the word cards in vault/taal/woorden and, for each word, looks up one
 * sentence in the published notes that uses it. Output feeds the /taal page.
 */
function buildWords(): void {
  type Note = { slug: string; titel: string; kern?: string; uitleg?: string; waarom?: string };
  if (!fs.existsSync(WORDS_DIR)) {
    fs.writeFileSync(WORDS_OUTPUT, '[]', 'utf-8');
    console.log('✓ No word cards (vault/taal/woorden missing) → data/words.json');
    return;
  }
  const notes = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8')) as Note[];
  const plain = (html: string) =>
    html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  const sentences: { zin: string; titel: string; slug: string }[] = [];
  for (const n of notes) {
    const text = plain([n.kern, n.uitleg, n.waarom].filter(Boolean).join(' '));
    for (const zin of text.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý])/)) {
      if (zin.length >= 50 && zin.length <= 200) sentences.push({ zin, titel: n.titel, slug: n.slug });
    }
  }
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const list = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

  const words = [];
  for (const file of fs.readdirSync(WORDS_DIR).filter((f) => f.endsWith('.md')).sort()) {
    const { data } = matter(fs.readFileSync(path.join(WORDS_DIR, file), 'utf-8'));
    const woord = str(data.woord);
    const gatzin = str(data.gatzin);
    if (data.type !== 'woord' || data.status !== 'actief' || !woord || !str(data.betekenis)) continue;
    if (gatzin.split('___').length !== 2) {
      console.warn(`⚠ ${file}: gatzin needs exactly one ___ (skipped)`);
      continue;
    }
    const vormen = list(data.vormen).length ? list(data.vormen) : [woord];
    const re = new RegExp(`(?<![\\p{L}-])(${vormen.map(esc).join('|')})(?![\\p{L}-])`, 'iu');
    const hits = sentences.filter((s) => re.test(s.zin));
    // Shortest matching sentence reads best on a card.
    const voorbeeld = hits.sort((a, b) => a.zin.length - b.zin.length)[0];
    words.push({
      woord,
      soort: str(data.soort),
      betekenis: str(data.betekenis),
      alledaags: str(data.alledaags),
      verbindingen: list(data.verbindingen),
      gatzin,
      invul: str(data.invul) || woord,
      volgorde: typeof data.volgorde === 'number' ? data.volgorde : 9999,
      ...(voorbeeld ? { voorbeeld } : {}),
    });
  }
  words.sort((a, b) => a.volgorde - b.volgorde || a.woord.localeCompare(b.woord, PRIMARY));
  fs.writeFileSync(WORDS_OUTPUT, JSON.stringify(words, null, 2), 'utf-8');
  const withExample = words.filter((w) => 'voorbeeld' in w).length;
  console.log(`✓ Built ${words.length} word(s), ${withExample} with an example from the notes → data/words.json`);
}

async function main() {
  await buildConcepts();
  await buildEssays();
  buildIdeas();
  buildWords();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
