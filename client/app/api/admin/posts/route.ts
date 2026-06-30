import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function GET() {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const response = await api.get("posts/", { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al obtener posts:', error)
    return NextResponse.json(
      { error: 'Error al obtener posts' },
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
    const response = await api.post("posts/", body, { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al crear post:', error)
    return NextResponse.json(
      { error: 'Error al crear post' },
      { status: error.response?.status || 500 }
    )
  }
}
