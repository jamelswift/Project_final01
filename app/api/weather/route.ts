import { NextResponse } from "next/server"

const WEATHER_API_KEY = "97d8748855b720c2dd02ca6143d2553e"
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "Bangkok"

  try {
    const response = await fetch(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: response.status })
    }

    const data = await response.json()

    return NextResponse.json({
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      visibility: data.visibility,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    })
  } catch (error) {
    console.error("[v0] Weather API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
