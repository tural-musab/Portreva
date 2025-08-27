export function bytesToHuman(bytes?: number | null): string {
  if (!bytes && bytes !== 0) return '-';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let v = bytes as number;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 ? 1 : 0)} ${units[i]}`;
}

export function formatSeconds(s?: number): string {
  if (s == null) return '';
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m <= 0) return `${r}s`;
  return `${m}m ${r}s`;
}

// n8n /api/process normalize çıktısındaki rb_limit_reset epoch saniye olabilir
export function parseResetSeconds(reset?: string): number | undefined {
  if (!reset) return undefined;
  const n = Number(reset);
  if (!Number.isFinite(n)) return undefined;
  const now = Math.floor(Date.now() / 1000);
  return n > now ? n - now : 0;
}


