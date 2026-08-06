/** Seconds elapsed → `mm:ss`, zero-padded. */
export function formatClock(totalSeconds: number): string {
  const safe =
    Number.isFinite(totalSeconds) && totalSeconds > 0 ? Math.floor(totalSeconds) : 0;
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
