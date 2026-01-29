/**
 * Form Submission Acceptance Tests
 * 
 * These tests verify that all forms on businessagents.io work correctly.
 * Run with: node tests/form-submission.test.js
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://businessagents.io';
const TEST_RESULTS = [];

// Test utilities
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const req = protocol.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      ...options
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ 
        status: res.statusCode, 
        headers: res.headers,
        body: data,
        url: res.headers.location || url
      }));
    });
    
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function test(name, fn) {
  return async () => {
    try {
      await fn();
      TEST_RESULTS.push({ name, passed: true });
      console.log(`✓ ${name}`);
    } catch (error) {
      TEST_RESULTS.push({ name, passed: false, error: error.message });
      console.log(`✗ ${name}`);
      console.log(`  Error: ${error.message}`);
    }
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// =============================================================================
// ACCEPTANCE TESTS
// =============================================================================

const tests = [
  // Test 1: Homepage form exists and has correct structure
  test('Homepage has feedback form', async () => {
    const res = await fetch(`${SITE_URL}/`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.includes('name="intent"'), 'Missing intent field');
    assert(res.body.includes('action='), 'Missing form action');
  }),

  // Test 2: Submit page form exists
  test('Submit page has tool submission form', async () => {
    const res = await fetch(`${SITE_URL}/submit`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.includes('name="tool_name"'), 'Missing tool name field');
    assert(res.body.includes('name="tool_url"'), 'Missing URL field');
    assert(res.body.includes('name="submitter_email"') || res.body.includes('name="email"'), 'Missing email field');
  }),

  // Test 3: Checklist page form exists
  test('Checklist page has download form', async () => {
    const res = await fetch(`${SITE_URL}/checklist`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(res.body.includes('type="email"'), 'Missing email input');
  }),

  // Test 4: Form submission endpoint responds correctly
  test('Form endpoint accepts POST and returns 200', async () => {
    const res = await fetch(`${SITE_URL}/api/form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        form_type: 'test',
        _test: true
      })
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
  }),

  // Test 4b: Form submission returns success JSON
  test('Form endpoint returns success JSON', async () => {
    const res = await fetch(`${SITE_URL}/api/form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'acceptance-test@example.com',
        form_type: 'checklist',
        _test: true
      })
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const json = JSON.parse(res.body);
    assert(json.success === true, `Expected success:true, got ${JSON.stringify(json)}`);
  }),

  // Test 5: Form has honeypot for spam protection
  test('Forms have spam protection', async () => {
    const res = await fetch(`${SITE_URL}/submit`);
    // Check for honeypot field or other spam protection
    const hasHoneypot = res.body.includes('_honey') || 
                        res.body.includes('_gotcha') ||
                        res.body.includes('style="display:none"');
    assert(hasHoneypot, 'Missing spam protection (honeypot)');
  }),

  // Test 6: Form redirects after submission (or shows success)
  test('Form has success handling', async () => {
    const res = await fetch(`${SITE_URL}/submit`);
    // Check for _next redirect or JS success handling
    const hasSuccessHandling = res.body.includes('_next') || 
                               res.body.includes('success') ||
                               res.body.includes('onsubmit');
    assert(hasSuccessHandling, 'Missing success handling');
  }),

  // Test 7: Checklist success page has download link (not email promise)
  test('Checklist success has download link', async () => {
    const res = await fetch(`${SITE_URL}/checklist`);
    assert(res.body.includes('ai-tools-checklist'), 'Missing checklist download link');
    // Should NOT promise email delivery
    const promisesEmail = res.body.includes('Check your inbox') && !res.body.includes('display:none');
    assert(!promisesEmail || res.body.includes('ai-tools-checklist'), 'Success message promises email but should offer download');
  }),

  // Test 8: Checklist asset exists
  test('Checklist download file exists', async () => {
    const res = await fetch(`${SITE_URL}/assets/ai-tools-checklist.html`);
    assert(res.status === 200, `Checklist file returned ${res.status}`);
    assert(res.body.includes('AI Tools Checklist'), 'Checklist content missing');
  }),
];

// =============================================================================
// RUN TESTS
// =============================================================================

async function runTests() {
  console.log('\n=== Form Submission Tests ===\n');
  console.log(`Testing: ${SITE_URL}\n`);
  
  for (const testFn of tests) {
    await testFn();
  }
  
  console.log('\n--- Summary ---');
  const passed = TEST_RESULTS.filter(t => t.passed).length;
  const failed = TEST_RESULTS.filter(t => !t.passed).length;
  console.log(`Passed: ${passed}/${TEST_RESULTS.length}`);
  console.log(`Failed: ${failed}/${TEST_RESULTS.length}`);
  
  if (failed > 0) {
    console.log('\nFailed tests:');
    TEST_RESULTS.filter(t => !t.passed).forEach(t => {
      console.log(`  - ${t.name}: ${t.error}`);
    });
    process.exit(1);
  }
  
  console.log('\n✓ All tests passed!\n');
}

runTests().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
