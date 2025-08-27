'use client';

import { bytesToHuman } from '@/lib/format';

type Data = {
  url: string;
  url_thumb?: string;
  url_png?: string;
  url_jpg?: string;
  url_webp?: string;
  url_auto?: string;
  width?: number;
  height?: number;
  bytes?: number;
  public_id?: string;
  created_at?: string;
};

export default function ResultCard({ data }: { data?: Data }) {
  if (!data?.url) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl border border-white/10 text-white/60">
        Görsel yükleyin ve işlemeyi başlatın
      </div>
    );
  }

  const downloads = [
    { label: 'PNG', href: data.url_png || data.url },
    { label: 'JPG', href: data.url_jpg || data.url },
    { label: 'WEBP', href: data.url_webp || data.url },
    { label: 'AUTO', href: data.url_auto || data.url },
  ];

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3">
          <img
            src={data.url_thumb || data.url}
            alt="preview"
            className="max-h-64 rounded-lg border border-white/10 object-contain"
          />
        </div>
        <div className="flex w-full flex-col gap-3 md:w-2/3">
          <div className="text-sm text-white/70">
            <div><span className="text-white/50">Boyut:</span> {data.width} × {data.height}px</div>
            <div><span className="text-white/50">Dosya:</span> {bytesToHuman(data.bytes)}</div>
            {data.public_id && <div><span className="text-white/50">ID:</span> {data.public_id}</div>}
            {data.created_at && <div><span className="text-white/50">Tarih:</span> {new Date(data.created_at).toLocaleString()}</div>}
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {downloads.map(d => (
              <a
                key={d.label}
                href={d.href}
                target="_blank"
                className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm text-white hover:bg-violet-500"
              >
                {d.label} indir
              </a>
            ))}
            <button
              onClick={() => copy(data.url)}
              className="rounded-lg bg-zinc-700 px-3 py-1.5 text-sm text-white hover:bg-zinc-600"
            >
              URL kopyala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


