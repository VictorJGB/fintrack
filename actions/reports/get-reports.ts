'use server'

import { apiFetcher } from "@/utils/api";

import { format } from "date-fns";

type ReportsType = 'expenses' | 'incomes' | 'summary'

export default async function getReports(type: ReportsType, initialDate: Date, finalDate: Date) {
  function getReportConfigs() {
    switch (type) {
      case 'expenses':
        return {
          url: 'expenses/export',
          params: new URLSearchParams({
            initial_date: format(initialDate, "yyyy-MM-dd"),
            final_date: format(finalDate, "yyyy-MM-dd"),
          }).toString()
        }
      case 'incomes':
        return {
          url: 'incomes/export',
          params: new URLSearchParams({
            initial_date: format(initialDate, "yyyy-MM-dd"),
            final_date: format(finalDate, "yyyy-MM-dd"),
          }).toString()
        }
      case 'summary':
        return {
          url: 'reports/summary',
          params: new URLSearchParams({
            final_date: format(finalDate, "yyyy-MM-dd"),
          }).toString()
        }
      default:
        throw new Error('Tipo de relatório inválido')
    }
  }

  const { url, params } = getReportConfigs()

  const response = await apiFetcher(`${url}?${params}`, {
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