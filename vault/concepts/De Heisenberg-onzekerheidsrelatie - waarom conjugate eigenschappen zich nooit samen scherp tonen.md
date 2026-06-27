---
type: concept
domein: fysica
titel: "De Heisenberg-onzekerheidsrelatie - waarom conjugate eigenschappen zich nooit samen scherp tonen"
status: ripe
tags: [onzekerheidsrelatie, Heisenberg, Fourier, conjugate-variabelen, kwantum-fundamenten, commutator]
bronnen: ["[[Biggest Ideas - Carroll]]", "[[The Feynman Lectures on Physics - Feynman]]"]
gerelateerd: ["[[Kwantumveldtheorie - deeltjes als ripples en de emergentie van fundamentele eigenschappen]]", "[[Toeval in de natuur - intrinsieke onzekerheid en wat ze betekent]]", "[[Het meetprobleem en zijn interpretaties - waarom een definitieve uitkomst niet vanzelf volgt]]", "[[Verstrengeling - de niet-klassieke verbinding die kwantumfysica eigen is]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-06-02
---

# De Heisenberg-onzekerheidsrelatie - waarom conjugate eigenschappen zich nooit samen scherp tonen

## Kern
De **Heisenberg-onzekerheidsrelatie**, geformuleerd in 1927, stelt dat bepaalde paren fysische eigenschappen — zogenoemde **conjugate variabelen** — fundamenteel niet tegelijk willekeurig scherp gedefinieerd kunnen zijn. Het bekendste voorbeeld is positie en impuls: hoe nauwkeuriger je de positie van een deeltje kent, hoe minder nauwkeurig zijn impuls kan zijn gedefinieerd, en omgekeerd. Wiskundig: $\Delta x \cdot \Delta p \geq \hbar/2$. Deze relatie wordt vaak verkeerd uitgelegd als een gevolg van **meet-verstoring** — alsof de meting van positie het deeltje "duwt" en zijn impuls verstoort. Dat is misleidend. De onzekerheidsrelatie is geen praktische beperking maar een **fundamentele eigenschap** van de natuur: het deeltje heeft simpelweg geen tegelijkertijd scherp gedefinieerde positie en impuls. De relatie volgt direct uit de wiskundige structuur van kwantum-toestanden als golffuncties en de Fourier-relaties tussen positie- en impulsruimte. Ze generaliseert naar willekeurige paren observabelen die niet commuteren, en ze heeft diepe gevolgen voor wat het betekent voor een fysisch systeem om "eigenschappen te hebben" — sommige eigenschappen bestaan eenvoudig niet als gelijktijdig welbepaalde grootheden.

## Uitleg
In 1927 publiceerde Werner Heisenberg, toen 25 jaar oud, een paper dat één van de meest verkeerd begrepen ontdekkingen van de kwantummechanica zou worden. Zijn "onzekerheidsrelatie" wordt vaak gepresenteerd als een soort meet-praktische beperking — een gevolg van het feit dat we kleine deeltjes alleen kunnen meten door ze met andere deeltjes te raken, wat hun toestand verstoort. Heisenberg gebruikte zelf een microscoop-voorbeeld: om de positie van een elektron te zien, moet je het belichten met een foton, en dat foton draagt impuls over die het elektron afbuigt. Hoe scherper je de positie wilt meten, hoe energetischer het foton moet zijn, hoe meer impuls je verstoort.

Deze "meet-storing"-interpretatie is intuïtief aantrekkelijk en niet helemaal fout — ze beschrijft een aspect van wat er gebeurt — maar ze mist het diepere punt. De onzekerheidsrelatie geldt **ook voor systemen die niet worden gemeten**. Ze gaat niet over de praktische beperkingen van meetapparatuur maar over wat het betekent voor een kwantum-systeem om eigenschappen te hebben.

**Het correcte verhaal.**

In kwantummechanica wordt een systeem beschreven door een **golffunctie** $\psi$. Deze golffunctie kan worden bekeken in verschillende "representaties" — als functie van positie ($\psi(x)$), als functie van impuls ($\tilde{\psi}(p)$), enzovoorts. De truc is dit: de positie-representatie en de impuls-representatie zijn niet onafhankelijk; ze zijn verbonden door een **Fourier-transformatie**.

Dit is geen technische subtiliteit. Het is een fundamenteel feit over wat een kwantum-toestand is. Een toestand met een scherp gedefinieerde positie is wiskundig een Dirac-delta-functie in $\psi(x)$ — een oneindig scherpe piek op één punt. Wanneer je deze Fourier-transformeert naar impuls-representatie, krijg je een **volledig vlakke** functie — alle impulswaarden zijn gelijk waarschijnlijk. Een toestand met scherpe positie heeft dus per definitie volledig onbepaalde impuls.

Omgekeerd: een toestand met scherp gedefinieerde impuls is een vlakke golf in $\psi(x)$ — uitgesmeerd over alle posities. Een scherpe impuls betekent per definitie volledig onbepaalde positie.

Voor alle tussenliggende gevallen — een Gaussische golfpakket met een redelijke positie-spreiding $\Delta x$ en impuls-spreiding $\Delta p$ — toont de Fourier-wiskunde dat het product gebonden is van onderaf: $\Delta x \cdot \Delta p \geq \hbar/2$. Je kunt de positie nauwkeuriger maken, maar alleen ten koste van bredere impuls-spreiding; je kunt de impuls nauwkeuriger maken, maar alleen ten koste van bredere positie-spreiding.

**Waarom dit fundamenteel is, niet praktisch.**

Het cruciale punt is dat deze relatie geldt voor **elke** golffunctie, ongeacht of er een meting plaatsvindt. Een vrij elektron dat door de ruimte beweegt heeft op elk moment een specifieke kwantum-toestand met specifieke $\Delta x$ en $\Delta p$, en hun product respecteert altijd de Heisenberg-grens. Geen meting hoeft te worden uitgevoerd om dit te laten gelden. Het is geen praktische beperking maar een eigenschap van de kwantum-toestanden zelf.

Dit verklaart waarom verschillende formuleringen van de meet-storing-interpretatie verkeerd zijn. Een veelgehoorde misvatting is bijvoorbeeld dat een nauwkeurige positie-meting de impuls verstoort door fysisch in te grijpen. Maar de onzekerheidsrelatie geldt al **voordat** een meting wordt uitgevoerd. Het deeltje heeft simpelweg geen tegelijk scherp gedefinieerde positie en impuls — die eigenschappen bestaan niet allebei tegelijk in de fysische werkelijkheid van een kwantum-systeem.

Dit is filosofisch radicaler dan het lijkt. In klassieke fysica heeft een deeltje altijd een specifieke positie en specifieke impuls, ook al kennen wij ze niet. In kwantummechanica heeft een deeltje in het algemeen **geen** specifieke positie en impuls tegelijk; deze eigenschappen zijn niet onafhankelijk welbepaald. Ze ontstaan pas als specifieke waarden bij meting, en zelfs dan in beperkte mate van scherpte.

**Algemene formulering: commutatoren.**

De Heisenberg-relatie voor positie en impuls is een specifiek geval van een algemenere wiskundige structuur. Voor twee observabelen $\hat{A}$ en $\hat{B}$ geldt:

$$\Delta A \cdot \Delta B \geq \frac{1}{2}|\langle [\hat{A}, \hat{B}]\rangle|$$

Hierin is $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$ de **commutator** van de twee observabelen. Wanneer twee observabelen commuteren ($[\hat{A}, \hat{B}] = 0$), is hun product onbeperkt — ze kunnen tegelijk willekeurig scherp gedefinieerd zijn. Wanneer ze niet commuteren ($[\hat{A}, \hat{B}] \neq 0$), bestaat er een onzekerheidsrelatie tussen hen.

Voor positie en impuls geldt $[\hat{x}, \hat{p}] = i\hbar$, en de onzekerheidsrelatie wordt $\Delta x \cdot \Delta p \geq \hbar/2$ zoals hierboven. Voor spin-componenten in verschillende richtingen geldt $[\hat{S}_x, \hat{S}_y] = i\hbar \hat{S}_z$, wat betekent dat je nooit alle drie spin-componenten tegelijk scherp kunt definiëren — een feit dat we in de [[Spin en het Pauli-uitsluitingsprincipe - waarom materie stabiel is]]-note verder uitwerken. Voor energie en tijd geldt een verwante relatie $\Delta E \cdot \Delta t \geq \hbar/2$, hoewel de tijd-onzekerheid subtieler is omdat tijd in kwantummechanica geen gewone observable is.

**Praktische gevolgen.**

De onzekerheidsrelatie heeft concrete, meetbare gevolgen overal in de fysica.

**De stabiliteit van atomen.** Een elektron dat oneindig dicht bij de atoomkern zou worden gepost, zou een oneindig precieze positie hebben. Volgens Heisenberg betekent dat oneindig onzekere impuls — en dus oneindig grote kinetische energie. Het kost dus energie om een elektron in een kleine ruimte te beperken. Dit "kinetische energie van opsluiting" balanceert de elektrostatische aantrekking tot de kern, en levert de specifieke minimum-grootte van atomen op (de Bohr-straal van ongeveer 0.5 Ångström voor waterstof). Zonder Heisenberg zouden atomen instorten; elektrons zouden in de kern vallen.

**De diepte van potentiaal-putten.** Een deeltje in een potentiaal-put kan niet stilstaan op de bodem (klassieke minimum-energie) omdat dat scherpe positie én scherpe impuls (nul) zou betekenen. Het minimum-energie van een kwantum-systeem is altijd boven de klassieke minimum — dit heet **nulpuntsenergie** en is empirisch meetbaar in talloze contexten, van moleculaire vibraties tot het Casimir-effect.

**Tunnelling.** Onzekerheid in positie laat deeltjes "verschijnen" op plekken waar ze klassiek niet mogen komen — door potentiaal-barrières heen die hun energie strict verbiedt te overwinnen. Dit verklaart radioactief alpha-verval, kernfusie in sterren, en de werking van moderne halfgeleider-elektronica.

**Spectraal-lijnenverbreding.** Aangeslagen atomen vervallen in een eindige tijd. Een eindige levensduur $\Delta t$ impliceert via $\Delta E \cdot \Delta t \geq \hbar/2$ een spreiding in foton-energie $\Delta E$ bij verval. Spectraallijnen zijn nooit volledig scherp; hun natuurlijke breedte volgt uit Heisenberg.

**Een illustratie uit het dagelijks leven.**

De Heisenberg-relatie heeft enorme implicaties op atomair niveau maar wordt onmerkbaar op macroscopisch niveau, omdat $\hbar = 1.055 \times 10^{-34}$ J·s extreem klein is. Voor een voetbal met massa 0.5 kg en positie-onzekerheid van 1 mm: $\Delta p \geq \hbar/(2\Delta x) \approx 5 \times 10^{-32}$ kg·m/s, wat correspondeert met snelheidsonzekerheid van $10^{-31}$ m/s. Volkomen onmeetbaar.

Maar voor een elektron in een atoom (massa $9.1 \times 10^{-31}$ kg) met positie-onzekerheid van 1 Ångström: $\Delta v \approx 10^{6}$ m/s — een aanzienlijke fractie van de lichtsnelheid. Op atomaire schaal is Heisenberg geen subtiel effect maar een dominante factor.

**De relatie met meten — een laatste nuancering.**

Het is waar dat metingen ook **storingen** kunnen produceren, en dat deze storingen ook door Heisenberg-achtige relaties worden beperkt. Ozawa en anderen hebben in de jaren 2000 verfijnde meet-onzekerheidsrelaties geformuleerd die expliciet onderscheiden tussen de "intrinsieke" Heisenberg-onzekerheid van een toestand en de "meet-storing" die een specifieke meting bovendien produceert. Deze twee zijn verschillend maar verwant; ze hebben beide hun eigen wiskundige inkleding.

Voor onze doeleinden is de scherpere onderscheiding deze: de oorspronkelijke Heisenberg-relatie zegt iets over hoe **kwantum-toestanden** eruitzien, ongeacht meting. De meet-onzekerheidsrelaties (Ozawa, anderen) zeggen iets over wat er gebeurt **tijdens** een specifieke meting. Beide bestaan, beide zijn echt, en ze versterken elkaar — maar ze gaan over verschillende dingen.

## Waarom het ertoe doet
De onzekerheidsrelatie verandert wat het betekent voor een fysisch systeem om "eigenschappen te hebben". In klassieke fysica heeft elk deeltje altijd een specifieke positie, specifieke impuls, specifieke energie, specifieke spin-component-in-elke-richting, enzovoorts — onze onwetendheid is alleen praktisch. In kwantummechanica is dit beeld onhoudbaar. Niet alle eigenschappen bestaan tegelijk als welbepaalde grootheden; sommige bestaan alleen in superpositie met hun conjugate alternatieven, en bij meting wordt slechts één aspect scherp terwijl het andere uitsmeert. Dit is geen tekortkoming van onze theorieën maar een eigenschap van werkelijkheid op kwantum-schaal. Filosofisch is dit een diepgaande verschuiving. Klassieke metafysica veronderstelde dat een object al zijn eigenschappen op elk moment heeft, of we ze nu kennen of niet. Kwantum-metafysica eist dat sommige eigenschappen alleen bestaan in correlatie met meting — ze hebben geen definitieve waarde tot ze worden bepaald, en de bepaling van één eigenschap kan de andere eigenschap fundamenteel onbepaald maken. Dit raakt aan vragen over realisme, eigenschappen, en wat het betekent voor "iets te bestaan" op een manier die in klassieke fysica niet ter sprake kwam. Praktisch is de relatie het wiskundig fundament voor enorme delen van moderne technologie. Halfgeleiders, lasers, MRI-scanners, atoomklokken — allemaal werken ze omdat de onzekerheidsrelatie de specifieke beperkingen oplegt die deze fenomenen mogelijk maken. Zonder Heisenberg zouden atomen instorten, zouden chemische bindingen niet stabiel zijn, en zou de hele structuur van materie er anders uitzien. Het is niet een rare bijzonderheid van de microscopische wereld; het is een diepe wet die de werkelijkheid op alle schalen beïnvloedt, hoewel haar gevolgen alleen op kleine schaal direct zichtbaar zijn.

## Open vragen
- Hoe verhoudt de onzekerheidsrelatie zich tot kwantum-gravity? Op Planck-schaal lijkt zowel de positie-onzekerheid als de impuls-onzekerheid van betekenis te veranderen; sommige programma's voorspellen een "minimale lengte" of "gegeneraliseerde onzekerheidsrelaties" die de standaard-Heisenberg op extreme energieën aanpassen.
- Is de onzekerheidsrelatie fundamenteel of emergent? In meest werelden-interpretaties is ze een eigenschap van hoe takken splitsen; in objectieve-collapse-theorieën is ze een direct gevolg van de wiskundige structuur; in Bohmiaanse mechanica is ze een statistische eigenschap van de "verborgen" deeltje-banen. Welke interpretatie het meest fundamenteel is, raakt direct aan de betekenis van Heisenberg.
- Hoe interageert de onzekerheidsrelatie met informatie-theoretische concepten als entropie en complexiteit? Werk van de afgelopen twee decennia in kwantum-informatie-theorie verbindt onzekerheidsrelaties met entropische principes en gegeneraliseerde meting-protocollen, in manieren die nieuwe inzichten geven over de aard van kwantum-kennis.

## Verder lezen
- Werner Heisenberg (1927), "Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik", *Zeitschrift für Physik* — het oorspronkelijke paper dat de relatie introduceerde
- David Albert, *Quantum Mechanics and Experience* (1992) — uitstekende filosofische uiteenzetting van wat de onzekerheidsrelatie wel en niet zegt
- Sean Carroll, *Something Deeply Hidden* (2019) — toegankelijke uitleg van Heisenberg in context van veel-werelden-interpretatie
- Masanao Ozawa (2003), "Universally valid reformulation of the Heisenberg uncertainty principle", *Physical Review A* — moderne verfijning van Heisenberg's relatie met expliciete behandeling van meet-storing
- Richard Feynman, *The Feynman Lectures on Physics*, vol. III, hoofdstuk 1 — toegankelijke uitleg met dubbel-spleet-context en heldere demystificatie
