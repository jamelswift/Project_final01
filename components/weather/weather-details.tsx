"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sunrise, Sunset, Gauge, Thermometer } from "lucide-react"

export function WeatherDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>Detailed weather metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <Sunrise className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium">Sunrise</span>
          </div>
          <span className="text-sm font-bold">06:15 AM</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <Sunset className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium">Sunset</span>
          </div>
          <span className="text-sm font-bold">06:45 PM</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Pressure</span>
          </div>
          <span className="text-sm font-bold">1013 hPa</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <Thermometer className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">UV Index</span>
          </div>
          <span className="text-sm font-bold">Moderate</span>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground">
            Weather data is updated every 10 minutes from OpenWeatherMap API
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
