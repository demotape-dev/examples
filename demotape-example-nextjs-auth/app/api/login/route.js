import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  if (username !== "demo" || password !== "demo") {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await signToken({ username: "demo", role: "admin" });

  const response = NextResponse.json({
    user: { username: "demo", role: "admin" },
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
