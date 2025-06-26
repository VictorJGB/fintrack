'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
import type { APIResponse } from "@/interfaces/income";

export default async function getIncomes(): Promise<APIResponse> {
  const response = await apiFetcher('incomes', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}