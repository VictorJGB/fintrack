"use server";

// utils
import { apiFetcher } from "@/utils/api";

// types
import type { APIResponse } from "@/interfaces/income";

export default async function getIncomes(
  page?: string,
  itemsPerPage?: string,
  period?: string
): Promise<APIResponse> {
  const params = new URLSearchParams({
    page: page ?? "1",
    items_per_page: itemsPerPage ?? "10",
    period: period ?? "DEFAULT",
  }).toString();

  const response = await apiFetcher(`incomes?${params}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
