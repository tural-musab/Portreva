'use client';

import { withColorBackground } from '@/lib/color-bg';

type Props = {
  transparentUrl: string; // n8n success: url_png (şeffaf PNG)
  colorHex: string;
  gradientUrl?: string | null; // Gradient seçildiğinde Cloudinary URL
  width?: number;
  height?: number;
  overlayPublicId?: string; // Cloudinary public_id (varsa fetch yerine daha güvenli)
};

const downloadImage = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

async function downloadAsBlob(url: string, filename: string) {
  try {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    downloadImage(objectUrl, filename);
    URL.revokeObjectURL(objectUrl);
  } catch {
    // Fallback: doğrudan URL'yi indir
    downloadImage(url, filename);
  }
}

// Gradient + şeffaf PNG'yi Cloudinary üzerinde birleştiren URL
function buildCompositeUrl(
  gradientUrl: string,
  overlayTransparentUrl: string,
  width?: number,
  height?: number,
  overlayPublicId?: string,
  forDownload?: boolean,
  downloadName?: string,
) {
  const w = Math.max(1, Math.round(width || 1000));
  const h = Math.max(1, Math.round(height || 1000));
  // Transform parçalarını sırayla ekle
  const parts: string[] = [`w_${w},h_${h},c_fill`];
  if (overlayPublicId) {
    const pid = overlayPublicId.replace(/\//g, ':');
    parts.push(`l_${pid}`);
  } else {
    const encodedOverlay = encodeURIComponent(overlayTransparentUrl);
    parts.push(`l_fetch:${encodedOverlay}`);
  }
  parts.push(`c_fit,w_${w},h_${h},g_center`);
  parts.push('fl_layer_apply');
  if (forDownload) {
    parts.push(downloadName ? `fl_attachment:${downloadName}` : 'fl_attachment');
  }
  const insert = parts.join('/');
  return gradientUrl.replace('/upload/', `/upload/${insert}/`);
}

function getBaseNameFromPublicId(publicId?: string): string {
  if (!publicId) return 'image';
  const last = publicId.split('/').pop() || publicId;
  return last.replace(/[^a-zA-Z0-9_-]+/g, '-');
}

function getGradientNameFromUrl(url?: string | null): string {
  if (!url) return 'color';
  try {
    const u = new URL(url);
    const file = (u.pathname.split('/').pop() || '').replace(/\.[^.]+$/, '');
    const first = file.split('_')[0] || file || 'gradient';
    return first.replace(/[^a-zA-Z0-9_-]+/g, '-');
  } catch {
    return 'gradient';
  }
}

export default function ColorBgPreview({ transparentUrl, colorHex, gradientUrl, width, height, overlayPublicId }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 p-3 bg-black/20">
      <div className="text-sm mb-2 text-white font-medium">Önizleme</div>
      
      {/* Gradient Arka Plan + Şeffaf PNG Önizleme (Cloudinary birleşik URL) */}
      <div className="relative overflow-hidden rounded-xl">
        {gradientUrl ? (
          <img
            src={buildCompositeUrl(gradientUrl, transparentUrl, width, height, overlayPublicId)}
            alt="Gradient + PNG preview"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        ) : (
          <img
            src={withColorBackground(transparentUrl, colorHex)}
            alt="Colored background preview"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      
      {/* Bilgi satırını kaldırdık; yalnızca görsel ve buton görünsün */}

      {/* Tek indirme butonu */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <button
          onClick={() => {
            const baseName = getBaseNameFromPublicId(overlayPublicId);
            const gName = gradientUrl ? getGradientNameFromUrl(gradientUrl) : `color-${colorHex.replace('#','')}`;
            const fileName = `${baseName}__${gName}.png`;
            const url = gradientUrl
              ? buildCompositeUrl(gradientUrl, transparentUrl, width, height, overlayPublicId, false)
              : withColorBackground(transparentUrl, colorHex);
            // Cloudinary CORS destekli; isim kontrolü için blob olarak indiriyoruz
            downloadAsBlob(url, fileName);
          }}
          className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
        >
          İndir
        </button>
      </div>
    </div>
  );
}
