// PostHog Reverse Proxy - Cloudflare Pages Function
// Handles all /ingest/* requests and forwards to PostHog

const POSTHOG_HOST = 'us.i.posthog.com';

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);
  
  // Build the PostHog URL
  const pathParts = params.path || [];
  const posthogPath = '/' + pathParts.join('/');
  const posthogUrl = `https://${POSTHOG_HOST}${posthogPath}${url.search}`;
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // Forward the request to PostHog
  const modifiedRequest = new Request(posthogUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
  
  try {
    const response = await fetch(modifiedRequest);
    
    // Clone and add CORS headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
