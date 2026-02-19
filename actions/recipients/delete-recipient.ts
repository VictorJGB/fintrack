"use server";

// utils
import { apiFetcher } from "@/utils/api";

type Response = {
  message: string;
}

export default async function deleteRecipient(id: string): Promise<Response> {
  const response = await apiFetcher(`recipients/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
