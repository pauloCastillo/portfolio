import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await api.get(`posts/${id}`)
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al obtener post:', error)
    return NextResponse.json(
      { error: 'Error al obtener post' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const response = await api.put(`posts/${id}`, body, { headers: authHeaders })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al actualizar post:', error)
    return NextResponse.json(
      { error: 'Error al actualizar post' },
      { status: error.response?.status || 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    await api.delete(`posts/${id}`, { headers: authHeaders })
    return NextResponse.json({}, { status: 204 })
  } catch (error: any) {
    console.error('Error al eliminar post:', error)
    return NextResponse.json(
      { error: 'Error al eliminar post' },
      { status: error.response?.status || 500 }
    )
  }
}
