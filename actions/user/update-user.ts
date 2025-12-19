"use server";

import type User from "@/interfaces/user";
// utils
import { apiFetcher } from "@/utils/api";

// types
interface ResProps {
	message: string;
}

interface argsProps {
	id: string;
	formData: Omit<User, "_id" | "role">;
}

export default async function updateUser({
	id,
	formData,
}: argsProps): Promise<ResProps> {
	const response = await apiFetcher(
		`users/${id}`,
		{
			method: "PATCH",
			body: JSON.stringify(formData),
		},
		{ enableLog: true },
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
