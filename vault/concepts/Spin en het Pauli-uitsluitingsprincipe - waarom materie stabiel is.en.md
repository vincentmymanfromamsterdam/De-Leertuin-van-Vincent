---
type: concept
domein: fysica
titel: "Spin and the Pauli exclusion principle - why matter is stable"
status: ripe
tags: [spin, Pauli-exclusion, fermions, bosons, spin-statistics, intrinsic-angular-momentum, atomic-structure]
bronnen: ["[[Biggest Ideas - Carroll]]", "[[The Feynman Lectures on Physics - Feynman]]"]
gerelateerd: ["[[Quantum field theory - particles as ripples and the emergence of fundamental properties]]", "[[The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together]]", "[[Entanglement - the non-classical connection unique to quantum physics]]", "[[Neutrinos - three light particles possibly a heavy counterpart and the seesaw elegance]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-06-02
---

# Spin and the Pauli exclusion principle - why matter is stable

## Core
**Spin** is a fundamental quantum property without classical counterpart. It is a form of intrinsic angular momentum that every fundamental particle species possesses, regardless of their state of motion. An electron has spin 1/2, a photon spin 1, the Higgs boson spin 0, the hypothetical graviton spin 2. On the basis of their spin value, all particles divide into two fundamentally different categories: **fermions** (half-integer spin: 1/2, 3/2, ...) and **bosons** (integer spin: 0, 1, 2, ...). Wolfgang Pauli discovered in 1925 that fermions have a striking property: no two fermions can be in **exactly the same quantum state**. This **Pauli exclusion principle** is responsible for virtually all structure in the material world — it explains why atoms have different electron shells and why the periodic table works, why matter does not collapse on itself, why white dwarfs and neutron stars are stable, and why chemical bonds are possible. Bosons, on the other hand, have the opposite tendency: they like to stack in the same state, which makes phenomena like lasers and Bose-Einstein condensates possible. The deep relation between spin and this statistical property — the **spin-statistics theorem** — was proven in 1940 by Pauli himself and is one of the most fundamental results of relativistic quantum field theory.

## Explanation
When people first hear about spin, they often get the metaphor of a spinning ball. The particle has "angular momentum", so imagine that it rotates about its own axis. This metaphor is **deeply misleading** and has been lamented by physics teachers for over ninety years. Spin is not rotation. An elementary particle is — as far as we know — a point object without extent, and a point object cannot spin like a ballerina. Spin is a fundamental quantum property that historically got this name because it mathematically resembles classical angular momentum, but physically it is something else and deeper.

**What spin really is.**

Spin is a form of **intrinsic angular momentum** that particles possess without having to move or rotate. It manifests in measurable ways — a charged particle with spin has a magnetic moment, and a beam of such particles is split into discrete components by an inhomogeneous magnetic field (the famous Stern-Gerlach experiment of 1922).

Importantly, spin is **quantised**. Every fundamental particle has a specific spin value characteristic of its species. An electron always has spin 1/2 (in units of $\hbar$). You cannot make a "half-electron" with spin 1/4, or a "double-electron" with spin 1. Spin is a fixed label value, baked into what a particle fundamentally is.

When we measure spin along a chosen axis (say the z-axis), we get for a spin-1/2 particle only two possible outcomes: $+\hbar/2$ or $-\hbar/2$. Not 0, not anywhere in between — only these two values. We call them respectively "spin up" and "spin down", but these are just labels. What we have really measured is the discrete outcome of a measurement procedure that can only yield two values.

The [[Entanglement - the non-classical connection unique to quantum physics|entanglement]] phenomenon is often experimentally studied with spin-1/2 particles. A pair of electrons in a Bell state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|\uparrow\uparrow\rangle + |\downarrow\downarrow\rangle)$ shows that their spins are correlated in a fundamentally non-classical way.

**Spin and the uncertainty relation.**

A remarkable property follows from the [[The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together|Heisenberg uncertainty relation]] applied to spin. The spin components in different directions ($\hat{S}_x$, $\hat{S}_y$, $\hat{S}_z$) do not commute — they are mutually **conjugate variables**. When you sharply define $\hat{S}_z$ (for example through measurement), $\hat{S}_x$ and $\hat{S}_y$ become completely undefined.

This means an electron never has a completely well-defined spin vector in 3D sense. It has a sharp spin component in one direction at a time; the other components are in superposition. Classically you would expect a spinning top to have a specific rotation axis with sharp components in all three directions. Quantum spin behaves differently: you can only sharply measure one component at a time.

**Fermions versus bosons.**

The deep division of all particles into two fundamental classes follows from their spin value.

**Fermions** have half-integer spin (1/2, 3/2, 5/2, ...). Electrons, protons, neutrons, quarks, and all leptons fall in this category. All material particles — everything we call "matter" — are fermions.

