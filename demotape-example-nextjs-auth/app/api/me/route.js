import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET(request) {
  const user = await getUser(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: { username: user.username, role: user.role },
  });
}
