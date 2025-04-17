'use server'

import type Expense from "@/interfaces/expense";
// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
  message: string
}

interface argsProps {
  id: string
  formData: Omit<Expense, '_id'>
}

export default async function updateExpense({ id, formData }: argsProps): Promise<ResProps> {

  const response = await apiFetcher(`expenses/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(formData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}