import { NextResponse } from "next/server"

const WEATHER_API_KEY = "97d8748855b720c2dd02ca6143d2553e"
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "Bangkok"

  try {
    const response = await fetch(`${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: response.status })
    }

    const data = await response.json()

    // Get one forecast per day (at noon)
    const dailyForecasts = data.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 5)
      .map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
      }))

    return NextResponse.json(dailyForecasts)
  } catch (error) {
    console.error("[v0] Forecast API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
