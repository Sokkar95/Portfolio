/** Tiny class-name joiner — no dependency needed for what this site does. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
