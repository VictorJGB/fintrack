'use server'

import { headers } from 'next/headers';

// export const API_BASE_URL = process.env.API_URL || ''
const API_BASE_URL = process.env.API_DEV_URL || ''

export async function apiFetcher(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> {
  const url = `${API_BASE_URL}/${input}`
  const nextHeaders = await headers()

  const token = nextHeaders.get('cookie')

  const optionsHeaders: HeadersInit = {
    ...init?.headers,
    'Cookie': token || ''
  }

  const response = await fetch(url, {
    ...init,
    mode: "no-cors",
    credentials: 'include',
    headers: optionsHeaders
  })

  return response
}