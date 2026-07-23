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

	console.log(response)
	const data = await response.json();
	console.log(data)

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
