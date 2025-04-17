'use server'

import type Expense from "@/interfaces/expense";
// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
  message: string
}

export default async function createExpense(formData: Omit<Expense, '_id'>): Promise<ResProps> {

  const response = await apiFetcher('expenses', {
    method: 'POST',
    body: JSON.stringify(formData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}