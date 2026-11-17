---
type: concept
domein: fysica
titel: "Time in quantum theory - parameter observable or emergent property"
status: ripe
tags: [time, Page-Wootters, Wheeler-DeWitt, relational-time, thermal-time, quantum-gravity, emergent-time]
bronnen: ["[[Biggest Ideas - Carroll]]", "[[The Order of Time - Rovelli]]", "[[Quantum Gravity - Rovelli]]"]
gerelateerd: ["[[The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together]]", "[[Entanglement - the non-classical connection unique to quantum physics]]", "[[Quantum gravity and its various programmes - the search for unified physics]]", "[[Quantum field theory - particles as ripples and the emergence of fundamental properties]]", "[[The measurement problem and its interpretations - why a definite outcome does not automatically follow]]", "[[Augustine and the inward turn - time memory and the seeking soul]]"]
concept_of_day_eligible: true
last_shown: null
aangemaakt: 2026-06-02
---

# Time in quantum theory - parameter observable or emergent property

## Core
Time has a **fundamentally different status** in quantum theory than space, energy or other physical quantities. Where the latter are represented by operators whose eigenvalues are possible measurement outcomes, time appears in the Schrödinger equation as an **external parameter** — a label imposed on the system from outside, not a property the system itself possesses. Wolfgang Pauli proved in 1933 that a time operator with the desired properties cannot mathematically exist within standard quantum mechanics. This is fine as long as we treat quantum systems against a fixed classical background, but it conflicts directly with general relativity, where time is a dynamical coordinate of the spacetime field itself. When we try to unify both theories — as in the **Wheeler-DeWitt equation** of 1967 — time literally disappears from the fundamental description: the "wave function of the universe" satisfies a time-independent equation, which is the notorious "problem of time" in quantum gravity. Various programmes offer possible solutions: the **Page-Wootters mechanism** of 1983 shows that time can arise from quantum entanglement between subsystems; **relational time** (Rovelli) sees time as correlation between changes without fundamental background time; **thermal time** (Connes-Rovelli) derives time from specific quantum states via Tomita-Takesaki modular flow. Recent experiments (Moreva 2014) and theoretical extensions (Favalli 2022, Kuypers-Rijavec 2025) suggest that time may be as emergent from deeper quantum structure as spacetime itself in the holographic approach — a deep convergence of programmes around the idea that the continuous time in which our experience plays out, may not be a fundamental dimension but an appearance of fundamentally different underlying physics.

## Explanation
When we talk about quantum mechanics, we usually do so in terms that leave the special status of time unnoticed. We speak of "the state of a particle at time t" or "the evolution of a wave function in time" without wondering where that time actually comes from. This hides a deep puzzle that only becomes visible when we try to unify quantum mechanics and general relativity. Time, it turns out, is not as self-evident as it seems.

**Time as parameter, not as observable.**

In the Schrödinger formulation of quantum mechanics, the state of a system is described by a **wave function** $\psi(x, t)$, depending on both position and time. What is the difference between these two variables here?

Position you can measure. There exists a position operator $\hat{x}$ whose eigenvalues are the possible positions. When you perform a position measurement, you get a specific outcome, and the state changes accordingly. The same holds for momentum, energy, spin — all **observables** corresponding to operators whose eigenvalues are measurable quantities.

Time is different. There is no time operator $\hat{t}$ in standard quantum mechanics. Time is a **parameter** — an external label saying at what moment we look at the system. You cannot perform a "time measurement" on a quantum system the way you perform a position or energy measurement. There is no apparatus that gives "pointer to t = 3.14 seconds" as outcome of a measurement on the system itself. Time comes from outside: we read it off a clock that we treat as classical, and use that value to parametrise the quantum evolution.

This difference is more than a technical subtlety. It reflects a fundamental asymmetry in how quantum theory is built up. Space is quantised; time is not. For low-energy physics this asymmetry works fine — we can do quantum experiments, test predictions, and everything fits. But conceptually it remains a peculiar feature that comes into conflict with deeper theories.

**Pauli's theorem.**

Why can there be no time operator? Wolfgang Pauli proved in 1933 a mathematical result explaining this. His argument runs roughly as follows. Suppose a time operator $\hat{T}$ would exist, conjugate to the Hamiltonian $\hat{H}$ (which generates energy). For position and momentum $[\hat{x}, \hat{p}] = i\hbar$ holds, and analogously should hold $[\hat{T}, \hat{H}] = i\hbar$. But Pauli showed that such a relation is incompatible with the fact that $\hat{H}$ is bounded from below — energy has a minimum (the ground state), while a conjugate variable must be coupled to an unbounded counterpart. Since atoms cannot infinitely decay to lower energy levels (there is a floor), $\hat{H}$ cannot be unbounded below, and $\hat{T}$ as conjugate variable cannot exist.

