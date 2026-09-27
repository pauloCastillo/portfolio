import { api } from '@/api/config'
import type { SessionData } from './session'

/**
 * Intenta renovar el access_token usando el refresh_token guardado en sesión.
 * Fase 1: el backend aún no expone POST auth/refresh → devuelve false
 * sin romper nada (los llamadores caen al flujo de re-login).
 * Fase 2: al existir el endpoint, actualiza la sesión y devuelve true.
 * Se llama una sola vez por request (sin reintentos en cascada).
 */
export async function tryRefresh(
  session: SessionData & { save: () => Promise<void> }
): Promise<boolean> {
  if (!session.refreshToken) return false

  try {
    const response = await api.post('auth/refresh', {
      refresh_token: session.refreshToken,
    })

    const accessToken: string | undefined =
      response.data?.access_token ?? response.data?.accessToken
    if (!accessToken) return false

    session.accessToken = accessToken
    const rotated: string | undefined =
      response.data?.refresh_token ?? response.data?.refreshToken
    if (rotated) session.refreshToken = rotated
    await session.save()
    return true
  } catch {
    return false
  }
}
