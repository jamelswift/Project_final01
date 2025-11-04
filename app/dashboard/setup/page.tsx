"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Copy, Server, Key, Shield, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SetupPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">คู่มือการติดตั้งและตั้งค่า AWS IoT</h1>
        <p className="text-muted-foreground">คำแนะนำทีละขั้นตอนในการเชื่อมต่อ ESP32 กับ AWS IoT Core และ Web Application</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>สำคัญ!</AlertTitle>
        <AlertDescription>
          กรุณาเก็บรักษา Private Key และ Certificates ให้ปลอดภัย ห้ามแชร์หรืออัพโหลดไปยัง Public Repository
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="aws">AWS IoT Setup</TabsTrigger>
          <TabsTrigger value="esp32">ESP32 Setup</TabsTrigger>
          <TabsTrigger value="webapp">Web App Setup</TabsTrigger>
          <TabsTrigger value="testing">ทดสอบระบบ</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>สถาปัตยกรรมระบบ</CardTitle>
              <CardDescription>โครงสร้างการทำงานของระบบ WSN</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold">ESP32</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">อ่านค่าเซ็นเซอร์ (อุณหภูมิ, ความชื้น) และควบคุมอุปกรณ์ (ไฟ LED)</p>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <Server className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-semibold">AWS IoT Core</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">รับส่งข้อมูลผ่าน MQTT Protocol พร้อม TLS Encryption</p>
                </div>

                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold">Web Application</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">แสดงผลข้อมูลและควบคุมอุปกรณ์ผ่าน Dashboard</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">ขั้นตอนการติดตั้ง:</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      1
                    </Badge>
                    <span>สร้าง Thing และ Policy ใน AWS IoT Core</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      2
                    </Badge>
                    <span>ดาวน์โหลด Certificates (Root CA, Device Certificate, Private Key)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      3
                    </Badge>
                    <span>อัพโหลดโค้ดไปยัง ESP32 พร้อม Certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      4
                    </Badge>
                    <span>ตั้งค่า Environment Variables ใน Web Application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      5
                    </Badge>
                    <span>ทดสอบการส่งและรับข้อมูล</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AWS IoT Setup Tab */}
        <TabsContent value="aws" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>การตั้งค่า AWS IoT Core</CardTitle>
              <CardDescription>สร้าง Thing, Policy และดาวน์โหลด Certificates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ขั้นตอนที่ 1: สร้าง Thing
                  </h4>
                  <ol className="space-y-2 text-sm ml-6 list-decimal">
                    <li>เข้าสู่ AWS Console และไปที่ IoT Core</li>
                    <li>เลือก "Manage" → "Things" → "Create things"</li>
                    <li>เลือก "Create single thing"</li>
                    <li>ตั้งชื่อ Thing เช่น "ESP32_001"</li>
                    <li>คลิก "Next" และเลือก "Auto-generate a new certificate"</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ขั้นตอนที่ 2: สร้าง Policy
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm ml-6">สร้าง Policy ชื่อ "webAppPolicy" ด้วย JSON ต่อไปนี้:</p>
                    <div className="relative">
                      <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
                        {`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Connect",
        "iot:Publish",
        "iot:Subscribe",
        "iot:Receive"
      ],
      "Resource": "*"
    }
  ]
}`}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          copyToClipboard(
                            `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:Connect",
        "iot:Publish",
        "iot:Subscribe",
        "iot:Receive"
      ],
      "Resource": "*"
    }
  ]
}`,
                            "policy",
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                        {copiedSection === "policy" && <span className="ml-2 text-xs">Copied!</span>}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ขั้นตอนที่ 3: ดาวน์โหลด Certificates
                  </h4>
                  <div className="space-y-2 text-sm ml-6">
                    <p>ดาวน์โหลดไฟล์ทั้ง 3 ไฟล์:</p>
                    <ul className="space-y-1 list-disc ml-4">
                      <li>
                        <strong>Device Certificate</strong> (certificate.pem.crt)
                      </li>
                      <li>
                        <strong>Private Key</strong> (private.pem.key)
                      </li>
                      <li>
                        <strong>Amazon Root CA 1</strong> (AmazonRootCA1.pem)
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ขั้นตอนที่ 4: หา MQTT Endpoint
                  </h4>
                  <div className="space-y-2 text-sm ml-6">
                    <p>ไปที่ "Settings" ใน AWS IoT Core และคัดลอก "Device data endpoint"</p>
                    <div className="p-3 bg-muted rounded font-mono text-xs">
                      ตัวอย่าง: a222j95wduw7gm-ats.iot.ap-southeast-2.amazonaws.com
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ESP32 Setup Tab */}
        <TabsContent value="esp32" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>การตั้งค่า ESP32</CardTitle>
              <CardDescription>อัพโหลดโค้ดและ Certificates ไปยัง ESP32</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Key className="h-4 w-4" />
                <AlertTitle>ข้อมูลที่ต้องแก้ไขในโค้ด ESP32</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-1 text-sm list-disc ml-4">
                    <li>WiFi SSID และ Password</li>
                    <li>AWS IoT MQTT Endpoint</li>
                    <li>Root CA Certificate</li>
                    <li>Device Certificate</li>
                    <li>Private Key</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. ติดตั้ง Libraries ที่จำเป็น</h4>
                  <div className="p-3 bg-muted rounded text-sm space-y-1">
                    <p>• WiFi (Built-in)</p>
                    <p>• WiFiClientSecure (Built-in)</p>
                    <p>• PubSubClient (ติดตั้งผ่าน Library Manager)</p>
                    <p>• ArduinoJson (ติดตั้งผ่าน Library Manager)</p>
                    <p>• DHT sensor library (ถ้าใช้เซ็นเซอร์ DHT)</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">2. แก้ไขข้อมูลการเชื่อมต่อ</h4>
                  <div className="relative">
                    <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
                      {`// WiFi Configuration
const char* ssid = "ชื่อ_WiFi_ของคุณ";
const char* password = "รหัสผ่าน_WiFi";

// AWS IoT Configuration
const char* mqtt_server = "your-endpoint.iot.region.amazonaws.com";
const int mqtt_port = 8883;
const char* publish_topic = "esp32/sensor/data";
const char* subscribe_topic = "esp32/control/command";`}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          `const char* ssid = "ชื่อ_WiFi_ของคุณ";\nconst char* password = "รหัสผ่าน_WiFi";\nconst char* mqtt_server = "your-endpoint.iot.region.amazonaws.com";`,
                          "wifi",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. วาง Certificates</h4>
                  <p className="text-sm text-muted-foreground mb-2">คัดลอกเนื้อหาจากไฟล์ที่ดาวน์โหลดมาแล้ววางในตัวแปร:</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-muted rounded">
                      <p className="font-mono">const char* root_ca = "-----BEGIN CERTIFICATE-----\n..."</p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="font-mono">const char* certificate = "-----BEGIN CERTIFICATE-----\n..."</p>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <p className="font-mono">const char* private_key = "-----BEGIN RSA PRIVATE KEY-----\n..."</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">4. อัพโหลดโค้ดไปยัง ESP32</h4>
                  <ol className="space-y-2 text-sm ml-6 list-decimal">
                    <li>เชื่อมต่อ ESP32 กับคอมพิวเตอร์ผ่าน USB</li>
                    <li>เลือก Board: "ESP32 Dev Module"</li>
                    <li>เลือก Port ที่ถูกต้อง</li>
                    <li>คลิก Upload</li>
                    <li>เปิด Serial Monitor (115200 baud) เพื่อดู log</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Web App Setup Tab */}
        <TabsContent value="webapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>การตั้งค่า Web Application</CardTitle>
              <CardDescription>เชื่อมต่อ Web App กับ AWS IoT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Environment Variables</AlertTitle>
                <AlertDescription>ตั้งค่า Environment Variables ใน Vercel หรือไฟล์ .env.local</AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">ตัวแปรที่ต้องตั้งค่า:</h4>
                  <div className="relative">
                    <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
                      {`# AWS IoT Configuration
AWS_IOT_ENDPOINT=your-endpoint.iot.region.amazonaws.com
AWS_IOT_REGION=ap-southeast-2
AWS_IOT_THING_NAME=ESP32_001

# Topics
AWS_IOT_PUBLISH_TOPIC=esp32/sensor/data
AWS_IOT_SUBSCRIBE_TOPIC=esp32/control/command

# Certificates (Base64 encoded)
AWS_IOT_ROOT_CA=<base64_encoded_root_ca>
AWS_IOT_CERTIFICATE=<base64_encoded_certificate>
AWS_IOT_PRIVATE_KEY=<base64_encoded_private_key>

# Weather API
WEATHER_API_KEY=97d8748855b720c2dd02ca6143d2553e`}
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() =>
                        copyToClipboard(
                          `AWS_IOT_ENDPOINT=your-endpoint.iot.region.amazonaws.com\nAWS_IOT_REGION=ap-southeast-2\nAWS_IOT_THING_NAME=ESP32_001`,
                          "env",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                      {copiedSection === "env" && <span className="ml-2 text-xs">Copied!</span>}
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">วิธีการ Encode Certificates เป็น Base64:</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">ใช้คำสั่งใน Terminal:</p>
                    <div className="relative">
                      <pre className="p-4 bg-slate-950 text-slate-50 rounded-lg text-xs overflow-x-auto">
                        {`# สำหรับ macOS/Linux
base64 -i AmazonRootCA1.pem
base64 -i certificate.pem.crt
base64 -i private.pem.key

# สำหรับ Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("AmazonRootCA1.pem"))`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    💡 สำหรับการใช้งานจริง (Production)
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200 list-disc ml-4">
                    <li>ใช้ AWS Secrets Manager หรือ AWS Systems Manager Parameter Store</li>
                    <li>ตั้งค่า IAM Roles และ Policies ที่เหมาะสม</li>
                    <li>เปิดใช้งาน CloudWatch Logs สำหรับ monitoring</li>
                    <li>ใช้ AWS Cognito สำหรับ authentication</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>การทดสอบระบบ</CardTitle>
              <CardDescription>ตรวจสอบการทำงานของระบบทั้งหมด</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge>1</Badge>
                    ทดสอบการเชื่อมต่อ ESP32
                  </h4>
                  <div className="ml-8 space-y-2 text-sm">
                    <p>เปิด Serial Monitor และตรวจสอบ:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>✓ WiFi Connected!</li>
                      <li>✓ Connecting to AWS IoT Core...</li>
                      <li>✓ Connected!</li>
                      <li>✓ 📤 Sent to AWS: &#123;...&#125;</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge>2</Badge>
                    ทดสอบการรับข้อมูลใน AWS IoT
                  </h4>
                  <div className="ml-8 space-y-2 text-sm">
                    <p>ใน AWS IoT Console:</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>ไปที่ "Test" → "MQTT test client"</li>
                      <li>
                        Subscribe to topic:{" "}
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">esp32/sensor/data</code>
                      </li>
                      <li>ควรเห็นข้อมูล JSON ทุก 5 วินาที</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge>3</Badge>
                    ทดสอบการส่งคำสั่งจาก Web App
                  </h4>
                  <div className="ml-8 space-y-2 text-sm">
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>ไปที่หน้า "AWS IoT" ใน Web App</li>
                      <li>คลิกปุ่ม "เปิดไฟ" หรือ "ปิดไฟ"</li>
                      <li>ตรวจสอบ Serial Monitor ว่ามีข้อความ "📥 Command received"</li>
                      <li>ไฟ LED บน ESP32 ควรเปิด/ปิดตามคำสั่ง</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge>4</Badge>
                    ทดสอบการแสดงผลใน Dashboard
                  </h4>
                  <div className="ml-8 space-y-2 text-sm">
                    <p>ตรวจสอบว่า Dashboard แสดงข้อมูล:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>อุณหภูมิ (Temperature)</li>
                      <li>ความชื้น (Humidity)</li>
                      <li>แรงดันไฟฟ้า (Voltage)</li>
                      <li>สัญญาณ WiFi (WiFi Signal)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Alert>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle>การแก้ไขปัญหาที่พบบ่อย</AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>
                      <strong>ไม่สามารถเชื่อมต่อ AWS IoT:</strong> ตรวจสอบ Certificates และ Policy
                    </li>
                    <li>
                      <strong>ไม่ได้รับข้อมูล:</strong> ตรวจสอบ Topic name ว่าตรงกันทั้ง ESP32 และ Web App
                    </li>
                    <li>
                      <strong>WiFi ไม่เชื่อมต่อ:</strong> ตรวจสอบ SSID และ Password
                    </li>
                    <li>
                      <strong>Certificate Error:</strong> ตรวจสอบว่าคัดลอก Certificate ครบถ้วนรวมถึง BEGIN และ END
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
