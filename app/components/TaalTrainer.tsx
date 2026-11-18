'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { Word } from '@/lib/types';
import { getDomeinForDay } from '@/lib/utils';

/**
 * Taal: active vocabulary (retrieval + spaced repetition) and a daily
 * one-minute speaking exercise. All progress lives in localStorage.
 */

interface ConceptRef {
  slug: string;
  titel: string;
  domein: string;
  last_shown: string | null;
}

interface WordState {
  box: number; // 1..5
  due: string; // YYYY-MM-DD
}

interface Store {
  words: Record<string, WordState>;
  /** How many new words were introduced per day. */
  nieuw: Record<string, number>;
  /** Days on which something was practised. */
  dagen: string[];
  /** Days on which the speaking exercise was completed. */
  spreken: string[];
}

const LS_KEY = 'leertuin_taal_v1';
const NEW_PER_DAY = 5;
/** Days until the next review, per box. */
const INTERVALS = [0, 1, 3, 7, 16, 35];
const ACTIVE_BOX = 4;
const SPEAK_SECONDS = 60;

const OPDRACHTEN: Record<number, string> = {
  1: 'Leg het uit aan iemand die er niets van weet.',
  2: 'Geef de kern in één zin, dan één voorbeeld, dan waarom het ertoe doet.',
  3: 'Geef de sterkste tegenwerping en beantwoord haar.',
  4: 'Vergelijk het met een ander concept: overeenkomst, verschil, conclusie.',
  5: 'Neem een standpunt in en onderbouw het met twee argumenten.',
  6: 'Vertel het als verhaal: situatie, wending, les.',
  0: 'Wat is de open vraag hier, en waarom is ze nog niet beantwoord?',
};

const CHECKLIST = [
  'De kern stond in mijn eerste zin',
  'Ik gaf één concreet voorbeeld',
  'Ik sloot af met een duidelijke slotzin',
  'Ik gebruikte de doelwoorden',
  'Weinig stopwoorden (eh, eigenlijk, zeg maar)',
];

const sans = { fontFamily: 'system-ui, sans-serif' } as const;

function isoDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  return isoDay(new Date(y, m - 1, d + n));
}

const EMPTY: Store = { words: {}, nieuw: {}, dagen: [], spreken: [] };

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Store>) };
  } catch {
    return EMPTY;
  }
}

function saveStore(s: Store): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {
    /* private mode or full storage: practise without saving */
  }
}

function streak(dagen: string[], today: string): number {
  const set = new Set(dagen);
  let day = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(day)) {
    n += 1;
    day = addDays(day, -1);
  }
  return n;
}

/** Same choice as the home page: the note shown today, else the one due. */
function conceptOfDay(concepts: ConceptRef[], today: string): ConceptRef | null {
  if (concepts.length === 0) return null;
  const shown = (c: ConceptRef) => {
    try {
      return localStorage.getItem(`leertuin_last_shown_${c.slug}`) ?? c.last_shown;
    } catch {
      return c.last_shown;
    }
  };
  const domein = getDomeinForDay(new Date());
  const pool = domein === 'random' ? concepts : concepts.filter((c) => c.domein === domein);
  const eligible = pool.length > 0 ? pool : concepts;
  const vandaag = eligible.find((c) => shown(c) === today);
  if (vandaag) return vandaag;
  return [...eligible].sort((a, b) => {
    const da = shown(a);
    const db = shown(b);
    if (!da && !db) return 0;
    if (!da) return -1;
    if (!db) return 1;
    return da < db ? -1 : 1;
  })[0];
}

type Grade = 'niet' | 'moeite' | 'vlot';

