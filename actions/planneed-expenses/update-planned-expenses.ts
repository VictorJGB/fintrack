"use server";

// interfaces
import type PlannedExpense from "@/interfaces/planned-expense";
// utils
import { apiFetcher } from "@/utils/api";

interface ResProps {
	message: string;
}

export default async function updatePlannedExpense(
	body: PlannedExpense,
): Promise<ResProps> {
	const fetchBody: Omit<PlannedExpense, "_id"> = {
		description: body.description,
		observation: body.observation ?? "",
		installments: body.installments,
		amount_per_installments: body.amount_per_installments,
		total_value: body.total_value,
	};

	const response = await apiFetcher(`expenses/planned/${body._id}`, {
		method: "PATCH",
		body: JSON.stringify(fetchBody),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
