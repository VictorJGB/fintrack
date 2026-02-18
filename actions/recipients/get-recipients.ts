"use server";

// types
import type Recipient from "@/interfaces/recipients";
// utils
import { apiFetcher } from "@/utils/api";

export default async function getRecipients(): Promise<Recipient[]> {
  const response = await apiFetcher('recipients', {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
