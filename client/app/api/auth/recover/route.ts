import { NextResponse } from 'next/server'
import { api } from '@/api/config'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    const response = await api.post(`auth/forgot-password`, { email }, {
      headers: { 'Content-Type': 'application/json' },
    })

    return NextResponse.json(
      { message: response.data.message || 'Correo de recuperación enviado' },
      { status: response.status }
    )
  } catch (error: any) {
    console.error('Error en recover:', error)
    return NextResponse.json(
      { error: error.response?.data?.message || 'Error al enviar correo de recuperación' },
      { status: error.response?.status || 500 }
    )
  }
}
