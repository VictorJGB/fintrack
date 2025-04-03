import { apiFetcher } from "@/utils/api";

export default async function verifyUser() {
  try {
    const response = await apiFetcher('users/auth/verify-user')
    return response.json()
  } catch (e) {
    throw e
  }
}