"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Lightbulb, Power, Zap } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function LightControl() {
  const [isLightOn, setIsLightOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const { toast } = useToast()

  const toggleLight = async (newState: boolean) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/control/light", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: newState }),
      })

      const data = await response.json()

      if (data.success) {
        setIsLightOn(newState)
        toast({
          title: `Light turned ${newState ? "ON" : "OFF"}`,
          description: `Command sent to ESP32 successfully`,
        })
      }
    } catch (error) {
      console.error("[v0] Light control error:", error)
      toast({
        title: "Control failed",
        description: "Failed to send command to ESP32",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoModeToggle = (checked: boolean) => {
    setAutoMode(checked)
    toast({
      title: `Auto mode ${checked ? "enabled" : "disabled"}`,
      description: checked ? "Lights will be controlled by schedule" : "Manual control enabled",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Light Control
        </CardTitle>
        <CardDescription>Control ESP32 light actuator remotely via AWS IoT</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Control */}
        <div className="flex items-center justify-between p-6 rounded-lg border-2 bg-card">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full ${isLightOn ? "bg-yellow-500/20" : "bg-muted"}`}>
              <Lightbulb
                className={`h-8 w-8 ${isLightOn ? "text-yellow-500" : "text-muted-foreground"}`}
                fill={isLightOn ? "currentColor" : "none"}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">Main Light</h3>
              <p className="text-sm text-muted-foreground">
                Status:{" "}
                <span className={`font-medium ${isLightOn ? "text-green-500" : "text-red-500"}`}>
                  {isLightOn ? "ON" : "OFF"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="lg"
              variant={isLightOn ? "destructive" : "default"}
              onClick={() => toggleLight(!isLightOn)}
              disabled={isLoading || autoMode}
            >
              <Power className="h-5 w-5 mr-2" />
              {isLoading ? "Sending..." : isLightOn ? "Turn OFF" : "Turn ON"}
            </Button>
          </div>
        </div>

        {/* Auto Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-500" />
            <div>
              <Label htmlFor="auto-mode" className="text-base font-medium">
                Automatic Mode
              </Label>
              <p className="text-sm text-muted-foreground">Control lights based on schedule</p>
            </div>
          </div>
          <Switch id="auto-mode" checked={autoMode} onCheckedChange={handleAutoModeToggle} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => toggleLight(true)} disabled={isLoading || autoMode}>
            Quick ON
          </Button>
          <Button variant="outline" onClick={() => toggleLight(false)} disabled={isLoading || autoMode}>
            Quick OFF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
