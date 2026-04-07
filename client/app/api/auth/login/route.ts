import { NextResponse } from 'next/server'
import { api } from '@/api/config'
import type { NextRequest } from 'next/server'

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

    // Establecer cookies seguras con el token y tipo de token
    const responseData = NextResponse.json({
      token: response.data.access_token,
      tokenType: response.data.token_type,
    })


    // Configurar cookies httpOnly para máxima seguridad
    responseData.cookies.set('access_token', response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/', // Solo enviar cookie para rutas protegidas
    })
    
    return responseData
  } catch (error:Error) {
    console.error('Error en login:', error)
    
    return NextResponse.json(
      { 
        error: error.response?.data?.message || 
               'Error en el inicio de sesión' 
      },
      { status: error.response?.status || 500 }
    )
  }
}