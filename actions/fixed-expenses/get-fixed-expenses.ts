'use server'

import type { APIResponse } from "@/interfaces/fixed-expense";
// interfaces
// utils
import { apiFetcher } from "@/utils/api";

export default async function getAllFixedExpenses(
  page?: string,
  itemsPerPage?: string
): Promise<APIResponse> {
  const params = new URLSearchParams({
    page: page ?? "1",
    items_per_page: itemsPerPage ?? "",
  }).toString();

  const response = await apiFetcher(`expenses/fixed?${params}`, {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}