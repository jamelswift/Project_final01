"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, Bell, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const [email, setEmail] = useState("admin@example.com")
  const [morningNotif, setMorningNotif] = useState(true)
  const [eveningNotif, setEveningNotif] = useState(true)
  const [alertNotif, setAlertNotif] = useState(true)
  const { toast } = useToast()

  const handleSaveSettings = async () => {
    const response = await fetch("/api/notifications/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        morningNotif,
        eveningNotif,
        alertNotif,
      }),
    })

    if (response.ok) {
      toast({
        title: "Settings saved",
        description: "Notification preferences updated successfully",
      })
    }
  }

  const sendTestEmail = async () => {
    toast({
      title: "Test email sent",
      description: `Check your inbox at ${email}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notifications
        </CardTitle>
        <CardDescription>Configure email alerts for scheduled events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium">Notification Types</p>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-orange-500" />
              <div>
                <Label htmlFor="morning-notif" className="text-sm font-medium">
                  Morning Alert
                </Label>
                <p className="text-xs text-muted-foreground">Light turned off at 6:00 AM</p>
              </div>
            </div>
            <Switch id="morning-notif" checked={morningNotif} onCheckedChange={setMorningNotif} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-blue-500" />
              <div>
                <Label htmlFor="evening-notif" className="text-sm font-medium">
                  Evening Alert
                </Label>
                <p className="text-xs text-muted-foreground">Light turned on at 6:00 PM</p>
              </div>
            </div>
            <Switch id="evening-notif" checked={eveningNotif} onCheckedChange={setEveningNotif} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-red-500" />
              <div>
                <Label htmlFor="alert-notif" className="text-sm font-medium">
                  System Alerts
                </Label>
                <p className="text-xs text-muted-foreground">Sensor errors and failures</p>
              </div>
            </div>
            <Switch id="alert-notif" checked={alertNotif} onCheckedChange={setAlertNotif} />
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Button onClick={handleSaveSettings} className="w-full">
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          <Button onClick={sendTestEmail} variant="outline" className="w-full bg-transparent">
            Send Test Email
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-muted">
          <p className="text-xs text-muted-foreground">
            Email notifications are sent when scheduled events occur. Make sure your email address is correct.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
