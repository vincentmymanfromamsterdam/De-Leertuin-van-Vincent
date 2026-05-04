# De Leertuin van Vincent — Handleiding

## Wat is het?

Een persoonlijke kennisbasis (Obsidian vault) die een Progressive Web App voedt op je iPhone. Elke dag toont de app één concept uit drie domeinen: **filosofie**, **kosmologie** en **natuur**. Van daaruit kun je doorklikken naar gerelateerde concepten (zoals Wikipedia) of via de bronvermelding dieper duiken in het originele materiaal.

**Live URL:** https://de-leertuin-van-vincent.vercel.app/

\---

## Architectuur

```
C:\\Users\\vinc\_\\De Leertuin van Vincent\\
├── vault\\                    ← Obsidian vault (kennisbasis)
│   ├── CLAUDE.md             ← Schema, conventies, workflows
│   ├── concepts\\             ← Atomic concept-notes (NL + EN)
│   ├── people\\               ← Personen (filosofen, wetenschappers)
│   ├── sources\\              ← Bronnen (boeken, video's, documentaires)
│   ├── observations\\         ← Tuinwaarnemingen (toekomstig)
│   ├── essays\\               ← Synthese-notes (toekomstig)
│   ├── MOCs\\                 ← Maps of Content (overzicht-notes)
│   └── templates\\            ← Note-templates per type
├── app\\                      ← Next.js PWA (Concept of the Day app)
│   ├── scripts\\
│   │   └── build-vault.ts    ← Parseert vault → concepts.json bij build
│   ├── data\\
│   │   └── concepts.json     ← Gegenereerd bij build, niet handmatig bewerken
│   └── ...                   ← Next.js app code
├── .git\\                     ← Git repository
└── .gitignore
```

## De flow: van note naar iPhone

```
1. Notes maken/ontvangen (Claude of zelf)
         ↓
2. Bestanden in vault/concepts/ plaatsen
         ↓
3. GitHub Desktop: Commit + Push
         ↓
4. Vercel detecteert push → start automatisch build
         ↓
5. Bij build: scripts/build-vault.ts leest vault/concepts/\*.md
   → genereert data/concepts.json
         ↓
6. App is live op https://de-leertuin-van-vincent.vercel.app/
         ↓
7. iPhone PWA toont nieuwe content (pull-to-refresh of heropen)
```

\---

## Note-structuur

### Nederlands (primair)

Bestandsnaam: `Conceptnaam.md`
Voorbeeld: `Entropie.md`

### Engels

Bestandsnaam: `Conceptnaam.en.md`
Voorbeeld: `Entropie.en.md`

De `.en.md` versie moet **exact dezelfde bestandsnaam** hebben als de Nederlandse versie, met `.en.md` als extensie. Het build-script koppelt ze automatisch.

### Frontmatter (verplicht)

```yaml
---
type: concept
domein: filosofie | kosmologie | natuur
titel: "Naam van het concept"
status: ripe
tags: \[tag1, tag2, tag3]
bronnen: \["\[\[Bronnaam]]"]
gerelateerd: \["\[\[Ander concept]]", "\[\[Nog een concept]]"]
concept\_of\_day\_eligible: true
last\_shown: null
aangemaakt: 2026-04-14
---
```

**Belangrijke velden:**

* `status: ripe` — alleen ripe notes verschijnen in de app
* `concept\_of\_day\_eligible: true` — moet true zijn om in de rotatie te komen
* `domein` — bepaalt in welke categorie de note verschijnt en op welke dag
* `gerelateerd` — `\[\[links]]` naar andere notes, worden klikbare badges in de app

### Secties in de note (volgorde)

```markdown
# Titel

## Kern
Eén tot twee zinnen die het concept vangen.

## Uitleg
Volledige uitleg, 200-600 woorden.

## Waarom het ertoe doet
Relevantie en verbinding met het grotere geheel.

## Open vragen
- Vraag die nieuwsgierigheid wekt

\- Vraag die nieuwsgierigheid wekt

\- Vraag die nieuwsgierigheid wekt

## Verder lezen
- Auteur, \*Boek\*, Hoofdstuk: URL
- Andere bron: URL
```

De app toont deze secties in exact deze volgorde.

\---

## Rotatie-logica

De app kiest het concept van de dag op basis van:

|Dag|Domein|
|-|-|
|Maandag|Filosofie|
|Dinsdag|Kosmologie|
|Woensdag|Natuur|
|Donderdag|Filosofie|
|Vrijdag|Kosmologie|
|Zaterdag|Natuur|
|Zondag|Willekeurig|

Binnen een domein: het concept met de oudste `last\_shown` wordt gekozen (null = nog nooit getoond = hoogste prioriteit). `last\_shown` wordt bijgehouden in localStorage op het apparaat.

\---

## Bronnen (sources)

De vault heeft vaste bronnen per domein. Source-notes staan in `vault/sources/`.

### Filosofie

|Bron|Auteur|Type|Gratis?|
|-|-|-|-|
|A History of Western Philosophy|Bertrand Russell|Boek (PDF)|Ja|

### Kosmologie / Natuurkunde

|Bron|Auteur|Type|Gratis?|
|-|-|-|-|
|Six Easy Pieces|Richard Feynman|Boek (online)|Ja (Caltech)|
|Cosmos|Carl Sagan|Boek (PDF)|Ja|
|The Biggest Ideas in the Universe|Sean Carroll|Videoserie|Ja (YouTube)|
|BBC-documentaires + boeken|Jim Al-Khalili|Video/boek|Deels (YouTube)|

### Natuur / Ecologie

