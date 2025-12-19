"use server";

// interfaces
import type FixedExpense from "@/interfaces/fixed-expense";
// utils
import { apiFetcher } from "@/utils/api";

interface ResProps {
	message: string;
}

export default async function updateFixedExpense(
	body: FixedExpense,
): Promise<ResProps> {
	const fetchBody = {
		description: body.description,
		amount: body.amount,
	};

	const response = await apiFetcher(`expenses/fixed/${body._id}`, {
		method: "PATCH",
		body: JSON.stringify(fetchBody),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
