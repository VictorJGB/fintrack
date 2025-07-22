'use server'

import { apiFetcher } from "@/utils/api";

export default async function importExpenses(formData: FormData): Promise<{ message: string }> {
  const response = await apiFetcher('expenses/import-excel', {
    method: 'POST',
    body: formData,
  })

  const {message} = await response.json()

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
}