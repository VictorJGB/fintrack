'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
import type Expense from "@/interfaces/expense";

export default async function getExpenses(): Promise<Expense[]> {
  const response = await apiFetcher('expenses', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}