"use server";

import type Income from "@/interfaces/income";
// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
	message: string;
}

interface argsProps {
	id: string;
	formData: Omit<Income, "_id">;
}

export default async function updateIncome({
	id,
	formData,
}: argsProps): Promise<ResProps> {
	const response = await apiFetcher(`incomes/${id}`, {
		method: "PATCH",
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
