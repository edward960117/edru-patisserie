import test from 'node:test';
import assert from 'node:assert/strict';

process.env.NEXT_PUBLIC_SITE_URL = 'https://blue-islet.com';
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';

const { GET } = await import('../app/api/customer/social-auth/route.ts');

test('Google auth redirect keeps the local request origin instead of the hardcoded public site URL', async () => {
  const response = await GET(new Request('http://localhost:3006/api/customer/social-auth?provider=google&next=%2Faccount'));
  const location = response.headers.get('location');

  assert.ok(location, 'Expected redirect URL to be present');
  assert.match(location, /http:\/\/localhost:3006\//, 'Expected redirect to use local request origin');
  assert.doesNotMatch(location, /https:\/\/blue-islet\.com\//, 'Expected redirect not to use the configured production origin for local requests');
});
