"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"

export function TemperatureChart() {
  const [data, setData] = useState<Array<{ time: string; temperature: number }>>([])

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 10000).toLocaleTimeString(),
      temperature: 20 + Math.random() * 10,
    }))
    setData(initialData)

    // Simulate real-time updates from AWS IoT
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            temperature: 20 + Math.random() * 10,
          },
        ]
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Monitoring</CardTitle>
        <CardDescription>Real-time temperature data from ESP32 sensor via AWS IoT</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[15, 35]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="temperature" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
