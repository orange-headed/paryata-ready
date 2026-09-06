const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
).replace(/\/$/, '')

export interface ApiErrorResponse {
  success: false
  error: string
}

export interface HealthResponse {
  success: true
  message: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface ApiDataResponse<T> {
  success: true
  data: T
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  const body = (await response.json()) as T | ApiErrorResponse

  if (!response.ok) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'error' in body
        ? String(body.error)
        : 'API request failed'
    throw new Error(message)
  }

  return body as T
}

export function getHealth() {
  return apiRequest<HealthResponse>('/api/health')
}

export function getUser(id: string) {
  return apiRequest<ApiDataResponse<User>>(`/api/users/${id}`)
}

export function createUser(input: { name: string; email: string }) {
  return apiRequest<ApiDataResponse<User>>('/api/users', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
