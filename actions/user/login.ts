"use server";

import { cookies } from "next/headers";
import { apiFetcher } from "@/utils/api";

export default async function Login(body: Object) {
	const store = await cookies();

	const response = await apiFetcher("users/auth/login", {
		method: "POST",
		body: JSON.stringify(body),
	});

	const requestCookies = response.headers.getSetCookie();
	const tokenCookie = requestCookies.find((cookie) =>
		cookie.startsWith("token="),
	);
	const token = tokenCookie && tokenCookie.split(";", 1)[0].split("=")[1];

	//Setting the token cookie
	if (token) {
		store.set("token", token);
	}

	const { message } = await response.json();

	if (!response.ok) {
		throw new Error(message);
	}

	return message;
}
