import { NextResponse } from 'next/server'
import { api } from "@/api/config"
import { getAuthorizationHeaders } from '~/utils/helpers';

export async function GET() {
  try {
    const authHeaders = await getAuthorizationHeaders();
    if (!authHeaders.Authorization?.split(' ')[1]) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const response = await api.get("projects/", {
      headers: authHeaders
    })
    
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

// export async function PUT(request: NextRequest) {
//   try {
//     const authHeader = request.headers.get('authorization')
//     const { id, name, description, urlImage } = await request.json()

//     // Validar entrada
//     if (!id || !name || !description || !urlImage) {
//       return new Response(
//         JSON.stringify({ error: 'ID, nombre, descripción y URL de la imagen son requeridos' }),
//         { status: 400 }
//       )
//     }

//     const config: Record<string, any> = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//     if (authHeader) {
//       config.headers.Authorization = authHeader
//     }

//     const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}projects/${id}`, { name, description, urlImage }, config)

//     console.log(response.data);

//     return new Response(
//       JSON.stringify({ message: 'Proyecto actualizado exitosamente' }),
//       { status: response.status }
//     )
//   } catch (error: any) {
//     console.error('Error al actualizar el proyecto:', error)
//     if (error.response) {
//       console.error('Error response:', error.response.data, 'Status:', error.response.status)
//     }
//     return new Response(
//       JSON.stringify({ error: 'Error al actualizar el proyecto' }),
//       { status: 500 }
//     )
//   }
// }