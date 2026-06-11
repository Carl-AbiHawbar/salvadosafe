import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  verifySessionToken,
  verifyCredentials,
  createSessionToken,
  ADMIN_USER,
  ADMIN_PASS,
} from "./session";

export {
  SESSION_COOKIE,
  verifyCredentials,
  createSessionToken,
  verifySessionToken,
  ADMIN_USER,
  ADMIN_PASS,
};

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
