import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-muted-foreground">ลงทะเบียนเพื่อเข้าใช้งานระบบ WSN</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
