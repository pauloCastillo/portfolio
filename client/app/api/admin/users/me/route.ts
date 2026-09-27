import { NextResponse } from 'next/server'
import { getSession } from '~/lib/session';

// Email del admin en sesion (sub del JWT), para que la UI
// deshabilite acciones sobre la propia cuenta. El enforcement
// real vive en DELETE /api/admin/users/[id] (403).
export async function GET() {
  try {
    const session = await getSession();
    if (!session.accessToken) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    try {
      const payload = JSON.parse(Buffer.from(session.accessToken.split('.')[1], 'base64').toString());
      return NextResponse.json({ email: payload.sub ?? null });
    } catch {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
}
