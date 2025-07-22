'use server'

import { apiFetcher } from "@/utils/api";

export default async function importIncomes(formData: FormData): Promise<{ message: string }> {
  const response = await apiFetcher('incomes/import-excel', {
    method: 'POST',
    body: formData,
  })

  const { message } = await response.json()

  if (!response.ok) {
    throw new Error(message);
  }

  return message;
}