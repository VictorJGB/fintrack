"use server";

// utils
import { apiFetcher } from "@/utils/api";

interface ResProps {
	message: string;
}

export default async function deleteFixedExpense(
	id: string,
): Promise<ResProps> {
	const response = await apiFetcher(`expenses/fixed/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
