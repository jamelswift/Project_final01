import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">WSN Management Platform</h1>
          <p className="text-muted-foreground">Cloud-Based Sensor & Actuator Control</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
