import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Valida el token de autenticación contra el backend
 * @param token - Token de acceso
 * @param tokenType - Tipo de token (ej: "Bearer")
 * @returns Promise<boolean> - true si el token es válido
 */
const validateToken = async (token: string, tokenType: string): Promise<boolean> => {
  // Validación básica de formato
  if (!token || !tokenType) {
    return false
  }

  // Normalizar y validar el tipo de token
  const normalizedTokenType = tokenType.toLowerCase()
  if (normalizedTokenType !== 'bearer') {
    return false
  }

  // Validar formato básico del token (JWT debe tener 3 partes)
  const tokenParts = token.split('.')
  if (tokenParts.length !== 3) {
    return false
  }

  try {
    // Llamar al endpoint de validación del backend
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!baseUrl) {
      console.error('[validateToken] NEXT_PUBLIC_BASE_URL no está configurado')
      return false
    }

    const response = await fetch(`${baseUrl}/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${token}`
      },
      signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    return data.valid === true && response.ok

  } catch (error) {
    // En caso de error de red o timeout, denegar acceso por seguridad
    console.error('[validateToken] Error validando token:', error)
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger rutas que comienzan con /admin
  if (pathname.startsWith('/admin')) {
    // Verificar si existe el token en las cookies
    const hasAccessToken = request.cookies.has('access_token')
    const hasTokenType = request.cookies.has('token_type')

    if (!hasAccessToken || !hasTokenType) {
      // Redirigir a auth con callback URL para volver después del login
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Obtener valores de las cookies
    const token = request.cookies.get('access_token')?.value || ''
    const tokenType = request.cookies.get('token_type')?.value || ''

    // Validar el token contra el backend
    const isTokenValid = await validateToken(token, tokenType)

    if (!isTokenValid) {
      // Token inválido o expirado - redirigir a login
      const loginUrl = new URL('/auth', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      // Limpiar cookies inválidas
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('access_token')
      response.cookies.delete('token_type')
      return response
    }

    // Token válido - permitir acceso
    return NextResponse.next()
  }

  // Rutas no protegidas - continuar normalmente
  return NextResponse.next()
}

// Configurar qué rutas ejecutar el proxy
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}