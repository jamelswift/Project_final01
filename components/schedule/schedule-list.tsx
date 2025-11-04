"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Clock, Trash2 } from "lucide-react"
import { useState } from "react"

interface Schedule {
  id: string
  name: string
  time: string
  action: "on" | "off"
  enabled: boolean
  nextRun: string
}

export function ScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      name: "Morning Light Off",
      time: "06:00",
      action: "off",
      enabled: true,
      nextRun: "Tomorrow at 6:00 AM",
    },
    {
      id: "2",
      name: "Evening Light On",
      time: "18:00",
      action: "on",
      enabled: true,
      nextRun: "Today at 6:00 PM",
    },
  ])

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((schedule) => (schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule)),
    )
  }

  const deleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Schedules</CardTitle>
        <CardDescription>Manage your automated light schedules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {schedules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No schedules created yet</div>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${schedule.enabled ? "bg-blue-500/20" : "bg-muted"}`}>
                  <Clock className={`h-5 w-5 ${schedule.enabled ? "text-blue-500" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{schedule.name}</p>
                    <Badge variant={schedule.action === "on" ? "default" : "secondary"}>
                      {schedule.action.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {schedule.time} • {schedule.nextRun}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={schedule.enabled} onCheckedChange={() => toggleSchedule(schedule.id)} />
                <Button variant="ghost" size="icon" onClick={() => deleteSchedule(schedule.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
