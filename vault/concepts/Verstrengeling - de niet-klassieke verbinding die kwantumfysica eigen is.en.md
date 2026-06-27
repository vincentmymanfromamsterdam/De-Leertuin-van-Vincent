---
type: concept
domein: fysica
titel: "Entanglement - the non-classical connection unique to quantum physics"
status: ripe
tags: [entanglement, Bell-states, EPR-paradox, non-locality, quantum-information, monogamy]
bronnen: ["[[Biggest Ideas - Carroll]]", "[[Speakable and Unspeakable in Quantum Mechanics - Bell]]"]
gerelateerd: ["[[Quantum field theory - particles as ripples and the emergence of fundamental properties]]", "[[Decoherence and the transition from quantum to classical]]", "[[Chance in nature - intrinsic uncertainty and what it means]]", "[[The measurement problem and its interpretations - why a definite outcome does not automatically follow]]", "[[Quantum gravity and its various programmes - the search for unified physics]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-06-02
---

# Entanglement - the non-classical connection unique to quantum physics

## Core
**Entanglement** is the property that two or more quantum systems can form one joint state that cannot be factorised into separate states of the components. When two particles are entangled, neither possesses fully defined properties individually — these arise only in correlation with their partner. Einstein called this "spooky action at a distance" and used it in 1935 (with Podolsky and Rosen) as argument against the completeness of quantum mechanics. John Bell showed in 1964 that precisely the opposite position is correct: entanglement is no shortcoming but a fundamentally non-classical property of nature, and no local hidden-variables theory can explain it. Entanglement is no exotic border phenomenon but the common quantum source behind many other phenomena: it drives [[Decoherence and the transition from quantum to classical|decoherence]] through coupling with the environment, it makes the [[The measurement problem and its interpretations - why a definite outcome does not automatically follow|measurement problem]] subtle, it makes quantum teleportation and quantum computing possible, and it plays — in recent theoretical developments — a central role as building block for [[Quantum gravity and its various programmes - the search for unified physics|spacetime itself]].

## Explanation
When Erwin Schrödinger introduced the word "Verschränkung" in 1935 — translated as "entanglement" — he wrote that it was "not one but the characteristic trait of quantum mechanics". It is a remarkably strong statement, and nearly a century later it still proves justified. Entanglement is what fundamentally distinguishes quantum physics from classical physics, deeper than superposition alone, and deeper than uncertainty alone. It is the specific way in which quantum systems can be correlated with each other in a manner that classical science cannot reproduce.

**The basic idea.**

In classical physics two particles are either independent (each with own properties) or correlated through a common cause (a specific prior history determines both). In both cases you can fully describe the state of each particle separately, and correlations are then properties of the pair.

Quantum systems know a third possibility. Two particles can be in a joint state that **cannot** be written as a product of separate states of the components. Mathematically: for an entangled state $|\Psi\rangle$ of particles A and B there is no way to write $|\Psi\rangle = |\psi_A\rangle \otimes |\psi_B\rangle$. The state exists only as a whole; the parts have no independent description.

The simplest example is a Bell state. Imagine two particles, each with a property that can take only two values (say "spin up" or "spin down", or horizontally versus vertically polarised light). The Bell state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$ describes a pair in which both particles are either both in state 0, or both in state 1. But **which** of these two possibilities is true is not fixed before measurement — the state is a superposition of both.

Here it becomes remarkable. When you measure particle A, you get randomly either "0" or "1" with 50% probability each. But as soon as you have measured particle A, it is immediately fixed what particle B will yield on measurement — if A gave "0", B also gives "0"; if A gave "1", B gives "1". The particles are perfectly correlated, regardless of how far apart they are.

**Why this cannot be classical correlation.**

The obvious question is: perhaps the particles already have hidden values before measurement, and we just don't know them? Perhaps the pair is prepared in a specific configuration — both "0" or both "1" — and measurement only reveals which. That is a local hidden-variables explanation, and it is precisely what Einstein, Podolsky and Rosen argued in their famous EPR paper of 1935. According to them, entangled correlations show that quantum mechanics is **incomplete** — there must be extra variables explaining the apparent non-locality via pre-existing values.

John Bell showed in 1964 that this position is mathematically untenable. He formulated what we now call the **Bell inequalities**: specific statistical constraints on correlations between measurements at different angles, that every local hidden-variables theory must respect. Quantum mechanics predicts violation of these inequalities under certain measurement configurations; local hidden variables mathematically exclude such violation.

The experimental work that followed — Alain Aspect in 1982, many others afterwards, and the loophole-free tests of 2015 by Hensen et al. and others — has unambiguously shown that nature **violates** Bell inequalities, exactly as quantum mechanics predicts. Aspect, Clauser and Zeilinger received the Nobel Prize in 2022 for this work. The conclusion is empirically overwhelming: there are no local hidden variables that can explain entangled correlations. Entanglement is a truly non-classical phenomenon.

**What entanglement is not.**

Before we proceed, several confusions worth clearing up.

Entanglement permits no **superluminal communication**. When Alice measures her particle on earth and Bob measures his on the moon, Alice cannot send a message to Bob by varying her measurement choice. From Bob's perspective he just sees random outcomes with 50/50 statistics, regardless of what Alice does. Only when they **compare** their results via classical communication (telephone, internet) do they see the correlations. No information travels faster than light; correlations only become visible in the joint analysis afterwards.

Entanglement requires no physical **medium** transmitting the correlation. There is no "entanglement field" flowing between the particles. The correlation is a property of the joint quantum state, not of something travelling between the particles. This is what makes it feel "spooky" — there is no mechanism we can point to that transmits information between the particles.

Entanglement is not a "connection" that can be "cut". When two particles become entangled (for example through a common preparation) and are then separated, they remain entangled as long as neither interacts with other systems. When they decohere through environmental interaction, the original entanglement is **replaced** by entanglement with the environment, not destroyed. This is precisely why decoherence makes the immediate entanglement between the original pair invisible without abolishing the fundamental quantum nature.

**How entanglement arises.**

Entanglement always arises through **interaction**. Two independent particles become entangled when they interact in a way that brings their joint state to a non-factorisable configuration. Examples:

A spontaneous parametric down-conversion process in a non-linear crystal: a UV photon is converted into two infrared photons, and the momentum and energy conservation laws force the two outgoing photons into an entangled polarisation state. This is how virtually all modern Bell experiments produce their entangled pairs.

Decay of an unstable particle into two secondary particles: a pi meson decaying into two photons produces entangled photons via energy and momentum conservation.

Collision of two initially independent particles: after every quantum interaction the outgoing particles are typically in an entangled state with each other.

Adiabatic preparation in an atom trap or superconducting qubit array: controlled manipulation can produce specific entangled states on demand, forming the basis of quantum computing.

**Monogamy of entanglement.**

A remarkable property is **monogamy of entanglement** — a mathematical theorem stating that if particle A is fully entangled with particle B, then A cannot also be fully entangled with particle C. Entanglement can be shared, but not without reduction. For two parties entanglement can be maximal; for three or more parties it becomes complex and the total "entanglement budget" is limited.

This sounds abstract but has deep consequences. It is one of the reasons quantum cryptography is secure: if Eve tries to eavesdrop by sharing entanglement with the communication, that necessarily lowers the entanglement between Alice and Bob, and Alice and Bob can detect this. It is also why the black-hole information paradox was subtly resolved in 2019-2020 — the "monogamy puzzle" of Hawking radiation touched precisely on this limitation, and the resolution required accepting entanglement with topologically non-trivial spacetime geometries (replica wormholes).

**Entanglement as source of other phenomena.**

Many quantum phenomena discussed in our other notes have entanglement as common underlying mechanism.

[[Decoherence and the transition from quantum to classical|Decoherence]] is in essence entanglement with the environment. When a quantum system in superposition interacts with thermal photons, air molecules, or other environmental elements, it becomes entangled with those elements. Information about which "branch" of the superposition is real leaks to the environment, and interference between branches becomes impossible. The macroscopically classical appearance emerges from this entanglement with enormously many undetailable environmental degrees of freedom.

The [[The measurement problem and its interpretations - why a definite outcome does not automatically follow|measurement problem]] is fundamentally about entanglement between the measured system and the detector system. The Schrödinger equation predicts that detector and measured system end in a joint entangled state with multiple "outcomes" simultaneously encoded. How this entangled superposition transitions into one observed outcome is precisely where the various interpretations diverge.

**Recent theoretical developments** in quantum gravity suggest that entanglement might even be the **building block of spacetime**. Mark Van Raamsdonk's work from 2010 argues that the connectivity of spacetime regions just is their quantum entanglement, and that spacetime falls apart when that entanglement disappears. This would mean that entanglement, once seen as a spooky curiosity, is actually the most fundamental building block of reality, with classical spacetime as emergent property.

## Why this matters
Entanglement is perhaps the best example of how quantum physics challenges our classical intuitions in a specific, technically precise way. It is no mystical mystery — the mathematics is clear, the experiments are definitive, and the properties are precisely characterised. But the implications are radically different from what classical physics suggests. Two particles can form one coherent state whose parts have no independent description. Correlations between distant measurements can be stronger than any classical hidden-variables theory can reproduce. Information leaks to the environment not through a specific "leak mechanism" but through automatic entanglement that nature produces on interaction. All this is empirically overwhelmingly confirmed, and it is a fundamental part of how nature works. The importance of entanglement reaches beyond interpretive questions to concrete practical applications. Quantum computing rests on controlled entanglement between qubits. Quantum cryptography uses entanglement monogamy as security mechanism. Quantum teleportation — transferring an unknown quantum state from A to B without measuring the state itself — uses entanglement as resource. And recent theoretical developments in quantum gravity suggest that entanglement might be the fundamental building block of reality itself, with classical spacetime as emergent macroscopic appearance. All this makes entanglement what Schrödinger already suspected in 1935: not one but THE characteristic trait of quantum physics.

## Open questions
- What is the exact relation between entanglement and non-locality? Entanglement permits no superluminal communication, but Bell tests show it cannot be explained by local hidden variables. Whether this should be interpreted as "real" non-locality, or as something subtler (a form of holistic correlation going beyond local-versus-non-local), remains philosophically open.
- Can entanglement be used to "construct" spacetime as Van Raamsdonk's programme suggests, and if so, what is the fundamental level from which spacetime then emerges? AdS/CFT gives an explicit example for anti-de Sitter space, but our universe is de Sitter-like, and the corresponding holographic description is much less understood.
- How much entanglement is there in the universe? The total "entanglement budget" of the cosmic system is an interesting quantity that in principle could be relevant for entropy questions, dark-energy puzzles, and the nature of spacetime itself.

## Further reading
- John Bell, *Speakable and Unspeakable in Quantum Mechanics* (1987) — collected papers by Bell himself, including the original 1964 paper
- Anton Zeilinger, *Dance of the Photons* (2010) — accessible description of Bell tests and their experimental execution by the Nobel laureate
- Albert Einstein, Boris Podolsky, Nathan Rosen (1935), "Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?", *Physical Review* — the original EPR paper that began the debate
- Tim Maudlin, *Quantum Non-Locality and Relativity* (2011) — philosophically precise analysis of what Bell tests really show
- Mark Van Raamsdonk (2010), "Building up spacetime with quantum entanglement", *General Relativity and Gravitation* — recent influential paper on entanglement as building block of spacetime
- Nicolas Gisin, *Quantum Chance* (2014) — popularly written explanation of entanglement with focus on experimental aspects
