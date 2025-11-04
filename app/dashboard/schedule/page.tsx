import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ScheduleManager } from "@/components/schedule/schedule-manager"
import { NotificationSettings } from "@/components/schedule/notification-settings"
import { ScheduleList } from "@/components/schedule/schedule-list"

export default async function SchedulePage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("auth_token")

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Schedule & Notifications</h2>
            <p className="text-muted-foreground">Automate light control and configure email notifications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScheduleManager />
            <ScheduleList />
          </div>
          <div>
            <NotificationSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
