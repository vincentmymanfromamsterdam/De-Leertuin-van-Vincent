import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { slugify } from '../lib/utils';
import { config } from '../lib/config';
import type { SectionKey } from '../lib/config-types';

const VAULT_DIR = path.join(__dirname, '..', config.vault.path);
const ESSAYS_DIR = path.join(__dirname, '..', path.dirname(config.vault.path), 'essays');
const OUTPUT_FILE = path.join(__dirname, '../data/concepts.json');
const ESSAYS_OUTPUT = path.join(__dirname, '../data/essays.json');
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
 * (Not yet exposed in leertuin.config.ts to keep that surface small.)
 */
const ESSAY_SECTIONS: { key: string; heading: Record<string, string> }[] = [
  { key: 'vraag',     heading: { nl: 'Vraag / premisse',           en: 'Question / premise' } },
  { key: 'synthese',  heading: { nl: 'Synthese',                   en: 'Synthesis' } },
  { key: 'reflectie', heading: { nl: 'Wat ik hierdoor anders zie', en: 'What I now see differently' } },
];

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
function extractSection(body: string, heading: string): string {
  // Normalize CRLF → LF so Windows-edited notes match headings reliably
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let inside = false;
  const collected: string[] = [];

  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (inside) break;
      if (line.replace(/^##\s+/, '').toLowerCase() === heading.toLowerCase()) {
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
    out[s.key] = await toHtml(raw);
  }
  return out;
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

    let secondaryFields: Record<string, string> = {};
    if (SECONDARY) {
      const enFile = file.replace(/\.md$/, SECONDARY_SUFFIX);
      const enPath = path.join(ESSAYS_DIR, enFile);
      if (fs.existsSync(enPath)) {
        const enRaw = fs.readFileSync(enPath, 'utf-8');
        const { data: enData, content: enBody } = matter(enRaw);
        const enTitel = String(enData.titel ?? '');
        const enSections = await extractEssaySections(enBody, SECONDARY);
        if (enTitel) secondaryFields[`titel_${SECONDARY}`] = enTitel;
        for (const [field, value] of Object.entries(enSections)) {
          if (value) secondaryFields[`${field}_${SECONDARY}`] = value;
        }
      }
    }

    essays.push({
      slug,
      titel,
      domeinen,
      concepten: parseRelated(data.concepten ?? []),
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

async function main() {
  await buildConcepts();
  await buildEssays();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
