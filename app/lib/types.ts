export type Domein = 'filosofie' | 'kosmologie' | 'natuur' | 'fysica';

export interface Concept {
  slug: string;
  titel: string;
  domein: Domein;
  tags: string[];
  gerelateerd: string[];
  last_shown: string | null;
  aangemaakt: string | null;
  kern: string;
  uitleg: string;
  waarom: string;
  openVragen: string;
  verder_lezen: string;
  // Optional English content (from <slug>.en.md in the vault)
  titel_en?: string;
  kern_en?: string;
  uitleg_en?: string;
  waarom_en?: string;
  openVragen_en?: string;
  verder_lezen_en?: string;
}
