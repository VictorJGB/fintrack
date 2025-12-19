"use server";

import type Income from "@/interfaces/income";
// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
	message: string;
}

export default async function createIncome(
	formData: Omit<Income, "_id">,
): Promise<ResProps> {
	const response = await apiFetcher("incomes", {
		method: "POST",
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
