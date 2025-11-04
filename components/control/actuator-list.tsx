"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Power, Fan, Thermometer, Droplets } from "lucide-react"
import { useState } from "react"

interface Actuator {
  id: string
  name: string
  type: "light" | "fan" | "heater" | "pump"
  status: "on" | "off"
  lastUpdate: string
}

const iconMap = {
  light: Power,
  fan: Fan,
  heater: Thermometer,
  pump: Droplets,
}

export function ActuatorList() {
  const [actuators, setActuators] = useState<Actuator[]>([
    {
      id: "act-001",
      name: "Main Light",
      type: "light",
      status: "off",
      lastUpdate: "Just now",
    },
    {
      id: "act-002",
      name: "Cooling Fan",
      type: "fan",
      status: "off",
      lastUpdate: "2 min ago",
    },
    {
      id: "act-003",
      name: "Water Pump",
      type: "pump",
      status: "off",
      lastUpdate: "5 min ago",
    },
  ])

  const toggleActuator = (id: string) => {
    setActuators((prev) =>
      prev.map((act) =>
        act.id === id ? { ...act, status: act.status === "on" ? "off" : "on", lastUpdate: "Just now" } : act,
      ),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Actuators</CardTitle>
        <CardDescription>Manage all connected ESP32 actuators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actuators.map((actuator) => {
          const Icon = iconMap[actuator.type]
          return (
            <div
              key={actuator.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${actuator.status === "on" ? "bg-green-500/20" : "bg-muted"}`}>
                  <Icon
                    className={`h-5 w-5 ${actuator.status === "on" ? "text-green-500" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="font-medium">{actuator.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {actuator.id} • Updated {actuator.lastUpdate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={actuator.status === "on" ? "default" : "secondary"}>
                  {actuator.status.toUpperCase()}
                </Badge>
                <Button
                  size="sm"
                  variant={actuator.status === "on" ? "destructive" : "default"}
                  onClick={() => toggleActuator(actuator.id)}
                >
                  {actuator.status === "on" ? "Turn OFF" : "Turn ON"}
                </Button>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
