/**
 * List form submissions from KV
 * Protected by API key
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  
  // Simple API key auth
  const authHeader = request.headers.get('Authorization');
  const expectedKey = env.SUBMISSIONS_API_KEY;
  
  if (!expectedKey || authHeader !== `Bearer ${expectedKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers
    });
  }
  
  if (!env.FORM_SUBMISSIONS) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 500,
      headers
    });
  }
  
  try {
    const url = new URL(request.url);
    const formType = url.searchParams.get('form_type');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const since = url.searchParams.get('since'); // ISO timestamp
    
    // List all submissions
    const list = await env.FORM_SUBMISSIONS.list({ prefix: 'submission:', limit: 1000 });
    
    const submissions = [];
    for (const key of list.keys) {
      const data = await env.FORM_SUBMISSIONS.get(key.name, { type: 'json' });
      if (data) {
        // Filter by form_type if specified
        if (formType && data.form_type !== formType) continue;
        // Filter by timestamp if specified
        if (since && data.timestamp < since) continue;
        
        submissions.push(data);
      }
    }
    
    // Sort by timestamp descending
    submissions.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    
    return new Response(JSON.stringify({
      success: true,
      count: submissions.length,
      submissions: submissions.slice(0, limit)
    }), { headers });
    
  } catch (error) {
    console.error('List submissions error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers
    });
  }
}
