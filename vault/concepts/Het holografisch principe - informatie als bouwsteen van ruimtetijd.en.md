---
type: concept
domein: fysica
titel: "The holographic principle - information as building block of spacetime"
status: ripe
tags: [holography, AdS-CFT, Maldacena, Bekenstein-Hawking, Ryu-Takayanagi, quantum-gravity, emergent-spacetime, Van-Raamsdonk]
bronnen: ["[[Quantum Gravity - Rovelli]]", "[[The Black Hole War - Susskind]]", "[[Something Deeply Hidden - Carroll]]"]
gerelateerd: ["[[Quantum gravity and its various programmes - the search for unified physics]]", "[[The end of a black hole - why evaporation need not be a mystery]]", "[[Entanglement - the non-classical connection unique to quantum physics]]", "[[Quantum field theory - particles as ripples and the emergence of fundamental properties]]", "[[Time in quantum theory - parameter observable or emergent property]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-07-02
---

# The holographic principle - information as building block of spacetime

## Core
The **holographic principle** states that all information needed to describe a physical system in a given volume of spacetime can be fully encoded on the surface enclosing that volume — not as a convenient computational trick but as fundamental equivalence. A gravity theory in d+1 dimensions and a quantum field theory without gravity in d dimensions can be each other's **dual descriptions**: two languages for exactly the same reality. The idea arose in the 1990s from careful analyses of **black hole thermodynamics** — specifically from the fact that the entropy of a black hole scales with the area of its horizon, not with its volume. Gerard 't Hooft (1993) and Leonard Susskind (1995) speculated that this was a fundamental feature of quantum gravity. Juan Maldacena's paper of 1997 provided the first concrete realisation: the **AdS/CFT correspondence**, an explicit duality between string theory on a five-dimensional anti-de Sitter space and a specific four-dimensional conformal field theory. Since then holography has emerged as a central tool that addresses multiple apparently separate problems simultaneously — the [[The end of a black hole - why evaporation need not be a mystery|black hole information paradox]], strongly coupled quantum systems, the nature of [[Entanglement - the non-classical connection unique to quantum physics|entanglement]] as building block of spacetime, and possibly the cosmological constant. For our real universe (de Sitter, not anti-de Sitter), however, the correct holographic formulation remains an open problem. Holography is no completed theory but is one of the most important paradigm shifts in fundamental theoretical physics of the past half century.

## Explanation
The holographic principle is perhaps the most stunning idea modern theoretical physics has produced. At first sight it sounds like a stunt from a science fiction story — the universe as hologram, three-dimensional reality encoded on a two-dimensional surface. But on careful analysis it turns out to be no speculation but a mathematically precise structure that provably works in specific situations. And what it says about the nature of space, time and information is indeed as radical as it sounds.

**From black hole entropy to holography.**

The origin lies in the 1970s, in work on the thermodynamics of black holes by Jacob Bekenstein and Stephen Hawking. They showed that a black hole has a specific **entropy** — a measure of the number of microscopic configurations corresponding to a macroscopic system. For ordinary objects, entropy scales with **volume** — a larger box can contain more microscopic configurations than a smaller box of the same material. For black holes this does not hold. The Bekenstein-Hawking entropy is:

$$S = \frac{A}{4\ell_P^2}$$

where $A$ is the area of the event horizon and $\ell_P$ is the Planck length. Double the radius of a black hole, and the entropy becomes four times as large — not eight times, as volume scaling would predict.

This was puzzling. Why would the information content of a black hole be determined by its **area** rather than its volume? And, more urgently: if a black hole is the most compact object you can make in a given region (add more mass and the black hole grows), then the Bekenstein-Hawking formula gives a **fundamental upper bound** on the information content of every region — a bound that scales with **area**.

This became known as the **Bekenstein bound**. It says that in no region can you store more information than fits on its area boundary, measured in Planck-length units. For a region the size of a human head this bound is approximately $10^{69}$ bits — astronomically much, but finite. And more crucially: the bound scales with **area**, not volume.

In 1993 Gerard 't Hooft, a Dutch physicist who had earlier won a Nobel Prize for work on gauge theories, made the conceptual leap. If the information content of every volume is bounded by its area, then all physics in that volume could in principle be encoded on the surface. He speculated that this was a fundamental feature of quantum gravity — the **holographic principle**.

Leonard Susskind took up this idea in 1995 and further developed it. He argued that it was not just a bound but a structural truth: that our three-dimensional reality has in a sense a lower-dimensional description that is equivalent. Susskind was explicit that this went against intuition — it "feels" as if there could be more in a volume than can be encoded on its surface — but he argued that quantum gravity compels us to abandon this intuition.

But these were still speculations. No one had an explicit example of two theories that could provably be shown to be each other's dual descriptions. That changed two years later.

**Maldacena's breakthrough.**

In November 1997 Juan Maldacena, then thirty years old, published a paper titled "The Large N Limit of Superconformal Field Theories and Supergravity". Within a few years it became one of the most cited papers in the history of theoretical physics.

What Maldacena delivered was a specific, mathematically precise example of holographic duality. He showed that **type IIB string theory on a five-dimensional anti-de Sitter (AdS) space** multiplied by a five-dimensional sphere is mathematically equivalent to a specific **four-dimensional conformal field theory** — namely $\mathcal{N}=4$ super-Yang-Mills with SU(N) gauge group — that "lives" on the boundary of the AdS space.

This has become known as the **AdS/CFT correspondence**. AdS stands for anti-de Sitter — a specific type of spacetime with negative cosmological constant and a specific curved geometry. CFT stands for conformal field theory — a quantum field theory with scale invariance. One side is a five-dimensional gravitational theory; the other side is a four-dimensional non-gravitational theory. Both describe the same physical system.

What "mathematically equivalent" here means is precise: there is a **dictionary** that translates every computation in one theory to a computation in the other. Every quantum state in the gravitational theory corresponds to a quantum state in the CFT. Every observable in one has a specific counterpart in the other. The partition functions of both theories are equal. Correlation functions on one side determine scattering amplitudes on the other.

For the first time we had a concrete, explicit, mathematically precise example of the holographic principle. Not speculation but a working duality in which we could work out both sides and see that they are indeed equivalent.

**What holography means for physics.**

The impact of AdS/CFT was enormous and quickly spread across various subfields. Several remarkable results have emerged that have each changed our understanding of physics.

**Ryu-Takayanagi formula.** Shinsei Ryu and Tadashi Takayanagi discovered in 2006 that in AdS/CFT the **entanglement entropy** of a subregion on the boundary CFT corresponds to the **area** of a specific minimal surface in the bulk AdS anchored to that subregion. In formula: $S_{\text{entanglement}} = A_{\text{minimal}}/4G_N$. This is no small result. It connects two apparently completely different quantities — an information-theoretic quantity (entanglement entropy) and a geometric quantity (area) — in a mathematically precise way. It suggests that entanglement and geometry are in a fundamental way the same thing.

**Van Raamsdonk and emergent spacetime.** Mark Van Raamsdonk published in 2010 an influential paper in which he argued that the Ryu-Takayanagi relation must be understood as something deeper: that **spacetime itself is built up from entanglement**. When you gradually reduce the entanglement between various subregions of the boundary CFT in AdS/CFT, the corresponding bulk spacetime literally falls apart. Connectedness of spacetime regions is entanglement of their corresponding quantum degrees of freedom.

This has substantially changed the direction of modern quantum gravity research. Instead of trying to quantise spacetime, more and more researchers are looking at how spacetime can **emerge** from quantum information structures. The question is no longer "how do we quantise spacetime?" but "from which quantum structure does classical spacetime emerge?"

**Strongly coupled systems.** Many interesting quantum field theories are strongly coupled — they do not lend themselves to treatment via ordinary perturbation theory. Examples are QCD at low energy, strongly correlated electron systems in condensed matter physics, and the quark-gluon plasma produced in heavy-ion accelerators. AdS/CFT gives an unexpected tool: study the gravitational dual theory, where weakly coupled calculations can be performed.

This has led to satisfactory quantitative predictions for the **viscosity** of the quark-gluon plasma. The holographic prediction — that the viscosity/entropy ratio has a specific universal lower bound of $\eta/s \geq \hbar/(4\pi k_B)$ — turned out to agree well with experiment. This was a remarkable prediction, because it came from gravitational calculations applied to a purely non-gravitational system.

**The black hole information paradox.** Stephen Hawking had argued in 1976 that black holes could destroy information — if they evaporated via Hawking radiation, then the outgoing radiation would be thermal and thus contain no information about what fell into the black hole. This conflicted with the fundamental quantum mechanical principle of unitarity.

In 2019-2020 this paradox was substantially resolved via what are called **replica wormholes** — a calculation using holographic ideas to reproduce the so-called Page curve (a specific predicted evolution of information flow from an evaporating black hole). The calculation was technically intricate but conceptually revolutionary: information escapes from a black hole via subtle non-local correlations that are only visible when you correctly execute the holographic description. This is one of the clearest examples where holographic ideas have directly led to substantial progress on one of the most persistent problems in theoretical physics.

**The cosmological constant.** A more recent example. Hertzberg and Wilczek showed in 2022 that the holographic calculation of the vacuum energy via Bekenstein-Hawking entropy of the Hubble horizon yields a stunningly good prediction — only a factor 1.14 different from the observed value, compared with the 120 orders of magnitude mismatch of the naive calculation from standard quantum field theory. This suggests that the cosmological constant may be a **holographic output** rather than a fundamental parameter.

## The great open question: de Sitter holography

Here currently lies the most important open problem. Our real universe is **not** anti-de Sitter. Cosmological observations (supernovae, CMB) show that our universe is asymptotically de Sitter — with positive cosmological constant and accelerating expansion. The AdS/CFT technique does not work directly for de Sitter spacetimes, because the geometric structure is fundamentally different. Anti-de Sitter has one time-like boundary on which you can define a CFT; de Sitter has two spatial boundaries (future and past infinity) on which the standard formulation is not applicable.

Various approaches try to address this:

**dS/CFT correspondence**, proposed by Andrew Strominger in 2001, postulates a Euclidean CFT on the future spatial infinity of de Sitter. Mathematically elegant but the CFT would have to be non-unitary, which is conceptually uncomfortable. Recent work (Dey et al. published in JHEP May 2025) continues to refine this picture.

**Static-patch holography** focuses on the static part of de Sitter that one observer can see — the region within the cosmological horizon. Work by Susskind and others from 2021 explores this direction, with interesting results on entanglement and chaos in this context.

**dS/dS correspondence** proposes a duality between a (d+1)-dimensional de Sitter and a d-dimensional de Sitter. Works for some aspects but leaves much open.

**Codimension-two approaches** and **surface/state correspondence** try to formulate holography on codimension-two surfaces instead of the standard boundary — a technical generalisation that opens new avenues for de Sitter.

None of these gives a fully satisfactory answer. De Sitter holography remains one of the most important open questions of the field, and it is directly relevant to understanding our real universe.

## Other extensions and the current state

Besides de Sitter holography, research moves in multiple directions simultaneously.

**Flat-space holography** seeks holographic duals for asymptotically flat spacetimes. Our local universe, outside the influence of cosmological expansion, is approximately flat, so this is directly relevant for describing e.g. black hole interactions in our universe. Recent work uses "celestial CFT" techniques that try to define messages on the "sky sphere" at infinity.

**Precision holography.** AdS/CFT has grown from a conceptual duality into a calculation machine with increasingly precise predictions. Work from 2024 uses conformal bootstrap techniques, supersymmetric localisation, integrability and number theory to calculate sub-leading terms in scattering amplitudes with great precision. This makes AdS/CFT one of the most active subfields in formal theoretical physics.

**Quantum information as key.** Perhaps the most important general development is the recognition that quantum information theory is central to understanding gravity. Ryu-Takayanagi, entropy bounds, complexity geometry, "ER=EPR" (the speculation that entanglement and wormholes are the same phenomenon) — all these ideas connect gravity to information in ways that were unthinkable ten years ago. Many theorists believe that the ultimate theory of quantum gravity will in essence be a **theory of quantum information**, with geometry and gravity as emergent phenomena.

**Other holographic structures.** Boundary-CFT (BCFT) holography handles situations with physical boundaries. Brane-world holography connects holography to extra-dimensional models. TT̄-deformations produce new kinds of dualities extending the standard CFT structure. Each of these approaches generates its own insights and further expands the holographic programme.

## Why this matters
Holography is more than a specific theory or calculation technique. It represents a paradigm shift in how we look at fundamental physics. Before 1997 we thought that gravity and quantum field theory were two structurally different kinds of descriptions that somehow had to be brought together. After 1997 we know that they, at least for specific situations, are already the same description — only differently formulated. This changes the way we look at virtually every problem in quantum gravity. Philosophically the most radical implication may be the reversal of our understanding of space. Classically we thought that space is a fundamental arena in which things take place — a background to which all other physics is attached. Holography suggests that space itself is **emergent** from deeper-lying quantum information structures. What we experience as geometry — distances, areas, volumes — turns out to consist in a fundamental way of entanglement patterns between quantum degrees of freedom without spatial form. This fits nicely into the broader pattern we keep recognising in the Leertuin: fundamental properties that on closer analysis turn out to be built up from deeper-lying relations. As we developed in the essay [[What is a force - a meditation on relational fields|"What is a force"]], at each layer of modern physics less "something" is a thing and more a relation. Space follows the same pattern. It is no container in which things sit; it is an emergent appearance of how things are entangled to each other. Practically, holography is the most successful tool for research into quantum gravity we have. It has led to substantial progress on the [[The end of a black hole - why evaporation need not be a mystery|black hole information paradox]], on understanding strongly coupled systems that were otherwise inaccessible, on possible solutions to the cosmological constant problem. It is no definitive theory of quantum gravity — we do not have that yet — but it may be the most important specific breakthrough on the way there. For those who want to understand the broader direction of modern theoretical physics, understanding of holography is probably indispensable.

## Open questions
- How do we formulate holography for our real universe (asymptotically de Sitter)? Despite many proposals there is no consensus or definitive construction. This may be the most important open question in the whole field.
- Is holography truly universal? AdS/CFT works beautifully for anti-de Sitter, but the generalisation to other spacetimes is unclear. Some theorists suspect that holography is a specific feature of AdS and cannot simply be extended to other geometries.
- What is the status of "bulk reconstruction"? To what extent can the physics of the bulk spacetime be reconstructed from boundary data alone? Work on entanglement wedge reconstruction gives increasingly precise answers, but some aspects (such as behind black hole horizons) remain subtle.
- If spacetime is emergent from entanglement, what then is the "backgroundless" level from which it arises? The boundary CFT in AdS/CFT is itself a theory living on a specific background spacetime. A truly backgroundless formulation of holography has not yet been found.

## Further reading
- Juan Maldacena (1997), "The Large N Limit of Superconformal Field Theories and Supergravity", *Advances in Theoretical and Mathematical Physics* — the paper that introduced AdS/CFT
- Leonard Susskind, *The Black Hole War* (2008) — accessible historical account of how black hole thermodynamics led to holography, written by one of the architects
- Gerard 't Hooft (1993), "Dimensional Reduction in Quantum Gravity", arXiv:gr-qc/9310026 — the paper that formulated the holographic principle
- Mark Van Raamsdonk (2010), "Building up spacetime with quantum entanglement", *General Relativity and Gravitation* — influential paper on spacetime as emergent from entanglement
- Shinsei Ryu and Tadashi Takayanagi (2006), "Holographic Derivation of Entanglement Entropy from AdS/CFT", *Physical Review Letters* — the original Ryu-Takayanagi paper
- Sean Carroll, *Something Deeply Hidden* (2019) — accessible exposition of holographic ideas in the context of quantum gravity
- Netta Engelhardt and Geoffrey Penington, review papers on recent developments (including replica wormholes and the black hole information paradox)
