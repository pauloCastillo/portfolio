import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Crear respuesta para eliminar cookies
    const response = NextResponse.json(
      { message: 'Logout exitoso' },
      { status: 200 }
    )

    // Eliminar cookies de autenticación
    response.cookies.set('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expirar inmediatamente
      path: '/',
    })

    response.cookies.set('token_type', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expirar inmediatamente
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Error en logout:', error)
    
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}