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

## Content-generatie met AI: principes

Vincent gebruikt Claude als primaire schrijver van concept-notes. Met drie kleine kinderen, een chiropractiepraktijk en meerdere projecten is "eerst lezen, dan notes schrijven" niet realistisch. De vault is bedoeld als dagelijkse leerprikkel via de Concept-of-the-Day app, niet als academisch project.

### Kernprincipe: Claude schrijft, Vincent curateert

Claude schrijft notes direct op `status: ripe` en `concept_of_day_eligible: true`. Vincent curateert door te kiezen welke notes hij in de vault plaatst. Het leermoment zit in het dagelijks lezen van de app, niet in het schrijfproces.

Verdieping is optioneel: elke note bevat een "Verder lezen"-sectie met directe links (URL's) naar het relevante hoofdstuk, video of artikel. Vincent volgt die wanneer hij tijd en interesse heeft.

### Voor Claude die notes schrijft

- **Schrijf in eigen woorden**, vat samen, citeer niet uit bronnen
- **Houd notes atomair** — liever splitsen dan opproppen
- **Default `status: ripe`** en `concept_of_day_eligible: true`
- **Gebruik `[[links]]` naar gerelateerde notes** — als de gelinkte note nog niet bestaat, maak hem mee aan in dezelfde batch zodat kruisverbanden direct werken
- **Voeg een "Verder lezen"-sectie toe** onderaan elke note met directe URL's naar de bron (specifiek hoofdstuk, video met timestamp, artikel). Geen vage verwijzingen maar klikbare links
- **Bij filosofie**: als Russell (of een andere bron) een omstreden positie inneemt, markeer in de tekst "Russell stelt X; moderne scholarship wijst op Y" en overweeg `status: contested`
- **Bij natuur/kosmologie**: wees voorzichtig met getallen, data en soortnamen. Flag expliciet wanneer iets niet is geverifieerd
- **Frontmatter is verplicht**
- **Vermeld niet dat Claude de note geschreven heeft** — de vault is een persoonlijke kennisbasis, niet een archief van AI-output

### Werkwijzen

- **"Geef me 5 concept-notes over [onderwerp/hoofdstuk]"** — Claude schrijft een batch met onderlinge kruisverbanden
- **"Vul het kosmologie-domein aan"** — Claude kiest de meest waardevolle ontbrekende concepten en schrijft ze
- **"Maak een essay-note die [concept A] en [concept B] verbindt"** — Claude schrijft de synthese
- **"Welke kruisverbanden mis ik?"** — Claude analyseert de vault en stelt verbindingen voor

### Kwaliteitsbewaking

Omdat er geen bewerkingsstap tussen zit, let Claude extra op:
- Feitelijke juistheid (liever "dit is omstreden" dan stellig iets verkeerds beweren)
- Duidelijk markeren wat interpretatie is vs consensus
- Geen note te lang maken — de app toont op een telefoonscherm, dus bondigheid telt
- Open vragen opnemen die nieuwsgierigheid wekken, niet die huiswerk suggereren

### Wat te vermijden

- Notes te lang of niet-atomair maken
- Over-citeren of direct parafraseren uit bronnen
- Bronloze beweringen over specifieke getallen of data
- Kruisverbanden forceren waar ze niet natuurlijk zijn
