"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Wifi, WifiOff, Database, Zap } from "lucide-react"

interface SensorData {
  device_id: string
  temperature: number
  humidity: number
  voltage: number
  wifi_signal: number
  timestamp: string
}

export default function AwsIotPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    // Simulate AWS IoT connection
    const connectToAwsIot = () => {
      console.log("[v0] Connecting to AWS IoT...")
      setTimeout(() => {
        setIsConnected(true)
        setMessages((prev) => [...prev, `${new Date().toLocaleTimeString()} - เชื่อมต่อ AWS IoT สำเร็จ`])
      }, 2000)
    }

    connectToAwsIot()

    // Simulate receiving sensor data
    const interval = setInterval(() => {
      const mockData: SensorData = {
        device_id: "ESP32_001",
        temperature: 25 + Math.random() * 5,
        humidity: 60 + Math.random() * 20,
        voltage: 3.2 + Math.random() * 0.2,
        wifi_signal: -50 - Math.random() * 30,
        timestamp: new Date().toISOString(),
      }
      setSensorData(mockData)
      setMessages((prev) => [...prev.slice(-9), `${new Date().toLocaleTimeString()} - รับข้อมูลจาก ${mockData.device_id}`])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendCommand = async (command: string, action: string) => {
    const payload = {
      device_id: "ESP32_001",
      command,
      action,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev.slice(-9), `${new Date().toLocaleTimeString()} - ส่งคำสั่ง: ${command} - ${action}`])

    // In production, send to AWS IoT
    console.log("[v0] Sending command to AWS IoT:", payload)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AWS IoT Integration</h1>
        <p className="text-muted-foreground">การเชื่อมต่อและจัดการข้อมูลผ่าน AWS IoT Core</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>สถานะการเชื่อมต่อ</CardTitle>
              <CardDescription>AWS IoT Core MQTT Connection</CardDescription>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-2">
              {isConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              {isConnected ? "เชื่อมต่อแล้ว" : "ไม่ได้เชื่อมต่อ"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">MQTT Endpoint:</span>
              <span className="font-mono text-xs">a222j95wduw7gm-ats.iot.ap-southeast-2.amazonaws.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Port:</span>
              <span className="font-mono">8883 (TLS)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Policy:</span>
              <span className="font-mono">webAppPolicy</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data">ข้อมูลเซ็นเซอร์</TabsTrigger>
          <TabsTrigger value="control">ควบคุมอุปกรณ์</TabsTrigger>
          <TabsTrigger value="logs">Log Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          {sensorData ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">อุณหภูมิ</CardTitle>
                  <Activity className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sensorData.temperature.toFixed(1)}°C</div>
                  <p className="text-xs text-muted-foreground">จาก ESP32_001</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ความชื้น</CardTitle>
                  <Database className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sensorData.humidity.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">ความชื้นสัมพัทธ์</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">แรงดันไฟฟ้า</CardTitle>
                  <Zap className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sensorData.voltage.toFixed(2)}V</div>
                  <p className="text-xs text-muted-foreground">Voltage Level</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">สัญญาณ WiFi</CardTitle>
                  <Wifi className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sensorData.wifi_signal.toFixed(0)} dBm</div>
                  <p className="text-xs text-muted-foreground">Signal Strength</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">กำลังรอข้อมูลจาก ESP32...</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="control" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ควบคุมไฟ LED</CardTitle>
              <CardDescription>ส่งคำสั่งไปยัง ESP32 ผ่าน AWS IoT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button onClick={() => sendCommand("light", "on")} className="flex-1">
                  เปิดไฟ
                </Button>
                <Button onClick={() => sendCommand("light", "off")} variant="outline" className="flex-1">
                  ปิดไฟ
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-mono">Topic: esp32/control/command</p>
                <p className="text-xs text-muted-foreground mt-2">คำสั่งจะถูกส่งไปยัง ESP32 ผ่าน MQTT protocol</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MQTT Message Logs</CardTitle>
              <CardDescription>ประวัติการส่งและรับข้อมูล</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div key={idx} className="p-2 bg-muted rounded text-sm font-mono">
                      {msg}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">ยังไม่มี log messages</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Info */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลการตั้งค่า AWS IoT</CardTitle>
          <CardDescription>รายละเอียด Certificates และ Configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Topics ที่ใช้งาน:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Publish</Badge>
                <code className="text-xs">esp32/sensor/data</code>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Subscribe</Badge>
                <code className="text-xs">esp32/control/command</code>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Certificates:</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>✓ Amazon Root CA 1 (ติดตั้งแล้ว)</p>
              <p>✓ Device Certificate (ติดตั้งแล้ว)</p>
              <p>✓ Private Key (ปลอดภัย)</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>หมายเหตุ:</strong> ในการใช้งานจริง ควรเก็บ Certificates และ Private Keys ใน Environment Variables
              หรือ AWS Secrets Manager เพื่อความปลอดภัย
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
