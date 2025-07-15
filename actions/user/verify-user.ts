'use server'

import { apiFetcher } from "@/utils/api";

interface UserResponse {
  userID: string
}

export default async function verifyUser(): Promise<UserResponse> {
  const response = await apiFetcher('users/auth/verify-user', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }
  return data
}