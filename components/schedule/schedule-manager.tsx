"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Plus } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function ScheduleManager() {
  const [scheduleName, setScheduleName] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [action, setAction] = useState("on")
  const [enabled, setEnabled] = useState(true)
  const { toast } = useToast()

  const handleAddSchedule = async () => {
    if (!scheduleName || !scheduleTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: scheduleName,
        time: scheduleTime,
        action,
        enabled,
      }),
    })

    if (response.ok) {
      toast({
        title: "Schedule created",
        description: `${scheduleName} has been added successfully`,
      })

      // Reset form
      setScheduleName("")
      setScheduleTime("")
      setAction("on")
      setEnabled(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Create Schedule
        </CardTitle>
        <CardDescription>Set up automatic light control based on time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="schedule-name">Schedule Name</Label>
          <Input
            id="schedule-name"
            placeholder="e.g., Morning Light Off"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="schedule-time">Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="schedule-time"
                type="time"
                className="pl-10"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger id="action">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">Turn ON</SelectItem>
                <SelectItem value="off">Turn OFF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
          <Label htmlFor="enabled" className="font-medium">
            Enable Schedule
          </Label>
          <Switch id="enabled" checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <Button onClick={handleAddSchedule} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>

        {/* Preset Schedules */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-3">Quick Presets</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setScheduleName("Morning Light Off")
                setScheduleTime("06:00")
                setAction("off")
              }}
            >
              Morning OFF (6:00 AM)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setScheduleName("Evening Light On")
                setScheduleTime("18:00")
                setAction("on")
              }}
            >
              Evening ON (6:00 PM)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
