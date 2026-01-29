/**
 * Form submission handler for businessagents.io
 * 
 * Receives form submissions and stores them / sends notifications.
 * Replaces formsubmit.co which required email activation.
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // CORS headers - allow both sites
  const origin = request.headers.get('origin') || '';
  const allowedOrigins = ['https://businessagents.io', 'https://pepperbotts.ai'];
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  const headers = {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  
  try {
    // Parse form data (supports both JSON and form-encoded)
    let data;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('form')) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid content type' }), {
        status: 400,
        headers
      });
    }
    
    // Test mode - just return success
    if (data._test) {
      return new Response(JSON.stringify({ success: true, test: true }), { headers });
    }
    
    // Honeypot spam check
    if (data._honey || data._gotcha) {
      // Silently accept but don't process (bot submission)
      return new Response(JSON.stringify({ success: true }), { headers });
    }
    
    // Validate required fields based on form type
    const formType = data.form_type || data._form || 'unknown';
    
    // Store submission
    const submission = {
      id: crypto.randomUUID(),
      form_type: formType,
      data: data,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };
    
    // Store in KV if available
    if (env.FORM_SUBMISSIONS) {
      const key = `submission:${submission.timestamp}:${submission.id}`;
      await env.FORM_SUBMISSIONS.put(key, JSON.stringify(submission), {
        expirationTtl: 60 * 60 * 24 * 90 // 90 days
      });
    }
    
    // Send webhook notification if configured
    if (env.WEBHOOK_URL) {
      try {
        await fetch(env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission)
        });
      } catch (e) {
        console.error('Webhook failed:', e);
      }
    }
    
    // Determine redirect URL
    const redirectUrl = data._next || `https://businessagents.io?thanks=1&form=${formType}`;
    
    // For form submissions (not AJAX), redirect
    if (!contentType.includes('application/json')) {
      return Response.redirect(redirectUrl, 303);
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: submission.id,
      redirect: redirectUrl
    }), { headers });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers
    });
  }
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('origin') || '';
  const allowedOrigins = ['https://businessagents.io', 'https://pepperbotts.ai'];
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
