'use server'

import type Expense from "@/interfaces/expense";
import { apiFetcher } from "@/utils/api";

interface ResProps {
  _id: string
  data: Expense[]
  total_amount: number
}
export default async function getGroupedExpenses(): Promise<ResProps[]> {
  const response = await apiFetcher('expenses/grouped', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}