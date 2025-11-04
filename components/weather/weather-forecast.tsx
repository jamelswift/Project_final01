"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface ForecastItem {
  dt: number
  temp: number
  description: string
  icon: string
  date: string
}

export function WeatherForecast() {
  const [forecast, setForecast] = useState<ForecastItem[]>([])

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch("/api/weather/forecast?city=Bangkok")
        const data = await response.json()

        if (!data.error) {
          setForecast(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch forecast:", error)
      }
    }

    fetchForecast()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
        <CardDescription>Weather predictions for the next 5 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          {forecast.map((item) => (
            <div
              key={item.dt}
              className="flex flex-col items-center p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <p className="text-sm font-medium mb-2">{item.date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.description}
                className="w-16 h-16"
              />
              <p className="text-2xl font-bold">{Math.round(item.temp)}°C</p>
              <p className="text-xs text-muted-foreground text-center capitalize mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
