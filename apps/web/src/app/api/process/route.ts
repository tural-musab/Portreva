import { NextRequest, NextResponse } from 'next/server';
import { withColorBackground } from '@/lib/color-bg';

// N8N webhook URL'i - mevcut workflow'unuz
const N8N_WEBHOOK_URL = 'https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, fileName } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { ok: false, status: 400, kind: 'GENERIC', data: { message: 'imageUrl is required' } },
        { status: 400 }
      );
    }

    console.log('Processing image:', imageUrl);

    // N8N webhook'u çağır
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        name: fileName || 'image'
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('N8N workflow result:', result);

      // Derlenmiş renk varyantları (opsiyonel)
      const defaultHexes = ['#FFFFFF', '#0F172A', '#6D28D9'];
      const color_variants = result.url_png
        ? defaultHexes.map(h => ({ hex: h, url: withColorBackground(result.url_png, h) }))
        : [];

      return NextResponse.json({
        ok: true,
        status: 200,
        data: {
          url: result.url,
          url_png: result.url_png,
          url_jpg: result.url_jpg,
          url_webp: result.url_webp,
          url_auto: result.url_auto,
          url_thumb: result.url_thumb,
          public_id: result.public_id,
          resource_type: result.resource_type,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          etag: result.etag,
          created_at: result.created_at,
          latency_ms: result.latency_ms ?? null,
          source_url: result.source_url,
          rb_limit_remaining: result.rb_limit_remaining,
          rb_limit_reset: result.rb_limit_reset,
          color_variants, // [{hex, url}]
        }
      });
    }

    // Hata durumunda normalize et
    let errorData: any = null;
    try {
      errorData = await response.json();
    } catch (_) {
      errorData = {};
    }
    console.error('N8N workflow error:', errorData);

    const status = response.status;
    const kind =
      status === 402 ? 'CREDITS' :
      status === 429 ? 'RATE_LIMIT' :
      'GENERIC';

    const normalized = {
      rb_status: Number(errorData?.rb_status ?? status),
      rb_error_code: errorData?.rb_error_code,
      rb_error_message: errorData?.rb_error_message ?? errorData?.message,
      rb_request_id: errorData?.rb_request_id,
      rb_limit_remaining: errorData?.rb_limit_remaining,
      rb_limit_reset: errorData?.rb_limit_reset,
      source_url: errorData?.source_url,
      error: errorData?.error || 'remove_bg_failed',
      message: errorData?.message || 'Operation failed',
      status_code: Number(errorData?.status_code ?? status),
      retries: errorData?.retries,
    };

    return NextResponse.json(
      { ok: false, status, kind, data: normalized },
      { status }
    );

  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json(
      { ok: false, status: 500, kind: 'GENERIC', data: { message: error instanceof Error ? error.message : 'Unknown error' } },
      { status: 500 }
    );
  }
}

// Test endpoint - N8N bağlantısını test etmek için
export async function GET() {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'GET',
    });

    return NextResponse.json({
      status: 'N8N webhook is accessible',
      responseStatus: response.status,
      url: N8N_WEBHOOK_URL
    });
  } catch (error) {
    return NextResponse.json({
      error: 'N8N webhook test failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
