import { getSession } from '~/lib/session';
import { tryRefresh } from '~/lib/refresh';
import { validateToken } from './utils';

export async function getAuthorizationHeaders() {
    const session = await getSession();

    if (session.accessToken) {
        // Auto-refresh silencioso: si el access expiró e hay refresh,
        // tryRefresh lo renueva (Fase 1: no-op si el backend no lo soporta).
        const valid = await validateToken(session.accessToken, 'Bearer');
        if (!valid) {
            const refreshed = await tryRefresh(session);
            if (!refreshed) return {};
        }
        if (session.accessToken) {
            return {
                Authorization: `Bearer ${session.accessToken}`,
            };
        }
    }
    return {};
}