**Bosons** have integer spin (0, 1, 2, ...). Photons (spin 1), gluons (spin 1), W and Z bosons (spin 1), the Higgs boson (spin 0), and the hypothetical graviton (spin 2) fall in this category. All force-mediating particles are bosons.

This distinction is no accidental sorting. It directly relates to how multiple identical particles behave among themselves, and to the fundamental structure of quantum field theory.

**The Pauli exclusion principle.**

In 1925, one year before formal quantum mechanics was formulated, Wolfgang Pauli discovered a striking feature of fermions. He was studying atomic spectra and realised he could only explain the observed patterns by assuming that **no two electrons can be in exactly the same quantum state**.

For electrons in an atom, a quantum state is characterised by four numbers: the principal quantum number $n$ (energy level), the angular momentum quantum number $\ell$ (orbital shape), the magnetic quantum number $m_\ell$ (orbital orientation), and the spin quantum number $m_s$ (spin up or down). Pauli's rule: no two electrons in the same atom can have all these four numbers the same.

This seems at first sight an arbitrary rule, but it is anything but. The **Pauli exclusion principle** is a direct consequence of the fundamental mathematical structure of fermionic wave functions. When you exchange two fermions, their joint wave function changes sign: $\psi(x_1, x_2) = -\psi(x_2, x_1)$. For two fermions in exactly the same state, this would mean $\psi = -\psi$, which can only be if $\psi = 0$ — that is, such a state does not exist.

For bosons it is the opposite: their joint wave function **does not** change sign on exchange ($\psi(x_1, x_2) = +\psi(x_2, x_1)$). Two bosons in the same state are not only allowed but even **enhanced** — bosonic statistics give a higher probability for stacked configurations than classical statistics would.

These opposite behaviours — fermions repelling each other, bosons attracting each other (in statistical sense, not via a real force) — explain a stunningly broad range of physical phenomena.

**Why matter is stable.**

The Pauli principle is essential for the stability of matter. Imagine if it didn't exist: then all electrons in every atom would fall into the lowest energy state (the 1s orbital), and all atoms would look virtually identical — a kind of hydrogen-like ball. No periodic table, no chemistry, no difference between carbon and oxygen.

Through Pauli, electrons must distribute over various quantum states. The first two electrons fill the 1s orbital (with opposite spins, since spin offers the two possible distinctions). The next eight fill the 2s and 2p orbitals. Then the 3s, 3p, and so on. The **shell structure** of atoms — which produces the periodic table, which determines chemical valence, which explains all of chemistry — follows directly from Pauli.

The principle is also why matter **does not collapse on itself**. Classically electrons should fall into the nucleus through electrostatic attraction, and the Heisenberg uncertainty prevents this only to a certain extent. But when you pack many electrons together, Pauli prevents them all from being in the lowest energy state. It thus costs enormous energy to compress matter, because you must push electrons into ever higher energy levels. This "Pauli pressure" is no electrostatic repulsion but a purely quantum phenomenon, and it is what prevents a brick from falling through your hand.

**White dwarfs and neutron stars.**

On cosmic scale, Pauli pressure has spectacular consequences. When a star without nuclear fuel collapses gravitationally, the Pauli principle for electrons can stop the collapse — this produces a **white dwarf**, a star with the mass of the sun but the size of the earth, stabilised against gravity by **electron degeneracy pressure**. Subrahmanyan Chandrasekhar calculated in 1931 the maximum mass of a white dwarf (1.4 solar masses, now called the "Chandrasekhar limit") as the boundary where electron Pauli pressure can no longer hold off gravity.

Above this limit the star collapses further into a **neutron star** — an object so dense that electrons are squeezed together with protons into neutrons, and the neutrons then provide a new Pauli pressure. A neutron star has the mass of a star but the size of a city. Above about 2-3 solar masses (the Tolman-Oppenheimer-Volkoff limit) even neutron Pauli pressure cannot resist gravity, and the star collapses into a black hole.

This is a remarkable story. Properties of electrons and neutrons measured in the laboratory — Pauli statistics, fermion nature — determine the structure and evolution of stars over billions of years. A principle discovered in 1925 on the basis of atomic spectra turns out to directly determine the cosmology of stellar end states.

**The spin-statistics theorem.**

In 1940 Pauli himself proved a deeper result: the **spin-statistics theorem**. This theorem shows that the relation between spin (half-integer versus integer) and statistics (Pauli exclusion versus Bose condensation) is no accident, but a **necessary consequence** of relativistic quantum field theory. Under the assumptions of Lorentz invariance, locality and positive energy, half-integer-spin fields **must** anti-commute (Fermi statistics) and integer-spin fields **must** commute (Bose statistics). There is no mathematically consistent theory that reverses this relation.

