'use server'

import { apiFetcher } from "@/utils/api";

export default async function Logout() {
  const response = await apiFetcher('users/auth/logout', {
    method: 'POST',
  })

  const { message } = await response.json()

  if (!response.ok) {
    throw new Error(message)
  }

  return message
}