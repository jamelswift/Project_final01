"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { useState } from "react"

interface HistoryItem {
  id: string
  action: string
  device: string
  timestamp: string
  status: "success" | "failed"
}

export function ControlHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      action: "Light turned ON",
      device: "Main Light",
      timestamp: "2 min ago",
      status: "success",
    },
    {
      id: "2",
      action: "Light turned OFF",
      device: "Main Light",
      timestamp: "15 min ago",
      status: "success",
    },
    {
      id: "3",
      action: "Fan turned ON",
      device: "Cooling Fan",
      timestamp: "1 hour ago",
      status: "success",
    },
    {
      id: "4",
      action: "Pump turned OFF",
      device: "Water Pump",
      timestamp: "2 hours ago",
      status: "success",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Control History
        </CardTitle>
        <CardDescription>Recent actuator commands</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="p-3 rounded-lg border bg-card">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium">{item.action}</p>
              <Badge variant={item.status === "success" ? "default" : "destructive"} className="text-xs">
                {item.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{item.device}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
