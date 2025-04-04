"use server"

import { cookies } from "next/headers"

export default async function getCookie(cookieName: string) {

  const store = await cookies()
  const cookie = store.get(cookieName)

  return cookie
}