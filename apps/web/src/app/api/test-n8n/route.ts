import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg';

export async function GET() {
  try {
    console.log('Testing N8N webhook connection...');
    
    // Test GET request
    const getResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'GET',
    });

    // Test POST request with sample data
    const postResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: 'https://example.com/test-image.jpg',
        name: 'test-image'
      }),
    });

    const getStatus = getResponse.status;
    const postStatus = postResponse.status;

    let postData = null;
    try {
      postData = await postResponse.json();
    } catch (e) {
      postData = { error: 'Could not parse response' };
    }

    return NextResponse.json({
      success: true,
      n8n_webhook_url: N8N_WEBHOOK_URL,
      test_results: {
        get_request: {
          status: getStatus,
          accessible: getStatus < 400
        },
        post_request: {
          status: postStatus,
          accessible: postStatus < 400,
          response: postData
        }
      },
      summary: {
        webhook_accessible: getStatus < 400,
        can_process_images: postStatus < 400,
        ready_for_production: getStatus < 400 && postStatus < 400
      }
    });

  } catch (error) {
    console.error('N8N test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'N8N webhook test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      n8n_webhook_url: N8N_WEBHOOK_URL
    }, { status: 500 });
  }
}
