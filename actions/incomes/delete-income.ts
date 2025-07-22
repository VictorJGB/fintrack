'use server'

// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
  message: string
}

export default async function deleteIncome(id: string): Promise<ResProps> {

  const response = await apiFetcher(`incomes/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}