/**
 * Configure your Leertuin here.
 *
 * Everything you can customize lives in this file:
 *   - Branding (app name, tagline)
 *   - Languages (one primary, optionally a secondary)
 *   - Domains (topics, colors, labels)
 *   - Schedule (which domain on which weekday)
 *   - Section structure (headings & UI labels)
 *   - UI strings (button labels, navigation)
 *
 * After editing this file, run `npm run build` to apply changes.
 * The build will fail with a clear error if the config is inconsistent.
 */

import type { LeertuinConfig } from './lib/config-types';

const config: LeertuinConfig = {
  brand: {
    name: 'De Leertuin',
    tagline: 'Concept van de dag',
    author: 'Vincent',
  },

  languages: {
    primary: 'nl',
    secondary: 'en', // set to null to disable the secondary language
  },

  vault: {
    path: '../vault/concepts',
  },

  domains: [
    {
      key: 'filosofie',
      label: { nl: 'Filosofie', en: 'Philosophy' },
      color: 'amber',
    },
    {
      key: 'kosmologie',
      label: { nl: 'Kosmologie', en: 'Cosmology' },
      color: 'indigo',
    },
    {
      key: 'natuur',
      label: { nl: 'Natuur', en: 'Nature' },
      color: 'emerald',
    },
    {
      key: 'fysica',
      label: { nl: 'Fysica', en: 'Physics' },
      color: 'violet',
    },
  ],

  // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  schedule: {
    1: 'filosofie',
    2: 'kosmologie',
    3: 'natuur',
    4: 'filosofie',
    5: 'kosmologie',
    6: 'fysica',
    0: 'random',
  },

  sections: [
    {
      key: 'kern',
      heading: { nl: 'Kern', en: 'Core' },
      uiLabel: { nl: 'Kern', en: 'Core idea' },
      style: 'callout',
    },
    {
      key: 'uitleg',
      heading: { nl: 'Uitleg', en: 'Explanation' },
      uiLabel: { nl: 'Uitleg', en: 'Explanation' },
      style: 'body',
    },
    {
      key: 'waarom',
      heading: { nl: 'Waarom het ertoe doet', en: 'Why this matters' },
      uiLabel: { nl: 'Waarom het ertoe doet', en: 'Why it matters' },
      style: 'body',
    },
    {
      key: 'openVragen',
      heading: { nl: 'Open vragen', en: 'Open questions' },
      uiLabel: { nl: 'Open vragen', en: 'Open questions' },
      style: 'body',
    },
    {
      key: 'verderLezen',
      heading: { nl: 'Verder lezen', en: 'Further reading' },
      uiLabel: { nl: 'Verder lezen', en: 'Further reading' },
      style: 'links',
    },
  ],

  ui: {
    nl: {
      showAnother: 'Toon ander concept',
      noOthers: 'Geen andere concepten in dit domein',
      exploreAll: 'Verken alle concepten →',
      backToAll: '← Alle concepten',
      today: 'Vandaag →',
      related: 'Gerelateerd',
      exploreTitle: 'Verken de Leertuin',
      exploreBackToToday: '← Concept van de dag',
      conceptSingular: 'concept',
      conceptPlural: 'concepten',
      total: 'totaal',
      emptyDomain: 'Nog geen concepten in dit domein.',
      brandLink: '← Verken',
    },
    en: {
      showAnother: 'Show another concept',
      noOthers: 'No other concepts in this domain',
      exploreAll: 'Explore all concepts →',
      backToAll: '← All concepts',
      today: 'Today →',
      related: 'Related',
      exploreTitle: 'Explore the Leertuin',
      exploreBackToToday: '← Concept of the day',
      conceptSingular: 'concept',
      conceptPlural: 'concepts',
      total: 'total',
      emptyDomain: 'No concepts in this domain yet.',
      brandLink: '← Explore',
    },
  },
};

export default config;
