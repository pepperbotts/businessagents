// PostHog Reverse Proxy Worker
// Routes /ingest/* requests to PostHog API to bypass adblockers

const POSTHOG_HOST = 'us.i.posthog.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Only handle /ingest paths
    if (!url.pathname.startsWith('/ingest')) {
      return new Response('Not Found', { status: 404 });
    }
    
    // Rewrite the URL to PostHog
    const posthogPath = url.pathname.replace('/ingest', '');
    const posthogUrl = `https://${POSTHOG_HOST}${posthogPath}${url.search}`;
    
    // Clone the request with the new URL
    const modifiedRequest = new Request(posthogUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    });
    
    // Forward to PostHog
    const response = await fetch(modifiedRequest);
    
    // Return the response with CORS headers
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return modifiedResponse;
  },
};
