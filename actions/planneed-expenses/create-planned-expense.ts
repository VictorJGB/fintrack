"use server";

// interfaces
import type PlannedExpense from "@/interfaces/planned-expense";
// utils
import { apiFetcher } from "@/utils/api";

type formData = Omit<PlannedExpense, "_id">;

interface ResProps {
	message: string;
}

export default async function createPlannedExpense(
	formData: formData,
): Promise<ResProps> {
	const response = await apiFetcher("expenses/planned", {
		method: "POST",
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
