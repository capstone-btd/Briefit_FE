// lib/auth/cookie.ts
import { cookies } from "next/headers";

export async function getAccessTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}

export function isLoggedIn(): boolean { 
  return !!getAccessTokenFromCookies();
}