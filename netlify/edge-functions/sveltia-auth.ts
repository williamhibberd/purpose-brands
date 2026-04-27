// GitHub OAuth handler for Sveltia CMS, ported from sveltia/sveltia-cms-auth.
// Handles two routes:
//   GET /admin/auth      → redirects to GitHub authorize
//   GET /admin/callback  → exchanges code for access_token, postMessages back to opener
//
// Required env vars (set in Netlify dashboard → Site settings → Environment variables):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//   ALLOWED_DOMAINS  (comma-separated, supports `*` wildcard, e.g. "wearepurposebrands.com,*.netlify.app")

import type { Context } from 'https://edge.netlify.com';

const supportedProviders = ['github'];

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface OutputArgs {
  provider?: string;
  token?: string;
  error?: string;
  errorCode?: string;
}

const outputHTML = ({ provider = 'unknown', token, error, errorCode }: OutputArgs) => {
  const state = error ? 'error' : 'success';
  const content = error ? { provider, error, errorCode } : { provider, token };

  return new Response(
    `<!doctype html><html><body><script>
      (() => {
        window.addEventListener('message', ({ data, origin }) => {
          if (data === 'authorizing:${provider}') {
            window.opener?.postMessage(
              'authorization:${provider}:${state}:${JSON.stringify(content)}',
              origin
            );
          }
        });
        window.opener?.postMessage('authorizing:${provider}', '*');
      })();
    </script></body></html>`,
    {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Set-Cookie': 'csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure',
      },
    },
  );
};

const handleAuth = (request: Request) => {
  const { origin, searchParams } = new URL(request.url);
  const provider = searchParams.get('provider') ?? '';
  const domain = searchParams.get('site_id') ?? '';

  if (!supportedProviders.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }

  const allowed = Deno.env.get('ALLOWED_DOMAINS');
  if (
    allowed &&
    !allowed.split(/,/).some((str) =>
      domain.match(new RegExp(`^${escapeRegExp(str.trim()).replace('\\*', '.+')}$`)),
    )
  ) {
    return outputHTML({
      provider,
      error: 'Your domain is not allowed to use the authenticator.',
      errorCode: 'UNSUPPORTED_DOMAIN',
    });
  }

  const clientId = Deno.env.get('GITHUB_CLIENT_ID');
  const clientSecret = Deno.env.get('GITHUB_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    return outputHTML({
      provider,
      error: 'OAuth app client ID or secret is not configured.',
      errorCode: 'MISCONFIGURED_CLIENT',
    });
  }

  const csrfToken = crypto.randomUUID().replaceAll('-', '');
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    state: csrfToken,
    redirect_uri: `${origin}/admin/callback`,
  });

  return new Response('', {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      'Set-Cookie':
        `csrf-token=${provider}_${csrfToken}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
};

const handleCallback = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const cookieMatch = request.headers
    .get('Cookie')
    ?.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/);
  const provider = cookieMatch?.[1];
  const csrfToken = cookieMatch?.[2];

  if (!provider || !supportedProviders.includes(provider)) {
    return outputHTML({
      error: 'Your Git backend is not supported by the authenticator.',
      errorCode: 'UNSUPPORTED_BACKEND',
    });
  }

  if (!code || !state) {
    return outputHTML({
      provider,
      error: 'Failed to receive an authorization code. Please try again later.',
      errorCode: 'AUTH_CODE_REQUEST_FAILED',
    });
  }

  if (!csrfToken || state !== csrfToken) {
    return outputHTML({
      provider,
      error: 'Potential CSRF attack detected. Authentication flow aborted.',
      errorCode: 'CSRF_DETECTED',
    });
  }

  const clientId = Deno.env.get('GITHUB_CLIENT_ID');
  const clientSecret = Deno.env.get('GITHUB_CLIENT_SECRET');
  if (!clientId || !clientSecret) {
    return outputHTML({
      provider,
      error: 'OAuth app client ID or secret is not configured.',
      errorCode: 'MISCONFIGURED_CLIENT',
    });
  }

  let response: Response | undefined;
  try {
    response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, client_id: clientId, client_secret: clientSecret }),
    });
  } catch {
    // fall through
  }

  if (!response) {
    return outputHTML({
      provider,
      error: 'Failed to request an access token. Please try again later.',
      errorCode: 'TOKEN_REQUEST_FAILED',
    });
  }

  try {
    const { access_token: token, error } = (await response.json()) as {
      access_token?: string;
      error?: string;
    };
    return outputHTML({ provider, token, error });
  } catch {
    return outputHTML({
      provider,
      error: 'Server responded with malformed data. Please try again later.',
      errorCode: 'MALFORMED_RESPONSE',
    });
  }
};

export default async (request: Request, _context: Context): Promise<Response> => {
  const { pathname } = new URL(request.url);
  if (request.method === 'GET' && pathname === '/admin/auth') return handleAuth(request);
  if (request.method === 'GET' && pathname === '/admin/callback') return handleCallback(request);
  return new Response('', { status: 404 });
};

export const config = {
  path: ['/admin/auth', '/admin/callback'],
};
