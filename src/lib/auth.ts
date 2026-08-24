import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_key_change_in_prod";
const encodedKey = new TextEncoder().encode(JWT_SECRET_KEY);

export const SESSION_COOKIE = "admin_session";

export async function createSessionToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(encodedKey);
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
