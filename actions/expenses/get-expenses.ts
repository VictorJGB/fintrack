"use server";

// utils
import { apiFetcher } from "@/utils/api";

// types
import type { APIResponse } from "@/interfaces/expense";

export default async function getExpenses(
  page?: string,
  period?: string,
  itemsPerPage?: string,
  search?: string
): Promise<APIResponse> {

  const params = new URLSearchParams({
    page: page ?? "1",
    period: period ?? "",
    items_per_page: itemsPerPage ?? "",
    search: search ?? ""
  }).toString();

  const response = await apiFetcher(`expenses?${params}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
