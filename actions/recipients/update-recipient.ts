"use server";

import type Recipient from "@/interfaces/recipients";
// utils
import { apiFetcher } from "@/utils/api";

type Response = {
	message: string;
};

export default async function updateRecipient(
	recipient: Recipient,
): Promise<Response> {
	const response = await apiFetcher(`recipients/${recipient._id}`, {
		method: "PATCH",
		body: JSON.stringify({
			name: recipient.name,
		}),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
