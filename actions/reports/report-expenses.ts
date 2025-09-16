'use server'

import { apiFetcher } from "@/utils/api";

export default async function exportExpensesToPDF(initialDate: Date, finalDate: Date): Promise<Blob> {
  const params = new URLSearchParams({
    initial_date: initialDate.toString(),
    final_date: finalDate.toString(),
  }).toString()

  const response = await apiFetcher(`expenses/export?${params}`, {
    method: 'GET',
  })

  const blob = await response.blob();
  const { message } = await response.json();

  if (!response.ok) {
    throw new Error(message);
  }

  return blob;
}