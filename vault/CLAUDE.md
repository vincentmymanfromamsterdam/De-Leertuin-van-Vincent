# Leertuin — Vault Schema & Conventies

Persoonlijke kennisbasis voor drie interessegebieden: **filosofie** (Russell als rode draad), **kosmologie/sterrenkunde**, en **natuur/tuin**. Voedt ook de Concept-of-the-Day app.

## Filosofie

- Plat organiseren op note-**type**, niet op domein. Domein staat in frontmatter (`domein: filosofie|kosmologie|natuur`).
- Atomic notes: één concept per note. Liever vijf korte dan één lange.
- Dichte verlinking: elke concept-note linkt naar relevante people/sources/andere concepts.
- Status-gedreven: notes rijpen van `seed` → `draft` → `ripe`. Alleen `ripe` notes zijn app-waardig.

## Folder-structuur

```
leertuin/
├── CLAUDE.md              # dit bestand
├── concepts/              # atomic ideas
├── people/                # filosofen, wetenschappers, naturalisten
├── sources/               # boeken, papers, artikelen
├── observations/          # tuin/veld-waarnemingen met datum
├── essays/                # eigen synthese, kruisverbanden
├── MOCs/                  # Maps of Content (overzicht-notes)
└── templates/             # note-templates
```

## Frontmatter-schema per note-type

### concept
```yaml
---
type: concept
domein: filosofie | kosmologie | natuur
titel: "Russell's paradox"
status: seed | draft | ripe | needs_review | contested
tags: [logica, verzamelingenleer]
bronnen: ["[[HWP - Russell]]"]
gerelateerd: ["[[Frege]]", "[[Principia Mathematica]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-04-14
---
```

### person
```yaml
---
type: person
domein: filosofie | kosmologie | natuur
naam: "Thales van Milete"
periode: "ca. 624 – ca. 546 v.Chr."
stroming: "Milesische school / Presocraten"
tags: [presocraten, ionische-filosofie]
kernideeen: ["[[Water als oerstof]]", "[[Voorspelling zonsverduistering 585 vC]]"]
aangemaakt: 2026-04-14
---
```

### source
```yaml
---
type: source
domein: filosofie | kosmologie | natuur
titel: "A History of Western Philosophy"
auteur: "Bertrand Russell"
jaar: 1945
formaat: boek | paper | artikel | podcast | video
url: "https://www.ntslibrary.com/PDF%20Books/History%20of%20Western%20Philosophy.pdf"
status_lezen: niet-begonnen | bezig | afgerond
voortgang: "Book I, Ch. 1"
aangemaakt: 2026-04-14
---
```

### observation
```yaml
---
type: observation
domein: natuur
soort: "Aardhommel (Bombus terrestris)"
datum: 2026-04-14
locatie: "Achtertuin, lavendel"
weer: "zonnig, 16°C"
foto: "attachments/2026-04-14-aardhommel.jpg"
tags: [hommels, bestuivers]
gerelateerd: ["[[Bestuiving]]", "[[Bombus terrestris]]"]
aangemaakt: 2026-04-14
---
```

### essay
```yaml
---
type: essay
titel: "Oneindigheid: Cantor, kosmos, varens"
domeinen: [filosofie, kosmologie, natuur]
status: draft | ripe
concepten: ["[[Cantor's diagonaalargument]]", "[[Waarneembaar heelal]]", "[[Fractal - zelfgelijkendheid]]"]
aangemaakt: 2026-04-14
---
```

## Status-waarden

- `seed` — ruwe aantekening, nog onbruikbaar voor anderen (of jezelf over een maand)
- `draft` — leesbaar, maar nog niet af; mist context of links
- `ripe` — zelfstandig leesbaar, goed gelinkt, geschikt voor Concept-of-the-Day
- `needs_review` — je bent iets tegengekomen dat deze note tegenspreekt
- `contested` — specifiek voor filosofie: dit is Russell's/auteurs interpretatie, niet consensus

## Tag-conventies

- lowercase, streepjes voor spaties: `presocraten`, `donkere-materie`, `inheemse-planten`
- Domein-tag is niet nodig (staat in frontmatter)
- Tags beschrijven het **onderwerp**, niet de vorm (`logica` ✅, `belangrijk` ❌)

## Linking-principes

- **Gebruik `[[note-titel]]` royaal** — ook voor notes die nog niet bestaan (wordt een seed-suggestie)
- **Context bij links**: niet `zie [[Plato]]`, wel `Plato's theorie van de vormen ([[Plato]]) biedt hier een tegenwicht`
- **Backlinks zijn gratis** — als A naar B linkt, zie je dat automatisch bij B
- **MOCs** zijn de uitzondering: dat zijn puur lijst-achtige notes die een gebied ontsluiten

## Workflows

### 1. Ingest (nieuwe note maken)
1. Kies note-type → kopieer template uit `templates/`
2. Vul frontmatter (minimaal `type`, `domein`, `titel`, `status: seed`)
3. Schrijf kern in eigen woorden (niet kopiëren uit bron)
4. Voeg minstens één link naar bestaande note toe
5. Commit wanneer je klaar bent

### 2. Ripen (seed → ripe)
1. Periodiek seeds doorlopen (bv. zondagavond)
2. Per seed: is dit nog steeds relevant? Kan ik het nu uitleggen?
3. Zo ja → uitbreiden, extra links, status naar `ripe`, `concept_of_day_eligible: true`
4. Zo nee → laten staan of archiveren

### 3. Concept-of-the-Day (app leest vault)
1. App filtert op `status: ripe` AND `concept_of_day_eligible: true`
2. Roteert over domeinen (ma-di-wo = fil-kos-nat, bv.)
3. Kiest note met oudste `last_shown` (of null)
4. Toont → update `last_shown` naar vandaag

### 4. Lint (consistency check)
- Notes zonder type of domein in frontmatter
- Notes met `status: ripe` maar zonder enkele link
- Broken `[[links]]` (naar non-existente notes) — deze mogen bestaan, worden seed-suggesties
- Observations zonder datum

## Filosofische noot bij filosofie-notes

Russell's HWP is opinionated. Bij controversiële interpretaties: markeer met `status: contested` en noteer in de note zelf "Russell stelt X; moderne scholarship wijst op Y". Dit houdt de vault intellectueel eerlijk.

## Voor Claude / AI-assistenten

Als je helpt notes te maken:
- Schrijf in eigen woorden, vat samen, citeer niet uit bronnen
- Houd notes atomair — splits liever dan opproppen
- Suggereer links naar bestaande notes (check eerst of ze bestaan)
- Bij filosofie: als Russell een omstreden positie inneemt, markeer dat
- Frontmatter is verplicht; status default `seed` tenzij duidelijk ripe
