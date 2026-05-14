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
const OUTPUT_FILE = path.join(__dirname, '../data/concepts.json');
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
 * Extracts all section bodies from a markdown body for a given language.
 * Tries the configured heading for `lang` first; if not found and `lang`
 * is not the primary, falls back to the primary heading. This makes
 * .en.md files that still use Dutch headings continue to work.
 */
async function extractAllSections(body: string, lang: string): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const section of config.sections) {
    const heading = section.heading[lang] ?? section.heading[PRIMARY];
    let raw = extractSection(body, heading);
    if (!raw && lang !== PRIMARY) {
      // Fallback: try the primary-language heading
      raw = extractSection(body, section.heading[PRIMARY]);
    }
    const html = await toHtml(raw, section.style === 'links');
    out[FIELD_NAME[section.key]] = html;
  }
  return out;
}

async function buildVault() {
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

    // Primary-language sections
    const primarySections = await extractAllSections(body, PRIMARY);

    // Secondary-language fields (if configured)
    let secondaryFields: Record<string, string> = {};
    if (SECONDARY) {
      // Priority 1: <name>.<secondary>.md file in the vault
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
        // Priority 2: translations/cache.json (legacy, optional)
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

buildVault().catch((err) => {
  console.error(err);
  process.exit(1);
});
