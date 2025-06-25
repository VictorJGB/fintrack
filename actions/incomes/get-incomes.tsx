'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
import type Income from "@/interfaces/income";

interface Response {
  page: number
  pageCount: number
  itemsPerPage: number
  data: Income[]
}

export default async function getIncomes(): Promise<Response> {
  const response = await apiFetcher('incomes', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}