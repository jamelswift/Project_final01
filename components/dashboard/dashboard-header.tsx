import { LogoutButton } from "@/components/auth/logout-button"
import { Bell, Settings, BookOpen, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">WSN Management Platform</h1>
            <p className="text-sm text-muted-foreground">Cloud-Based Sensor & Actuator Control System</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/guide">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                คู่มือ
              </Button>
            </Link>
            <Link href="/dashboard/aws-iot">
              <Button variant="ghost" size="sm">
                <Cloud className="h-4 w-4 mr-2" />
                AWS IoT
              </Button>
            </Link>
            <Link href="/dashboard/weather">
              <Button variant="ghost" size="sm">
                Weather
              </Button>
            </Link>
            <Link href="/dashboard/control">
              <Button variant="ghost" size="sm">
                Control
              </Button>
            </Link>
            <Link href="/dashboard/schedule">
              <Button variant="ghost" size="sm">
                Schedule
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
