# De Leertuin

Een "concept van de dag"-PWA gedreven door je eigen map met Markdown-
notes. Elke dag wordt één concept uit je collectie naar voren gehaald;
op andere momenten bladert je per onderwerp. Bedoeld om een persoonlijke
kennisbasis om te zetten in een rustige, dagelijkse leesgewoonte.

[🇬🇧 Read in English](./README.md)

**Live voorbeeld:** <https://de-leertuin-van-vincent.vercel.app>

---

## Snel aan de slag

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvincentmymanfromamsterdam%2FDe-Leertuin-van-Vincent&root-directory=app)

Of klik **Use this template** bovenaan deze repo om eerst een kopie
onder je eigen GitHub-account te maken, en daarna te deployen.

Daarna:

1. Open `app/leertuin.config.ts` en pas merk, talen, domeinen, schema en
   UI-strings aan.
2. Verwijder de voorbeeld-notes in `vault/concepts/` en voeg je eigen
   toe (zie "Notes schrijven" hieronder). De mappen `vault/people/`,
   `vault/MOCs/`, `vault/sources/` en `vault/templates/` zijn
   persoonlijke organisatie van de originele auteur — voel je vrij om
   ze te verwijderen of voor jezelf in te richten.
3. Draai `npm install && npm run dev` vanuit `app/` voor een lokale
   preview.
4. Push naar GitHub — Vercel rebuildt automatisch.

---

## Hoe het werkt

```
vault/concepts/*.md   →   build-script   →   statische Next.js-site
                          (draait bij deploy)
```

- Je notes leven als platte Markdown in `vault/concepts/`.
- `npm run build` (door Vercel automatisch uitgevoerd) parsed ze naar
  `app/data/concepts.json`, waarna Next.js elk concept rendert als
  statische pagina.
- Een weekschema kiest het domein van vandaag; client-side rotatie kiest
  het minst-recent-getoonde concept binnen dat domein.
- Gratis hostbaar op Vercel's hobby-plan — puur statisch, geen database.

---

## Configuratie

Alles dat aanpasbaar is staat in **`app/leertuin.config.ts`**. De build
faalt met een duidelijke foutmelding als er iets inconsistent is.

| Sectie           | Wat je instelt                                                |
|------------------|---------------------------------------------------------------|
| `brand`          | Naam app, tagline, optioneel author                           |
| `languages`      | Primaire taal; optionele tweede (zet op `null` om uit te zetten) |
| `vault.path`     | Pad naar je notes-map (relatief aan `app/`)                   |
| `domains`        | Onderwerpen — vrij aantal, per taal een label + kleur         |
| `schedule`       | Weekdag → domein-key (of `'random'`)                          |
| `sections`       | Markdown-kopnamen + UI-labels per sectie                      |
| `ui`             | Alle knoplabels en navigatiestrings, per taal                 |

### Kleuren

Elk domein kiest een kleur uit het 12-kleurenpalet: `amber`, `indigo`,
`emerald`, `violet`, `rose`, `teal`, `cyan`, `sky`, `lime`, `fuchsia`,
`orange`, `slate`.

### Schema

Map weekdagen (0=zo, 1=ma, … 6=za) naar domein-keys, of gebruik
`'random'` voor een dagelijkse verrassing. Voorbeelden:

```ts
// Eén domein per weekdag, herhalingen mogen
schedule: { 1:'filosofie', 2:'kosmologie', 3:'natuur', 4:'filosofie',
            5:'kosmologie', 6:'fysica', 0:'random' }

// Altijd willekeurig
schedule: { 0:'random', 1:'random', 2:'random', 3:'random',
            4:'random', 5:'random', 6:'random' }
```

---

## Notes schrijven

Elke note is een Markdown-bestand met YAML-frontmatter en vijf secties.
De bestandsnaam wordt de paginatitel.

```markdown
---
titel: Entropie
domein: fysica              # moet matchen met een `key` in config.domains
status: ripe                # alleen "ripe" notes verschijnen in de app
concept_of_day_eligible: true
tags: [thermodynamica, tijd]
gerelateerd: ["[[Pijl van de tijd]]", "Zwarte gaten"]
aangemaakt: 2026-01-15
last_shown: null
---

## Kern
Eén-alinea-essentie van het concept.

## Uitleg
De uitgebreide uitleg. Meerdere alinea's zijn prima.

## Waarom het ertoe doet
Waarom dit concept ertoe doet; wat het de moeite waard maakt.

## Open vragen
- Een vraag waar je nog op kauwt
- Nog eentje

## Verder lezen
- Boek- of artikel-referentie
- Link: https://example.com
```

