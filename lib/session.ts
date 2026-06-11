export const ADMIN_USER = "salvado";
export const ADMIN_PASS = "1234";
export const SESSION_COOKIE = "salvado_admin";

const SECRET = process.env.ADMIN_SECRET || "salvado-admin-dev-secret";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
};

function encodeBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(input: string): string {
  const pad = (4 - (input.length % 4)) % 4;
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmacSha256(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USER && password === ADMIN_PASS;
}

export async function createSessionToken(): Promise<string> {
  const payload = `${ADMIN_USER}:${Date.now()}`;
  const sig = await hmacSha256(payload);
  return `${encodeBase64Url(payload)}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const dot = token.indexOf(".");
    if (dot === -1) return false;
    const encoded = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const payload = decodeBase64Url(encoded);
    const expected = await hmacSha256(payload);
    if (sig !== expected) return false;
    const colon = payload.indexOf(":");
    if (colon === -1) return false;
    const user = payload.slice(0, colon);
    const ts = Number(payload.slice(colon + 1));
    if (user !== ADMIN_USER || !Number.isFinite(ts)) return false;
    const age = Date.now() - ts;
    return age >= 0 && age < MAX_AGE_MS;
  } catch {
    return false;
  }
}
