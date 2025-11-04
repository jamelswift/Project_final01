import { NextResponse } from "next/server"

// Mock user database (in production, use a real database)
const users: { email: string; password: string; name: string }[] = []

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ success: false, message: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 400 })
    }

    // In production, hash the password before storing
    users.push({ email, password, name })

    return NextResponse.json({ success: true, message: "ลงทะเบียนสำเร็จ" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาด" }, { status: 500 })
  }
}
