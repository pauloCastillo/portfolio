import { NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function POST(request: Request) {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const formData = await request.formData()
    const response = await api.post("projects/upload/image", formData, {
      headers: {
        ...authHeaders,
        'Content-Type': 'multipart/form-data',
      },
    })

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al subir imagen:', error)
    return NextResponse.json(
      { error: 'Error al subir imagen' },
      { status: error.response?.status || 500 }
    )
  }
}
