"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

interface Sensor {
  id: string
  name: string
  status: "online" | "offline"
  lastUpdate: string
  value: string
}

export function SensorStatus() {
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: "esp32-001",
      name: "ESP32 Temperature Sensor",
      status: "online",
      lastUpdate: "Just now",
      value: "25.3°C",
    },
    {
      id: "esp32-002",
      name: "ESP32 Light Controller",
      status: "online",
      lastUpdate: "Just now",
      value: "OFF",
    },
    {
      id: "esp32-003",
      name: "ESP32 Backup Sensor",
      status: "offline",
      lastUpdate: "5 min ago",
      value: "N/A",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          if (sensor.status === "online") {
            return {
              ...sensor,
              lastUpdate: "Just now",
              value: sensor.id === "esp32-001" ? `${(20 + Math.random() * 10).toFixed(1)}°C` : sensor.value,
            }
          }
          return sensor
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Network Status</CardTitle>
        <CardDescription>Connected ESP32 devices</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="flex items-start justify-between p-3 rounded-lg border bg-card">
            <div className="flex items-start gap-3">
              {sensor.status === "online" ? (
                <Wifi className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div>
                <p className="font-medium text-sm">{sensor.name}</p>
                <p className="text-xs text-muted-foreground">{sensor.id}</p>
                <p className="text-xs text-muted-foreground mt-1">Last update: {sensor.lastUpdate}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={sensor.status === "online" ? "default" : "secondary"}>{sensor.status}</Badge>
              <p className="text-sm font-medium mt-2">{sensor.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
