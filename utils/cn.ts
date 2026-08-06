/**
 * Join class names, dropping anything falsy.
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing in this app conditionally
 * overrides the same Tailwind property from two places, so conflict resolution
 * would be dead weight. Add tailwind-merge only when a real conflict appears.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
