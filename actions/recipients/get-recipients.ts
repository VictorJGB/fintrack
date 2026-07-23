"use server"

// types
import type Recipient from "@/interfaces/recipients";
// utils
import { apiFetcher } from "@/utils/api";

export default async function getRecipients(search?: string): Promise<Recipient[]> {
	const params = new URLSearchParams();
	if (search) params.set("search", search);

	const response = await apiFetcher(`recipients?${params}`, {
		method: "GET",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message)
	}

	return data;
}
