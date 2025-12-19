"use server";

// utils
import { apiFetcher } from "@/utils/api";

interface ResProps {
	message: string;
}

export default async function deletePlannedExpense(
	id: string,
): Promise<ResProps> {
	const response = await apiFetcher(`expenses/planned/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
