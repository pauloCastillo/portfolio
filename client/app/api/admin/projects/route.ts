import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function GET() {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const response = await api.get("projects/", {
      headers: authHeaders
    })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al obtener los proyectos:', error)
    if (error.response) {
      console.error('Error response:', error.response.data, 'Status:', error.response.status)
    }
    return NextResponse.json(
      { error: 'Error al obtener los proyectos' },
      { status: 500 }
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
    const response = await api.post("projects/", body, { headers: authHeaders })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al crear proyecto:', error)
    return NextResponse.json(
      {
        error: 'Error al crear proyecto',
        detail: error.response?.data?.detail ?? null,
      },
      { status: error.response?.status || 500 }
    )
  }
}
