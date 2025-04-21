/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface HttpRequestOptions<B = any> {
  url: string
  method?: HttpMethod
  body?: B
  headers?: Record<string, string>
}

export async function httpRequest<T = any, B = any>(
  options: HttpRequestOptions<B>
): Promise<T> {
  const { url, method = 'GET', body, headers } = options

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} — ${response.statusText}: ${url}`)
  }

  return (await response.json()) as T
}
