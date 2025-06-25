'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
import type Expense from "@/interfaces/expense";

interface Response {
  page: number
  pageCount: number
  itemsPerPage: number
  data: Expense[]
}

export default async function getExpenses(): Promise<Response> {
  const response = await apiFetcher('expenses', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}