This "Pauli theorem" shows that time is structurally different from other physical quantities. It is not just that we treat time differently because it is convenient; it is mathematically necessary within the standard formulation.

**The energy-time uncertainty relation.**

What then about the well-known energy-time uncertainty relation $\Delta E \cdot \Delta t \geq \hbar/2$? This relation does exist and has empirical consequences (such as the natural width of spectral lines we discussed in the [[The Heisenberg uncertainty relation - why conjugate properties never show themselves sharply together|Heisenberg note]]). But its interpretation is subtler than is often presented.

For position and momentum, $\Delta x \cdot \Delta p \geq \hbar/2$ is a real conjugate-variables relation: both are observables, and their product is bounded from below. For energy and time this is not the same story. Since time is no observable, $\Delta t$ here has a different meaning. The modern interpretation, developed especially by Mandelstam and Tamm in 1945, sees $\Delta t$ as the **characteristic time scale** over which an expectation value noticeably changes. A state with sharply defined energy has simple phase evolution and changes "slowly" noticeably; a state with large energy spread changes "quickly". The relation says something about **rate of change**, not about a fundamental time uncertainty.

This is not only technical. It is a signal that time in quantum mechanics plays a fundamentally different role than other variables, and that our classical intuitions — "I know when something happens with a certain precision" — cannot be directly projected onto the quantum world.

**The conflict with general relativity.**

Here the tension with Einstein's relativity becomes acute. In general relativity time is no external parameter but a **dynamical coordinate** of the spacetime field. Time elapses differently at different places (gravitational time dilation, as GPS satellites experience), time bends with mass-energy, and time is structurally interwoven with space into one spacetime continuum that itself evolves.

We have therefore two fundamentally irreconcilable conceptions.

In **quantum mechanics** time is a fixed external parameter, universal, the same for all systems, no observable, and clearly different from space.

In **general relativity** time is a locally varying coordinate of the spacetime field, dependent on the gravitational context, in principle as "dynamical" as space itself, and treated on equal footing with space via Lorentz invariance.

How to unify these two is one of the central problems on which [[Quantum gravity and its various programmes - the search for unified physics|quantum gravity researchers]] are working. It is no marginal problem; it touches on the most fundamental structure of modern physics.

**The Wheeler-DeWitt equation and the problem of time.**

In 1967 John Wheeler and Bryce DeWitt formulated an attempt to quantise general relativity via the standard procedure that works for other theories. The result was striking: the **wave function of the universe** $\Psi$ satisfies an equation without time dependence:

$$\hat{H}|\Psi\rangle = 0$$

Literally a time-independent equation. Not $i\hbar \partial_t \Psi = \hat{H} \Psi$ as in standard quantum mechanics, but just $\hat{H} \Psi = 0$. The total Hamiltonian of the universe, including gravity, gives zero when it acts on the state of the universe.

This seems absurd — we clearly experience time? — but it follows directly from the mathematics when you try to quantise what in relativity is a **diffeomorphism-invariant** theory. In general relativity time translations are merely coordinate transformations, not real physical changes. When you treat that quantum mechanically, time disappears as an independent parameter; the state does not "evolve" in a background time, because there is no background time in a diffeomorphism-invariant theory.

This is the famous "problem of time" in quantum gravity, and it has cost enormous intellectual effort to understand over the past fifty years. Various programmes offer different solutions.

**Page-Wootters: time from entanglement.**

One of the most influential proposals came in 1983 from Don Page and William Wootters. Their idea: if the universe as a whole is timeless, how do we experience time? The answer lies in **quantum entanglement**.

Imagine the universe as divided into two subsystems: a "clock" and the "rest". When these two are entangled, an external observer (god-like, outside the universe) sees a static entangled whole without evolution. But for an **internal observer**, who is part of the "rest" and can see the clock reading, an effective time evolution arises when you condition on the clock reading.

Mathematically: given an entangled state $|\Psi\rangle = \sum_t |t\rangle_{\text{clock}} \otimes |\phi(t)\rangle_{\text{rest}}$, the rest sees a state $|\phi(t)\rangle$ that depends parametrically on the clock reading $t$. When the clock readings "tick" through different values, the rest appears to evolve through different states — precisely what we experience as time evolution. And this conditioned evolution satisfies, as Page and Wootters showed, the ordinary Schrödinger equation.

