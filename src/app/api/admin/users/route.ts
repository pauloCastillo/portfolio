import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

// phone "" (input untouched) se normaliza a ausente: el backend
// acepta null/ausente pero rechaza "" por min_length.
function sanitizeUserPayload(body: Record<string, unknown>) {
  const payload = { ...body };
  if (payload.phone === "" || payload.phone === null) {
    delete payload.phone;
  }
  return payload;
}

export async function GET() {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const response = await api.get("users/", {
      headers: authHeaders
    })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Error al obtener los usuarios' },
      { status: error.response?.status || 500 }
    )
   }
}

export async function POST(request: NextRequest) {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const response = await api.post("users/", sanitizeUserPayload(body), { headers: authHeaders })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.detail || 'Error al crear usuario' },
      { status: error.response?.status || 500 }
    )
  }
}
