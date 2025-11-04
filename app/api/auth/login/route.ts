import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Mock authentication - in production, verify against database
  if (email && password) {
    const cookieStore = await cookies()
    cookieStore.set("auth_token", "mock_token_" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