The crucial point: time arises here **from entanglement**, not from a fundamental time coordinate. For the entire universe there is no time; for subsystems time arises from their correlations with other subsystems.

This proposal remained for decades mainly theoretical, but in 2014 Ekaterina Moreva and colleagues at INRIM in Turin performed an experimental realisation. They used a pair of entangled photons, one of which served as "clock". When they viewed the state of the whole system from an external perspective, no evolution was visible; when they conditioned on the "clock" photon, they saw time evolution of the "rest" photon emerge. The first experimental confirmation that time can indeed emerge from entanglement, insofar as you can see a small system as toy model of the universe.

Recent work has substantially extended the Page-Wootters mechanism. Tommaso Favalli and Augusto Smerzi published in 2022 a model where not only time but also space emerges from entanglement in a globally "timeless and positionless" universe. Sebastian Gemsheim and Jan Rost (2023) showed how the mechanism works even when clock and environment interact strongly — an extension that makes the programme more realistic. Sam Kuypers and Simone Rijavec published in September 2025 a paper in *Physical Review D* on measuring time in a timeless universe, further elaborating the mechanism into concrete experimental protocols.

**Relational time (Rovelli).**

Carlo Rovelli, one of the main architects of loop quantum gravity, offers a related but different perspective. For Rovelli time is not so much "derived from entanglement" as **fundamentally relational**. What we call "time" is not an entity in itself but the **correlated change** between different systems — clocks, planets, falling stones, tired people.

In his book *L'ordine del tempo* (2017, translated as *The Order of Time*) Rovelli develops this perspective philosophically. We see no "time"; we see a mountain that does not move, a falling leaf, a ticking clock. What we call time is the network of correlations between these changes. When we say "the leaf falls in 2 seconds", we actually mean "between the beginning and the end of the falling, the second-hand ticks twice".

For Rovelli this is no philosophical curiosity but a direct consequence of general relativity and quantum mechanics. Both theories, in their deepest structure, know no absolute background time. What we experience as universal time is a macroscopic appearance of billions of correlated local changes.

**Thermal time: Tomita-Takesaki and Connes-Rovelli.**

A more technical but deeply beautiful development comes from operator algebra. The **Tomita-Takesaki theorem** shows that a quantum state naturally defines its own time evolution — the so-called **modular flow**. What is remarkable is that this time arises from the state itself, not from an external clock.

Alain Connes and Carlo Rovelli formulated in 1994 on this basis the "thermal time hypothesis": what we experience as universal time is perhaps just the modular flow of the specific (low-entropy, expanding) quantum state in which our universe finds itself. Time is not more fundamental than the state; it is a property of how specific states pass themselves on.

This proposal also connects time with **thermodynamics** in a natural way. The direction of time — why past is different from future — is classically associated with entropy increase (the second law). In the thermal time hypothesis this association is no accident but deeply anchored: time and thermodynamics are two aspects of the same underlying quantum structure. A timeless fundamental reality produces a time arrow when it finds itself in specific (non-equilibrium) states.

**Time in quantum evolution itself.**

Besides these more fundamental questions, it is important what time does within standard quantum evolution. Here we can be more concrete.

The Schrödinger equation $i\hbar \partial_t |\psi\rangle = \hat{H} |\psi\rangle$ describes a **deterministic** evolution of quantum states in time. Given an initial state and the Hamiltonian, you can calculate the state at any later time exactly. Important: this evolution is **reversible**. You can in principle turn the time around (provided you also complex conjugate), and the original state is recovered. There is no time arrow baked into the basic evolution.

Energy plays a special role here: it is the **generator** of time evolution. A system with sharply defined energy undergoes only phase evolution ($|\psi(t)\rangle = e^{-iEt/\hbar}|\psi(0)\rangle$), which gives no observable changes. A system with energy superposition does evolve observably — different components oscillate with different phase rates, producing interference patterns that change with time. This explains the energy-time relation without time itself needing to be an observable.

**The arrow of time comes from elsewhere.**

When then does an arrow of time arise? As we discussed in the [[The measurement problem and its interpretations - why a definite outcome does not automatically follow|measurement problem note]] and the [[Decoherence and the transition from quantum to classical|decoherence note]], this is not through the basic evolution but through **decoherence** and the **cosmological** initial conditions of the universe.

