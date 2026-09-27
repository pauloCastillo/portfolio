import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';
import { getSession } from '~/lib/session';

function sanitizeUserPayload(body: Record<string, unknown>) {
  const payload = { ...body };
  if (payload.phone === "" || payload.phone === null) {
    delete payload.phone;
  }
  return payload;
}

function getSessionEmail(accessToken: string | undefined): string | null {
  try {
    if (!accessToken) return null;
    const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

type RouteContext = { params: Promise<{ id: string }> };

async function requireAuth() {
  const authHeaders = await getAuthorizationHeaders();
  if (!authHeaders.Authorization?.split(' ')[1]) {
    return null;
  }
  return authHeaders;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const authHeaders = await requireAuth();
    if (!authHeaders) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params;
    const response = await api.get(`users/${id}`, { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Error al obtener el usuario' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const authHeaders = await requireAuth();
    if (!authHeaders) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params;
    const body = await request.json()
    const response = await api.put(`users/${id}`, sanitizeUserPayload(body), { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error)
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Error al actualizar usuario' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const authHeaders = await requireAuth();
    if (!authHeaders) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params;

    // Guardarraíl de auto-borrado: un admin no puede eliminar su propia cuenta.
    const session = await getSession();
    const ownEmail = getSessionEmail(session.accessToken);
    if (ownEmail) {
      try {
        const target = await api.get(`users/${id}`, { headers: authHeaders });
        if (target.data?.email === ownEmail) {
          return NextResponse.json(
            { error: 'No puedes eliminar tu propia cuenta' },
            { status: 403 }
          )
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
        }
        throw error;
      }
    }

    await api.delete(`users/${id}`, { headers: authHeaders })
    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    console.error('Error al eliminar usuario:', error)
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Error al eliminar usuario' },
      { status: error.response?.status || 500 }
    )
  }
}
