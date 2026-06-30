import { NextResponse } from 'next/server'
import { api } from "@/api/config"

export async function GET() {
  try {
    const response = await api.get("projects/published")
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    console.error('Error al obtener proyectos publicados:', error)
    return NextResponse.json(
      { error: 'Error al obtener proyectos publicados' },
      { status: error.response?.status || 500 }
    )
  }
}
