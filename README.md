# De Leertuin

A "concept of the day" PWA driven by your own folder of Markdown notes.
Every day, one concept from your collection is surfaced; on the rest
days you can browse them by topic. Designed to turn a personal
knowledge base into a calm, daily reading habit.

[🇳🇱 Lees in het Nederlands](./README.nl.md)

**Live example:** <https://de-leertuin-van-vincent.vercel.app>

---

## Quick start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvincentmymanfromamsterdam%2FDe-Leertuin-van-Vincent&root-directory=app)

Or click **Use this template** at the top of this repo to get a copy
under your own GitHub account first, then deploy.

After that:

1. Open `app/leertuin.config.ts` and adjust brand, languages, domains,
   schedule, and UI strings.
2. Clear out the example notes in `vault/concepts/` and add your own
   (see "Writing notes" below). The `vault/people/`, `vault/MOCs/`,
   `vault/sources/`, `vault/templates/` folders are personal scaffolding
   from the original author — feel free to delete or repurpose them.
3. Run `npm install && npm run dev` from `app/` to preview locally.
4. Push to GitHub — Vercel rebuilds automatically.

---

## How it works

```
vault/concepts/*.md   →   build script   →   static Next.js site
                          (runs on deploy)
```

- Your notes live as plain Markdown in `vault/concepts/`.
- `npm run build` (run automatically by Vercel) parses them into
  `app/data/concepts.json`, then Next.js renders every concept as a
  static page.
- Day-of-week schedule picks today's domain; client-side rotation picks
  the least-recently-shown concept from that domain.
- Stays free on Vercel's hobby plan — pure static output, no database.

---

## Configuration

Everything customizable lives in **`app/leertuin.config.ts`**. The build
fails with a clear error if anything is inconsistent.

| Section          | What you control                                            |
|------------------|-------------------------------------------------------------|
| `brand`          | App name, tagline, optional author                          |
| `languages`      | Primary language; optional secondary (set to `null` to skip)|
| `vault.path`     | Path to your notes folder (relative to `app/`)              |
| `domains`        | Topics — any count, each with a label per language + color  |
| `schedule`       | Weekday → domain key (or `'random'`)                        |
| `sections`       | Markdown headings + UI labels for each note section         |
| `ui`             | All button labels and navigation strings, per language      |

### Colors

Each domain picks from a 12-color palette: `amber`, `indigo`, `emerald`,
`violet`, `rose`, `teal`, `cyan`, `sky`, `lime`, `fuchsia`, `orange`,
`slate`.

### Schedule

Map weekdays (0=Sun, 1=Mon, … 6=Sat) to domain keys, or use `'random'`
for a daily surprise. Examples:

```ts
// One domain per weekday, repeats allowed
schedule: { 1:'philosophy', 2:'cosmology', 3:'nature', 4:'philosophy',
            5:'cosmology', 6:'physics', 0:'random' }

// Always pick at random
schedule: { 0:'random', 1:'random', 2:'random', 3:'random',
            4:'random', 5:'random', 6:'random' }
```

---

## Writing notes

Each note is a Markdown file with YAML frontmatter and five sections.
File name becomes the page title.

```markdown
---
titel: Entropy
domein: physics              # must match a `key` in config.domains
status: ripe                 # only "ripe" notes appear in the app
concept_of_day_eligible: true
tags: [thermodynamics, time]
gerelateerd: ["[[Arrow of time]]", "Black holes"]
aangemaakt: 2026-01-15
last_shown: null
---

## Kern
One-paragraph essence of the concept.

## Uitleg
The detailed explanation. Multiple paragraphs are fine.

## Waarom het ertoe doet
Why this concept matters; what makes it worth keeping.

## Open vragen
- A question you're still chewing on
- Another one

## Verder lezen
- Book or article reference
- Link: https://example.com
```

The section headings (`## Kern`, etc.) are configurable in
`leertuin.config.ts`. Obsidian `[[wikilinks]]` are supported but
optional — plain strings work too.

---

## Adding a translation

For each `Entropy.md`, create a sibling file `Entropy.<lang>.md` where
`<lang>` is your configured `languages.secondary` code:

```markdown
---
titel: Entropie
---

## Kern
De essentie in de tweede taal.

## Uitleg
...
```

The English-as-secondary build also recognises English section headings
(`## Core`, `## Explanation`, `## Why this matters`, `## Open
questions`, `## Further reading`) for convenience.

If a section is missing in the translation, the primary-language
content shows instead.

---

## Editing tools

- **Any Markdown editor works**: VS Code, Typora, iA Writer, Notepad.
- **Recommended: [Obsidian](https://obsidian.md)** — for `[[wikilinks]]`
  autocompletion, frontmatter editing, and graph view of related
  concepts.

---

## Hosting alternatives

This is a static Next.js site, so it runs anywhere:

- **Vercel** — easiest, one-click deploy, free tier covers hobby use.
- **Netlify** — identical experience.
- **Cloudflare Pages** — free, fast.
- **Self-hosted** — `npm run build` produces a fully static bundle.

When deploying outside Vercel, point the host at the `app/` directory.

---

## Manual customization

A few things still live outside `leertuin.config.ts` and may need a
one-time edit:

- **`app/public/manifest.webmanifest`** — PWA name and theme colors.
- **`app/public/icons/icon.svg`** — app icon.
- **`app/app/layout.tsx`** — root font (currently Source Serif 4).
- **`app/app/globals.css`** — global colors and typography.

---

## Credits

Built by [@vincentmymanfromamsterdam](https://github.com/vincentmymanfromamsterdam).
Free to use under your own name — fork it, adapt it, share it back if
you like.
