import { NextRequest, NextResponse } from 'next/server'
import { api } from "@/api/config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await api.post("visits/", body)
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Error al registrar visita',
        detail: error.response?.data?.detail ?? null,
      },
      { status: error.response?.status || 500 }
    )
  }
}
