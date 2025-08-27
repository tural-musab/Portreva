'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatSeconds } from '@/lib/format';

type Kind = 'CREDITS' | 'RATE_LIMIT' | 'GENERIC';

export interface ErrorAlertProps {
  kind: Kind;
  message?: string;
  resetSeconds?: number;
  onRetry?: () => void;
  onGoBilling?: () => void;
}

export default function ErrorAlert({
  kind,
  message,
  resetSeconds,
  onRetry,
  onGoBilling,
}: ErrorAlertProps) {
  const [left, setLeft] = useState<number | undefined>(resetSeconds);

  useEffect(() => {
    if (kind !== 'RATE_LIMIT' || left == null) return;
    if (left <= 0) return;
    const t = setInterval(() => setLeft((s) => (s && s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [kind, left]);

  const { title, description, actionLabel, showRetry, showBilling } = useMemo(() => {
    if (kind === 'CREDITS') {
      return {
        title: 'Kredi yetersiz',
        description: message || 'İşleme devam etmek için lütfen kredi yükleyin veya planınızı yükseltin.',
        actionLabel: 'Kredi Yükle',
        showRetry: false,
        showBilling: true,
      } as const;
    }
    if (kind === 'RATE_LIMIT') {
      const tail = left != null ? ` Yeniden deneme: ~${formatSeconds(left)}.` : '';
      return {
        title: 'Oran limiti aşıldı',
        description: (message || 'Kısa bir süre içinde çok fazla istek yapıldı.') + tail,
        actionLabel: 'Yeniden dene',
        showRetry: true,
        showBilling: false,
      } as const;
    }
    return {
      title: 'İşlem şu anda tamamlanamadı',
      description: message || 'Lütfen biraz sonra tekrar deneyin.',
      actionLabel: 'Tekrar dene',
      showRetry: true,
      showBilling: false,
    } as const;
  }, [kind, message, left]);

  return (
    <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-90">{description}</div>

      <div className="mt-3 flex gap-2">
        {showBilling && (
          <button
            onClick={onGoBilling}
            className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500"
          >
            {actionLabel}
          </button>
        )}
        {showRetry && (
          <button
            onClick={onRetry}
            disabled={kind === 'RATE_LIMIT' && (left ?? 0) > 0}
            className="inline-flex items-center rounded-lg bg-zinc-700 px-3 py-1.5 text-sm text-white disabled:opacity-50 hover:bg-zinc-600"
            title={kind === 'RATE_LIMIT' && (left ?? 0) > 0 ? `~${formatSeconds(left)} sonra` : ''}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}


