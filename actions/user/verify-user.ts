'use server'

import { apiFetcher } from "@/utils/api";

export default async function verifyUser() {
  const response = await apiFetcher('users/auth/verify-user', {
    method: 'GET',
    next: {
      tags: ['logout']
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }
  return data
}