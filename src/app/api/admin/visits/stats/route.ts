import { NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function GET() {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const response = await api.get("visits/stats", { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al obtener estadísticas de visitas' },
      { status: error.response?.status || 500 }
    )
  }
}
