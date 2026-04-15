import { NextResponse } from "next/server";

// POST /api/admin/session — sets a simple session cookie after Firebase client-side auth
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Secure in production
    secure: process.env.NODE_ENV === "production",
    // 7-day session
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

// DELETE /api/admin/session — clears the session cookie on sign-out
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
