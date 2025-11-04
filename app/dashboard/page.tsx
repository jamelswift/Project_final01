import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SensorDataCard } from "@/components/dashboard/sensor-data-card"
import { TemperatureChart } from "@/components/dashboard/temperature-chart"
import { SensorStatus } from "@/components/dashboard/sensor-status"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("auth_token")

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        {/* Sensor Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SensorDataCard title="Temperature" value="--" unit="°C" icon="thermometer" trend="up" trendValue="+2.5%" />
          <SensorDataCard title="Active Sensors" value="3" unit="devices" icon="activity" trend="stable" />
          <SensorDataCard title="Light Status" value="OFF" unit="" icon="lightbulb" trend="stable" />
          <SensorDataCard title="System Uptime" value="99.8" unit="%" icon="server" trend="up" trendValue="+0.2%" />
        </div>

        {/* Temperature Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TemperatureChart />
          </div>
          <div>
            <SensorStatus />
          </div>
        </div>
      </main>
    </div>
  )
}
