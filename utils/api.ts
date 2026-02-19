"use server";

import { headers } from "next/headers";

const ENVIRONMENT = process.env.ENVIRONMENT;

const API_BASE_URL = ENVIRONMENT
	? process.env.API_URL
	: process.env.API_DEV_URL;

interface ApiFetcherOptions {
	enableLog: boolean;
}

export async function apiFetcher(
	input: string | URL | globalThis.Request,
	init?: RequestInit,
	options?: ApiFetcherOptions,
): Promise<Response> {
	const url = `${API_BASE_URL}/${input}`;
	const nextHeaders = await headers();

	const token = nextHeaders.get("cookie");

	const optionsHeaders: HeadersInit = {
		...init?.headers,
		Cookie: token || "",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "*",
	};

	if (options?.enableLog) {
		console.log("API Fetcher URL:", url);
		console.log("API Fetcher Options:", optionsHeaders);
	}

	const response = await fetch(url, {
		...init,
		credentials: "include",
		headers: optionsHeaders,
	});

	return response;
}
