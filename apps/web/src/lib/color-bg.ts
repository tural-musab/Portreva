export type SolidColor = { name: string; hex: string };

export const COLOR_PRESETS: SolidColor[] = [
  { name: 'White',  hex: '#FFFFFF' },
  { name: 'Black',  hex: '#000000' },
  { name: 'Slate',  hex: '#0F172A' },
  { name: 'Neutral',hex: '#111827' },
  { name: 'Brand',  hex: '#6D28D9' },
  { name: 'Sky',    hex: '#38BDF8' },
  { name: 'Emerald',hex: '#10B981' },
  { name: 'Amber',  hex: '#F59E0B' },
  { name: 'Rose',   hex: '#F43F5E' },
];

export function isHexColor(input?: string): input is string {
  if (!input) return false;
  return /^#?[0-9A-Fa-f]{6}$/.test(input);
}

export function toRgbParam(hex: string) {
  // Cloudinary `b_` paramı `b_rgb:XXXXXX` biçiminde çalışır (başına # konmaz)
  // örn: .../upload/b_rgb:F3F4F6/...
  const clean = hex.replace('#', '').toUpperCase();
  return `b_rgb:${clean}`;
}

/**
 * Cloudinary public URL (veya secure_url) verilen görsel için
 * istenen renkli arka plan varyantını üretir.
 * 
 * Kaynak: Cloudinary `b_` (background) parametresi arka plan rengini set eder. 
 * bkz. Cloudinary blog: "set background (b_) parameter to desired color". 
 * https://cloudinary.com/blog/how_to_automatically_and_professionally_remove_photo_backgrounds
 */
export function withColorBackground(baseUrl: string, hex: string) {
  const b = toRgbParam(hex);
  // '/upload/' segmentini yakalayıp araya dönüşüm ekle
  return baseUrl.replace('/upload/', `/upload/${b}/`);
}
