"use server";

// utils
import { apiFetcher } from "@/utils/api";

type Response = {
  message: string;
}

export default async function createRecipient(recipient: string): Promise<Response> {
  const response = await apiFetcher('recipients', {
    method: "POST",
    body: JSON.stringify({
      name: recipient
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