De sectie-kopnamen (`## Kern`, enz.) zijn configureerbaar in
`leertuin.config.ts`. Obsidian `[[wikilinks]]` worden ondersteund maar
zijn optioneel — gewone strings werken ook.

---

## Essays — een tweede content-type

Naast de dagelijkse concept-rotatie ondersteunt de app **essays**:
langere stukken die meerdere concepten samenbrengen in één betoog.
Ze leven op `/essays` en `/essay/<slug>` en doen niet mee in de
dagrotatie.

Een concept is atomair ("wat is entropie?"). Een essay is verbindend
("wat hebben entropie, evolutie en de pijl van de tijd gemeen?"). Mik
op 500–1500 woorden.

Plaats essay-bestanden in **`vault/essays/`** (één per bestand). Alleen
essays met `status: published` verschijnen op de site.

```markdown
---
type: essay
titel: De vorm van tijd
domeinen: [fysica, filosofie]      # één of meer domein-keys
status: published                  # alleen "published" verschijnt
concepten: ["[[Entropie]]", "Pijl van de tijd"]
aangemaakt: 2026-04-15
---

## Vraag / premisse
De ene vraag of stelling waar het essay omheen is gebouwd.

## Synthese
Het eigenlijke betoog. Meerdere alinea's. Dit is de hoofdtekst.

## Wat ik hierdoor anders zie
Eerlijke reflectie — wat heeft het schrijven verschoven in je denken?
```

Engelse essay-vertalingen (`.<secondary>.md`) herkennen ook Engelse
kopnamen: `Question / premise`, `Synthesis`, `What I now see
differently`.

De frontmatter-lijst `concepten` verschijnt als klikbare tags onderaan
het essay, met links naar de concept-pagina's (als dat concept bestaat
in `vault/concepts/`).

### Essays uitzetten

Wil je alleen de dagelijkse concept-rotatie? Zet `essaysEnabled: false`
in `leertuin.config.ts`. De `/essays`-route geeft dan 404 en de
nav-link verdwijnt.

---

## Vertaling toevoegen

Voor elke `Entropie.md`, maak een buurbestand `Entropie.<lang>.md` waar
`<lang>` je geconfigureerde `languages.secondary`-code is:

```markdown
---
titel: Entropy
---

## Kern
The essence in the second language.

## Uitleg
...
```

Als secundaire taal is Engels werkt de build ook met Engelse kopnamen
(`## Core`, `## Explanation`, `## Why this matters`, `## Open
questions`, `## Further reading`) — handig als je in beide stijlen wilt
werken.

Als een sectie in de vertaling ontbreekt, valt de app terug op de
primaire-taal-inhoud.

---

## Editor-keuze

- **Elke Markdown-editor werkt**: VS Code, Typora, iA Writer, Kladblok.
- **Aanbevolen: [Obsidian](https://obsidian.md)** — voor `[[wikilinks]]`-
  autocompletion, frontmatter-bewerking en graph view van gerelateerde
  concepten.

---

## Andere hosts

Dit is een statische Next.js-site, dus hij draait overal:

- **Vercel** — eenvoudigst, één klik deployen, gratis voor hobby-gebruik.
- **Netlify** — identieke ervaring.
- **Cloudflare Pages** — gratis, snel.
- **Zelf hosten** — `npm run build` levert een volledig statische bundel.

Buiten Vercel: wijs de host naar de `app/`-map.

---

## Handmatig aan te passen

Een paar dingen zitten nog niet in `leertuin.config.ts` en vragen om
een eenmalige bewerking:

- **`app/public/manifest.webmanifest`** — PWA-naam en theme-kleuren.
- **`app/public/icons/icon.svg`** — app-icoon.
- **`app/app/layout.tsx`** — primair font (nu Source Serif 4).
- **`app/app/globals.css`** — globale kleuren en typografie.

---

## Credits

Gebouwd door [@vincentmymanfromamsterdam](https://github.com/vincentmymanfromamsterdam).
Vrij te gebruiken onder eigen naam — fork het, pas het aan, en deel
gerust terug als je iets moois maakt.
