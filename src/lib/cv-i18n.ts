// Helpers for rendering the bilingual CV data (src/data/cv.ts), which stores
// Portuguese as the base field and English in the `*En` counterpart.

/** Pick the Portuguese or English variant of a CV field for the active locale. */
export function pick<T>(locale: string, pt: T, en: T): T {
  return locale === 'en' ? en : pt;
}

const MONTHS: Record<string, readonly string[]> = {
  pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const PRESENT: Record<string, string> = { pt: 'Atual', en: 'Present' };

function formatMonth(value: string, locale: string): string {
  if (value === 'present') return PRESENT[locale] ?? PRESENT.pt;
  const [year, month] = value.split('-');
  const months = MONTHS[locale] ?? MONTHS.pt;
  const label = months[Number(month) - 1];
  return label ? `${label} ${year}` : year;
}

/** Format a CV period (e.g. "2025-12" / "present") for the active locale. */
export function formatPeriod(start: string, end: string, locale: string): string {
  return `${formatMonth(start, locale)} – ${formatMonth(end, locale)}`;
}
