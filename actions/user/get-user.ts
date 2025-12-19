"use server";

// types
import type User from "@/interfaces/user";
// utils
import { apiFetcher } from "@/utils/api";

export default async function getUser(id: string): Promise<User> {
	const response = await apiFetcher(`users/${id}`, {
		method: "GET",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
