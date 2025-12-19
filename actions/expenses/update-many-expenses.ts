"use server";

// types
import type Expense from "@/interfaces/expense";
// utils
import { apiFetcher } from "@/utils/api";

interface ResProps {
	message: string;
}

export default async function updateManyExpenses(
	formData: Expense[],
): Promise<ResProps> {
	const response = await apiFetcher("expenses", {
		method: "PATCH",
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
