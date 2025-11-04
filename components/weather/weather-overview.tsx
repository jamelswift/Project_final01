"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Wind, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface WeatherData {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  visibility: number
  description: string
  icon: string
  city: string
}

export function WeatherOverview() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [city, setCity] = useState("Bangkok")
  const [inputCity, setInputCity] = useState("Bangkok")
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/weather?city=${cityName}`)
      const data = await response.json()

      if (data.error) {
        console.error("[v0] Weather API error:", data.error)
      } else {
        setWeather(data)
        setCity(cityName)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch weather:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)

    // Refresh weather data every 10 minutes
    const interval = setInterval(() => {
      fetchWeather(city)
    }, 600000)

    return () => clearInterval(interval)
  }, [city])

  const handleSearch = () => {
    if (inputCity.trim()) {
      fetchWeather(inputCity)
    }
  }

  if (!weather) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading weather data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Weather</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-48"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Loading..." : "Search"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Weather Display */}
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              alt={weather.description}
              className="w-32 h-32"
            />
            <div>
              <h3 className="text-4xl font-bold">{Math.round(weather.temp)}°C</h3>
              <p className="text-lg text-muted-foreground capitalize">{weather.description}</p>
              <p className="text-sm text-muted-foreground">Feels like {Math.round(weather.feels_like)}°C</p>
              <p className="text-sm font-medium mt-2">{weather.city}</p>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Droplets className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-xl font-bold">{weather.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Wind className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-xl font-bold">{weather.wind_speed} m/s</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Eye className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="text-xl font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Cloud className="h-8 w-8 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="text-lg font-bold capitalize">{weather.description}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
