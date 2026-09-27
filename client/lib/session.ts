import { cookies } from 'next/headers'
import { getIronSession, type SessionOptions } from 'iron-session'

export interface SessionData {
  accessToken?: string
  // Opcional desde día 1: el backend aún no emite refresh_token (Fase 2).
  // Cuando lo haga, login/google-callback lo guardan aquí sin cambiar el schema.
  refreshToken?: string
}

function getPassword(): string {
  const password = process.env.SESSION_PASSWORD
  if (!password || password.length < 32) {
    throw new Error(
      'SESSION_PASSWORD no configurado o muy corto (mínimo 32 caracteres). ' +
        'Genera uno con: openssl rand -base64 32. ' +
        'No es la contraseña del usuario: es el secreto del servidor para cifrar la cookie de sesión.'
    )
  }
  return password
}

export function getSessionOptions(): SessionOptions {
  return {
    cookieName: 'portfolio_session',
    password: getPassword(),
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 semana (Fase 2: igualar al TTL del refresh_token)
      path: '/',
    },
  }
}

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), getSessionOptions())
}
