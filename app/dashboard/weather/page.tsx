import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeatherOverview } from "@/components/weather/weather-overview"
import { WeatherForecast } from "@/components/weather/weather-forecast"
import { WeatherDetails } from "@/components/weather/weather-details"

export default async function WeatherPage() {
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
            <h2 className="text-3xl font-bold">Weather Information</h2>
            <p className="text-muted-foreground">Real-time weather data from OpenWeatherMap API</p>
          </div>
        </div>

        <WeatherOverview />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherForecast />
          </div>
          <div>
            <WeatherDetails />
          </div>
        </div>
      </main>
    </div>
  )
}