|Bron|Auteur|Type|Gratis?|
|-|-|-|-|
|The Garden Jungle|Dave Goulson|Boek|Nee|
|Entangled Life|Merlin Sheldrake|Boek|Ja (Archive.org)|

\---

## Tweetaligheid

De app heeft een taalschakelaar (NL/EN). Het build-script zoekt Engelse content in deze volgorde:

1. **`.en.md` bestand** — als `vault/concepts/Entropie.en.md` bestaat, gebruik dat
2. **`translations/cache.json`** — eerdere vertalingen via `npm run translate`
3. **Nederlandse content** — als er geen Engelse versie is, toont de app het Nederlands

### Nieuwe notes: altijd NL + EN aanleveren

Elke concept-note wordt aangeleverd als twee bestanden:

```
Entropie.md        ← Nederlands
Entropie.en.md     ← Engels
```

Beide gaan in `vault/concepts/`. Het build-script herkent `.en.md` automatisch en koppelt het aan de Nederlandse versie.

\---

## Nieuwe content toevoegen

### Via Claude (standaard workflow)

1. Vraag Claude: "Maak 9 nieuwe notes" (of een ander aantal)
2. Claude levert `.md` en `.en.md` bestanden
3. Download de bestanden
4. Kopieer naar `vault/concepts/`:

```cmd
   copy "%USERPROFILE%\\Downloads\\\*.md" "vault\\concepts\\"
   ```

5. Source-notes (indien meegeleverd) → `vault/sources/`
6. Open GitHub Desktop → Commit + Push
7. Vercel bouwt automatisch opnieuw (1-2 minuten)
8. Refresh de app op je iPhone

### Zelf schrijven in Obsidian

1. Kopieer `vault/templates/concept.md`
2. Vul frontmatter in (minimaal: type, domein, titel, status, tags)
3. Begin met `status: seed` tijdens het schrijven
4. Wanneer klaar: zet op `status: ripe` en `concept\_of\_day\_eligible: true`
5. Maak optioneel een `.en.md` versie
6. Commit + Push

### Wat Claude nodig heeft bij het schrijven

Claude schrijft notes direct op `status: ripe` met:

* Kruisverbanden (`\[\[links]]`) naar bestaande en nieuwe notes
* Bronvermelding in "Verder lezen" met directe URL's
* Content gebaseerd op de vaste bronnen (Russell, Feynman, Sagan, Carroll, Al-Khalili, Goulson, Sheldrake)

Je hoeft niet te specificeren:

* Dat het in het Engels ook moet (gebeurt automatisch)
* Welke bronnen te gebruiken (de vaste set is bekend)
* Het format (frontmatter, secties, etc.)

\---

## Obsidian-tips

### Vault openen

Obsidian → Open folder as vault → `C:\\Users\\vinc\_\\De Leertuin van Vincent\\vault`

### Handige plugins (optioneel)

* **Dataview** — live query's over je notes (bv. alle seed-notes tonen)
* **Graph View** (ingebouwd) — visualiseer kruisverbanden tussen notes
* **Templates** (ingebouwd) — snel nieuwe notes maken vanuit templates

### Dataview voorbeeld: alle seed-notes

````
```dataview
TABLE status, domein
FROM "concepts"
WHERE status = "seed"
SORT file.mtime DESC
```
````

\---

## GitHub Desktop workflow

1. Open GitHub Desktop
2. Repository: **De-Leertuin-van-Vincent** (staat linksboven)
3. Links zie je gewijzigde bestanden
4. Onderaan links:

   * **Summary**: korte beschrijving (bv. "Add 9 concept notes")
   * Klik **Commit to main**
5. Rechtsboven: klik **Push origin**
6. Klaar — Vercel bouwt automatisch

\---

## Vercel

* **Dashboard:** https://vercel.com (inloggen via GitHub)
* **Project:** De-Leertuin-van-Vincent
* **Root Directory:** `app`
* **Auto-deploy:** elke push naar `main` triggert een nieuwe build
* **Build-tijd:** 1-2 minuten
* **URL:** https://de-leertuin-van-vincent.vercel.app/

### Bij problemen

* Vercel dashboard → Deployments → klik op laatste deployment → zie build-log
* Meest voorkomende fout: een note met ongeldige frontmatter (missende velden, YAML-fout)

\---

## PWA op iPhone

### Installeren

1. Open Safari → ga naar de Vercel-URL
2. Tik op deel-icoon (vierkant met pijl omhoog)
3. Scroll → "Zet op beginscherm"
4. Bevestig

### Updaten na nieuwe deploy

* Safari cache kan oud zijn: sluit PWA volledig af (swipe weg), heropen
* Bij hardnekkige cache: Instellingen → Safari → Wis websitegegevens → herinstalleer PWA

\---

## Mappenstructuur voor bestanden van Claude

Bij het downloaden van bestanden uit een Claude-gesprek:

```
vault/concepts/     ← alle .md en .en.md concept-notes
vault/sources/      ← source-notes (boeken, videoseries)
vault/people/       ← personen (filosofen, wetenschappers)
vault/MOCs/         ← Maps of Content
vault/CLAUDE.md     ← bij updates van het schema
```

\---

## Snelle referentie

|Actie|Hoe|
|-|-|
|Nieuwe notes toevoegen|Download → `vault/concepts/` → Commit + Push|
|App bekijken|https://de-leertuin-van-vincent.vercel.app/|
|Vault openen|Obsidian → vault-folder|
|Deploy-status checken|vercel.com → project → deployments|
|Taalschakelaar|In de app: NL/EN toggle|
|Ander concept bekijken|"Toon ander concept"-knop in de app|
|Alle concepten browsen|"Verken alle concepten" link in de app|



