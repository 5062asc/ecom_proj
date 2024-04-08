import { jwtVerify } from "jose";

export async function verifyjwt(token: string) {
  try {
    const isLoggedIn = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );
    return isLoggedIn;
  } catch (error) {
    throw new Error("invalid token");
  }
}
