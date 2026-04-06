import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateToken (token: string,tokenType: string): Promise<boolean> {
  // Validación básica de formato
  if (!token || !tokenType) {
    return false
  }

  // Normalizar y validar el tipo de token
  const normalizedTokenType = tokenType.toLowerCase()
  if (normalizedTokenType !== 'bearer') {
    return false
  }

  // Validar formato básico del token (JWT debe tener 3 partes)
  const tokenParts = token.split('.')
  if (tokenParts.length !== 3) {
    return false
  }

  try {
    // Llamar al endpoint de validación del backend
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!baseUrl) {
      console.error('[validateToken] NEXT_PUBLIC_BASE_URL no está configurado')
      return false
    }

    const response = await fetch(`${baseUrl}auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenType} ${token}`
      },
      signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    return data.valid === true && response.ok

  } catch (error) {
    // En caso de error de red o timeout, denegar acceso por seguridad
    console.error('[validateToken] Error validando token:', error)
    return false
  }
}