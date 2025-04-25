'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
import type Income from "@/interfaces/income";

export default async function getIncomes(): Promise<Income[]> {
  const response = await apiFetcher('incomes', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}