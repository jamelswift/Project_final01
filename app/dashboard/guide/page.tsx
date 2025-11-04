"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, Thermometer, Lightbulb, Calendar, Bell, Cloud, Cpu, Mail, Settings, Info } from "lucide-react"

export default function GuidePage() {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">คู่มือการใช้งานระบบ</h1>
        <p className="text-muted-foreground text-lg">
          Cloud-Based Management Platform for Wireless Sensor Networks (WSN)
        </p>
      </div>

      <Tabs defaultValue="login" className="space-y-6">
        <TabsList className="grid grid-cols-3 lg:grid-cols-7 gap-2">
          <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
          <TabsTrigger value="sensor">เซ็นเซอร์</TabsTrigger>
          <TabsTrigger value="control">ควบคุม</TabsTrigger>
          <TabsTrigger value="schedule">ตั้งเวลา</TabsTrigger>
          <TabsTrigger value="notification">แจ้งเตือน</TabsTrigger>
          <TabsTrigger value="weather">สภาพอากาศ</TabsTrigger>
          <TabsTrigger value="esp32">ESP32</TabsTrigger>
        </TabsList>

        {/* Login Guide */}
        <TabsContent value="login" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LogIn className="h-6 w-6" />
                <CardTitle>การเข้าสู่ระบบ</CardTitle>
              </div>
              <CardDescription>วิธีการเข้าใช้งานระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">ขั้นตอนการเข้าสู่ระบบ:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>เปิดหน้าเว็บไซต์และคลิกที่ปุ่ม "เข้าสู่ระบบ"</li>
                  <li>กรอกอีเมลของคุณในช่อง "Email"</li>
                  <li>กรอกรหัสผ่านในช่อง "Password"</li>
                  <li>คลิกปุ่ม "เข้าสู่ระบบ" เพื่อเข้าใช้งาน</li>
                </ol>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>สำหรับการทดสอบ:</strong> ใช้อีเมลใดก็ได้และรหัสผ่านอย่างน้อย 6 ตัวอักษร
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ตัวอย่าง:</h4>
                <div className="space-y-1 text-sm font-mono">
                  <p>Email: admin@example.com</p>
                  <p>Password: password123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sensor Guide */}
        <TabsContent value="sensor" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Thermometer className="h-6 w-6" />
                <CardTitle>การดูข้อมูลเซ็นเซอร์</CardTitle>
              </div>
              <CardDescription>วิธีการตรวจสอบข้อมูลจากเซ็นเซอร์ ESP32</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">หน้า Dashboard แสดงข้อมูล:</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>อุณหภูมิปัจจุบัน:</strong> แสดงค่าอุณหภูมิที่อ่านได้จาก ESP32 แบบเรียลไทม์
                  </li>
                  <li>
                    <strong>กราฟอุณหภูมิ:</strong> แสดงประวัติการเปลี่ยนแปลงของอุณหภูมิ
                  </li>
                  <li>
                    <strong>สถานะเซ็นเซอร์:</strong> แสดงสถานะการเชื่อมต่อของอุปกรณ์
                  </li>
                  <li>
                    <strong>ข้อมูลเพิ่มเติม:</strong> ความชื้น, แรงดันไฟฟ้า, และสัญญาณ WiFi
                  </li>
                </ul>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>ข้อมูลจะอัพเดทอัตโนมัติทุก 5 วินาที โดยไม่ต้องรีเฟรชหน้าเว็บ</AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">การทำงานของระบบ:</h4>
                <div className="space-y-2 text-sm">
                  <p>1. ESP32 อ่านค่าแรงดันไฟฟ้า (Voltage) จากเซ็นเซอร์</p>
                  <p>2. แปลงค่าแรงดันเป็นค่าอุณหภูมิ (Temperature)</p>
                  <p>3. ส่งข้อมูลไปยัง AWS IoT Core</p>
                  <p>4. AWS ส่งข้อมูลมาแสดงผลบนหน้าเว็บ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Control Guide */}
        <TabsContent value="control" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6" />
                <CardTitle>การควบคุมอุปกรณ์</CardTitle>
              </div>
              <CardDescription>วิธีการเปิด-ปิดไฟและควบคุม Actuator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">การควบคุมไฟ:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>ไปที่เมนู "Control" ในแถบด้านข้าง</li>
                  <li>เลือกอุปกรณ์ที่ต้องการควบคุม (เช่น Light 1, Light 2)</li>
                  <li>คลิกสวิตช์เพื่อเปิด/ปิดอุปกรณ์</li>
                  <li>ระบบจะส่งคำสั่งไปยัง ESP32 ผ่าน AWS IoT</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 mt-4">โหมดการควบคุม:</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>Manual (ควบคุมด้วยตนเอง):</strong> เปิด-ปิดด้วยมือผ่านหน้าเว็บ
                  </li>
                  <li>
                    <strong>Auto (อัตโนมัติ):</strong> ควบคุมตามตารางเวลาที่ตั้งไว้
                  </li>
                </ul>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>เมื่อเปลี่ยนโหมดเป็น Auto ระบบจะควบคุมตามตารางเวลาที่ตั้งค่าไว้ในหน้า Schedule</AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ประวัติการควบคุม:</h4>
                <p className="text-sm">ระบบจะบันทึกประวัติการเปิด-ปิดทุกครั้ง พร้อมแสดงเวลาและผู้ใช้งาน</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Guide */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                <CardTitle>การตั้งเวลาอัตโนมัติ</CardTitle>
              </div>
              <CardDescription>วิธีการตั้งเวลาเปิด-ปิดไฟอัตโนมัติ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">การสร้างตารางเวลา:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>ไปที่เมนู "Schedule" ในแถบด้านข้าง</li>
                  <li>คลิกปุ่ม "เพิ่มตารางเวลาใหม่"</li>
                  <li>กรอกชื่อตารางเวลา (เช่น "เปิดไฟตอนเช้า")</li>
                  <li>เลือกอุปกรณ์ที่ต้องการควบคุม</li>
                  <li>เลือกการกระทำ: เปิด (ON) หรือ ปิด (OFF)</li>
                  <li>ตั้งเวลาที่ต้องการให้ทำงาน</li>
                  <li>เลือกวันที่ต้องการให้ทำงาน (จันทร์-อาทิตย์)</li>
                  <li>คลิก "บันทึก"</li>
                </ol>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ตัวอย่างการตั้งเวลา:</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="font-semibold">เปิดไฟตอนเย็น (เวลามืด)</p>
                    <p>เวลา: 18:00 น.</p>
                    <p>การกระทำ: เปิดไฟ (ON)</p>
                    <p>วัน: ทุกวัน</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <p className="font-semibold">ปิดไฟตอนเช้า (เวลาสว่าง)</p>
                    <p>เวลา: 06:00 น.</p>
                    <p>การกระทำ: ปิดไฟ (OFF)</p>
                    <p>วัน: ทุกวัน</p>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>สามารถสร้างตารางเวลาได้หลายรายการ และเปิด/ปิดการใช้งานได้ตามต้องการ</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Guide */}
        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                <CardTitle>การตั้งค่าการแจ้งเตือน</CardTitle>
              </div>
              <CardDescription>วิธีการรับการแจ้งเตือนผ่านอีเมล</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">การตั้งค่าอีเมลแจ้งเตือน:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>ไปที่เมนู "Schedule" และเลื่อนลงมาที่ส่วน "การแจ้งเตือน"</li>
                  <li>กรอกอีเมลที่ต้องการรับการแจ้งเตือน</li>
                  <li>
                    เลือกประเภทการแจ้งเตือนที่ต้องการ:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>แจ้งเตือนตอนเช้า (เมื่อปิดไฟ)</li>
                      <li>แจ้งเตือนตอนเย็น (เมื่อเปิดไฟ)</li>
                      <li>แจ้งเตือนเมื่อมีปัญหาระบบ</li>
                    </ul>
                  </li>
                  <li>คลิก "บันทึกการตั้งค่า"</li>
                </ol>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ตัวอย่างอีเมลแจ้งเตือน:</h4>
                <div className="space-y-2 text-sm border-l-4 border-green-500 pl-3">
                  <p className="font-semibold">หัวข้อ: ระบบปิดไฟอัตโนมัติ - เวลา 06:00 น.</p>
                  <p>เนื้อหา: ระบบได้ทำการปิดไฟตามตารางเวลาที่กำหนดไว้เรียบร้อยแล้ว</p>
                  <p>อุปกรณ์: Light 1, Light 2</p>
                  <p>สถานะ: สำเร็จ</p>
                </div>
              </div>

              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  <strong>หมายเหตุ:</strong> ในโหมดทดสอบ อีเมลจะถูกจำลองและแสดงใน Console แทนการส่งจริง
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weather Guide */}
        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cloud className="h-6 w-6" />
                <CardTitle>ข้อมูลสภาพอากาศ</CardTitle>
              </div>
              <CardDescription>วิธีการดูข้อมูลสภาพอากาศจาก OpenWeatherMap</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">การดูข้อมูลสภาพอากาศ:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>ไปที่เมนู "Weather" ในแถบด้านข้าง</li>
                  <li>ระบบจะแสดงสภาพอากาศปัจจุบันของกรุงเทพฯ โดยอัตโนมัติ</li>
                  <li>สามารถค้นหาเมืองอื่นได้โดยพิมพ์ชื่อเมืองในช่องค้นหา</li>
                  <li>กดปุ่ม "ค้นหา" เพื่อดูข้อมูลสภาพอากาศของเมืองนั้น</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 mt-4">ข้อมูลที่แสดง:</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>อุณหภูมิปัจจุบัน:</strong> แสดงอุณหภูมิแบบเรียลไทม์
                  </li>
                  <li>
                    <strong>สภาพอากาศ:</strong> แจ้งสภาพอากาศ (แดดจัด, มีเมฆ, ฝนตก)
                  </li>
                  <li>
                    <strong>ความชื้น:</strong> เปอร์เซ็นต์ความชื้นในอากาศ
                  </li>
                  <li>
                    <strong>ความเร็วลม:</strong> ความเร็วลมเป็น km/h
                  </li>
                  <li>
                    <strong>พยากรณ์อากาศ 5 วัน:</strong> แสดงพยากรณ์อากาศล่วงหน้า
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">การใช้งานร่วมกับระบบ:</h4>
                <p className="text-sm">
                  ข้อมูลสภาพอากาศสามารถใช้ประกอบการตัดสินใจในการควบคุมอุปกรณ์ เช่น เมื่อสภาพอากาศมืดครึ้มอาจต้องเปิดไฟเร็วขึ้น
                </p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>ข้อมูลมาจาก OpenWeatherMap API และอัพเดททุก 10 นาที</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ESP32 Guide */}
        <TabsContent value="esp32" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="h-6 w-6" />
                <CardTitle>การเชื่อมต่อ ESP32</CardTitle>
              </div>
              <CardDescription>วิธีการเชื่อมต่อฮาร์ดแวร์ ESP32 กับระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">ข้อมูลที่ต้องใส่ใน ESP32:</h3>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold mb-1">1. WiFi Configuration</p>
                    <div className="text-sm font-mono space-y-1">
                      <p>WIFI_SSID = "ชื่อ WiFi ของคุณ"</p>
                      <p>WIFI_PASSWORD = "รหัส WiFi ของคุณ"</p>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold mb-1">2. AWS IoT Configuration</p>
                    <div className="text-sm font-mono space-y-1">
                      <p>AWS_IOT_ENDPOINT = "your-endpoint.iot.region.amazonaws.com"</p>
                      <p>AWS_IOT_TOPIC_PUBLISH = "esp32/sensor/data"</p>
                      <p>AWS_IOT_TOPIC_SUBSCRIBE = "esp32/control/command"</p>
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold mb-1">3. Sensor Pin Configuration</p>
                    <div className="text-sm font-mono space-y-1">
                      <p>TEMP_SENSOR_PIN = 34 // ADC Pin สำหรับอ่านค่าแรงดัน</p>
                      <p>LIGHT_CONTROL_PIN = 2 // GPIO Pin สำหรับควบคุมไฟ</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 mt-4">รูปแบบข้อมูลที่ส่ง (JSON):</h3>
                <div className="bg-muted p-3 rounded-lg">
                  <pre className="text-sm font-mono overflow-x-auto">
                    {`{
  "device_id": "ESP32_001",
  "temperature": 28.5,
  "humidity": 65,
  "voltage": 3.3,
  "wifi_signal": -45,
  "timestamp": "2025-01-04T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 mt-4">รูปแบบคำสั่งควบคุม (JSON):</h3>
                <div className="bg-muted p-3 rounded-lg">
                  <pre className="text-sm font-mono overflow-x-auto">
                    {`{
  "device_id": "ESP32_001",
  "command": "light",
  "action": "on",
  "timestamp": "2025-01-04T10:30:00Z"
}`}
                  </pre>
                </div>
              </div>

              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  <strong>สำคัญ:</strong> ต้องตั้งค่า AWS IoT Core และสร้าง Thing, Certificate, และ Policy ก่อนเชื่อมต่อ ESP32
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  ขั้นตอนการเชื่อมต่อ AWS IoT:
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                  <li>สร้าง Thing ใน AWS IoT Core Console</li>
                  <li>ดาวน์โหลด Certificate และ Private Key</li>
                  <li>สร้าง Policy และแนบกับ Certificate</li>
                  <li>คัดลอก Endpoint URL จาก AWS IoT Settings</li>
                  <li>ใส่ข้อมูลทั้งหมดใน ESP32 Code</li>
                  <li>อัพโหลดโค้ดไปยัง ESP32</li>
                  <li>ตรวจสอบการเชื่อมต่อใน AWS IoT Test Console</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ตัวอย่างโค้ด ESP32 (Arduino)</CardTitle>
              <CardDescription>โค้ดตัวอย่างสำหรับอ่านค่าเซ็นเซอร์และส่งข้อมูล</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs font-mono">
                  {`#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WiFi Configuration
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// AWS IoT Configuration
const char* mqtt_server = "your-endpoint.iot.region.amazonaws.com";
const int mqtt_port = 8883;
const char* publish_topic = "esp32/sensor/data";
const char* subscribe_topic = "esp32/control/command";

// Pin Configuration
const int TEMP_SENSOR_PIN = 34;
const int LIGHT_PIN = 2;

WiFiClientSecure espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(LIGHT_PIN, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi Connected!");
  
  // Setup MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  // Read sensor data every 5 seconds
  static unsigned long lastRead = 0;
  if (millis() - lastRead > 5000) {
    sendSensorData();
    lastRead = millis();
  }
}

void sendSensorData() {
  // Read voltage from sensor
  int rawValue = analogRead(TEMP_SENSOR_PIN);
  float voltage = rawValue * (3.3 / 4095.0);
  
  // Convert voltage to temperature (example formula)
  float temperature = (voltage - 0.5) * 100.0;
  
  // Create JSON
  StaticJsonDocument<200> doc;
  doc["device_id"] = "ESP32_001";
  doc["temperature"] = temperature;
  doc["voltage"] = voltage;
  doc["wifi_signal"] = WiFi.RSSI();
  
  char jsonBuffer[200];
  serializeJson(doc, jsonBuffer);
  
  // Publish to AWS IoT
  client.publish(publish_topic, jsonBuffer);
  Serial.println("Data sent: " + String(jsonBuffer));
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Handle incoming commands
  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload, length);
  
  String command = doc["command"];
  String action = doc["action"];
  
  if (command == "light") {
    if (action == "on") {
      digitalWrite(LIGHT_PIN, HIGH);
      Serial.println("Light turned ON");
    } else if (action == "off") {
      digitalWrite(LIGHT_PIN, LOW);
      Serial.println("Light turned OFF");
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Reference Card */}
      <Card className="mt-8 border-2 border-primary">
        <CardHeader>
          <CardTitle>สรุปการใช้งานแบบย่อ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">การเริ่มต้นใช้งาน:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>เข้าสู่ระบบด้วยอีเมล</li>
                <li>ดูข้อมูลเซ็นเซอร์ที่หน้า Dashboard</li>
                <li>ควบคุมไฟที่หน้า Control</li>
                <li>ตั้งเวลาอัตโนมัติที่หน้า Schedule</li>
                <li>ตั้งค่าการแจ้งเตือนอีเมล</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">ข้อมูลสำคัญ:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>ข้อมูลอัพเดททุก 5 วินาที</li>
                <li>รองรับการควบคุมหลายอุปกรณ์</li>
                <li>มีโหมด Manual และ Auto</li>
                <li>บันทึกประวัติการใช้งาน</li>
                <li>แจ้งเตือนผ่านอีเมล</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
