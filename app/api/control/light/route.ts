import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { state } = await request.json()

  // Simulate sending command to ESP32 via AWS IoT
  // In production, this would publish to AWS IoT MQTT topic
  console.log("[v0] Sending light control command to ESP32:", state ? "ON" : "OFF")

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    state,
    timestamp: new Date().toISOString(),
  })
}
