import { NextResponse } from 'next/server'
import { api } from "@/api/config"

export async function GET() {
  try {
    const response = await api.get("posts/published")
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al obtener posts publicados' },
      { status: error.response?.status || 500 }
    )
  }
}
