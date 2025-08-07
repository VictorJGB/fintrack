'use server'

// utils
import { apiFetcher } from "@/utils/api"
// interfaces
import type FixedExpense from "@/interfaces/fixed-expense"

type formData = Omit<FixedExpense, '_id'>

interface ResProps {
  message: string
}

export default async function createFixedExpense(formData: formData): Promise<ResProps> {
  const response = await apiFetcher('expenses/fixed', {
    method: 'POST',
    body: JSON.stringify(formData)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}