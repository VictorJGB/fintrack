"use server";

import type { APIResponse } from "@/interfaces/planned-expense";
// interfaces
// utils
import { apiFetcher } from "@/utils/api";

export default async function getPlannedExpenses(
	page?: string,
	itemsPerPage?: string,
): Promise<APIResponse> {
	const params = new URLSearchParams({
		page: page ?? "1",
		items_per_page: itemsPerPage ?? "",
	}).toString();

	const response = await apiFetcher(`expenses/planned?${params}`, {
		method: "GET",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
