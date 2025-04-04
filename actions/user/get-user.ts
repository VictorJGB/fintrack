"use server"

// utils
import { apiFetcher } from "@/utils/api";

// types
import type User from "@/types/user";

export default async function getUser(id: string): Promise<User> {
  const response = await apiFetcher(`users/${id}`, {
    credentials: "include",
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: ['update-user']
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}