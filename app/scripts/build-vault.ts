import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { slugify } from '../lib/utils';

const VAULT_DIR = path.join(__dirname, '../../vault/concepts');
const OUTPUT_FILE = path.join(__dirname, '../data/concepts.json');

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
 * Stops at the next ## heading.
 */
function extractSection(body: string, heading: string): string {
  const lines = body.split('\n');
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

async function buildVault() {
  if (!fs.existsSync(VAULT_DIR)) {
    console.error(`Vault directory not found: ${VAULT_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(VAULT_DIR)
    .filter((f) => f.endsWith('.md') && !f.endsWith('.en.md'));
  const concepts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(VAULT_DIR, file), 'utf-8');
    const { data, content: body } = matter(raw);

    // Only ripe, eligible notes
    if (data.status !== 'ripe' || data.concept_of_day_eligible !== true) continue;

    const titel = String(data.titel ?? path.basename(file, '.md'));

    // Check for an English counterpart (<name>.en.md)
    const enFile = file.replace(/\.md$/, '.en.md');
    const enPath = path.join(VAULT_DIR, enFile);
    let enFields: Record<string, string> = {};
    if (fs.existsSync(enPath)) {
      const enRaw = fs.readFileSync(enPath, 'utf-8');
      const { data: enData, content: enBody } = matter(enRaw);
      const enTitel = String(enData.titel ?? '');
      const enKern = await toHtml(extractSection(enBody, 'Kern'));
      const enUitleg = await toHtml(extractSection(enBody, 'Uitleg'));
      const enWaarom = await toHtml(extractSection(enBody, 'Waarom het ertoe doet'));
      const enOpenVragen = await toHtml(extractSection(enBody, 'Open vragen'));
      const enVerderLezen = await toHtml(extractSection(enBody, 'Verder lezen'), true);
      if (enTitel) enFields.titel_en = enTitel;
      if (enKern) enFields.kern_en = enKern;
      if (enUitleg) enFields.uitleg_en = enUitleg;
      if (enWaarom) enFields.waarom_en = enWaarom;
      if (enOpenVragen) enFields.openVragen_en = enOpenVragen;
      if (enVerderLezen) enFields.verder_lezen_en = enVerderLezen;
    }

    concepts.push({
      slug: slugify(titel),
      titel,
      domein: data.domein ?? 'filosofie',
      tags: Array.isArray(data.tags) ? data.tags : [],
      gerelateerd: parseRelated(data.gerelateerd ?? []),
      last_shown: data.last_shown ?? null,
      aangemaakt: data.aangemaakt ?? null,
      kern: await toHtml(extractSection(body, 'Kern')),
      uitleg: await toHtml(extractSection(body, 'Uitleg')),
      waarom: await toHtml(extractSection(body, 'Waarom het ertoe doet')),
      openVragen: await toHtml(extractSection(body, 'Open vragen')),
      verder_lezen: await toHtml(extractSection(body, 'Verder lezen'), true),
      ...enFields,
    });
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(concepts, null, 2), 'utf-8');
  console.log(`✓ Built ${concepts.length} concept(s) → data/concepts.json`);
}

buildVault().catch((err) => {
  console.error(err);
  process.exit(1);
});
