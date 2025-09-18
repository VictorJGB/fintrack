'use server'

import { apiFetcher } from "@/utils/api";

import { format } from "date-fns";

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
    initial_date: format(initialDate, "yyyy-MM-dd"),
    final_date: format(finalDate, "yyyy-MM-dd"),
  }).toString()

  const url = `${getURLReport()}?${params}`

  console.log({ url })

  const response = await apiFetcher(`${url}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error("Ocorreu um erro ao baixar o relatório.");
  }

  const contentDisposition = response.headers.get('content-disposition');
  let filename = 'relatorio.pdf'; // fallback filename
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (filenameMatch && filenameMatch.length > 1) {
      filename = filenameMatch[1];
    }
  }

  const blob = await response.blob();

  return { blob, filename };
}