Decoherence is practically irreversible — not because of a fundamental time arrow in the laws, but because reconstructing entanglement correlations between billions of environmental degrees of freedom is statistically impossible. And the universe began in a remarkably low-entropy state (just after the Big Bang), which determines the direction in which entropy increases. Both together give us the felt "flow" of time.

What we experience as universal clock-like time is thus composed of various layers: emergent from quantum entanglement at the most fundamental level (Page-Wootters), structured by specific states via modular flow (Connes-Rovelli), directed by decoherence and cosmological initial conditions (entropy increase), and macroscopically observable as correlation between changing systems (Rovelli's relational time). None of these layers gives time as fundamental dimension of reality; together they build up something resembling the continuous flow we classically took for granted.

## Why this matters
Our classical intuition about time — a steadily flowing river in which all events take place — proves on closer inspection untenable as fundamental description of reality. Modern physics suggests that time, like spacetime itself, may be emergent from deeper quantum structure. This changes not only our technical description of nature but also our metaphysical intuitions. Augustine's famous question "What is time? When no one asks me I know it; but when someone asks me to explain it, I do not know" gains in this light a new dimension. We know "what time is" in macroscopic sense because we recognise it in our experience, but on closer physical analysis it turns out to consist of layers of emergent phenomena without a deepest foundation. Philosophically this is a radical turn. Classical metaphysics took time as given background, a container in which events take place. Quantum foundations suggest that time itself is a property of specific configurations — entanglement patterns, states of the universe, cosmological histories. There is no "real time" behind the relations we experience as time; there are only those relations. This touches on questions philosophers have been asking for millennia, but now with empirical support from fundamental physics. Practically this is less pressing — for low-energy physics and everyday physics standard quantum mechanics with external time parameter continues to work fine. But for the most fundamental questions about the nature of reality — what spacetime is, how the universe began, what black-hole singularities mean — our conventional view of time can no longer be maintained. Whether we will ever have a definitive theory in which time emerges satisfactorily from fundamental structure is an open question, but the various proposals — Page-Wootters, relational time, thermal time, emergent spacetime via holography — are starting to converge in surprising ways. Time, it turns out, may be the most emergent phenomenon in modern physics.

## Open questions
- How does the Page-Wootters mechanism relate to the actual cosmological time we experience? The mechanism works beautifully for toy models, but the extension to realistic cosmological scenarios requires treatment of many more degrees of freedom and possibly spacetime emergence simultaneously. Work by Favalli and colleagues from 2022 makes progress in this direction but is far from complete.
- Is "time" in all the various emergent-time programmes the same concept? Page-Wootters, relational time, thermal time and holographic spacetime emergence all arrive at the idea that time is not fundamental, but whether they all refer to the same thing or to different aspects of a related underlying structure is unclear.
- What does this mean for the human experience of time? Our phenomenological experience of flowing time, memory of past, anticipation of future, is clearly macroscopically and cosmologically structured. But whether the specific quantum-emergence mechanisms explain anything about **why** time is experienced this way, or only about how time arises as physical quantity, is an open question at the crossroads of physics and philosophy of consciousness.

## Further reading
- Don Page and William Wootters (1983), "Evolution without evolution: Dynamics described by stationary observables", *Physical Review D* — the original paper that introduced the mechanism
- Carlo Rovelli, *L'ordine del tempo* (2017, translated as *The Order of Time*) — accessible philosophical work on time from a relational perspective
- Carlo Rovelli, *Quantum Gravity* (2004) — more technical elaboration of relational quantum mechanics and loop quantum gravity
- Alain Connes and Carlo Rovelli (1994), "Von Neumann algebra automorphisms and time-thermodynamics relation in generally covariant quantum theories", *Classical and Quantum Gravity* — the original paper on thermal time
- Ekaterina Moreva et al. (2014), "Time from quantum entanglement: An experimental illustration", *Physical Review A* — first experimental realisation of Page-Wootters
- Tommaso Favalli and Augusto Smerzi (2022), "A model of quantum spacetime", arXiv:2207.01005 — extension of Page-Wootters to emergent 3+1 spacetime
- Sebastian Gemsheim and Jan Rost (2023), "The emergence of time from quantum interaction with the environment", arXiv:2309.05159 — derivation of time-dependent Schrödinger equation from static total state
- Claus Kiefer, *Quantum Gravity* (4th edition 2024) — comprehensive textbook with good treatment of the problem of time
