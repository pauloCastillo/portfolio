import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Inicia el flujo OAuth con Google delegando en el backend.
 * Contrato esperado del backend (pendiente de implementar):
 *   GET {base}auth/google/login?redirect_uri=...&state=... → 302 a Google
 *   POST {base}auth/google/callback { code, redirect_uri } → { access_token, refresh_token? }
 * La URL base es configurable vía GOOGLE_OAUTH_URL.
 * Si el backend aún no expone el endpoint, se vuelve a /auth con error
 * visible en vez de mostrar el 404 crudo del backend.
 */
export async function GET(request: NextRequest) {
  const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/admin'
  const redirectUri = new URL('/api/auth/google/callback', request.url).toString()

  const unavailable = () => {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('error', 'google-unavailable')
    return NextResponse.redirect(loginUrl)
  }

  const base =
    process.env.GOOGLE_OAUTH_URL ||
    `${process.env.NEXT_PUBLIC_BASE_URL}auth/google/login`

  const url = new URL(base)
  url.searchParams.set('redirect_uri', redirectUri)
  // state transporta el destino post-login a través del round-trip OAuth
  url.searchParams.set('state', callbackUrl)

  try {
    const probe = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    })
    // 3xx = el backend redirige a Google (endpoint existe). 2xx también vale.
    if (probe.status >= 200 && probe.status < 400) {
      return NextResponse.redirect(url)
    }
    return unavailable()
  } catch {
    return unavailable()
  }
}
