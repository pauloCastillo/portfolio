import { NextResponse } from 'next/server'
import { getSession } from '~/lib/session'

export async function POST() {
  try {
    // Destruye la sesión cifrada (access + refresh van en la misma cookie)
    const session = await getSession()
    await session.destroy()

    return NextResponse.json(
      { message: 'Logout exitoso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en logout:', error)

    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}
