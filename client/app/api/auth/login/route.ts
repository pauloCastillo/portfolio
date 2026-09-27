import { NextResponse } from 'next/server'
import { api } from '@/api/config'
import type { NextRequest } from 'next/server'
import { getSession } from '~/lib/session'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validar entrada
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y password son requeridos' },
        { status: 400 }
      )
    }

    // Llamar al backend de autenticación
    const response = await api.post(`auth/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Guardar tokens en sesión cifrada (iron-session). No se expone
    // ningún token en el body: la cookie httpOnly es el único transporte.
    const session = await getSession()
    session.accessToken = response.data.access_token ?? response.data.accessToken
    const refreshToken: string | undefined =
      response.data.refresh_token ?? response.data.refreshToken
    if (refreshToken) session.refreshToken = refreshToken
    await session.save()

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.message ||
               'Error en el inicio de sesión'
      },
      { status: error.response?.status || 500 }
    )
  }
}
