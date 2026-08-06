/** Count words in a free-text blob, tolerant of empty input. */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
