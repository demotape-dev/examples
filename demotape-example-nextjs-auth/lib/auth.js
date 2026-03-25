import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  "demotape-example-secret-key-min-32chars"
);

const ALG = "HS256";

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function getUser(request) {
  const cookie =
    request.cookies?.get?.("auth_token")?.value ??
    request.headers?.get?.("cookie")?.match(/auth_token=([^;]+)/)?.[1];

  if (!cookie) return null;
  return verifyToken(cookie);
}
