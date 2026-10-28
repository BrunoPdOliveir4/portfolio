export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

// Pinned so server and client render dates identically; without it next-intl
// falls back to the environment's zone and warns about markup mismatches.
export const TIME_ZONE = 'America/Sao_Paulo';
