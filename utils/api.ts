// export const API_BASE_URL = process.env.API_URL || ''
export const API_BASE_URL = process.env.API_DEV_URL || ''

export const apiFetcher = async (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response> => {
  const response = await fetch(`${API_BASE_URL}/${input}`, init)

  return response
}