export default function TaalTrainer({
  words,
  concepts,
  brand,
}: {
  words: Word[];
  concepts: ConceptRef[];
  brand: string;
}) {
  const [ready, setReady] = useState(false);
  const [store, setStore] = useState<Store>(EMPTY);
  const [today, setToday] = useState('');
  const [queue, setQueue] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);
  const [concept, setConcept] = useState<ConceptRef | null>(null);

  const byWord = useMemo(() => new Map(words.map((w) => [w.woord, w])), [words]);

  function buildQueue(s: Store, day: string, extraNew = 0): string[] {
    const due = words
      .filter((w) => s.words[w.woord] && s.words[w.woord].due <= day)
      .sort((a, b) => s.words[a.woord].due.localeCompare(s.words[b.woord].due))
      .map((w) => w.woord);
    const room = Math.max(0, NEW_PER_DAY - (s.nieuw[day] ?? 0)) + extraNew;
    const fresh = words
      .filter((w) => !s.words[w.woord])
      .slice(0, room)
      .map((w) => w.woord);
    return [...due, ...fresh];
  }

  useEffect(() => {
    const day = isoDay(new Date());
    const s = loadStore();
    setToday(day);
    setStore(s);
    setQueue(buildQueue(s, day));
    setConcept(conceptOfDay(concepts, day));
    setReady(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function update(next: Store) {
    setStore(next);
    saveStore(next);
  }

  function markDay(s: Store): Store {
    return s.dagen.includes(today) ? s : { ...s, dagen: [...s.dagen, today].slice(-400) };
  }

  function grade(g: Grade) {
    const woord = queue[0];
    if (!woord) return;
    const prev = store.words[woord];
    let box: number;
    if (g === 'niet') box = 1;
    else if (!prev) box = g === 'vlot' ? 2 : 1;
    else box = g === 'vlot' ? Math.min(5, prev.box + 1) : prev.box;
    const next: Store = markDay({
      ...store,
      words: { ...store.words, [woord]: { box, due: addDays(today, INTERVALS[box]) } },
      nieuw: prev ? store.nieuw : { ...store.nieuw, [today]: (store.nieuw[today] ?? 0) + 1 },
    });
    update(next);
    const rest = queue.slice(1);
    // A missed word comes back once more at the end of this round.
    setQueue(g === 'niet' ? [...rest, woord] : rest);
    setRevealed(false);
    setDone((n) => n + 1);
  }

  function moreWords() {
    setQueue(buildQueue(store, today, NEW_PER_DAY));
    setRevealed(false);
  }

  if (!ready) return <div className="min-h-screen" style={{ background: 'var(--bg)' }} />;

  const known = Object.keys(store.words).filter((w) => byWord.has(w));
  const actief = known.filter((w) => store.words[w].box >= ACTIVE_BOX).length;
  const reeks = streak(store.dagen, today);
  const current = queue[0] ? byWord.get(queue[0]) : undefined;
  const isNew = current ? !store.words[current.woord] : false;
  const remainingNew = words.filter((w) => !store.words[w.woord]).length;

  // Two target words for the speaking exercise: fixed for the day.
  const seed = Number(today.replace(/-/g, ''));
  const pool = known.length >= 2 ? known : words.slice(0, 10).map((w) => w.woord);
  const doel = pool.length
    ? [...new Set([pool[seed % pool.length], pool[(seed * 7 + 3) % pool.length]])]
    : [];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-[680px] px-5 py-10 pb-20">
        <header className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
            style={sans}
          >
            {brand}
          </Link>
          <Link
            href="/explore"
            className="text-sm opacity-40 hover:opacity-100 transition-opacity"
            style={sans}
          >
            Verken
          </Link>
        </header>

        <h1 className="text-3xl font-semibold mb-2 tracking-tight">Taal</h1>
        <p className="text-sm mb-10 opacity-50" style={sans}>
          {known.length} van {words.length} woorden geleerd · {actief} actief
          {reeks > 0 && ` · ${reeks} ${reeks === 1 ? 'dag' : 'dagen'} op rij`}
        </p>

        {/* ── Woorden ─────────────────────────────────────────── */}
        <section className="mb-14">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Woorden</h2>
            {queue.length > 0 && (
              <span className="text-xs opacity-40" style={sans}>
                nog {queue.length}
              </span>
            )}
          </div>

          {words.length === 0 && (
            <p className="text-sm opacity-50" style={sans}>
              Nog geen woordkaarten gevonden in vault/taal/woorden.
            </p>
          )}

          {current && (
            <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs uppercase tracking-widest opacity-40 mb-3" style={sans}>
                {current.soort}
                {isNew && ' · nieuw'}
              </p>
              <p className="text-lg leading-snug mb-2">{current.betekenis}</p>
              {current.alledaags && (
                <p className="text-sm opacity-60 mb-4" style={sans}>
                  In gewone woorden: “{current.alledaags}”
                </p>
              )}
              <p className="italic mb-5">
                {revealed
                  ? current.gatzin.split('___').map((part, i) => (
                      <span key={i}>
                        {i > 0 && <strong className="not-italic">{current.invul}</strong>}
                        {part}
                      </span>
                    ))
                  : current.gatzin.replace('___', '…………')}
              </p>

              {!revealed ? (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="w-full rounded-lg border px-4 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
                  style={{ ...sans, borderColor: 'var(--fg)' }}
                >
                  Bedenk het woord, dan: toon
                </button>
              ) : (
                <div>
                  <p className="text-3xl font-semibold tracking-tight mb-3">{current.woord}</p>
                  {current.verbindingen.length > 0 && (
                    <p className="text-sm opacity-70 mb-3" style={sans}>
                      {current.verbindingen.join(' · ')}
                    </p>
                  )}
                  {current.voorbeeld && (
                    <p className="text-sm opacity-70 mb-4 border-l-2 pl-3" style={{ borderColor: 'var(--border)' }}>
                      “{current.voorbeeld.zin}”{' '}
                      <Link
                        href={`/concept/${current.voorbeeld.slug}`}
                        className="underline underline-offset-2 not-italic"
                        style={sans}
                      >
                        {current.voorbeeld.titel}
                      </Link>
                    </p>
                  )}
                  <p className="text-sm font-semibold mb-3" style={sans}>
                    Zeg nu hardop een eigen zin met dit woord. Hoe ging het ophalen?
                  </p>
                  <div className="grid grid-cols-3 gap-2" style={sans}>
                    {(
                      [
                        ['niet', 'Wist ik niet'],
                        ['moeite', 'Met moeite'],
                        ['vlot', 'Vlot'],
                      ] as [Grade, string][]
                    ).map(([g, label]) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => grade(g)}
                        className="rounded-lg border px-2 py-3 text-sm hover:opacity-70 transition-opacity"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!current && words.length > 0 && (
            <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <p className="mb-1">
                {done > 0 ? 'Klaar voor vandaag.' : 'Er staat nu niets klaar.'}
              </p>
              <p className="text-sm opacity-60 mb-4" style={sans}>
                Morgen komen de woorden terug die dan aan de beurt zijn.
              </p>
              {remainingNew > 0 && (
                <button
                  type="button"
                  onClick={moreWords}
                  className="text-sm underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity"
                  style={sans}
                >
                  Toch {Math.min(NEW_PER_DAY, remainingNew)} nieuwe woorden erbij
                </button>
              )}
            </div>
          )}
        </section>

        {/* ── Spreken ─────────────────────────────────────────── */}
        <SpeakExercise
          concept={concept}
          opdracht={OPDRACHTEN[new Date().getDay()]}
          doel={doel}
          gedaan={store.spreken.includes(today)}
          onDone={() =>
            update(
              markDay({
                ...store,
                spreken: store.spreken.includes(today)
                  ? store.spreken
                  : [...store.spreken, today].slice(-400),
              }),
            )
          }
        />

        <p className="mt-14 text-xs opacity-40" style={sans}>
          Je voortgang staat alleen op dit apparaat. Samen met Claude oefenen: zie
          vault/taal/Taalcoach.md.
        </p>
      </div>
    </div>
  );
}

function SpeakExercise({
  concept,
  opdracht,
  doel,
  gedaan,
  onDone,
}: {
  concept: ConceptRef | null;
  opdracht: string;
  doel: string[];
  gedaan: boolean;
  onDone: () => void;
}) {
  const [left, setLeft] = useState(SPEAK_SECONDS);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(CHECKLIST.map(() => false));
  const endAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const s = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) {
        setRunning(false);
        setFinished(true);
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(200);
      }
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  function start() {
    endAt.current = Date.now() + SPEAK_SECONDS * 1000;
    setLeft(SPEAK_SECONDS);
    setFinished(false);
    setChecks(CHECKLIST.map(() => false));
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    setFinished(true);
  }

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Spreken</h2>
        {gedaan && (
          <span className="text-xs opacity-40" style={sans}>
            vandaag gedaan
          </span>
        )}
      </div>
      <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs uppercase tracking-widest opacity-40 mb-3" style={sans}>
          Eén minuut, hardop
        </p>
        {concept && (
          <p className="text-lg leading-snug mb-2">
            <Link href={`/concept/${concept.slug}`} className="underline underline-offset-4">
              {concept.titel}
            </Link>
          </p>
        )}
        <p className="mb-3">{opdracht}</p>
        {doel.length > 0 && (
          <p className="text-sm opacity-70 mb-5" style={sans}>
            Gebruik:{' '}
            {doel.map((w, i) => (
              <span key={w}>
                {i > 0 && ' en '}
                <strong>{w}</strong>
              </span>
            ))}
          </p>
        )}

        <div className="flex items-center gap-4 mb-1" style={sans}>
          <span
            className="text-4xl font-semibold tabular-nums"
            aria-live="off"
            style={{ minWidth: '3ch' }}
          >
            {left}
          </span>
          {!running ? (
            <button
              type="button"
              onClick={start}
              className="rounded-lg border px-4 py-2 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ borderColor: 'var(--fg)' }}
            >
              {finished ? 'Opnieuw' : 'Start'}
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              className="rounded-lg border px-4 py-2 text-sm hover:opacity-70 transition-opacity"
              style={{ borderColor: 'var(--border)' }}
            >
              Stop
            </button>
          )}
        </div>

        {finished && (
          <div className="mt-5 pt-5 border-t" style={{ ...sans, borderColor: 'var(--border)' }}>
            <p className="text-sm font-semibold mb-3">Hoe ging het?</p>
            <ul className="space-y-2 mb-4">
              {CHECKLIST.map((label, i) => (
                <li key={label}>
                  <label className="flex items-start gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={checks[i]}
                      onChange={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
                    />
                    <span>{label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="text-sm opacity-60 mb-4">
              Kies één punt dat je niet aanvinkte en doe het nog een keer met alleen dat punt in
              gedachten.
            </p>
            <button
              type="button"
              onClick={onDone}
              className="rounded-lg border px-4 py-2 text-sm hover:opacity-70 transition-opacity"
              style={{ borderColor: 'var(--border)' }}
            >
              {gedaan ? 'Genoteerd' : 'Klaar voor vandaag'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
