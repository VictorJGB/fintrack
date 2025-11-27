'use server'

import type User from "@/interfaces/user";
import { apiFetcher } from "@/utils/api";
import getUser from "./get-user";

export type UserResponse = Omit<User, 'role'>

export default async function verifyUser(): Promise<UserResponse> {
  const response = await apiFetcher('users/auth/verify-user', {
    method: 'GET',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  try {
    const user = await getUser(data._id);
    const { role, ...rest } = user;
    return rest
  } catch (e) {
    throw e
  }
}