import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, morningNotif, eveningNotif, alertNotif } = await request.json()

  // In production, save to database and configure email service
  console.log("[v0] Updating notification settings:", {
    email,
    morningNotif,
    eveningNotif,
    alertNotif,
  })

  // Simulate saving settings
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({
    success: true,
    message: "Notification settings updated",
  })
}

export async function GET() {
  // Return current notification settings
  return NextResponse.json({
    email: "admin@example.com",
    morningNotif: true,
    eveningNotif: true,
    alertNotif: true,
  })
}
