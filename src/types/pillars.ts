export type PillarId = 'backend' | 'architecture' | 'security' | 'ai';

/** Where a proof points: a home section (hash) or another page. */
export interface PillarHref {
  pathname: string;
  hash?: string;
}

export interface PillarProof {
  text: string;
  textEn: string;
  href: PillarHref;
}

export interface Pillar {
  id: PillarId;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  skills: string[];
  proofs: PillarProof[];
}
