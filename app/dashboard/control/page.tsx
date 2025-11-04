import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LightControl } from "@/components/control/light-control"
import { ActuatorList } from "@/components/control/actuator-list"
import { ControlHistory } from "@/components/control/control-history"

export default async function ControlPage() {
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
            <h2 className="text-3xl font-bold">Actuator Control</h2>
            <p className="text-muted-foreground">Control ESP32 actuators and monitor their status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LightControl />
            <ActuatorList />
          </div>
          <div>
            <ControlHistory />
          </div>
        </div>
      </main>
    </div>
  )
}
