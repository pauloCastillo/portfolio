import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session'
import { getSessionOptions, type SessionData } from '~/lib/session'
import { tryRefresh } from '~/lib/refresh'
import { validateToken } from '~/utils/utils'

function loginRedirect(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/auth', request.url)
  loginUrl.searchParams.set('callbackUrl', pathname)
  return loginUrl
}

function copyCookies(from: NextResponse, to: NextResponse) {
  for (const setCookie of from.headers.getSetCookie()) {
    to.headers.append('set-cookie', setCookie)
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas no protegidas - continuar normalmente
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // La sesión se lee del request y se escribe sobre `probe`;
  // al final se propagan sus set-cookie al response definitivo.
  const probe = NextResponse.next()

  try {
    const session = await getIronSession<SessionData>(
      request,
      probe,
      getSessionOptions()
    )

    if (!session.accessToken) {
      const response = NextResponse.redirect(loginRedirect(request, pathname))
      copyCookies(probe, response)
      return response
    }

    // Validar el token contra el backend
    const isTokenValid = await validateToken(session.accessToken, 'Bearer')

    if (!isTokenValid) {
      // Auto-refresh silencioso (un solo intento) antes de expulsar
      const refreshed = await tryRefresh(session)
      if (!refreshed) {
        try {
          await session.destroy()
        } catch (destroyError) {
          console.error('[proxy] error destruyendo sesión:', destroyError)
        }
      }

      const response = refreshed
        ? NextResponse.next()
        : NextResponse.redirect(loginRedirect(request, pathname))
      copyCookies(probe, response)
      return response
    }

    const response = NextResponse.next()
    copyCookies(probe, response)
    return response
  } catch (error) {
    // Fail-closed: ante cualquier error (ej. SESSION_PASSWORD ausente),
    // redirigir a login en vez de responder 500.
    console.error('[proxy] error en autenticación, redirigiendo a login:', error)
    return NextResponse.redirect(loginRedirect(request, pathname))
  }
}

// Configurar qué rutas ejecutar el proxy
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