This is a stunning result. It connects rotational symmetries (from which spin follows) with permutation symmetries (from which statistics follow) in a deep mathematical way. It is not just that fermions form matter and bosons transmit forces — it is deeply anchored in how relativistic quantum theory can even be consistent.

**Bosonic opposite behaviour.**

For bosons the opposite tendency holds: they "want" to be in the same state. This gives a number of striking phenomena.

**Laser light** arises because photons like to step into identical states. When an excited atom emits a photon, this photon can "stimulate" other excited atoms to emit identical photons (same frequency, same direction, same phase). This stimulated emission cascades into a coherent light beam — laser, an acronym for "Light Amplification by Stimulated Emission of Radiation".

**Bose-Einstein condensates**, first experimentally realised in 1995, arise when atoms with integer spin are cooled to near absolute zero. Below a critical temperature a macroscopic fraction of the atoms "fall" into exactly the same lowest energy quantum state. The result is a macroscopic quantum state — a kind of single super-atom whose constituent atoms all oscillate in phase. This is a fundamentally different state of aggregation than solid, liquid or gas.

**Superconductivity** in metals works via a similar mechanism. Electrons (fermions) can under certain conditions come together in pairs (Cooper pairs), and these pairs behave as bosons. At low temperature they condense in a joint quantum state, whereby electrical resistance disappears.

**Superfluidity** in liquid helium-4 (a boson) at ultra-low temperature produces a fluid that flows without friction, because all atoms are in the same quantum state and move collectively.

In each of these cases bosonic statistics is the core of the phenomenon. Without the tendency of bosons to occupy the same state, none of these phenomena would be possible.

## Why this matters
Spin and the Pauli exclusion principle explain why the world looks the way it does. Atoms have their specific structure because of Pauli. The periodic table works because of Pauli. Chemistry is possible because of Pauli. Matter is stable because of Pauli — a brick does not fall through your hand because the electrons in both objects repel each other's quantum states. Stellar evolution ends in white dwarfs or neutron stars because of Pauli. Virtually every macroscopic property of matter can be traced to the fermionic nature of its constituents. It is a stunning fact that one principle — that no two fermions can be in exactly the same quantum state — determines such a broad range of reality. Philosophically interesting is that spin has no classical analogue. It is a property that can only be defined within the framework of quantum theory, and all attempts to understand it via classical metaphors (spinning balls, small magnets) produce misleading images. This is a hint that our classical intuitions fail at the most fundamental level of reality. The deepest properties of nature are not classical, and attempts to describe them in classical terms hide more than they reveal. Practically the spin-statistics dichotomy is also the basis for modern quantum technology. Semiconductor electronics works because electrons are fermions. Lasers work because photons are bosons. MRI scanners work via nuclear spin resonance. Atomic clocks work via spin transitions in atoms. Quantum computing is often realised via controlled spin states of electrons or nuclei. The careful manipulation of quantum spin is one of the most successful technological applications of fundamental physical understanding of the past century.

## Open questions
- Why do fundamental particles have exactly the spin values they have? The Standard Model postulates these values without deriving them. Whether a deeper theory explains the specific spin assignments is an open question.
- Is the spin-statistics theorem really universal, or are there extreme situations (Planck-scale physics, quantum gravity) where it can work differently? Some speculative proposals (anyons in 2D systems, "broken spin-statistics" at Planck energy) suggest modifications, but none has been experimentally confirmed.
- How does Pauli exclusion relate to information theory? Recent work in quantum information suggests that the "resistance" against equal quantum states for fermions can be connected with information-theoretic limits, in ways that give new insights into what the principle fundamentally means.

## Further reading
- Wolfgang Pauli (1925), "Über den Zusammenhang des Abschlusses der Elektronengruppen im Atom mit der Komplexstruktur der Spektren", *Zeitschrift für Physik* — the original paper that introduced the exclusion principle
- Wolfgang Pauli (1940), "The Connection Between Spin and Statistics", *Physical Review* — Pauli's own proof of the spin-statistics theorem
- Sin-Itiro Tomonaga, *The Story of Spin* (1997) — accessible historical exposition of the concept of spin by one of the architects of QED
- Sean Carroll, *The Particle at the End of the Universe* (2012) — popularly written explanation of Standard Model particles and their spin properties
- Subrahmanyan Chandrasekhar (1931), "The Maximum Mass of Ideal White Dwarfs", *Astrophysical Journal* — classic paper on how Pauli pressure determines stellar end states
- Richard Feynman, *The Feynman Lectures on Physics*, vol. III — contains accessible explanation of spin with attention to the inadequacy of the spinning-ball metaphor
