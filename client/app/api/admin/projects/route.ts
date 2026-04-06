import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value
    const tokenType = request.cookies.get('token_type')?.value

    if (!accessToken || !tokenType) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}projects/`, {
      headers: {
        'Authorization': `${tokenType} ${accessToken}`
      }
    })
    console.log(response.data);
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

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const { id, name, description, urlImage } = await request.json()

    // Validar entrada
    if (!id || !name || !description || !urlImage) {
      return new Response(
        JSON.stringify({ error: 'ID, nombre, descripción y URL de la imagen son requeridos' }),
        { status: 400 }
      )
    }

    const config: Record<string, any> = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (authHeader) {
      config.headers.Authorization = authHeader
    }

    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}projects/${id}`, { name, description, urlImage }, config)

    console.log(response.data);

    return new Response(
      JSON.stringify({ message: 'Proyecto actualizado exitosamente' }),
      { status: response.status }
    )
  } catch (error: any) {
    console.error('Error al actualizar el proyecto:', error)
    if (error.response) {
      console.error('Error response:', error.response.data, 'Status:', error.response.status)
    }
    return new Response(
      JSON.stringify({ error: 'Error al actualizar el proyecto' }),
      { status: 500 }
    )
  }
}