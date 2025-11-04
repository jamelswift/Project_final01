import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { name, time, action, enabled } = await request.json()

  // In production, save to database
  console.log("[v0] Creating schedule:", { name, time, action, enabled })

  // Simulate saving schedule
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({
    success: true,
    schedule: {
      id: Date.now().toString(),
      name,
      time,
      action,
      enabled,
      createdAt: new Date().toISOString(),
    },
  })
}
