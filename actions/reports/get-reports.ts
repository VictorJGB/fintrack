'use server'

import { apiFetcher } from "@/utils/api";

type ReportsType = 'expenses' | 'incomes'

export default async function getReports(type: ReportsType, initialDate: Date, finalDate: Date) {
  function getURLReport() {
    switch (type) {
      case 'expenses':
        return 'expenses/export'
      case 'incomes':
        return 'incomes/export'
      default:
        throw new Error('Tipo de relatório inválido')
    }
  }

  const params = new URLSearchParams({
    initial_date: initialDate.toString(),
    final_date: finalDate.toString(),
  }).toString()

  const url = `${getURLReport()}?${params}`

  console.log({ url })

  const response = await apiFetcher(`${url}`, {
    method: 'GET',
  })

  const blob = await response.blob();

  if (!response.ok) {
    throw new Error("Ocorreu um erro ao baixar o relatório.");
  }

  return blob;
}