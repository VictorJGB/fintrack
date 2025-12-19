"use server";

import type Expense from "@/interfaces/expense";
import { apiFetcher } from "@/utils/api";

interface ResProps {
	_id: string;
	data: Expense[];
	total_amount: number;
}

export default async function getGroupedExpenses(
	recipient?: string,
): Promise<ResProps[]> {
	let url = "expenses/grouped";

	if (recipient) {
		const params = new URLSearchParams({ recipient }).toString();
		url += `?${params}`;
	}

	const response = await apiFetcher(url, {
		method: "GET",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
