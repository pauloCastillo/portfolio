import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api } from '@/api/config'
import { getSession } from '~/lib/session'

/**
 * Callback OAuth: Google/backend redirige aquí con ?code=...&state=...
 * Intercambia el code por tokens en el backend y los guarda en la
 * sesión cifrada (mismo mecanismo que el login con email/password).
 * Contrato esperado: POST {base}auth/google/callback { code, redirect_uri }
 *   → { access_token, refresh_token? }
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const callbackUrl = request.nextUrl.searchParams.get('state') || '/admin'

  const fail = (reason: string) => {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('error', reason)
    return NextResponse.redirect(loginUrl)
  }

  if (!code) return fail('google')

  try {
    const redirectUri = new URL('/api/auth/google/callback', request.url).toString()
    const response = await api.post(
      'auth/google/callback',
      { code, redirect_uri: redirectUri },
      { headers: { 'Content-Type': 'application/json' } }
    )

    const session = await getSession()
    session.accessToken = response.data.access_token ?? response.data.accessToken
    if (!session.accessToken) return fail('google')
    const refreshToken: string | undefined =
      response.data.refresh_token ?? response.data.refreshToken
    if (refreshToken) session.refreshToken = refreshToken
    await session.save()

    return NextResponse.redirect(new URL(callbackUrl, request.url))
  } catch (error) {
    return fail('google')
  }
}
