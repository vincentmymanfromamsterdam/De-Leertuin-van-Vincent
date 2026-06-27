---
type: concept
domein: fysica
titel: "The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together"
status: ripe
tags: [uncertainty-relation, Heisenberg, Fourier, conjugate-variables, quantum-foundations, commutator]
bronnen: ["[[Biggest Ideas - Carroll]]", "[[The Feynman Lectures on Physics - Feynman]]"]
gerelateerd: ["[[Quantum field theory - particles as ripples and the emergence of fundamental properties]]", "[[Chance in nature - intrinsic uncertainty and what it means]]", "[[The measurement problem and its interpretations - why a definite outcome does not automatically follow]]", "[[Entanglement - the non-classical connection unique to quantum physics]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-06-02
---

# The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together

## Core
The **Heisenberg uncertainty relation**, formulated in 1927, states that certain pairs of physical properties — so-called **conjugate variables** — cannot fundamentally be simultaneously arbitrarily sharply defined. The best-known example is position and momentum: the more precisely you know the position of a particle, the less precisely its momentum can be defined, and vice versa. Mathematically: $\Delta x \cdot \Delta p \geq \hbar/2$. This relation is often wrongly explained as a consequence of **measurement disturbance** — as though measuring position "pushes" the particle and disturbs its momentum. That is misleading. The uncertainty relation is no practical limitation but a **fundamental property** of nature: the particle simply has no simultaneously sharply defined position and momentum. The relation follows directly from the mathematical structure of quantum states as wave functions and the Fourier relations between position and momentum space. It generalises to arbitrary pairs of observables that do not commute, and it has deep consequences for what it means for a physical system to "have properties" — some properties simply do not exist as simultaneously well-defined quantities.

## Explanation
In 1927 Werner Heisenberg, then 25 years old, published a paper that would become one of the most misunderstood discoveries of quantum mechanics. His "uncertainty relation" is often presented as a kind of measurement-practical limitation — a consequence of the fact that we can only measure small particles by hitting them with other particles, which disturbs their state. Heisenberg himself used a microscope example: to see the position of an electron, you must illuminate it with a photon, and that photon transfers momentum that deflects the electron. The sharper you want to measure position, the more energetic the photon must be, the more momentum you disturb.

This "measurement disturbance" interpretation is intuitively attractive and not entirely wrong — it describes one aspect of what happens — but it misses the deeper point. The uncertainty relation holds **also for systems that are not being measured**. It is not about the practical limitations of measurement apparatus but about what it means for a quantum system to have properties.

**The correct story.**

In quantum mechanics a system is described by a **wave function** $\psi$. This wave function can be viewed in different "representations" — as function of position ($\psi(x)$), as function of momentum ($\tilde{\psi}(p)$), and so on. The trick is this: the position representation and the momentum representation are not independent; they are connected by a **Fourier transform**.

This is no technical subtlety. It is a fundamental fact about what a quantum state is. A state with sharply defined position is mathematically a Dirac delta function in $\psi(x)$ — an infinitely sharp peak at one point. When you Fourier transform this to momentum representation, you get a **completely flat** function — all momentum values are equally probable. A state with sharp position thus by definition has completely undefined momentum.

Conversely: a state with sharply defined momentum is a plane wave in $\psi(x)$ — smeared over all positions. A sharp momentum means by definition completely undefined position.

For all intermediate cases — a Gaussian wave packet with reasonable position spread $\Delta x$ and momentum spread $\Delta p$ — the Fourier mathematics shows that the product is bounded from below: $\Delta x \cdot \Delta p \geq \hbar/2$. You can make position more precise, but only at the cost of broader momentum spread; you can make momentum more precise, but only at the cost of broader position spread.

**Why this is fundamental, not practical.**

The crucial point is that this relation holds for **every** wave function, regardless of whether measurement takes place. A free electron moving through space has at every moment a specific quantum state with specific $\Delta x$ and $\Delta p$, and their product always respects the Heisenberg bound. No measurement need be performed for this to hold. It is no practical limitation but a property of quantum states themselves.

This explains why various formulations of the measurement-disturbance interpretation are wrong. A common misconception is for example that a precise position measurement disturbs momentum by physically intervening. But the uncertainty relation already holds **before** a measurement is performed. The particle simply has no simultaneously sharply defined position and momentum — these properties don't both exist simultaneously in the physical reality of a quantum system.

This is philosophically more radical than it appears. In classical physics a particle always has a specific position and specific momentum, even though we may not know them. In quantum mechanics a particle in general has **no** specific position and momentum together; these properties are not independently well-defined. They arise as specific values only on measurement, and even then in limited degree of sharpness.

**General formulation: commutators.**

The Heisenberg relation for position and momentum is a specific case of a more general mathematical structure. For two observables $\hat{A}$ and $\hat{B}$ holds:

$$\Delta A \cdot \Delta B \geq \frac{1}{2}|\langle [\hat{A}, \hat{B}]\rangle|$$

Here $[\hat{A}, \hat{B}] = \hat{A}\hat{B} - \hat{B}\hat{A}$ is the **commutator** of the two observables. When two observables commute ($[\hat{A}, \hat{B}] = 0$), their product is unbounded — they can be simultaneously arbitrarily sharply defined. When they do not commute ($[\hat{A}, \hat{B}] \neq 0$), an uncertainty relation exists between them.

For position and momentum $[\hat{x}, \hat{p}] = i\hbar$ holds, and the uncertainty relation becomes $\Delta x \cdot \Delta p \geq \hbar/2$ as above. For spin components in different directions $[\hat{S}_x, \hat{S}_y] = i\hbar \hat{S}_z$ holds, which means you can never simultaneously sharply define all three spin components — a fact we further develop in the [[Spin and the Pauli exclusion principle - why matter is stable]] note. For energy and time a related relation holds $\Delta E \cdot \Delta t \geq \hbar/2$, though the time uncertainty is subtler because time in quantum mechanics is not an ordinary observable.

**Practical consequences.**

The uncertainty relation has concrete, measurable consequences everywhere in physics.

**The stability of atoms.** An electron posted infinitely close to the atomic nucleus would have infinitely precise position. According to Heisenberg this means infinitely uncertain momentum — and thus infinitely large kinetic energy. It thus costs energy to confine an electron to a small space. This "kinetic energy of confinement" balances the electrostatic attraction to the nucleus, and yields the specific minimum size of atoms (the Bohr radius of about 0.5 Ångström for hydrogen). Without Heisenberg atoms would collapse; electrons would fall into the nucleus.

**The depth of potential wells.** A particle in a potential well cannot stand still on the bottom (classical minimum energy) because that would mean sharp position and sharp momentum (zero). The minimum energy of a quantum system is always above the classical minimum — this is called **zero-point energy** and is empirically measurable in countless contexts, from molecular vibrations to the Casimir effect.

**Tunnelling.** Uncertainty in position lets particles "appear" in places where they classically should not come — through potential barriers their energy strictly forbids them to overcome. This explains radioactive alpha decay, nuclear fusion in stars, and the working of modern semiconductor electronics.

**Spectral line broadening.** Excited atoms decay in a finite time. A finite lifetime $\Delta t$ implies via $\Delta E \cdot \Delta t \geq \hbar/2$ a spread in photon energy $\Delta E$ at decay. Spectral lines are never completely sharp; their natural width follows from Heisenberg.

**An illustration from daily life.**

The Heisenberg relation has enormous implications at atomic level but becomes imperceptible at macroscopic level, because $\hbar = 1.055 \times 10^{-34}$ J·s is extremely small. For a football with mass 0.5 kg and position uncertainty of 1 mm: $\Delta p \geq \hbar/(2\Delta x) \approx 5 \times 10^{-32}$ kg·m/s, corresponding to velocity uncertainty of $10^{-31}$ m/s. Completely unmeasurable.

But for an electron in an atom (mass $9.1 \times 10^{-31}$ kg) with position uncertainty of 1 Ångström: $\Delta v \approx 10^{6}$ m/s — a substantial fraction of the speed of light. At atomic scale Heisenberg is no subtle effect but a dominant factor.

**The relation with measurement — a final nuance.**

It is true that measurements can also produce **disturbances**, and that these disturbances are also constrained by Heisenberg-like relations. Ozawa and others have in the 2000s formulated refined measurement uncertainty relations that explicitly distinguish between the "intrinsic" Heisenberg uncertainty of a state and the "measurement disturbance" that a specific measurement additionally produces. These two are different but related; they each have their own mathematical dressing.

For our purposes the sharper distinction is this: the original Heisenberg relation says something about how **quantum states** look, regardless of measurement. The measurement uncertainty relations (Ozawa, others) say something about what happens **during** a specific measurement. Both exist, both are real, and they reinforce each other — but they are about different things.

## Why this matters
The uncertainty relation changes what it means for a physical system to "have properties". In classical physics every particle always has a specific position, specific momentum, specific energy, specific spin component in every direction, and so on — our ignorance is only practical. In quantum mechanics this picture is untenable. Not all properties exist simultaneously as well-defined quantities; some exist only in superposition with their conjugate alternatives, and on measurement only one aspect becomes sharp while the other smears out. This is no shortcoming of our theories but a property of reality at quantum scale. Philosophically this is a profound shift. Classical metaphysics assumed that an object has all its properties at every moment, whether we know them or not. Quantum metaphysics requires that some properties only exist in correlation with measurement — they have no definite value until they are determined, and the determination of one property can leave the other fundamentally undefined. This touches questions about realism, properties, and what it means for "something to exist" in a way that did not arise in classical physics. Practically, the relation is the mathematical foundation for enormous parts of modern technology. Semiconductors, lasers, MRI scanners, atomic clocks — all work because the uncertainty relation imposes specific constraints that make these phenomena possible. Without Heisenberg atoms would collapse, chemical bonds would not be stable, and the whole structure of matter would look different. It is not a strange peculiarity of the microscopic world; it is a deep law that affects reality at all scales, though its consequences are only directly visible at small scale.

## Open questions
- How does the uncertainty relation relate to quantum gravity? At Planck scale both position uncertainty and momentum uncertainty seem to change in meaning; some programmes predict a "minimum length" or "generalised uncertainty relations" that modify standard Heisenberg at extreme energies.
- Is the uncertainty relation fundamental or emergent? In many-worlds interpretations it is a property of how branches split; in objective-collapse theories it is a direct consequence of mathematical structure; in Bohmian mechanics it is a statistical property of the "hidden" particle trajectories. Which interpretation is most fundamental touches directly on the meaning of Heisenberg.
- How does the uncertainty relation interact with information-theoretic concepts like entropy and complexity? Work of the past two decades in quantum information theory connects uncertainty relations with entropic principles and generalised measurement protocols, in ways that give new insights into the nature of quantum knowledge.

## Further reading
- Werner Heisenberg (1927), "Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik", *Zeitschrift für Physik* — the original paper that introduced the relation
- David Albert, *Quantum Mechanics and Experience* (1992) — excellent philosophical exposition of what the uncertainty relation does and does not say
- Sean Carroll, *Something Deeply Hidden* (2019) — accessible explanation of Heisenberg in context of many-worlds interpretation
- Masanao Ozawa (2003), "Universally valid reformulation of the Heisenberg uncertainty principle", *Physical Review A* — modern refinement of Heisenberg's relation with explicit treatment of measurement disturbance
- Richard Feynman, *The Feynman Lectures on Physics*, vol. III, chapter 1 — accessible explanation with double-slit context and clear demystification
