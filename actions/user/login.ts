"use server"

import { apiFetcher } from "@/utils/api";

export default async function Login(body: Object) {
  const response = await apiFetcher('users/auth/login', {
    method: 'POST',
    body: JSON.stringify(body)
  })

  const { message } = await response.json()

  if (!response.ok) {
    throw new Error(message)
  }

  return message
}