import { apiFetcher } from "@/utils/api";

export default async function Login(body: Object) {
  try {
    const response = await apiFetcher('users/auth/login', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    return response.json()
  } catch (e) {
    throw e
  }
}