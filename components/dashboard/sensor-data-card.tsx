"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Lightbulb, Server, Thermometer, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useEffect, useState } from "react"

interface SensorDataCardProps {
  title: string
  value: string
  unit: string
  icon: "thermometer" | "activity" | "lightbulb" | "server"
  trend?: "up" | "down" | "stable"
  trendValue?: string
}

const iconMap = {
  thermometer: Thermometer,
  activity: Activity,
  lightbulb: Lightbulb,
  server: Server,
}

export function SensorDataCard({ title, value, unit, icon, trend, trendValue }: SensorDataCardProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const Icon = iconMap[icon]

  useEffect(() => {
    // Simulate real-time temperature updates from ESP32
    if (icon === "thermometer") {
      const interval = setInterval(() => {
        // Simulate temperature reading (20-30°C range)
        const temp = (20 + Math.random() * 10).toFixed(1)
        setCurrentValue(temp)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [icon])

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currentValue} <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            <TrendIcon
              className={`h-3 w-3 ${
                trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
              }`}
            />
            <span className="text-xs text-muted-foreground">{trendValue || "No change"}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
